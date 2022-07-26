import pc from 'picocolors'
import { formatSize, splitUrl } from './MyUtils'

export class CacheStat {
    public query = 0;
    public transfert = 0;
    public perDom: { [key: string]: number } = {};

    add(url: string, meta: string, length?: number) {
        if (url.startsWith('data:'))
            return;
        this.query++;
        let size = meta.length
        if (length)
            size += length;
        this.transfert += size;

        const [dom] = splitUrl(url);
        let old = this.perDom[dom] || 0;
        this.perDom[dom] = old + size;
    }

    toString(full?: boolean): string {
        let out = `${pc.green(formatSize(this.transfert))} in ${pc.green(this.query.toString().padStart(3, ' '))} Query`;
        if (full) {
            const asArray = Object.entries(this.perDom);
            asArray.sort((a, b) => b[1] - a[1])
            for (const [dom, size] of asArray) {
                // if (size > 50000)
                out += ` ${pc.yellow(dom)}:${pc.green(formatSize(size))}`;
            }
        }
        return out;
    }
}
