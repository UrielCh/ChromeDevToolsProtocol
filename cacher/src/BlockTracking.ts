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
    private blockedDomains = new UrlSet<boolean>();
    private ignoreDomains = new UrlSet<boolean>();
    private cacheDomain = new UrlSet<ToKey>();

    statCache = new CacheStat();
    statPassthrough = new CacheStat();

    constructor(private cm: CacheManager) {
    }

    public close() {
        this.cm.close();
    }

    block(dom: string) {
        this.blockedDomains.add(dom, true);
    }

    cache(...doms: string[]) {
        for (const dom of doms)
            this.cacheDomain.add(dom, dummy);
    }

    cacheRemap(dom: string, mapping: (url: string) => string) {
        this.cacheDomain.add(dom, mapping);
    }
    /**
     * do not log those request
     * @param doms 
     */
    ignore(...doms: string[]) {
        for (const dom of doms)
            this.ignoreDomains.add(dom, true);
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
        const continueRequest = async (requestId: string) => {
            try {
                await page.Fetch.continueRequest({ requestId });
            } catch (e) {
                console.log(`failed to continueRequest ${requestId}`);
            }
        }

        const failRequest = async (requestId: string) => {
            try {
                await page.Fetch.failRequest({ requestId, errorReason: 'BlockedByClient' });
            } catch (e) {
                console.log(`failed to failRequest ${requestId}`);
            }
        }

        await page.Network.enable();
        // await page.Page.enable({});
        // await page.Page.setLifecycleEventsEnabled({ enabled: true });
        // cache must be disable to use Fetch.enable

        await page.Network.setCacheDisabled({ cacheDisabled: true });
        await page.Fetch.enable({ "handleAuthRequests": true, patterns: [{ urlPattern: '*' }] });

        // await page.setRequestInterception(true);
        const responses: Record<string, Protocol.Network.ResponseReceivedEvent> = {};
        const pausedRequests: Record<string, Protocol.Fetch.RequestPausedEvent> = {};

        page.Network.on('responseReceived', (data: Protocol.Network.ResponseReceivedEvent) => {
            responses[data.requestId] = data;
        });

        page.Fetch.on("requestPaused", async (event) => {
            pausedRequests[event.requestId] = event;
            const textUrl = event.request.url;
            if (textUrl.startsWith('data:')) {
                return continueRequest(event.requestId);
            }
            /**
             * check from cache
             */
            const cacheKey = this.getCacheKey(textUrl)
            if (cacheKey) {
                const metaStr = await this.cm.getCacheMeta(cacheKey);
                if (metaStr) {
                    const data = await this.cm.getCacheData(cacheKey);
                    this.statCache.add(textUrl, metaStr, data?.length);
                    await this.cm.cacheIncUsage(cacheKey, 1);
                    const meta: CacheModel = JSON.parse(metaStr);
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
                        // let body: string;
                        //if (meta.binary) {
                        const body = data?.toString('base64') || '';
                        // } else {
                        //     body = data?.toString('utf-8') || '';
                        // }

                        // console.log(`${pc.green(pc.bold('inCache'))} URL: ${textUrl}`);
                        try {
                            await page.Fetch.fulfillRequest({
                                requestId: event.requestId,
                                responseCode: status,
                                responseHeaders,
                                body,
                            });
                        } catch (ee) {
                            console.log(`L164: (${meta.status})`, textUrl, ee)
                            console.log(JSON.stringify(meta.headers));
                            return continueRequest(event.requestId);
                            // send blank page
                            // await page.Fetch.fulfillRequest({
                            //     requestId: event.requestId,
                            //     responseCode: 200,
                            //     responseHeaders: [{ name: 'contentType', value: 'text/html' } as Protocol.Fetch.HeaderEntry],
                            //     body: `<html><body><h1>Oups</h1><code></code>${ee}</body></html>`,
                            // });
                        }

                        return;
                    } else {
                        console.log(`invalid cached data for ${textUrl} metaStr: ${metaStr}`);
                        return continueRequest(event.requestId);
                    }
                }
                // if (!this.ignoreDomains.match(textUrl))
                //     console.log(`${pc.bgMagenta('Miss Cache')}: ${cacheKey.join('/')}`);
                return continueRequest(event.requestId);
            }

            /**
             * is dom blocked
             */
            if (this.blockedDomains.match(textUrl)) {
                if (!this.ignoreDomains.match(textUrl))
                    console.log(`${pc.red('Blocked')} URL: ${textUrl}`);
                return failRequest(event.requestId);
            }
            if (!this.ignoreDomains.match(textUrl))
                console.log(`Pass ${pc.white(textUrl)}`);
            try {
                return continueRequest(event.requestId);
            } catch (e) {
                // await page.Fetch.continueResponse
                // await page.Fetch.continueRequest({})
                console.error(e);
            }
        });

        // page.Network.on('requestWillBeSent', async (event) => {
        //     const { request } = event;
        //     const textUrl = request.url;
        // });
        // page.Fetch.requestPaused();

        page.Network.on('loadingFinished', async (data: Protocol.Network.LoadingFinishedEvent) => {
            const { requestId } = data;
            // const req = pausedRequests[requestId];
            const req = responses[requestId];

            if (!req)
                return;
            // const { url, status, headers } = req.response;
            const { url, status, headers } = req.response;
            if (url.startsWith('data:')) {
                return
            }
            const cacheKey = this.getCacheKey(url)
            if (!cacheKey) {
                let len = 0;// body.body.length;
                //if (body.base64Encoded)
                //    len = len / 4 * 3
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
            const body = await page.Network.getResponseBody({ requestId })
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