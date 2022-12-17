import { serial as test } from 'ava';
import { UrlSet } from './UrlSet'

test('UrlSet Exact', t => {
    const urlSet = new UrlSet<boolean>();
    urlSet.add('a.com', true)
    t.truthy(urlSet.match('a.com'))
    t.falsy(urlSet.match('c.com'))
    t.truthy(urlSet.match('a.com/page'))
    t.falsy(urlSet.match('c.com/page'))
    t.falsy(urlSet.match('www.a.com/page'))
});

test('UrlSet widecard', t => {
    const urlSet = new UrlSet();
    urlSet.add('*.a.com', true)
    t.truthy(urlSet.match('a.b.c.a.com'))
    t.falsy(urlSet.match('a.com'))
});

test('UrlSet comprex case', t => {
    const urlSet = new UrlSet();
    urlSet.add('encrypted-tbn0.gstatic.com/images', true)
    t.truthy(urlSet.match('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHOx1dT0HojzJ56KzHHW-45Vmpjd-X4KcEm3aqyU&s=10'))
});

test('UrlSet no Duplicate', t => {
    const urlSet = new UrlSet<boolean>();
    t.deepEqual(urlSet.size, 0);
    urlSet.add('a.com', true)
    t.deepEqual(urlSet.size, 1);
    urlSet.add('a.com', true)
    t.deepEqual(urlSet.size, 1);
    urlSet.add('b.com', true)
    t.deepEqual(urlSet.size, 2);
});

test('UrlSet delete', t => {
    const urlSet = new UrlSet<boolean>();
    t.deepEqual(urlSet.size, 0);
    urlSet.add('a.com', true)
    urlSet.add('a.com/page1', true)
    t.deepEqual(urlSet.size, 2);
    t.deepEqual(urlSet.domCount, 1);
    t.deepEqual(urlSet.widecardDomCount, 0);
    urlSet.del('a.com')
    t.deepEqual(urlSet.size, 1);
    t.deepEqual(urlSet.domCount, 1);
    urlSet.del('a.com/page1')
    t.deepEqual(urlSet.size, 0);
    t.deepEqual(urlSet.domCount, 0);
});

test('UrlSet delete widecard', t => {
    const urlSet = new UrlSet<boolean>();
    t.deepEqual(urlSet.size, 0);
    urlSet.add('*.a.com', true)
    urlSet.add('*.a.com/page1', true)
    t.deepEqual(urlSet.size, 2);
    t.deepEqual(urlSet.widecardDomCount, 1);
    t.deepEqual(urlSet.domCount, 0);
    urlSet.del('*.a.com')
    t.deepEqual(urlSet.size, 1);
    t.deepEqual(urlSet.widecardDomCount, 1);
    urlSet.del('*.a.com/page1')
    t.deepEqual(urlSet.size, 0);
    t.deepEqual(urlSet.widecardDomCount, 0);
});



// test('UrlSet Wide Exact', t => {
//     const urlSet = new UrlSet();
//     urlSet.addRules('a.com')
//     const url = 'http://domain.com/'
//     t.truthy(urlSet.match('a.com'))
//     t.falsy(urlSet.match('c.com'))
// });
// 