import type * as Network from './network.d.ts'
import type * as IO from './io.d.ts'
import type * as Page from './page.d.ts'

export type integer = number;

/**
 * A domain for letting clients substitute browser's network layer with client code.
 */

/**
 * Unique request identifier.
 */
export type RequestId = string;

/**
 * Stages of the request to handle. Request will intercept before the request is
 * sent. Response will intercept after the response is received (but before response
 * body is received).
 */
export type RequestStage = ("Request" | "Response");

export type RequestPattern = {
    /**
     * Wildcards (`'*'` -> zero or more, `'?'` -> exactly one) are allowed. Escape character is
     * backslash. Omitting is equivalent to `"*"`.
     */
    urlPattern?: string;
    /**
     * If set, only requests for matching resource types will be intercepted.
     */
    resourceType?: Network.ResourceType;
    /**
     * Stage at which to begin intercepting requests. Default is Request.
     */
    requestStage?: RequestStage;
}

/**
 * Response HTTP header entry
 */
export type HeaderEntry = {
    name: string;
    value: string;
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

export type EnableRequest = {
    /**
     * If specified, only requests matching any of these patterns will produce
     * fetchRequested event and will be paused until clients response. If not set,
     * all requests will be affected.
     */
    patterns?: RequestPattern[];
    /**
     * If true, authRequired events will be issued and requests will be paused
     * expecting a call to continueWithAuth.
     */
    handleAuthRequests?: boolean;
}

export type FailRequestRequest = {
    /**
     * An id the client received in requestPaused event.
     */
    requestId: RequestId;
    /**
     * Causes the request to fail with the given reason.
     */
    errorReason: Network.ErrorReason;
}

export type FulfillRequestRequest = {
    /**
     * An id the client received in requestPaused event.
     */
    requestId: RequestId;
    /**
     * An HTTP response code.
     */
    responseCode: integer;
    /**
     * Response headers.
     */
    responseHeaders?: HeaderEntry[];
    /**
     * Alternative way of specifying response headers as a \0-separated
     * series of name: value pairs. Prefer the above method unless you
     * need to represent some non-UTF8 values that can't be transmitted
     * over the protocol as text. (Encoded as a base64 string when passed over JSON)
     */
    binaryResponseHeaders?: string;
    /**
     * A response body. If absent, original response body will be used if
     * the request is intercepted at the response stage and empty body
     * will be used if the request is intercepted at the request stage. (Encoded as a base64 string when passed over JSON)
     */
    body?: string;
    /**
     * A textual representation of responseCode.
     * If absent, a standard phrase matching responseCode is used.
     */
    responsePhrase?: string;
}

export type ContinueRequestRequest = {
    /**
     * An id the client received in requestPaused event.
     */
    requestId: RequestId;
    /**
     * If set, the request url will be modified in a way that's not observable by page.
     */
    url?: string;
    /**
     * If set, the request method is overridden.
     */
    method?: string;
    /**
     * If set, overrides the post data in the request. (Encoded as a base64 string when passed over JSON)
     */
    postData?: string;
    /**
     * If set, overrides the request headers.
     */
    headers?: HeaderEntry[];
    /**
     * If set, overrides response interception behavior for this request.
     */
    interceptResponse?: boolean;
}

export type ContinueWithAuthRequest = {
    /**
     * An id the client received in authRequired event.
     */
    requestId: RequestId;
    /**
     * Response to  with an authChallenge.
     */
    authChallengeResponse: AuthChallengeResponse;
}

export type ContinueResponseRequest = {
    /**
     * An id the client received in requestPaused event.
     */
    requestId: RequestId;
    /**
     * An HTTP response code. If absent, original response code will be used.
     */
    responseCode?: integer;
    /**
     * A textual representation of responseCode.
     * If absent, a standard phrase matching responseCode is used.
     */
    responsePhrase?: string;
    /**
     * Response headers. If absent, original response headers will be used.
     */
    responseHeaders?: HeaderEntry[];
    /**
     * Alternative way of specifying response headers as a \0-separated
     * series of name: value pairs. Prefer the above method unless you
     * need to represent some non-UTF8 values that can't be transmitted
     * over the protocol as text. (Encoded as a base64 string when passed over JSON)
     */
    binaryResponseHeaders?: string;
}

export type GetResponseBodyRequest = {
    /**
     * Identifier for the intercepted request to get body for.
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

export type TakeResponseBodyAsStreamRequest = {
    requestId: RequestId;
}

export type TakeResponseBodyAsStreamResponse = {
    stream: IO.StreamHandle;
}

/**
 * Issued when the domain is enabled and the request URL matches the
 * specified filter. The request is paused until the client responds
 * with one of continueRequest, failRequest or fulfillRequest.
 * The stage of the request can be determined by presence of responseErrorReason
 * and responseStatusCode -- the request is at the response stage if either
 * of these fields is present and in the request stage otherwise.
 */
export type RequestPausedEvent = {
    /**
     * Each request the page makes will have a unique id.
     */
    requestId: RequestId;
    /**
     * The details of the request.
     */
    request: Network.Request;
    /**
     * The id of the frame that initiated the request.
     */
    frameId: Page.FrameId;
    /**
     * How the requested resource will be used.
     */
    resourceType: Network.ResourceType;
    /**
     * Response error if intercepted at response stage.
     */
    responseErrorReason?: Network.ErrorReason;
    /**
     * Response code if intercepted at response stage.
     */
    responseStatusCode?: integer;
    /**
     * Response status text if intercepted at response stage.
     */
    responseStatusText?: string;
    /**
     * Response headers if intercepted at the response stage.
     */
    responseHeaders?: HeaderEntry[];
    /**
     * If the intercepted request had a corresponding Network.requestWillBeSent event fired for it,
     * then this networkId will be the same as the requestId present in the requestWillBeSent event.
     */
    networkId?: RequestId;
}

/**
 * Issued when the domain is enabled with handleAuthRequests set to true.
 * The request is paused until client responds with continueWithAuth.
 */
export type AuthRequiredEvent = {
    /**
     * Each request the page makes will have a unique id.
     */
    requestId: RequestId;
    /**
     * The details of the request.
     */
    request: Network.Request;
    /**
     * The id of the frame that initiated the request.
     */
    frameId: Page.FrameId;
    /**
     * How the requested resource will be used.
     */
    resourceType: Network.ResourceType;
    /**
     * Details of the Authorization Challenge encountered.
     * If this is set, client should respond with continueRequest that
     * contains AuthChallengeResponse.
     */
    authChallenge: AuthChallenge;
}

