
export type integer = number;


/**
 * Unique identifier of the Cache object.
 */
export type CacheId = string;

/**
 * type of HTTP response cached
 */
export type CachedResponseType = ("basic" | "cors" | "default" | "error" | "opaqueResponse" | "opaqueRedirect");

/**
 * Data entry.
 */
export interface DataEntry {
    /**
     * Request URL.
     */
    requestURL: string;
    /**
     * Request method.
     */
    requestMethod: string;
    /**
     * Request headers
     */
    requestHeaders: Header[];
    /**
     * Number of seconds since epoch.
     */
    responseTime: number;
    /**
     * HTTP response status code.
     */
    responseStatus: integer;
    /**
     * HTTP response status text.
     */
    responseStatusText: string;
    /**
     * HTTP response type
     */
    responseType: CachedResponseType;
    /**
     * Response headers
     */
    responseHeaders: Header[];
}

/**
 * Cache identifier.
 */
export interface Cache {
    /**
     * An opaque unique id of the cache.
     */
    cacheId: CacheId;
    /**
     * Security origin of the cache.
     */
    securityOrigin: string;
    /**
     * The name of the cache.
     */
    cacheName: string;
}

export interface Header {
    name: string;
    value: string;
}

/**
 * Cached response
 */
export interface CachedResponse {
    /**
     * Entry content, base64-encoded. (Encoded as a base64 string when passed over JSON)
     */
    body: string;
}

export interface DeleteCacheRequest {
    /**
     * Id of cache for deletion.
     */
    cacheId: CacheId;
}

export interface DeleteEntryRequest {
    /**
     * Id of cache where the entry will be deleted.
     */
    cacheId: CacheId;
    /**
     * URL spec of the request.
     */
    request: string;
}

export interface RequestCacheNamesRequest {
    /**
     * Security origin.
     */
    securityOrigin: string;
}

export interface RequestCacheNamesResponse {
    /**
     * Caches for the security origin.
     */
    caches: Cache[];
}

export interface RequestCachedResponseRequest {
    /**
     * Id of cache that contains the entry.
     */
    cacheId: CacheId;
    /**
     * URL spec of the request.
     */
    requestURL: string;
    /**
     * headers of the request.
     */
    requestHeaders: Header[];
}

export interface RequestCachedResponseResponse {
    /**
     * Response read from the cache.
     */
    response: CachedResponse;
}

export interface RequestEntriesRequest {
    /**
     * ID of cache to get entries from.
     */
    cacheId: CacheId;
    /**
     * Number of records to skip.
     */
    skipCount?: integer;
    /**
     * Number of records to fetch.
     */
    pageSize?: integer;
    /**
     * If present, only return the entries containing this substring in the path
     */
    pathFilter?: string;
}

export interface RequestEntriesResponse {
    /**
     * Array of object store data entries.
     */
    cacheDataEntries: DataEntry[];
    /**
     * Count of returned entries from this storage. If pathFilter is empty, it
     * is the count of all entries from this storage.
     */
    returnCount: number;
}

