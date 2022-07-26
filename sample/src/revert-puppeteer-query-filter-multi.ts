import Path from "path";
import puppeteer from "puppeteer-extra";
import pc from "picocolors";
import { ProtoRevert } from "cdp-reverter";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
  await page.setCacheEnabled(false);
  await page.goto(
    "https://www.google.com/maps/",
  );
  let callback: (() => void) | null = null;
  const done = new Promise<void>(resolve => {
    callback = resolve;
  });

  page.on('request', async (request) => {
    const textUrl = request.url();
    console.log(pc.magenta("IN"), textUrl);
    if (textUrl.startsWith('data:')) {
      console.log(pc.bgGreen("pass"), 'data:....');
      await request.continue()
      return
    }

    if (textUrl.includes("google.com/maps/vt/pb=")) {
      console.log(pc.bgRed("block"), textUrl);
      await request.continue()
      // await request.abort('aborted', 0);
      if (callback) {
        callback();
        callback = null;
      }
      return
    }
    console.log(pc.bgGreen("pass"), textUrl);
    await request.continue()
  })
  // await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await page.setRequestInterception(true);
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