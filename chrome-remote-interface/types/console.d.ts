
export type integer = number;

/**
 * This domain is deprecated - use Runtime or Log instead.
 */

export const enum ConsoleMessageSource {
    XML = "xml",
    Javascript = "javascript",
    Network = "network",
    ConsoleAPI = "console-api",
    Storage = "storage",
    Appcache = "appcache",
    Rendering = "rendering",
    Security = "security",
    Other = "other",
    Deprecation = "deprecation",
    Worker = "worker",
}

export const enum ConsoleMessageLevel {
    Log = "log",
    Warning = "warning",
    Error = "error",
    Debug = "debug",
    Info = "info",
}

/**
 * Console message.
 */
export interface ConsoleMessage {
    /**
     * Message source. (ConsoleMessageSource enum)
     */
    source: ("xml" | "javascript" | "network" | "console-api" | "storage" | "appcache" | "rendering" | "security" | "other" | "deprecation" | "worker");
    /**
     * Message severity. (ConsoleMessageLevel enum)
     */
    level: ("log" | "warning" | "error" | "debug" | "info");
    /**
     * Message text.
     */
    text: string;
    /**
     * URL of the message origin.
     */
    url?: string;
    /**
     * Line number in the resource that generated this message (1-based).
     */
    line?: integer;
    /**
     * Column number in the resource that generated this message (1-based).
     */
    column?: integer;
}

/**
 * Issued when new console message is added.
 */
export interface MessageAddedEvent {
    /**
     * Console message that has been added.
     */
    message: ConsoleMessage;
}

