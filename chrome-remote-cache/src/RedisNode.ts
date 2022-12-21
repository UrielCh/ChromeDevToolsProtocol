
// import { createClient, commandOptions } from "npm:redis";
// import RedisWrapper from "./RedisWrapper.ts";
// import { Buffer } from "https://deno.land/std@0.170.0/io/buffer.ts";
//
// export type RedisBinary = Uint8Array;
//
// export class RedisNode implements RedisWrapper {
//     #redis: ReturnType<typeof createClient>;
//     constructor(opts?: { hostname?: string }) {
//         opts = opts || {};
//         const hostname = opts.hostname || '127.0.0.1';
//         this.#redis = createClient({ url: `redis://${hostname}` });
//     }
//
//     async connect(): Promise<RedisNode> {
//         if (!this.#redis.isOpen) {
//             await this.#redis.connect();
//         }
//         return this;
//     }
//
//     async close(): Promise<void> {
//         const redis = this.#redis;
//         if (this.#redis.isOpen)
//             await redis.disconnect();
//     }
//
//     async PING(): Promise<void> {
//         const redis = this.#redis;
//         await redis.ping();
//     }
//
//     async GET(key: string): Promise<string | null> {
//         const redis = this.#redis;
//         const replay = await redis.get(key);
//         if (!replay)
//             return null;
//         return replay.toString();
//     }
//
//     async GETbin(key: string): Promise<RedisBinary | null> {
//         const redis = this.#redis;
//         const replay = await redis.get(commandOptions({ returnBuffers: true }), key);
//         if (!replay)
//             return null;
//         if (replay instanceof Uint8Array) {
//             console.log('replay Uint8Array Value: ', replay)
//             return replay as unknown as RedisBinary;
//         } else {
//             console.log('replay Type: ', replay)
//             return replay as unknown as RedisBinary;
//         }
//     }
//
//     async SETEX(key: string, seconds: number, value: RedisBinary | string): Promise<void> {
//         const redis = this.#redis;
//         if (typeof (value) === 'object') {
//             console.log('SETEX, of type object value', value.buffer)
//             debugger;
//             // await redis.setEx(key, seconds, new Buffer(value));
//             // await redis.setEx(commandOptions({ returnBuffers: true }), key, seconds, value.buffer);
//             // await redis.setEx(commandOptions({ returnBuffers: true }), key, seconds, value.buffer);
//             // await redis.setEx(commandOptions({ returnBuffers: true }), key, seconds, new Deno.Buffer(value));
//             await redis.setEx(commandOptions({ returnBuffers: true }), key, seconds, new Buffer(value));
//         } else {
//             await redis.setEx(key, seconds, value);
//         }
//         console.log('SETEX DOone')
//     }
//
//     async INCBY(key: string, increment: number): Promise<number> {
//         const redis = this.#redis;
//         const replay = await redis.incrBy(key, increment);
//         if (!replay) // TMP
//             return 0;
//         return Number(replay);
//     }
//
//     async HINCBY(key: string, field: string, increment: number): Promise<number> {
//         const redis = this.#redis;
//         const replay = await redis.hIncrBy(key, field, increment);
//         if (!replay) // TMP
//             return 0;
//         return Number(replay);
//     }
//
//     async EXPIRE(key: string, seconds: number): Promise<void> {
//         const redis = this.#redis;
//         await redis.expire(key, seconds);
//     }
//
//     async HGET(key: string, field: string): Promise<string | null> {
//         const redis = this.#redis;
//         const replay = await redis.hGet(key, field);
//         return replay as string | null;
//     }
//
//     async HGETbin(key: string, field: string): Promise<RedisBinary | null> {
//         const redis = this.#redis;
//         const reply = await redis.hGet(commandOptions({ returnBuffers: true }), key, field);
//         if (!reply)
//             return null;
//         return reply as RedisBinary;// .buffer();
//     }
//
//     async HSET(key: string, field: string, value: RedisBinary | string): Promise<void> {
//         const redis = this.#redis;
//         await redis.hSet(key, field, value);
//     }
//
//     async HDEL(key: string, field: string): Promise<number> {
//         const redis = this.#redis;
//         const replay = await redis.hDel(key, field);
//         return Number(replay);
//     }
//
//     async DEL(key: string): Promise<number> {
//         const redis = this.#redis;
//         const replay = await redis.del(key);
//         return Number(replay);
//     }
// }
//
// export default RedisNode;
// 