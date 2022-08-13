import type * as Runtime from './runtime.d.ts'

export type integer = number;


/**
 * Database with an array of object stores.
 */
export type DatabaseWithObjectStores = {
    /**
     * Database name.
     */
    name: string;
    /**
     * Database version (type is not 'integer', as the standard
     * requires the version number to be 'unsigned long long')
     */
    version: number;
    /**
     * Object stores in this database.
     */
    objectStores: ObjectStore[];
}

/**
 * Object store.
 */
export type ObjectStore = {
    /**
     * Object store name.
     */
    name: string;
    /**
     * Object store key path.
     */
    keyPath: KeyPath;
    /**
     * If true, object store has auto increment flag set.
     */
    autoIncrement: boolean;
    /**
     * Indexes in this object store.
     */
    indexes: ObjectStoreIndex[];
}

/**
 * Object store index.
 */
export type ObjectStoreIndex = {
    /**
     * Index name.
     */
    name: string;
    /**
     * Index key path.
     */
    keyPath: KeyPath;
    /**
     * If true, index is unique.
     */
    unique: boolean;
    /**
     * If true, index allows multiple entries for a key.
     */
    multiEntry: boolean;
}

export const enum KeyType {
    Number = "number",
    String = "string",
    Date = "date",
    Array = "array",
}

/**
 * Key.
 */
export type Key = {
    /**
     * Key type. (KeyType enum)
     */
    type: ("number" | "string" | "date" | "array");
    /**
     * Number value.
     */
    number?: number;
    /**
     * String value.
     */
    string?: string;
    /**
     * Date value.
     */
    date?: number;
    /**
     * Array value.
     */
    array?: Key[];
}

/**
 * Key range.
 */
export type KeyRange = {
    /**
     * Lower bound.
     */
    lower?: Key;
    /**
     * Upper bound.
     */
    upper?: Key;
    /**
     * If true lower bound is open.
     */
    lowerOpen: boolean;
    /**
     * If true upper bound is open.
     */
    upperOpen: boolean;
}

/**
 * Data entry.
 */
export type DataEntry = {
    /**
     * Key object.
     */
    key: Runtime.RemoteObject;
    /**
     * Primary key object.
     */
    primaryKey: Runtime.RemoteObject;
    /**
     * Value object.
     */
    value: Runtime.RemoteObject;
}

export const enum KeyPathType {
    Null = "null",
    String = "string",
    Array = "array",
}

/**
 * Key path.
 */
export type KeyPath = {
    /**
     * Key path type. (KeyPathType enum)
     */
    type: ("null" | "string" | "array");
    /**
     * String value.
     */
    string?: string;
    /**
     * Array value.
     */
    array?: string[];
}

export type ClearObjectStoreRequest = {
    /**
     * Security origin.
     */
    securityOrigin: string;
    /**
     * Database name.
     */
    databaseName: string;
    /**
     * Object store name.
     */
    objectStoreName: string;
}

export type DeleteDatabaseRequest = {
    /**
     * Security origin.
     */
    securityOrigin: string;
    /**
     * Database name.
     */
    databaseName: string;
}

export type DeleteObjectStoreEntriesRequest = {
    securityOrigin: string;
    databaseName: string;
    objectStoreName: string;
    /**
     * Range of entry keys to delete
     */
    keyRange: KeyRange;
}

export type RequestDataRequest = {
    /**
     * Security origin.
     */
    securityOrigin: string;
    /**
     * Database name.
     */
    databaseName: string;
    /**
     * Object store name.
     */
    objectStoreName: string;
    /**
     * Index name, empty string for object store data requests.
     */
    indexName: string;
    /**
     * Number of records to skip.
     */
    skipCount: integer;
    /**
     * Number of records to fetch.
     */
    pageSize: integer;
    /**
     * Key range.
     */
    keyRange?: KeyRange;
}

export type RequestDataResponse = {
    /**
     * Array of object store data entries.
     */
    objectStoreDataEntries: DataEntry[];
    /**
     * If true, there are more entries to fetch in the given range.
     */
    hasMore: boolean;
}

export type GetMetadataRequest = {
    /**
     * Security origin.
     */
    securityOrigin: string;
    /**
     * Database name.
     */
    databaseName: string;
    /**
     * Object store name.
     */
    objectStoreName: string;
}

export type GetMetadataResponse = {
    /**
     * the entries count
     */
    entriesCount: number;
    /**
     * the current value of key generator, to become the next inserted
     * key into the object store. Valid if objectStore.autoIncrement
     * is true.
     */
    keyGeneratorValue: number;
}

export type RequestDatabaseRequest = {
    /**
     * Security origin.
     */
    securityOrigin: string;
    /**
     * Database name.
     */
    databaseName: string;
}

export type RequestDatabaseResponse = {
    /**
     * Database with an array of object stores.
     */
    databaseWithObjectStores: DatabaseWithObjectStores;
}

export type RequestDatabaseNamesRequest = {
    /**
     * Security origin.
     */
    securityOrigin: string;
}

export type RequestDatabaseNamesResponse = {
    /**
     * Database names for origin.
     */
    databaseNames: string[];
}

