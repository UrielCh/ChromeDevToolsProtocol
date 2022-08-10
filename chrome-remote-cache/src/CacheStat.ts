import pc from 'picocolors'
import { formatSize, splitUrl } from './CacheUtils'

/**
 * a simple class to eveluate data transfert per domains
 */
export class CacheStat {
    #query = 0;
    #transfert = 0;
    #perDom: { [key: string]: number } = {};

    /**
     * get number of query
     */
    public get query(): number {
        return this.#query;
    }

    /**
     * get total bandwidh
     */
     public get transfert(): number {
        return this.#transfert;
    }

    /**
     * increate data usage from a particular url.
     * @param url 
     * @param meta 
     * @param length 
     */
    public add(url: string, meta: string, length?: number): void {
        if (url.startsWith('data:'))
            return;
        this.#query++;
        let size = meta.length
        if (length)
            size += length;
        this.#transfert += size;

        const [dom] = splitUrl(url);
        let old = this.#perDom[dom] || 0;
        this.#perDom[dom] = old + size;
    }

    /**
     * output stat as a string
     * 
     * @param full will spit statistique per domains
     */
    public toString(full?: boolean): string {
        let out = `${pc.green(formatSize(this.#transfert))} in ${pc.green(this.#query.toString().padStart(3, ' '))} Query`;
        if (full) {
            const asArray = Object.entries(this.#perDom);
            asArray.sort((a, b) => b[1] - a[1])
            for (const [dom, size] of asArray) {
                // if (size > 50000)
                out += ` ${pc.yellow(dom)}:${pc.green(formatSize(size))}`;
            }
        }
        return out;
    }
}
