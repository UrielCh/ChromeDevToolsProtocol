import Devtools from "@u4/chrome-remote-interface";
import Redis from "ioredis";
import ChromeRemoteCache from "./BlockTracking";
import CacheManager from "./CacheManager";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function testAll() {
    const devtools = new Devtools();
    const page = await devtools.connectNewPage();
    const cm = new CacheManager(new Redis());
    const remoteCache = new ChromeRemoteCache(cm);
    remoteCache.cache('www.google.com/maps/dir///');
    remoteCache.cache('www.google.com/maps/vt/');
    remoteCache.cache('www.google.com/images/');
    remoteCache.cache('www.google.com/js/');
    remoteCache.cache('www.google.com/maps/preview/pwa/manifest');
   
    remoteCache.cache('*.gstatic.com'); // www, maps, fonts
    remoteCache.cache('fonts.googleapis.com');
    remoteCache.cache('lh3.googleusercontent.com');

    remoteCache.ignore('ogs.google.com');
    remoteCache.ignore('play.google.com');
    remoteCache.block('tpc.googlesyndication.com/simgad/');
    remoteCache.ignore('tpc.googlesyndication.com/simgad/');
    remoteCache.block('www.google.com/gen_204');
    remoteCache.ignore('www.google.com/gen_204');
    remoteCache.block('www.google.com/maps/preview/log204');
    remoteCache.ignore('www.google.com/maps/preview/log204');
    
    
    // const blocker = new MyBlockTracking();
    await remoteCache.register(page);
    await page.Page.navigate({ url: 'https://www.google.com/maps/'});
    await page.Page.frameNavigated();
    await delay(5000);
    console.log('done');
    await delay(5000);
    await delay(5000);
    console.log();
    console.log();
    console.log(remoteCache.getStats());
    console.log();
    console.log();
    console.log();
}

testAll();