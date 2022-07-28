import { splitUrl } from './CacheUtils'

type RulesStore<T> = Map<string, Array<[string, T]>>;

export class UrlSet<T> {
    private rules: RulesStore<T> = new Map();
    private widecard: RulesStore<T> = new Map();

    public add(rule: string, value: T): void {
        if (!rule)
            return;
        let dest: RulesStore<T>;
        const p = rule.indexOf('/');
        let domain = (p === -1) ? rule : rule.substring(0, p);
        if (domain.startsWith('*.')) {
            domain = domain.substring(2);
            dest = this.widecard;
        } else {
            dest = this.rules;
        }
        let list = dest.get(domain);
        if (!list) {
            list = [];
            dest.set(domain, list);
        }
        if (p === -1) {
            list.push(['*', value])
        } else {
            list.push([rule.substring(p + 1), value])
        }
    }

    public match(url: string): T | null {
        let [dom, path] = splitUrl(url);

        let prev = '';
        while (dom) {
            const pool = prev ? this.widecard : this.rules;
            const cur = pool.get(dom);
            if (cur) {
                for (const node of cur) {
                    if (node[0] === '*')
                        return node[1];
                    if (path.startsWith(node[0]))
                        return node[1];
                }
            }
            prev = dom;
            const p = dom.indexOf('.');
            if (p === -1)
                return null;
            dom = prev.substring(p + 1);
        }
        return null;
    }

}
export default UrlSet;