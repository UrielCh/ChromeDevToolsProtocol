import type * as Runtime from './runtime.d.ts'
import type * as Network from './network.d.ts'

export type integer = number;

/**
 * Provides access to log entries.
 */

export const enum LogEntrySource {
    XML = "xml",
    Javascript = "javascript",
    Network = "network",
    Storage = "storage",
    Appcache = "appcache",
    Rendering = "rendering",
    Security = "security",
    Deprecation = "deprecation",
    Worker = "worker",
    Violation = "violation",
    Intervention = "intervention",
    Recommendation = "recommendation",
    Other = "other",
}

export const enum LogEntryLevel {
    Verbose = "verbose",
    Info = "info",
    Warning = "warning",
    Error = "error",
}

export const enum LogEntryCategory {
    Cors = "cors",
}

/**
 * Log entry.
 */
export interface LogEntry {
    /**
     * Log entry source. (LogEntrySource enum)
     */
    source: ("xml" | "javascript" | "network" | "storage" | "appcache" | "rendering" | "security" | "deprecation" | "worker" | "violation" | "intervention" | "recommendation" | "other");
    /**
     * Log entry severity. (LogEntryLevel enum)
     */
    level: ("verbose" | "info" | "warning" | "error");
    /**
     * Logged text.
     */
    text: string;
    /**
     *  (LogEntryCategory enum)
     */
    category?: ("cors");
    /**
     * Timestamp when this entry was added.
     */
    timestamp: Runtime.Timestamp;
    /**
     * URL of the resource if known.
     */
    url?: string;
    /**
     * Line number in the resource.
     */
    lineNumber?: integer;
    /**
     * JavaScript stack trace.
     */
    stackTrace?: Runtime.StackTrace;
    /**
     * Identifier of the network request associated with this entry.
     */
    networkRequestId?: Network.RequestId;
    /**
     * Identifier of the worker associated with this entry.
     */
    workerId?: string;
    /**
     * Call arguments.
     */
    args?: Runtime.RemoteObject[];
}

export const enum ViolationSettingName {
    LongTask = "longTask",
    LongLayout = "longLayout",
    BlockedEvent = "blockedEvent",
    BlockedParser = "blockedParser",
    DiscouragedAPIUse = "discouragedAPIUse",
    Handler = "handler",
    RecurringHandler = "recurringHandler",
}

/**
 * Violation configuration setting.
 */
export interface ViolationSetting {
    /**
     * Violation type. (ViolationSettingName enum)
     */
    name: ("longTask" | "longLayout" | "blockedEvent" | "blockedParser" | "discouragedAPIUse" | "handler" | "recurringHandler");
    /**
     * Time threshold to trigger upon.
     */
    threshold: number;
}

export interface StartViolationsReportRequest {
    /**
     * Configuration for violations.
     */
    config: ViolationSetting[];
}

/**
 * Issued when new message was logged.
 */
export interface EntryAddedEvent {
    /**
     * The entry.
     */
    entry: LogEntry;
}

