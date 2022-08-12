import type * as Security from './security.d.ts'
import type * as Runtime from './runtime.d.ts'
import type * as Network from './network.d.ts'
import type * as IO from './io.d.ts'
import type * as Debugger from './debugger.d.ts'
import type * as Emulation from './emulation.d.ts'
import type * as Page from './page.d.ts'

export type integer = number;

/**
 * Network domain allows tracking network activities of the page. It exposes information about http,
 * file, data and other requests and responses, their headers, bodies, timing, etc.
 */

/**
 * Resource type as it was perceived by the rendering engine.
 */
export type ResourceType = ("Document" | "Stylesheet" | "Image" | "Media" | "Font" | "Script" | "TextTrack" | "XHR" | "Fetch" | "EventSource" | "WebSocket" | "Manifest" | "SignedExchange" | "Ping" | "CSPViolationReport" | "Preflight" | "Other");

/**
 * Unique loader identifier.
 */
export type LoaderId = string;

/**
 * Unique request identifier.
 */
export type RequestId = string;

/**
 * Unique intercepted request identifier.
 */
export type InterceptionId = string;

/**
 * Network level fetch failure reason.
 */
export type ErrorReason = ("Failed" | "Aborted" | "TimedOut" | "AccessDenied" | "ConnectionClosed" | "ConnectionReset" | "ConnectionRefused" | "ConnectionAborted" | "ConnectionFailed" | "NameNotResolved" | "InternetDisconnected" | "AddressUnreachable" | "BlockedByClient" | "BlockedByResponse");

/**
 * UTC time in seconds, counted from January 1, 1970.
 */
export type TimeSinceEpoch = number;

/**
 * Monotonically increasing time in seconds since an arbitrary point in the past.
 */
export type MonotonicTime = number;

/**
 * Request / response headers as keys / values of JSON object.
 */
export type Headers = {
    [key: string]: string;
}

/**
 * The underlying connection technology that the browser is supposedly using.
 */
export type ConnectionType = ("none" | "cellular2g" | "cellular3g" | "cellular4g" | "bluetooth" | "ethernet" | "wifi" | "wimax" | "other");

/**
 * Represents the cookie's 'SameSite' status:
 * https://tools.ietf.org/html/draft-west-first-party-cookies
 */
export type CookieSameSite = ("Strict" | "Lax" | "None");

/**
 * Represents the cookie's 'Priority' status:
 * https://tools.ietf.org/html/draft-west-cookie-priority-00
 */
export type CookiePriority = ("Low" | "Medium" | "High");

/**
 * Represents the source scheme of the origin that originally set the cookie.
 * A value of "Unset" allows protocol clients to emulate legacy cookie scope for the scheme.
 * This is a temporary ability and it will be removed in the future.
 */
export type CookieSourceScheme = ("Unset" | "NonSecure" | "Secure");

/**
 * Timing information for the request.
 */
export type ResourceTiming = {
    /**
     * Timing's requestTime is a baseline in seconds, while the other numbers are ticks in
     * milliseconds relatively to this requestTime.
     */
    requestTime: number;
    /**
     * Started resolving proxy.
     */
    proxyStart: number;
    /**
     * Finished resolving proxy.
     */
    proxyEnd: number;
    /**
     * Started DNS address resolve.
     */
    dnsStart: number;
    /**
     * Finished DNS address resolve.
     */
    dnsEnd: number;
    /**
     * Started connecting to the remote host.
     */
    connectStart: number;
    /**
     * Connected to the remote host.
     */
    connectEnd: number;
    /**
     * Started SSL handshake.
     */
    sslStart: number;
    /**
     * Finished SSL handshake.
     */
    sslEnd: number;
    /**
     * Started running ServiceWorker.
     */
    workerStart: number;
    /**
     * Finished Starting ServiceWorker.
     */
    workerReady: number;
    /**
     * Started fetch event.
     */
    workerFetchStart: number;
    /**
     * Settled fetch event respondWith promise.
     */
    workerRespondWithSettled: number;
    /**
     * Started sending request.
     */
    sendStart: number;
    /**
     * Finished sending request.
     */
    sendEnd: number;
    /**
     * Time the server started pushing request.
     */
    pushStart: number;
    /**
     * Time the server finished pushing request.
     */
    pushEnd: number;
    /**
     * Finished receiving response headers.
     */
    receiveHeadersEnd: number;
}

/**
 * Loading priority of a resource request.
 */
export type ResourcePriority = ("VeryLow" | "Low" | "Medium" | "High" | "VeryHigh");

/**
 * Post data entry for HTTP request
 */
export type PostDataEntry = {
    bytes?: string;
}

export const enum RequestReferrerPolicy {
    UnsafeUrl = "unsafe-url",
    NoReferrerWhenDowngrade = "no-referrer-when-downgrade",
    NoReferrer = "no-referrer",
    Origin = "origin",
    OriginWhenCrossOrigin = "origin-when-cross-origin",
    SameOrigin = "same-origin",
    StrictOrigin = "strict-origin",
    StrictOriginWhenCrossOrigin = "strict-origin-when-cross-origin",
}

/**
 * HTTP request data.
 */
