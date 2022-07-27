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

// test('UrlSet Wide Exact', t => {
//     const urlSet = new UrlSet();
//     urlSet.addRules('a.com')
//     const url = 'http://domain.com/'
//     t.truthy(urlSet.match('a.com'))
//     t.falsy(urlSet.match('c.com'))
// });
// 