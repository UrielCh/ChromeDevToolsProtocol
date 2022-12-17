import { Devtools } from "https://deno.land/x/chrome_remote_interface@0.4.3/mod.ts";
import { ChromeRemoteCache, CacheManagerRedisTTL } from "../mod.ts";
import Redis from "./RedisProvider.ts";

const { test } = Deno;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("load google maps and cache images", async () => {
    const hostname = '127.0.0.1';
    const redis = new Redis({ hostname });

    try {
        await redis.PING();
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
    await delay(7000);
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
