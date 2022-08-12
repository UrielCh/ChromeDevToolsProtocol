
export type integer = number;

/**
 * Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects.
 * Evaluation results are returned as mirror object that expose object type, string representation
 * and unique identifier that can be used for further object reference. Original objects are
 * maintained in memory unless they are either explicitly released or are released along with the
 * other objects in their object group.
 */

/**
 * Unique script identifier.
 */
export type ScriptId = string;

/**
 * Unique object identifier.
 */
export type RemoteObjectId = string;

/**
 * Primitive value which cannot be JSON-stringified. Includes values `-0`, `NaN`, `Infinity`,
 * `-Infinity`, and bigint literals.
 */
export type UnserializableValue = string;

export const enum RemoteObjectType {
    Object = "object",
    Function = "function",
    Undefined = "undefined",
    String = "string",
    Number = "number",
    Boolean = "boolean",
    Symbol = "symbol",
    Bigint = "bigint",
}

export const enum RemoteObjectSubtype {
    Array = "array",
    Null = "null",
    Node = "node",
    Regexp = "regexp",
    Date = "date",
    Map = "map",
    Set = "set",
    Weakmap = "weakmap",
    Weakset = "weakset",
    Iterator = "iterator",
    Generator = "generator",
    Error = "error",
    Proxy = "proxy",
    Promise = "promise",
    Typedarray = "typedarray",
    Arraybuffer = "arraybuffer",
    Dataview = "dataview",
    Webassemblymemory = "webassemblymemory",
    Wasmvalue = "wasmvalue",
}

/**
 * Mirror object referencing original JavaScript object.
 */
export type RemoteObject = {
    /**
     * Object type. (RemoteObjectType enum)
     */
    type: ("object" | "function" | "undefined" | "string" | "number" | "boolean" | "symbol" | "bigint");
    /**
     * Object subtype hint. Specified for `object` type values only.
     * NOTE: If you change anything here, make sure to also update
     * `subtype` in `ObjectPreview` and `PropertyPreview` below. (RemoteObjectSubtype enum)
     */
    subtype?: ("array" | "null" | "node" | "regexp" | "date" | "map" | "set" | "weakmap" | "weakset" | "iterator" | "generator" | "error" | "proxy" | "promise" | "typedarray" | "arraybuffer" | "dataview" | "webassemblymemory" | "wasmvalue");
    /**
     * Object class (constructor) name. Specified for `object` type values only.
     */
    className?: string;
    /**
     * Remote object value in case of primitive values or JSON values (if it was requested).
     */
    value?: any;
    /**
     * Primitive value which can not be JSON-stringified does not have `value`, but gets this
     * property.
     */
    unserializableValue?: UnserializableValue;
    /**
     * String representation of the object.
     */
    description?: string;
    /**
     * Unique object identifier (for non-primitive values).
     */
    objectId?: RemoteObjectId;
    /**
     * Preview containing abbreviated property values. Specified for `object` type values only.
     */
    preview?: ObjectPreview;
    customPreview?: CustomPreview;
}

export type CustomPreview = {
    /**
     * The JSON-stringified result of formatter.header(object, config) call.
     * It contains json ML array that represents RemoteObject.
     */
    header: string;
    /**
     * If formatter returns true as a result of formatter.hasBody call then bodyGetterId will
     * contain RemoteObjectId for the function that returns result of formatter.body(object, config) call.
     * The result value is json ML array.
     */
    bodyGetterId?: RemoteObjectId;
}

export const enum ObjectPreviewType {
    Object = "object",
    Function = "function",
    Undefined = "undefined",
    String = "string",
    Number = "number",
    Boolean = "boolean",
    Symbol = "symbol",
    Bigint = "bigint",
}

export const enum ObjectPreviewSubtype {
    Array = "array",
    Null = "null",
    Node = "node",
    Regexp = "regexp",
    Date = "date",
    Map = "map",
    Set = "set",
    Weakmap = "weakmap",
    Weakset = "weakset",
    Iterator = "iterator",
    Generator = "generator",
    Error = "error",
    Proxy = "proxy",
    Promise = "promise",
    Typedarray = "typedarray",
    Arraybuffer = "arraybuffer",
    Dataview = "dataview",
    Webassemblymemory = "webassemblymemory",
    Wasmvalue = "wasmvalue",
}

/**
 * Object containing abbreviated remote object value.
 */
