import { Devtools, delay } from "../deps.ts";
import { ChromeRemoteCache, CacheManagerRedisTTL } from "../mod.ts";
import Redis from "../src/RedisDeno.ts";
import LocalServer from './TestServer.ts';
import { assertEquals } from '../dev_deps.ts'

const { test } = Deno;

test('e2e, require a local Redis and a local chrome', async () => {
    const redis = new Redis({ hostname: '127.0.0.1' });
    try {
        let pass = false;
        await Promise.race([redis.PING().then(() => pass = true), delay(1000)]);
        if (!pass)
            throw Error('Redis ping timeout');
        // await redis.PING();
    } catch (e) {
        console.error(`Connection to Redis:127.0.0.1 failed with error: ${(e as Error).message}`);
        console.error(e);
        return;
    }
    const port = 14122;
    const server = new LocalServer(port);
    void server.start();
    await delay(200);
    const devtools = new Devtools();
    const page = await devtools.new();
    const chromePage = await page.connect();
    const cm = new CacheManagerRedisTTL(redis);
    await cm.flushDomain(`127.0.0.1:${port}`, '');
    await cm.flushDomain(`127.0.0.1:${port}`, 'p2');
    const remoteCache = new ChromeRemoteCache(cm);
    remoteCache.cache(`127.0.0.1:${port}`);
    assertEquals(server.nbRequest, 0, 'newly create server replay to 0 request');
    await remoteCache.register(chromePage);
    await chromePage.Page.navigate({ url: `http://127.0.0.1:${port}/` });
    await delay(100);
    assertEquals(server.nbRequest, 1, 'first request newly create server replay to 1 request');
    await delay(100);
    await chromePage.Page.navigate({ url: `http://127.0.0.1:${port}/` });
    await delay(100);
    assertEquals(server.nbRequest, 1, 'first request newly create server replay to 1 request');
    await chromePage.Page.navigate({ url: `http://127.0.0.1:${port}/p2` });
    await delay(100);
    // display cache usage
    const { cache, pt } = remoteCache.getStats();
    console.log('--------');
    console.log('cache:', cache.toString(true));
    console.log('passt:', pt.toString(true));
    console.log();
    console.log(`cache efficency: ${(remoteCache.efficency * 100).toFixed(1)}%`);
    await redis.close();
    server.stop();
    await chromePage.close();
    await devtools.close(page.id);
})
