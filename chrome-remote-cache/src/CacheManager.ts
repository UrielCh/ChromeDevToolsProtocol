import { RedisBinary } from "./RedisWrapper.ts";

export interface CacheManager {
    close(): Promise<void>
    getCacheMeta(cachekey?: [string, string] | null): Promise<string | null>;
    getCacheData([domain, path]: [string, string]): Promise<RedisBinary | null>;
    setCacheMeta([domain, path]: [string, string], cacheData: string): Promise<void>;
    setCacheData([domain, path]: [string, string], data: RedisBinary): Promise<void>;
    cacheIncUsage([domain, path]: [string, string], inc: number): Promise<number>;
}

export default CacheManager;