export type ObjectPreview = {
    /**
     * Object type. (ObjectPreviewType enum)
     */
    type: ("object" | "function" | "undefined" | "string" | "number" | "boolean" | "symbol" | "bigint");
    /**
     * Object subtype hint. Specified for `object` type values only. (ObjectPreviewSubtype enum)
     */
    subtype?: ("array" | "null" | "node" | "regexp" | "date" | "map" | "set" | "weakmap" | "weakset" | "iterator" | "generator" | "error" | "proxy" | "promise" | "typedarray" | "arraybuffer" | "dataview" | "webassemblymemory" | "wasmvalue");
    /**
     * String representation of the object.
     */
    description?: string;
    /**
     * True iff some of the properties or entries of the original object did not fit.
     */
    overflow: boolean;
    /**
     * List of the properties.
     */
    properties: PropertyPreview[];
    /**
     * List of the entries. Specified for `map` and `set` subtype values only.
     */
    entries?: EntryPreview[];
}

export const enum PropertyPreviewType {
    Object = "object",
    Function = "function",
    Undefined = "undefined",
    String = "string",
    Number = "number",
    Boolean = "boolean",
    Symbol = "symbol",
    Accessor = "accessor",
    Bigint = "bigint",
}

export const enum PropertyPreviewSubtype {
    Array = "array",
    Null = "null",
    Node = "node",
    Regexp = "regexp",
    Date = "date",
    Map = "map",
    Set = "set",
    Weakmap = "weakmap",
    Weakset = "weakset",
    Iterator = "iterator",
    Generator = "generator",
    Error = "error",
    Proxy = "proxy",
    Promise = "promise",
    Typedarray = "typedarray",
    Arraybuffer = "arraybuffer",
    Dataview = "dataview",
    Webassemblymemory = "webassemblymemory",
    Wasmvalue = "wasmvalue",
}

export type PropertyPreview = {
    /**
     * Property name.
     */
    name: string;
    /**
     * Object type. Accessor means that the property itself is an accessor property. (PropertyPreviewType enum)
     */
    type: ("object" | "function" | "undefined" | "string" | "number" | "boolean" | "symbol" | "accessor" | "bigint");
    /**
     * User-friendly property value string.
     */
    value?: string;
    /**
     * Nested value preview.
     */
    valuePreview?: ObjectPreview;
    /**
     * Object subtype hint. Specified for `object` type values only. (PropertyPreviewSubtype enum)
     */
    subtype?: ("array" | "null" | "node" | "regexp" | "date" | "map" | "set" | "weakmap" | "weakset" | "iterator" | "generator" | "error" | "proxy" | "promise" | "typedarray" | "arraybuffer" | "dataview" | "webassemblymemory" | "wasmvalue");
}

export type EntryPreview = {
    /**
     * Preview of the key. Specified for map-like collection entries.
     */
    key?: ObjectPreview;
    /**
     * Preview of the value.
     */
    value: ObjectPreview;
}

/**
 * Object property descriptor.
 */
export type PropertyDescriptor = {
    /**
     * Property name or symbol description.
     */
    name: string;
    /**
     * The value associated with the property.
     */
    value?: RemoteObject;
    /**
     * True if the value associated with the property may be changed (data descriptors only).
     */
    writable?: boolean;
    /**
     * A function which serves as a getter for the property, or `undefined` if there is no getter
     * (accessor descriptors only).
     */
    get?: RemoteObject;
    /**
     * A function which serves as a setter for the property, or `undefined` if there is no setter
     * (accessor descriptors only).
     */
    set?: RemoteObject;
    /**
     * True if the type of this property descriptor may be changed and if the property may be
     * deleted from the corresponding object.
     */
    configurable: boolean;
    /**
     * True if this property shows up during enumeration of the properties on the corresponding
     * object.
     */
    enumerable: boolean;
    /**
     * True if the result was thrown during the evaluation.
     */
    wasThrown?: boolean;
    /**
     * True if the property is owned for the object.
     */
    isOwn?: boolean;
    /**
     * Property symbol object, if the property is of the `symbol` type.
     */
    symbol?: RemoteObject;
}

/**
 * Object internal property descriptor. This property isn't normally visible in JavaScript code.
 */
export type InternalPropertyDescriptor = {
    /**
     * Conventional property name.
     */
    name: string;
    /**
     * The value associated with the property.
     */
    value?: RemoteObject;
}

/**
 * Object private field descriptor.
 */
