export interface CacheManager {
    close(): void
    getCacheMeta(cachekey?: [string, string] | null): Promise<string | null>;
    getCacheData([domain, path]: [string, string]): Promise<Buffer | null>;
    setCacheMeta([domain, path]: [string, string], cacheData: string): Promise<void>;
    setCacheData([domain, path]: [string, string], data: Buffer): Promise<void>;
    cacheIncUsage([domain, path]: [string, string], inc: number): Promise<number>;
}

export default CacheManager;