import type * as IO from './io.d.ts'

export type integer = number;


/**
 * Configuration for memory dump. Used only when "memory-infra" category is enabled.
 */
export type MemoryDumpConfig = {
    [key: string]: string;
}

export const enum TraceConfigRecordMode {
    RecordUntilFull = "recordUntilFull",
    RecordContinuously = "recordContinuously",
    RecordAsMuchAsPossible = "recordAsMuchAsPossible",
    EchoToConsole = "echoToConsole",
}

export type TraceConfig = {
    /**
     * Controls how the trace buffer stores data. (TraceConfigRecordMode enum)
     */
    recordMode?: ("recordUntilFull" | "recordContinuously" | "recordAsMuchAsPossible" | "echoToConsole");
    /**
     * Turns on JavaScript stack sampling.
     */
    enableSampling?: boolean;
    /**
     * Turns on system tracing.
     */
    enableSystrace?: boolean;
    /**
     * Turns on argument filter.
     */
    enableArgumentFilter?: boolean;
    /**
     * Included category filters.
     */
    includedCategories?: string[];
    /**
     * Excluded category filters.
     */
    excludedCategories?: string[];
    /**
     * Configuration to synthesize the delays in tracing.
     */
    syntheticDelays?: string[];
    /**
     * Configuration for memory dump triggers. Used only when "memory-infra" category is enabled.
     */
    memoryDumpConfig?: MemoryDumpConfig;
}

/**
 * Data format of a trace. Can be either the legacy JSON format or the
 * protocol buffer format. Note that the JSON format will be deprecated soon.
 */
export type StreamFormat = ("json" | "proto");

/**
 * Compression type to use for traces returned via streams.
 */
export type StreamCompression = ("none" | "gzip");

/**
 * Details exposed when memory request explicitly declared.
 * Keep consistent with memory_dump_request_args.h and
 * memory_instrumentation.mojom
 */
export type MemoryDumpLevelOfDetail = ("background" | "light" | "detailed");

/**
 * Backend type to use for tracing. `chrome` uses the Chrome-integrated
 * tracing service and is supported on all platforms. `system` is only
 * supported on Chrome OS and uses the Perfetto system tracing service.
 * `auto` chooses `system` when the perfettoConfig provided to Tracing.start
 * specifies at least one non-Chrome data source; otherwise uses `chrome`.
 */
export type TracingBackend = ("auto" | "chrome" | "system");

export type GetCategoriesResponse = {
    /**
     * A list of supported tracing categories.
     */
    categories: string[];
}

export type RecordClockSyncMarkerRequest = {
    /**
     * The ID of this clock sync marker
     */
    syncId: string;
}

export type RequestMemoryDumpRequest = {
    /**
     * Enables more deterministic results by forcing garbage collection
     */
    deterministic?: boolean;
    /**
     * Specifies level of details in memory dump. Defaults to "detailed".
     */
    levelOfDetail?: MemoryDumpLevelOfDetail;
}

export type RequestMemoryDumpResponse = {
    /**
     * GUID of the resulting global memory dump.
     */
    dumpGuid: string;
    /**
     * True iff the global memory dump succeeded.
     */
    success: boolean;
}

export const enum StartRequestTransferMode {
    ReportEvents = "ReportEvents",
    ReturnAsStream = "ReturnAsStream",
}

export type StartRequest = {
    /**
     * Category/tag filter
     */
    categories?: string;
    /**
     * Tracing options
     */
    options?: string;
    /**
     * If set, the agent will issue bufferUsage events at this interval, specified in milliseconds
     */
    bufferUsageReportingInterval?: number;
    /**
     * Whether to report trace events as series of dataCollected events or to save trace to a
     * stream (defaults to `ReportEvents`). (StartRequestTransferMode enum)
     */
    transferMode?: ("ReportEvents" | "ReturnAsStream");
    /**
     * Trace data format to use. This only applies when using `ReturnAsStream`
     * transfer mode (defaults to `json`).
     */
    streamFormat?: StreamFormat;
    /**
     * Compression format to use. This only applies when using `ReturnAsStream`
     * transfer mode (defaults to `none`)
     */
    streamCompression?: StreamCompression;
    traceConfig?: TraceConfig;
    /**
     * Base64-encoded serialized perfetto.protos.TraceConfig protobuf message
     * When specified, the parameters `categories`, `options`, `traceConfig`
     * are ignored. (Encoded as a base64 string when passed over JSON)
     */
    perfettoConfig?: string;
    /**
     * Backend type (defaults to `auto`)
     */
    tracingBackend?: TracingBackend;
}

export type BufferUsageEvent = {
    /**
     * A number in range [0..1] that indicates the used size of event buffer as a fraction of its
     * total size.
     */
    percentFull?: number;
    /**
     * An approximate number of events in the trace log.
     */
    eventCount?: number;
    /**
     * A number in range [0..1] that indicates the used size of event buffer as a fraction of its
     * total size.
     */
    value?: number;
}

/**
 * Contains an bucket of collected trace events. When tracing is stopped collected events will be
 * send as a sequence of dataCollected events followed by tracingComplete event.
 */
export type DataCollectedEvent = {
    value: any[];
}

/**
 * Signals that tracing is stopped and there is no trace buffers pending flush, all data were
 * delivered via dataCollected events.
 */
export type TracingCompleteEvent = {
    /**
     * Indicates whether some trace data is known to have been lost, e.g. because the trace ring
     * buffer wrapped around.
     */
    dataLossOccurred: boolean;
    /**
     * A handle of the stream that holds resulting trace data.
     */
    stream?: IO.StreamHandle;
    /**
     * Trace data format of returned stream.
     */
    traceFormat?: StreamFormat;
    /**
     * Compression format of returned stream.
     */
    streamCompression?: StreamCompression;
}

