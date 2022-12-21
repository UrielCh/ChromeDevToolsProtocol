import { build, emptyDir } from "https://deno.land/x/dnt@0.30.0/mod.ts";
// check version here: https://www.npmjs.com/package/@u4/chrome-remote-interface
// deno run -A _build.ts 0.2.0;
// cd npm; npm publish;
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
            name: "chrome-remote-cache",
            author: "Uriel Chemouni <uchemouni@gmail.com> (https://uriel.deno.dev/)",
            license: "MIT",
            contributors: [],
            description: "Chrome Debugging Protocol interface",
            keywords: [
                "chrome",
                "cache",
                "chrome devtools protocol",
                "deno"
            ],
            dependencies: {
                "@u4/chrome-remote-interface": "^0.4.10",
                // "ioredis": "^5.2.4",
                "picocolors": "^1.0.0"
            },
            homepage: "https://github.com/UrielCh/ChromeDevToolsProtocol",
            version: Deno.args[0],
            repository: {
                type: "git",
                url: "git+https://github.com/UrielCh/ChromeDevToolsProtocol.git",
            },
            bugs: {
                url: "http://github.com/UrielCh/ChromeDevToolsProtocol/issues",
            },
            "engine-strict": {
                node: ">=14"
            },
        },
    });

    // post build steps
    console.log('extra build steps');
    console.log('cwd:', Deno.cwd());

    Deno.copyFileSync("LICENSE", "npm/LICENSE");

    let readme = Deno.readTextFileSync("README.md");
    readme = readme.replaceAll('https://deno.land/x/chrome_remote_interface/mod.ts', '@u4/chrome-remote-interface');
    Deno.writeTextFileSync("npm/README.md", readme);

    //Deno.copyFileSync("README.md", "npm/README.md");
    Deno.mkdirSync("npm/types/types");
    const files = Deno.readDirSync("types");
    for (const file of files) {
        if (!file.isFile)
            continue;
        let text = Deno.readTextFileSync(`types/${file.name}`)
        text = text.replace(/.d.ts(["'])/g, "$1");
        Deno.writeTextFileSync(`npm/types/types/${file.name}`, text);
        console.log(`copy types/${file.name} to npm/types/types/${file.name}`)
    }
    //Deno.copyFileSync("types", "npm/types");
} catch (e) {
    console.error(e);
}