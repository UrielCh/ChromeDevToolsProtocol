import type * as Runtime from './runtime.d.ts'

export type integer = number;


/**
 * Database with an array of object stores.
 */
export interface DatabaseWithObjectStores {
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
export interface ObjectStore {
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
export interface ObjectStoreIndex {
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
export interface Key {
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
export interface KeyRange {
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
export interface DataEntry {
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
export interface KeyPath {
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

export interface ClearObjectStoreRequest {
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

export interface DeleteDatabaseRequest {
    /**
     * Security origin.
     */
    securityOrigin: string;
    /**
     * Database name.
     */
    databaseName: string;
}

export interface DeleteObjectStoreEntriesRequest {
    securityOrigin: string;
    databaseName: string;
    objectStoreName: string;
    /**
     * Range of entry keys to delete
     */
    keyRange: KeyRange;
}

export interface RequestDataRequest {
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

export interface RequestDataResponse {
    /**
     * Array of object store data entries.
     */
    objectStoreDataEntries: DataEntry[];
    /**
     * If true, there are more entries to fetch in the given range.
     */
    hasMore: boolean;
}

export interface GetMetadataRequest {
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

export interface GetMetadataResponse {
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

export interface RequestDatabaseRequest {
    /**
     * Security origin.
     */
    securityOrigin: string;
    /**
     * Database name.
     */
    databaseName: string;
}

export interface RequestDatabaseResponse {
    /**
     * Database with an array of object stores.
     */
    databaseWithObjectStores: DatabaseWithObjectStores;
}

export interface RequestDatabaseNamesRequest {
    /**
     * Security origin.
     */
    securityOrigin: string;
}

export interface RequestDatabaseNamesResponse {
    /**
     * Database names for origin.
     */
    databaseNames: string[];
}

