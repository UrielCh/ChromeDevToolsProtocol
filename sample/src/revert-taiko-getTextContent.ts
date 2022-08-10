import taiko, { $, ElementWrapper } from "taiko";
import { ProtoRevert } from "cdp-reverter";

!(async () => {
  // "C:\Program Files\Google\Chrome\Application\chrome.exe" --profile-directory="bot" --remote-debugging-port=9222
  //  chrome-protocol-proxy.exe
  const ignoreEvent = [
    "Page.loadEventFired",
    "Page.frameStartedLoading",
    "Page.lifecycleEvent",
    "Target.targetInfoChanged",
    "Runtime.executionContextsCleared",
    "Page.frameStoppedLoading",
    "Page.domContentEventFired",
    "Page.lifecycleEvent",
    "Network.requestWillBeSent",
    "Network.requestWillBeSentExtraInfo",
    "Network.responseReceivedExtraInfo",
    "Network.responseReceived",
    "Page.frameStartedLoading",
    "Log.entryAdded"];
  const protoRev = new ProtoRevert({ srcPort: 9555, dstPort: 9222, dstHost: "127.0.0.1", ignoreEvent, maxParamLen: 128 });
  await protoRev.start();
  await taiko.openBrowser({host: "127.0.0.1", port: 9555});
  protoRev.bookmark('newPage')
  await taiko.openTab();
  protoRev.bookmark('goto https://en.wikipedia.org/wiki/Main_Page')
  await taiko.goto(
    "https://en.wikipedia.org/wiki/Main_Page",
    { waitForNavigation: true }
  );
  protoRev.bookmark('waitForSelector a[href="/wiki/Special:Statistics"]')
  try {
    // //a[@href="/wiki/Special:Statistics"]
  await taiko.waitFor(async () => await $('a[href="/wiki/Special:Statistics"]').exists())
  } catch (e) {
    console.error(e);
  }
  // bad Typing
  const elms = await $('a[href="/wiki/Special:Statistics"]').get()
  protoRev.bookmark('evaluate(el => el.textContent')
  const elm: ElementWrapper = (elms as unknown as ElementWrapper[])[0];
  if (elm) {
    let value = await elm.text();
    console.log(value + ' articles in English');
  } else {
    console.log('select failed');
  }
  protoRev.bookmark('all done')
  protoRev.writeSessions('taiko-getTextContent');
  protoRev.close();
  // process.exit(0);
})();

