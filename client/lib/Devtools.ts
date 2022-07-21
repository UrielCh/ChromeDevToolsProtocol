import { Protocol } from "./Protocol.ts";
import { localDescriptor } from "./protocol1_3.ts";
import { Chrome as ChromeBase } from "./Chrome.ts";
import ProtocolProxyApi from "../types/protocol-proxy-api.d.ts";
import {
  DevtoolsCreateOptions,
  DevToolTarget,
  DevToolVersion,
  TargetType,
} from "./models.ts";

export type Chrome = ChromeBase & ProtocolProxyApi.ProtocolApi;

/**
 * main class of the project
 * full doc: {@see https://chromedevtools.github.io/devtools-protocol/}
 */
export class Devtools {
  #url: string;
  #opts: {
    timeout: number;
    useHostName: boolean;
  };
  public readonly timeout?: number;
  public readonly useHostName?: boolean;
  public readonly local?: boolean;

  /** cached promise */
  #versionP?: Promise<DevToolVersion>;
  /** cached promise */
  #protocolCacheP?: Promise<Protocol.ProtocolShape>;

  constructor(
    options = {} as DevtoolsCreateOptions,
  ) {
    if (options.url) {
      const url = new URL(options.url);
      url.protocol = url.protocol.replace(/^ws/, "http");
      url.pathname = "/";
      this.#url = url.toString();
    } else {
      this.#url = "http://127.0.0.1:9222/";
    }
    this.#opts = {
      timeout: options.timeout || 10000,
      useHostName: options.useHostName || false,
    };
    this.local = options.local;
  }

  /**
   * fetch with current options
   * by default hostname will be resolved as IP before in HTTP headers
   * @returns response as string
   */
  private async fetch(url: string): Promise<string> {
    // perform the DNS lookup manually so that the HTTP host header generated by
    // http.get will contain the IP address, this is needed because since Chrome
    // 66 the host header cannot contain an host name different than localhost
    // (see https://github.com/cyrus-and/chrome-remote-interface/issues/340)
    if (!this.#opts.useHostName) {
      const u = new URL(url);
      if (!u.hostname.match(/^[0-9.]+$/)) {
        const [address] = await Deno.resolveDns(u.hostname, "A");
        u.hostname = address;
        url = u.toString();
      }
    }
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.#opts.timeout);
    try {
      const response = await fetch(url, { signal: controller.signal });
      const text = await response.text();
      return text;
    } catch (err) {
      if (err instanceof Error) {
        if ("cause" in (err as Error && { cause: Error })) {
          const cause = (err as Error && { cause: Error }).cause;
          if (cause && (cause instanceof Error)) {
            throw Error(`Getting ${url} failed: ${cause.message}`);
          }
        }
        throw Error(`Getting ${url} failed: ${err.message}`);
      }
      console.error(err);
      throw Error(`Getting ${url} failed: ${err}`);
    } finally {
      clearTimeout(id);
    }
  }

  /**
   * Browser version metadata
   *
   * Cached getVersion() getter
   * support concurent access without duplicate execution
   *
   * @returns
   */
  version(): Promise<DevToolVersion> {
    if (!this.#versionP) {
      this.#versionP = this.#version();
    }
    return this.#versionP;
  }

  /**
   * The current devtools protocol, as JSON:
   *
   * Cached getProtocol() getter
   * support concurent access without duplicate execution
   * @returns
   */
  protocol(): Promise<Protocol.ProtocolShape> {
    if (!this.#protocolCacheP) {
      this.#protocolCacheP = this.#protocol();
    }
    return this.#protocolCacheP;
  }

  /**
   * create the getVertion Promise
   */
  async #version(): Promise<DevToolVersion> {
    const url = `${this.#url}json/version`;
    let text = "";
    try {
      text = await this.fetch(url);
      const version: DevToolVersion = JSON.parse(text);
      version.connect = () =>
        this.connectWebSoketUrl(version.webSocketDebuggerUrl);
      return version;
    } catch (e) {
      console.log(text);
      console.log("err ", e);
      throw e;
    }
  }

  /**
   * Protocol endpoint do not works on android devices
   */
  async #protocol(): Promise<Protocol.ProtocolShape> {
    if (this.local) return localDescriptor;
    const version = await this.version();
    if (
      version["Protocol-Version"] === "1.3" &&
      version["User-Agent"].includes("Android")
    ) {
      return localDescriptor;
    }
    const url = `${this.#url}json/protocol`;
    try {
      const text = await this.fetch(url);
      return JSON.parse(text) as Protocol.ProtocolShape;
    } catch (err) {
      if (err instanceof Error && err.message.includes("socket hang up")) {
        console.error(
          `fail to get ${url} using local protocol 1.3, next time add {local: true} in option.`,
        );
        return Promise.resolve(localDescriptor as Protocol.ProtocolShape);
      }
      throw err;
    }
  }

  /**
   * A list of all available websocket targets.
   * default: http://127.0.0.1:9222/json/list
   * @returns
   */
  async list(): Promise<DevToolTarget[]> {
    const url = `${this.#url}json/list`;
    const text = await this.fetch(url);
    const tabs = JSON.parse(text) as DevToolTarget[];
    // add connect method
    tabs.forEach((tab) =>
      tab.connect = () => this.connectWebSoketUrl(tab.webSocketDebuggerUrl)
    );
    return tabs;
  }

  /**
   * return a Chrome connected to the websocket of the first debugable target
   *
   * @returns
   */
  async connectFirst(type = "page" as TargetType): Promise<Chrome> {
    if (type === "browser") {
      const v = await this.version();
      return v.connect();
    }
    const list = await this.list();
    // keep debugable
    const tabs = list.filter((t) => t.webSocketDebuggerUrl);
    const tab = tabs.find((t) => t.type === type);
    if (tab) {
      return tab.connect();
    } else {
      throw Error("no Chrone available");
    }
  }
  /**
   * Opens a new tab. Responds with the websocket target data for the new tab.
   * @param url optional url to start with
   * @returns a connectable target
   */
  async new(url?: string): Promise<DevToolTarget> {
    let _url = `${this.#url}json/new`;
    if (url) _url += `?${encodeURI(url)}`;
    const text = await this.fetch(_url);
    const tab = JSON.parse(text) as DevToolTarget;
    tab.connect = () => this.connectWebSoketUrl(tab.webSocketDebuggerUrl);
    return tab;
  }

  /**
   * alias for (await this.new(url);).connect();
   */
  async connectNewPage(url?: string): Promise<Chrome> {
    const t = await this.new(url);
    return t.connect();
  }

  /**
   * Brings a page into the foreground (activate a tab).
   *
   * @param id  id of the target to activate
   * @returns true if the target is activated
   */
  async activate(id: string | number): Promise<boolean> {
    const url = `${this.#url}json/activate/${id}`;
    const text = await this.fetch(url);
    // For valid targets, the response is 200: "Target activated". If the target is invalid, the response is 404: "No such target id: {targetId}"
    return text === "Target activated";
  }
  /**
   * Closes the target page identified by targetId via DevTool protocol.
   * @param id id of the target to close
   * @returns true if the target is closing
   */
  async close(id: string | number): Promise<boolean> {
    const url = `${this.#url}json/close/${id}`;
    const text = await this.fetch(url);
    // For valid targets, the response is 200: "Target is closing". If the target is invalid, the response is 404: "No such target id: {targetId}"
    return text === "Target is closing";
  }

  async connectWebSoketUrl(webSocketDebuggerUrl: string): Promise<Chrome> {
    const protocol = await this.protocol();
    const chrome = new ChromeBase(webSocketDebuggerUrl, protocol) as Chrome;
    await chrome.init();
    return chrome;
  }
}
