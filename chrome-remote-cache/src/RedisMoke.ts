import RedisWrapper from "./RedisWrapper.ts";

export type RedisBinary = Uint8Array;

export class RedisMoke implements RedisWrapper {
    // deno-lint-ignore no-explicit-any
    data = {} as { [key: string]: any };
    constructor(_opts?: { hostname?: string }) {
    }

    connect(): Promise<RedisMoke> {
        return Promise.resolve(this);
    }

    close(): Promise<void> {
        return Promise.resolve()
    }

    PING(): Promise<void> {
        return Promise.resolve()
    }

    GET(key: string): Promise<string | null> {
        let value = this.data[key];
        if (value === undefined)
            value = null;
        return Promise.resolve(value);
    }

    GETbin(key: string): Promise<RedisBinary | null> {
        let value = this.data[key];
        if (value === undefined)
            value = null;
        return Promise.resolve(value);
    }

    SETEX(key: string, _seconds: number, value: RedisBinary | string): Promise<void> {
        this.data[key] = value;
        return Promise.resolve()
    }

    INCBY(key: string, increment: number): Promise<number> {
        return this.data[key] = (this.data[key] || 0) + increment;
    }

    HINCBY(key: string, field: string, increment: number): Promise<number> {
        const hash = this.data[key] || {}
        const value = (hash[field] || 0) + increment;
        hash[field] = value;
        this.data[key] = hash;
        return value;
    }

    EXPIRE(_key: string, _seconds: number): Promise<void> {
        return Promise.resolve()
    }

    HGET(key: string, field: string): Promise<string | null> {
        const hash = this.data[key] || {}
        const value = hash[field];
        if (value === undefined)
            return Promise.resolve(null);
        return Promise.resolve(hash[field]);
    }

    HGETbin(key: string, field: string): Promise<RedisBinary | null> {
        const hash = this.data[key];
        if (!hash)
            return Promise.resolve(null);
        return Promise.resolve(hash[field] as RedisBinary);
    }

    HSET(key: string, field: string, value: RedisBinary | string): Promise<void> {
        const hash = this.data[key] || {}
        this.data[key] = hash;
        hash[field] = value;
        return Promise.resolve()
    }

    HDEL(key: string, field: string): Promise<number> {
        const hash = this.data[key] || {}
        this.data[key] = hash;
        delete hash[field];
        return Promise.resolve(1);
    }

    DEL(key: string): Promise<number> {
        delete this.data[key];
        return Promise.resolve(1);
    }
}

export default RedisMoke;

// ReturnType<typeof createClient>
// if (!this.redis.isOpen)
// await this.redis.connect();
// return this.redis;
// const redis = await this.getRedis();
// await redis.disconnect();
