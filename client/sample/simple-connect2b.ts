import { Devtools } from "..";
/**
 * Sample API usage
 * 
 * The following snippet loads https://github.com and dumps every request made:
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
    await new Promise(r => setTimeout(r, 3000));
  } catch (e) {
    console.error(e);
  } finally {
    tab.close();
  }
}

void test();