export type PrivatePropertyDescriptor = {
    /**
     * Private property name.
     */
    name: string;
    /**
     * The value associated with the private property.
     */
    value?: RemoteObject;
    /**
     * A function which serves as a getter for the private property,
     * or `undefined` if there is no getter (accessor descriptors only).
     */
    get?: RemoteObject;
    /**
     * A function which serves as a setter for the private property,
     * or `undefined` if there is no setter (accessor descriptors only).
     */
    set?: RemoteObject;
}

/**
 * Represents function call argument. Either remote object id `objectId`, primitive `value`,
 * unserializable primitive value or neither of (for undefined) them should be specified.
 */
export type CallArgument = {
    /**
     * Primitive value or serializable javascript object.
     */
    value?: any;
    /**
     * Primitive value which can not be JSON-stringified.
     */
    unserializableValue?: UnserializableValue;
    /**
     * Remote object handle.
     */
    objectId?: RemoteObjectId;
}

/**
 * Id of an execution context.
 */
export type ExecutionContextId = integer;

/**
 * Description of an isolated world.
 */
export type ExecutionContextDescription = {
    /**
     * Unique id of the execution context. It can be used to specify in which execution context
     * script evaluation should be performed.
     */
    id: ExecutionContextId;
    /**
     * Execution context origin.
     */
    origin: string;
    /**
     * Human readable name describing given context.
     */
    name: string;
    /**
     * A system-unique execution context identifier. Unlike the id, this is unique across
     * multiple processes, so can be reliably used to identify specific context while backend
     * performs a cross-process navigation.
     */
    uniqueId: string;
    /**
     * Embedder-specific auxiliary data.
     */
    auxData?: any;
}

/**
 * Detailed information about exception (or error) that was thrown during script compilation or
 * execution.
 */
export type ExceptionDetails = {
    /**
     * Exception id.
     */
    exceptionId: integer;
    /**
     * Exception text, which should be used together with exception object when available.
     */
    text: string;
    /**
     * Line number of the exception location (0-based).
     */
    lineNumber: integer;
    /**
     * Column number of the exception location (0-based).
     */
    columnNumber: integer;
    /**
     * Script ID of the exception location.
     */
    scriptId?: ScriptId;
    /**
     * URL of the exception location, to be used when the script was not reported.
     */
    url?: string;
    /**
     * JavaScript stack trace if available.
     */
    stackTrace?: StackTrace;
    /**
     * Exception object if available.
     */
    exception?: RemoteObject;
    /**
     * Identifier of the context where exception happened.
     */
    executionContextId?: ExecutionContextId;
    /**
     * Dictionary with entries of meta data that the client associated
     * with this exception, such as information about associated network
     * requests, etc.
     */
    exceptionMetaData?: any;
}

/**
 * Number of milliseconds since epoch.
 */
export type Timestamp = number;

/**
 * Number of milliseconds.
 */
export type TimeDelta = number;

/**
 * Stack entry for runtime errors and assertions.
 */
export type CallFrame = {
    /**
     * JavaScript function name.
     */
    functionName: string;
    /**
     * JavaScript script id.
     */
    scriptId: ScriptId;
    /**
     * JavaScript script name or url.
     */
    url: string;
    /**
     * JavaScript script line number (0-based).
     */
    lineNumber: integer;
    /**
     * JavaScript script column number (0-based).
     */
    columnNumber: integer;
}

/**
 * Call frames for assertions or error messages.
 */
export type StackTrace = {
    /**
     * String label of this stack trace. For async traces this may be a name of the function that
     * initiated the async call.
     */
    description?: string;
    /**
     * JavaScript function name.
     */
    callFrames: CallFrame[];
    /**
     * Asynchronous JavaScript stack trace that preceded this stack, if available.
     */
    parent?: StackTrace;
    /**
     * Asynchronous JavaScript stack trace that preceded this stack, if available.
     */
    parentId?: StackTraceId;
}

/**
 * Unique identifier of current debugger.
 */
export type UniqueDebuggerId = string;

/**
 * If `debuggerId` is set stack trace comes from another debugger and can be resolved there. This
 * allows to track cross-debugger calls. See `Runtime.StackTrace` and `Debugger.paused` for usages.
 */
export type StackTraceId = {
    id: string;
    debuggerId?: UniqueDebuggerId;
}

export type AwaitPromiseRequest = {
    /**
     * Identifier of the promise.
     */
    promiseObjectId: RemoteObjectId;
    /**
     * Whether the result is expected to be a JSON object that should be sent by value.
     */
    returnByValue?: boolean;
    /**
     * Whether preview should be generated for the result.
     */
    generatePreview?: boolean;
}

