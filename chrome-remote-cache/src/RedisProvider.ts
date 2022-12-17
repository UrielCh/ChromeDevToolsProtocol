// import { createClient, commandOptions } from "npm:redis";
// import { Redis } from "npm:ioredis";

// import Redis from "npm:ioredis";
// import { createClient } from "npm:redis";
// import { connect } from "https://deno.land/x/redis@v0.27.4/mod.ts";


import { connect, type Redis } from "https://deno.land/x/redis@v0.27.4/mod.ts";
export { type Redis } from "https://deno.land/x/redis@v0.27.4/mod.ts";
export type RedisBinary = Uint8Array;

export function newRedis(opts?: { hostname?: string }): Promise<Redis> {
    opts = opts || {};
    const hostname = opts.hostname || '127.0.0.1';
    return connect({ hostname });
}

export async function openRedis(redis: Redis | Promise<Redis>): Promise<Redis> {
    return redis;
}

export async function closeRedis(redis: Redis | Promise<Redis>): Promise<void> {
    (await redis).close();
}


export async function redisPing(redis: Redis | Promise<Redis>): Promise<void> {
    (await redis).ping();
}

export async function redisGetString(redis: Redis, key: string): Promise<string | null> {
    const replay = await redis.get(key);
    if (!replay)
        return null;
    return replay;
}

export async function redisGetBin(redis: Redis, key: string): Promise<RedisBinary | null> {
    // const replay = await redis.GET(commandOptions({ returnBuffers: true }), key);
    const replay = await redis.sendCommand("GET", key);
    if (!replay)
        return null;
    return replay.buffer();
}

export async function redisSetEx(redis: Redis, key: string, seconds: number, value: RedisBinary | string): Promise<void> {
    // const replay = await redis.GET(commandOptions({ returnBuffers: true }), key);
    await redis.setex(key, seconds, value);
}

export function redisIncBy(redis: Redis, key: string, increment: number): Promise<number> {
    return redis.incrby(key, increment);
}

export function redisHIncBy(redis: Redis, key: string, field: string, increment: number): Promise<number> {
    return redis.hincrby(key, field, increment);
}


export async function redisExpire(redis: Redis, key: string, seconds: number): Promise<void> {
    await redis.expire(key, seconds);
}


export function redisHget(redis: Redis, key: string, field: string): Promise<string | null> {
    return redis.hget(key, field);
}

export async function redisHgetBin(redis: Redis, key: string, field: string): Promise<RedisBinary | null> {
    const reply = await redis.sendCommand('hget', key, field);
    if (!reply)
        return null;
    return reply.buffer();
}


export async function redisHset(redis: Redis, key: string, field: string, value: RedisBinary | string): Promise<void> {
    await redis.hset(key, field, value);
}

// ReturnType<typeof createClient>
// if (!this.redis.isOpen)
// await this.redis.connect();
// return this.redis;
// const redis = await this.getRedis();
// await redis.disconnect();