export type Request = {
    /**
     * Request URL (without fragment).
     */
    url: string;
    /**
     * Fragment of the requested URL starting with hash, if present.
     */
    urlFragment?: string;
    /**
     * HTTP request method.
     */
    method: string;
    /**
     * HTTP request headers.
     */
    headers: Headers;
    /**
     * HTTP POST request data.
     */
    postData?: string;
    /**
     * True when the request has POST data. Note that postData might still be omitted when this flag is true when the data is too long.
     */
    hasPostData?: boolean;
    /**
     * Request body elements. This will be converted from base64 to binary
     */
    postDataEntries?: PostDataEntry[];
    /**
     * The mixed content type of the request.
     */
    mixedContentType?: Security.MixedContentType;
    /**
     * Priority of the resource request at the time request is sent.
     */
    initialPriority: ResourcePriority;
    /**
     * The referrer policy of the request, as defined in https://www.w3.org/TR/referrer-policy/ (RequestReferrerPolicy enum)
     */
    referrerPolicy: ("unsafe-url" | "no-referrer-when-downgrade" | "no-referrer" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin");
    /**
     * Whether is loaded via link preload.
     */
    isLinkPreload?: boolean;
    /**
     * Set for requests when the TrustToken API is used. Contains the parameters
     * passed by the developer (e.g. via "fetch") as understood by the backend.
     */
    trustTokenParams?: TrustTokenParams;
    /**
     * True if this resource request is considered to be the 'same site' as the
     * request correspondinfg to the main frame.
     */
    isSameSite?: boolean;
}

/**
 * Details of a signed certificate timestamp (SCT).
 */
export type SignedCertificateTimestamp = {
    /**
     * Validation status.
     */
    status: string;
    /**
     * Origin.
     */
    origin: string;
    /**
     * Log name / description.
     */
    logDescription: string;
    /**
     * Log ID.
     */
    logId: string;
    /**
     * Issuance date. Unlike TimeSinceEpoch, this contains the number of
     * milliseconds since January 1, 1970, UTC, not the number of seconds.
     */
    timestamp: number;
    /**
     * Hash algorithm.
     */
    hashAlgorithm: string;
    /**
     * Signature algorithm.
     */
    signatureAlgorithm: string;
    /**
     * Signature data.
     */
    signatureData: string;
}

/**
 * Security details about a request.
 */
export type SecurityDetails = {
    /**
     * Protocol name (e.g. "TLS 1.2" or "QUIC").
     */
    protocol: string;
    /**
     * Key Exchange used by the connection, or the empty string if not applicable.
     */
    keyExchange: string;
    /**
     * (EC)DH group used by the connection, if applicable.
     */
    keyExchangeGroup?: string;
    /**
     * Cipher name.
     */
    cipher: string;
    /**
     * TLS MAC. Note that AEAD ciphers do not have separate MACs.
     */
    mac?: string;
    /**
     * Certificate ID value.
     */
    certificateId: Security.CertificateId;
    /**
     * Certificate subject name.
     */
    subjectName: string;
    /**
     * Subject Alternative Name (SAN) DNS names and IP addresses.
     */
    sanList: string[];
    /**
     * Name of the issuing CA.
     */
    issuer: string;
    /**
     * Certificate valid from date.
     */
    validFrom: TimeSinceEpoch;
    /**
     * Certificate valid to (expiration) date
     */
    validTo: TimeSinceEpoch;
    /**
     * List of signed certificate timestamps (SCTs).
     */
    signedCertificateTimestampList: SignedCertificateTimestamp[];
    /**
     * Whether the request complied with Certificate Transparency policy
     */
    certificateTransparencyCompliance: CertificateTransparencyCompliance;
}

/**
 * Whether the request complied with Certificate Transparency policy.
 */
export type CertificateTransparencyCompliance = ("unknown" | "not-compliant" | "compliant");

/**
 * The reason why request was blocked.
 */
export type BlockedReason = ("other" | "csp" | "mixed-content" | "origin" | "inspector" | "subresource-filter" | "content-type" | "coep-frame-resource-needs-coep-header" | "coop-sandboxed-iframe-cannot-navigate-to-coop-page" | "corp-not-same-origin" | "corp-not-same-origin-after-defaulted-to-same-origin-by-coep" | "corp-not-same-site");

/**
 * The reason why request was blocked.
 */
export type CorsError = ("DisallowedByMode" | "InvalidResponse" | "WildcardOriginNotAllowed" | "MissingAllowOriginHeader" | "MultipleAllowOriginValues" | "InvalidAllowOriginValue" | "AllowOriginMismatch" | "InvalidAllowCredentials" | "CorsDisabledScheme" | "PreflightInvalidStatus" | "PreflightDisallowedRedirect" | "PreflightWildcardOriginNotAllowed" | "PreflightMissingAllowOriginHeader" | "PreflightMultipleAllowOriginValues" | "PreflightInvalidAllowOriginValue" | "PreflightAllowOriginMismatch" | "PreflightInvalidAllowCredentials" | "PreflightMissingAllowExternal" | "PreflightInvalidAllowExternal" | "PreflightMissingAllowPrivateNetwork" | "PreflightInvalidAllowPrivateNetwork" | "InvalidAllowMethodsPreflightResponse" | "InvalidAllowHeadersPreflightResponse" | "MethodDisallowedByPreflightResponse" | "HeaderDisallowedByPreflightResponse" | "RedirectContainsCredentials" | "InsecurePrivateNetwork" | "InvalidPrivateNetworkAccess" | "UnexpectedPrivateNetworkAccess" | "NoCorsRedirectModeNotFollow");

export type CorsErrorStatus = {
    corsError: CorsError;
    failedParameter: string;
}

/**
 * Source of serviceworker response.
 */
export type ServiceWorkerResponseSource = ("cache-storage" | "http-cache" | "fallback-code" | "network");

export const enum TrustTokenParamsRefreshPolicy {
    UseCached = "UseCached",
    Refresh = "Refresh",
}

/**
 * Determines what type of Trust Token operation is executed and
 * depending on the type, some additional parameters. The values
 * are specified in third_party/blink/renderer/core/fetch/trust_token.idl.
 */
export type TrustTokenParams = {
    type: TrustTokenOperationType;
    /**
     * Only set for "token-redemption" type and determine whether
     * to request a fresh SRR or use a still valid cached SRR. (TrustTokenParamsRefreshPolicy enum)
     */
    refreshPolicy: ("UseCached" | "Refresh");
    /**
     * Origins of issuers from whom to request tokens or redemption
     * records.
     */
    issuers?: string[];
}

export type TrustTokenOperationType = ("Issuance" | "Redemption" | "Signing");

/**
 * HTTP response data.
 */
export type Response = {
    /**
     * Response URL. This URL can be different from CachedResource.url in case of redirect.
     */
    url: string;
    /**
     * HTTP response status code.
     */
    status: integer;
    /**
     * HTTP response status text.
     */
    statusText: string;
    /**
     * HTTP response headers.
     */
    headers: Headers;
    /**
     * HTTP response headers text. This has been replaced by the headers in Network.responseReceivedExtraInfo.
     */
    headersText?: string;
    /**
     * Resource mimeType as determined by the browser.
     */
    mimeType: string;
    /**
     * Refined HTTP request headers that were actually transmitted over the network.
     */
    requestHeaders?: Headers;
    /**
     * HTTP request headers text. This has been replaced by the headers in Network.requestWillBeSentExtraInfo.
     */
    requestHeadersText?: string;
    /**
     * Specifies whether physical connection was actually reused for this request.
     */
    connectionReused: boolean;
    /**
     * Physical connection id that was actually used for this request.
     */
    connectionId: number;
    /**
     * Remote IP address.
     */
    remoteIPAddress?: string;
    /**
     * Remote port.
     */
    remotePort?: integer;
    /**
     * Specifies that the request was served from the disk cache.
     */
    fromDiskCache?: boolean;
    /**
     * Specifies that the request was served from the ServiceWorker.
     */
    fromServiceWorker?: boolean;
    /**
     * Specifies that the request was served from the prefetch cache.
     */
    fromPrefetchCache?: boolean;
    /**
     * Total number of bytes received for this request so far.
     */
    encodedDataLength: number;
    /**
     * Timing information for the given request.
     */
    timing?: ResourceTiming;
    /**
     * Response source of response from ServiceWorker.
     */
    serviceWorkerResponseSource?: ServiceWorkerResponseSource;
    /**
     * The time at which the returned response was generated.
     */
    responseTime?: TimeSinceEpoch;
    /**
     * Cache Storage Cache Name.
     */
    cacheStorageCacheName?: string;
    /**
     * Protocol used to fetch this request.
     */
    protocol?: string;
    /**
     * Security state of the request resource.
     */
    securityState: Security.SecurityState;
    /**
     * Security details for the request.
     */
    securityDetails?: SecurityDetails;
}

/**
 * WebSocket request data.
 */
export type WebSocketRequest = {
    /**
     * HTTP request headers.
     */
    headers: Headers;
}

/**
 * WebSocket response data.
 */
export type WebSocketResponse = {
    /**
     * HTTP response status code.
     */
    status: integer;
    /**
     * HTTP response status text.
     */
    statusText: string;
    /**
     * HTTP response headers.
     */
    headers: Headers;
    /**
     * HTTP response headers text.
     */
    headersText?: string;
    /**
     * HTTP request headers.
     */
    requestHeaders?: Headers;
    /**
     * HTTP request headers text.
     */
    requestHeadersText?: string;
}

/**
 * WebSocket message data. This represents an entire WebSocket message, not just a fragmented frame as the name suggests.
 */
export type WebSocketFrame = {
    /**
     * WebSocket message opcode.
     */
    opcode: number;
    /**
     * WebSocket message mask.
     */
    mask: boolean;
    /**
     * WebSocket message payload data.
     * If the opcode is 1, this is a text message and payloadData is a UTF-8 string.
     * If the opcode isn't 1, then payloadData is a base64 encoded string representing binary data.
     */
    payloadData: string;
}

/**
 * Information about the cached resource.
 */
export type CachedResource = {
    /**
     * Resource URL. This is the url of the original network request.
     */
    url: string;
    /**
     * Type of this resource.
     */
    type: ResourceType;
    /**
     * Cached response data.
     */
    response?: Response;
    /**
     * Cached response body size.
     */
    bodySize: number;
}

export const enum InitiatorType {
    Parser = "parser",
    Script = "script",
    Preload = "preload",
    SignedExchange = "SignedExchange",
    Preflight = "preflight",
    Other = "other",
}

/**
 * Information about the request initiator.
 */
export type Initiator = {
    /**
     * Type of this initiator. (InitiatorType enum)
     */
    type: ("parser" | "script" | "preload" | "SignedExchange" | "preflight" | "other");
    /**
     * Initiator JavaScript stack trace, set for Script only.
     */
    stack?: Runtime.StackTrace;
    /**
     * Initiator URL, set for Parser type or for Script type (when script is importing module) or for SignedExchange type.
     */
    url?: string;
    /**
     * Initiator line number, set for Parser type or for Script type (when script is importing
     * module) (0-based).
     */
    lineNumber?: number;
    /**
     * Initiator column number, set for Parser type or for Script type (when script is importing
     * module) (0-based).
     */
    columnNumber?: number;
    /**
     * Set if another request triggered this request (e.g. preflight).
     */
    requestId?: RequestId;
}

/**
 * Cookie object
 */
export type Cookie = {
    /**
     * Cookie name.
     */
    name: string;
    /**
     * Cookie value.
     */
    value: string;
    /**
     * Cookie domain.
     */
    domain: string;
    /**
     * Cookie path.
     */
    path: string;
    /**
     * Cookie expiration date as the number of seconds since the UNIX epoch.
     */
    expires: number;
    /**
     * Cookie size.
     */
    size: integer;
    /**
     * True if cookie is http-only.
     */
    httpOnly: boolean;
    /**
     * True if cookie is secure.
     */
    secure: boolean;
    /**
     * True in case of session cookie.
     */
    session: boolean;
    /**
     * Cookie SameSite type.
     */
    sameSite?: CookieSameSite;
    /**
     * Cookie Priority
     */
    priority: CookiePriority;
    /**
     * True if cookie is SameParty.
     */
    sameParty: boolean;
    /**
     * Cookie source scheme type.
     */
    sourceScheme: CookieSourceScheme;
    /**
     * Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
     * An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
     * This is a temporary ability and it will be removed in the future.
     */
    sourcePort: integer;
    /**
     * Cookie partition key. The site of the top-level URL the browser was visiting at the start
     * of the request to the endpoint that set the cookie.
     */
    partitionKey?: string;
    /**
     * True if cookie partition key is opaque.
     */
    partitionKeyOpaque?: boolean;
}

/**
 * Types of reasons why a cookie may not be stored from a response.
 */
export type SetCookieBlockedReason = ("SecureOnly" | "SameSiteStrict" | "SameSiteLax" | "SameSiteUnspecifiedTreatedAsLax" | "SameSiteNoneInsecure" | "UserPreferences" | "SyntaxError" | "SchemeNotSupported" | "OverwriteSecure" | "InvalidDomain" | "InvalidPrefix" | "UnknownError" | "SchemefulSameSiteStrict" | "SchemefulSameSiteLax" | "SchemefulSameSiteUnspecifiedTreatedAsLax" | "SamePartyFromCrossPartyContext" | "SamePartyConflictsWithOtherAttributes" | "NameValuePairExceedsMaxSize");

/**
 * Types of reasons why a cookie may not be sent with a request.
 */
export type CookieBlockedReason = ("SecureOnly" | "NotOnPath" | "DomainMismatch" | "SameSiteStrict" | "SameSiteLax" | "SameSiteUnspecifiedTreatedAsLax" | "SameSiteNoneInsecure" | "UserPreferences" | "UnknownError" | "SchemefulSameSiteStrict" | "SchemefulSameSiteLax" | "SchemefulSameSiteUnspecifiedTreatedAsLax" | "SamePartyFromCrossPartyContext" | "NameValuePairExceedsMaxSize");

/**
 * A cookie which was not stored from a response with the corresponding reason.
 */
export type BlockedSetCookieWithReason = {
    /**
     * The reason(s) this cookie was blocked.
     */
    blockedReasons: SetCookieBlockedReason[];
    /**
     * The string representing this individual cookie as it would appear in the header.
     * This is not the entire "cookie" or "set-cookie" header which could have multiple cookies.
     */
    cookieLine: string;
    /**
     * The cookie object which represents the cookie which was not stored. It is optional because
     * sometimes complete cookie information is not available, such as in the case of parsing
     * errors.
     */
    cookie?: Cookie;
}

/**
 * A cookie with was not sent with a request with the corresponding reason.
 */
export type BlockedCookieWithReason = {
    /**
     * The reason(s) the cookie was blocked.
     */
    blockedReasons: CookieBlockedReason[];
    /**
     * The cookie object representing the cookie which was not sent.
     */
    cookie: Cookie;
}

/**
 * Cookie parameter object
 */
export type CookieParam = {
    /**
     * Cookie name.
     */
    name: string;
    /**
     * Cookie value.
     */
    value: string;
    /**
     * The request-URI to associate with the setting of the cookie. This value can affect the
     * default domain, path, source port, and source scheme values of the created cookie.
     */
    url?: string;
    /**
     * Cookie domain.
     */
    domain?: string;
    /**
     * Cookie path.
     */
    path?: string;
    /**
     * True if cookie is secure.
     */
    secure?: boolean;
    /**
     * True if cookie is http-only.
     */
    httpOnly?: boolean;
    /**
     * Cookie SameSite type.
     */
    sameSite?: CookieSameSite;
    /**
     * Cookie expiration date, session cookie if not set
     */
    expires?: TimeSinceEpoch;
    /**
     * Cookie Priority.
     */
    priority?: CookiePriority;
    /**
     * True if cookie is SameParty.
     */
    sameParty?: boolean;
    /**
     * Cookie source scheme type.
     */
    sourceScheme?: CookieSourceScheme;
    /**
     * Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
     * An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
     * This is a temporary ability and it will be removed in the future.
     */
    sourcePort?: integer;
    /**
     * Cookie partition key. The site of the top-level URL the browser was visiting at the start
     * of the request to the endpoint that set the cookie.
     * If not set, the cookie will be set as not partitioned.
     */
    partitionKey?: string;
}

export const enum AuthChallengeSource {
    Server = "Server",
    Proxy = "Proxy",
}

/**
 * Authorization challenge for HTTP status code 401 or 407.
 */
export type AuthChallenge = {
    /**
     * Source of the authentication challenge. (AuthChallengeSource enum)
     */
    source?: ("Server" | "Proxy");
    /**
     * Origin of the challenger.
     */
    origin: string;
    /**
     * The authentication scheme used, such as basic or digest
     */
    scheme: string;
    /**
     * The realm of the challenge. May be empty.
     */
    realm: string;
}

export const enum AuthChallengeResponseResponse {
    Default = "Default",
    CancelAuth = "CancelAuth",
    ProvideCredentials = "ProvideCredentials",
}

/**
 * Response to an AuthChallenge.
 */
export type AuthChallengeResponse = {
    /**
     * The decision on what to do in response to the authorization challenge.  Default means
     * deferring to the default behavior of the net stack, which will likely either the Cancel
     * authentication or display a popup dialog box. (AuthChallengeResponseResponse enum)
     */
    response: ("Default" | "CancelAuth" | "ProvideCredentials");
    /**
     * The username to provide, possibly empty. Should only be set if response is
     * ProvideCredentials.
     */
    username?: string;
    /**
     * The password to provide, possibly empty. Should only be set if response is
     * ProvideCredentials.
     */
    password?: string;
}

/**
 * Stages of the interception to begin intercepting. Request will intercept before the request is
 * sent. Response will intercept after the response is received.
 */
export type InterceptionStage = ("Request" | "HeadersReceived");

/**
 * Request pattern for interception.
 */
export type RequestPattern = {
    /**
     * Wildcards (`'*'` -> zero or more, `'?'` -> exactly one) are allowed. Escape character is
     * backslash. Omitting is equivalent to `"*"`.
     */
    urlPattern?: string;
    /**
     * If set, only requests for matching resource types will be intercepted.
     */
    resourceType?: ResourceType;
    /**
     * Stage at which to begin intercepting requests. Default is Request.
     */
    interceptionStage?: InterceptionStage;
}

/**
 * Information about a signed exchange signature.
 * https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#rfc.section.3.1
 */
export type SignedExchangeSignature = {
    /**
     * Signed exchange signature label.
     */
    label: string;
    /**
     * The hex string of signed exchange signature.
     */
    signature: string;
    /**
     * Signed exchange signature integrity.
     */
    integrity: string;
    /**
     * Signed exchange signature cert Url.
     */
    certUrl?: string;
    /**
     * The hex string of signed exchange signature cert sha256.
     */
    certSha256?: string;
    /**
     * Signed exchange signature validity Url.
     */
    validityUrl: string;
    /**
     * Signed exchange signature date.
     */
    date: integer;
    /**
     * Signed exchange signature expires.
     */
    expires: integer;
    /**
     * The encoded certificates.
     */
    certificates?: string[];
}

/**
 * Information about a signed exchange header.
 * https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#cbor-representation
 */
export type SignedExchangeHeader = {
    /**
     * Signed exchange request URL.
     */
    requestUrl: string;
    /**
     * Signed exchange response code.
     */
    responseCode: integer;
    /**
     * Signed exchange response headers.
     */
    responseHeaders: Headers;
    /**
     * Signed exchange response signature.
     */
    signatures: SignedExchangeSignature[];
    /**
     * Signed exchange header integrity hash in the form of "sha256-<base64-hash-value>".
     */
    headerIntegrity: string;
}

/**
 * Field type for a signed exchange related error.
 */
export type SignedExchangeErrorField = ("signatureSig" | "signatureIntegrity" | "signatureCertUrl" | "signatureCertSha256" | "signatureValidityUrl" | "signatureTimestamps");

/**
 * Information about a signed exchange response.
 */
export type SignedExchangeError = {
    /**
     * Error message.
     */
    message: string;
    /**
     * The index of the signature which caused the error.
     */
    signatureIndex?: integer;
    /**
     * The field which caused the error.
     */
    errorField?: SignedExchangeErrorField;
}

/**
 * Information about a signed exchange response.
 */
export type SignedExchangeInfo = {
    /**
     * The outer response of signed HTTP exchange which was received from network.
     */
    outerResponse: Response;
    /**
     * Information about the signed exchange header.
     */
    header?: SignedExchangeHeader;
    /**
     * Security details for the signed exchange header.
     */
    securityDetails?: SecurityDetails;
    /**
     * Errors occurred while handling the signed exchagne.
     */
    errors?: SignedExchangeError[];
}

/**
 * List of content encodings supported by the backend.
 */
export type ContentEncoding = ("deflate" | "gzip" | "br");

export type PrivateNetworkRequestPolicy = ("Allow" | "BlockFromInsecureToMorePrivate" | "WarnFromInsecureToMorePrivate" | "PreflightBlock" | "PreflightWarn");

export type IPAddressSpace = ("Local" | "Private" | "Public" | "Unknown");

export type ConnectTiming = {
    /**
     * Timing's requestTime is a baseline in seconds, while the other numbers are ticks in
     * milliseconds relatively to this requestTime. Matches ResourceTiming's requestTime for
     * the same request (but not for redirected requests).
     */
    requestTime: number;
}

export type ClientSecurityState = {
    initiatorIsSecureContext: boolean;
    initiatorIPAddressSpace: IPAddressSpace;
    privateNetworkRequestPolicy: PrivateNetworkRequestPolicy;
}

export type CrossOriginOpenerPolicyValue = ("SameOrigin" | "SameOriginAllowPopups" | "UnsafeNone" | "SameOriginPlusCoep" | "SameOriginAllowPopupsPlusCoep");

export type CrossOriginOpenerPolicyStatus = {
    value: CrossOriginOpenerPolicyValue;
    reportOnlyValue: CrossOriginOpenerPolicyValue;
    reportingEndpoint?: string;
    reportOnlyReportingEndpoint?: string;
}

export type CrossOriginEmbedderPolicyValue = ("None" | "Credentialless" | "RequireCorp");

export type CrossOriginEmbedderPolicyStatus = {
    value: CrossOriginEmbedderPolicyValue;
    reportOnlyValue: CrossOriginEmbedderPolicyValue;
    reportingEndpoint?: string;
    reportOnlyReportingEndpoint?: string;
}

export type SecurityIsolationStatus = {
    coop?: CrossOriginOpenerPolicyStatus;
    coep?: CrossOriginEmbedderPolicyStatus;
}

/**
 * The status of a Reporting API report.
 */
export type ReportStatus = ("Queued" | "Pending" | "MarkedForRemoval" | "Success");

export type ReportId = string;

/**
 * An object representing a report generated by the Reporting API.
 */
export type ReportingApiReport = {
    id: ReportId;
    /**
     * The URL of the document that triggered the report.
     */
    initiatorUrl: string;
    /**
     * The name of the endpoint group that should be used to deliver the report.
     */
    destination: string;
    /**
     * The type of the report (specifies the set of data that is contained in the report body).
     */
    type: string;
    /**
     * When the report was generated.
     */
    timestamp: Network.TimeSinceEpoch;
    /**
     * How many uploads deep the related request was.
     */
    depth: integer;
    /**
     * The number of delivery attempts made so far, not including an active attempt.
     */
    completedAttempts: integer;
    body: any;
    status: ReportStatus;
}

export type ReportingApiEndpoint = {
    /**
     * The URL of the endpoint to which reports may be delivered.
     */
    url: string;
    /**
     * Name of the endpoint group.
     */
    groupName: string;
}

/**
 * An object providing the result of a network resource load.
 */
export type LoadNetworkResourcePageResult = {
    success: boolean;
    /**
     * Optional values used for error reporting.
     */
    netError?: number;
    netErrorName?: string;
    httpStatusCode?: number;
    /**
     * If successful, one of the following two fields holds the result.
     */
    stream?: IO.StreamHandle;
    /**
     * Response headers.
     */
    headers?: Network.Headers;
}

/**
 * An options object that may be extended later to better support CORS,
 * CORB and streaming.
 */
export type LoadNetworkResourceOptions = {
    disableCache: boolean;
    includeCredentials: boolean;
}

export type SetAcceptedEncodingsRequest = {
    /**
     * List of accepted content encodings.
     */
    encodings: ContentEncoding[];
}

export type CanClearBrowserCacheResponse = {
    /**
     * True if browser cache can be cleared.
     */
    result: boolean;
}

export type CanClearBrowserCookiesResponse = {
    /**
     * True if browser cookies can be cleared.
     */
    result: boolean;
}

export type CanEmulateNetworkConditionsResponse = {
    /**
     * True if emulation of network conditions is supported.
     */
    result: boolean;
}

export type ContinueInterceptedRequestRequest = {
    interceptionId: InterceptionId;
    /**
     * If set this causes the request to fail with the given reason. Passing `Aborted` for requests
     * marked with `isNavigationRequest` also cancels the navigation. Must not be set in response
     * to an authChallenge.
     */
    errorReason?: ErrorReason;
    /**
     * If set the requests completes using with the provided base64 encoded raw response, including
     * HTTP status line and headers etc... Must not be set in response to an authChallenge. (Encoded as a base64 string when passed over JSON)
     */
    rawResponse?: string;
    /**
     * If set the request url will be modified in a way that's not observable by page. Must not be
     * set in response to an authChallenge.
     */
    url?: string;
    /**
     * If set this allows the request method to be overridden. Must not be set in response to an
     * authChallenge.
     */
    method?: string;
    /**
     * If set this allows postData to be set. Must not be set in response to an authChallenge.
     */
    postData?: string;
    /**
     * If set this allows the request headers to be changed. Must not be set in response to an
     * authChallenge.
     */
    headers?: Headers;
    /**
     * Response to a requestIntercepted with an authChallenge. Must not be set otherwise.
     */
    authChallengeResponse?: AuthChallengeResponse;
}

export type DeleteCookiesRequest = {
    /**
     * Name of the cookies to remove.
     */
    name: string;
    /**
     * If specified, deletes all the cookies with the given name where domain and path match
     * provided URL.
     */
    url?: string;
    /**
     * If specified, deletes only cookies with the exact domain.
     */
    domain?: string;
    /**
     * If specified, deletes only cookies with the exact path.
     */
    path?: string;
}

export type EmulateNetworkConditionsRequest = {
    /**
     * True to emulate internet disconnection.
     */
    offline: boolean;
    /**
     * Minimum latency from request sent to response headers received (ms).
     */
    latency: number;
    /**
     * Maximal aggregated download throughput (bytes/sec). -1 disables download throttling.
     */
    downloadThroughput: number;
    /**
     * Maximal aggregated upload throughput (bytes/sec).  -1 disables upload throttling.
     */
    uploadThroughput: number;
    /**
     * Connection type if known.
     */
    connectionType?: ConnectionType;
}

export type EnableRequest = {
    /**
     * Buffer size in bytes to use when preserving network payloads (XHRs, etc).
     */
    maxTotalBufferSize?: integer;
    /**
     * Per-resource buffer size in bytes to use when preserving network payloads (XHRs, etc).
     */
    maxResourceBufferSize?: integer;
    /**
     * Longest post body size (in bytes) that would be included in requestWillBeSent notification
     */
    maxPostDataSize?: integer;
}

export type GetAllCookiesResponse = {
    /**
     * Array of cookie objects.
     */
    cookies: Cookie[];
}

export type GetCertificateRequest = {
    /**
     * Origin to get certificate for.
     */
    origin: string;
}

export type GetCertificateResponse = {
    tableNames: string[];
}

export type GetCookiesRequest = {
    /**
     * The list of URLs for which applicable cookies will be fetched.
     * If not specified, it's assumed to be set to the list containing
     * the URLs of the page and all of its subframes.
     */
    urls?: string[];
}

export type GetCookiesResponse = {
    /**
     * Array of cookie objects.
     */
    cookies: Cookie[];
}

export type GetResponseBodyRequest = {
    /**
     * Identifier of the network request to get content for.
     */
    requestId: RequestId;
}

export type GetResponseBodyResponse = {
    /**
     * Response body.
     */
    body: string;
    /**
     * True, if content was sent as base64.
     */
    base64Encoded: boolean;
}

export type GetRequestPostDataRequest = {
    /**
     * Identifier of the network request to get content for.
     */
    requestId: RequestId;
}

export type GetRequestPostDataResponse = {
    /**
     * Request body string, omitting files from multipart requests
     */
    postData: string;
}

export type GetResponseBodyForInterceptionRequest = {
    /**
     * Identifier for the intercepted request to get body for.
     */
    interceptionId: InterceptionId;
}

export type GetResponseBodyForInterceptionResponse = {
    /**
     * Response body.
     */
    body: string;
    /**
     * True, if content was sent as base64.
     */
    base64Encoded: boolean;
}

export type TakeResponseBodyForInterceptionAsStreamRequest = {
    interceptionId: InterceptionId;
}

export type TakeResponseBodyForInterceptionAsStreamResponse = {
    stream: IO.StreamHandle;
}

export type ReplayXHRRequest = {
    /**
     * Identifier of XHR to replay.
     */
    requestId: RequestId;
}

export type SearchInResponseBodyRequest = {
    /**
     * Identifier of the network response to search.
     */
    requestId: RequestId;
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

export type SearchInResponseBodyResponse = {
    /**
     * List of search matches.
     */
    result: Debugger.SearchMatch[];
}

export type SetBlockedURLsRequest = {
    /**
     * URL patterns to block. Wildcards ('*') are allowed.
     */
    urls: string[];
}

export type SetBypassServiceWorkerRequest = {
    /**
     * Bypass service worker and load from network.
     */
    bypass: boolean;
}

export type SetCacheDisabledRequest = {
    /**
     * Cache disabled state.
     */
    cacheDisabled: boolean;
}

export type SetCookieRequest = {
    /**
     * Cookie name.
     */
    name: string;
    /**
     * Cookie value.
     */
    value: string;
    /**
     * The request-URI to associate with the setting of the cookie. This value can affect the
     * default domain, path, source port, and source scheme values of the created cookie.
     */
    url?: string;
    /**
     * Cookie domain.
     */
    domain?: string;
    /**
     * Cookie path.
     */
    path?: string;
    /**
     * True if cookie is secure.
     */
    secure?: boolean;
    /**
     * True if cookie is http-only.
     */
    httpOnly?: boolean;
    /**
     * Cookie SameSite type.
     */
    sameSite?: CookieSameSite;
    /**
     * Cookie expiration date, session cookie if not set
     */
    expires?: TimeSinceEpoch;
    /**
     * Cookie Priority type.
     */
    priority?: CookiePriority;
    /**
     * True if cookie is SameParty.
     */
    sameParty?: boolean;
    /**
     * Cookie source scheme type.
     */
    sourceScheme?: CookieSourceScheme;
    /**
     * Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
     * An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
     * This is a temporary ability and it will be removed in the future.
     */
    sourcePort?: integer;
    /**
     * Cookie partition key. The site of the top-level URL the browser was visiting at the start
     * of the request to the endpoint that set the cookie.
     * If not set, the cookie will be set as not partitioned.
     */
    partitionKey?: string;
}

export type SetCookieResponse = {
    /**
     * Always set to true. If an error occurs, the response indicates protocol error.
     */
    success: boolean;
}

export type SetCookiesRequest = {
    /**
     * Cookies to be set.
     */
    cookies: CookieParam[];
}

export type SetExtraHTTPHeadersRequest = {
    /**
     * Map with extra HTTP headers.
     */
    headers: Headers;
}

export type SetAttachDebugStackRequest = {
    /**
     * Whether to attach a page script stack for debugging purpose.
     */
    enabled: boolean;
}

export type SetRequestInterceptionRequest = {
    /**
     * Requests matching any of these patterns will be forwarded and wait for the corresponding
     * continueInterceptedRequest call.
     */
    patterns: RequestPattern[];
}

export type SetUserAgentOverrideRequest = {
    /**
     * User agent to use.
     */
    userAgent: string;
    /**
     * Browser langugage to emulate.
     */
    acceptLanguage?: string;
    /**
     * The platform navigator.platform should return.
     */
    platform?: string;
    /**
     * To be sent in Sec-CH-UA-* headers and returned in navigator.userAgentData
     */
    userAgentMetadata?: Emulation.UserAgentMetadata;
}

export type GetSecurityIsolationStatusRequest = {
    /**
     * If no frameId is provided, the status of the target is provided.
     */
    frameId?: Page.FrameId;
}

export type GetSecurityIsolationStatusResponse = {
    status: SecurityIsolationStatus;
}

export type EnableReportingApiRequest = {
    /**
     * Whether to enable or disable events for the Reporting API
     */
    enable: boolean;
}

export type LoadNetworkResourceRequest = {
    /**
     * Frame id to get the resource for. Mandatory for frame targets, and
     * should be omitted for worker targets.
     */
    frameId?: Page.FrameId;
    /**
     * URL of the resource to get content for.
     */
    url: string;
    /**
     * Options for the request.
     */
    options: LoadNetworkResourceOptions;
}

export type LoadNetworkResourceResponse = {
    resource: LoadNetworkResourcePageResult;
}

/**
 * Fired when data chunk was received over the network.
 */
export type DataReceivedEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * Data chunk length.
     */
    dataLength: integer;
    /**
     * Actual bytes received (might be less than dataLength for compressed encodings).
     */
    encodedDataLength: integer;
}

/**
 * Fired when EventSource message is received.
 */
export type EventSourceMessageReceivedEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * Message type.
     */
    eventName: string;
    /**
     * Message identifier.
     */
    eventId: string;
    /**
     * Message content.
     */
    data: string;
}

