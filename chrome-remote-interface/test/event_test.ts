import assert from "assert";
import { sampleUrl } from "./common";
import { devTools } from "./common";

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
  it("should return an unsubscribe function", (done) => {
    devTools.connectFirst().then((chrome) => {
      let firstTime = true;
      // const unsubscribe =
      chrome.Network.requestWillBeSent().then(() => {
        if (!firstTime) {
          try { // just once
            assert(false);
          } catch (err) {
            done(err);
          }
        }
        firstTime = false;
        // unsubscribe();
        // allows to receive and ignore other events
        setTimeout(async () => {
          await chrome.close();
          done();
        }, 1000);
      });
      chrome.send("Network.enable");
      chrome.send("Page.navigate", { url: sampleUrl() });
    });
  });
  it("should give the payload only", async () => {
    const chrome = await devTools.connectFirst();
    new Promise<void>((done) => {
      chrome.once("Network.requestWillBeSent", (message) => {
        /* ts-expect-error typing protect the invalid access */
        assert(!message.method);
        done();
      });
    });
    chrome.send("Network.enable");
    chrome.send("Page.navigate", { url: sampleUrl() });
    await chrome.close();
  });
  // it('should give the payload only (alternate syntax)', (done) => {
  //     Chrome().then(async (chrome) => {
  //         chrome.Network.requestWillBeSent().then((message) => {
  //             assert(!(message as any).method);
  //             chrome.close().then((done));
  //             // avoid to call `done()` more than once
  //             chrome.removeAllListeners();
  //         })
  //         try {
  //             // await chrome.send('Network.enable');
  //             await chrome.Network.enable();
  //             const nav = await chrome.Page.navigate({ url: sampleUrl() });
  //             console.log(nav);
  //         } catch (e) {
  //             console.error(e);
  //             done(e)
  //         }
  //         // await chrome.send('Page.navigate', { url: sampleUrl() });
  //     });
  // });
  // describe('without callback', () => {
  //     it('should give the payload only', (done) => {
  //         Chrome().then((chrome) => {
  //             chrome.Network.requestWillBeSent().then((message) => {
  //                 try {
  //                     assert(!(message as any).method);
  //                     chrome.close().then(done);
  //                 } catch (err) {
  //                     done(err);
  //                 }
  //             });
  //             chrome.send('Network.enable');
  //             chrome.send('Page.navigate', { url: sampleUrl() });
  //         });
  //     });
  // });
  // describe('passing a sessionId', () => {
  //     it('should only listen for those events', async () => {
  //         // fetch and connect to the browser target
  //         // const version = await devTools.version();
  //         // const chrome = await Chrome({
  //         //     target: version.webSocketDebuggerUrl
  //         // });
  //         // create another target
  //         const chrome = await devTools.firstChrome();
  //         const {targetId} = await chrome.Target.createTarget({url: 'about:blank'});
  //
  //         // fetch the targets (two pages) and attach to each of them
  //         const {targetInfos} = await chrome.Target.getTargets();
  //         const {sessionId: sessionId0} = await chrome.Target.attachToTarget({
  //             targetId: targetInfos[0].targetId,
  //             flatten: true
  //         });
  //         const {sessionId: sessionId1} = await chrome.Target.attachToTarget({
  //             targetId: targetInfos[1].targetId,
  //             flatten: true
  //         });
  //         // enable the Page events in both of them
  //         await chrome.Page.enable(); // sessionId0
  //         await chrome.Page.enable(); // sessionId1
  //         // trigger a reload in both of them
  //         chrome.Page.reload(sessionId0);
  //         chrome.Page.reload(sessionId1);
  //         // awaits individual events
  //         await Promise.all([
  //             chrome.Page.loadEventFired(sessionId0),
  //             chrome.Page.loadEventFired(sessionId1),
  //             new Promise((fulfill, reject) => {
  //                 let counter = 0;
  //                 chrome.Page.loadEventFired((params) => {
  //                     if (++counter === 2) {
  //                         fulfill();
  //                     }
  //                 });
  //             })
  //         ]);
  //         return chrome.close();
  //     });
  // });
});
