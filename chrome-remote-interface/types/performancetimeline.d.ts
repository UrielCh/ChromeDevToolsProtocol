import type * as Network from './network.d.ts'
import type * as DOM from './dom.d.ts'
import type * as Page from './page.d.ts'

export type integer = number;

/**
 * Reporting of performance timeline events, as specified in
 * https://w3c.github.io/performance-timeline/#dom-performanceobserver.
 */

/**
 * See https://github.com/WICG/LargestContentfulPaint and largest_contentful_paint.idl
 */
export type LargestContentfulPaint = {
    renderTime: Network.TimeSinceEpoch;
    loadTime: Network.TimeSinceEpoch;
    /**
     * The number of pixels being painted.
     */
    size: number;
    /**
     * The id attribute of the element, if available.
     */
    elementId?: string;
    /**
     * The URL of the image (may be trimmed).
     */
    url?: string;
    nodeId?: DOM.BackendNodeId;
}

export type LayoutShiftAttribution = {
    previousRect: DOM.Rect;
    currentRect: DOM.Rect;
    nodeId?: DOM.BackendNodeId;
}

/**
 * See https://wicg.github.io/layout-instability/#sec-layout-shift and layout_shift.idl
 */
export type LayoutShift = {
    /**
     * Score increment produced by this event.
     */
    value: number;
    hadRecentInput: boolean;
    lastInputTime: Network.TimeSinceEpoch;
    sources: LayoutShiftAttribution[];
}

export type TimelineEvent = {
    /**
     * Identifies the frame that this event is related to. Empty for non-frame targets.
     */
    frameId: Page.FrameId;
    /**
     * The event type, as specified in https://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype
     * This determines which of the optional "details" fiedls is present.
     */
    type: string;
    /**
     * Name may be empty depending on the type.
     */
    name: string;
    /**
     * Time in seconds since Epoch, monotonically increasing within document lifetime.
     */
    time: Network.TimeSinceEpoch;
    /**
     * Event duration, if applicable.
     */
    duration?: number;
    lcpDetails?: LargestContentfulPaint;
    layoutShiftDetails?: LayoutShift;
}

export type EnableRequest = {
    /**
     * The types of event to report, as specified in
     * https://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype
     * The specified filter overrides any previous filters, passing empty
     * filter disables recording.
     * Note that not all types exposed to the web platform are currently supported.
     */
    eventTypes: string[];
}

/**
 * Sent when a performance timeline event is added. See reportPerformanceTimeline method.
 */
export type TimelineEventAddedEvent = {
    event: TimelineEvent;
}

