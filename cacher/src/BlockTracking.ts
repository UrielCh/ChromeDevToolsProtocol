import pc from 'picocolors'
import { dropQueryParam, splitUrl } from './MyUtils'

import UrlSet from './UrlSet';
import { CacheManager } from './CacheManager';
import { CacheStat } from './CacheStat';
import { CacheModel } from './model';
import { Protocol, Chrome } from "@u4/chrome-remote-interface";

type ToKey = (url: string) => string;
const dummy = (url: string) => url;

// cache https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkliZ0tt-7UEKoB_KBN7v3D121PhkkA1JZRlvvV4Rv&s=10
export class BlockTracking {
    blockedDomains = new UrlSet<boolean>();
    ignoreDomains = new UrlSet<boolean>();
    cacheDomain = new UrlSet<ToKey>();

    statCache = new CacheStat();
    statPassthrough = new CacheStat();

    constructor(private cm: CacheManager) {
    }

    public close() {
        this.cm.close();
    }

    blockDom(dom: string) {
        this.blockedDomains.add(dom, true);
    }

    cacheDoms(...doms: string[]) {
        for (const dom of doms)
            this.cacheDomain.add(dom, dummy);
    }

    getCacheKey(textUrl: string): [string, string] | null {
        textUrl = dropQueryParam(textUrl, 'gclid');
        const toKey = this.cacheDomain.match(textUrl);
        if (toKey) {
            return splitUrl(toKey(textUrl));
        }
        return null;
    }


    async register(page: Chrome) {
        await page.Network.enable();
        await page.Page.enable({});
        await page.Page.setLifecycleEventsEnabled({ enabled: true });
        await page.Fetch.enable({});
        // await page.setRequestInterception(true);
        const requests: Record<string, Protocol.Network.ResponseReceivedEvent> = {};
        page.Network.on('responseReceived', (data) => {
            requests[data.requestId] = data;
        });

        page.Network.on('requestWillBeSent', async (event) => {
            const { request } = event;
            await page.Fetch.requestPaused();
            const textUrl = request.url;
            if (textUrl.startsWith('data:')) {
                // request.continue()
                return
            }
            const cacheKey = this.getCacheKey(textUrl)
            if (cacheKey)
                try {
                    const metaStr = await this.cm.getCacheMeta(cacheKey);
                    if (metaStr) {
                        const data = await this.cm.getCacheData(cacheKey);
                        this.statCache.add(textUrl, metaStr, data?.length);
                        await this.cm.cacheIncUsage(cacheKey, 1);
                        const meta: CacheModel = JSON.parse(metaStr);
                        try {
                            if (meta) {
                                const { status, headers } = meta;
                                // delete headers['server'];
                                // delete headers['last-modified'];
                                // delete headers['etag'];
                                delete headers['expires'];
                                delete headers['date'];
                                delete headers['connection'];
                                const responseHeaders = [] as Protocol.Fetch.HeaderEntry[];
                                for (const [name, value] of Object.entries(headers)) {
                                    responseHeaders.push({ name, value })
                                }
                                let body: string;
                                if (meta.binary) {
                                    body = data?.toString('base64') || '';
                                } else {
                                    body = data?.toString('utf-8') || '';
                                }
                                // delete headers['cache-control'];
                                await page.Fetch.fulfillRequest({
                                    requestId: event.requestId,
                                    responseCode: status,
                                    responseHeaders,
                                    body,
                                });
                                console.log(`${pc.bgGreen('inCache')} URL: ${textUrl}`);
                            } else {
                                console.log(`invalid cached data for ${textUrl} metaStr: ${metaStr}`);
                            }
                            return;
                        } catch (ee) {
                            console.log(`L164: (${meta.status})`, textUrl, ee)
                            console.log(JSON.stringify(meta.headers));
                            // send blank page
                            await page.Fetch.fulfillRequest({
                                requestId: event.requestId,
                                responseCode: 200,
                                responseHeaders: [{ name: 'contentType', value: 'text/html' } as Protocol.Fetch.HeaderEntry],
                                body: `<html><body><h1>Oups</h1><code></code>${ee}</body></html>`,
                            });
                            return;
                        }
                    }
                } catch (e) { 
                    console.error(e);
                }

            if (this.blockedDomains.match(textUrl)) {
                console.log(`${pc.red('Blocked')} URL: ${textUrl}`);
                await page.Fetch.failRequest({ requestId: event.requestId, errorReason: 'BlockedByClient' });
                return;
            }

            if (!this.ignoreDomains.match(textUrl))
                if (cacheKey) {
                    console.log(`${pc.bgMagenta('Miss Cache')}: ${cacheKey.join('/')}`);
                } else {
                    console.log(`Pass ${pc.white(request.url)}`);
                }
            // Block All Images
            // if (request.url().endsWith('.png') || request.url().endsWith('.jpg')) {
            //     request.abort();
            try {
                await page.Fetch.continueRequest({ requestId: event.requestId });
            } catch (e) {

            }
            // request.continue()
        });
        // page.Fetch.requestPaused();

        page.Network.on('loadingFinished', async (data) => {
            const { requestId } = data;
            const req = requests[requestId];
            if (!req)
                return;
            const { url, status, headers } = req.response;
            if (url.startsWith('data:')) {
                return
            }
            const body = await page.Network.getResponseBody({ requestId })
            const cacheKey = this.getCacheKey(url)
            if (!cacheKey) {
                let len = body.body.length;
                if (body.base64Encoded)
                    len = len / 4 * 3
                this.statPassthrough.add(url, JSON.stringify(headers), len)
                return;
            }
            try {
                const old = await this.cm.getCacheMeta(cacheKey);
                if (old) {
                    // keep old version
                    return;
                }
            } catch (e) {
                console.log(url + 'missing from cache');
                // add in cache
            }
            if (!this.ignoreDomains.match(url))
                console.log(`${pc.bgMagenta('ADD Cache')}: ${cacheKey.join('/')}`);
            const maxAge = 60 * 60 * 24 * 32;
            const cacheData: CacheModel = {
                status,
                headers,
                binary: body.base64Encoded,
                expires: Date.now() + (maxAge * 1000),
            }
            await this.cm.setCacheMeta(cacheKey, JSON.stringify(cacheData));
            if (body.base64Encoded)
                await this.cm.setCacheData(cacheKey, Buffer.from(body.body, 'base64'));
            else
                await this.cm.setCacheData(cacheKey, Buffer.from(body.body, 'utf-8'));
            // console.log(data)
        });
    }

    getStats(): { cache: string, pt: string } {
        return {
            cache: this.statCache.toString(),
            pt: this.statPassthrough.toString(),
        }
    }
}

export default BlockTracking;