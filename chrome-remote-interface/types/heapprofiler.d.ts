import type * as Runtime from './runtime.d.ts'

export type integer = number;


/**
 * Heap snapshot object id.
 */
export type HeapSnapshotObjectId = string;

/**
 * Sampling Heap Profile node. Holds callsite information, allocation statistics and child nodes.
 */
export type SamplingHeapProfileNode = {
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
export type SamplingHeapProfileSample = {
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
export type SamplingHeapProfile = {
    head: SamplingHeapProfileNode;
    samples: SamplingHeapProfileSample[];
}

export type AddInspectedHeapObjectRequest = {
    /**
     * Heap snapshot object id to be accessible by means of $x command line API.
     */
    heapObjectId: HeapSnapshotObjectId;
}

export type GetHeapObjectIdRequest = {
    /**
     * Identifier of the object to get heap object id for.
     */
    objectId: Runtime.RemoteObjectId;
}

export type GetHeapObjectIdResponse = {
    /**
     * Id of the heap snapshot object corresponding to the passed remote object id.
     */
    heapSnapshotObjectId: HeapSnapshotObjectId;
}

export type GetObjectByHeapObjectIdRequest = {
    objectId: HeapSnapshotObjectId;
    /**
     * Symbolic group name that can be used to release multiple objects.
     */
    objectGroup?: string;
}

export type GetObjectByHeapObjectIdResponse = {
    /**
     * Evaluation result.
     */
    result: Runtime.RemoteObject;
}

export type GetSamplingProfileResponse = {
    /**
     * Return the sampling profile being collected.
     */
    profile: SamplingHeapProfile;
}

export type StartSamplingRequest = {
    /**
     * Average sample interval in bytes. Poisson distribution is used for the intervals. The
     * default value is 32768 bytes.
     */
    samplingInterval?: number;
}

export type StartTrackingHeapObjectsRequest = {
    trackAllocations?: boolean;
}

export type StopSamplingResponse = {
    /**
     * Recorded sampling heap profile.
     */
    profile: SamplingHeapProfile;
}

export type StopTrackingHeapObjectsRequest = {
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

export type TakeHeapSnapshotRequest = {
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

export type AddHeapSnapshotChunkEvent = {
    chunk: string;
}

/**
 * If heap objects tracking has been started then backend may send update for one or more fragments
 */
export type HeapStatsUpdateEvent = {
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
export type LastSeenObjectIdEvent = {
    lastSeenObjectId: integer;
    timestamp: number;
}

export type ReportHeapSnapshotProgressEvent = {
    done: integer;
    total: integer;
    finished?: boolean;
}

