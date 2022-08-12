import type * as Target from './target.d.ts'
import type * as Page from './page.d.ts'

export type integer = number;

/**
 * The Browser domain defines methods and events for browser managing.
 */

export type BrowserContextID = string;

export type WindowID = integer;

/**
 * The state of the browser window.
 */
export type WindowState = ("normal" | "minimized" | "maximized" | "fullscreen");

/**
 * Browser window bounds information
 */
export interface Bounds {
    /**
     * The offset from the left edge of the screen to the window in pixels.
     */
    left?: integer;
    /**
     * The offset from the top edge of the screen to the window in pixels.
     */
    top?: integer;
    /**
     * The window width in pixels.
     */
    width?: integer;
    /**
     * The window height in pixels.
     */
    height?: integer;
    /**
     * The window state. Default to normal.
     */
    windowState?: WindowState;
}

export type PermissionType = ("accessibilityEvents" | "audioCapture" | "backgroundSync" | "backgroundFetch" | "clipboardReadWrite" | "clipboardSanitizedWrite" | "displayCapture" | "durableStorage" | "flash" | "geolocation" | "midi" | "midiSysex" | "nfc" | "notifications" | "paymentHandler" | "periodicBackgroundSync" | "protectedMediaIdentifier" | "sensors" | "videoCapture" | "videoCapturePanTiltZoom" | "idleDetection" | "wakeLockScreen" | "wakeLockSystem");

export type PermissionSetting = ("granted" | "denied" | "prompt");

/**
 * Definition of PermissionDescriptor defined in the Permissions API:
 * https://w3c.github.io/permissions/#dictdef-permissiondescriptor.
 */
export interface PermissionDescriptor {
    /**
     * Name of permission.
     * See https://cs.chromium.org/chromium/src/third_party/blink/renderer/modules/permissions/permission_descriptor.idl for valid permission names.
     */
    name: string;
    /**
     * For "midi" permission, may also specify sysex control.
     */
    sysex?: boolean;
    /**
     * For "push" permission, may specify userVisibleOnly.
     * Note that userVisibleOnly = true is the only currently supported type.
     */
    userVisibleOnly?: boolean;
    /**
     * For "clipboard" permission, may specify allowWithoutSanitization.
     */
    allowWithoutSanitization?: boolean;
    /**
     * For "camera" permission, may specify panTiltZoom.
     */
    panTiltZoom?: boolean;
}

/**
 * Browser command ids used by executeBrowserCommand.
 */
export type BrowserCommandId = ("openTabSearch" | "closeTabSearch");

/**
 * Chrome histogram bucket.
 */
export interface Bucket {
    /**
     * Minimum value (inclusive).
     */
    low: integer;
    /**
     * Maximum value (exclusive).
     */
    high: integer;
    /**
     * Number of samples.
     */
    count: integer;
}

/**
 * Chrome histogram.
 */
export interface Histogram {
    /**
     * Name.
     */
    name: string;
    /**
     * Sum of sample values.
     */
    sum: integer;
    /**
     * Total number of samples.
     */
    count: integer;
    /**
     * Buckets.
     */
    buckets: Bucket[];
}

export interface SetPermissionRequest {
    /**
     * Descriptor of permission to override.
     */
    permission: PermissionDescriptor;
    /**
     * Setting of the permission.
     */
    setting: PermissionSetting;
    /**
     * Origin the permission applies to, all origins if not specified.
     */
    origin?: string;
    /**
     * Context to override. When omitted, default browser context is used.
     */
    browserContextId?: BrowserContextID;
}

export interface GrantPermissionsRequest {
    permissions: PermissionType[];
    /**
     * Origin the permission applies to, all origins if not specified.
     */
    origin?: string;
    /**
     * BrowserContext to override permissions. When omitted, default browser context is used.
     */
    browserContextId?: BrowserContextID;
}

export interface ResetPermissionsRequest {
    /**
     * BrowserContext to reset permissions. When omitted, default browser context is used.
     */
    browserContextId?: BrowserContextID;
}

export const enum SetDownloadBehaviorRequestBehavior {
    Deny = "deny",
    Allow = "allow",
    AllowAndName = "allowAndName",
    Default = "default",
}

