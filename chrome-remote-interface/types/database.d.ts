
export type integer = number;


/**
 * Unique identifier of Database object.
 */
export type DatabaseId = string;

/**
 * Database object.
 */
export interface Database {
    /**
     * Database ID.
     */
    id: DatabaseId;
    /**
     * Database domain.
     */
    domain: string;
    /**
     * Database name.
     */
    name: string;
    /**
     * Database version.
     */
    version: string;
}

/**
 * Database error.
 */
export interface Error {
    /**
     * Error message.
     */
    message: string;
    /**
     * Error code.
     */
    code: integer;
}

export interface ExecuteSQLRequest {
    databaseId: DatabaseId;
    query: string;
}

export interface ExecuteSQLResponse {
    columnNames?: string[];
    values?: any[];
    sqlError?: Error;
}

export interface GetDatabaseTableNamesRequest {
    databaseId: DatabaseId;
}

export interface GetDatabaseTableNamesResponse {
    tableNames: string[];
}

export interface AddDatabaseEvent {
    database: Database;
}

