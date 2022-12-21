// import { connect, Redis, type RedisReply } from "https://deno.land/x/redis@v0.27.4/mod.ts";
// import { createClient, commandOptions } from "npm:redis";
import CacheManager from './CacheManager.ts';
import { Buffer } from '../deps.ts';
import { RedisWrapper, type RedisBinary } from './RedisWrapper.ts';

const KEY_DATA = 'data:'
const KEY_META = 'meta:'
const KEY_COUNTER = 'usage:'

/**
 * all data expirer after TTLSec second, default value is 3 days
 */
export class CacheManagerRedisTTL implements CacheManager {
    constructor(private redis: RedisWrapper, private TTLSec = 60 * 60 * 24 * 3) { }

    public getRedis(): Promise<RedisWrapper> {
        return this.redis.connect();
    }

    public close(): Promise<void> {
        return this.redis.close();
    }

    /**
     * delete cache for a domain
     */
    async flushDomain(domain: string, path: string) {
        const redis = await this.redis;
        await redis.DEL(KEY_META + domain + path);
        await redis.DEL(KEY_DATA + domain + path);
    }

    async getCacheMeta(cachekey?: [string, string] | null): Promise<string | null> {
        if (!cachekey)
            return null;
        const [domain, path] = cachekey
        const key = KEY_META + domain + path;
        const redis = await this.getRedis();
        const cached = await redis.GET(key);
        return cached;
    }

    async getCacheData([domain, path]: [string, string]): Promise<RedisBinary | null> {
        const key = KEY_DATA + domain + path; // Uint8Array
        const redis = await this.getRedis();
        return redis.GETbin(key);
    }

    async setCacheMeta([domain, path]: [string, string], cacheData: string): Promise<void> {
        const key = KEY_META + domain + path;
        const redis = await this.getRedis();
        await redis.SETEX(key, this.TTLSec, cacheData);
    }

    async setCacheData([domain, path]: [string, string], data: RedisBinary): Promise<void> {
        const key = KEY_DATA + domain + path;
        const redis = await this.getRedis();
        try {
            // console.log('setCacheData ', key, typeof (data));
            await redis.SETEX(key, this.TTLSec, data);
        } catch (e) {
            console.error('FAILED:: setCacheData ', key, typeof (data));
            console.error(e);
            console.error(data instanceof Buffer);
        }
    }

    async cacheIncUsage([domain, path]: [string, string], inc = 1): Promise<number> {
        const key = KEY_COUNTER + domain + path;
        const redis = await this.getRedis();
        const cnt = await redis.INCBY(key, inc);
        await redis.EXPIRE(key, this.TTLSec);
        return Number(cnt);
    }
}

export default CacheManagerRedisTTL;