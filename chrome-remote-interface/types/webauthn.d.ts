
export type integer = number;

/**
 * This domain allows configuring virtual authenticators to test the WebAuthn
 * API.
 */

export type AuthenticatorId = string;

export type AuthenticatorProtocol = ("u2f" | "ctap2");

export type Ctap2Version = ("ctap2_0" | "ctap2_1");

export type AuthenticatorTransport = ("usb" | "nfc" | "ble" | "cable" | "internal");

export type VirtualAuthenticatorOptions = {
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

export type Credential = {
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

export type EnableRequest = {
    /**
     * Whether to enable the WebAuthn user interface. Enabling the UI is
     * recommended for debugging and demo purposes, as it is closer to the real
     * experience. Disabling the UI is recommended for automated testing.
     * Supported at the embedder's discretion if UI is available.
     * Defaults to false.
     */
    enableUI?: boolean;
}

export type AddVirtualAuthenticatorRequest = {
    options: VirtualAuthenticatorOptions;
}

export type AddVirtualAuthenticatorResponse = {
    authenticatorId: AuthenticatorId;
}

export type SetResponseOverrideBitsRequest = {
    authenticatorId: AuthenticatorId;
    /**
     * If isBogusSignature is set, overrides the signature in the authenticator response to be zero.
     * Defaults to false.
     */
    isBogusSignature?: boolean;
    /**
     * If isBadUV is set, overrides the UV bit in the flags in the authenticator response to
     * be zero. Defaults to false.
     */
    isBadUV?: boolean;
    /**
     * If isBadUP is set, overrides the UP bit in the flags in the authenticator response to
     * be zero. Defaults to false.
     */
    isBadUP?: boolean;
}

export type RemoveVirtualAuthenticatorRequest = {
    authenticatorId: AuthenticatorId;
}

export type AddCredentialRequest = {
    authenticatorId: AuthenticatorId;
    credential: Credential;
}

export type GetCredentialRequest = {
    authenticatorId: AuthenticatorId;
    credentialId: string;
}

export type GetCredentialResponse = {
    credential: Credential;
}

export type GetCredentialsRequest = {
    authenticatorId: AuthenticatorId;
}

export type GetCredentialsResponse = {
    credentials: Credential[];
}

export type RemoveCredentialRequest = {
    authenticatorId: AuthenticatorId;
    credentialId: string;
}

export type ClearCredentialsRequest = {
    authenticatorId: AuthenticatorId;
}

export type SetUserVerifiedRequest = {
    authenticatorId: AuthenticatorId;
    isUserVerified: boolean;
}

export type SetAutomaticPresenceSimulationRequest = {
    authenticatorId: AuthenticatorId;
    enabled: boolean;
}

/**
 * Triggered when a credential is added to an authenticator.
 */
export type CredentialAddedEvent = {
    authenticatorId: AuthenticatorId;
    credential: Credential;
}

/**
 * Triggered when a credential is used in a webauthn assertion.
 */
export type CredentialAssertedEvent = {
    authenticatorId: AuthenticatorId;
    credential: Credential;
}

