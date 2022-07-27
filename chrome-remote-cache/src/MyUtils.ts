export function dropQueryParam(url: string, ...params: string[]): string {
    const start = url.indexOf('?');
    if (start === -1)
        return url

    for (const param of params) {
        let offset = url.indexOf(`?${param}=`, start)
        if (offset != -1) {
            const next = url.indexOf('&', offset + 1)
            if (next === -1) {
                // no agrs left
                return url.substring(0, start);
            } else {
                url = url.substring(0, offset + 1) + url.substring(next + 1);
            }
        } else {
            offset = url.indexOf(`&${param}=`, start)
            if (offset != -1) {
                const next = url.indexOf('&', offset + 1)
                if (next === -1) {
                    url = url.substring(0, offset);
                } else {
                    url = url.substring(0, offset + 1) + url.substring(next + 1);
                }
            }
        }
    }
    return url;
}

/**
 * cut url in domain + path drop port and protocol
 * @param url the url
 * @return [domain, path]
 */
export function splitUrl(url: string): [string, string] {
    let prot = url.indexOf('://');
    if (prot === -1) // no protocol
        prot = 0
    else
        prot+= 3
    const fulldom = url.indexOf('/', prot);
    if (fulldom === -1) {
        return [url.substring(prot), '']
    }
    // keep port
    const domain = url.substring(prot, fulldom);
    const path = url.substring(fulldom + 1);
    return [domain, path];
}

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
const STEP = 1000;
export function formatSize(size: number) {
    let scale = 0
    while (size > STEP) {
        size /= STEP;
        scale++;
    }
    if (scale === 0)
        return size.toFixed(0) + UNITS[scale]
    if (size > 100) {
        return size.toFixed(0) + UNITS[scale]
    }
    if (size > 10) {
        return size.toFixed(1) + UNITS[scale]
    }
    return size.toFixed(2) + UNITS[scale]
}

