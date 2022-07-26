import Devtools from "@u4/chrome-remote-interface";
import Redis from "ioredis";
import BlockTracking from "./BlockTracking";
import CacheManager from "./CacheManager";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function testAll() {
    const devtools = new Devtools();
    const page = await devtools.connectNewPage();
    const cm = new CacheManager(new Redis());
    const blocker = new BlockTracking(cm);
    blocker.cacheDoms('www.google.com/maps/dir///');
    blocker.cacheDoms('www.google.com/maps/vt/');
    blocker.cacheDoms('maps.gstatic.com');
    

    // const blocker = new MyBlockTracking();
    blocker.register(page);
    await page.Page.navigate({ url: 'https://www.google.com/maps/'});
    await page.Page.frameNavigated();
    await delay(5000);
    console.log('done');
}

testAll();