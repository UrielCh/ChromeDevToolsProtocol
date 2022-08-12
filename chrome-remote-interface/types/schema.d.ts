
export type integer = number;

/**
 * This domain is deprecated.
 */

/**
 * Description of the protocol domain.
 */
export interface Domain {
    /**
     * Domain name.
     */
    name: string;
    /**
     * Domain version.
     */
    version: string;
}

export interface GetDomainsResponse {
    /**
     * List of supported domains.
     */
    domains: Domain[];
}

