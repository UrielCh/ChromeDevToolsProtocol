import type * as Network from './network.d.ts'

export type integer = number;

/**
 * Security
 */

/**
 * An internal certificate ID value.
 */
export type CertificateId = integer;

/**
 * A description of mixed content (HTTP resources on HTTPS pages), as defined by
 * https://www.w3.org/TR/mixed-content/#categories
 */
export type MixedContentType = ("blockable" | "optionally-blockable" | "none");

/**
 * The security level of a page or resource.
 */
export type SecurityState = ("unknown" | "neutral" | "insecure" | "secure" | "info" | "insecure-broken");

/**
 * Details about the security state of the page certificate.
 */
export type CertificateSecurityState = {
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
     * Page certificate.
     */
    certificate: string[];
    /**
     * Certificate subject name.
     */
    subjectName: string;
    /**
     * Name of the issuing CA.
     */
    issuer: string;
    /**
     * Certificate valid from date.
     */
    validFrom: Network.TimeSinceEpoch;
    /**
     * Certificate valid to (expiration) date
     */
    validTo: Network.TimeSinceEpoch;
    /**
     * The highest priority network error code, if the certificate has an error.
     */
    certificateNetworkError?: string;
    /**
     * True if the certificate uses a weak signature aglorithm.
     */
    certificateHasWeakSignature: boolean;
    /**
     * True if the certificate has a SHA1 signature in the chain.
     */
    certificateHasSha1Signature: boolean;
    /**
     * True if modern SSL
     */
    modernSSL: boolean;
    /**
     * True if the connection is using an obsolete SSL protocol.
     */
    obsoleteSslProtocol: boolean;
    /**
     * True if the connection is using an obsolete SSL key exchange.
     */
    obsoleteSslKeyExchange: boolean;
    /**
     * True if the connection is using an obsolete SSL cipher.
     */
    obsoleteSslCipher: boolean;
    /**
     * True if the connection is using an obsolete SSL signature.
     */
    obsoleteSslSignature: boolean;
}

export type SafetyTipStatus = ("badReputation" | "lookalike");

export type SafetyTipInfo = {
    /**
     * Describes whether the page triggers any safety tips or reputation warnings. Default is unknown.
     */
    safetyTipStatus: SafetyTipStatus;
    /**
     * The URL the safety tip suggested ("Did you mean?"). Only filled in for lookalike matches.
     */
    safeUrl?: string;
}

/**
 * Security state information about the page.
 */
export type VisibleSecurityState = {
    /**
     * The security level of the page.
     */
    securityState: SecurityState;
    /**
     * Security state details about the page certificate.
     */
    certificateSecurityState?: CertificateSecurityState;
    /**
     * The type of Safety Tip triggered on the page. Note that this field will be set even if the Safety Tip UI was not actually shown.
     */
    safetyTipInfo?: SafetyTipInfo;
    /**
     * Array of security state issues ids.
     */
    securityStateIssueIds: string[];
}

/**
 * An explanation of an factor contributing to the security state.
 */
export type SecurityStateExplanation = {
    /**
     * Security state representing the severity of the factor being explained.
     */
    securityState: SecurityState;
    /**
     * Title describing the type of factor.
     */
    title: string;
    /**
     * Short phrase describing the type of factor.
     */
    summary: string;
    /**
     * Full text explanation of the factor.
     */
    description: string;
    /**
     * The type of mixed content described by the explanation.
     */
    mixedContentType: MixedContentType;
    /**
     * Page certificate.
     */
    certificate: string[];
    /**
     * Recommendations to fix any issues.
     */
    recommendations?: string[];
}

/**
 * Information about insecure content on the page.
 */
export type InsecureContentStatus = {
    /**
     * Always false.
     */
    ranMixedContent: boolean;
    /**
     * Always false.
     */
    displayedMixedContent: boolean;
    /**
     * Always false.
     */
    containedMixedForm: boolean;
    /**
     * Always false.
     */
    ranContentWithCertErrors: boolean;
    /**
     * Always false.
     */
    displayedContentWithCertErrors: boolean;
    /**
     * Always set to unknown.
     */
    ranInsecureContentStyle: SecurityState;
    /**
     * Always set to unknown.
     */
    displayedInsecureContentStyle: SecurityState;
}

/**
 * The action to take when a certificate error occurs. continue will continue processing the
 * request and cancel will cancel the request.
 */
export type CertificateErrorAction = ("continue" | "cancel");

export type SetIgnoreCertificateErrorsRequest = {
    /**
     * If true, all certificate errors will be ignored.
     */
    ignore: boolean;
}

export type HandleCertificateErrorRequest = {
    /**
     * The ID of the event.
     */
    eventId: integer;
    /**
     * The action to take on the certificate error.
     */
    action: CertificateErrorAction;
}

export type SetOverrideCertificateErrorsRequest = {
    /**
     * If true, certificate errors will be overridden.
     */
    override: boolean;
}

/**
 * There is a certificate error. If overriding certificate errors is enabled, then it should be
 * handled with the `handleCertificateError` command. Note: this event does not fire if the
 * certificate error has been allowed internally. Only one client per target should override
 * certificate errors at the same time.
 */
export type CertificateErrorEvent = {
    /**
     * The ID of the event.
     */
    eventId: integer;
    /**
     * The type of the error.
     */
    errorType: string;
    /**
     * The url that was requested.
     */
    requestURL: string;
}

/**
 * The security state of the page changed.
 */
export type VisibleSecurityStateChangedEvent = {
    /**
     * Security state information about the page.
     */
    visibleSecurityState: VisibleSecurityState;
}

/**
 * The security state of the page changed. No longer being sent.
 */
export type SecurityStateChangedEvent = {
    /**
     * Security state.
     */
    securityState: SecurityState;
    /**
     * True if the page was loaded over cryptographic transport such as HTTPS.
     */
    schemeIsCryptographic: boolean;
    /**
     * Previously a list of explanations for the security state. Now always
     * empty.
     */
    explanations: SecurityStateExplanation[];
    /**
     * Information about insecure content on the page.
     */
    insecureContentStatus: InsecureContentStatus;
    /**
     * Overrides user-visible description of the state. Always omitted.
     */
    summary?: string;
}

