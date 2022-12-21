export type RedisBinary = Uint8Array;

export interface RedisWrapper {

    //    constructor(opts?: { hostname?: string }) {
    //        opts = opts || {};
    //        const hostname = opts.hostname || '127.0.0.1';
    //        this.#redis = connect({ hostname });
    //        // this.#redis = createClient()
    //        // this.#redis = new RedisExt()
    //    }
    connect(): Promise<RedisWrapper>;

    close(): Promise<void>;

    PING(): Promise<void>;

    GET(key: string): Promise<string | null>;

    GETbin(key: string): Promise<RedisBinary | null>;

    SETEX(key: string, seconds: number, value: RedisBinary | string): Promise<void>;

    INCBY(key: string, increment: number): Promise<number>;

    HINCBY(key: string, field: string, increment: number): Promise<number>;

    EXPIRE(key: string, seconds: number): Promise<void>;

    HGET(key: string, field: string): Promise<string | null>;

    HGETbin(key: string, field: string): Promise<RedisBinary | null>;

    HSET(key: string, field: string, value: RedisBinary | string): Promise<void>;

    HDEL(key: string, field: string): Promise<number>;

    DEL(key: string): Promise<number>;
}

export default RedisWrapper;


// ReturnType<typeof createClient>
// if (!this.redis.isOpen)
// await this.redis.connect();
// return this.redis;
// const redis = await this.getRedis();
// await redis.disconnect();
