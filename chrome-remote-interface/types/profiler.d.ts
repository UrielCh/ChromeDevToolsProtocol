import type * as Runtime from './runtime.d.ts'
import type * as Debugger from './debugger.d.ts'

export type integer = number;


/**
 * Profile node. Holds callsite information, execution statistics and child nodes.
 */
export interface ProfileNode {
    /**
     * Unique id of the node.
     */
    id: integer;
    /**
     * Function location.
     */
    callFrame: Runtime.CallFrame;
    /**
     * Number of samples where this node was on top of the call stack.
     */
    hitCount?: integer;
    /**
     * Child node ids.
     */
    children?: integer[];
    /**
     * The reason of being not optimized. The function may be deoptimized or marked as don't
     * optimize.
     */
    deoptReason?: string;
    /**
     * An array of source position ticks.
     */
    positionTicks?: PositionTickInfo[];
}

/**
 * Profile.
 */
export interface Profile {
    /**
     * The list of profile nodes. First item is the root node.
     */
    nodes: ProfileNode[];
    /**
     * Profiling start timestamp in microseconds.
     */
    startTime: number;
    /**
     * Profiling end timestamp in microseconds.
     */
    endTime: number;
    /**
     * Ids of samples top nodes.
     */
    samples?: integer[];
    /**
     * Time intervals between adjacent samples in microseconds. The first delta is relative to the
     * profile startTime.
     */
    timeDeltas?: integer[];
}

/**
 * Specifies a number of samples attributed to a certain source position.
 */
export interface PositionTickInfo {
    /**
     * Source line number (1-based).
     */
    line: integer;
    /**
     * Number of samples attributed to the source line.
     */
    ticks: integer;
}

/**
 * Coverage data for a source range.
 */
export interface CoverageRange {
    /**
     * JavaScript script source offset for the range start.
     */
    startOffset: integer;
    /**
     * JavaScript script source offset for the range end.
     */
    endOffset: integer;
    /**
     * Collected execution count of the source range.
     */
    count: integer;
}

/**
 * Coverage data for a JavaScript function.
 */
export interface FunctionCoverage {
    /**
     * JavaScript function name.
     */
    functionName: string;
    /**
     * Source ranges inside the function with coverage data.
     */
    ranges: CoverageRange[];
    /**
     * Whether coverage data for this function has block granularity.
     */
    isBlockCoverage: boolean;
}

/**
 * Coverage data for a JavaScript script.
 */
export interface ScriptCoverage {
    /**
     * JavaScript script id.
     */
    scriptId: Runtime.ScriptId;
    /**
     * JavaScript script name or url.
     */
    url: string;
    /**
     * Functions contained in the script that has coverage data.
     */
    functions: FunctionCoverage[];
}

/**
 * Describes a type collected during runtime.
 */
export interface TypeObject {
    /**
     * Name of a type collected with type profiling.
     */
    name: string;
}

/**
 * Source offset and types for a parameter or return value.
 */
export interface TypeProfileEntry {
    /**
     * Source offset of the parameter or end of function for return values.
     */
    offset: integer;
    /**
     * The types for this parameter or return value.
     */
    types: TypeObject[];
}

/**
 * Type profile data collected during runtime for a JavaScript script.
 */
export interface ScriptTypeProfile {
    /**
     * JavaScript script id.
     */
    scriptId: Runtime.ScriptId;
    /**
     * JavaScript script name or url.
     */
    url: string;
    /**
     * Type profile entries for parameters and return values of the functions in the script.
     */
    entries: TypeProfileEntry[];
}

export interface GetBestEffortCoverageResponse {
    /**
     * Coverage data for the current isolate.
     */
    result: ScriptCoverage[];
}

export interface SetSamplingIntervalRequest {
    /**
     * New sampling interval in microseconds.
     */
    interval: integer;
}

export interface StartPreciseCoverageRequest {
    /**
     * Collect accurate call counts beyond simple 'covered' or 'not covered'.
     */
    callCount?: boolean;
    /**
     * Collect block-based coverage.
     */
    detailed?: boolean;
    /**
     * Allow the backend to send updates on its own initiative
     */
    allowTriggeredUpdates?: boolean;
}

export interface StartPreciseCoverageResponse {
    /**
     * Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
     */
    timestamp: number;
}

export interface StopResponse {
    /**
     * Recorded profile.
     */
    profile: Profile;
}

export interface TakePreciseCoverageResponse {
    /**
     * Coverage data for the current isolate.
     */
    result: ScriptCoverage[];
    /**
     * Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
     */
    timestamp: number;
}

export interface TakeTypeProfileResponse {
    /**
     * Type profile for all scripts since startTypeProfile() was turned on.
     */
    result: ScriptTypeProfile[];
}

export interface ConsoleProfileFinishedEvent {
    id: string;
    /**
     * Location of console.profileEnd().
     */
    location: Debugger.Location;
    profile: Profile;
    /**
     * Profile title passed as an argument to console.profile().
     */
    title?: string;
}

/**
 * Sent when new profile recording is started using console.profile() call.
 */
export interface ConsoleProfileStartedEvent {
    id: string;
    /**
     * Location of console.profile().
     */
    location: Debugger.Location;
    /**
     * Profile title passed as an argument to console.profile().
     */
    title?: string;
}

/**
 * Reports coverage delta since the last poll (either from an event like this, or from
 * `takePreciseCoverage` for the current isolate. May only be sent if precise code
 * coverage has been started. This event can be trigged by the embedder to, for example,
 * trigger collection of coverage data immediately at a certain point in time.
 */
export interface PreciseCoverageDeltaUpdateEvent {
    /**
     * Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
     */
    timestamp: number;
    /**
     * Identifier for distinguishing coverage events.
     */
    occasion: string;
    /**
     * Coverage data for the current isolate.
     */
    result: ScriptCoverage[];
}

