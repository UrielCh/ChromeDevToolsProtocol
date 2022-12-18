import { splitUrl } from './CacheUtils.ts'

type RulesStore<T> = Map<string, Array<[string, T]>>;

export class UrlSet<T> {
    #size = 0;
    private rules: RulesStore<T> = new Map();
    private widecard: RulesStore<T> = new Map();

    /**
     * get number of rule in the set
     */
    public get size(): number {
        return this.#size;
    }
    /**
     * get number of widcard domain selected
     */
    public get widecardDomCount(): number {
        return this.widecard.size;
    }
    /**
     * get number of domain selected
     */
    public get domCount(): number {
        return this.rules.size;
    }

    /**
     * add a rule, if the rule is already present update it
     * 
     * @param rule rule name
     * @param value value attached to the rule
     */
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
        // check duplicate
        const key = (p === -1) ? '*' : rule.substring(p + 1);
        const old = list.find(e => e[0] == key);
        if (old) {
            old[1] = value;
        } else {
            list.push([key, value])
            this.#size++;
        }
    }

    /**
     * Delete a rule
     * @param rule rule to remove
     * @returns true if a rule was removed.
     */
    public del(rule: string): boolean {
        if (!rule)
            return false;
        let dest: RulesStore<T>;
        const p = rule.indexOf('/');
        let domain = (p === -1) ? rule : rule.substring(0, p);
        if (domain.startsWith('*.')) {
            domain = domain.substring(2);
            dest = this.widecard;
        } else {
            dest = this.rules;
        }
        const list = dest.get(domain);
        if (!list) {
            return false;
        }
        // check duplicate
        const key = (p === -1) ? '*' : rule.substring(p + 1);
        const idx = list.findIndex(e => e[0] == key);
        if (idx === -1) {
            return false;
        }
        this.#size--;
        if (list.length === 1) {
            dest.delete(domain);
        } else {
            list.splice(idx, 1);
        }
        return true;
    }

    /**
     * get Attached value matching the url.
     * @param url url to lookup
     * @returns associated value
     */
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