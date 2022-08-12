import type * as Network from './network.d.ts'
import type * as Runtime from './runtime.d.ts'
import type * as DOM from './dom.d.ts'
import type * as IO from './io.d.ts'
import type * as Debugger from './debugger.d.ts'
import type * as Emulation from './emulation.d.ts'

export type integer = number;

/**
 * Actions and events related to the inspected page belong to the page domain.
 */

/**
 * Unique frame identifier.
 */
export type FrameId = string;

/**
 * Indicates whether a frame has been identified as an ad.
 */
export type AdFrameType = ("none" | "child" | "root");

export type AdFrameExplanation = ("ParentIsAd" | "CreatedByAdScript" | "MatchedBlockingRule");

/**
 * Indicates whether a frame has been identified as an ad and why.
 */
export interface AdFrameStatus {
    adFrameType: AdFrameType;
    explanations?: AdFrameExplanation[];
}

/**
 * Indicates whether the frame is a secure context and why it is the case.
 */
export type SecureContextType = ("Secure" | "SecureLocalhost" | "InsecureScheme" | "InsecureAncestor");

/**
 * Indicates whether the frame is cross-origin isolated and why it is the case.
 */
export type CrossOriginIsolatedContextType = ("Isolated" | "NotIsolated" | "NotIsolatedFeatureDisabled");

export type GatedAPIFeatures = ("SharedArrayBuffers" | "SharedArrayBuffersTransferAllowed" | "PerformanceMeasureMemory" | "PerformanceProfile");

/**
 * All Permissions Policy features. This enum should match the one defined
 * in third_party/blink/renderer/core/permissions_policy/permissions_policy_features.json5.
 */
export type PermissionsPolicyFeature = ("accelerometer" | "ambient-light-sensor" | "attribution-reporting" | "autoplay" | "camera" | "ch-dpr" | "ch-device-memory" | "ch-downlink" | "ch-ect" | "ch-prefers-color-scheme" | "ch-rtt" | "ch-ua" | "ch-ua-arch" | "ch-ua-bitness" | "ch-ua-platform" | "ch-ua-model" | "ch-ua-mobile" | "ch-ua-full" | "ch-ua-full-version" | "ch-ua-full-version-list" | "ch-ua-platform-version" | "ch-ua-reduced" | "ch-ua-wow64" | "ch-viewport-height" | "ch-viewport-width" | "ch-width" | "ch-partitioned-cookies" | "clipboard-read" | "clipboard-write" | "cross-origin-isolated" | "direct-sockets" | "display-capture" | "document-domain" | "encrypted-media" | "execution-while-out-of-viewport" | "execution-while-not-rendered" | "focus-without-user-activation" | "fullscreen" | "frobulate" | "gamepad" | "geolocation" | "gyroscope" | "hid" | "idle-detection" | "join-ad-interest-group" | "keyboard-map" | "magnetometer" | "microphone" | "midi" | "otp-credentials" | "payment" | "picture-in-picture" | "publickey-credentials-get" | "run-ad-auction" | "screen-wake-lock" | "serial" | "shared-autofill" | "storage-access-api" | "sync-xhr" | "trust-token-redemption" | "usb" | "vertical-scroll" | "web-share" | "window-placement" | "xr-spatial-tracking");

/**
 * Reason for a permissions policy feature to be disabled.
 */
export type PermissionsPolicyBlockReason = ("Header" | "IframeAttribute" | "InFencedFrameTree");

export interface PermissionsPolicyBlockLocator {
    frameId: FrameId;
    blockReason: PermissionsPolicyBlockReason;
}

export interface PermissionsPolicyFeatureState {
    feature: PermissionsPolicyFeature;
    allowed: boolean;
    locator?: PermissionsPolicyBlockLocator;
}

/**
 * Origin Trial(https://www.chromium.org/blink/origin-trials) support.
 * Status for an Origin Trial token.
 */
export type OriginTrialTokenStatus = ("Success" | "NotSupported" | "Insecure" | "Expired" | "WrongOrigin" | "InvalidSignature" | "Malformed" | "WrongVersion" | "FeatureDisabled" | "TokenDisabled" | "FeatureDisabledForUser" | "UnknownTrial");

/**
 * Status for an Origin Trial.
 */
export type OriginTrialStatus = ("Enabled" | "ValidTokenNotProvided" | "OSNotSupported" | "TrialNotAllowed");

export type OriginTrialUsageRestriction = ("None" | "Subset");

export interface OriginTrialToken {
    origin: string;
    matchSubDomains: boolean;
    trialName: string;
    expiryTime: Network.TimeSinceEpoch;
    isThirdParty: boolean;
    usageRestriction: OriginTrialUsageRestriction;
}

export interface OriginTrialTokenWithStatus {
    rawTokenText: string;
    /**
     * `parsedToken` is present only when the token is extractable and
     * parsable.
     */
    parsedToken?: OriginTrialToken;
    status: OriginTrialTokenStatus;
}

export interface OriginTrial {
    trialName: string;
    status: OriginTrialStatus;
    tokensWithStatus: OriginTrialTokenWithStatus[];
}

/**
 * Information about the Frame on the page.
 */