/**
 * Fired when HTTP request has failed to load.
 */
export type LoadingFailedEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * Resource type.
     */
    type: ResourceType;
    /**
     * User friendly error message.
     */
    errorText: string;
    /**
     * True if loading was canceled.
     */
    canceled?: boolean;
    /**
     * The reason why loading was blocked, if any.
     */
    blockedReason?: BlockedReason;
    /**
     * The reason why loading was blocked by CORS, if any.
     */
    corsErrorStatus?: CorsErrorStatus;
}

/**
 * Fired when HTTP request has finished loading.
 */
export type LoadingFinishedEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * Total number of bytes received for this request.
     */
    encodedDataLength: number;
    /**
     * Set when 1) response was blocked by Cross-Origin Read Blocking and also
     * 2) this needs to be reported to the DevTools console.
     */
    shouldReportCorbBlocking?: boolean;
}

/**
 * Details of an intercepted HTTP request, which must be either allowed, blocked, modified or
 * mocked.
 * Deprecated, use Fetch.requestPaused instead.
 */
export type RequestInterceptedEvent = {
    /**
     * Each request the page makes will have a unique id, however if any redirects are encountered
     * while processing that fetch, they will be reported with the same id as the original fetch.
     * Likewise if HTTP authentication is needed then the same fetch id will be used.
     */
    interceptionId: InterceptionId;
    request: Request;
    /**
     * The id of the frame that initiated the request.
     */
    frameId: Page.FrameId;
    /**
     * How the requested resource will be used.
     */
    resourceType: ResourceType;
    /**
     * Whether this is a navigation request, which can abort the navigation completely.
     */
    isNavigationRequest: boolean;
    /**
     * Set if the request is a navigation that will result in a download.
     * Only present after response is received from the server (i.e. HeadersReceived stage).
     */
    isDownload?: boolean;
    /**
     * Redirect location, only sent if a redirect was intercepted.
     */
    redirectUrl?: string;
    /**
     * Details of the Authorization Challenge encountered. If this is set then
     * continueInterceptedRequest must contain an authChallengeResponse.
     */
    authChallenge?: AuthChallenge;
    /**
     * Response error if intercepted at response stage or if redirect occurred while intercepting
     * request.
     */
    responseErrorReason?: ErrorReason;
    /**
     * Response code if intercepted at response stage or if redirect occurred while intercepting
     * request or auth retry occurred.
     */
    responseStatusCode?: integer;
    /**
     * Response headers if intercepted at the response stage or if redirect occurred while
     * intercepting request or auth retry occurred.
     */
    responseHeaders?: Headers;
    /**
     * If the intercepted request had a corresponding requestWillBeSent event fired for it, then
     * this requestId will be the same as the requestId present in the requestWillBeSent event.
     */
    requestId?: RequestId;
}

