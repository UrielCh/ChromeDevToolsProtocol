import type * as Runtime from './runtime.d.ts'

export type integer = number;

/**
 * Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing
 * breakpoints, stepping through execution, exploring stack traces, etc.
 */

/**
 * Breakpoint identifier.
 */
export type BreakpointId = string;

/**
 * Call frame identifier.
 */
export type CallFrameId = string;

/**
 * Location in the source code.
 */
export interface Location {
    /**
     * Script identifier as reported in the `Debugger.scriptParsed`.
     */
    scriptId: Runtime.ScriptId;
    /**
     * Line number in the script (0-based).
     */
    lineNumber: integer;
    /**
     * Column number in the script (0-based).
     */
    columnNumber?: integer;
}

/**
 * Location in the source code.
 */
export interface ScriptPosition {
    lineNumber: integer;
    columnNumber: integer;
}

/**
 * Location range within one script.
 */
export interface LocationRange {
    scriptId: Runtime.ScriptId;
    start: ScriptPosition;
    end: ScriptPosition;
}

/**
 * JavaScript call frame. Array of call frames form the call stack.
 */
export interface CallFrame {
    /**
     * Call frame identifier. This identifier is only valid while the virtual machine is paused.
     */
    callFrameId: CallFrameId;
    /**
     * Name of the JavaScript function called on this call frame.
     */
    functionName: string;
    /**
     * Location in the source code.
     */
    functionLocation?: Location;
    /**
     * Location in the source code.
     */
    location: Location;
    /**
     * JavaScript script name or url.
     */
    url: string;
    /**
     * Scope chain for this call frame.
     */
    scopeChain: Scope[];
    /**
     * `this` object for this call frame.
     */
    this: Runtime.RemoteObject;
    /**
     * The value being returned, if the function is at return point.
     */
    returnValue?: Runtime.RemoteObject;
}

export const enum ScopeType {
    Global = "global",
    Local = "local",
    With = "with",
    Closure = "closure",
    Catch = "catch",
    Block = "block",
    Script = "script",
    Eval = "eval",
    Module = "module",
    WasmExpressionStack = "wasm-expression-stack",
}

/**
 * Scope description.
 */
export interface Scope {
    /**
     * Scope type. (ScopeType enum)
     */
    type: ("global" | "local" | "with" | "closure" | "catch" | "block" | "script" | "eval" | "module" | "wasm-expression-stack");
    /**
     * Object representing the scope. For `global` and `with` scopes it represents the actual
     * object; for the rest of the scopes, it is artificial transient object enumerating scope
     * variables as its properties.
     */
    object: Runtime.RemoteObject;
    name?: string;
    /**
     * Location in the source code where scope starts
     */
    startLocation?: Location;
    /**
     * Location in the source code where scope ends
     */
    endLocation?: Location;
}

/**
 * Search match for resource.
 */
export interface SearchMatch {
    /**
     * Line number in resource content.
     */
    lineNumber: number;
    /**
     * Line with match content.
     */
    lineContent: string;
}

export const enum BreakLocationType {
    DebuggerStatement = "debuggerStatement",
    Call = "call",
    Return = "return",
}

export interface BreakLocation {
    /**
     * Script identifier as reported in the `Debugger.scriptParsed`.
     */
    scriptId: Runtime.ScriptId;
    /**
     * Line number in the script (0-based).
     */
    lineNumber: integer;
    /**
     * Column number in the script (0-based).
     */
    columnNumber?: integer;
    /**
     *  (BreakLocationType enum)
     */
    type?: ("debuggerStatement" | "call" | "return");
}

/**
 * Enum of possible script languages.
 */
export type ScriptLanguage = ("JavaScript" | "WebAssembly");

export const enum DebugSymbolsType {
    None = "None",
    SourceMap = "SourceMap",
    EmbeddedDWARF = "EmbeddedDWARF",
    ExternalDWARF = "ExternalDWARF",
}

/**
 * Debug symbols available for a wasm script.
 */