export type AwaitPromiseResponse = {
    /**
     * Promise result. Will contain rejected value if promise was rejected.
     */
    result: RemoteObject;
    /**
     * Exception details if stack strace is available.
     */
    exceptionDetails?: ExceptionDetails;
}

export type CallFunctionOnRequest = {
    /**
     * Declaration of the function to call.
     */
    functionDeclaration: string;
    /**
     * Identifier of the object to call function on. Either objectId or executionContextId should
     * be specified.
     */
    objectId?: RemoteObjectId;
    /**
     * Call arguments. All call arguments must belong to the same JavaScript world as the target
     * object.
     */
    arguments?: CallArgument[];
    /**
     * In silent mode exceptions thrown during evaluation are not reported and do not pause
     * execution. Overrides `setPauseOnException` state.
     */
    silent?: boolean;
    /**
     * Whether the result is expected to be a JSON object which should be sent by value.
     */
    returnByValue?: boolean;
    /**
     * Whether preview should be generated for the result.
     */
    generatePreview?: boolean;
    /**
     * Whether execution should be treated as initiated by user in the UI.
     */
    userGesture?: boolean;
    /**
     * Whether execution should `await` for resulting value and return once awaited promise is
     * resolved.
     */
    awaitPromise?: boolean;
    /**
     * Specifies execution context which global object will be used to call function on. Either
     * executionContextId or objectId should be specified.
     */
    executionContextId?: ExecutionContextId;
    /**
     * Symbolic group name that can be used to release multiple objects. If objectGroup is not
     * specified and objectId is, objectGroup will be inherited from object.
     */
    objectGroup?: string;
    /**
     * Whether to throw an exception if side effect cannot be ruled out during evaluation.
     */
    throwOnSideEffect?: boolean;
}

export type CallFunctionOnResponse = {
    /**
     * Call result.
     */
    result: RemoteObject;
    /**
     * Exception details.
     */
    exceptionDetails?: ExceptionDetails;
}

export type CompileScriptRequest = {
    /**
     * Expression to compile.
     */
    expression: string;
    /**
     * Source url to be set for the script.
     */
    sourceURL: string;
    /**
     * Specifies whether the compiled script should be persisted.
     */
    persistScript: boolean;
    /**
     * Specifies in which execution context to perform script run. If the parameter is omitted the
     * evaluation will be performed in the context of the inspected page.
     */
    executionContextId?: ExecutionContextId;
}

export type CompileScriptResponse = {
    /**
     * Id of the script.
     */
    scriptId?: ScriptId;
    /**
     * Exception details.
     */
    exceptionDetails?: ExceptionDetails;
}

export type EvaluateRequest = {
    /**
     * Expression to evaluate.
     */
    expression: string;
    /**
     * Symbolic group name that can be used to release multiple objects.
     */
    objectGroup?: string;
    /**
     * Determines whether Command Line API should be available during the evaluation.
     */
    includeCommandLineAPI?: boolean;
    /**
     * In silent mode exceptions thrown during evaluation are not reported and do not pause
     * execution. Overrides `setPauseOnException` state.
     */
    silent?: boolean;
    /**
     * Specifies in which execution context to perform evaluation. If the parameter is omitted the
     * evaluation will be performed in the context of the inspected page.
     * This is mutually exclusive with `uniqueContextId`, which offers an
     * alternative way to identify the execution context that is more reliable
     * in a multi-process environment.
     */
    contextId?: ExecutionContextId;
    /**
     * Whether the result is expected to be a JSON object that should be sent by value.
     */
    returnByValue?: boolean;
    /**
     * Whether preview should be generated for the result.
     */
    generatePreview?: boolean;
    /**
     * Whether execution should be treated as initiated by user in the UI.
     */
    userGesture?: boolean;
    /**
     * Whether execution should `await` for resulting value and return once awaited promise is
     * resolved.
     */
    awaitPromise?: boolean;
    /**
     * Whether to throw an exception if side effect cannot be ruled out during evaluation.
     * This implies `disableBreaks` below.
     */
    throwOnSideEffect?: boolean;
    /**
     * Terminate execution after timing out (number of milliseconds).
     */
    timeout?: TimeDelta;
    /**
     * Disable breakpoints during execution.
     */
    disableBreaks?: boolean;
    /**
     * Setting this flag to true enables `let` re-declaration and top-level `await`.
     * Note that `let` variables can only be re-declared if they originate from
     * `replMode` themselves.
     */
    replMode?: boolean;
    /**
     * The Content Security Policy (CSP) for the target might block 'unsafe-eval'
     * which includes eval(), Function(), setTimeout() and setInterval()
     * when called with non-callable arguments. This flag bypasses CSP for this
     * evaluation and allows unsafe-eval. Defaults to true.
     */
    allowUnsafeEvalBlockedByCSP?: boolean;
    /**
     * An alternative way to specify the execution context to evaluate in.
     * Compared to contextId that may be reused across processes, this is guaranteed to be
     * system-unique, so it can be used to prevent accidental evaluation of the expression
     * in context different than intended (e.g. as a result of navigation across process
     * boundaries).
     * This is mutually exclusive with `contextId`.
     */
    uniqueContextId?: string;
}

