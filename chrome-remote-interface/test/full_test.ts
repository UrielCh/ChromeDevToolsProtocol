import { devTools } from "./common.ts";
import { describe, it } from "../dev_deps.ts";

describe("visite github like puppeteer", () => {
  describe("without checking the result and without specifying parameters", () => {
    it("should succeed", async () => {
      const cdp = await devTools.connectFirst("browser");
      await cdp.Target.getBrowserContexts(); // 1
      // cdp.on("event", console.log);
      const TargetattachedToTarget21P = cdp.Target.targetCreated();
      cdp.waitForAllEvents("Target.targetCreated");
      await cdp.Target.setDiscoverTargets({ "discover": true }); // 2
      await TargetattachedToTarget21P;
      const { targetId } = await cdp.Target.createTarget({ "url": "about:blank" }); // 3
      const changes = cdp.waitForAllEvents("Target.targetInfoChanged");
      const { sessionId } = await cdp.Target.attachToTarget({ "targetId": targetId, "flatten": true }); // 4
      await changes;
      await new Promise(r => setTimeout(r, 1000));
      await cdp.Page.enable({}, sessionId); // 5
      await cdp.Page.getFrameTree({}, sessionId); // 6
      await cdp.Target.setAutoAttach({ "autoAttach": true, "waitForDebuggerOnStart": false, "flatten": true }, sessionId); // 7
      await cdp.Performance.enable({}, sessionId); // 8
      await cdp.Log.enable({}, sessionId); // 9
      const RuntimeexecutionContextCreated35P = cdp.Runtime.executionContextCreated();
      const pagelifecycleEvent = cdp.waitForAllEvents("Page.lifecycleEvent");
      await cdp.Page.setLifecycleEventsEnabled({ "enabled": true }, sessionId); // 10
      await cdp.Runtime.enable({}, sessionId); // 11
      await cdp.Network.enable({}, sessionId); // 12
      const RuntimeexecutionContextCreated35 = await RuntimeexecutionContextCreated35P;
      await pagelifecycleEvent;
      const executionContextCreated = cdp.waitForAllEvents("Runtime.executionContextCreated");
      await cdp.Page.addScriptToEvaluateOnNewDocument({ "source": "//# sourceURL=pptr://__puppeteer_evaluation_script__", "worldName": "__puppeteer_utility_world__" }, sessionId); // 13
      await cdp.Page.createIsolatedWorld({ "frameId": targetId, "worldName": "__puppeteer_utility_world__", "grantUniveralAccess": true }, sessionId); // 14
      await executionContextCreated;
      const frameResized = cdp.waitForAllEvents("Page.frameResized");
      await cdp.Emulation.setDeviceMetricsOverride({ "mobile": false, "width": 800, "height": 600, "deviceScaleFactor": RuntimeexecutionContextCreated35.context.id, "screenOrientation": { "angle": 0, "type": "portraitPrimary" } }, sessionId); // 15
      await cdp.Emulation.setTouchEmulationEnabled({ "enabled": false }, sessionId); // 16
      await frameResized;
      const pageOk = cdp.waitForAllEvents("Page.frameStoppedLoading", "Page.domContentEventFired", "Page.lifecycleEvent", "Network.requestWillBeSent", "Network.requestWillBeSentExtraInfo", "Network.responseReceivedExtraInfo", "Network.responseReceived", "Page.frameStartedLoading", "Runtime.executionContextsCleared", "Log.entryAdded", "Target.targetInfoChanged", "Page.frameNavigated", "Network.dataReceived", "Runtime.executionContextCreated", "Network.loadingFinished");
      await cdp.Page.navigate({ "url": "https://github.com/UrielCh/puppeteer-jquery/tree/master/puppeteer-jquery", "frameId": targetId }, sessionId); // 18
      await pageOk;
      await cdp.close();
    });
  });
});
