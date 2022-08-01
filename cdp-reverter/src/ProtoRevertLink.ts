import http from 'http';
import WebSocket from 'ws';
import pc from 'picocolors';
import { type Protocol } from '@u4/chrome-remote-interface';
import { assert } from 'console';
import crypto from 'crypto';

interface ProtoRequest {
    id: number;
    method: string;
    sessionId?: string;
    params: any;
}

interface ProtoResponse {
    id: number;
    sessionId?: string;
    result: any;
}

interface RespSource {
    requestId: number;
    logId: number;
    method: string; // can be resove using messages Map
    field: string;
}

export interface ProtoEvent {
    method: string;
    sessionId?: string;
    params: any;
    used?: boolean;
    name: string;
}

export class ProtoRevertLink {
    static SHOW_EVENT = false;
    static SHOW_MESSAGES = false;
    private ignoreEvent: Set<String>
    private maxParamLen = 256;

    /**
     * storage for large code chunk
     */
    rawData: { data: string, type: "b64" | "js", hash: string }[] = [];

    endpoint: string;
    /**
     * request logs indexed by requestID
     */
    requests = new Map<number, { req: ProtoRequest, resp?: ProtoResponse, name: string, used?: boolean }>();
    /**
     * chrome emited values index
     */
    recevedValue = new Map<string | number, RespSource>();
    methodCounter = new Map<string, number>();
    logs = [] as Array<ProtoRequest | ProtoEvent>;


    public bookmark(text: string): void {
        this.logs.push({ id: -1, method: 'bookmark', params: text });
    }

    incUsage(method: string): number {
        let cnt = (this.methodCounter.get(method) || 0) + 1;
        this.methodCounter.set(method, cnt);
        return cnt;
    }

    nameMessage(name: string, cnt: number) {
        name = name.replace(/\./g, '');
        name = name.substring(0, 1).toLocaleLowerCase() + name.substring(1);
        if (cnt === 1)
            return name;
        return name + cnt;
    }

    constructor(private wsClient: WebSocket.WebSocket, request: http.IncomingMessage, dstPort: number, options: { ignoreEvent?: Set<String>, maxParamLen?: number }) {
        options = options || {}
        this.ignoreEvent = options.ignoreEvent || new Set();
        this.maxParamLen = options.maxParamLen || 256;

        const queue: Array<WebSocket.RawData | string> = [];
        this.endpoint = `ws://127.0.0.1:${dstPort}${request.url}`;
        const wsChrome = new WebSocket(this.endpoint);
        console.log('Starting session on ' + this.endpoint);

        /**
         * foward or queue messages
         */
        wsClient.on('message', (msg, binary) => {
            // process message
            if (binary) {
                console.log('in :', msg.toString('hex'))
            } else {
                const text = msg.toString();
                const message = JSON.parse(text);
                this.logRequest(message)
            }
            // foward or queue
            if (wsChrome.readyState === 1) {
                wsChrome.send(msg, { binary });
            } else {
                if (!binary)
                    queue.push(msg.toString());
                else
                    queue.push(msg);
            }
        });
        wsChrome.once('open', () => {
            for (const msg of queue) {
                wsChrome.send(msg);
            }
            wsChrome.on('message', (msg, binary) => {
                if (binary) {
                    console.log('out:', msg.toString('hex'));
                } else {
                    const text = msg.toString();
                    const message = JSON.parse(text);
                    this.logResponse(message)
                }
                wsClient.send(msg, { binary });
            })
            wsClient.on('close', (code: number, reason: Buffer) => {
                // ws not happy with close code 1005, replace 1005 by 1000;
                if (!code || code === 1005)
                    code = 1000;
                wsChrome.close(code || 1000, reason);
            });
        })
    }

    public close() {
        this.wsClient.close(1000);
    }

    indexResponce(requestId: number, method: string, data: { [key: string]: any }) {
        // if (requestId === 21) debugger; // should index objectId: '-1498025529418368793.5.3'
        if (!data || !data.result)
            return;
        for (const [field, value] of Object.entries(data.result)) {
            this.tryIndexString(method, `result.${field}`, value, requestId, 0);
        }
    }

    tryIndexString = (method: string, field: string, value: any, requestId: number, logId: number) => {
        if (typeof value === 'string') {
            // const strValue = value as string;
            if (value.length > 40) return; // do not index superlong string
            if (this.recevedValue.has(value)) return;
            const logId = this.logs.length - 1;
            this.recevedValue.set(value, { field, method, requestId, logId });
        }
        if (typeof value === 'number') {
            if (value === 0) return; // do not index superlong string
            if (this.recevedValue.has(value)) return;
            this.recevedValue.set(value, { field, method, requestId, logId });
        }
    }

