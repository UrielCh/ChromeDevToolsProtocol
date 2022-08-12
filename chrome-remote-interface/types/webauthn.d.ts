
export type integer = number;

/**
 * This domain allows configuring virtual authenticators to test the WebAuthn
 * API.
 */

export type AuthenticatorId = string;

export type AuthenticatorProtocol = ("u2f" | "ctap2");

export type Ctap2Version = ("ctap2_0" | "ctap2_1");

export type AuthenticatorTransport = ("usb" | "nfc" | "ble" | "cable" | "internal");

export interface VirtualAuthenticatorOptions {
    protocol: AuthenticatorProtocol;
    /**
     * Defaults to ctap2_0. Ignored if |protocol| == u2f.
     */
    ctap2Version?: Ctap2Version;
    transport: AuthenticatorTransport;
    /**
     * Defaults to false.
     */
    hasResidentKey?: boolean;
    /**
     * Defaults to false.
     */
    hasUserVerification?: boolean;
    /**
     * If set to true, the authenticator will support the largeBlob extension.
     * https://w3c.github.io/webauthn#largeBlob
     * Defaults to false.
     */
    hasLargeBlob?: boolean;
    /**
     * If set to true, the authenticator will support the credBlob extension.
     * https://fidoalliance.org/specs/fido-v2.1-rd-20201208/fido-client-to-authenticator-protocol-v2.1-rd-20201208.html#sctn-credBlob-extension
     * Defaults to false.
     */
    hasCredBlob?: boolean;
    /**
     * If set to true, the authenticator will support the minPinLength extension.
     * https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html#sctn-minpinlength-extension
     * Defaults to false.
     */
    hasMinPinLength?: boolean;
    /**
     * If set to true, tests of user presence will succeed immediately.
     * Otherwise, they will not be resolved. Defaults to true.
     */
    automaticPresenceSimulation?: boolean;
    /**
     * Sets whether User Verification succeeds or fails for an authenticator.
     * Defaults to false.
     */
    isUserVerified?: boolean;
}

export interface Credential {
    credentialId: string;
    isResidentCredential: boolean;
    /**
     * Relying Party ID the credential is scoped to. Must be set when adding a
     * credential.
     */
    rpId?: string;
    /**
     * The ECDSA P-256 private key in PKCS#8 format. (Encoded as a base64 string when passed over JSON)
     */
    privateKey: string;
    /**
     * An opaque byte sequence with a maximum size of 64 bytes mapping the
     * credential to a specific user. (Encoded as a base64 string when passed over JSON)
     */
    userHandle?: string;
    /**
     * Signature counter. This is incremented by one for each successful
     * assertion.
     * See https://w3c.github.io/webauthn/#signature-counter
     */
    signCount: integer;
    /**
     * The large blob associated with the credential.
     * See https://w3c.github.io/webauthn/#sctn-large-blob-extension (Encoded as a base64 string when passed over JSON)
     */
    largeBlob?: string;
}

export interface AddVirtualAuthenticatorRequest {
    options: VirtualAuthenticatorOptions;
}

export interface AddVirtualAuthenticatorResponse {
    authenticatorId: AuthenticatorId;
}

export interface RemoveVirtualAuthenticatorRequest {
    authenticatorId: AuthenticatorId;
}

export interface AddCredentialRequest {
    authenticatorId: AuthenticatorId;
    credential: Credential;
}

export interface GetCredentialRequest {
    authenticatorId: AuthenticatorId;
    credentialId: string;
}

export interface GetCredentialResponse {
    credential: Credential;
}

export interface GetCredentialsRequest {
    authenticatorId: AuthenticatorId;
}

export interface GetCredentialsResponse {
    credentials: Credential[];
}

export interface RemoveCredentialRequest {
    authenticatorId: AuthenticatorId;
    credentialId: string;
}

export interface ClearCredentialsRequest {
    authenticatorId: AuthenticatorId;
}

export interface SetUserVerifiedRequest {
    authenticatorId: AuthenticatorId;
    isUserVerified: boolean;
}

export interface SetAutomaticPresenceSimulationRequest {
    authenticatorId: AuthenticatorId;
    enabled: boolean;
}

