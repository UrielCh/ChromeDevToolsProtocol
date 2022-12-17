// import { connect, Redis, type RedisReply } from "https://deno.land/x/redis@v0.27.4/mod.ts";
// import { createClient, commandOptions } from "npm:redis";
import CacheManager from './CacheManager.ts';
import { Buffer } from '../deps.ts';
import { newRedis, Redis, openRedis, closeRedis, redisGetString, redisGetBin, redisSetEx, redisExpire, redisIncBy, type RedisBinary } from './RedisProvider.ts';

const KEY_DATA = 'data:'
const KEY_META = 'meta:'
const KEY_COUNTER = 'usage:'

/**
 * all data expirer after TTLSec second, default value is 3 days
 */
export class CacheManagerRedisTTL implements CacheManager {
    constructor(private redis = newRedis(), private TTLSec = 60 * 60 * 24 * 3) { }

    public async getRedis(): Promise<Redis> {
        return openRedis(this.redis);
    }

    public async close(): Promise<void> {
        closeRedis(this.redis);
    }

    /**
     * delete cache for a domain
     */
    async flushDomain(domain: string) {
        const redis = await this.redis;
        await Promise.all([
            redis.hdel('meta', domain),
            redis.hdel('usage', domain),
            redis.hdel('data', domain),
        ]);
    }

    async getCacheMeta(cachekey?: [string, string] | null): Promise<string | null> {
        if (!cachekey)
            return null;
        const [domain, path] = cachekey
        const key = KEY_META + domain + path;
        const redis = await this.getRedis();
        const cached = await redisGetString(redis, key);
        return cached;
    }

    async getCacheData([domain, path]: [string, string]): Promise<RedisBinary | null> {
        const key = KEY_DATA + domain + path; // Uint8Array
        const redis = await this.getRedis();
        return redisGetBin(redis, key);
    }

    async setCacheMeta([domain, path]: [string, string], cacheData: string): Promise<void> {
        const key = KEY_META + domain + path;
        const redis = await this.getRedis();
        await redisSetEx(redis, key, this.TTLSec, cacheData);
    }

    async setCacheData([domain, path]: [string, string], data: RedisBinary): Promise<void> {
        const key = KEY_DATA + domain + path;
        const redis = await this.getRedis();
        try {
            // console.log('setCacheData ', key, typeof (data));
            await redisSetEx(redis, key, this.TTLSec, data);
        } catch (e) {
            console.error('FAILED:: setCacheData ', key, typeof (data));
            console.error(e);
            console.error(data instanceof Buffer);
        }
    }

    async cacheIncUsage([domain, path]: [string, string], inc = 1): Promise<number> {
        const key = KEY_COUNTER + domain + path;
        const redis = await this.getRedis();
        const cnt = await redisIncBy(redis, key, inc);
        await redisExpire(redis, key, this.TTLSec);
        return Number(cnt);
    }
}

export default CacheManagerRedisTTL;