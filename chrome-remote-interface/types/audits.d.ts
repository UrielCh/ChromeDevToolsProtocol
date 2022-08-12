import type * as Network from './network.d.ts'
import type * as Page from './page.d.ts'
import type * as Runtime from './runtime.d.ts'
import type * as DOM from './dom.d.ts'

export type integer = number;

/**
 * Audits domain allows investigation of page violations and possible improvements.
 */

/**
 * Information about a cookie that is affected by an inspector issue.
 */
export type AffectedCookie = {
    /**
     * The following three properties uniquely identify a cookie
     */
    name: string;
    path: string;
    domain: string;
}

/**
 * Information about a request that is affected by an inspector issue.
 */
export type AffectedRequest = {
    /**
     * The unique request id.
     */
    requestId: Network.RequestId;
    url?: string;
}

/**
 * Information about the frame affected by an inspector issue.
 */
export type AffectedFrame = {
    frameId: Page.FrameId;
}

export type SameSiteCookieExclusionReason = ("ExcludeSameSiteUnspecifiedTreatedAsLax" | "ExcludeSameSiteNoneInsecure" | "ExcludeSameSiteLax" | "ExcludeSameSiteStrict" | "ExcludeInvalidSameParty" | "ExcludeSamePartyCrossPartyContext");

export type SameSiteCookieWarningReason = ("WarnSameSiteUnspecifiedCrossSiteContext" | "WarnSameSiteNoneInsecure" | "WarnSameSiteUnspecifiedLaxAllowUnsafe" | "WarnSameSiteStrictLaxDowngradeStrict" | "WarnSameSiteStrictCrossDowngradeStrict" | "WarnSameSiteStrictCrossDowngradeLax" | "WarnSameSiteLaxCrossDowngradeStrict" | "WarnSameSiteLaxCrossDowngradeLax");

export type SameSiteCookieOperation = ("SetCookie" | "ReadCookie");

/**
 * This information is currently necessary, as the front-end has a difficult
 * time finding a specific cookie. With this, we can convey specific error
 * information without the cookie.
 */
export type SameSiteCookieIssueDetails = {
    /**
     * If AffectedCookie is not set then rawCookieLine contains the raw
     * Set-Cookie header string. This hints at a problem where the
     * cookie line is syntactically or semantically malformed in a way
     * that no valid cookie could be created.
     */
    cookie?: AffectedCookie;
    rawCookieLine?: string;
    cookieWarningReasons: SameSiteCookieWarningReason[];
    cookieExclusionReasons: SameSiteCookieExclusionReason[];
    /**
     * Optionally identifies the site-for-cookies and the cookie url, which
     * may be used by the front-end as additional context.
     */
    operation: SameSiteCookieOperation;
    siteForCookies?: string;
    cookieUrl?: string;
    request?: AffectedRequest;
}

export type MixedContentResolutionStatus = ("MixedContentBlocked" | "MixedContentAutomaticallyUpgraded" | "MixedContentWarning");

export type MixedContentResourceType = ("Audio" | "Beacon" | "CSPReport" | "Download" | "EventSource" | "Favicon" | "Font" | "Form" | "Frame" | "Image" | "Import" | "Manifest" | "Ping" | "PluginData" | "PluginResource" | "Prefetch" | "Resource" | "Script" | "ServiceWorker" | "SharedWorker" | "Stylesheet" | "Track" | "Video" | "Worker" | "XMLHttpRequest" | "XSLT");

export type MixedContentIssueDetails = {
    /**
     * The type of resource causing the mixed content issue (css, js, iframe,
     * form,...). Marked as optional because it is mapped to from
     * blink::mojom::RequestContextType, which will be replaced
     * by network::mojom::RequestDestination
     */
    resourceType?: MixedContentResourceType;
    /**
     * The way the mixed content issue is being resolved.
     */
    resolutionStatus: MixedContentResolutionStatus;
    /**
     * The unsafe http url causing the mixed content issue.
     */
    insecureURL: string;
    /**
     * The url responsible for the call to an unsafe url.
     */
    mainResourceURL: string;
    /**
     * The mixed content request.
     * Does not always exist (e.g. for unsafe form submission urls).
     */
    request?: AffectedRequest;
    /**
     * Optional because not every mixed content issue is necessarily linked to a frame.
     */
    frame?: AffectedFrame;
}

