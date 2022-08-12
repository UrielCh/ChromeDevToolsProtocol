
export type integer = number;

/**
 * This domain is deprecated.
 */

/**
 * Description of the protocol domain.
 */
export type Domain = {
    /**
     * Domain name.
     */
    name: string;
    /**
     * Domain version.
     */
    version: string;
}

export type GetDomainsResponse = {
    /**
     * List of supported domains.
     */
    domains: Domain[];
}

