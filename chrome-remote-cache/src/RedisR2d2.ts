import RedisWrapper from "./RedisWrapper.ts";
import { sendCommand } from "https://deno.land/x/r2d2@v1.1.3/mod.ts";

export type RedisBinary = Uint8Array;

export class RedisR2d2 implements RedisWrapper {
    #redis: Promise<Deno.TcpConn>;
    constructor(opts?: { hostname?: string }) {
        opts = opts || {};
        const hostname = opts.hostname || '127.0.0.1';
        this.#redis = Deno.connect({ port: 6379, hostname });
    }

    async connect(): Promise<RedisR2d2> {
        await this.#redis;
        return this;
    }

    async close(): Promise<void> {
        const redis = await this.#redis;
        redis.close();
    }

    async PING(): Promise<void> {
        const redis = await this.#redis;
        await sendCommand(redis, ["ping"]);
    }

    async GET(key: string): Promise<string | null> {
        const redis = await this.#redis;
        const replay = await sendCommand(redis, ["GET", key]);
        if (!replay)
            return null;
        return replay.toString();
    }

    async GETbin(key: string): Promise<RedisBinary | null> {
        const redis = await this.#redis;
        const replay = await sendCommand(redis, ["GET", key], true);
        if (!replay)
            return null;
        return replay as unknown as RedisBinary;
    }

    async SETEX(key: string, seconds: number, value: RedisBinary | string): Promise<void> {
        const redis = await this.#redis;
        // const replay = await redis.GET(commandOptions({ returnBuffers: true }), key);
        await sendCommand(redis, ["setex", key, seconds, value]);
    }

    async INCBY(key: string, increment: number): Promise<number> {
        const redis = await this.#redis;
        const replay = await sendCommand(redis, ["incrby", key, increment]);
        if (!replay) // TMP
            return 0;
        return Number(replay);
    }

    async HINCBY(key: string, field: string, increment: number): Promise<number> {
        const redis = await this.#redis;
        const replay = await sendCommand(redis, ['hincrby', key, field, increment]);
        if (!replay) // TMP
            return 0;
        return Number(replay);
    }

    async EXPIRE(key: string, seconds: number): Promise<void> {
        const redis = await this.#redis;
        await sendCommand(redis, ['expire', key, seconds]);
    }

    async HGET(key: string, field: string): Promise<string | null> {
        const redis = await this.#redis;
        const replay = await sendCommand(redis, ['hget', key, field]);
        return replay as string | null;
    }

    async HGETbin(key: string, field: string): Promise<RedisBinary | null> {
        const redis = await this.#redis;
        const reply = await sendCommand(redis, ['hget', key, field], true);
        // const replay = await redis.hGet(commandOptions({ returnBuffers: true }), key, path);
        // const cached: RedisBinary = replay
        // const cached = await redis.hgetBuffer(key, path);
        if (!reply)
            return null;
        return reply as RedisBinary;// .buffer();
    }

    async HSET(key: string, field: string, value: RedisBinary | string): Promise<void> {
        const redis = await this.#redis;
        await sendCommand(redis, ['hset', key, field, value]);
    }

    async HDEL(key: string, field: string): Promise<number> {
        const redis = await this.#redis;
        const replay = await sendCommand(redis, ['hdel', key, field]);
        return Number(replay);
    }

    async DEL(key: string): Promise<number> {
        const redis = await this.#redis;
        const replay = await sendCommand(redis, ['del', key]);
        return Number(replay);
    }
}

export default RedisR2d2;


// ReturnType<typeof createClient>
// if (!this.redis.isOpen)
// await this.redis.connect();
// return this.redis;
// const redis = await this.getRedis();
// await redis.disconnect();