/**
 * Enum indicating the reason a response has been blocked. These reasons are
 * refinements of the net error BLOCKED_BY_RESPONSE.
 */
export type BlockedByResponseReason = ("CoepFrameResourceNeedsCoepHeader" | "CoopSandboxedIFrameCannotNavigateToCoopPage" | "CorpNotSameOrigin" | "CorpNotSameOriginAfterDefaultedToSameOriginByCoep" | "CorpNotSameSite");

/**
 * Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
 * code. Currently only used for COEP/COOP, but may be extended to include
 * some CSP errors in the future.
 */
export type BlockedByResponseIssueDetails = {
    request: AffectedRequest;
    parentFrame?: AffectedFrame;
    blockedFrame?: AffectedFrame;
    reason: BlockedByResponseReason;
}

export type HeavyAdResolutionStatus = ("HeavyAdBlocked" | "HeavyAdWarning");

export type HeavyAdReason = ("NetworkTotalLimit" | "CpuTotalLimit" | "CpuPeakLimit");

export type HeavyAdIssueDetails = {
    /**
     * The resolution status, either blocking the content or warning.
     */
    resolution: HeavyAdResolutionStatus;
    /**
     * The reason the ad was blocked, total network or cpu or peak cpu.
     */
    reason: HeavyAdReason;
    /**
     * The frame that was blocked.
     */
    frame: AffectedFrame;
}

export type ContentSecurityPolicyViolationType = ("kInlineViolation" | "kEvalViolation" | "kURLViolation" | "kTrustedTypesSinkViolation" | "kTrustedTypesPolicyViolation" | "kWasmEvalViolation");

export type SourceCodeLocation = {
    scriptId?: Runtime.ScriptId;
    url: string;
    lineNumber: integer;
    columnNumber: integer;
}

export type ContentSecurityPolicyIssueDetails = {
    /**
     * The url not included in allowed sources.
     */
    blockedURL?: string;
    /**
     * Specific directive that is violated, causing the CSP issue.
     */
    violatedDirective: string;
    isReportOnly: boolean;
    contentSecurityPolicyViolationType: ContentSecurityPolicyViolationType;
    frameAncestor?: AffectedFrame;
    sourceCodeLocation?: SourceCodeLocation;
    violatingNodeId?: DOM.BackendNodeId;
}

export type SharedArrayBufferIssueType = ("TransferIssue" | "CreationIssue");

/**
 * Details for a issue arising from an SAB being instantiated in, or
 * transferred to a context that is not cross-origin isolated.
 */
export type SharedArrayBufferIssueDetails = {
    sourceCodeLocation: SourceCodeLocation;
    isWarning: boolean;
    type: SharedArrayBufferIssueType;
}

export type TwaQualityEnforcementViolationType = ("kHttpError" | "kUnavailableOffline" | "kDigitalAssetLinks");

export type TrustedWebActivityIssueDetails = {
    /**
     * The url that triggers the violation.
     */
    url: string;
    violationType: TwaQualityEnforcementViolationType;
    httpStatusCode?: integer;
    /**
     * The package name of the Trusted Web Activity client app. This field is
     * only used when violation type is kDigitalAssetLinks.
     */
    packageName?: string;
    /**
     * The signature of the Trusted Web Activity client app. This field is only
     * used when violation type is kDigitalAssetLinks.
     */
    signature?: string;
}

export type LowTextContrastIssueDetails = {
    violatingNodeId: DOM.BackendNodeId;
    violatingNodeSelector: string;
    contrastRatio: number;
    thresholdAA: number;
    thresholdAAA: number;
    fontSize: string;
    fontWeight: string;
}

/**
 * Details for a CORS related issue, e.g. a warning or error related to
 * CORS RFC1918 enforcement.
 */
