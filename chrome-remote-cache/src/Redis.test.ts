import { assertEquals } from "../dev_deps.ts";
import RedisR2d2 from "./RedisR2d2.ts";
import RedisWrapper from "./RedisWrapper.ts";
import RedisMoke from './RedisMoke.ts';
import RedisNode from './RedisNode.ts';
import RedisDeno from './RedisNode.ts';
// import { Buffer } from "https://deno.land/std@0.168.0/io/buffer";
// import { Buffer } from "https://deno.land/std@0.168.0/io/buffer.ts";

const { test } = Deno;
type TestContext = Deno.TestContext;

async function runTest(t: TestContext, redis: RedisWrapper) {
    await redis.connect();
    {
        const definition = {
            name: 'set / get string',
            async fn(_t: TestContext) {
                const value = 'value_' + Date.now();
                await redis.SETEX('k1', 120, value);
                const v2 = await redis.GET('k1');
                assertEquals(v2, value, 'Test GET string');
            }
        };
        console.log(definition.name);
        await definition.fn(t)
    }
    {
        const definition = {
            name: 'set / get binary',
            async fn(_t: TestContext) {
                const array = [0, 1, 2, 3];
                const value = new Uint8Array(array);
                // const value = new Buffer([0, 1, 2, 3]);
                await redis.SETEX('k1', 120, value);
                const v2 = await redis.GETbin('k1');
                assertEquals(v2, value, 'Test GET string');
            }
        }
        console.log(definition.name);
        await definition.fn(t)
    }
    {
        const definition = {
            name: 'hset / hget text',
            async fn(_t: TestContext) {
                const value = 'value_' + Date.now();
                // const value = new Buffer([0, 1, 2, 3]);
                await redis.HSET('hash', 'k1', value);
                const v2 = await redis.HGET('hash', 'k1');
                assertEquals(v2, value, 'Test GET string');
            }
        }
        console.log(definition.name);
        await definition.fn(t)
    }

    await redis.close();
}

// test('test R2D2 redis', (t) => runTest(t, new RedisR2d2()))
// test('test Moke redis', (t) => runTest(t, new RedisMoke()))
// test('test redis-node', (t) => runTest(t, new RedisNode()))
test('test redis-deno', (t) => runTest(t, new RedisDeno()))
