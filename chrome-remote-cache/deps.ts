export { join } from "https://deno.land/std@0.168.0/path/mod.ts";
export * as pc from "https://deno.land/std@0.168.0/fmt/colors.ts";
export { Buffer } from "https://deno.land/std@0.168.0/io/buffer.ts";
export { encode as b64Encode, decode as b64Decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

// export { Devtools, type Protocol, type Chrome } from "https://deno.land/x/chrome_remote_interface@0.4.3/mod.ts";
export {
    Devtools,
    type Protocol,
    type Chrome,
    type ProtocolEventParam,
    type DevToolTarget
} from "../chrome-remote-interface/mod.ts";

// import { delay } from "https://deno.land/std@0.168.0/async/delay.ts";
export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
