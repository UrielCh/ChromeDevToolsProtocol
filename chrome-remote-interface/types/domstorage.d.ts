
export type integer = number;

/**
 * Query and modify DOM storage.
 */

/**
 * DOM Storage identifier.
 */
export type StorageId = {
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

export type ClearRequest = {
    storageId: StorageId;
}

export type GetDOMStorageItemsRequest = {
    storageId: StorageId;
}

export type GetDOMStorageItemsResponse = {
    entries: Item[];
}

export type RemoveDOMStorageItemRequest = {
    storageId: StorageId;
    key: string;
}

export type SetDOMStorageItemRequest = {
    storageId: StorageId;
    key: string;
    value: string;
}

export type DomStorageItemAddedEvent = {
    storageId: StorageId;
    key: string;
    newValue: string;
}

export type DomStorageItemRemovedEvent = {
    storageId: StorageId;
    key: string;
}

export type DomStorageItemUpdatedEvent = {
    storageId: StorageId;
    key: string;
    oldValue: string;
    newValue: string;
}

export type DomStorageItemsClearedEvent = {
    storageId: StorageId;
}

