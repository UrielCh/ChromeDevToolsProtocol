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
export type EventMetadata = {
    key: string;
    value: string;
}

export type BackgroundServiceEvent = {
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

export type StartObservingRequest = {
    service: ServiceName;
}

export type StopObservingRequest = {
    service: ServiceName;
}

export type SetRecordingRequest = {
    shouldRecord: boolean;
    service: ServiceName;
}

export type ClearEventsRequest = {
    service: ServiceName;
}

/**
 * Called when the recording state for the service has been updated.
 */
export type RecordingStateChangedEvent = {
    isRecording: boolean;
    service: ServiceName;
}

/**
 * Called with all existing backgroundServiceEvents when enabled, and all new
 * events afterwards if enabled and recording.
 */
export type BackgroundServiceEventReceivedEvent = {
    backgroundServiceEvent: BackgroundServiceEvent;
}

