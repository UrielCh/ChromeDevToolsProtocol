import { serial as test } from 'ava';
import { dropQueryParam, splitUrl, formatSize } from './MyUtils'

test('dropQueryParam no params', t => {
    const url = 'http://domain.com/'
    const result = dropQueryParam(url, 'a')
    t.deepEqual(result, url, 'no param keep input as it')
});

test('dropQueryParam no change', t => {
    const url = 'http://domain.com/?b=c'
    const result = dropQueryParam(url, 'a')
    t.deepEqual(result, url, 'no change if param not present')
});

test('dropQueryParam drop last uniq param', t => {
    const url = 'http://domain.com/?a=c'
    const expected = 'http://domain.com/'
    const result = dropQueryParam(url, 'a', 'Drop uniq last param remove le tailing ?')
    t.deepEqual(result, expected)
});

test('dropQueryParam drop first arg', t => {
    const url = 'http://domain.com/?a=c&b=c'
    const expected = 'http://domain.com/?b=c'
    const result = dropQueryParam(url, 'a')
    t.deepEqual(result, expected, 'keep the first ?')
});

test('dropQueryParam drop middle arg', t => {
    const url = 'http://domain.com/?d=totot&a=c&b=c'
    const expected = 'http://domain.com/?d=totot&b=c'
    const result = dropQueryParam(url, 'a')
    t.deepEqual(result, expected, 'should remove middle param')
});

test('dropQueryParam drop last arg', t => {
    const url = 'http://domain.com/?d=totot&a=c&b=cdata'
    const expected = 'http://domain.com/?d=totot&a=c'
    const result = dropQueryParam(url, 'b')
    t.deepEqual(result, expected, 'drop end of query')
});

test('splitUrl simple', t => {
    const url = 'http://domain.com'
    const expected = ['domain.com', '']
    const result = splitUrl(url)
    t.deepEqual(result, expected, 'only domain')
});

test('splitUrl simple + /', t => {
    const url = 'http://domain.com/'
    const expected = ['domain.com', '']
    const result = splitUrl(url)
    t.deepEqual(result, expected, 'only domain')
});

test('splitUrl simple + port', t => {
    const url = 'http://domain.com:80/'
    const expected = ['domain.com:80', '']
    const result = splitUrl(url)
    t.deepEqual(result, expected, 'only domain')
});

test('splitUrl path', t => {
    const url = 'http://domain.com/path'
    const expected = ['domain.com', 'path']
    const result = splitUrl(url)
    t.deepEqual(result, expected, 'split path')
});


test('splitUrl path no protocol', t => {
    const url = 'domain.com/path'
    const expected = ['domain.com', 'path']
    const result = splitUrl(url)
    t.deepEqual(result, expected, 'split path')
});




test('formatSize B', t => {
    const result = formatSize(2)
    t.deepEqual(result, '2B')
});

test('formatSize 1050', t => {
    const result = formatSize(1050)
    t.deepEqual(result, '1.05KB')
});

test('formatSize 10500', t => {
    const result = formatSize(10500)
    t.deepEqual(result, '10.5KB')
});

test('formatSize 105000', t => {
    const result = formatSize(105000)
    t.deepEqual(result, '105KB')
});
