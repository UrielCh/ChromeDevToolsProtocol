import { devTools } from "./common.ts";
import { describe, it } from "https://deno.land/std@0.163.0/testing/bdd.ts";

describe("closing a connection", () => {
  it("should allow a subsequent new connection", async () => {
    // const chrome = await devTools.firstChrome();
    const chrome = await devTools.connectNewPage();
    await chrome.close();
    await chrome.close();
  });
});