/**
 * Fired if request ended up loading from cache.
 */
export type RequestServedFromCacheEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
}

/**
 * Fired when page is about to send HTTP request.
 */
export type RequestWillBeSentEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Loader identifier. Empty string if the request is fetched from worker.
     */
    loaderId: LoaderId;
    /**
     * URL of the document this request is loaded for.
     */
    documentURL: string;
    /**
     * Request data.
     */
    request: Request;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * Timestamp.
     */
    wallTime: TimeSinceEpoch;
    /**
     * Request initiator.
     */
    initiator: Initiator;
    /**
     * In the case that redirectResponse is populated, this flag indicates whether
     * requestWillBeSentExtraInfo and responseReceivedExtraInfo events will be or were emitted
     * for the request which was just redirected.
     */
    redirectHasExtraInfo: boolean;
    /**
     * Redirect response data.
     */
    redirectResponse?: Response;
    /**
     * Type of this resource.
     */
    type?: ResourceType;
    /**
     * Frame identifier.
     */
    frameId?: Page.FrameId;
    /**
     * Whether the request is initiated by a user gesture. Defaults to false.
     */
    hasUserGesture?: boolean;
}

/**
 * Fired when resource loading priority is changed
 */
export type ResourceChangedPriorityEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * New priority
     */
    newPriority: ResourcePriority;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
}

