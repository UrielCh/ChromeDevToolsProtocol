
export type integer = number;


/**
 * Fired when remote debugging connection is about to be terminated. Contains detach reason.
 */
export type DetachedEvent = {
    /**
     * The reason why connection has been terminated.
     */
    reason: string;
}

