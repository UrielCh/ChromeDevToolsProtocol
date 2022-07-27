import Redis from 'ioredis'

// export const redis = new Redis();

const KEY_DATA = 'data:'
const KEY_META = 'meta:'
const KEY_COUNTER = 'usage:'

export class CacheManager {

    constructor(private redis = new Redis()) {}

    public close () {
        this.redis.disconnect();
    }

    async getCacheMeta(cachekey?: [string, string] | null): Promise<string | null> {
        if (!cachekey)
            return null;
        const [domain, path] = cachekey
        // const [domain, path] = splitUrl(textUrl);
        const key = KEY_META + domain;
        const cached = await this.redis.hget(key, path);
        return cached;
    }

    async getCacheData([domain, path]: [string, string]): Promise<Buffer | null> {
        // const [domain, path] = splitUrl(textUrl);
        const key = KEY_DATA + domain;
        const cached = await this.redis.hgetBuffer(key, path);
        return cached;
    }

    async setCacheMeta([domain, path]: [string, string], cacheData: string): Promise<void> {
        // const [domain, path] = splitUrl(textUrl);
        const key = KEY_META + domain;
        await this.redis.hset(key, [path, cacheData]);
    }

    async setCacheData([domain, path]: [string, string], data: Buffer): Promise<void> {
        // const [domain, path] = splitUrl(textUrl);
        const key = KEY_DATA + domain;
        await this.redis.hset(key, [path, data]);
    }

    async cacheIncUsage([domain, path]: [string, string], inc = 1): Promise<number> {
        // const [domain, path] = splitUrl(textUrl);
        const key = KEY_COUNTER + domain;
        const cnt = await this.redis.hincrby(key, path, inc);
        return cnt;
    }
}

export default CacheManager;