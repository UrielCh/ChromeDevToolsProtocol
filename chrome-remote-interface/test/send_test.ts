import assert from "assert";
import Devtools from "..";
import { ProtocolError } from "../lib/Chrome";
import { devTools, sampleUrl } from "./common";

describe("sending a command", () => {
  describe("without checking the result and without specifying parameters", () => {
    it("should succeed", async () => {
      const chrome = await devTools.connectFirst();
      const willBeSent = chrome.Network.requestWillBeSent();
      await chrome.Network.enable();
      await chrome.Page.navigate({ url: sampleUrl() });
      await willBeSent;
      await chrome.close();
    });
  });
  describe("checking the result and without specifying parameters", () => {
    it("should succeed", async () => {
      const chrome = await devTools.connectFirst();
      await chrome.send("Page.enable");
      await chrome.close();
    });
  });
  describe("checking the result and specifying parameters", () => {
    it("should succeed", async () => {
      const chrome = await devTools.connectFirst();
      await chrome.send("Network.setCacheDisabled", { "cacheDisabled": true });
      await chrome.close();
    });
  });
  describe("without checking the result and without specifying parameters (shorthand)", () => {
    it("should succeed", async () => {
      const chrome = await devTools.connectFirst();
      const p = chrome.Network.requestWillBeSent();
      chrome.Network.enable();
      chrome.send("Page.navigate", { url: sampleUrl() });
      await p;
      await chrome.close();
    });
  });
  describe("checking the result and without specifying parameters (shorthand)", () => {
    it("should succeed", async () => {
      const chrome = await devTools.connectFirst();
      await chrome.Page.enable();
      await chrome.close();
    });
  });
  describe("checking the result and specifying parameters (shorthand)", () => {
    it("should succeed", async () => {
      const chrome = await devTools.connectFirst();
      await chrome.Network.setCacheDisabled({ "cacheDisabled": true });
      // assert(!error);
      await chrome.close();
    });
  });
  it("should catch WebSocket errors", async () => {
    const chrome = await devTools.connectFirst();
    // simulate unhandled disconnection
    await chrome.close();
    try {
      // const response =
      await chrome.Page.enable();
      assert.fail();
    } catch (error) {
      assert(error instanceof Error);
    }
  });
  describe("without a callback", () => {
    it("should fulfill the promise if the command succeeds", async () => {
      const chrome = await devTools.connectFirst();
      await chrome.send("Network.enable");
      await chrome.close();
    });
    it("should reject the promise if the command fails", async () => {
      const chrome = await devTools.connectFirst();
      try {
        await chrome.send("Network.getResponseBody");
        assert.fail();
      } catch (err) {
        assert(err instanceof Error);
        const error = err as ProtocolError;
        assert(!!error.request);
        assert(!!error.response);
        assert(!!error.response.code);
        await chrome.close();
      }
    });
    it("should catch WebSocket errors", async () => {
      const chrome = await devTools.connectFirst();
      // simulate unhandled disconnection
      await chrome.close();
      try {
        await chrome.Page.enable();
        assert.fail();
      } catch (err) {
        assert(err instanceof Error);
        assert(!("request" in err)); // not protocol error
        assert(!("response" in err)); // not protocol error
      }
    });
  });
  describe("without a callback (shorthand)", () => {
    it("should fulfill the promise if the command succeeds", async () => {
      const chrome = await devTools.connectFirst();
      await chrome.Network.enable();
      await chrome.close();
    });
    it("should reject the promise if the command fails", async () => {
      const chrome = await devTools.connectFirst();
      try {
        // @ts-expect-error getResponseBody() is not valid without mandatory parameters
        await chrome.Network.getResponseBody();
        assert.fail();
      } catch (error) {
        assert(error instanceof Error);
        assert("request" in error);
        assert("response" in error);
        const { response } = error;
        assert("code" in response);
      }
      await chrome.close();
    });
  });
  describe("passing a sessionId", () => {
    it("should interact with the correct target", async () => {
      // fetch and connect to the browser target
      const version = await devTools.version();
      const dt = new Devtools({ url: version.webSocketDebuggerUrl });
      const chrome = await dt.connectFirst();
      // attach to the target
      const { targetInfos } = await chrome.Target.getTargets();
      // const { sessionId } =
      const targetInfo = targetInfos.find(t => t && t.type === "page");
      assert(targetInfo);
      const { targetId } = targetInfo;
      await chrome.Target.attachToTarget({ targetId, flatten: true });
      // send a command using the sessionId
      const info = await chrome.Target.getTargetInfo({ targetId });
      assert(info);
      assert(info.targetInfo);
      assert.equal(info.targetInfo.type, "page");
      assert.equal(info.targetInfo.attached, true);
      return chrome.close();
    });
  });
});
