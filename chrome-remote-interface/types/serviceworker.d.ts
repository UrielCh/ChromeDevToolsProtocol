import type * as Target from './target.d.ts'

export type integer = number;


export type RegistrationID = string;

/**
 * ServiceWorker registration.
 */
export type ServiceWorkerRegistration = {
    registrationId: RegistrationID;
    scopeURL: string;
    isDeleted: boolean;
}

export type ServiceWorkerVersionRunningStatus = ("stopped" | "starting" | "running" | "stopping");

export type ServiceWorkerVersionStatus = ("new" | "installing" | "installed" | "activating" | "activated" | "redundant");

/**
 * ServiceWorker version.
 */
export type ServiceWorkerVersion = {
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
export type ServiceWorkerErrorMessage = {
    errorMessage: string;
    registrationId: RegistrationID;
    versionId: string;
    sourceURL: string;
    lineNumber: integer;
    columnNumber: integer;
}

export type DeliverPushMessageRequest = {
    origin: string;
    registrationId: RegistrationID;
    data: string;
}

export type DispatchSyncEventRequest = {
    origin: string;
    registrationId: RegistrationID;
    tag: string;
    lastChance: boolean;
}

export type DispatchPeriodicSyncEventRequest = {
    origin: string;
    registrationId: RegistrationID;
    tag: string;
}

export type InspectWorkerRequest = {
    versionId: string;
}

export type SetForceUpdateOnPageLoadRequest = {
    forceUpdateOnPageLoad: boolean;
}

export type SkipWaitingRequest = {
    scopeURL: string;
}

export type StartWorkerRequest = {
    scopeURL: string;
}

export type StopWorkerRequest = {
    versionId: string;
}

export type UnregisterRequest = {
    scopeURL: string;
}

export type UpdateRegistrationRequest = {
    scopeURL: string;
}

export type WorkerErrorReportedEvent = {
    errorMessage: ServiceWorkerErrorMessage;
}

export type WorkerRegistrationUpdatedEvent = {
    registrations: ServiceWorkerRegistration[];
}

export type WorkerVersionUpdatedEvent = {
    versions: ServiceWorkerVersion[];
}

