import { EventEmitter } from "event";
import * as api from "./api.ts";
import { Protocol } from "./Protocol.ts";
import { ProtocolError } from "./ProtocolError.ts";
import ProtocolEventsApi, {
  ProtocolEventParam,
  ProtocolEventsName,
} from "../types/protocol-events.d.ts";
/**
 * used to link request to response
 */
interface CallbackData {
  success: (resp: unknown) => void;
  reject: (e: Error) => void;
  method: string;
  params: unknown;
  sessionId?: string;
}

/**
 * a Chrome Object is connected to a single target.
 * // implements ProtocolEventsApi
 */
export class Chrome extends EventEmitter<ProtocolEventsApi> {
  #callbacks = new Map<number, CallbackData>();
  #nextCommandId = 1;
  #ws?: WebSocket;

  constructor(
    private webSocketDebuggerUrl: string,
    private protocol: Protocol.ProtocolShape,
    private onWsOpen?: (url: string, ws: WebSocket) => Promise<unknown>,
  ) {
    super();
    // update the connection parameters using the debugging URL
    // fetch the protocol and prepare the API
    if (
      !webSocketDebuggerUrl.startsWith("ws://") &&
      !webSocketDebuggerUrl.startsWith("wss://")
    ) {
      throw Error(`invalid Websoket url: "${webSocketDebuggerUrl}"`);
    }
    api.prepare(this, this.protocol);
  }

  // on<K extends keyof ProtocolEventsApi>(
  //   name: K,
  //   callback: (...params: ProtocolEventsApi[K]) => void,
  // ): this {
  //   super.on(name, callback as (...args: unknown[]) => void);
  //   return this;
  // }

  async init(): Promise<this> {
    // finally connect to the WebSocket
    this.#ws = await this.#connectToWebSocket();

    // since the handler is executed synchronously, the emit() must be
    // performed in the next tick so that uncaught errors in the client code
    // are not intercepted by the Promise mechanism and therefore reported
    // via the 'error' event
    await new Promise((r) => setTimeout(r, 1));
    return this;
  }

  /**
   * get the last send message id
   */
  get commandId(): number {
    return this.#nextCommandId;
  }
  /**
   * Send a command to the remote endpoint and return a Promise that will be resolved once response receved
   */
  public send(
    method: string,
    params?: unknown,
    sessionId?: string,
  ): Promise<unknown> {
    const id = this.#nextCommandId++;
    const message = {
      id,
      method,
      sessionId,
      params: params || {},
    };
    const ws = this.#ws;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      throw Error("websocket not ready");
    }
    const text = JSON.stringify(message);
    return new Promise<unknown>((success, reject) => {
      ws.send(text);
      this.#callbacks.set(id, { success, reject, method, params, sessionId });
    });
  }

  /**
   * @param events wait for at least one of each event.
   */
  public waitForAllEvents(...events: ProtocolEventsName[]): Promise<void> & { getMissing: () => ProtocolEventsName[] } {
    const eventSet = new Set<ProtocolEventsName>(events);
    const p = new Promise<void>((resolve) => {
      const onEvent = (param: ProtocolEventParam) => {
        const { method } = param;
        if (eventSet.delete(method)) {
          if (!eventSet.size) {
            this.off("event", onEvent);
            resolve();
          }
        }
      };
      this.on("event", onEvent); // TODO fix me
    }) as Promise<void> & { getMissing: () => ProtocolEventsName[] };
    p.getMissing = () => [...eventSet]
    return p;
  }

  /**
   * close websocket
   */
  public close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const ws = this.#ws;
      if (!ws) {
        reject("Websocket is not initilized");
      } else if (ws.readyState === WebSocket.CLOSING || ws.readyState === WebSocket.CLOSED) {
        // don't close if it's already closed
        resolve();
      } else {
        // don't notify on user-initiated shutdown ('disconnect' event)
        ws.onerror = null;
        ws.onclose = () => {
          ws.onmessage = null;
          // ws.removeAllListeners();
          resolve();
        };
        ws.close(1000);
      }
    });
  }

  /**
   * Establish the WebSocket connection and start processing user commands
   *
   * return a promise that get resoved once connection is open
   */
  #connectToWebSocket(): Promise<WebSocket> {
    const ws = new WebSocket(this.webSocketDebuggerUrl);
    ws.onmessage = (message: MessageEvent) => {
      if (typeof message.data === "string") {
        let msg: ProtocolEventParam | null = null;
        try {
          msg = JSON.parse(message.data);
        } catch (e) {
          throw Error(`Fail to parse JSON message: "${message.data}" ${e}`);
        }
        if (!msg)
          throw Error(`Parse JSON message: "${message.data}" from Chrome return null`);
        this.#handleMessage(msg);
      }
    };
    ws.onclose = (/*event: WebSocket.CloseEvent*/) => { // _code: number
      this.emit("disconnect");
    };

    return new Promise<WebSocket>((accept, reject) => {
      // Promise can oget resolved once
      let resolved = false;
      ws.onopen = async () => {
        if (this.onWsOpen) {
          await this.onWsOpen(this.webSocketDebuggerUrl, ws);
        }
        accept(ws);
        resolved = true;
      };
      ws.onerror = (err) => {
        if (!resolved) reject(err);
        resolved = true;
      };
    });
  }

  /**
   * handle, parse and dispatch messages read from the WebSocket
   */
  #handleMessage(message: ProtocolEventParam) {
    // if id is present this is a response command
    const id = Number(message.id);
    if (id) {
      const callback = this.#callbacks.get(id);
      if (!callback) {
        // DEBUG
        // no track of this resoponce
        console.error("orfelin Message:", message);
        return;
      }
      const { success, reject } = callback;
      if (!success) {
        // DEBUG
        console.error("get rejection message:", message);
        return;
      }
      // interpret the lack of both 'error' and 'result' as success
      // (this may happen with node-inspector)
      if (message.error) {
        const { method, params, sessionId } = callback;
        const request = { method, params, sessionId };
        if (message.error instanceof Error) {
          reject(message.error);
        } else {
          reject(new ProtocolError(request, message.error));
        }
        // error instanceof Error ? error // low-level WebSocket error : new ProtocolError(request, response)});
        // reject(message.error);
      } else {
        success(message.result || {});
      }
      // unregister command response callback
      this.#callbacks.delete(id);
      // notify when there are no more pending commands
      if (this.#callbacks.size === 0) {
        this.emit("ready");
      }
    } else if (message.method) {
      // this is an event
      const { method, params, sessionId } = message;
      this.emit("event", message);
      // deno-lint-ignore no-explicit-any
      this.emit(method, params as any, sessionId);
      if (sessionId) {
        // deno-lint-ignore no-explicit-any
        this.emit(`${method}.${sessionId}` as keyof ProtocolEventsApi, params as any, sessionId);
      }
    }
  }
}
