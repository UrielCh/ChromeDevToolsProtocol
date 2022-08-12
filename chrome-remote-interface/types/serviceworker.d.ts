import type * as Target from './target.d.ts'

export type integer = number;


export type RegistrationID = string;

/**
 * ServiceWorker registration.
 */
export interface ServiceWorkerRegistration {
    registrationId: RegistrationID;
    scopeURL: string;
    isDeleted: boolean;
}

export type ServiceWorkerVersionRunningStatus = ("stopped" | "starting" | "running" | "stopping");

export type ServiceWorkerVersionStatus = ("new" | "installing" | "installed" | "activating" | "activated" | "redundant");

/**
 * ServiceWorker version.
 */
export interface ServiceWorkerVersion {
    versionId: string;
    registrationId: RegistrationID;
    scriptURL: string;
    runningStatus: ServiceWorkerVersionRunningStatus;
    status: ServiceWorkerVersionStatus;
    /**
     * The Last-Modified header value of the main script.
     */
    scriptLastModified?: number;
    /**
     * The time at which the response headers of the main script were received from the server.
     * For cached script it is the last time the cache entry was validated.
     */
    scriptResponseTime?: number;
    controlledClients?: Target.TargetID[];
    targetId?: Target.TargetID;
}

/**
 * ServiceWorker error message.
 */
export interface ServiceWorkerErrorMessage {
    errorMessage: string;
    registrationId: RegistrationID;
    versionId: string;
    sourceURL: string;
    lineNumber: integer;
    columnNumber: integer;
}

export interface DeliverPushMessageRequest {
    origin: string;
    registrationId: RegistrationID;
    data: string;
}

export interface DispatchSyncEventRequest {
    origin: string;
    registrationId: RegistrationID;
    tag: string;
    lastChance: boolean;
}

export interface DispatchPeriodicSyncEventRequest {
    origin: string;
    registrationId: RegistrationID;
    tag: string;
}

export interface InspectWorkerRequest {
    versionId: string;
}

export interface SetForceUpdateOnPageLoadRequest {
    forceUpdateOnPageLoad: boolean;
}

export interface SkipWaitingRequest {
    scopeURL: string;
}

export interface StartWorkerRequest {
    scopeURL: string;
}

export interface StopWorkerRequest {
    versionId: string;
}

export interface UnregisterRequest {
    scopeURL: string;
}

export interface UpdateRegistrationRequest {
    scopeURL: string;
}

export interface WorkerErrorReportedEvent {
    errorMessage: ServiceWorkerErrorMessage;
}

export interface WorkerRegistrationUpdatedEvent {
    registrations: ServiceWorkerRegistration[];
}

export interface WorkerVersionUpdatedEvent {
    versions: ServiceWorkerVersion[];
}