export interface DebugSymbols {
    /**
     * Type of the debug symbols. (DebugSymbolsType enum)
     */
    type: ("None" | "SourceMap" | "EmbeddedDWARF" | "ExternalDWARF");
    /**
     * URL of the external symbol source.
     */
    externalURL?: string;
}

export const enum ContinueToLocationRequestTargetCallFrames {
    Any = "any",
    Current = "current",
}

export interface ContinueToLocationRequest {
    /**
     * Location to continue to.
     */
    location: Location;
    /**
     *  (ContinueToLocationRequestTargetCallFrames enum)
     */
    targetCallFrames?: ("any" | "current");
}

export interface EnableRequest {
    /**
     * The maximum size in bytes of collected scripts (not referenced by other heap objects)
     * the debugger can hold. Puts no limit if parameter is omitted.
     */
    maxScriptsCacheSize?: number;
}

export interface EnableResponse {
    /**
     * Unique identifier of the debugger.
     */
    debuggerId: Runtime.UniqueDebuggerId;
}

export interface EvaluateOnCallFrameRequest {
    /**
     * Call frame identifier to evaluate on.
     */
    callFrameId: CallFrameId;
    /**
     * Expression to evaluate.
     */
    expression: string;
    /**
     * String object group name to put result into (allows rapid releasing resulting object handles
     * using `releaseObjectGroup`).
     */
    objectGroup?: string;
    /**
     * Specifies whether command line API should be available to the evaluated expression, defaults
     * to false.
     */
    includeCommandLineAPI?: boolean;
    /**
     * In silent mode exceptions thrown during evaluation are not reported and do not pause
     * execution. Overrides `setPauseOnException` state.
     */
    silent?: boolean;
    /**
     * Whether the result is expected to be a JSON object that should be sent by value.
     */
    returnByValue?: boolean;
    /**
     * Whether preview should be generated for the result.
     */
    generatePreview?: boolean;
    /**
     * Whether to throw an exception if side effect cannot be ruled out during evaluation.
     */
    throwOnSideEffect?: boolean;
    /**
     * Terminate execution after timing out (number of milliseconds).
     */
    timeout?: Runtime.TimeDelta;
}

export interface EvaluateOnCallFrameResponse {
    /**
     * Object wrapper for the evaluation result.
     */
    result: Runtime.RemoteObject;
    /**
     * Exception details.
     */
    exceptionDetails?: Runtime.ExceptionDetails;
}

export interface GetPossibleBreakpointsRequest {
    /**
     * Start of range to search possible breakpoint locations in.
     */
    start: Location;
    /**
     * End of range to search possible breakpoint locations in (excluding). When not specified, end
     * of scripts is used as end of range.
     */
    end?: Location;
    /**
     * Only consider locations which are in the same (non-nested) function as start.
     */
    restrictToFunction?: boolean;
}

export interface GetPossibleBreakpointsResponse {
    /**
     * List of the possible breakpoint locations.
     */
    locations: BreakLocation[];
}

export interface GetScriptSourceRequest {
    /**
     * Id of the script to get source for.
     */
    scriptId: Runtime.ScriptId;
}

export interface GetScriptSourceResponse {
    /**
     * Script source (empty in case of Wasm bytecode).
     */
    scriptSource: string;
    /**
     * Wasm bytecode. (Encoded as a base64 string when passed over JSON)
     */
    bytecode?: string;
}

export interface GetWasmBytecodeRequest {
    /**
     * Id of the Wasm script to get source for.
     */
    scriptId: Runtime.ScriptId;
}

export interface GetWasmBytecodeResponse {
    /**
     * Script source. (Encoded as a base64 string when passed over JSON)
     */
    bytecode: string;
}

export interface GetStackTraceRequest {
    stackTraceId: Runtime.StackTraceId;
}

export interface GetStackTraceResponse {
    stackTrace: Runtime.StackTrace;
}

export interface PauseOnAsyncCallRequest {
    /**
     * Debugger will pause when async call with given stack trace is started.
     */
    parentStackTraceId: Runtime.StackTraceId;
}

export interface RemoveBreakpointRequest {
    breakpointId: BreakpointId;
}