export type CorsIssueDetails = {
    corsErrorStatus: Network.CorsErrorStatus;
    isWarning: boolean;
    request: AffectedRequest;
    location?: SourceCodeLocation;
    initiatorOrigin?: string;
    resourceIPAddressSpace?: Network.IPAddressSpace;
    clientSecurityState?: Network.ClientSecurityState;
}

export type AttributionReportingIssueType = ("PermissionPolicyDisabled" | "InvalidAttributionSourceEventId" | "InvalidAttributionData" | "AttributionSourceUntrustworthyOrigin" | "AttributionUntrustworthyOrigin" | "AttributionTriggerDataTooLarge" | "AttributionEventSourceTriggerDataTooLarge" | "InvalidAttributionSourceExpiry" | "InvalidAttributionSourcePriority" | "InvalidEventSourceTriggerData" | "InvalidTriggerPriority" | "InvalidTriggerDedupKey");

/**
 * Details for issues around "Attribution Reporting API" usage.
 * Explainer: https://github.com/WICG/conversion-measurement-api
 */
export type AttributionReportingIssueDetails = {
    violationType: AttributionReportingIssueType;
    frame?: AffectedFrame;
    request?: AffectedRequest;
    violatingNodeId?: DOM.BackendNodeId;
    invalidParameter?: string;
}

/**
 * Details for issues about documents in Quirks Mode
 * or Limited Quirks Mode that affects page layouting.
 */
export type QuirksModeIssueDetails = {
    /**
     * If false, it means the document's mode is "quirks"
     * instead of "limited-quirks".
     */
    isLimitedQuirksMode: boolean;
    documentNodeId: DOM.BackendNodeId;
    url: string;
    frameId: Page.FrameId;
    loaderId: Network.LoaderId;
}

export type NavigatorUserAgentIssueDetails = {
    url: string;
    location?: SourceCodeLocation;
}

export type GenericIssueErrorType = ("CrossOriginPortalPostMessageError");

/**
 * Depending on the concrete errorType, different properties are set.
 */
export type GenericIssueDetails = {
    /**
     * Issues with the same errorType are aggregated in the frontend.
     */
    errorType: GenericIssueErrorType;
    frameId?: Page.FrameId;
}

/**
 * This issue tracks information needed to print a deprecation message.
 * The formatting is inherited from the old console.log version, see more at:
 * https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/deprecation.cc
 * TODO(crbug.com/1264960): Re-work format to add i18n support per:
 * https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/public/devtools_protocol/README.md
 */
export type DeprecationIssueDetails = {
    affectedFrame?: AffectedFrame;
    sourceCodeLocation: SourceCodeLocation;
    /**
     * The content of the deprecation issue (this won't be translated),
     * e.g. "window.inefficientLegacyStorageMethod will be removed in M97,
     * around January 2022. Please use Web Storage or Indexed Database
     * instead. This standard was abandoned in January, 1970. See
     * https://www.chromestatus.com/feature/5684870116278272 for more details."
     */
    message?: string;
    deprecationType: string;
}

export type ClientHintIssueReason = ("MetaTagAllowListInvalidOrigin" | "MetaTagModifiedHTML");

export type FederatedAuthRequestIssueDetails = {
    federatedAuthRequestIssueReason: FederatedAuthRequestIssueReason;
}

/**
 * Represents the failure reason when a federated authentication reason fails.
 * Should be updated alongside RequestIdTokenStatus in
 * third_party/blink/public/mojom/webid/federated_auth_request.mojom to include
 * all cases except for success.
 */
export type FederatedAuthRequestIssueReason = ("ApprovalDeclined" | "TooManyRequests" | "WellKnownHttpNotFound" | "WellKnownNoResponse" | "WellKnownInvalidResponse" | "ClientIdMetadataHttpNotFound" | "ClientIdMetadataNoResponse" | "ClientIdMetadataInvalidResponse" | "ErrorFetchingSignin" | "InvalidSigninResponse" | "AccountsHttpNotFound" | "AccountsNoResponse" | "AccountsInvalidResponse" | "IdTokenHttpNotFound" | "IdTokenNoResponse" | "IdTokenInvalidResponse" | "IdTokenInvalidRequest" | "ErrorIdToken" | "Canceled");

