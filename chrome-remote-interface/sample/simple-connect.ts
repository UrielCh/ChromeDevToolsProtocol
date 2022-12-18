import { Devtools } from "../mod.ts";
/**
 * Sample API usage
 *
 * The following snippet loads https://github.com and dumps every request made:
 */
async function test() {
  const devtools = new Devtools();
  const tab = await devtools.connectFirst("page");
  try {
    const requestSent = tab.Network.requestWillBeSent();
    const loadEventFired = tab.Page.loadEventFired();
    await tab.Network.enable();
    await tab.Page.enable();
    await tab.Page.navigate({ url: "https://github.com" });
    const { request } = await requestSent;
    console.log("requestedUrl:", request.url);
    await loadEventFired;
    console.log("loadEventFired");
  } catch (e) {
    console.error(e);
  } finally {
    tab.close();
  }
}

void test();
