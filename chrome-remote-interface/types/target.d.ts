import type * as Page from './page.d.ts'
import type * as Browser from './browser.d.ts'

export type integer = number;

/**
 * Supports additional targets discovery and allows to attach to them.
 */

export type TargetID = string;

/**
 * Unique identifier of attached debugging session.
 */
export type SessionID = string;

export type TargetInfo = {
    targetId: TargetID;
    type: string;
    title: string;
    url: string;
    /**
     * Whether the target has an attached client.
     */
    attached: boolean;
    /**
     * Opener target Id
     */
    openerId?: TargetID;
    /**
     * Whether the target has access to the originating window.
     */
    canAccessOpener: boolean;
    /**
     * Frame id of originating window (is only set if target has an opener).
     */
    openerFrameId?: Page.FrameId;
    browserContextId?: Browser.BrowserContextID;
    /**
     * Provides additional details for specific target types. For example, for
     * the type of "page", this may be set to "portal" or "prerender".
     */
    subtype?: string;
}

/**
 * A filter used by target query/discovery/auto-attach operations.
 */
export type FilterEntry = {
    /**
     * If set, causes exclusion of mathcing targets from the list.
     */
    exclude?: boolean;
    /**
     * If not present, matches any type.
     */
    type?: string;
}

/**
 * The entries in TargetFilter are matched sequentially against targets and
 * the first entry that matches determines if the target is included or not,
 * depending on the value of `exclude` field in the entry.
 * If filter is not specified, the one assumed is
 * [{type: "browser", exclude: true}, {type: "tab", exclude: true}, {}]
 * (i.e. include everything but `browser` and `tab`).
 */
export type TargetFilter = FilterEntry[];

export type RemoteLocation = {
    host: string;
    port: integer;
}

export type ActivateTargetRequest = {
    targetId: TargetID;
}

export type AttachToTargetRequest = {
    targetId: TargetID;
    /**
     * Enables "flat" access to the session via specifying sessionId attribute in the commands.
     * We plan to make this the default, deprecate non-flattened mode,
     * and eventually retire it. See crbug.com/991325.
     */
    flatten?: boolean;
}

export type AttachToTargetResponse = {
    /**
     * Id assigned to the session.
     */
    sessionId: SessionID;
}

export type AttachToBrowserTargetResponse = {
    /**
     * Id assigned to the session.
     */
    sessionId: SessionID;
}

export type CloseTargetRequest = {
    targetId: TargetID;
}

export type CloseTargetResponse = {
    /**
     * Always set to true. If an error occurs, the response indicates protocol error.
     */
    success: boolean;
}

export type ExposeDevToolsProtocolRequest = {
    targetId: TargetID;
    /**
     * Binding name, 'cdp' if not specified.
     */
    bindingName?: string;
}

export type CreateBrowserContextRequest = {
    /**
     * If specified, disposes this context when debugging session disconnects.
     */
    disposeOnDetach?: boolean;
    /**
     * Proxy server, similar to the one passed to --proxy-server
     */
    proxyServer?: string;
    /**
     * Proxy bypass list, similar to the one passed to --proxy-bypass-list
     */
    proxyBypassList?: string;
    /**
     * An optional list of origins to grant unlimited cross-origin access to.
     * Parts of the URL other than those constituting origin are ignored.
     */
    originsWithUniversalNetworkAccess?: string[];
}

export type CreateBrowserContextResponse = {
    /**
     * The id of the context created.
     */
    browserContextId: Browser.BrowserContextID;
}

export type GetBrowserContextsResponse = {
    /**
     * An array of browser context ids.
     */
    browserContextIds: Browser.BrowserContextID[];
}

export type CreateTargetRequest = {
    /**
     * The initial URL the page will be navigated to. An empty string indicates about:blank.
     */
    url: string;
    /**
     * Frame width in DIP (headless chrome only).
     */
    width?: integer;
    /**
     * Frame height in DIP (headless chrome only).
     */
    height?: integer;
    /**
     * The browser context to create the page in.
     */
    browserContextId?: Browser.BrowserContextID;
    /**
     * Whether BeginFrames for this target will be controlled via DevTools (headless chrome only,
     * not supported on MacOS yet, false by default).
     */
    enableBeginFrameControl?: boolean;
    /**
     * Whether to create a new Window or Tab (chrome-only, false by default).
     */
    newWindow?: boolean;
    /**
     * Whether to create the target in background or foreground (chrome-only,
     * false by default).
     */
    background?: boolean;
    /**
     * Whether to create the target of type "tab".
     */
    forTab?: boolean;
}