export interface Frame {
    /**
     * Frame unique identifier.
     */
    id: FrameId;
    /**
     * Parent frame identifier.
     */
    parentId?: FrameId;
    /**
     * Identifier of the loader associated with this frame.
     */
    loaderId: Network.LoaderId;
    /**
     * Frame's name as specified in the tag.
     */
    name?: string;
    /**
     * Frame document's URL without fragment.
     */
    url: string;
    /**
     * Frame document's URL fragment including the '#'.
     */
    urlFragment?: string;
    /**
     * Frame document's registered domain, taking the public suffixes list into account.
     * Extracted from the Frame's url.
     * Example URLs: http://www.google.com/file.html -> "google.com"
     *               http://a.b.co.uk/file.html      -> "b.co.uk"
     */
    domainAndRegistry: string;
    /**
     * Frame document's security origin.
     */
    securityOrigin: string;
    /**
     * Frame document's mimeType as determined by the browser.
     */
    mimeType: string;
    /**
     * If the frame failed to load, this contains the URL that could not be loaded. Note that unlike url above, this URL may contain a fragment.
     */
    unreachableUrl?: string;
    /**
     * Indicates whether this frame was tagged as an ad and why.
     */
    adFrameStatus?: AdFrameStatus;
    /**
     * Indicates whether the main document is a secure context and explains why that is the case.
     */
    secureContextType: SecureContextType;
    /**
     * Indicates whether this is a cross origin isolated context.
     */
    crossOriginIsolatedContextType: CrossOriginIsolatedContextType;
    /**
     * Indicated which gated APIs / features are available.
     */
    gatedAPIFeatures: GatedAPIFeatures[];
}

/**
 * Information about the Resource on the page.
 */
export interface FrameResource {
    /**
     * Resource URL.
     */
    url: string;
    /**
     * Type of this resource.
     */
    type: Network.ResourceType;
    /**
     * Resource mimeType as determined by the browser.
     */
    mimeType: string;
    /**
     * last-modified timestamp as reported by server.
     */
    lastModified?: Network.TimeSinceEpoch;
    /**
     * Resource content size.
     */
    contentSize?: number;
    /**
     * True if the resource failed to load.
     */
    failed?: boolean;
    /**
     * True if the resource was canceled during loading.
     */
    canceled?: boolean;
}

/**
 * Information about the Frame hierarchy along with their cached resources.
 */
export interface FrameResourceTree {
    /**
     * Frame information for this tree item.
     */
    frame: Frame;
    /**
     * Child frames.
     */
    childFrames?: FrameResourceTree[];
    /**
     * Information about frame resources.
     */
    resources: FrameResource[];
}

/**
 * Information about the Frame hierarchy.
 */
export interface FrameTree {
    /**
     * Frame information for this tree item.
     */
    frame: Frame;
    /**
     * Child frames.
     */
    childFrames?: FrameTree[];
}

/**
 * Unique script identifier.
 */
export type ScriptIdentifier = string;

/**
 * Transition type.
 */
export type TransitionType = ("link" | "typed" | "address_bar" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "auto_toplevel" | "form_submit" | "reload" | "keyword" | "keyword_generated" | "other");

/**
 * Navigation history entry.
 */
export interface NavigationEntry {
    /**
     * Unique id of the navigation history entry.
     */
    id: integer;
    /**
     * URL of the navigation history entry.
     */
    url: string;
    /**
     * URL that the user typed in the url bar.
     */
    userTypedURL: string;
    /**
     * Title of the navigation history entry.
     */
    title: string;
    /**
     * Transition type.
     */
    transitionType: TransitionType;
}

/**
 * Screencast frame metadata.
 */
export interface ScreencastFrameMetadata {
    /**
     * Top offset in DIP.
     */
    offsetTop: number;
    /**
     * Page scale factor.
     */
    pageScaleFactor: number;
    /**
     * Device screen width in DIP.
     */
    deviceWidth: number;
    /**
     * Device screen height in DIP.
     */
    deviceHeight: number;
    /**
     * Position of horizontal scroll in CSS pixels.
     */
    scrollOffsetX: number;
    /**
     * Position of vertical scroll in CSS pixels.
     */
    scrollOffsetY: number;
    /**
     * Frame swap timestamp.
     */
    timestamp?: Network.TimeSinceEpoch;
}

/**
 * Javascript dialog type.
 */
export type DialogType = ("alert" | "confirm" | "prompt" | "beforeunload");

/**
 * Error while paring app manifest.
 */
export interface AppManifestError {
    /**
     * Error message.
     */
    message: string;
    /**
     * If criticial, this is a non-recoverable parse error.
     */
    critical: integer;
    /**
     * Error line.
     */
    line: integer;
    /**
     * Error column.
     */
    column: integer;
}

/**
 * Parsed app manifest properties.
 */
export interface AppManifestParsedProperties {
    /**
     * Computed scope value
     */
    scope: string;
}

/**
 * Layout viewport position and dimensions.
 */
export interface LayoutViewport {
    /**
     * Horizontal offset relative to the document (CSS pixels).
     */
    pageX: integer;
    /**
     * Vertical offset relative to the document (CSS pixels).
     */
    pageY: integer;
    /**
     * Width (CSS pixels), excludes scrollbar if present.
     */
    clientWidth: integer;
    /**
     * Height (CSS pixels), excludes scrollbar if present.
     */
    clientHeight: integer;
}

/**
 * Visual viewport position, dimensions, and scale.
 */
