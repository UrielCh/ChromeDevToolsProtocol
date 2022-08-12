
export type integer = number;


/**
 * Unique identifier of Database object.
 */
export type DatabaseId = string;

/**
 * Database object.
 */
export type Database = {
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
export type Error = {
    /**
     * Error message.
     */
    message: string;
    /**
     * Error code.
     */
    code: integer;
}

export type ExecuteSQLRequest = {
    databaseId: DatabaseId;
    query: string;
}

export type ExecuteSQLResponse = {
    columnNames?: string[];
    values?: any[];
    sqlError?: Error;
}

export type GetDatabaseTableNamesRequest = {
    databaseId: DatabaseId;
}

export type GetDatabaseTableNamesResponse = {
    tableNames: string[];
}

export type AddDatabaseEvent = {
    database: Database;
}