/**
 * This issue tracks client hints related issues. It's used to deprecate old
 * features, encourage the use of new ones, and provide general guidance.
 */
export type ClientHintIssueDetails = {
    sourceCodeLocation: SourceCodeLocation;
    clientHintIssueReason: ClientHintIssueReason;
}

/**
 * A unique identifier for the type of issue. Each type may use one of the
 * optional fields in InspectorIssueDetails to convey more specific
 * information about the kind of issue.
 */
export type InspectorIssueCode = ("SameSiteCookieIssue" | "MixedContentIssue" | "BlockedByResponseIssue" | "HeavyAdIssue" | "ContentSecurityPolicyIssue" | "SharedArrayBufferIssue" | "TrustedWebActivityIssue" | "LowTextContrastIssue" | "CorsIssue" | "AttributionReportingIssue" | "QuirksModeIssue" | "NavigatorUserAgentIssue" | "GenericIssue" | "DeprecationIssue" | "ClientHintIssue" | "FederatedAuthRequestIssue");

/**
 * This struct holds a list of optional fields with additional information
 * specific to the kind of issue. When adding a new issue code, please also
 * add a new optional field to this type.
 */
export type InspectorIssueDetails = {
    sameSiteCookieIssueDetails?: SameSiteCookieIssueDetails;
    mixedContentIssueDetails?: MixedContentIssueDetails;
    blockedByResponseIssueDetails?: BlockedByResponseIssueDetails;
    heavyAdIssueDetails?: HeavyAdIssueDetails;
    contentSecurityPolicyIssueDetails?: ContentSecurityPolicyIssueDetails;
    sharedArrayBufferIssueDetails?: SharedArrayBufferIssueDetails;
    twaQualityEnforcementDetails?: TrustedWebActivityIssueDetails;
    lowTextContrastIssueDetails?: LowTextContrastIssueDetails;
    corsIssueDetails?: CorsIssueDetails;
    attributionReportingIssueDetails?: AttributionReportingIssueDetails;
    quirksModeIssueDetails?: QuirksModeIssueDetails;
    navigatorUserAgentIssueDetails?: NavigatorUserAgentIssueDetails;
    genericIssueDetails?: GenericIssueDetails;
    deprecationIssueDetails?: DeprecationIssueDetails;
    clientHintIssueDetails?: ClientHintIssueDetails;
    federatedAuthRequestIssueDetails?: FederatedAuthRequestIssueDetails;
}

/**
 * A unique id for a DevTools inspector issue. Allows other entities (e.g.
 * exceptions, CDP message, console messages, etc.) to reference an issue.
 */
export type IssueId = string;

/**
 * An inspector issue reported from the back-end.
 */
export type InspectorIssue = {
    code: InspectorIssueCode;
    details: InspectorIssueDetails;
    /**
     * A unique id for this issue. May be omitted if no other entity (e.g.
     * exception, CDP message, etc.) is referencing this issue.
     */
    issueId?: IssueId;
}

export const enum GetEncodedResponseRequestEncoding {
    Webp = "webp",
    Jpeg = "jpeg",
    Png = "png",
}

export type GetEncodedResponseRequest = {
    /**
     * Identifier of the network request to get content for.
     */
    requestId: Network.RequestId;
    /**
     * The encoding to use. (GetEncodedResponseRequestEncoding enum)
     */
    encoding: ("webp" | "jpeg" | "png");
    /**
     * The quality of the encoding (0-1). (defaults to 1)
     */
    quality?: number;
    /**
     * Whether to only return the size information (defaults to false).
     */
    sizeOnly?: boolean;
}

export type GetEncodedResponseResponse = {
    /**
     * The encoded body as a base64 string. Omitted if sizeOnly is true. (Encoded as a base64 string when passed over JSON)
     */
    body?: string;
    /**
     * Size before re-encoding.
     */
    originalSize: integer;
    /**
     * Size after re-encoding.
     */
    encodedSize: integer;
}

export type CheckContrastRequest = {
    /**
     * Whether to report WCAG AAA level issues. Default is false.
     */
    reportAAA?: boolean;
}

export type IssueAddedEvent = {
    issue: InspectorIssue;
}

