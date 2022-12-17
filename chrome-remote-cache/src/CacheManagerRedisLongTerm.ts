import CacheManager from './CacheManager.ts';
// import { connect, type RedisReply, type Bulk } from "https://deno.land/x/redis@v0.27.4/mod.ts";
import { createClient, commandOptions } from "npm:redis";

const KEY_DATA = 'data:'
const KEY_META = 'meta:'
const KEY_COUNTER = 'usage:'

export class CacheManagerRedisLongTerm implements CacheManager {
    constructor(private redis = createClient()) { }

    public async close() {
        const redis = await this.redis;
        await redis.disconnect();
    }

    async getCacheMeta(cachekey?: [string, string] | null): Promise<string | null> {
        if (!cachekey)
            return null;
        const [domain, path] = cachekey
        const key = KEY_META + domain;
        const redis = await this.redis;
        const cached = await redis.HGET(key, path);
        return cached;
    }

    async getCacheData([domain, path]: [string, string]): Promise<Uint8Array | null> {
        const key: string = KEY_DATA + domain;
        const redis = await this.redis;
        const replay = await redis.hGet(commandOptions({ returnBuffers: true }), key, path);
        // const replay = await redis.sendCommand('hget', key, path)
        //const cached = await redis.hgetBuffer(key, path);
        // const cached: Uint8Array = replay.buffer();
        const cached: Uint8Array = replay
        return cached;
    }

    async setCacheMeta([domain, path]: [string, string], cacheData: string): Promise<void> {
        const key = KEY_META + domain;
        const redis = await this.redis;
        await redis.HSET(key, [path, cacheData]);
    }

    async setCacheData([domain, path]: [string, string], data: Uint8Array): Promise<void> {
        const key = KEY_DATA + domain;
        const redis = await this.redis;
        await redis.HSET(key, [path, data]);
    }

    async cacheIncUsage([domain, path]: [string, string], inc = 1): Promise<number> {
        const key = KEY_COUNTER + domain;
        const redis = await this.redis;
        const cnt = await redis.HINCRBY(key, path, inc);
        return Number(cnt);
    }
}

export default CacheManagerRedisLongTerm;