export interface RestartFrameRequest {
    /**
     * Call frame identifier to evaluate on.
     */
    callFrameId: CallFrameId;
}

export interface RestartFrameResponse {
    /**
     * New stack trace.
     */
    callFrames: CallFrame[];
    /**
     * Async stack trace, if any.
     */
    asyncStackTrace?: Runtime.StackTrace;
    /**
     * Async stack trace, if any.
     */
    asyncStackTraceId?: Runtime.StackTraceId;
}

export interface ResumeRequest {
    /**
     * Set to true to terminate execution upon resuming execution. In contrast
     * to Runtime.terminateExecution, this will allows to execute further
     * JavaScript (i.e. via evaluation) until execution of the paused code
     * is actually resumed, at which point termination is triggered.
     * If execution is currently not paused, this parameter has no effect.
     */
    terminateOnResume?: boolean;
}

export interface SearchInContentRequest {
    /**
     * Id of the script to search in.
     */
    scriptId: Runtime.ScriptId;
    /**
     * String to search for.
     */
    query: string;
    /**
     * If true, search is case sensitive.
     */
    caseSensitive?: boolean;
    /**
     * If true, treats string parameter as regex.
     */
    isRegex?: boolean;
}

export interface SearchInContentResponse {
    /**
     * List of search matches.
     */
    result: SearchMatch[];
}

export interface SetAsyncCallStackDepthRequest {
    /**
     * Maximum depth of async call stacks. Setting to `0` will effectively disable collecting async
     * call stacks (default).
     */
    maxDepth: integer;
}

export interface SetBlackboxPatternsRequest {
    /**
     * Array of regexps that will be used to check script url for blackbox state.
     */
    patterns: string[];
}

export interface SetBlackboxedRangesRequest {
    /**
     * Id of the script.
     */
    scriptId: Runtime.ScriptId;
    positions: ScriptPosition[];
}

export interface SetBreakpointRequest {
    /**
     * Location to set breakpoint in.
     */
    location: Location;
    /**
     * Expression to use as a breakpoint condition. When specified, debugger will only stop on the
     * breakpoint if this expression evaluates to true.
     */
    condition?: string;
}

export interface SetBreakpointResponse {
    /**
     * Id of the created breakpoint for further reference.
     */
    breakpointId: BreakpointId;
    /**
     * Location this breakpoint resolved into.
     */
    actualLocation: Location;
}

export const enum SetInstrumentationBreakpointRequestInstrumentation {
    BeforeScriptExecution = "beforeScriptExecution",
    BeforeScriptWithSourceMapExecution = "beforeScriptWithSourceMapExecution",
}

export interface SetInstrumentationBreakpointRequest {
    /**
     * Instrumentation name. (SetInstrumentationBreakpointRequestInstrumentation enum)
     */
    instrumentation: ("beforeScriptExecution" | "beforeScriptWithSourceMapExecution");
}

export interface SetInstrumentationBreakpointResponse {
    /**
     * Id of the created breakpoint for further reference.
     */
    breakpointId: BreakpointId;
}

export interface SetBreakpointByUrlRequest {
    /**
     * Line number to set breakpoint at.
     */
    lineNumber: integer;
    /**
     * URL of the resources to set breakpoint on.
     */
    url?: string;
    /**
     * Regex pattern for the URLs of the resources to set breakpoints on. Either `url` or
     * `urlRegex` must be specified.
     */
    urlRegex?: string;
    /**
     * Script hash of the resources to set breakpoint on.
     */
    scriptHash?: string;
    /**
     * Offset in the line to set breakpoint at.
     */
    columnNumber?: integer;
    /**
     * Expression to use as a breakpoint condition. When specified, debugger will only stop on the
     * breakpoint if this expression evaluates to true.
     */
    condition?: string;
}

export interface SetBreakpointByUrlResponse {
    /**
     * Id of the created breakpoint for further reference.
     */
    breakpointId: BreakpointId;
    /**
     * List of the locations this breakpoint resolved into upon addition.
     */
    locations: Location[];
}

