
export type integer = number;

/**
 * The Tethering domain defines methods and events for browser port binding.
 */

export interface BindRequest {
    /**
     * Port number to bind.
     */
    port: integer;
}

export interface UnbindRequest {
    /**
     * Port number to unbind.
     */
    port: integer;
}

/**
 * Informs that port was successfully bound and got a specified connection id.
 */
export interface AcceptedEvent {
    /**
     * Port number that was successfully bound.
     */
    port: integer;
    /**
     * Connection id to be used.
     */
    connectionId: string;
}

