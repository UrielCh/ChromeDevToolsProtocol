import Path from "path";
import puppeteer from "puppeteer-extra";
/// import { pipePort } from "./pipePort";
import { ProtoRevert } from "cdp-reverter";

const delay = (ms:number) => new Promise((r)=>setTimeout(r, ms));

!(async () => {
  const ignoreEvent = [
     "Page.loadEventFired",
     "Page.navigatedWithinDocument",
     "Target.targetInfoChanged",
     "Log.entryAdded"];
  const protoRev = new ProtoRevert({ srcPort: 9555, dstPort: 9222, dstHost: "127.0.0.1", ignoreEvent });
  await protoRev.start();
  const browser = await puppeteer.connect({
    browserURL: "http://127.0.0.1:9555",
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://github.com/UrielCh/puppeteer-jquery/tree/master/puppeteer-jquery",
    { waitUntil: "domcontentloaded" }
  );
  let callback: () => void;
  const done = new Promise<void>(resolve=> {
    callback = resolve;
  });

  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    const textUrl = request.url();
    if (textUrl.startsWith('data:')) {
        request.continue()
        return
    }
    if (textUrl.includes("collector.github.com")) {
      await request.abort('blockedbyclient', 0);
      callback();
    }
  })
  await done;
  console.log('collect 2 more second of activity');
  await delay(2000);
  await page.close();
  const sessionname = Path.basename(__filename.replace('revert-', '').replace(/\.[jt]s$/, ''));
  protoRev.writeSessions(sessionname);
  console.log(`Session: ${sessionname} saved`);
  // await browser.close();
  browser.disconnect();
  // write down session data
  protoRev.close();
  // process.exit(0);
})();

// Debugger.scriptParsed