import { assertEquals } from "../dev_deps.ts";
// import { serial as test } from 'ava';
import { dropQueryParam, splitUrl, formatSize } from './CacheUtils.ts'

const { test } = Deno;

test('dropQueryParam no params', _t => {
    const url = 'http://domain.com/'
    const result = dropQueryParam(url, 'a')
    assertEquals(result, url, 'no param keep input as it')
});

test('dropQueryParam no change', _t => {
    const url = 'http://domain.com/?b=c'
    const result = dropQueryParam(url, 'a')
    assertEquals(result, url, 'no change if param not present')
});

test('dropQueryParam drop last uniq param', _t => {
    const url = 'http://domain.com/?a=c'
    const expected = 'http://domain.com/'
    const result = dropQueryParam(url, 'a', 'Drop uniq last param remove le tailing ?')
    assertEquals(result, expected)
});

test('dropQueryParam drop first arg', _t => {
    const url = 'http://domain.com/?a=c&b=c'
    const expected = 'http://domain.com/?b=c'
    const result = dropQueryParam(url, 'a')
    assertEquals(result, expected, 'keep the first ?')
});

test('dropQueryParam drop middle arg', _t => {
    const url = 'http://domain.com/?d=totot&a=c&b=c'
    const expected = 'http://domain.com/?d=totot&b=c'
    const result = dropQueryParam(url, 'a')
    assertEquals(result, expected, 'should remove middle param')
});

test('dropQueryParam drop last arg', _t => {
    const url = 'http://domain.com/?d=totot&a=c&b=cdata'
    const expected = 'http://domain.com/?d=totot&a=c'
    const result = dropQueryParam(url, 'b')
    assertEquals(result, expected, 'drop end of query')
});

test('splitUrl simple', _t => {
    const url = 'http://domain.com'
    const expected = ['domain.com', '']
    const result = splitUrl(url)
    assertEquals(result, expected, 'only domain')
});

test('splitUrl simple + /', _t => {
    const url = 'http://domain.com/'
    const expected = ['domain.com', '']
    const result = splitUrl(url)
    assertEquals(result, expected, 'only domain')
});

test('splitUrl simple + port', _t => {
    const url = 'http://domain.com:80/'
    const expected = ['domain.com:80', '']
    const result = splitUrl(url)
    assertEquals(result, expected, 'only domain')
});

test('splitUrl path', _t => {
    const url = 'http://domain.com/path'
    const expected = ['domain.com', 'path']
    const result = splitUrl(url)
    assertEquals(result, expected, 'split path')
});

test('splitUrl path no protocol', _t => {
    const url = 'domain.com/path'
    const expected = ['domain.com', 'path']
    const result = splitUrl(url)
    assertEquals(result, expected, 'split path')
});

test('formatSize B', _t => {
    const result = formatSize(2)
    assertEquals(result, '2B')
});

test('formatSize 1050', _t => {
    const result = formatSize(1050)
    assertEquals(result, '1.05KB')
});

test('formatSize 10500', _t => {
    const result = formatSize(10500)
    assertEquals(result, '10.5KB')
});

test('formatSize 105000', _t => {
    const result = formatSize(105000)
    assertEquals(result, '105KB')
});
