import { join } from "https://deno.land/std@0.148.0/path/mod.ts";

//"" fot nodeJS ".d.ts" for deno
// const importExtantion = "";// .d.ts";
export const importExtantion = ".d.ts";
export const __dirname = new URL(".", import.meta.url).pathname.substring(1);
export const typeDir = join(__dirname, "..", "types");
export const fixBaseName = (fn: string): string => {
    return fn.replace(/\\/g, "/").replace(/^.+\//, "");
};
export const toTitleCase = (str: string) => str[0].toUpperCase() + str.substr(1);
export const fixCamelCase = (name: string): string => {
    let prefix = "";
    let result = name;
    if (name[0] === "-") {
        prefix = "Negative";
        result = name.substring(1);
    }
    const refined = result.split("-").map(toTitleCase).join("");
    return prefix +
        refined.replace(/HTML|XML|WML|API/i, (match) => match.toUpperCase());
};
export const toCmdRequestName = (commandName: string) =>
    `${toTitleCase(commandName)}Request`;
export const toCmdResponseName = (commandName: string) =>
    `${toTitleCase(commandName)}Response`;
export const toEventPayloadName = (eventName: string) =>
    `${toTitleCase(eventName)}Event`;
export const flatten = <T>(arr: T[][]) => ([] as T[]).concat(...arr);