export interface SetBreakpointOnFunctionCallRequest {
    /**
     * Function object id.
     */
    objectId: Runtime.RemoteObjectId;
    /**
     * Expression to use as a breakpoint condition. When specified, debugger will
     * stop on the breakpoint if this expression evaluates to true.
     */
    condition?: string;
}

export interface SetBreakpointOnFunctionCallResponse {
    /**
     * Id of the created breakpoint for further reference.
     */
    breakpointId: BreakpointId;
}

export interface SetBreakpointsActiveRequest {
    /**
     * New value for breakpoints active state.
     */
    active: boolean;
}

export const enum SetPauseOnExceptionsRequestState {
    None = "none",
    Uncaught = "uncaught",
    All = "all",
}

export interface SetPauseOnExceptionsRequest {
    /**
     * Pause on exceptions mode. (SetPauseOnExceptionsRequestState enum)
     */
    state: ("none" | "uncaught" | "all");
}

export interface SetReturnValueRequest {
    /**
     * New return value.
     */
    newValue: Runtime.CallArgument;
}

export interface SetScriptSourceRequest {
    /**
     * Id of the script to edit.
     */
    scriptId: Runtime.ScriptId;
    /**
     * New content of the script.
     */
    scriptSource: string;
    /**
     * If true the change will not actually be applied. Dry run may be used to get result
     * description without actually modifying the code.
     */
    dryRun?: boolean;
}

export interface SetScriptSourceResponse {
    /**
     * New stack trace in case editing has happened while VM was stopped.
     */
    callFrames?: CallFrame[];
    /**
     * Whether current call stack  was modified after applying the changes.
     */
    stackChanged?: boolean;
    /**
     * Async stack trace, if any.
     */
    asyncStackTrace?: Runtime.StackTrace;
    /**
     * Async stack trace, if any.
     */
    asyncStackTraceId?: Runtime.StackTraceId;
    /**
     * Exception details if any.
     */
    exceptionDetails?: Runtime.ExceptionDetails;
}

export interface SetSkipAllPausesRequest {
    /**
     * New value for skip pauses state.
     */
    skip: boolean;
}

export interface SetVariableValueRequest {
    /**
     * 0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch'
     * scope types are allowed. Other scopes could be manipulated manually.
     */
    scopeNumber: integer;
    /**
     * Variable name.
     */
    variableName: string;
    /**
     * New variable value.
     */
    newValue: Runtime.CallArgument;
    /**
     * Id of callframe that holds variable.
     */
    callFrameId: CallFrameId;
}

export interface StepIntoRequest {
    /**
     * Debugger will pause on the execution of the first async task which was scheduled
     * before next pause.
     */
    breakOnAsyncCall?: boolean;
    /**
     * The skipList specifies location ranges that should be skipped on step into.
     */
    skipList?: LocationRange[];
}

export interface StepOverRequest {
    /**
     * The skipList specifies location ranges that should be skipped on step over.
     */
    skipList?: LocationRange[];
}

/**
 * Fired when breakpoint is resolved to an actual script and location.
 */
export interface BreakpointResolvedEvent {
    /**
     * Breakpoint unique identifier.
     */
    breakpointId: BreakpointId;
    /**
     * Actual breakpoint location.
     */
    location: Location;
}

export const enum PausedEventReason {
    Ambiguous = "ambiguous",
    Assert = "assert",
    CSPViolation = "CSPViolation",
    DebugCommand = "debugCommand",
    DOM = "DOM",
    EventListener = "EventListener",
    Exception = "exception",
    Instrumentation = "instrumentation",
    OOM = "OOM",
    Other = "other",
    PromiseRejection = "promiseRejection",
    XHR = "XHR",
}

/**
 * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
 */
