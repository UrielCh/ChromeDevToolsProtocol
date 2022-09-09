import { Chrome as ChromeBase } from "./Chrome.ts";
import ProtocolProxyApi from "../types/protocol-proxy-api.d.ts";
export type Chrome = ChromeBase & ProtocolProxyApi.ProtocolApi;

export type TargetType =
  | "page"
  | "background_page"
  | "service_worker"
  | "browser"
  | "other";

/**
 * create Devtools options
 */
export interface DevtoolsCreateOptions {
  /**
   * devtools request timeout in millisec, default value is 10_000 ms
   */
  timeout?: number;
  /**
   * resolv all domain and use only IP
   */
  useHostName?: boolean;
  /**
   * provide a custrom domain resolver, can improve perf, and fix DNS resolution in K3S cluster
   */
  resolveDns?: (domain: string) => Promise<string>;
  /**
   * The devtoold url, using http: or ws: protocol to devtools root page.
   * default is http://127.0.0.1:9222/
   */
  url?: string;
  /**
   * do not try to get protocol from chrome devtools server
   */
  local?: boolean;
  /**
   * Url modifiyer, used to transform url provided by Chrome.
   */
  alterUrl?: (url: string) => string;
  /**
   * Add extra header to chrome request sent to by Chrome.
   */
  getHeaders?: (url: string) => HeadersInit | undefined;
}

/**
 * Connectable target, this class map a Chrome DevTools Protocol, and add a connect() method to open and use the taget websocket.
 * Chrome DevTools Protocol Version Model
 */
export interface DevToolVersion {
  "Android-Package": string; // 'com.android.chrome'
  "Browser": string; // 'Chrome/102.0.5005.125'
  "Protocol-Version": "1.2" | "1.3";
  "User-Agent": string; // 'Mozilla/5.0 (Linux; Android 11; Redmi Note 9S) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36'
  "V8-Version": string; // '10.2.154.8'
  "WebKit-Version": string; // '537.36 (@07573b09e385116e620ed12d5ef2402c4bfa929f)'
  webSocketDebuggerUrl: string; // 'ws://127.0.0.1:9222/devtools/browse
  connect(): Promise<Chrome>;
}

/**
 * Chrome DevTools Protocol Target Model
 * Connectable target, this class map a Chrome DevTools Protocol, and add a connect() method to open and use the taget websocket.
 */
export interface DevToolTarget {
  description: string;
  devtoolsFrontendUrl: string; // 'https://chrome-devtools-frontend.appspot.com/serve_rev/@...../inspector.html?ws=127.0.0.1:9222/devtools/page/159'
  id: `${number}`;
  title: string;
  type: TargetType;
  url: string;
  webSocketDebuggerUrl: string; //'ws://127.0.0.1:9222/devtools/page/159'
  connect(): Promise<Chrome>;
}