/**
 * Fired when a signed exchange was received over the network
 */
export type SignedExchangeReceivedEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Information about the signed exchange response.
     */
    info: SignedExchangeInfo;
}

/**
 * Fired when HTTP response is available.
 */
export type ResponseReceivedEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Loader identifier. Empty string if the request is fetched from worker.
     */
    loaderId: LoaderId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * Resource type.
     */
    type: ResourceType;
    /**
     * Response data.
     */
    response: Response;
    /**
     * Indicates whether requestWillBeSentExtraInfo and responseReceivedExtraInfo events will be
     * or were emitted for this request.
     */
    hasExtraInfo: boolean;
    /**
     * Frame identifier.
     */
    frameId?: Page.FrameId;
}

/**
 * Fired when WebSocket is closed.
 */
export type WebSocketClosedEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
}

/**
 * Fired upon WebSocket creation.
 */
export type WebSocketCreatedEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * WebSocket request URL.
     */
    url: string;
    /**
     * Request initiator.
     */
    initiator?: Initiator;
}

/**
 * Fired when WebSocket message error occurs.
 */
export type WebSocketFrameErrorEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * WebSocket error message.
     */
    errorMessage: string;
}

/**
 * Fired when WebSocket message is received.
 */
export type WebSocketFrameReceivedEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * WebSocket response data.
     */
    response: WebSocketFrame;
}