export interface VisualViewport {
    /**
     * Horizontal offset relative to the layout viewport (CSS pixels).
     */
    offsetX: number;
    /**
     * Vertical offset relative to the layout viewport (CSS pixels).
     */
    offsetY: number;
    /**
     * Horizontal offset relative to the document (CSS pixels).
     */
    pageX: number;
    /**
     * Vertical offset relative to the document (CSS pixels).
     */
    pageY: number;
    /**
     * Width (CSS pixels), excludes scrollbar if present.
     */
    clientWidth: number;
    /**
     * Height (CSS pixels), excludes scrollbar if present.
     */
    clientHeight: number;
    /**
     * Scale relative to the ideal viewport (size at width=device-width).
     */
    scale: number;
    /**
     * Page zoom factor (CSS to device independent pixels ratio).
     */
    zoom?: number;
}

/**
 * Viewport for capturing screenshot.
 */
export interface Viewport {
    /**
     * X offset in device independent pixels (dip).
     */
    x: number;
    /**
     * Y offset in device independent pixels (dip).
     */
    y: number;
    /**
     * Rectangle width in device independent pixels (dip).
     */
    width: number;
    /**
     * Rectangle height in device independent pixels (dip).
     */
    height: number;
    /**
     * Page scale factor.
     */
    scale: number;
}

/**
 * Generic font families collection.
 */
export interface FontFamilies {
    /**
     * The standard font-family.
     */
    standard?: string;
    /**
     * The fixed font-family.
     */
    fixed?: string;
    /**
     * The serif font-family.
     */
    serif?: string;
    /**
     * The sansSerif font-family.
     */
    sansSerif?: string;
    /**
     * The cursive font-family.
     */
    cursive?: string;
    /**
     * The fantasy font-family.
     */
    fantasy?: string;
    /**
     * The pictograph font-family.
     */
    pictograph?: string;
}

/**
 * Font families collection for a script.
 */
export interface ScriptFontFamilies {
    /**
     * Name of the script which these font families are defined for.
     */
    script: string;
    /**
     * Generic font families collection for the script.
     */
    fontFamilies: FontFamilies;
}

/**
 * Default font sizes.
 */
export interface FontSizes {
    /**
     * Default standard font size.
     */
    standard?: integer;
    /**
     * Default fixed font size.
     */
    fixed?: integer;
}

export type ClientNavigationReason = ("formSubmissionGet" | "formSubmissionPost" | "httpHeaderRefresh" | "scriptInitiated" | "metaTagRefresh" | "pageBlockInterstitial" | "reload" | "anchorClick");

export type ClientNavigationDisposition = ("currentTab" | "newTab" | "newWindow" | "download");

export interface InstallabilityErrorArgument {
    /**
     * Argument name (e.g. name:'minimum-icon-size-in-pixels').
     */
    name: string;
    /**
     * Argument value (e.g. value:'64').
     */
    value: string;
}

/**
 * The installability error
 */
export interface InstallabilityError {
    /**
     * The error id (e.g. 'manifest-missing-suitable-icon').
     */
    errorId: string;
    /**
     * The list of error arguments (e.g. {name:'minimum-icon-size-in-pixels', value:'64'}).
     */
    errorArguments: InstallabilityErrorArgument[];
}

/**
 * The referring-policy used for the navigation.
 */
export type ReferrerPolicy = ("noReferrer" | "noReferrerWhenDowngrade" | "origin" | "originWhenCrossOrigin" | "sameOrigin" | "strictOrigin" | "strictOriginWhenCrossOrigin" | "unsafeUrl");

/**
 * Per-script compilation cache parameters for `Page.produceCompilationCache`
 */
export interface CompilationCacheParams {
    /**
     * The URL of the script to produce a compilation cache entry for.
     */
    url: string;
    /**
     * A hint to the backend whether eager compilation is recommended.
     * (the actual compilation mode used is upon backend discretion).
     */
    eager?: boolean;
}

/**
 * The type of a frameNavigated event.
 */
export type NavigationType = ("Navigation" | "BackForwardCacheRestore");

/**
 * List of not restored reasons for back-forward cache.
 */