export type CreateTargetResponse = {
    /**
     * The id of the page opened.
     */
    targetId: TargetID;
}

export type DetachFromTargetRequest = {
    /**
     * Session to detach.
     */
    sessionId?: SessionID;
    /**
     * Deprecated.
     */
    targetId?: TargetID;
}

export type DisposeBrowserContextRequest = {
    browserContextId: Browser.BrowserContextID;
}

export type GetTargetInfoRequest = {
    targetId?: TargetID;
}

export type GetTargetInfoResponse = {
    targetInfo: TargetInfo;
}

export type GetTargetsRequest = {
    /**
     * Only targets matching filter will be reported. If filter is not specified
     * and target discovery is currently enabled, a filter used for target discovery
     * is used for consistency.
     */
    filter?: TargetFilter;
}

export type GetTargetsResponse = {
    /**
     * The list of targets.
     */
    targetInfos: TargetInfo[];
}

export type SendMessageToTargetRequest = {
    message: string;
    /**
     * Identifier of the session.
     */
    sessionId?: SessionID;
    /**
     * Deprecated.
     */
    targetId?: TargetID;
}

export type SetAutoAttachRequest = {
    /**
     * Whether to auto-attach to related targets.
     */
    autoAttach: boolean;
    /**
     * Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`
     * to run paused targets.
     */
    waitForDebuggerOnStart: boolean;
    /**
     * Enables "flat" access to the session via specifying sessionId attribute in the commands.
     * We plan to make this the default, deprecate non-flattened mode,
     * and eventually retire it. See crbug.com/991325.
     */
    flatten?: boolean;
    /**
     * Only targets matching filter will be attached.
     */
    filter?: TargetFilter;
}

export type AutoAttachRelatedRequest = {
    targetId: TargetID;
    /**
     * Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`
     * to run paused targets.
     */
    waitForDebuggerOnStart: boolean;
    /**
     * Only targets matching filter will be attached.
     */
    filter?: TargetFilter;
}

export type SetDiscoverTargetsRequest = {
    /**
     * Whether to discover available targets.
     */
    discover: boolean;
    /**
     * Only targets matching filter will be attached. If `discover` is false,
     * `filter` must be omitted or empty.
     */
    filter?: TargetFilter;
}

export type SetRemoteLocationsRequest = {
    /**
     * List of remote locations.
     */
    locations: RemoteLocation[];
}

/**
 * Issued when attached to target because of auto-attach or `attachToTarget` command.
 */
export type AttachedToTargetEvent = {
    /**
     * Identifier assigned to the session used to send/receive messages.
     */
    sessionId: SessionID;
    targetInfo: TargetInfo;
    waitingForDebugger: boolean;
}

/**
 * Issued when detached from target for any reason (including `detachFromTarget` command). Can be
 * issued multiple times per target if multiple sessions have been attached to it.
 */
export type DetachedFromTargetEvent = {
    /**
     * Detached session identifier.
     */
    sessionId: SessionID;
    /**
     * Deprecated.
     */
    targetId?: TargetID;
}

/**
 * Notifies about a new protocol message received from the session (as reported in
 * `attachedToTarget` event).
 */
export type ReceivedMessageFromTargetEvent = {
    /**
     * Identifier of a session which sends a message.
     */
    sessionId: SessionID;
    message: string;
    /**
     * Deprecated.
     */
    targetId?: TargetID;
}

/**
 * Issued when a possible inspection target is created.
 */
export type TargetCreatedEvent = {
    targetInfo: TargetInfo;
}

/**
 * Issued when a target is destroyed.
 */
export type TargetDestroyedEvent = {
    targetId: TargetID;
}

/**
 * Issued when a target has crashed.
 */
export type TargetCrashedEvent = {
    targetId: TargetID;
    /**
     * Termination status type.
     */
    status: string;
    /**
     * Termination error code.
     */
    errorCode: integer;
}

/**
 * Issued when some information about a target has changed. This only happens between
 * `targetCreated` and `targetDestroyed`.
 */
export type TargetInfoChangedEvent = {
    targetInfo: TargetInfo;
}