    indexEvent(event: ProtoEvent) {
        if (!event)
            return;
        // if (event.method === 'Target.targetCreated') debugger;
        if (!event.params)
            return;
        const logId = this.logs.length - 1;
        for (const [field, value] of Object.entries(event.params)) {
            if (typeof value === 'string') {
                this.tryIndexString(event.method, field, value, 0, logId);
            }
            // seatch in a second LVL not more
            if (typeof value === 'object') {
                for (const [field2, value2] of Object.entries(value as any)) {
                    this.tryIndexString(event.method, `${field}.${field2}`, value2, 0, logId);
                }
            }
        }
    }

    private aliasValue(value: string | number): string | null {
        const source = this.recevedValue.get(value);
        if (!source) return null;

        if (source.requestId) {
            const r = this.requests.get(source.requestId);
            if (!r)
                throw Error(`corruption requestId: ${source.requestId} not found`);
            const name = r.name
            r.used = true;
            return '$' + `{${name}.${source.field}}`
        }
        // source is an event
        const event = this.logs[source.logId] as ProtoEvent;
        if (!event)
            throw Error('corruption Event not found');
        event.used = true;
        const name = event.name;
        return '$' + `{${name}.${source.field}}`
    }

    injectVarRequest(req: ProtoRequest) {
        // if (req.id === 22) debugger; // should inject objectId: '-1498025529418368793.5.3'
        if (req.sessionId) {
            const alias = this.aliasValue(req.sessionId);
            if (alias) req.sessionId = alias;
        }
        if (!req.params)
            return;
        for (const [field, value] of Object.entries(req.params)) {
            if (typeof value === 'string') {
                if (value.length > 40) continue; // do not index superlong string
                const alias = this.aliasValue(value);
                if (alias) {
                    req.params[field] = alias;
                }
            }
            if (typeof value === 'number') {
                // if (value.length > 40) continue; // do not index superlong string
                const alias = this.aliasValue(value);
                if (alias) {
                    req.params[field] = alias;
                }
            }
        }
    }

    /**
     * @param rest should never display aything
     * @param ctxt extra debug context
     */
    noRest(rest: any, ctxt: string) {
        if (Object.keys(rest).length) {
            console.log(pc.bgCyan('------------- REST -------------') + ctxt);
            console.log(rest);
        }
    }

    printNonEmpty(data: any) {
        if (data && Object.keys(data).length > 0)
            console.log(data);
    }

    logResponse(message: any) {
        if (message.id) {
            const resp = message as ProtoResponse;
            const { id, result, sessionId, ...rest } = resp;
            const req = this.requests.get(id);
            if (!req) {
                return;
            }
            const method = req?.req.method || 'ERROR';
            req.resp = resp;
            if (ProtoRevertLink.SHOW_MESSAGES) {
                console.log(`Response ${pc.green(id)}: ${pc.yellow(method)} ${pc.green(sessionId || '')}`);
                this.printNonEmpty(result);
            }
            this.noRest(rest, 'msg to To Client');

            this.indexResponce(id, method, result);
        } else {
            const event = message as ProtoEvent;
            const { method } = event;
            const cnt = this.incUsage(method);
            event.name = this.nameMessage(method, cnt); // gen a reference name

            this.logs.push(event);
            this.indexEvent(event);
            if (ProtoRevertLink.SHOW_EVENT) {
                const { method, sessionId, params, ...rest } = message;
                console.log(`${pc.bgMagenta('EVENT')}: ${pc.yellow(method)} ${pc.green(sessionId || '')}`);
                this.printNonEmpty(params)
                this.noRest(rest, 'event to To Client');
            }
        }
    }

