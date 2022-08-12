
export type integer = number;

/**
 * The Tethering domain defines methods and events for browser port binding.
 */

export type BindRequest = {
    /**
     * Port number to bind.
     */
    port: integer;
}

export type UnbindRequest = {
    /**
     * Port number to unbind.
     */
    port: integer;
}

/**
 * Informs that port was successfully bound and got a specified connection id.
 */
export type AcceptedEvent = {
    /**
     * Port number that was successfully bound.
     */
    port: integer;
    /**
     * Connection id to be used.
     */
    connectionId: string;
}