export type EvaluateResponse = {
    /**
     * Evaluation result.
     */
    result: RemoteObject;
    /**
     * Exception details.
     */
    exceptionDetails?: ExceptionDetails;
}

export type GetIsolateIdResponse = {
    /**
     * The isolate id.
     */
    id: string;
}

export type GetHeapUsageResponse = {
    /**
     * Used heap size in bytes.
     */
    usedSize: number;
    /**
     * Allocated heap size in bytes.
     */
    totalSize: number;
}

export type GetPropertiesRequest = {
    /**
     * Identifier of the object to return properties for.
     */
    objectId: RemoteObjectId;
    /**
     * If true, returns properties belonging only to the element itself, not to its prototype
     * chain.
     */
    ownProperties?: boolean;
    /**
     * If true, returns accessor properties (with getter/setter) only; internal properties are not
     * returned either.
     */
    accessorPropertiesOnly?: boolean;
    /**
     * Whether preview should be generated for the results.
     */
    generatePreview?: boolean;
    /**
     * If true, returns non-indexed properties only.
     */
    nonIndexedPropertiesOnly?: boolean;
}

export type GetPropertiesResponse = {
    /**
     * Object properties.
     */
    result: PropertyDescriptor[];
    /**
     * Internal object properties (only of the element itself).
     */
    internalProperties?: InternalPropertyDescriptor[];
    /**
     * Object private properties.
     */
    privateProperties?: PrivatePropertyDescriptor[];
    /**
     * Exception details.
     */
    exceptionDetails?: ExceptionDetails;
}

export type GlobalLexicalScopeNamesRequest = {
    /**
     * Specifies in which execution context to lookup global scope variables.
     */
    executionContextId?: ExecutionContextId;
}

export type GlobalLexicalScopeNamesResponse = {
    names: string[];
}

export type QueryObjectsRequest = {
    /**
     * Identifier of the prototype to return objects for.
     */
    prototypeObjectId: RemoteObjectId;
    /**
     * Symbolic group name that can be used to release the results.
     */
    objectGroup?: string;
}

export type QueryObjectsResponse = {
    /**
     * Array with objects.
     */
    objects: RemoteObject;
}

export type ReleaseObjectRequest = {
    /**
     * Identifier of the object to release.
     */
    objectId: RemoteObjectId;
}

export type ReleaseObjectGroupRequest = {
    /**
     * Symbolic object group name.
     */
    objectGroup: string;
}

export type RunScriptRequest = {
    /**
     * Id of the script to run.
     */
    scriptId: ScriptId;
    /**
     * Specifies in which execution context to perform script run. If the parameter is omitted the
     * evaluation will be performed in the context of the inspected page.
     */
    executionContextId?: ExecutionContextId;
    /**
     * Symbolic group name that can be used to release multiple objects.
     */
    objectGroup?: string;
    /**
     * In silent mode exceptions thrown during evaluation are not reported and do not pause
     * execution. Overrides `setPauseOnException` state.
     */
    silent?: boolean;
    /**
     * Determines whether Command Line API should be available during the evaluation.
     */
    includeCommandLineAPI?: boolean;
    /**
     * Whether the result is expected to be a JSON object which should be sent by value.
     */
    returnByValue?: boolean;
    /**
     * Whether preview should be generated for the result.
     */
    generatePreview?: boolean;
    /**
     * Whether execution should `await` for resulting value and return once awaited promise is
     * resolved.
     */
    awaitPromise?: boolean;
}

export type RunScriptResponse = {
    /**
     * Run result.
     */
    result: RemoteObject;
    /**
     * Exception details.
     */
    exceptionDetails?: ExceptionDetails;
}

