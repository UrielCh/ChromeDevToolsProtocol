# chrome-CDP

[Chrome DevTools Protocol] is a generic protocol to debug / control web browser.

```ts
import { Devtools } from "https://deno.land/x/chrome_remote_interface/mod.ts";
/**
 * Sample API usage
 *
 * The following snippet loads https://github.com and dumps every request made for 3 sec:
 */
async function test() {
  const devtools = new Devtools();
  const tab = await devtools.connectFirst("page");
  try {
    await tab.Network.enable();
    await tab.Page.enable();

    tab.Network.on("requestWillBeSent", (params) => {
      console.log("requestedUrl:", params.request.url);
    });

    const loadEventFired = tab.Page.loadEventFired();
    await tab.Page.navigate({ url: "https://github.com" });
    await loadEventFired;
    console.log("loadEventFired");
    await new Promise((r) => setTimeout(r, 3000));
  } catch (e) {
    console.error(e);
  } finally {
    tab.close();
  }
}

void test();
```

## references

- originaly forcked form
  [cyrus-and chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)
- devtools-protocol
  [reference](https://chromedevtools.github.io/devtools-protocol/)
- nice getting start doc
  [getting-started-with-cdp](https://github.com/aslushnikov/getting-started-with-cdp)
