// deno-lint-ignore-file no-constant-condition
import { assertEquals } from "../dev_deps.ts";
import RedisR2d2 from "./RedisR2d2.ts";
import RedisWrapper from "./RedisWrapper.ts";
import RedisMoke from './RedisMoke.ts';
import RedisDeno from './RedisDeno.ts';

const { test } = Deno;
type TestContext = Deno.TestContext;

async function runTest(redis: RedisWrapper, t?: TestContext) {
    await redis.connect();
    if (true) {
        const definition = {
            name: 'set / get string',
            async fn(_t?: TestContext) {
                const value = 'value_' + Date.now();
                await redis.SETEX('k1', 120, value);
                const v2 = await redis.GET('k1');
                assertEquals(v2, value, 'Test GET string');
            }
        };
        if (t) {
            await t.step(definition)
        } else {
            console.log(definition.name);
            await definition.fn(t)
        }
    }
    if (true) {
        const definition = {
            name: 'set / get binary',
            async fn(_t?: TestContext) {
                const array = [0, 1, 2, 3];
                const value = new Uint8Array(array);
                await redis.SETEX('k1', 120, value);
                const v2 = await redis.GETbin('k1');
                assertEquals(v2, value, `Test GET string but ref ${v2}`);
            }
        }
        if (t) {
            await t.step(definition)
        } else {
            console.log(definition.name);
            await definition.fn(t)
        }
    }
    if (true) {
        const definition = {
            name: 'Get binary Do not exists',
            async fn(_t?: TestContext) {
                const v2 = await redis.GETbin('k1_do_not_exists');
                assertEquals(v2, null, `GET do_not_exists return null but return "${v2}" Type: ${typeof v2}`);
            }
        }
        if (t) {
            await t.step(definition)
        } else {
            console.log(definition.name);
            await definition.fn(t)
        }
    }

    if (true) {
        const definition = {
            name: 'hset / hget text',
            async fn(_t?: TestContext) {
                const value = 'value_' + Date.now();
                await redis.HSET('hash', 'k1', value);
                const v2 = await redis.HGET('hash', 'k1');
                assertEquals(v2, value, 'Test GET string');
            }
        }
        if (t) {
            await t.step(definition)
        } else {
            console.log(definition.name);
            await definition.fn(t)
        }
    }

    if (true) {
        const definition = {
            name: 'hset / hget binary',
            async fn(_t?: TestContext) {
                const now = Date.now();
                const array = [(now / 256) % 256, now % 256];
                const value = new Uint8Array(array);
                await redis.HSET('hash', 'k1', value);
                const v2 = await redis.HGETbin('hash', 'k1');
                assertEquals(v2, value, 'Test GET string');
            }
        }
        if (t) {
            await t.step(definition)
        } else {
            console.log(definition.name);
            await definition.fn(t)
        }
    }

    if (true) {
        const definition = {
            name: 'HGet binary Do not exists',
            async fn(_t?: TestContext) {
                const v2 = await redis.HGETbin('k1_do_not_exists', 'k2');
                assertEquals(v2, null, `HGET do_not_exists.k2 return null but return "${v2}" Type: ${typeof v2}`);
            }
        }
        if (t) {
            await t.step(definition)
        } else {
            console.log(definition.name);
            await definition.fn(t)
        }
    }

    await redis.close();
}

test('test R2D2 redis', (t) => runTest(new RedisR2d2(), t))
test('test Moke redis', (t) => runTest(new RedisMoke(), t))
test('test redis-deno', (t) => runTest(new RedisDeno(), t))

// test('test redis-node', (t) => runTest(new RedisNode(), t))

// await runTest(new RedisNode())
// console.log('pass');