
export type integer = number;

/**
 * Query and modify DOM storage.
 */

/**
 * DOM Storage identifier.
 */
export interface StorageId {
    /**
     * Security origin for the storage.
     */
    securityOrigin: string;
    /**
     * Whether the storage is local storage (not session storage).
     */
    isLocalStorage: boolean;
}

/**
 * DOM Storage item.
 */
export type Item = string[];

export interface ClearRequest {
    storageId: StorageId;
}

export interface GetDOMStorageItemsRequest {
    storageId: StorageId;
}

export interface GetDOMStorageItemsResponse {
    entries: Item[];
}

export interface RemoveDOMStorageItemRequest {
    storageId: StorageId;
    key: string;
}

export interface SetDOMStorageItemRequest {
    storageId: StorageId;
    key: string;
    value: string;
}

export interface DomStorageItemAddedEvent {
    storageId: StorageId;
    key: string;
    newValue: string;
}

export interface DomStorageItemRemovedEvent {
    storageId: StorageId;
    key: string;
}

export interface DomStorageItemUpdatedEvent {
    storageId: StorageId;
    key: string;
    oldValue: string;
    newValue: string;
}

export interface DomStorageItemsClearedEvent {
    storageId: StorageId;
}