export interface SetDownloadBehaviorRequest {
    /**
     * Whether to allow all or deny all download requests, or use default Chrome behavior if
     * available (otherwise deny). |allowAndName| allows download and names files according to
     * their dowmload guids. (SetDownloadBehaviorRequestBehavior enum)
     */
    behavior: ("deny" | "allow" | "allowAndName" | "default");
    /**
     * BrowserContext to set download behavior. When omitted, default browser context is used.
     */
    browserContextId?: BrowserContextID;
    /**
     * The default path to save downloaded files to. This is required if behavior is set to 'allow'
     * or 'allowAndName'.
     */
    downloadPath?: string;
    /**
     * Whether to emit download events (defaults to false).
     */
    eventsEnabled?: boolean;
}

export interface CancelDownloadRequest {
    /**
     * Global unique identifier of the download.
     */
    guid: string;
    /**
     * BrowserContext to perform the action in. When omitted, default browser context is used.
     */
    browserContextId?: BrowserContextID;
}

export interface GetVersionResponse {
    /**
     * Protocol version.
     */
    protocolVersion: string;
    /**
     * Product name.
     */
    product: string;
    /**
     * Product revision.
     */
    revision: string;
    /**
     * User-Agent.
     */
    userAgent: string;
    /**
     * V8 version.
     */
    jsVersion: string;
}

export interface GetBrowserCommandLineResponse {
    /**
     * Commandline parameters
     */
    arguments: string[];
}

export interface GetHistogramsRequest {
    /**
     * Requested substring in name. Only histograms which have query as a
     * substring in their name are extracted. An empty or absent query returns
     * all histograms.
     */
    query?: string;
    /**
     * If true, retrieve delta since last call.
     */
    delta?: boolean;
}

export interface GetHistogramsResponse {
    /**
     * Histograms.
     */
    histograms: Histogram[];
}

export interface GetHistogramRequest {
    /**
     * Requested histogram name.
     */
    name: string;
    /**
     * If true, retrieve delta since last call.
     */
    delta?: boolean;
}

export interface GetHistogramResponse {
    /**
     * Histogram.
     */
    histogram: Histogram;
}

export interface GetWindowBoundsRequest {
    /**
     * Browser window id.
     */
    windowId: WindowID;
}

export interface GetWindowBoundsResponse {
    /**
     * Bounds information of the window. When window state is 'minimized', the restored window
     * position and size are returned.
     */
    bounds: Bounds;
}

export interface GetWindowForTargetRequest {
    /**
     * Devtools agent host id. If called as a part of the session, associated targetId is used.
     */
    targetId?: Target.TargetID;
}

export interface GetWindowForTargetResponse {
    /**
     * Browser window id.
     */
    windowId: WindowID;
    /**
     * Bounds information of the window. When window state is 'minimized', the restored window
     * position and size are returned.
     */
    bounds: Bounds;
}

export interface SetWindowBoundsRequest {
    /**
     * Browser window id.
     */
    windowId: WindowID;
    /**
     * New window bounds. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined
     * with 'left', 'top', 'width' or 'height'. Leaves unspecified fields unchanged.
     */
    bounds: Bounds;
}

export interface SetDockTileRequest {
    badgeLabel?: string;
    /**
     * Png encoded image. (Encoded as a base64 string when passed over JSON)
     */
    image?: string;
}

export interface ExecuteBrowserCommandRequest {
    commandId: BrowserCommandId;
}

/**
 * Fired when page is about to start a download.
 */
export interface DownloadWillBeginEvent {
    /**
     * Id of the frame that caused the download to begin.
     */
    frameId: Page.FrameId;
    /**
     * Global unique identifier of the download.
     */
    guid: string;
    /**
     * URL of the resource being downloaded.
     */
    url: string;
    /**
     * Suggested file name of the resource (the actual name of the file saved on disk may differ).
     */
    suggestedFilename: string;
}

export const enum DownloadProgressEventState {
    InProgress = "inProgress",
    Completed = "completed",
    Canceled = "canceled",
}

/**
 * Fired when download makes progress. Last call has |done| == true.
 */
export interface DownloadProgressEvent {
    /**
     * Global unique identifier of the download.
     */
    guid: string;
    /**
     * Total expected bytes to download.
     */
    totalBytes: number;
    /**
     * Total bytes received.
     */
    receivedBytes: number;
    /**
     * Download status. (DownloadProgressEventState enum)
     */
    state: ("inProgress" | "completed" | "canceled");
}

