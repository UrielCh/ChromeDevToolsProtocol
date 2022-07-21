import { PageEx } from "puppeteer-extra-plugin-jquery";
import puppeteer from "puppeteer-extra";
import { Plugin } from "puppeteer-extra-plugin-jquery";
/// import { pipePort } from "./pipePort";
import { ProtoRevert } from "cdp-reverter";

!(async () => {
  puppeteer.use(new Plugin());
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
  const protoRev = new ProtoRevert({ srcPort: 9555, dstPort: 9222, dstHost: "127.0.0.1", ignoreEvent });
  await protoRev.start();
  const browser = await puppeteer.connect({
    browserURL: "http://127.0.0.1:9555",
  });
  const pageOrg = await browser.newPage();
  const page = pageOrg as unknown as PageEx;
  await page.goto(
    "https://github.com/UrielCh/puppeteer-jquery/tree/master/puppeteer-jquery",
    { waitUntil: "domcontentloaded" }
  );
  // await prompts({ type: "text", name: "continue", message: "Are you ready ?" });
  // use waitForjQuery()
  const start = await page.waitForjQuery("span.Counter.js-social-count");
  console.log("selector match ", start.length, "elements");
  // use any jQuery code.
  const cnt = await page.jQuery("span.Counter.js-social-count").text();
  console.log("this project have", cnt, "start");
  // browser.disconnect();
  // await browser.close();
  // write down session data
  protoRev.writeSessions('revert');
  console.log('all done');
  protoRev.close();
  // process.exit(0);
})();

// Debugger.scriptParsed