export type SetAsyncCallStackDepthRequest = {
    /**
     * Maximum depth of async call stacks. Setting to `0` will effectively disable collecting async
     * call stacks (default).
     */
    maxDepth: integer;
}

export type SetCustomObjectFormatterEnabledRequest = {
    enabled: boolean;
}

export type SetMaxCallStackSizeToCaptureRequest = {
    size: integer;
}

export type AddBindingRequest = {
    name: string;
    /**
     * If specified, the binding would only be exposed to the specified
     * execution context. If omitted and `executionContextName` is not set,
     * the binding is exposed to all execution contexts of the target.
     * This parameter is mutually exclusive with `executionContextName`.
     * Deprecated in favor of `executionContextName` due to an unclear use case
     * and bugs in implementation (crbug.com/1169639). `executionContextId` will be
     * removed in the future.
     */
    executionContextId?: ExecutionContextId;
    /**
     * If specified, the binding is exposed to the executionContext with
     * matching name, even for contexts created after the binding is added.
     * See also `ExecutionContext.name` and `worldName` parameter to
     * `Page.addScriptToEvaluateOnNewDocument`.
     * This parameter is mutually exclusive with `executionContextId`.
     */
    executionContextName?: string;
}

export type RemoveBindingRequest = {
    name: string;
}

/**
 * Notification is issued every time when binding is called.
 */
export type BindingCalledEvent = {
    name: string;
    payload: string;
    /**
     * Identifier of the context where the call was made.
     */
    executionContextId: ExecutionContextId;
}

export const enum ConsoleAPICalledEventType {
    Log = "log",
    Debug = "debug",
    Info = "info",
    Error = "error",
    Warning = "warning",
    Dir = "dir",
    DirXML = "dirxml",
    Table = "table",
    Trace = "trace",
    Clear = "clear",
    StartGroup = "startGroup",
    StartGroupCollapsed = "startGroupCollapsed",
    EndGroup = "endGroup",
    Assert = "assert",
    Profile = "profile",
    ProfileEnd = "profileEnd",
    Count = "count",
    TimeEnd = "timeEnd",
}

/**
 * Issued when console API was called.
 */
export type ConsoleAPICalledEvent = {
    /**
     * Type of the call. (ConsoleAPICalledEventType enum)
     */
    type: ("log" | "debug" | "info" | "error" | "warning" | "dir" | "dirxml" | "table" | "trace" | "clear" | "startGroup" | "startGroupCollapsed" | "endGroup" | "assert" | "profile" | "profileEnd" | "count" | "timeEnd");
    /**
     * Call arguments.
     */
    args: RemoteObject[];
    /**
     * Identifier of the context where the call was made.
     */
    executionContextId: ExecutionContextId;
    /**
     * Call timestamp.
     */
    timestamp: Timestamp;
    /**
     * Stack trace captured when the call was made. The async stack chain is automatically reported for
     * the following call types: `assert`, `error`, `trace`, `warning`. For other types the async call
     * chain can be retrieved using `Debugger.getStackTrace` and `stackTrace.parentId` field.
     */
    stackTrace?: StackTrace;
    /**
     * Console context descriptor for calls on non-default console context (not console.*):
     * 'anonymous#unique-logger-id' for call on unnamed context, 'name#unique-logger-id' for call
     * on named context.
     */
    context?: string;
}

/**
 * Issued when unhandled exception was revoked.
 */
export type ExceptionRevokedEvent = {
    /**
     * Reason describing why exception was revoked.
     */
    reason: string;
    /**
     * The id of revoked exception, as reported in `exceptionThrown`.
     */
    exceptionId: integer;
}

/**
 * Issued when exception was thrown and unhandled.
 */
export type ExceptionThrownEvent = {
    /**
     * Timestamp of the exception.
     */
    timestamp: Timestamp;
    exceptionDetails: ExceptionDetails;
}

/**
 * Issued when new execution context is created.
 */
export type ExecutionContextCreatedEvent = {
    /**
     * A newly created execution context.
     */
    context: ExecutionContextDescription;
}

/**
 * Issued when execution context is destroyed.
 */
export type ExecutionContextDestroyedEvent = {
    /**
     * Id of the destroyed context
     */
    executionContextId: ExecutionContextId;
}

/**
 * Issued when object should be inspected (for example, as a result of inspect() command line API
 * call).
 */
export type InspectRequestedEvent = {
    object: RemoteObject;
    hints: any;
    /**
     * Identifier of the context where the call was made.
     */
    executionContextId?: ExecutionContextId;
}

