import { pc, Protocol, Chrome, b64Encode, b64Decode } from "../deps.ts";
import { dropQueryParam, splitUrl } from './CacheUtils.ts'
import UrlSet from './UrlSet.ts';
import { CacheStat } from './CacheStat.ts';
import { CacheModel } from './model.ts';
import CacheManagerRedisTTL from './CacheManagerRedisTTL.ts';
import CacheManager from './CacheManager.ts';

const EMPTY_ARRAY: Uint8Array = new Uint8Array(0);
// const EMPTY_ARRAY = new Buffer();

type ToKey = (url: string) => string;
const dummy = (url: string) => url;

const PREFIXS = {
    'cached': pc.bold(pc.green('cached')),
    'missing': pc.magenta('missing'),
    'blocked': pc.red('blocked'),
    'pass': pc.bold(pc.white('pass')),
    'addcache': pc.bgMagenta('ADD Cache'),
}

// cache https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkliZ0tt-7UEKoB_KBN7v3D121PhkkA1JZRlvvV4Rv&s=10
export class ChromeRemoteCache {
    private blockedDomains = new UrlSet<boolean>();
    private ignoreDomains = new UrlSet<boolean>();
    private cacheDomain = new UrlSet<ToKey>();
    private statCache = new CacheStat();
    private statPassthrough = new CacheStat();
    #logfnc: (message: string) => void = console.log;

    constructor(private cm = new CacheManagerRedisTTL() as CacheManager) {
    }

    public close() {
        this.cm.close();
    }

    public set logFnc(fnc: (message: string) => void) {
        this.#logfnc = fnc;
    }

    public block(...doms: string[]) {
        for (const dom of doms)
            this.blockedDomains.add(dom, true);
    }

    public cache(...doms: string[]) {
        for (const dom of doms)
            this.cacheDomain.add(dom, dummy);
    }

    /**
     * alias for cache(doms), ignore(doms)
     * @param doms url selections
     */
    public cacheIgnore(...doms: string[]) {
        this.cache(...doms);
        this.ignore(...doms);
    }

    public cacheRemap(dom: string, mapping: (url: string) => string) {
        this.cacheDomain.add(dom, mapping);
    }
    /**
     * do not log those request
     * @param doms 
     */
    public ignore(...doms: string[]) {
        for (const dom of doms)
            this.ignoreDomains.add(dom, true);
    }

    private log(type: 'addcache' | 'cached' | 'missing' | 'blocked' | 'pass', textUrl: string) {
        if (this.ignoreDomains.match(textUrl))
            return;
        const prefix = PREFIXS[type];
        this.#logfnc(`${prefix}: ${textUrl}`);
    }

    private getCacheKey(textUrl: string): [string, string] | null {
        textUrl = dropQueryParam(textUrl, 'gclid');
        const toKey = this.cacheDomain.match(textUrl);
        if (toKey) {
            return splitUrl(toKey(textUrl));
        }
        return null;
    }

    /**
     * connect the module to a chrome page
     * @param page 
     */
    public async register(page: Chrome): Promise<void> {
        const continueRequest = async (requestId: string) => {
            try {
                await page.Fetch.continueRequest({ requestId });
            } catch (e) {
                console.log(`failed to continueRequest ${requestId} err:${e}`);
            }
        }

        const failRequest = async (requestId: string) => {
            try {
                await page.Fetch.failRequest({ requestId, errorReason: 'BlockedByClient' });
            } catch (e) {
                console.log(`failed to failRequest ${requestId} err:${e}`);
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

        page.Fetch.on("requestPaused", async (event: Protocol.Fetch.RequestPausedEvent) => {
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
                        delete headers['link'];
                        const responseHeaders = [] as Protocol.Fetch.HeaderEntry[];
                        for (const [name, value] of Object.entries(headers)) {
                            responseHeaders.push({ name, value })
                        }
                        this.log('cached', textUrl);
                        try {
                            await page.Fetch.fulfillRequest({
                                requestId: event.requestId,
                                responseCode: status,
                                responseHeaders,
                                body: b64Encode((data || EMPTY_ARRAY)),//  data?.toString('base64') || '',
                                // body: b64Encode((data || EMPTY_ARRAY).bytes({ copy: false })),//  data?.toString('base64') || '',
                            });
                            // Uint8Array Vs ArrayBuffer
                        } catch (ee) {
                            console.log(`L164: (${meta.status})`, textUrl, ee)
                            console.log(JSON.stringify(meta.headers));
                            return continueRequest(event.requestId);
                        }
                        return;
                    } else {
                        console.error(`invalid cached data for ${textUrl} metaStr: ${metaStr}`);
                        return continueRequest(event.requestId);
                    }
                }
                this.log('missing', cacheKey.join('/'));
                return continueRequest(event.requestId);
            }

            /**
             * is dom blocked
             */
            if (this.blockedDomains.match(textUrl)) {
                this.log('blocked', textUrl);
                return failRequest(event.requestId);
            }
            this.log('pass', textUrl);
            try {
                return continueRequest(event.requestId);
            } catch (e) {
                console.error(e);
            }
        });

        page.Network.on('loadingFinished', async (data: Protocol.Network.LoadingFinishedEvent) => {
            const { requestId } = data;
            const req = responses[requestId];
            if (!req)
                return;
            const { url, status, headers } = req.response;
            if (url.startsWith('data:')) {
                return
            }

            let resp: Protocol.Network.GetResponseBodyResponse | null = null;
            try {
                resp = await page.Network.getResponseBody({ requestId })
            } catch (_e) {
                // ignore
            }
            if (!resp) {
                resp = { body: '', base64Encoded: false }
                // console.log(`No body (${status}) for url: ${url}`, );
                // return;
            }
            const cacheKey = this.getCacheKey(url)
            if (!cacheKey) {
                let len = 0;
                resp.body.length;
                if (resp.base64Encoded)
                    len = len / 4 * 3
                this.statPassthrough.add(url, JSON.stringify(headers), len)
                return;
            }
            const old = await this.cm.getCacheMeta(cacheKey);
            if (old) { // keep old version
                return;
            }
            this.log('addcache', cacheKey.join('/'));
            const maxAge = 60 * 60 * 24 * 32;
            const cacheData: CacheModel = {
                status,
                headers,
                binary: resp.base64Encoded,
                expires: Date.now() + (maxAge * 1000),
            }
            await this.cm.setCacheMeta(cacheKey, JSON.stringify(cacheData));
            if (resp.base64Encoded) {
                const data = b64Decode(resp.body);
                // new Buffer(data)
                await this.cm.setCacheData(cacheKey, data); // Buffer.from(resp.body, 'base64')
            } else {
                // Buffer.from(resp.body, 'utf-8')
                const data = new TextEncoder().encode(resp.body);
                // new Buffer(data)
                await this.cm.setCacheData(cacheKey, data);
            }
        });
    }

    public getStats(): { cache: CacheStat, pt: CacheStat } {
        return {
            cache: this.statCache,
            pt: this.statPassthrough,
        }
    }

    /**
     * return cache 
     */
    public get efficency(): number {
        return this.statCache.transfert / (this.statCache.transfert + this.statPassthrough.transfert);
    }

}

export default ChromeRemoteCache;