/**
 * Fired when WebSocket message is sent.
 */
export type WebSocketFrameSentEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * WebSocket response data.
     */
    response: WebSocketFrame;
}

/**
 * Fired when WebSocket handshake response becomes available.
 */
export type WebSocketHandshakeResponseReceivedEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * WebSocket response data.
     */
    response: WebSocketResponse;
}

/**
 * Fired when WebSocket is about to initiate handshake.
 */
export type WebSocketWillSendHandshakeRequestEvent = {
    /**
     * Request identifier.
     */
    requestId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * UTC Timestamp.
     */
    wallTime: TimeSinceEpoch;
    /**
     * WebSocket request data.
     */
    request: WebSocketRequest;
}

/**
 * Fired upon WebTransport creation.
 */
export type WebTransportCreatedEvent = {
    /**
     * WebTransport identifier.
     */
    transportId: RequestId;
    /**
     * WebTransport request URL.
     */
    url: string;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
    /**
     * Request initiator.
     */
    initiator?: Initiator;
}

/**
 * Fired when WebTransport handshake is finished.
 */
export type WebTransportConnectionEstablishedEvent = {
    /**
     * WebTransport identifier.
     */
    transportId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
}

/**
 * Fired when WebTransport is disposed.
 */
export type WebTransportClosedEvent = {
    /**
     * WebTransport identifier.
     */
    transportId: RequestId;
    /**
     * Timestamp.
     */
    timestamp: MonotonicTime;
}

