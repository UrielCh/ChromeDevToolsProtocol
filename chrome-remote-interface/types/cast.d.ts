
export type integer = number;

/**
 * A domain for interacting with Cast, Presentation API, and Remote Playback API
 * functionalities.
 */

export type Sink = {
    name: string;
    id: string;
    /**
     * Text describing the current session. Present only if there is an active
     * session on the sink.
     */
    session?: string;
}

export type EnableRequest = {
    presentationUrl?: string;
}

export type SetSinkToUseRequest = {
    sinkName: string;
}

export type StartDesktopMirroringRequest = {
    sinkName: string;
}

export type StartTabMirroringRequest = {
    sinkName: string;
}

export type StopCastingRequest = {
    sinkName: string;
}

/**
 * This is fired whenever the list of available sinks changes. A sink is a
 * device or a software surface that you can cast to.
 */
export type SinksUpdatedEvent = {
    sinks: Sink[];
}

/**
 * This is fired whenever the outstanding issue/error message changes.
 * |issueMessage| is empty if there is no issue.
 */
export type IssueUpdatedEvent = {
    issueMessage: string;
}

