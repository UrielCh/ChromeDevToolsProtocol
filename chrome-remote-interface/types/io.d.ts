import type * as Runtime from './runtime.d.ts'

export type integer = number;

/**
 * Input/Output operations for streams produced by DevTools.
 */

/**
 * This is either obtained from another method or specified as `blob:&lt;uuid&gt;` where
 * `&lt;uuid&gt` is an UUID of a Blob.
 */
export type StreamHandle = string;

export interface CloseRequest {
    /**
     * Handle of the stream to close.
     */
    handle: StreamHandle;
}

export interface ReadRequest {
    /**
     * Handle of the stream to read.
     */
    handle: StreamHandle;
    /**
     * Seek to the specified offset before reading (if not specificed, proceed with offset
     * following the last read). Some types of streams may only support sequential reads.
     */
    offset?: integer;
    /**
     * Maximum number of bytes to read (left upon the agent discretion if not specified).
     */
    size?: integer;
}

export interface ReadResponse {
    /**
     * Set if the data is base64-encoded
     */
    base64Encoded?: boolean;
    /**
     * Data that were read.
     */
    data: string;
    /**
     * Set if the end-of-file condition occurred while reading.
     */
    eof: boolean;
}

export interface ResolveBlobRequest {
    /**
     * Object id of a Blob object wrapper.
     */
    objectId: Runtime.RemoteObjectId;
}

export interface ResolveBlobResponse {
    /**
     * UUID of the specified Blob.
     */
    uuid: string;
}