export type BackForwardCacheNotRestoredReason = ("NotPrimaryMainFrame" | "BackForwardCacheDisabled" | "RelatedActiveContentsExist" | "HTTPStatusNotOK" | "SchemeNotHTTPOrHTTPS" | "Loading" | "WasGrantedMediaAccess" | "DisableForRenderFrameHostCalled" | "DomainNotAllowed" | "HTTPMethodNotGET" | "SubframeIsNavigating" | "Timeout" | "CacheLimit" | "JavaScriptExecution" | "RendererProcessKilled" | "RendererProcessCrashed" | "GrantedMediaStreamAccess" | "SchedulerTrackedFeatureUsed" | "ConflictingBrowsingInstance" | "CacheFlushed" | "ServiceWorkerVersionActivation" | "SessionRestored" | "ServiceWorkerPostMessage" | "EnteredBackForwardCacheBeforeServiceWorkerHostAdded" | "RenderFrameHostReused_SameSite" | "RenderFrameHostReused_CrossSite" | "ServiceWorkerClaim" | "IgnoreEventAndEvict" | "HaveInnerContents" | "TimeoutPuttingInCache" | "BackForwardCacheDisabledByLowMemory" | "BackForwardCacheDisabledByCommandLine" | "NetworkRequestDatapipeDrainedAsBytesConsumer" | "NetworkRequestRedirected" | "NetworkRequestTimeout" | "NetworkExceedsBufferLimit" | "NavigationCancelledWhileRestoring" | "NotMostRecentNavigationEntry" | "BackForwardCacheDisabledForPrerender" | "UserAgentOverrideDiffers" | "ForegroundCacheLimit" | "BrowsingInstanceNotSwapped" | "BackForwardCacheDisabledForDelegate" | "OptInUnloadHeaderNotPresent" | "UnloadHandlerExistsInMainFrame" | "UnloadHandlerExistsInSubFrame" | "ServiceWorkerUnregistration" | "CacheControlNoStore" | "CacheControlNoStoreCookieModified" | "CacheControlNoStoreHTTPOnlyCookieModified" | "NoResponseHead" | "Unknown" | "ActivationNavigationsDisallowedForBug1234857" | "WebSocket" | "WebTransport" | "WebRTC" | "MainResourceHasCacheControlNoStore" | "MainResourceHasCacheControlNoCache" | "SubresourceHasCacheControlNoStore" | "SubresourceHasCacheControlNoCache" | "ContainsPlugins" | "DocumentLoaded" | "DedicatedWorkerOrWorklet" | "OutstandingNetworkRequestOthers" | "OutstandingIndexedDBTransaction" | "RequestedNotificationsPermission" | "RequestedMIDIPermission" | "RequestedAudioCapturePermission" | "RequestedVideoCapturePermission" | "RequestedBackForwardCacheBlockedSensors" | "RequestedBackgroundWorkPermission" | "BroadcastChannel" | "IndexedDBConnection" | "WebXR" | "SharedWorker" | "WebLocks" | "WebHID" | "WebShare" | "RequestedStorageAccessGrant" | "WebNfc" | "OutstandingNetworkRequestFetch" | "OutstandingNetworkRequestXHR" | "AppBanner" | "Printing" | "WebDatabase" | "PictureInPicture" | "Portal" | "SpeechRecognizer" | "IdleManager" | "PaymentManager" | "SpeechSynthesis" | "KeyboardLock" | "WebOTPService" | "OutstandingNetworkRequestDirectSocket" | "InjectedJavascript" | "InjectedStyleSheet" | "Dummy" | "ContentSecurityHandler" | "ContentWebAuthenticationAPI" | "ContentFileChooser" | "ContentSerial" | "ContentFileSystemAccess" | "ContentMediaDevicesDispatcherHost" | "ContentWebBluetooth" | "ContentWebUSB" | "ContentMediaSession" | "ContentMediaSessionService" | "ContentScreenReader" | "EmbedderPopupBlockerTabHelper" | "EmbedderSafeBrowsingTriggeredPopupBlocker" | "EmbedderSafeBrowsingThreatDetails" | "EmbedderAppBannerManager" | "EmbedderDomDistillerViewerSource" | "EmbedderDomDistillerSelfDeletingRequestDelegate" | "EmbedderOomInterventionTabHelper" | "EmbedderOfflinePage" | "EmbedderChromePasswordManagerClientBindCredentialManager" | "EmbedderPermissionRequestManager" | "EmbedderModalDialog" | "EmbedderExtensions" | "EmbedderExtensionMessaging" | "EmbedderExtensionMessagingForOpenPort" | "EmbedderExtensionSentMessageToCachedFrame");

/**
 * Types of not restored reasons for back-forward cache.
 */
export type BackForwardCacheNotRestoredReasonType = ("SupportPending" | "PageSupportNeeded" | "Circumstantial");

export interface BackForwardCacheNotRestoredExplanation {
    /**
     * Type of the reason
     */
    type: BackForwardCacheNotRestoredReasonType;
    /**
     * Not restored reason
     */
    reason: BackForwardCacheNotRestoredReason;
}

export interface BackForwardCacheNotRestoredExplanationTree {
    /**
     * URL of each frame
     */
    url: string;
    /**
     * Not restored reasons of each frame
     */
    explanations: BackForwardCacheNotRestoredExplanation[];
    /**
     * Array of children frame
     */
    children: BackForwardCacheNotRestoredExplanationTree[];
}

export interface AddScriptToEvaluateOnLoadRequest {
    scriptSource: string;
}

export interface AddScriptToEvaluateOnLoadResponse {
    /**
     * Identifier of the added script.
     */
    identifier: ScriptIdentifier;
}

export interface AddScriptToEvaluateOnNewDocumentRequest {
    source: string;
    /**
     * If specified, creates an isolated world with the given name and evaluates given script in it.
     * This world name will be used as the ExecutionContextDescription::name when the corresponding
     * event is emitted.
     */
    worldName?: string;
    /**
     * Specifies whether command line API should be available to the script, defaults
     * to false.
     */
    includeCommandLineAPI?: boolean;
}

export interface AddScriptToEvaluateOnNewDocumentResponse {
    /**
     * Identifier of the added script.
     */
    identifier: ScriptIdentifier;
}

export const enum CaptureScreenshotRequestFormat {
    Jpeg = "jpeg",
    Png = "png",
    Webp = "webp",
}

export interface CaptureScreenshotRequest {
    /**
     * Image compression format (defaults to png). (CaptureScreenshotRequestFormat enum)
     */
    format?: ("jpeg" | "png" | "webp");
    /**
     * Compression quality from range [0..100] (jpeg only).
     */
    quality?: integer;
    /**
     * Capture the screenshot of a given region only.
     */
    clip?: Viewport;
    /**
     * Capture the screenshot from the surface, rather than the view. Defaults to true.
     */
    fromSurface?: boolean;
    /**
     * Capture the screenshot beyond the viewport. Defaults to false.
     */
    captureBeyondViewport?: boolean;
}

export interface CaptureScreenshotResponse {
    /**
     * Base64-encoded image data. (Encoded as a base64 string when passed over JSON)
     */
    data: string;
}

