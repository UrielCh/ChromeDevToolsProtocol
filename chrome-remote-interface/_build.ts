import { build, emptyDir } from "https://deno.land/x/dnt@0.30.0/mod.ts";
// deno run -A _build.ts 0.4.0
if (!Deno.args[0]) {
  console.error('Missing version number')
  Deno.exit(-1);
}

try {
  await emptyDir("./npm");

  await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    shims: {
      // see JS docs for overview and more options
      deno: true,
      webSocket: true,
      undici: true,
      custom: [
        {
          package: {
            name: "stream/web",
          },
          globalNames: ["ReadableStream", "TransformStream"],
        },
        {
          globalNames: [{ name: "MessageEvent", typeOnly: true }],
          package: {
            name: "ws",
          },
        }
      ],
    },
    compilerOptions: {
      lib: ["dom", "esnext"],
    },
    package: {
      // package.json properties
      name: "@u4/chrome-remote-interface",
      author: "Uriel chemouni <uchemouni@gmail.com>",
      license: "MIT",
      contributors: [
        "Andrey Sidorov <sidoares@yandex.ru>",
        "Andrea Cardaci <cyrus.and@gmail.com>",
        "Greg Cochard <greg@gregcochard.com>"
      ],
      description: "Chrome Debugging Protocol interface",
      keywords: [
        "Chrome DevTools Protocol",
        "chrome",
        "debug",
        "protocol",
        "remote",
        "interface",
        "deno"
      ],
      homepage: "https://github.com/UrielCh/chrome-remote-interface",
      version: Deno.args[0],
      repository: {
        type: "git",
        url: "git+https://github.com/UrielCh/chrome-remote-interface.git",
      },
      bugs: {
        url: "http://github.com/UrielCh/chrome-remote-interface/issues",
      },
      "engine-strict": {
        node: ">=14"
      },
    },
  });

  // post build steps
  Deno.copyFileSync("LICENSE", "npm/LICENSE");
  Deno.copyFileSync("README.md", "npm/README.md");
} catch (e) {
  console.error(e);
}