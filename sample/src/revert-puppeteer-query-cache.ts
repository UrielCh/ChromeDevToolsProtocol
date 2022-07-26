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
      await request.respond({body: "cached", headers: {
        "access-control-allow-credentials": "true",
        "access-control-allow-headers": "Content-Type",
        "access-control-allow-methods": "POST,OPTIONS",
        "access-control-allow-origin": "*",
        "cache-control": "no-cache",
        "date": "Tue, 26 Jul 2022 08:11:44 GMT",
        "strict-transport-security": "max-age=631138519",
        "x-content-type-options": "nosniff",
        "x-download-options": "noopen",
        "x-frame-options": "DENY",
        "x-github-backend": "Kubernetes",
        "x-github-request-id": "AAAA:BBBB:CCCCCC:DDDDDDDD:EEEEEEEE",
        "x-permitted-cross-domain-policies": "none",
        "x-request-id": "11111111-2222-3333-4444-555555555555",
        "x-runtime": "0.003426",
        "x-xss-protection": "1; mode=block",
      }, status: 204});
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
  browser.disconnect();
  protoRev.close();
  // process.exit(0);
})();
