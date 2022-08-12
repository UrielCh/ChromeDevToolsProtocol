
export type integer = number;

/**
 * A domain for interacting with Cast, Presentation API, and Remote Playback API
 * functionalities.
 */

export interface Sink {
    name: string;
    id: string;
    /**
     * Text describing the current session. Present only if there is an active
     * session on the sink.
     */
    session?: string;
}

export interface EnableRequest {
    presentationUrl?: string;
}

export interface SetSinkToUseRequest {
    sinkName: string;
}

export interface StartDesktopMirroringRequest {
    sinkName: string;
}

export interface StartTabMirroringRequest {
    sinkName: string;
}

export interface StopCastingRequest {
    sinkName: string;
}

/**
 * This is fired whenever the list of available sinks changes. A sink is a
 * device or a software surface that you can cast to.
 */
export interface SinksUpdatedEvent {
    sinks: Sink[];
}

/**
 * This is fired whenever the outstanding issue/error message changes.
 * |issueMessage| is empty if there is no issue.
 */
export interface IssueUpdatedEvent {
    issueMessage: string;
}

