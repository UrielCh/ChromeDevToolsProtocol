import CacheManager from './CacheManager.ts';
// import { connect, type RedisReply, type Bulk } from "https://deno.land/x/redis@v0.27.4/mod.ts";
import { RedisWrapper, type RedisBinary } from './RedisWrapper.ts';

const KEY_DATA = 'data:'
const KEY_META = 'meta:'
const KEY_COUNTER = 'usage:'

export class CacheManagerRedisLongTerm implements CacheManager {
    constructor(private redis: RedisWrapper) { }

    public getRedis(): Promise<RedisWrapper> {
        return this.redis.connect();
    }

    public async close() {
        const redis = await this.getRedis();
        await redis.close();
    }

    /**
     * delete cache for a domain
     */
    async flushDomain(domain: string, path: string) {
        const redis = await this.redis;
        await redis.HDEL(KEY_META + domain, path);
        await redis.HDEL(KEY_DATA + domain, path);
        await redis.HDEL(KEY_COUNTER + domain, path);
    }

    async getCacheMeta(cachekey?: [string, string] | null): Promise<string | null> {
        if (!cachekey)
            return null;
        const [domain, path] = cachekey
        const key = KEY_META + domain;
        const redis = await this.getRedis();
        const cached = await redis.HGET(key, path);
        return cached;
    }

    async getCacheData([domain, path]: [string, string]): Promise<RedisBinary | null> {
        const key: string = KEY_DATA + domain;
        const redis = await this.getRedis();
        const cached = await redis.HGETbin(key, path)
        return cached;
    }

    async setCacheMeta([domain, path]: [string, string], cacheData: string): Promise<void> {
        const key = KEY_META + domain;
        const redis = await this.getRedis();
        await redis.HSET(key, path, cacheData);
    }

    async setCacheData([domain, path]: [string, string], data: RedisBinary): Promise<void> {
        const key = KEY_DATA + domain;
        const redis = await this.getRedis();
        await redis.HSET(key, path, data);
    }

    async cacheIncUsage([domain, path]: [string, string], inc = 1): Promise<number> {
        const key = KEY_COUNTER + domain;
        const redis = await this.getRedis();
        const cnt = await redis.HINCBY(key, path, inc);
        return Number(cnt);
    }
}

export default CacheManagerRedisLongTerm;