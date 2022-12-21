import { Devtools, delay } from "../deps.ts";
import { ChromeRemoteCache, CacheManagerRedisTTL } from "../mod.ts";
import RedisDeno from "./RedisDeno.ts";

const { test } = Deno;

test("load google maps and cache images, Should take 6 sec+", async () => {
    const hostname = '127.0.0.1';
    const redis = new RedisDeno({ hostname });
    try {
        let pass = false;
        await Promise.race([redis.PING().then(() => pass = true), delay(1000)]);
        if (!pass)
            throw Error('Redis ping timeout');
    } catch (e) {
        console.error(`Connection to Redis: ${hostname} failed with error: ${(e as Error).message}`);
        console.error(e);
        return;
    }
    console.log('Redis link is Ready, connecting to chrome.');
    const devtools = new Devtools();
    const page = await devtools.new();
    const chromePage = await page.connect()
    const cm = new CacheManagerRedisTTL(redis);
    const remoteCache = new ChromeRemoteCache(cm);
    remoteCache.cache('www.google.com/maps/dir///');
    remoteCache.cache('www.google.com/maps/vt/');
    remoteCache.cache('www.google.com/images/');
    remoteCache.cache('www.google.com/js/');
    remoteCache.cache('www.google.com/maps/preview/pwa/manifest');
    // www.gstatic.com, maps.gstatic.com, fonts.gstatic.com   
    remoteCache.cache('*.gstatic.com', 'fonts.googleapis.com', 'lh3.googleusercontent.com');
    remoteCache.ignore('ogs.google.com', 'play.google.com');
    remoteCache.block('tpc.googlesyndication.com/simgad/');
    remoteCache.ignore('tpc.googlesyndication.com/simgad/');
    remoteCache.block('www.google.com/gen_204');
    remoteCache.ignore('www.google.com/gen_204');
    remoteCache.block('www.google.com/maps/preview/log204');
    remoteCache.ignore('www.google.com/maps/preview/log204');
    await remoteCache.register(chromePage);
    await chromePage.Page.navigate({ url: 'https://www.google.com/maps/' });
    await delay(6000);
    await chromePage.close();
    await devtools.close(page.id);
    await redis.close();
    console.log();
    // display cache usage
    const { cache, pt } = remoteCache.getStats();
    console.log('cache:', cache.toString(true));
    console.log('passt:', pt.toString(true));
    console.log();
    console.log(`cache efficency: ${(remoteCache.efficency * 100).toFixed(1)}%`);
})
