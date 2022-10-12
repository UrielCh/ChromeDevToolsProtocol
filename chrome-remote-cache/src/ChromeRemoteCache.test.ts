import Devtools from "@u4/chrome-remote-interface";
import Redis from "ioredis";
import ChromeRemoteCache from "./ChromeRemoteCache";
import CacheManager from "./CacheManager";
import CacheManagerRedisTTL from "./CacheManagerRedisTTL";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function testAll() {
    const devtools = new Devtools();
    const page = await devtools.connectNewPage();
    const cm = new CacheManagerRedisTTL(new Redis());
    const remoteCache = new ChromeRemoteCache(cm);
    remoteCache.cache('www.google.com/maps/dir///');
    remoteCache.cache('www.google.com/maps/vt/');
    remoteCache.cache('www.google.com/images/');
    remoteCache.cache('www.google.com/js/');
    remoteCache.cache('www.google.com/maps/preview/pwa/manifest');
    // www.gstatic.com, maps.gstatic.com, fonts.gstatic.com   
    remoteCache.cache('*.gstatic.com');
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

    await remoteCache.register(page);
    await page.Page.navigate({ url: 'https://www.google.com/maps/' });
    await delay(7000);
    console.log();
    // display cache usage
    const { cache, pt } = remoteCache.getStats();
    console.log('cache:', cache.toString(true));
    console.log('passt:', pt.toString(true));
    console.log();
    console.log(`cache efficency: ${(remoteCache.efficency * 100).toFixed(1)}%`);
}

testAll();