
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
export interface PlayerMessage {
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
export interface PlayerProperty {
    name: string;
    value: string;
}

/**
 * Corresponds to kMediaEventTriggered
 */
export interface PlayerEvent {
    timestamp: Timestamp;
    value: string;
}

export const enum PlayerErrorType {
    Pipeline_error = "pipeline_error",
    Media_error = "media_error",
}

/**
 * Corresponds to kMediaError
 */
export interface PlayerError {
    /**
     *  (PlayerErrorType enum)
     */
    type: ("pipeline_error" | "media_error");
    /**
     * When this switches to using media::Status instead of PipelineStatus
     * we can remove "errorCode" and replace it with the fields from
     * a Status instance. This also seems like a duplicate of the error
     * level enum - there is a todo bug to have that level removed and
     * use this instead. (crbug.com/1068454)
     */
    errorCode: string;
}

/**
 * This can be called multiple times, and can be used to set / override /
 * remove player properties. A null propValue indicates removal.
 */
export interface PlayerPropertiesChangedEvent {
    playerId: PlayerId;
    properties: PlayerProperty[];
}

/**
 * Send events as a list, allowing them to be batched on the browser for less
 * congestion. If batched, events must ALWAYS be in chronological order.
 */
export interface PlayerEventsAddedEvent {
    playerId: PlayerId;
    events: PlayerEvent[];
}

/**
 * Send a list of any messages that need to be delivered.
 */
export interface PlayerMessagesLoggedEvent {
    playerId: PlayerId;
    messages: PlayerMessage[];
}

/**
 * Send a list of any errors that need to be delivered.
 */
export interface PlayerErrorsRaisedEvent {
    playerId: PlayerId;
    errors: PlayerError[];
}

/**
 * Called whenever a player is created, or when a new agent joins and receives
 * a list of active players. If an agent is restored, it will receive the full
 * list of player ids and all events again.
 */
export interface PlayersCreatedEvent {
    players: PlayerId[];
}

