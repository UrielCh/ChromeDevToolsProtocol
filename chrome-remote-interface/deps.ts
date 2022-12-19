export { EventEmitter } from "https://deno.land/x/event@2.0.0/mod.ts";
// export { type ErrnoException } from "https://deno.land/std@0.126.0/node/internal/errors.ts";

export interface ErrnoException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
}