/**
 * Fired when additional information about a requestWillBeSent event is available from the
 * network stack. Not every requestWillBeSent event will have an additional
 * requestWillBeSentExtraInfo fired for it, and there is no guarantee whether requestWillBeSent
 * or requestWillBeSentExtraInfo will be fired first for the same request.
 */
export type RequestWillBeSentExtraInfoEvent = {
    /**
     * Request identifier. Used to match this information to an existing requestWillBeSent event.
     */
    requestId: RequestId;
    /**
     * A list of cookies potentially associated to the requested URL. This includes both cookies sent with
     * the request and the ones not sent; the latter are distinguished by having blockedReason field set.
     */
    associatedCookies: BlockedCookieWithReason[];
    /**
     * Raw request headers as they will be sent over the wire.
     */
    headers: Headers;
    /**
     * Connection timing information for the request.
     */
    connectTiming: ConnectTiming;
    /**
     * The client security state set for the request.
     */
    clientSecurityState?: ClientSecurityState;
}

/**
 * Fired when additional information about a responseReceived event is available from the network
 * stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
 * it, and responseReceivedExtraInfo may be fired before or after responseReceived.
 */
export type ResponseReceivedExtraInfoEvent = {
    /**
     * Request identifier. Used to match this information to another responseReceived event.
     */
    requestId: RequestId;
    /**
     * A list of cookies which were not stored from the response along with the corresponding
     * reasons for blocking. The cookies here may not be valid due to syntax errors, which
     * are represented by the invalid cookie line string instead of a proper cookie.
     */
    blockedCookies: BlockedSetCookieWithReason[];
    /**
     * Raw response headers as they were received over the wire.
     */
    headers: Headers;
    /**
     * The IP address space of the resource. The address space can only be determined once the transport
     * established the connection, so we can't send it in `requestWillBeSentExtraInfo`.
     */
    resourceIPAddressSpace: IPAddressSpace;
    /**
     * The status code of the response. This is useful in cases the request failed and no responseReceived
     * event is triggered, which is the case for, e.g., CORS errors. This is also the correct status code
     * for cached requests, where the status in responseReceived is a 200 and this will be 304.
     */
    statusCode: integer;
    /**
     * Raw response header text as it was received over the wire. The raw text may not always be
     * available, such as in the case of HTTP/2 or QUIC.
     */
    headersText?: string;
}

