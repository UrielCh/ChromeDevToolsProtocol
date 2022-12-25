import type * as Network from './network.d.ts'
import type * as Page from './page.d.ts'
import type * as Browser from './browser.d.ts'

export type integer = number;


export type SerializedStorageKey = string;

/**
 * Enum of possible storage types.
 */
export type StorageType = ("appcache" | "cookies" | "file_systems" | "indexeddb" | "local_storage" | "shader_cache" | "websql" | "service_workers" | "cache_storage" | "interest_groups" | "shared_storage" | "all" | "other");

/**
 * Usage for a storage type.
 */
export type UsageForType = {
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
export type TrustTokens = {
    issuerOrigin: string;
    count: number;
}

/**
 * Enum of interest group access types.
 */
export type InterestGroupAccessType = ("join" | "leave" | "update" | "loaded" | "bid" | "win");

/**
 * Ad advertising element inside an interest group.
 */
export type InterestGroupAd = {
    renderUrl: string;
    metadata?: string;
}

/**
 * The full details of an interest group.
 */
export type InterestGroupDetails = {
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

/**
 * Enum of shared storage access types.
 */
export type SharedStorageAccessType = ("documentAddModule" | "documentSelectURL" | "documentRun" | "documentSet" | "documentAppend" | "documentDelete" | "documentClear" | "workletSet" | "workletAppend" | "workletDelete" | "workletClear" | "workletGet" | "workletKeys" | "workletEntries" | "workletLength" | "workletRemainingBudget");

/**
 * Struct for a single key-value pair in an origin's shared storage.
 */
export type SharedStorageEntry = {
    key: string;
    value: string;
}

/**
 * Details for an origin's shared storage.
 */
export type SharedStorageMetadata = {
    creationTime: Network.TimeSinceEpoch;
    length: integer;
    remainingBudget: number;
}

/**
 * Pair of reporting metadata details for a candidate URL for `selectURL()`.
 */
export type SharedStorageReportingMetadata = {
    eventType: string;
    reportingUrl: string;
}

/**
 * Bundles a candidate URL with its reporting metadata.
 */
export type SharedStorageUrlWithMetadata = {
    /**
     * Spec of candidate URL.
     */
    url: string;
    /**
     * Any associated reporting metadata.
     */
    reportingMetadata: SharedStorageReportingMetadata[];
}

/**
 * Bundles the parameters for shared storage access events whose
 * presence/absence can vary according to SharedStorageAccessType.
 */
export type SharedStorageAccessParams = {
    /**
     * Spec of the module script URL.
     * Present only for SharedStorageAccessType.documentAddModule.
     */
    scriptSourceUrl?: string;
    /**
     * Name of the registered operation to be run.
     * Present only for SharedStorageAccessType.documentRun and
     * SharedStorageAccessType.documentSelectURL.
     */
    operationName?: string;
    /**
     * The operation's serialized data in bytes (converted to a string).
     * Present only for SharedStorageAccessType.documentRun and
     * SharedStorageAccessType.documentSelectURL.
     */
    serializedData?: string;
    /**
     * Array of candidate URLs' specs, along with any associated metadata.
     * Present only for SharedStorageAccessType.documentSelectURL.
     */
    urlsWithMetadata?: SharedStorageUrlWithMetadata[];
    /**
     * Key for a specific entry in an origin's shared storage.
     * Present only for SharedStorageAccessType.documentSet,
     * SharedStorageAccessType.documentAppend,
     * SharedStorageAccessType.documentDelete,
     * SharedStorageAccessType.workletSet,
     * SharedStorageAccessType.workletAppend,
     * SharedStorageAccessType.workletDelete, and
     * SharedStorageAccessType.workletGet.
     */
    key?: string;
    /**
     * Value for a specific entry in an origin's shared storage.
     * Present only for SharedStorageAccessType.documentSet,
     * SharedStorageAccessType.documentAppend,
     * SharedStorageAccessType.workletSet, and
     * SharedStorageAccessType.workletAppend.
     */
    value?: string;
    /**
     * Whether or not to set an entry for a key if that key is already present.
     * Present only for SharedStorageAccessType.documentSet and
     * SharedStorageAccessType.workletSet.
     */
    ignoreIfPresent?: boolean;
}

export type GetStorageKeyForFrameRequest = {
    frameId: Page.FrameId;
}

export type GetStorageKeyForFrameResponse = {
    storageKey: SerializedStorageKey;
}

export type ClearDataForOriginRequest = {
    /**
     * Security origin.
     */
    origin: string;
    /**
     * Comma separated list of StorageType to clear.
     */
    storageTypes: string;
}

export type ClearDataForStorageKeyRequest = {
    /**
     * Storage key.
     */
    storageKey: string;
    /**
     * Comma separated list of StorageType to clear.
     */
    storageTypes: string;
}

export type GetCookiesRequest = {
    /**
     * Browser context to use when called on the browser endpoint.
     */
    browserContextId?: Browser.BrowserContextID;
}

export type GetCookiesResponse = {
    /**
     * Array of cookie objects.
     */
    cookies: Network.Cookie[];
}

export type SetCookiesRequest = {
    /**
     * Cookies to be set.
     */
    cookies: Network.CookieParam[];
    /**
     * Browser context to use when called on the browser endpoint.
     */
    browserContextId?: Browser.BrowserContextID;
}

export type ClearCookiesRequest = {
    /**
     * Browser context to use when called on the browser endpoint.
     */
    browserContextId?: Browser.BrowserContextID;
}

export type GetUsageAndQuotaRequest = {
    /**
     * Security origin.
     */
    origin: string;
}

export type GetUsageAndQuotaResponse = {
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

export type OverrideQuotaForOriginRequest = {
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

export type TrackCacheStorageForOriginRequest = {
    /**
     * Security origin.
     */
    origin: string;
}

export type TrackCacheStorageForStorageKeyRequest = {
    /**
     * Storage key.
     */
    storageKey: string;
}

export type TrackIndexedDBForOriginRequest = {
    /**
     * Security origin.
     */
    origin: string;
}

export type TrackIndexedDBForStorageKeyRequest = {
    /**
     * Storage key.
     */
    storageKey: string;
}

export type UntrackCacheStorageForOriginRequest = {
    /**
     * Security origin.
     */
    origin: string;
}

export type UntrackCacheStorageForStorageKeyRequest = {
    /**
     * Storage key.
     */
    storageKey: string;
}

export type UntrackIndexedDBForOriginRequest = {
    /**
     * Security origin.
     */
    origin: string;
}

export type UntrackIndexedDBForStorageKeyRequest = {
    /**
     * Storage key.
     */
    storageKey: string;
}

export type GetTrustTokensResponse = {
    tokens: TrustTokens[];
}

export type ClearTrustTokensRequest = {
    issuerOrigin: string;
}

export type ClearTrustTokensResponse = {
    /**
     * True if any tokens were deleted, false otherwise.
     */
    didDeleteTokens: boolean;
}

export type GetInterestGroupDetailsRequest = {
    ownerOrigin: string;
    name: string;
}

export type GetInterestGroupDetailsResponse = {
    details: InterestGroupDetails;
}

export type SetInterestGroupTrackingRequest = {
    enable: boolean;
}

export type GetSharedStorageMetadataRequest = {
    ownerOrigin: string;
}

export type GetSharedStorageMetadataResponse = {
    metadata: SharedStorageMetadata;
}

export type GetSharedStorageEntriesRequest = {
    ownerOrigin: string;
}

export type GetSharedStorageEntriesResponse = {
    entries: SharedStorageEntry[];
}

export type SetSharedStorageEntryRequest = {
    ownerOrigin: string;
    key: string;
    value: string;
    /**
     * If `ignoreIfPresent` is included and true, then only sets the entry if
     * `key` doesn't already exist.
     */
    ignoreIfPresent?: boolean;
}

export type DeleteSharedStorageEntryRequest = {
    ownerOrigin: string;
    key: string;
}

export type ClearSharedStorageEntriesRequest = {
    ownerOrigin: string;
}

export type ResetSharedStorageBudgetRequest = {
    ownerOrigin: string;
}

export type SetSharedStorageTrackingRequest = {
    enable: boolean;
}

/**
 * A cache's contents have been modified.
 */
export type CacheStorageContentUpdatedEvent = {
    /**
     * Origin to update.
     */
    origin: string;
    /**
     * Storage key to update.
     */
    storageKey: string;
    /**
     * Name of cache in origin.
     */
    cacheName: string;
}

/**
 * A cache has been added/deleted.
 */
export type CacheStorageListUpdatedEvent = {
    /**
     * Origin to update.
     */
    origin: string;
    /**
     * Storage key to update.
     */
    storageKey: string;
}

/**
 * The origin's IndexedDB object store has been modified.
 */
export type IndexedDBContentUpdatedEvent = {
    /**
     * Origin to update.
     */
    origin: string;
    /**
     * Storage key to update.
     */
    storageKey: string;
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
export type IndexedDBListUpdatedEvent = {
    /**
     * Origin to update.
     */
    origin: string;
    /**
     * Storage key to update.
     */
    storageKey: string;
}

/**
 * One of the interest groups was accessed by the associated page.
 */
export type InterestGroupAccessedEvent = {
    accessTime: Network.TimeSinceEpoch;
    type: InterestGroupAccessType;
    ownerOrigin: string;
    name: string;
}

/**
 * Shared storage was accessed by the associated page.
 * The following parameters are included in all events.
 */
export type SharedStorageAccessedEvent = {
    /**
     * Time of the access.
     */
    accessTime: Network.TimeSinceEpoch;
    /**
     * Enum value indicating the Shared Storage API method invoked.
     */
    type: SharedStorageAccessType;
    /**
     * DevTools Frame Token for the primary frame tree's root.
     */
    mainFrameId: Page.FrameId;
    /**
     * Serialized origin for the context that invoked the Shared Storage API.
     */
    ownerOrigin: string;
    /**
     * The sub-parameters warapped by `params` are all optional and their
     * presence/absence depends on `type`.
     */
    params: SharedStorageAccessParams;
}

