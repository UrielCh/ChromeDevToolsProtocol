
export type integer = number;

/**
 * This domain allows detailed inspection of media elements
 */

/**
 * Players will get an ID that is unique within the agent context.
 */
export type PlayerId = string;

export type Timestamp = number;

export const enum PlayerMessageLevel {
    Error = "error",
    Warning = "warning",
    Info = "info",
    Debug = "debug",
}

/**
 * Have one type per entry in MediaLogRecord::Type
 * Corresponds to kMessage
 */
export type PlayerMessage = {
    /**
     * Keep in sync with MediaLogMessageLevel
     * We are currently keeping the message level 'error' separate from the
     * PlayerError type because right now they represent different things,
     * this one being a DVLOG(ERROR) style log message that gets printed
     * based on what log level is selected in the UI, and the other is a
     * representation of a media::PipelineStatus object. Soon however we're
     * going to be moving away from using PipelineStatus for errors and
     * introducing a new error type which should hopefully let us integrate
     * the error log level into the PlayerError type. (PlayerMessageLevel enum)
     */
    level: ("error" | "warning" | "info" | "debug");
    message: string;
}

/**
 * Corresponds to kMediaPropertyChange
 */
export type PlayerProperty = {
    name: string;
    value: string;
}

/**
 * Corresponds to kMediaEventTriggered
 */
export type PlayerEvent = {
    timestamp: Timestamp;
    value: string;
}

/**
 * Represents logged source line numbers reported in an error.
 * NOTE: file and line are from chromium c++ implementation code, not js.
 */
export type PlayerErrorSourceLocation = {
    file: string;
    line: integer;
}

/**
 * Corresponds to kMediaError
 */
export type PlayerError = {
    errorType: string;
    /**
     * Code is the numeric enum entry for a specific set of error codes, such
     * as PipelineStatusCodes in media/base/pipeline_status.h
     */
    code: integer;
    /**
     * A trace of where this error was caused / where it passed through.
     */
    stack: PlayerErrorSourceLocation[];
    /**
     * Errors potentially have a root cause error, ie, a DecoderError might be
     * caused by an WindowsError
     */
    cause: PlayerError[];
    /**
     * Extra data attached to an error, such as an HRESULT, Video Codec, etc.
     */
    data: any;
}

/**
 * This can be called multiple times, and can be used to set / override /
 * remove player properties. A null propValue indicates removal.
 */
export type PlayerPropertiesChangedEvent = {
    playerId: PlayerId;
    properties: PlayerProperty[];
}

/**
 * Send events as a list, allowing them to be batched on the browser for less
 * congestion. If batched, events must ALWAYS be in chronological order.
 */
export type PlayerEventsAddedEvent = {
    playerId: PlayerId;
    events: PlayerEvent[];
}

/**
 * Send a list of any messages that need to be delivered.
 */
export type PlayerMessagesLoggedEvent = {
    playerId: PlayerId;
    messages: PlayerMessage[];
}

/**
 * Send a list of any errors that need to be delivered.
 */
export type PlayerErrorsRaisedEvent = {
    playerId: PlayerId;
    errors: PlayerError[];
}

/**
 * Called whenever a player is created, or when a new agent joins and receives
 * a list of active players. If an agent is restored, it will receive the full
 * list of player ids and all events again.
 */
export type PlayersCreatedEvent = {
    players: PlayerId[];
}