export const enum TrustTokenOperationDoneEventStatus {
    Ok = "Ok",
    InvalidArgument = "InvalidArgument",
    FailedPrecondition = "FailedPrecondition",
    ResourceExhausted = "ResourceExhausted",
    AlreadyExists = "AlreadyExists",
    Unavailable = "Unavailable",
    BadResponse = "BadResponse",
    InternalError = "InternalError",
    UnknownError = "UnknownError",
    FulfilledLocally = "FulfilledLocally",
}

/**
 * Fired exactly once for each Trust Token operation. Depending on
 * the type of the operation and whether the operation succeeded or
 * failed, the event is fired before the corresponding request was sent
 * or after the response was received.
 */
export type TrustTokenOperationDoneEvent = {
    /**
     * Detailed success or error status of the operation.
     * 'AlreadyExists' also signifies a successful operation, as the result
     * of the operation already exists und thus, the operation was abort
     * preemptively (e.g. a cache hit). (TrustTokenOperationDoneEventStatus enum)
     */
    status: ("Ok" | "InvalidArgument" | "FailedPrecondition" | "ResourceExhausted" | "AlreadyExists" | "Unavailable" | "BadResponse" | "InternalError" | "UnknownError" | "FulfilledLocally");
    type: TrustTokenOperationType;
    requestId: RequestId;
    /**
     * Top level origin. The context in which the operation was attempted.
     */
    topLevelOrigin?: string;
    /**
     * Origin of the issuer in case of a "Issuance" or "Redemption" operation.
     */
    issuerOrigin?: string;
    /**
     * The number of obtained Trust Tokens on a successful "Issuance" operation.
     */
    issuedTokenCount?: integer;
}

/**
 * Fired once when parsing the .wbn file has succeeded.
 * The event contains the information about the web bundle contents.
 */
export type SubresourceWebBundleMetadataReceivedEvent = {
    /**
     * Request identifier. Used to match this information to another event.
     */
    requestId: RequestId;
    /**
     * A list of URLs of resources in the subresource Web Bundle.
     */
    urls: string[];
}

/**
 * Fired once when parsing the .wbn file has failed.
 */
export type SubresourceWebBundleMetadataErrorEvent = {
    /**
     * Request identifier. Used to match this information to another event.
     */
    requestId: RequestId;
    /**
     * Error message
     */
    errorMessage: string;
}

/**
 * Fired when handling requests for resources within a .wbn file.
 * Note: this will only be fired for resources that are requested by the webpage.
 */
export type SubresourceWebBundleInnerResponseParsedEvent = {
    /**
     * Request identifier of the subresource request
     */
    innerRequestId: RequestId;
    /**
     * URL of the subresource resource.
     */
    innerRequestURL: string;
    /**
     * Bundle request identifier. Used to match this information to another event.
     * This made be absent in case when the instrumentation was enabled only
     * after webbundle was parsed.
     */
    bundleRequestId?: RequestId;
}

/**
 * Fired when request for resources within a .wbn file failed.
 */
export type SubresourceWebBundleInnerResponseErrorEvent = {
    /**
     * Request identifier of the subresource request
     */
    innerRequestId: RequestId;
    /**
     * URL of the subresource resource.
     */
    innerRequestURL: string;
    /**
     * Error message
     */
    errorMessage: string;
    /**
     * Bundle request identifier. Used to match this information to another event.
     * This made be absent in case when the instrumentation was enabled only
     * after webbundle was parsed.
     */
    bundleRequestId?: RequestId;
}

/**
 * Is sent whenever a new report is added.
 * And after 'enableReportingApi' for all existing reports.
 */
export type ReportingApiReportAddedEvent = {
    report: ReportingApiReport;
}

export type ReportingApiReportUpdatedEvent = {
    report: ReportingApiReport;
}

export type ReportingApiEndpointsChangedForOriginEvent = {
    /**
     * Origin of the document(s) which configured the endpoints.
     */
    origin: string;
    endpoints: ReportingApiEndpoint[];
}

