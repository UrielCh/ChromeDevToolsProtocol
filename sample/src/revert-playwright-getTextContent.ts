import playwright from "playwright";
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
  const browser = await playwright.chromium.connectOverCDP("http://127.0.0.1:9555");
  protoRev.bookmark('newPage')
  const page = await browser.newPage();
  protoRev.bookmark('goto https://en.wikipedia.org/wiki/Main_Page')
  await page.goto(
    "https://en.wikipedia.org/wiki/Main_Page",
    { waitUntil: "domcontentloaded" }
  );
  protoRev.bookmark('waitForSelector a[href="/wiki/Special:Statistics"]')
  const elm = await page.waitForSelector('a[href="/wiki/Special:Statistics"]');
  protoRev.bookmark('evaluate(el => el.textContent')
  let value = await page.evaluate(el => el.textContent, elm);
  console.log(value + ' articles in English');
  protoRev.bookmark('all done')
  protoRev.writeSessions('playwright-getTextContent');
  protoRev.close();
  // process.exit(0);
})();

