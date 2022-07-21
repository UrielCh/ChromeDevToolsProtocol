import EventEmitter from "events";
import WebSocket from "ws";
import * as api from "./api";
import { Protocol } from "./Protocol";
import ProtocolEventsApi, { ProtocolEventsName } from "../types/protocol-events";

export class ProtocolError extends Error {
  constructor(
    public request: { method: string, params?: unknown, undefined?: string },
    public response: { message: string; data?: string; code?: number },
  ) {
    let { message } = response;
    if (response.data) {
      message += ` (${response.data})`;
    }
    super(message + " caused by " + request.method);
  }
}

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
export class Chrome extends EventEmitter {
  #callbacks = new Map<number, CallbackData>();
  #nextCommandId = 1;
  #ws?: WebSocket;

  constructor(private webSocketDebuggerUrl: string, private protocol: Protocol.ProtocolShape) {
    super();
    // update the connection parameters using the debugging URL
    // fetch the protocol and prepare the API
    if (!webSocketDebuggerUrl.startsWith("ws://") && !webSocketDebuggerUrl.startsWith("wss://"))
      throw Error(`invalid Websoket url: "${webSocketDebuggerUrl}"`);
    api.prepare(this, this.protocol);
  }

  on<K extends keyof ProtocolEventsApi>(name: K, callback: ProtocolEventsApi[K]): this {
    super.on(name, callback);
    return this;
  }

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
      ws.send(text, (err) => {
        if (err) return reject(err);
        this.#callbacks.set(id, { success, reject, method, params, sessionId });
      });
    });
  }

  /**
   * @param events wait for at least one of each event.
   */
  public waitForAllEvents(...events: ProtocolEventsName[]) {
    return new Promise<void>((resolve) => {
      const eventSet = new Set<ProtocolEventsName>(events);
      const onEvent = (param: { method: ProtocolEventsName, params: any }) => {
        const { method } = param;
        if (eventSet.delete(method))
          if (!eventSet.size) {
            this.off("event", onEvent);
            resolve();
          }
      };
      this.on("event", onEvent);
    });
  }

  /**
   * close websocket
   */
  public close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const ws = this.#ws;
      if (!ws) {
        reject("Websocket is not initilized");
      } else if (ws.readyState === 3) {
        // don't close if it's already closed
        resolve();
      } else {
        // don't notify on user-initiated shutdown ('disconnect' event)
        ws.removeAllListeners("close");
        ws.once("close", () => {
          ws.removeAllListeners();
          resolve();
        });
        ws.close();
      }
    });
  }

  /**
   * Establish the WebSocket connection and start processing user commands
   *
   * return a promise that get resoved once connection is open
   */
  async #connectToWebSocket(): Promise<WebSocket> {
    const ws = new WebSocket(this.webSocketDebuggerUrl);
    ws.onmessage = (message: WebSocket.MessageEvent) => {
      if (typeof message.data === "string") {
        const msg = JSON.parse(message.data);
        this.#handleMessage(msg);
      }
    };
    ws.onclose = (/*event: WebSocket.CloseEvent*/) => { // _code: number
      this.emit("disconnect");
    };

    return new Promise<WebSocket>((accept, reject) => {
      // Promise can oget resolved once
      let resolved = false;
      ws.onopen = () => {
        accept(ws);
        resolved = true;
      };
      ws.onerror = (err: WebSocket.ErrorEvent) => {
        if (!resolved) reject(err);
        resolved = true;
      };
    });
  }

  /**
   * handle, parse and dispatch messages read from the WebSocket
   */
  #handleMessage(
    message: {
      id?: number;
      error?: Error;
      result?: unknown;
      method?: string;
      params?: unknown;
      sessionId?: string;
    },
  ) {
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
      this.emit(method, params, sessionId);
      if (sessionId) {
        this.emit(`${method}.${sessionId}`, params, sessionId);
      }
    }
  }
}
