import { type Redis as RedisExt, connect } from "https://deno.land/x/redis@v0.28.0/mod.ts";
import RedisWrapper from "./RedisWrapper.ts";
import { Buffer } from "https://deno.land/std@0.170.0/io/buffer.ts";

export type RedisBinary = Uint8Array;

export class RedisDeno implements RedisWrapper {
    #redis: Promise<RedisExt>;
    constructor(opts?: { hostname?: string }) {
        opts = opts || {};
        const hostname = opts.hostname || '127.0.0.1';
        this.#redis = connect({ hostname });
    }

    async connect(): Promise<RedisDeno> {
        await this.#redis;
        return this;
    }

    async close(): Promise<void> {
        const redis = await this.#redis;
        redis.close();
    }

    async PING(): Promise<void> {
        const redis = await this.#redis;
        await redis.ping();
    }

    async GET(key: string): Promise<string | null> {
        const redis = await this.#redis;
        const replay = redis.get(key);
        if (!replay)
            return null;
        return replay;
    }

    async GETbin(key: string): Promise<RedisBinary | null> {
        new Buffer
        const redis = await this.#redis;
        const replay = await redis.sendCommand("GET", key);
        const buffer = replay.buffer();
        if (!buffer.length)
            return null;
        return buffer;
    }

    async SETEX(key: string, seconds: number, value: RedisBinary | string): Promise<void> {
        const redis = await this.#redis;
        await redis.setex(key, seconds, value);
    }

    async INCBY(key: string, increment: number): Promise<number> {
        const redis = await this.#redis;
        return redis.incrby(key, increment);
    }

    async HINCBY(key: string, field: string, increment: number): Promise<number> {
        const redis = await this.#redis;
        return redis.hincrby(key, field, increment);
    }

    async EXPIRE(key: string, seconds: number): Promise<void> {
        const redis = await this.#redis;
        await redis.expire(key, seconds);
    }

    async HGET(key: string, field: string): Promise<string | null> {
        const redis = await this.#redis;
        return redis.hget(key, field);
    }

    async HGETbin(key: string, field: string): Promise<RedisBinary | null> {
        const redis = await this.#redis;
        const reply = await redis.sendCommand('hget', key, field);
        const buffer = reply.buffer();
        if (!buffer.length)
            return null;
        return buffer;
    }

    async HSET(key: string, field: string, value: RedisBinary | string): Promise<void> {
        const redis = await this.#redis;
        await redis.hset(key, field, value);
    }

    async HDEL(key: string, field: string): Promise<number> {
        const redis = await this.#redis;
        return redis.hdel(key, field);
    }

    async DEL(key: string): Promise<number> {
        const redis = await this.#redis;
        return redis.del(key);
    }
}

export default RedisDeno;


// ReturnType<typeof createClient>
// if (!this.redis.isOpen)
// await this.redis.connect();
// return this.redis;
// const redis = await this.getRedis();
// await redis.disconnect();
