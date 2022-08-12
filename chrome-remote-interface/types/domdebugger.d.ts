import type * as Runtime from './runtime.d.ts'
import type * as DOM from './dom.d.ts'

export type integer = number;

/**
 * DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript
 * execution will stop on these operations as if there was a regular breakpoint set.
 */

/**
 * DOM breakpoint type.
 */
export type DOMBreakpointType = ("subtree-modified" | "attribute-modified" | "node-removed");

/**
 * CSP Violation type.
 */
export type CSPViolationType = ("trustedtype-sink-violation" | "trustedtype-policy-violation");

/**
 * Object event listener.
 */
export type EventListener = {
    /**
     * `EventListener`'s type.
     */
    type: string;
    /**
     * `EventListener`'s useCapture.
     */
    useCapture: boolean;
    /**
     * `EventListener`'s passive flag.
     */
    passive: boolean;
    /**
     * `EventListener`'s once flag.
     */
    once: boolean;
    /**
     * Script id of the handler code.
     */
    scriptId: Runtime.ScriptId;
    /**
     * Line number in the script (0-based).
     */
    lineNumber: integer;
    /**
     * Column number in the script (0-based).
     */
    columnNumber: integer;
    /**
     * Event handler function value.
     */
    handler?: Runtime.RemoteObject;
    /**
     * Event original handler function value.
     */
    originalHandler?: Runtime.RemoteObject;
    /**
     * Node the listener is added to (if any).
     */
    backendNodeId?: DOM.BackendNodeId;
}

export type GetEventListenersRequest = {
    /**
     * Identifier of the object to return listeners for.
     */
    objectId: Runtime.RemoteObjectId;
    /**
     * The maximum depth at which Node children should be retrieved, defaults to 1. Use -1 for the
     * entire subtree or provide an integer larger than 0.
     */
    depth?: integer;
    /**
     * Whether or not iframes and shadow roots should be traversed when returning the subtree
     * (default is false). Reports listeners for all contexts if pierce is enabled.
     */
    pierce?: boolean;
}

export type GetEventListenersResponse = {
    /**
     * Array of relevant listeners.
     */
    listeners: EventListener[];
}

export type RemoveDOMBreakpointRequest = {
    /**
     * Identifier of the node to remove breakpoint from.
     */
    nodeId: DOM.NodeId;
    /**
     * Type of the breakpoint to remove.
     */
    type: DOMBreakpointType;
}

export type RemoveEventListenerBreakpointRequest = {
    /**
     * Event name.
     */
    eventName: string;
    /**
     * EventTarget interface name.
     */
    targetName?: string;
}

export type RemoveInstrumentationBreakpointRequest = {
    /**
     * Instrumentation name to stop on.
     */
    eventName: string;
}

export type RemoveXHRBreakpointRequest = {
    /**
     * Resource URL substring.
     */
    url: string;
}

export type SetBreakOnCSPViolationRequest = {
    /**
     * CSP Violations to stop upon.
     */
    violationTypes: CSPViolationType[];
}

export type SetDOMBreakpointRequest = {
    /**
     * Identifier of the node to set breakpoint on.
     */
    nodeId: DOM.NodeId;
    /**
     * Type of the operation to stop upon.
     */
    type: DOMBreakpointType;
}

export type SetEventListenerBreakpointRequest = {
    /**
     * DOM Event name to stop on (any DOM event will do).
     */
    eventName: string;
    /**
     * EventTarget interface name to stop on. If equal to `"*"` or not provided, will stop on any
     * EventTarget.
     */
    targetName?: string;
}

export type SetInstrumentationBreakpointRequest = {
    /**
     * Instrumentation name to stop on.
     */
    eventName: string;
}

export type SetXHRBreakpointRequest = {
    /**
     * Resource URL substring. All XHRs having this substring in the URL will get stopped upon.
     */
    url: string;
}

