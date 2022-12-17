import { assert, assertEquals } from "../dev_deps.ts";
//import { serial as test } from 'ava';
import { UrlSet } from './UrlSet.ts'

const { test } = Deno;
test('UrlSet Exact', _t => {
    const urlSet = new UrlSet<boolean>();
    urlSet.add('a.com', true)
    assert(urlSet.match('a.com'), 'match exact')
    assert(!urlSet.match('c.com'), 'diffrent domain')
    assert(urlSet.match('a.com/page'), 'match page in exact domaine')
    assert(!urlSet.match('c.com/page'), 'no match page in diffrent domaine')
    assert(!urlSet.match('www.a.com/page'), 'non matched www. prefix')
});

test('UrlSet widecard', _t => {
    const urlSet = new UrlSet();
    urlSet.add('*.a.com', true)
    assert(urlSet.match('a.b.c.a.com'), 'domain match *.a.com')
    assert(!urlSet.match('a.com'), 'a.con dio not match *.a.com')
});

test('UrlSet comprex case', _t => {
    const urlSet = new UrlSet();
    urlSet.add('encrypted-tbn0.gstatic.com/images', true)
    assert(urlSet.match('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHOx1dT0HojzJ56KzHHW-45Vmpjd-X4KcEm3aqyU&s=10'))
});

test('UrlSet no Duplicate', _t => {
    const urlSet = new UrlSet<boolean>();
    assertEquals(urlSet.size, 0);
    urlSet.add('a.com', true)
    assertEquals(urlSet.size, 1);
    urlSet.add('a.com', true)
    assertEquals(urlSet.size, 1);
    urlSet.add('b.com', true)
    assertEquals(urlSet.size, 2);
});

test('UrlSet delete', _t => {
    const urlSet = new UrlSet<boolean>();
    assertEquals(urlSet.size, 0);
    urlSet.add('a.com', true)
    urlSet.add('a.com/page1', true)
    assertEquals(urlSet.size, 2);
    assertEquals(urlSet.domCount, 1);
    assertEquals(urlSet.widecardDomCount, 0);
    urlSet.del('a.com')
    assertEquals(urlSet.size, 1);
    assertEquals(urlSet.domCount, 1);
    urlSet.del('a.com/page1')
    assertEquals(urlSet.size, 0);
    assertEquals(urlSet.domCount, 0);
});

test('UrlSet delete widecard', _t => {
    const urlSet = new UrlSet<boolean>();
    assertEquals(urlSet.size, 0);
    urlSet.add('*.a.com', true)
    urlSet.add('*.a.com/page1', true)
    assertEquals(urlSet.size, 2);
    assertEquals(urlSet.widecardDomCount, 1);
    assertEquals(urlSet.domCount, 0);
    urlSet.del('*.a.com')
    assertEquals(urlSet.size, 1);
    assertEquals(urlSet.widecardDomCount, 1);
    urlSet.del('*.a.com/page1')
    assertEquals(urlSet.size, 0);
    assertEquals(urlSet.widecardDomCount, 0);
});

// test('UrlSet Wide Exact', _t => {
//     const urlSet = new UrlSet();
//     urlSet.addRules('a.com')
//     const url = 'http://domain.com/'
//     t.truthy(urlSet.match('a.com'))
//     t.falsy(urlSet.match('c.com'))
// });
// 