export const enum CaptureSnapshotRequestFormat {
    MHTML = "mhtml",
}

export interface CaptureSnapshotRequest {
    /**
     * Format (defaults to mhtml). (CaptureSnapshotRequestFormat enum)
     */
    format?: ("mhtml");
}

export interface CaptureSnapshotResponse {
    /**
     * Serialized page data.
     */
    data: string;
}

export interface CreateIsolatedWorldRequest {
    /**
     * Id of the frame in which the isolated world should be created.
     */
    frameId: FrameId;
    /**
     * An optional name which is reported in the Execution Context.
     */
    worldName?: string;
    /**
     * Whether or not universal access should be granted to the isolated world. This is a powerful
     * option, use with caution.
     */
    grantUniveralAccess?: boolean;
}

export interface CreateIsolatedWorldResponse {
    /**
     * Execution context of the isolated world.
     */
    executionContextId: Runtime.ExecutionContextId;
}

export interface DeleteCookieRequest {
    /**
     * Name of the cookie to remove.
     */
    cookieName: string;
    /**
     * URL to match cooke domain and path.
     */
    url: string;
}

export interface GetAppManifestResponse {
    /**
     * Manifest location.
     */
    url: string;
    errors: AppManifestError[];
    /**
     * Manifest content.
     */
    data?: string;
    /**
     * Parsed manifest properties
     */
    parsed?: AppManifestParsedProperties;
}

export interface GetInstallabilityErrorsResponse {
    installabilityErrors: InstallabilityError[];
}

export interface GetManifestIconsResponse {
    primaryIcon?: string;
}

export interface GetAppIdResponse {
    /**
     * App id, either from manifest's id attribute or computed from start_url
     */
    appId?: string;
    /**
     * Recommendation for manifest's id attribute to match current id computed from start_url
     */
    recommendedId?: string;
}

export interface GetCookiesResponse {
    /**
     * Array of cookie objects.
     */
    cookies: Network.Cookie[];
}

export interface GetFrameTreeResponse {
    /**
     * Present frame tree structure.
     */
    frameTree: FrameTree;
}

export interface GetLayoutMetricsResponse {
    /**
     * Deprecated metrics relating to the layout viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssLayoutViewport` instead.
     */
    layoutViewport: LayoutViewport;
    /**
     * Deprecated metrics relating to the visual viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssVisualViewport` instead.
     */
    visualViewport: VisualViewport;
    /**
     * Deprecated size of scrollable area. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssContentSize` instead.
     */
    contentSize: DOM.Rect;
    /**
     * Metrics relating to the layout viewport in CSS pixels.
     */
    cssLayoutViewport: LayoutViewport;
    /**
     * Metrics relating to the visual viewport in CSS pixels.
     */
    cssVisualViewport: VisualViewport;
    /**
     * Size of scrollable area in CSS pixels.
     */
    cssContentSize: DOM.Rect;
}

export interface GetNavigationHistoryResponse {
    /**
     * Index of the current navigation history entry.
     */
    currentIndex: integer;
    /**
     * Array of navigation history entries.
     */
    entries: NavigationEntry[];
}

export interface GetResourceContentRequest {
    /**
     * Frame id to get resource for.
     */
    frameId: FrameId;
    /**
     * URL of the resource to get content for.
     */
    url: string;
}

export interface GetResourceContentResponse {
    /**
     * Resource content.
     */
    content: string;
    /**
     * True, if content was served as base64.
     */
    base64Encoded: boolean;
}

export interface GetResourceTreeResponse {
    /**
     * Present frame / resource tree structure.
     */
    frameTree: FrameResourceTree;
}

export interface HandleJavaScriptDialogRequest {
    /**
     * Whether to accept or dismiss the dialog.
     */
    accept: boolean;
    /**
     * The text to enter into the dialog prompt before accepting. Used only if this is a prompt
     * dialog.
     */
    promptText?: string;
}

export interface NavigateRequest {
    /**
     * URL to navigate the page to.
     */
    url: string;
    /**
     * Referrer URL.
     */
    referrer?: string;
    /**
     * Intended transition type.
     */
    transitionType?: TransitionType;
    /**
     * Frame id to navigate, if not specified navigates the top frame.
     */
    frameId?: FrameId;
    /**
     * Referrer-policy used for the navigation.
     */
    referrerPolicy?: ReferrerPolicy;
}

export interface NavigateResponse {
    /**
     * Frame id that has navigated (or failed to navigate)
     */
    frameId: FrameId;
    /**
     * Loader identifier.
     */
    loaderId?: Network.LoaderId;
    /**
     * User friendly error message, present if and only if navigation has failed.
     */
    errorText?: string;
}

export interface NavigateToHistoryEntryRequest {
    /**
     * Unique id of the entry to navigate to.
     */
    entryId: integer;
}

export const enum PrintToPDFRequestTransferMode {
    ReturnAsBase64 = "ReturnAsBase64",
    ReturnAsStream = "ReturnAsStream",
}

