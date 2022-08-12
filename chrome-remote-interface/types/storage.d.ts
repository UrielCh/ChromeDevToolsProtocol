import type * as Network from './network.d.ts'
import type * as Browser from './browser.d.ts'

export type integer = number;


/**
 * Enum of possible storage types.
 */
export type StorageType = ("appcache" | "cookies" | "file_systems" | "indexeddb" | "local_storage" | "shader_cache" | "websql" | "service_workers" | "cache_storage" | "interest_groups" | "all" | "other");

/**
 * Usage for a storage type.
 */
export interface UsageForType {
    /**
     * Name of storage type.
     */
    storageType: StorageType;
    /**
     * Storage usage (bytes).
     */
    usage: number;
}

/**
 * Pair of issuer origin and number of available (signed, but not used) Trust
 * Tokens from that issuer.
 */
export interface TrustTokens {
    issuerOrigin: string;
    count: number;
}

/**
 * Enum of interest group access types.
 */
export type InterestGroupAccessType = ("join" | "leave" | "update" | "bid" | "win");

/**
 * Ad advertising element inside an interest group.
 */
export interface InterestGroupAd {
    renderUrl: string;
    metadata?: string;
}

/**
 * The full details of an interest group.
 */
export interface InterestGroupDetails {
    ownerOrigin: string;
    name: string;
    expirationTime: Network.TimeSinceEpoch;
    joiningOrigin: string;
    biddingUrl?: string;
    biddingWasmHelperUrl?: string;
    updateUrl?: string;
    trustedBiddingSignalsUrl?: string;
    trustedBiddingSignalsKeys: string[];
    userBiddingSignals?: string;
    ads: InterestGroupAd[];
    adComponents: InterestGroupAd[];
}

export interface ClearDataForOriginRequest {
    /**
     * Security origin.
     */
    origin: string;
    /**
     * Comma separated list of StorageType to clear.
     */
    storageTypes: string;
}

export interface GetCookiesRequest {
    /**
     * Browser context to use when called on the browser endpoint.
     */
    browserContextId?: Browser.BrowserContextID;
}

export interface GetCookiesResponse {
    /**
     * Array of cookie objects.
     */
    cookies: Network.Cookie[];
}

export interface SetCookiesRequest {
    /**
     * Cookies to be set.
     */
    cookies: Network.CookieParam[];
    /**
     * Browser context to use when called on the browser endpoint.
     */
    browserContextId?: Browser.BrowserContextID;
}

export interface ClearCookiesRequest {
    /**
     * Browser context to use when called on the browser endpoint.
     */
    browserContextId?: Browser.BrowserContextID;
}

export interface GetUsageAndQuotaRequest {
    /**
     * Security origin.
     */
    origin: string;
}

export interface GetUsageAndQuotaResponse {
    /**
     * Storage usage (bytes).
     */
    usage: number;
    /**
     * Storage quota (bytes).
     */
    quota: number;
    /**
     * Whether or not the origin has an active storage quota override
     */
    overrideActive: boolean;
    /**
     * Storage usage per type (bytes).
     */
    usageBreakdown: UsageForType[];
}

export interface OverrideQuotaForOriginRequest {
    /**
     * Security origin.
     */
    origin: string;
    /**
     * The quota size (in bytes) to override the original quota with.
     * If this is called multiple times, the overridden quota will be equal to
     * the quotaSize provided in the final call. If this is called without
     * specifying a quotaSize, the quota will be reset to the default value for
     * the specified origin. If this is called multiple times with different
     * origins, the override will be maintained for each origin until it is
     * disabled (called without a quotaSize).
     */
    quotaSize?: number;
}

export interface TrackCacheStorageForOriginRequest {
    /**
     * Security origin.
     */
    origin: string;
}

export interface TrackIndexedDBForOriginRequest {
    /**
     * Security origin.
     */
    origin: string;
}

export interface UntrackCacheStorageForOriginRequest {
    /**
     * Security origin.
     */
    origin: string;
}

export interface UntrackIndexedDBForOriginRequest {
    /**
     * Security origin.
     */
    origin: string;
}

export interface GetTrustTokensResponse {
    tokens: TrustTokens[];
}

export interface ClearTrustTokensRequest {
    issuerOrigin: string;
}

export interface ClearTrustTokensResponse {
    /**
     * True if any tokens were deleted, false otherwise.
     */
    didDeleteTokens: boolean;
}

export interface GetInterestGroupDetailsRequest {
    ownerOrigin: string;
    name: string;
}

export interface GetInterestGroupDetailsResponse {
    details: InterestGroupDetails;
}

export interface SetInterestGroupTrackingRequest {
    enable: boolean;
}

/**
 * A cache's contents have been modified.
 */
export interface CacheStorageContentUpdatedEvent {
    /**
     * Origin to update.
     */
    origin: string;
    /**
     * Name of cache in origin.
     */
    cacheName: string;
}

/**
 * A cache has been added/deleted.
 */
export interface CacheStorageListUpdatedEvent {
    /**
     * Origin to update.
     */
    origin: string;
}

/**
 * The origin's IndexedDB object store has been modified.
 */
export interface IndexedDBContentUpdatedEvent {
    /**
     * Origin to update.
     */
    origin: string;
    /**
     * Database to update.
     */
    databaseName: string;
    /**
     * ObjectStore to update.
     */
    objectStoreName: string;
}

/**
 * The origin's IndexedDB database list has been modified.
 */
export interface IndexedDBListUpdatedEvent {
    /**
     * Origin to update.
     */
    origin: string;
}

/**
 * One of the interest groups was accessed by the associated page.
 */
export interface InterestGroupAccessedEvent {
    accessTime: Network.TimeSinceEpoch;
    type: InterestGroupAccessType;
    ownerOrigin: string;
    name: string;
}

