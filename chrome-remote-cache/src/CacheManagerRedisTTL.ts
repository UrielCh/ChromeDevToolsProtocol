import Redis from 'ioredis'
import CacheManager from './CacheManager';

const KEY_DATA = 'data:'
const KEY_META = 'meta:'
const KEY_COUNTER = 'usage:'

/**
 * all data expirer after TTLSec second, default value is 3 days
 */
export class CacheManagerRedisTTL implements CacheManager {
    constructor(private redis = new Redis(), private TTLSec = 60 * 60 * 24 * 3) { }

    public close() {
        this.redis.disconnect();
    }

    async getCacheMeta(cachekey?: [string, string] | null): Promise<string | null> {
        if (!cachekey)
            return null;
        const [domain, path] = cachekey
        const key = KEY_META + domain + path;
        const cached = await this.redis.get(key);
        return cached;
    }

    async getCacheData([domain, path]: [string, string]): Promise<Buffer | null> {
        const key = KEY_DATA + domain + path;
        const cached = await this.redis.getBuffer(key);
        return cached;
    }

    async setCacheMeta([domain, path]: [string, string], cacheData: string): Promise<void> {
        const key = KEY_META + domain + path;
        await this.redis.setex(key, this.TTLSec, cacheData);
    }

    async setCacheData([domain, path]: [string, string], data: Buffer): Promise<void> {
        const key = KEY_DATA + domain + path;
        await this.redis.setex(key, this.TTLSec, data);
    }

    async cacheIncUsage([domain, path]: [string, string], inc = 1): Promise<number> {
        const key = KEY_COUNTER + domain + path;
        const cnt = await this.redis.incrby(key, inc);
        await this.redis.expire(key, this.TTLSec);
        return cnt;
    }
}

export default CacheManagerRedisTTL;