export interface PrintToPDFRequest {
    /**
     * Paper orientation. Defaults to false.
     */
    landscape?: boolean;
    /**
     * Display header and footer. Defaults to false.
     */
    displayHeaderFooter?: boolean;
    /**
     * Print background graphics. Defaults to false.
     */
    printBackground?: boolean;
    /**
     * Scale of the webpage rendering. Defaults to 1.
     */
    scale?: number;
    /**
     * Paper width in inches. Defaults to 8.5 inches.
     */
    paperWidth?: number;
    /**
     * Paper height in inches. Defaults to 11 inches.
     */
    paperHeight?: number;
    /**
     * Top margin in inches. Defaults to 1cm (~0.4 inches).
     */
    marginTop?: number;
    /**
     * Bottom margin in inches. Defaults to 1cm (~0.4 inches).
     */
    marginBottom?: number;
    /**
     * Left margin in inches. Defaults to 1cm (~0.4 inches).
     */
    marginLeft?: number;
    /**
     * Right margin in inches. Defaults to 1cm (~0.4 inches).
     */
    marginRight?: number;
    /**
     * Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means
     * print all pages.
     */
    pageRanges?: string;
    /**
     * Whether to silently ignore invalid but successfully parsed page ranges, such as '3-2'.
     * Defaults to false.
     */
    ignoreInvalidPageRanges?: boolean;
    /**
     * HTML template for the print header. Should be valid HTML markup with following
     * classes used to inject printing values into them:
     * - `date`: formatted print date
     * - `title`: document title
     * - `url`: document location
     * - `pageNumber`: current page number
     * - `totalPages`: total pages in the document
     * 
     * For example, `<span class=title></span>` would generate span containing the title.
     */
    headerTemplate?: string;
    /**
     * HTML template for the print footer. Should use the same format as the `headerTemplate`.
     */
    footerTemplate?: string;
    /**
     * Whether or not to prefer page size as defined by css. Defaults to false,
     * in which case the content will be scaled to fit the paper size.
     */
    preferCSSPageSize?: boolean;
    /**
     * return as stream (PrintToPDFRequestTransferMode enum)
     */
    transferMode?: ("ReturnAsBase64" | "ReturnAsStream");
}

export interface PrintToPDFResponse {
    /**
     * Base64-encoded pdf data. Empty if |returnAsStream| is specified. (Encoded as a base64 string when passed over JSON)
     */
    data: string;
    /**
     * A handle of the stream that holds resulting PDF data.
     */
    stream?: IO.StreamHandle;
}

export interface ReloadRequest {
    /**
     * If true, browser cache is ignored (as if the user pressed Shift+refresh).
     */
    ignoreCache?: boolean;
    /**
     * If set, the script will be injected into all frames of the inspected page after reload.
     * Argument will be ignored if reloading dataURL origin.
     */
    scriptToEvaluateOnLoad?: string;
}

export interface RemoveScriptToEvaluateOnLoadRequest {
    identifier: ScriptIdentifier;
}

export interface RemoveScriptToEvaluateOnNewDocumentRequest {
    identifier: ScriptIdentifier;
}

export interface ScreencastFrameAckRequest {
    /**
     * Frame number.
     */
    sessionId: integer;
}

