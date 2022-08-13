
export type integer = number;

/**
 * EventBreakpoints permits setting breakpoints on particular operations and
 * events in targets that run JavaScript but do not have a DOM.
 * JavaScript execution will stop on these operations as if there was a regular
 * breakpoint set.
 */

export type SetInstrumentationBreakpointRequest = {
    /**
     * Instrumentation name to stop on.
     */
    eventName: string;
}

export type RemoveInstrumentationBreakpointRequest = {
    /**
     * Instrumentation name to stop on.
     */
    eventName: string;
}

