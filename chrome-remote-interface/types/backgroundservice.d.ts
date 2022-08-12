import type * as Network from './network.d.ts'
import type * as ServiceWorker from './serviceworker.d.ts'

export type integer = number;

/**
 * Defines events for background web platform features.
 */

/**
 * The Background Service that will be associated with the commands/events.
 * Every Background Service operates independently, but they share the same
 * API.
 */
export type ServiceName = ("backgroundFetch" | "backgroundSync" | "pushMessaging" | "notifications" | "paymentHandler" | "periodicBackgroundSync");

/**
 * A key-value pair for additional event information to pass along.
 */
export interface EventMetadata {
    key: string;
    value: string;
}

export interface BackgroundServiceEvent {
    /**
     * Timestamp of the event (in seconds).
     */
    timestamp: Network.TimeSinceEpoch;
    /**
     * The origin this event belongs to.
     */
    origin: string;
    /**
     * The Service Worker ID that initiated the event.
     */
    serviceWorkerRegistrationId: ServiceWorker.RegistrationID;
    /**
     * The Background Service this event belongs to.
     */
    service: ServiceName;
    /**
     * A description of the event.
     */
    eventName: string;
    /**
     * An identifier that groups related events together.
     */
    instanceId: string;
    /**
     * A list of event-specific information.
     */
    eventMetadata: EventMetadata[];
}

export interface StartObservingRequest {
    service: ServiceName;
}

export interface StopObservingRequest {
    service: ServiceName;
}

export interface SetRecordingRequest {
    shouldRecord: boolean;
    service: ServiceName;
}

export interface ClearEventsRequest {
    service: ServiceName;
}

/**
 * Called when the recording state for the service has been updated.
 */
export interface RecordingStateChangedEvent {
    isRecording: boolean;
    service: ServiceName;
}

/**
 * Called with all existing backgroundServiceEvents when enabled, and all new
 * events afterwards if enabled and recording.
 */
export interface BackgroundServiceEventReceivedEvent {
    backgroundServiceEvent: BackgroundServiceEvent;
}