export interface SearchInResourceRequest {
    /**
     * Frame id for resource to search in.
     */
    frameId: FrameId;
    /**
     * URL of the resource to search in.
     */
    url: string;
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

export interface SearchInResourceResponse {
    /**
     * List of search matches.
     */
    result: Debugger.SearchMatch[];
}

export interface SetAdBlockingEnabledRequest {
    /**
     * Whether to block ads.
     */
    enabled: boolean;
}

export interface SetBypassCSPRequest {
    /**
     * Whether to bypass page CSP.
     */
    enabled: boolean;
}

export interface GetPermissionsPolicyStateRequest {
    frameId: FrameId;
}

export interface GetPermissionsPolicyStateResponse {
    states: PermissionsPolicyFeatureState[];
}

export interface GetOriginTrialsRequest {
    frameId: FrameId;
}

export interface GetOriginTrialsResponse {
    originTrials: OriginTrial[];
}

export interface SetDeviceMetricsOverrideRequest {
    /**
     * Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.
     */
    width: integer;
    /**
     * Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.
     */
    height: integer;
    /**
     * Overriding device scale factor value. 0 disables the override.
     */
    deviceScaleFactor: number;
    /**
     * Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text
     * autosizing and more.
     */
    mobile: boolean;
    /**
     * Scale to apply to resulting view image.
     */
    scale?: number;
    /**
     * Overriding screen width value in pixels (minimum 0, maximum 10000000).
     */
    screenWidth?: integer;
    /**
     * Overriding screen height value in pixels (minimum 0, maximum 10000000).
     */
    screenHeight?: integer;
    /**
     * Overriding view X position on screen in pixels (minimum 0, maximum 10000000).
     */
    positionX?: integer;
    /**
     * Overriding view Y position on screen in pixels (minimum 0, maximum 10000000).
     */
    positionY?: integer;
    /**
     * Do not set visible view size, rely upon explicit setVisibleSize call.
     */
    dontSetVisibleSize?: boolean;
    /**
     * Screen orientation override.
     */
    screenOrientation?: Emulation.ScreenOrientation;
    /**
     * The viewport dimensions and scale. If not set, the override is cleared.
     */
    viewport?: Viewport;
}

export interface SetDeviceOrientationOverrideRequest {
    /**
     * Mock alpha
     */
    alpha: number;
    /**
     * Mock beta
     */
    beta: number;
    /**
     * Mock gamma
     */
    gamma: number;
}

export interface SetFontFamiliesRequest {
    /**
     * Specifies font families to set. If a font family is not specified, it won't be changed.
     */
    fontFamilies: FontFamilies;
    /**
     * Specifies font families to set for individual scripts.
     */
    forScripts?: ScriptFontFamilies[];
}

export interface SetFontSizesRequest {
    /**
     * Specifies font sizes to set. If a font size is not specified, it won't be changed.
     */
    fontSizes: FontSizes;
}

export interface SetDocumentContentRequest {
    /**
     * Frame id to set HTML for.
     */
    frameId: FrameId;
    /**
     * HTML content to set.
     */
    html: string;
}

export const enum SetDownloadBehaviorRequestBehavior {
    Deny = "deny",
    Allow = "allow",
    Default = "default",
}

export interface SetDownloadBehaviorRequest {
    /**
     * Whether to allow all or deny all download requests, or use default Chrome behavior if
     * available (otherwise deny). (SetDownloadBehaviorRequestBehavior enum)
     */
    behavior: ("deny" | "allow" | "default");
    /**
     * The default path to save downloaded files to. This is required if behavior is set to 'allow'
     */
    downloadPath?: string;
}

export interface SetGeolocationOverrideRequest {
    /**
     * Mock latitude
     */
    latitude?: number;
    /**
     * Mock longitude
     */
    longitude?: number;
    /**
     * Mock accuracy
     */
    accuracy?: number;
}

export interface SetLifecycleEventsEnabledRequest {
    /**
     * If true, starts emitting lifecycle events.
     */
    enabled: boolean;
}

export const enum SetTouchEmulationEnabledRequestConfiguration {
    Mobile = "mobile",
    Desktop = "desktop",
}

export interface SetTouchEmulationEnabledRequest {
    /**
     * Whether the touch event emulation should be enabled.
     */
    enabled: boolean;
    /**
     * Touch/gesture events configuration. Default: current platform. (SetTouchEmulationEnabledRequestConfiguration enum)
     */
    configuration?: ("mobile" | "desktop");
}

export const enum StartScreencastRequestFormat {
    Jpeg = "jpeg",
    Png = "png",
}

export interface StartScreencastRequest {
    /**
     * Image compression format. (StartScreencastRequestFormat enum)
     */
    format?: ("jpeg" | "png");
    /**
     * Compression quality from range [0..100].
     */
    quality?: integer;
    /**
     * Maximum screenshot width.
     */
    maxWidth?: integer;
    /**
     * Maximum screenshot height.
     */
    maxHeight?: integer;
    /**
     * Send every n-th frame.
     */
    everyNthFrame?: integer;
}

export const enum SetWebLifecycleStateRequestState {
    Frozen = "frozen",
    Active = "active",
}

export interface SetWebLifecycleStateRequest {
    /**
     * Target lifecycle state (SetWebLifecycleStateRequestState enum)
     */
    state: ("frozen" | "active");
}

export interface ProduceCompilationCacheRequest {
    scripts: CompilationCacheParams[];
}

export interface AddCompilationCacheRequest {
    url: string;
    /**
     * Base64-encoded data (Encoded as a base64 string when passed over JSON)
     */
    data: string;
}

export const enum SetSPCTransactionModeRequestMode {
    None = "none",
    Autoaccept = "autoaccept",
    Autoreject = "autoreject",
}

export interface SetSPCTransactionModeRequest {
    /**
     *  (SetSPCTransactionModeRequestMode enum)
     */
    mode: ("none" | "autoaccept" | "autoreject");
}

export interface GenerateTestReportRequest {
    /**
     * Message to be displayed in the report.
     */
    message: string;
    /**
     * Specifies the endpoint group to deliver the report to.
     */
    group?: string;
}

export interface SetInterceptFileChooserDialogRequest {
    enabled: boolean;
}

export interface DomContentEventFiredEvent {
    timestamp: Network.MonotonicTime;
}

export const enum FileChooserOpenedEventMode {
    SelectSingle = "selectSingle",
    SelectMultiple = "selectMultiple",
}

/**
 * Emitted only when `page.interceptFileChooser` is enabled.
 */
export interface FileChooserOpenedEvent {
    /**
     * Id of the frame containing input node.
     */
    frameId: FrameId;
    /**
     * Input node id.
     */
    backendNodeId: DOM.BackendNodeId;
    /**
     * Input mode. (FileChooserOpenedEventMode enum)
     */
    mode: ("selectSingle" | "selectMultiple");
}

/**
 * Fired when frame has been attached to its parent.
 */
export interface FrameAttachedEvent {
    /**
     * Id of the frame that has been attached.
     */
    frameId: FrameId;
    /**
     * Parent frame identifier.
     */
    parentFrameId: FrameId;
    /**
     * JavaScript stack trace of when frame was attached, only set if frame initiated from script.
     */
    stack?: Runtime.StackTrace;
}

/**
 * Fired when frame no longer has a scheduled navigation.
 */
export interface FrameClearedScheduledNavigationEvent {
    /**
     * Id of the frame that has cleared its scheduled navigation.
     */
    frameId: FrameId;
}

export const enum FrameDetachedEventReason {
    Remove = "remove",
    Swap = "swap",
}

/**
 * Fired when frame has been detached from its parent.
 */
export interface FrameDetachedEvent {
    /**
     * Id of the frame that has been detached.
     */
    frameId: FrameId;
    /**
     *  (FrameDetachedEventReason enum)
     */
    reason: ("remove" | "swap");
}

/**
 * Fired once navigation of the frame has completed. Frame is now associated with the new loader.
 */
export interface FrameNavigatedEvent {
    /**
     * Frame object.
     */
    frame: Frame;
    type: NavigationType;
}

/**
 * Fired when opening document to write to.
 */
export interface DocumentOpenedEvent {
    /**
     * Frame object.
     */
    frame: Frame;
}

/**
 * Fired when a renderer-initiated navigation is requested.
 * Navigation may still be cancelled after the event is issued.
 */
export interface FrameRequestedNavigationEvent {
    /**
     * Id of the frame that is being navigated.
     */
    frameId: FrameId;
    /**
     * The reason for the navigation.
     */
    reason: ClientNavigationReason;
    /**
     * The destination URL for the requested navigation.
     */
    url: string;
    /**
     * The disposition for the navigation.
     */
    disposition: ClientNavigationDisposition;
}

/**
 * Fired when frame schedules a potential navigation.
 */
export interface FrameScheduledNavigationEvent {
    /**
     * Id of the frame that has scheduled a navigation.
     */
    frameId: FrameId;
    /**
     * Delay (in seconds) until the navigation is scheduled to begin. The navigation is not
     * guaranteed to start.
     */
    delay: number;
    /**
     * The reason for the navigation.
     */
    reason: ClientNavigationReason;
    /**
     * The destination URL for the scheduled navigation.
     */
    url: string;
}

/**
 * Fired when frame has started loading.
 */
export interface FrameStartedLoadingEvent {
    /**
     * Id of the frame that has started loading.
     */
    frameId: FrameId;
}

/**
 * Fired when frame has stopped loading.
 */
export interface FrameStoppedLoadingEvent {
    /**
     * Id of the frame that has stopped loading.
     */
    frameId: FrameId;
}

/**
 * Fired when page is about to start a download.
 * Deprecated. Use Browser.downloadWillBegin instead.
 */
export interface DownloadWillBeginEvent {
    /**
     * Id of the frame that caused download to begin.
     */
    frameId: FrameId;
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
 * Deprecated. Use Browser.downloadProgress instead.
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

/**
 * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been
 * closed.
 */
export interface JavascriptDialogClosedEvent {
    /**
     * Whether dialog was confirmed.
     */
    result: boolean;
    /**
     * User input in case of prompt.
     */
    userInput: string;
}

/**
 * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to
 * open.
 */
export interface JavascriptDialogOpeningEvent {
    /**
     * Frame url.
     */
    url: string;
    /**
     * Message that will be displayed by the dialog.
     */
    message: string;
    /**
     * Dialog type.
     */
    type: DialogType;
    /**
     * True iff browser is capable showing or acting on the given dialog. When browser has no
     * dialog handler for given target, calling alert while Page domain is engaged will stall
     * the page execution. Execution can be resumed via calling Page.handleJavaScriptDialog.
     */
    hasBrowserHandler: boolean;
    /**
     * Default dialog prompt.
     */
    defaultPrompt?: string;
}

/**
 * Fired for top level page lifecycle events such as navigation, load, paint, etc.
 */
export interface LifecycleEventEvent {
    /**
     * Id of the frame.
     */
    frameId: FrameId;
    /**
     * Loader identifier. Empty string if the request is fetched from worker.
     */
    loaderId: Network.LoaderId;
    name: string;
    timestamp: Network.MonotonicTime;
}

/**
 * Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
 * not assume any ordering with the Page.frameNavigated event. This event is fired only for
 * main-frame history navigation where the document changes (non-same-document navigations),
 * when bfcache navigation fails.
 */
export interface BackForwardCacheNotUsedEvent {
    /**
     * The loader id for the associated navgation.
     */
    loaderId: Network.LoaderId;
    /**
     * The frame id of the associated frame.
     */
    frameId: FrameId;
    /**
     * Array of reasons why the page could not be cached. This must not be empty.
     */
    notRestoredExplanations: BackForwardCacheNotRestoredExplanation[];
    /**
     * Tree structure of reasons why the page could not be cached for each frame.
     */
    notRestoredExplanationsTree?: BackForwardCacheNotRestoredExplanationTree;
}

export interface LoadEventFiredEvent {
    timestamp: Network.MonotonicTime;
}

/**
 * Fired when same-document navigation happens, e.g. due to history API usage or anchor navigation.
 */
export interface NavigatedWithinDocumentEvent {
    /**
     * Id of the frame.
     */
    frameId: FrameId;
    /**
     * Frame's new url.
     */
    url: string;
}

/**
 * Compressed image data requested by the `startScreencast`.
 */
export interface ScreencastFrameEvent {
    /**
     * Base64-encoded compressed image. (Encoded as a base64 string when passed over JSON)
     */
    data: string;
    /**
     * Screencast frame metadata.
     */
    metadata: ScreencastFrameMetadata;
    /**
     * Frame number.
     */
    sessionId: integer;
}

/**
 * Fired when the page with currently enabled screencast was shown or hidden `.
 */
export interface ScreencastVisibilityChangedEvent {
    /**
     * True if the page is visible.
     */
    visible: boolean;
}

/**
 * Fired when a new window is going to be opened, via window.open(), link click, form submission,
 * etc.
 */
export interface WindowOpenEvent {
    /**
     * The URL for the new window.
     */
    url: string;
    /**
     * Window name.
     */
    windowName: string;
    /**
     * An array of enabled window features.
     */
    windowFeatures: string[];
    /**
     * Whether or not it was triggered by user gesture.
     */
    userGesture: boolean;
}

/**
 * Issued for every compilation cache generated. Is only available
 * if Page.setGenerateCompilationCache is enabled.
 */
export interface CompilationCacheProducedEvent {
    url: string;
    /**
     * Base64-encoded data (Encoded as a base64 string when passed over JSON)
     */
    data: string;
}

