import { devTools } from "./common.ts";
import { assert, equal } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.152.0/testing/bdd.ts";


describe("devtool interaction", () => {
  describe("List", () => {
    it("should return the target list", async () => {
      const targets = await devTools.list();
      assert(Array.isArray(targets));
    });
  });
  describe("New", () => {
    it("should spawn a target to a specific URL", async () => {
      const target = await devTools.new("chrome://newtab/");
      const { id } = target;
      assert(id);
      const targets = await devTools.list();
      assert(targets.some((t) => t.id === id));
      assert(Array.isArray(targets));
      equal(target.url, "chrome://newtab/");
      await devTools.close(id);
    });
    it("should spawn a new target", async () => {
      const target = await devTools.new();
      const { id } = target;
      assert(id);
      const targets = await devTools.list();
      assert(targets.some((t) => t.id === id));
      assert(Array.isArray(targets));
      await devTools.close(id);
    });
  });
  describe("Activate", () => {
    it("should activate an existing target1", async () => {
      const targets = await devTools.list();
      // targets[0] is the latest target to be spawned
      const target = targets[0];
      await devTools.activate(target.id);
    });
  });
  describe("Close", () => {
    it("should close an existing target", async () => {
      const targets = await devTools.list();
      // targets[0] is the latest target to be spawned
      const target = targets[0];
      await devTools.close(target.id);
      // avoid that further test cases attach to this target as the
      // actual close is a bit delayed
      await new Promise((done) => setTimeout(done, 1000));
    });
  });
  describe("Version", () => {
    it("should return the version information", async () => {
      const info = await devTools.version();
      assert(info !== null && typeof info === "object");
    });
  });
});
