import type * as Runtime from './runtime.d.ts'

export type integer = number;


/**
 * Heap snapshot object id.
 */
export type HeapSnapshotObjectId = string;

/**
 * Sampling Heap Profile node. Holds callsite information, allocation statistics and child nodes.
 */
export interface SamplingHeapProfileNode {
    /**
     * Function location.
     */
    callFrame: Runtime.CallFrame;
    /**
     * Allocations size in bytes for the node excluding children.
     */
    selfSize: number;
    /**
     * Node id. Ids are unique across all profiles collected between startSampling and stopSampling.
     */
    id: integer;
    /**
     * Child nodes.
     */
    children: SamplingHeapProfileNode[];
}

/**
 * A single sample from a sampling profile.
 */
export interface SamplingHeapProfileSample {
    /**
     * Allocation size in bytes attributed to the sample.
     */
    size: number;
    /**
     * Id of the corresponding profile tree node.
     */
    nodeId: integer;
    /**
     * Time-ordered sample ordinal number. It is unique across all profiles retrieved
     * between startSampling and stopSampling.
     */
    ordinal: number;
}

/**
 * Sampling profile.
 */
export interface SamplingHeapProfile {
    head: SamplingHeapProfileNode;
    samples: SamplingHeapProfileSample[];
}

export interface AddInspectedHeapObjectRequest {
    /**
     * Heap snapshot object id to be accessible by means of $x command line API.
     */
    heapObjectId: HeapSnapshotObjectId;
}

export interface GetHeapObjectIdRequest {
    /**
     * Identifier of the object to get heap object id for.
     */
    objectId: Runtime.RemoteObjectId;
}

export interface GetHeapObjectIdResponse {
    /**
     * Id of the heap snapshot object corresponding to the passed remote object id.
     */
    heapSnapshotObjectId: HeapSnapshotObjectId;
}

export interface GetObjectByHeapObjectIdRequest {
    objectId: HeapSnapshotObjectId;
    /**
     * Symbolic group name that can be used to release multiple objects.
     */
    objectGroup?: string;
}

export interface GetObjectByHeapObjectIdResponse {
    /**
     * Evaluation result.
     */
    result: Runtime.RemoteObject;
}

export interface GetSamplingProfileResponse {
    /**
     * Return the sampling profile being collected.
     */
    profile: SamplingHeapProfile;
}

export interface StartSamplingRequest {
    /**
     * Average sample interval in bytes. Poisson distribution is used for the intervals. The
     * default value is 32768 bytes.
     */
    samplingInterval?: number;
}

export interface StartTrackingHeapObjectsRequest {
    trackAllocations?: boolean;
}

export interface StopSamplingResponse {
    /**
     * Recorded sampling heap profile.
     */
    profile: SamplingHeapProfile;
}

export interface StopTrackingHeapObjectsRequest {
    /**
     * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken
     * when the tracking is stopped.
     */
    reportProgress?: boolean;
    treatGlobalObjectsAsRoots?: boolean;
    /**
     * If true, numerical values are included in the snapshot
     */
    captureNumericValue?: boolean;
}

export interface TakeHeapSnapshotRequest {
    /**
     * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
     */
    reportProgress?: boolean;
    /**
     * If true, a raw snapshot without artificial roots will be generated
     */
    treatGlobalObjectsAsRoots?: boolean;
    /**
     * If true, numerical values are included in the snapshot
     */
    captureNumericValue?: boolean;
}

export interface AddHeapSnapshotChunkEvent {
    chunk: string;
}

/**
 * If heap objects tracking has been started then backend may send update for one or more fragments
 */
export interface HeapStatsUpdateEvent {
    /**
     * An array of triplets. Each triplet describes a fragment. The first integer is the fragment
     * index, the second integer is a total count of objects for the fragment, the third integer is
     * a total size of the objects for the fragment.
     */
    statsUpdate: integer[];
}

/**
 * If heap objects tracking has been started then backend regularly sends a current value for last
 * seen object id and corresponding timestamp. If the were changes in the heap since last event
 * then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
 */
export interface LastSeenObjectIdEvent {
    lastSeenObjectId: integer;
    timestamp: number;
}

export interface ReportHeapSnapshotProgressEvent {
    done: integer;
    total: integer;
    finished?: boolean;
}

