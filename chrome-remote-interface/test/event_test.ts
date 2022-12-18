import { sampleUrl, devTools } from "./common.ts";
import { assert, describe, it } from "../dev_deps.ts";

describe("registering event", () => {
  describe('"event"', () => {
    it("should give the raw message", async () => {
      const chrome = await devTools.connectFirst();
      const messageP = new Promise<void>((done) =>
        chrome.once("event", (message) => {
          assert(message.method);
          done();
        })
      );
      await chrome.Network.enable();
      await chrome.send("Page.navigate", { url: sampleUrl() });
      await messageP;
      await chrome.close();
    });
  });
  describe("sub-domain event syntax", () => {
    it("should behave as the regular syntax", async () => {
      const chrome = await devTools.connectFirst();
      const messageP = chrome.Network.requestWillBeSent();
      await chrome.Network.enable();
      await chrome.Page.navigate({ url: sampleUrl() });
      const message = await messageP;
      // @ts-expect-error message should not be present
      assert(!message.method);
      await chrome.close();
    });
  });
  // it("should return an unsubscribe function", (done) => {
  //   devTools.connectFirst().then((chrome) => {
  //     let firstTime = true;
  //     // const unsubscribe =
  //     chrome.Network.requestWillBeSent().then(() => {
  //       if (!firstTime) {
  //         try { // just once
  //           assert(false);
  //         } catch (err) {
  //           done(err);
  //         }
  //       }
  //       firstTime = false;
  //       // unsubscribe();
  //       // allows to receive and ignore other events
  //       setTimeout(async () => {
  //         await chrome.close();
  //         done();
  //       }, 1000);
  //     });
  //     chrome.send("Network.enable");
  //     chrome.send("Page.navigate", { url: sampleUrl() });
  //   });
  // });
  it("should give the payload only", async () => {
    const chrome = await devTools.connectFirst();
    new Promise<void>((done) => {
      chrome.once("Network.requestWillBeSent", (message) => {
        /* ts-expect-error typing protect the invalid access */
        // deno-lint-ignore no-explicit-any
        assert(!(message as any).method);
        done();
      });
    });
    chrome.send("Network.enable");
    chrome.send("Page.navigate", { url: sampleUrl() });
    await chrome.close();
  });
});
