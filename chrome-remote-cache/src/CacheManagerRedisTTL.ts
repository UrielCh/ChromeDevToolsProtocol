// import { connect, Redis, type RedisReply } from "https://deno.land/x/redis@v0.27.4/mod.ts";
import { createClient, commandOptions } from "npm:redis";
import CacheManager from './CacheManager.ts';

const KEY_DATA = 'data:'
const KEY_META = 'meta:'
const KEY_COUNTER = 'usage:'

/**
 * all data expirer after TTLSec second, default value is 3 days
 */
export class CacheManagerRedisTTL implements CacheManager {
    constructor(private redis = createClient(), private TTLSec = 60 * 60 * 24 * 3) { }

    public async close(): Promise<void> {
        const redis = await this.redis
        await redis.disconnect();
    }

    async getCacheMeta(cachekey?: [string, string] | null): Promise<string | null> {
        if (!cachekey)
            return null;
        const [domain, path] = cachekey
        const key = KEY_META + domain + path;
        const redis = await this.redis;
        const cached = await redis.GET(key);
        return cached;
    }

    async getCacheData([domain, path]: [string, string]): Promise<Uint8Array | null> {
        const key = KEY_DATA + domain + path; // Uint8Array
        const redis = await this.redis;

        const replay = await redis.GET(commandOptions({ returnBuffers: true }), key);
        const cached: Uint8Array = replay;
        if (!cached.length)
            return null;
        return cached;
    }

    async setCacheMeta([domain, path]: [string, string], cacheData: string): Promise<void> {
        const key = KEY_META + domain + path;
        const redis = await this.redis;
        await redis.SETEX(key, this.TTLSec, cacheData);
    }

    async setCacheData([domain, path]: [string, string], data: Uint8Array): Promise<void> {
        const key = KEY_DATA + domain + path;
        const redis = await this.redis;
        await redis.SETEX(key, this.TTLSec, data);
    }

    async cacheIncUsage([domain, path]: [string, string], inc = 1): Promise<number> {
        const key = KEY_COUNTER + domain + path;
        const redis = await this.redis;
        const cnt = await redis.INCRBY(key, inc);
        await redis.EXPIRE(key, this.TTLSec);
        return Number(cnt);
    }
}

export default CacheManagerRedisTTL;