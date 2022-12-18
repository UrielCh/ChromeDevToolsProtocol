import { Devtools } from "../lib/Devtools.ts";
import { devTools } from "./common.ts";
import { assert, describe, it } from "../dev_deps.ts";

describe("connecting to Chrome", () => {
  describe("with default parameters", () => {
    it('should succeed with "connect" callback passed as an argument', async () => {
      const chrome = await devTools.connectFirst();
      await chrome.close();
    });
  });
  describe("with custom parameters", () => {
    it('should succeed with "connect" callback passed as an argument', async () => {
      const devTools = new Devtools({ url: "http://localhost:9222" });
      const chrome = await devTools.connectFirst();
      await chrome.close();
    });
  });
  describe("with custom (wrong) parameters", () => {
    it("should fail (wrong port)1", async () => {
      try {
        const devTools = new Devtools({ url: "http://localhost:1" });
        const chrome = await devTools.connectFirst();
        await chrome.close();
        assert(false);
      } catch (err) {
        assert(err instanceof Error);
      }
    });
    it("should fail (wrong host)2 OK", async () => {
      try {
        const devTools = new Devtools({ url: "http://255.255.255.255:9222" });
        const chrome = await devTools.connectFirst();
        await chrome.close();
        assert(false);
      } catch (err) {
        assert(err instanceof Error);
      }
    });
  });
});
