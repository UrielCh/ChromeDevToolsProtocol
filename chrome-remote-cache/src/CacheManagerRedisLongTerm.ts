import CacheManager from './CacheManager.ts';
// import { connect, type RedisReply, type Bulk } from "https://deno.land/x/redis@v0.27.4/mod.ts";
import { newRedis, Redis, openRedis, closeRedis, redisGetString, redisGetBin, redisSetEx, redisExpire, redisIncBy, redisHget, redisHset, redisHIncBy, redisHgetBin, type RedisBinary } from './RedisProvider.ts';

const KEY_DATA = 'data:'
const KEY_META = 'meta:'
const KEY_COUNTER = 'usage:'

export class CacheManagerRedisLongTerm implements CacheManager {
    // constructor(private redis = createClient()) { }
    // constructor(private redis = new Redis()) { }
    constructor(private redis = newRedis()) { }

    //    public async getRedis(): Promise<ReturnType<typeof createClient>> {
    public getRedis(): Promise<Redis> {
        return this.redis;
        // if (!this.redis.isOpen)
        // await this.redis.connect();
        // return this.redis;
    }

    public async close() {
        const redis = await this.getRedis();
        // await redis.disconnect();
        await closeRedis(redis);
    }

    async getCacheMeta(cachekey?: [string, string] | null): Promise<string | null> {
        if (!cachekey)
            return null;
        const [domain, path] = cachekey
        const key = KEY_META + domain;
        const redis = await this.getRedis();
        // const cached = await redis.HGET(key, path);
        const cached = await redisHget(redis, key, path);
        return cached;
    }

    async getCacheData([domain, path]: [string, string]): Promise<RedisBinary | null> {
        const key: string = KEY_DATA + domain;
        const redis = await this.getRedis();
        // const replay = await redis.hGet(commandOptions({ returnBuffers: true }), key, path);
        // const cached: RedisBinary = replay
        const cached = await redisHgetBin(redis, key, path)
        //const cached = await redis.hgetBuffer(key, path);
        return cached;
    }

    async setCacheMeta([domain, path]: [string, string], cacheData: string): Promise<void> {
        const key = KEY_META + domain;
        const redis = await this.getRedis();
        // await redis.HSET(key, [path, cacheData]);
        await redisHset(redis, key, path, cacheData);
    }

    async setCacheData([domain, path]: [string, string], data: RedisBinary): Promise<void> {
        const key = KEY_DATA + domain;
        const redis = await this.getRedis();
        // await redis.HSET(key, [path, data]);
        await redisHset(redis, key, path, data);
    }

    async cacheIncUsage([domain, path]: [string, string], inc = 1): Promise<number> {
        const key = KEY_COUNTER + domain;
        const redis = await this.getRedis();
        // const cnt = await redis.HINCRBY(key, path, inc);
        const cnt = await redisHIncBy(redis, key, path, inc);
        return Number(cnt);
    }
}

export default CacheManagerRedisLongTerm;