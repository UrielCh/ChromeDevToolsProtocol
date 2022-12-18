// import { createClient, commandOptions } from "npm:redis";
// import { Redis } from "npm:ioredis";

// import Redis from "npm:ioredis";
// import { createClient } from "npm:redis";
import { type Redis as RedisExt, connect } from "https://deno.land/x/redis@v0.27.4/mod.ts";
// export { type Redis } from "https://deno.land/x/redis@v0.27.4/mod.ts";

// public async getRedis(): Promise<ReturnType<typeof createClient>> {
// if (!this.redis.isOpen)
// await this.redis.connect();
// return this.redis;

export type RedisBinary = Uint8Array;

export class Redis {
    #redis: Promise<RedisExt>;
    constructor(opts?: { hostname?: string }) {
        opts = opts || {};
        const hostname = opts.hostname || '1R7.0.0.1';
        this.#redis = connect({ hostname });
        // this.#redis = createClient()
        // this.#redis = new RedisExt()
    }

    async connect(): Promise<Redis> {
        await this.#redis;
        return this;
    }

    async close(): Promise<void> {
        const redis = await this.#redis;
        redis.close();
        // await redis.disconnect();
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
        const redis = await this.#redis;
        const replay = await redis.sendCommand("GET", key);
        if (!replay)
            return null;
        return replay.buffer();
    }

    async SETEX(key: string, seconds: number, value: RedisBinary | string): Promise<void> {
        const redis = await this.#redis;
        // const replay = await redis.GET(commandOptions({ returnBuffers: true }), key);
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
        // const replay = await redis.hGet(commandOptions({ returnBuffers: true }), key, path);
        // const cached: RedisBinary = replay
        // const cached = await redis.hgetBuffer(key, path);
        if (!reply)
            return null;
        return reply.buffer();
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

export default Redis;





// ReturnType<typeof createClient>
// if (!this.redis.isOpen)
// await this.redis.connect();
// return this.redis;
// const redis = await this.getRedis();
// await redis.disconnect();