    logRequest(message: any) {
        const extractBig = (data: string, type: "b64" | "js"): string => {
            if (!data || data.length < this.maxParamLen) return data;
            const hash = crypto.createHash('md5').update(data).digest('hex');
            let idx = this.rawData.findIndex(e => e.hash === hash);
            if (idx === -1)
                idx = this.rawData.push({ data, type, hash });
            return `__FILE__RAW__${this.rawData.length}__`;
        }

        if (message.id) {
            const req = message as ProtoRequest;
            this.injectVarRequest(req)
            const { id, method, sessionId, params, ...rest } = req;

            if (method === 'Runtime.callFunctionOn') {
                const p2 = params as Protocol.Runtime.CallFunctionOnRequest;
                if (p2.arguments)
                    for (let i = 0; i < p2.arguments.length; i++) {
                        if (p2.arguments[i].value && typeof p2.arguments[i].value === 'string')
                            p2.arguments[i].value = extractBig(p2.arguments[i].value, 'js');
                    }
                if (p2.functionDeclaration)
                    p2.functionDeclaration = extractBig(p2.functionDeclaration, 'js');
            }

            if (method === 'Runtime.evaluate') {
                const p2 = params as Protocol.Runtime.EvaluateRequest;
                if (p2.expression)
                    p2.expression = extractBig(p2.expression, 'js');
            }

            if (method === 'Fetch.fulfillRequest') {
                const p2 = params as Protocol.Fetch.FulfillRequestRequest;
                if (p2.body) {
                    p2.body = extractBig(p2.body, 'b64');
                }
            }

            if (method === 'Page.addScriptToEvaluateOnNewDocument') {
                const p2 = params as Protocol.Page.AddScriptToEvaluateOnNewDocumentRequest;
                if (p2.source) { // js
                    p2.source = extractBig(p2.source, 'js');
                }
            }



            // counter use to names requests
            const cnt = this.incUsage(method);
            this.requests.set(id, { req, name: this.nameMessage(method, cnt) });
            this.logs.push(req);

            if (ProtoRevertLink.SHOW_MESSAGES) {
                console.log(`Request  ${pc.green(id)}: ${pc.yellow(method)} ${pc.green(sessionId || '')}`);
                this.printNonEmpty(params);
            }
            this.noRest(rest, 'msg to To Browser');
            // message
        } else {
            // Client can not send event to browser.
        }
    }
    public writeSession(): string {
        const session = this;
        let waitEvents = new Map<string, number>();
        const ls = '  ';
        let code = '';
        let waitCnt = 0;
        const flushWait = () => {
            if (waitEvents.size) {
                code += `${ls}const wait${++waitCnt} = await page.waitForAllEvents(`;
                code += [...waitEvents].map(a => (a[1] === 1) ? `"${a[0]}"` : `"${a[0]}" /* ${a[1]} */`).join(', ');
                code += `); // EVENT\r\n`;
                waitEvents.clear();
            }
        }
        code += `${ls}// connecte to ${this.endpoint}\r\n`
        for (const message of session.logs) {
            if ('id' in message) {
                flushWait();
                const { id } = message;
                if (id === -1) {
                    // bookmark
                    code += ls;
                    code += '// Bookmark: ' + message.params;
                    code += '\r\n';
                    continue;
                }
                const meta = session.requests.get(id);
                if (!meta)
                    continue;
                code += ls;
                if (meta.used) {
                    code += `const ${meta.name} = `;
                }
                code += `await page.${meta.req.method}(`;
                if (meta.req.params || meta.req.sessionId) {
                    let params = JSON.stringify(meta.req.params || {});
                    params = params.replace(/"\$\{([A-Za-z0-9_.]+)\}"/g, '$1!');
                    const fileRef = params.match(/"__FILE__RAW__(\d)__"/);
                    if (fileRef) {
                        const refId = Number(fileRef[1]) - 1; // raw ids are indexed from 1
                        const entry = this.rawData[refId];
                        assert(entry);
                        params = params.replace(fileRef[0], `getContent(${refId}, "${entry.type}")`);
                    }
                    code += params;
                }
                if (meta.req.sessionId) {
                    code += ', '
                    code += meta.req.sessionId.replace(/\$\{([A-Za-z0-9_.]+)\}/g, '$1');
                }
                code += `); // ${meta.req.id}`;
                code += '\r\n';
            } else {
                // events
                const mevent = message as ProtoEvent;
                if (mevent.used) {
                    // used event;
                    code += `${ls}const ${mevent.name} = `;
                    code += `await page.${mevent.method}(); // EVENT`;
                    code += '\r\n';
                } else {
                    if (!this.ignoreEvent.has(mevent.method)) {
                        const cnt = waitEvents.get(mevent.method);
                        if (cnt)
                            waitEvents.set(mevent.method, cnt + 1);
                        else
                            waitEvents.set(mevent.method, 1);
                    }
                }
            }
        }
        const lines = code.split('\r\n');
        const linesout = [] as string[];
        let prevs = [] as string[];
        let eventsWait = [] as RegExpMatchArray[];

        const releaseLine = (prev: string) => {
            for (const m of eventsWait) {
                if (m[3].includes("waitForAllEvents"))
                    linesout.push(`${m[1]}const ${m[2]} = ${m[3]};`);
                else
                    linesout.push(`${m[1]}const ${m[2]}P = ${m[3]};`);
            }
            linesout.push(prev);
            for (const m of eventsWait) {
                if (m[3].includes("waitForAllEvents"))
                    linesout.push(`${m[1]}await ${m[2]};`);
                else
                    linesout.push(`${m[1]}const ${m[2]} = await ${m[2]}P;`);
            }
            eventsWait.length = 0;
        }

        for (const line of lines) {
            let m1 = line.match(/^( +)const ([a-zA-Z0-9]+) = await (page.+); \/\/ EVENT$/);
            if (m1) {
                eventsWait.push(m1);
                continue;
            }
            prevs.push(line);
            if (prevs.length >= 2) {
                const prev = prevs.shift()!;
                releaseLine(prev)
            }
        }
        while (prevs.length) {
            const prev = prevs.shift()!;
            releaseLine(prev)
        }
        linesout.push('');
        return linesout.join('\r\n');
    }
}