export interface PausedEvent {
    /**
     * Call stack the virtual machine stopped on.
     */
    callFrames: CallFrame[];
    /**
     * Pause reason. (PausedEventReason enum)
     */
    reason: ("ambiguous" | "assert" | "CSPViolation" | "debugCommand" | "DOM" | "EventListener" | "exception" | "instrumentation" | "OOM" | "other" | "promiseRejection" | "XHR");
    /**
     * Object containing break-specific auxiliary properties.
     */
    data?: any;
    /**
     * Hit breakpoints IDs
     */
    hitBreakpoints?: string[];
    /**
     * Async stack trace, if any.
     */
    asyncStackTrace?: Runtime.StackTrace;
    /**
     * Async stack trace, if any.
     */
    asyncStackTraceId?: Runtime.StackTraceId;
    /**
     * Never present, will be removed.
     */
    asyncCallStackTraceId?: Runtime.StackTraceId;
}

/**
 * Fired when virtual machine fails to parse the script.
 */
export interface ScriptFailedToParseEvent {
    /**
     * Identifier of the script parsed.
     */
    scriptId: Runtime.ScriptId;
    /**
     * URL or name of the script parsed (if any).
     */
    url: string;
    /**
     * Line offset of the script within the resource with given URL (for script tags).
     */
    startLine: integer;
    /**
     * Column offset of the script within the resource with given URL.
     */
    startColumn: integer;
    /**
     * Last line of the script.
     */
    endLine: integer;
    /**
     * Length of the last line of the script.
     */
    endColumn: integer;
    /**
     * Specifies script creation context.
     */
    executionContextId: Runtime.ExecutionContextId;
    /**
     * Content hash of the script.
     */
    hash: string;
    /**
     * Embedder-specific auxiliary data.
     */
    executionContextAuxData?: any;
    /**
     * URL of source map associated with script (if any).
     */
    sourceMapURL?: string;
    /**
     * True, if this script has sourceURL.
     */
    hasSourceURL?: boolean;
    /**
     * True, if this script is ES6 module.
     */
    isModule?: boolean;
    /**
     * This script length.
     */
    length?: integer;
    /**
     * JavaScript top stack frame of where the script parsed event was triggered if available.
     */
    stackTrace?: Runtime.StackTrace;
    /**
     * If the scriptLanguage is WebAssembly, the code section offset in the module.
     */
    codeOffset?: integer;
    /**
     * The language of the script.
     */
    scriptLanguage?: ScriptLanguage;
    /**
     * The name the embedder supplied for this script.
     */
    embedderName?: string;
}

/**
 * Fired when virtual machine parses script. This event is also fired for all known and uncollected
 * scripts upon enabling debugger.
 */
export interface ScriptParsedEvent {
    /**
     * Identifier of the script parsed.
     */
    scriptId: Runtime.ScriptId;
    /**
     * URL or name of the script parsed (if any).
     */
    url: string;
    /**
     * Line offset of the script within the resource with given URL (for script tags).
     */
    startLine: integer;
    /**
     * Column offset of the script within the resource with given URL.
     */
    startColumn: integer;
    /**
     * Last line of the script.
     */
    endLine: integer;
    /**
     * Length of the last line of the script.
     */
    endColumn: integer;
    /**
     * Specifies script creation context.
     */
    executionContextId: Runtime.ExecutionContextId;
    /**
     * Content hash of the script.
     */
    hash: string;
    /**
     * Embedder-specific auxiliary data.
     */
    executionContextAuxData?: any;
    /**
     * True, if this script is generated as a result of the live edit operation.
     */
    isLiveEdit?: boolean;
    /**
     * URL of source map associated with script (if any).
     */
    sourceMapURL?: string;
    /**
     * True, if this script has sourceURL.
     */
    hasSourceURL?: boolean;
    /**
     * True, if this script is ES6 module.
     */
    isModule?: boolean;
    /**
     * This script length.
     */
    length?: integer;
    /**
     * JavaScript top stack frame of where the script parsed event was triggered if available.
     */
    stackTrace?: Runtime.StackTrace;
    /**
     * If the scriptLanguage is WebAssembly, the code section offset in the module.
     */
    codeOffset?: integer;
    /**
     * The language of the script.
     */
    scriptLanguage?: ScriptLanguage;
    /**
     * If the scriptLanguage is WebASsembly, the source of debug symbols for the module.
     */
    debugSymbols?: DebugSymbols;
    /**
     * The name the embedder supplied for this script.
     */
    embedderName?: string;
}

