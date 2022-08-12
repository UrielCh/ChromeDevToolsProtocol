import type * as DOM from './dom.d.ts'

export type integer = number;


/**
 * Unique Layer identifier.
 */
export type LayerId = string;

/**
 * Unique snapshot identifier.
 */
export type SnapshotId = string;

export const enum ScrollRectType {
    RepaintsOnScroll = "RepaintsOnScroll",
    TouchEventHandler = "TouchEventHandler",
    WheelEventHandler = "WheelEventHandler",
}

/**
 * Rectangle where scrolling happens on the main thread.
 */
export type ScrollRect = {
    /**
     * Rectangle itself.
     */
    rect: DOM.Rect;
    /**
     * Reason for rectangle to force scrolling on the main thread (ScrollRectType enum)
     */
    type: ("RepaintsOnScroll" | "TouchEventHandler" | "WheelEventHandler");
}

/**
 * Sticky position constraints.
 */
export type StickyPositionConstraint = {
    /**
     * Layout rectangle of the sticky element before being shifted
     */
    stickyBoxRect: DOM.Rect;
    /**
     * Layout rectangle of the containing block of the sticky element
     */
    containingBlockRect: DOM.Rect;
    /**
     * The nearest sticky layer that shifts the sticky box
     */
    nearestLayerShiftingStickyBox?: LayerId;
    /**
     * The nearest sticky layer that shifts the containing block
     */
    nearestLayerShiftingContainingBlock?: LayerId;
}

/**
 * Serialized fragment of layer picture along with its offset within the layer.
 */
export type PictureTile = {
    /**
     * Offset from owning layer left boundary
     */
    x: number;
    /**
     * Offset from owning layer top boundary
     */
    y: number;
    /**
     * Base64-encoded snapshot data. (Encoded as a base64 string when passed over JSON)
     */
    picture: string;
}

/**
 * Information about a compositing layer.
 */
export type Layer = {
    /**
     * The unique id for this layer.
     */
    layerId: LayerId;
    /**
     * The id of parent (not present for root).
     */
    parentLayerId?: LayerId;
    /**
     * The backend id for the node associated with this layer.
     */
    backendNodeId?: DOM.BackendNodeId;
    /**
     * Offset from parent layer, X coordinate.
     */
    offsetX: number;
    /**
     * Offset from parent layer, Y coordinate.
     */
    offsetY: number;
    /**
     * Layer width.
     */
    width: number;
    /**
     * Layer height.
     */
    height: number;
    /**
     * Transformation matrix for layer, default is identity matrix
     */
    transform?: number[];
    /**
     * Transform anchor point X, absent if no transform specified
     */
    anchorX?: number;
    /**
     * Transform anchor point Y, absent if no transform specified
     */
    anchorY?: number;
    /**
     * Transform anchor point Z, absent if no transform specified
     */
    anchorZ?: number;
    /**
     * Indicates how many time this layer has painted.
     */
    paintCount: integer;
    /**
     * Indicates whether this layer hosts any content, rather than being used for
     * transform/scrolling purposes only.
     */
    drawsContent: boolean;
    /**
     * Set if layer is not visible.
     */
    invisible?: boolean;
    /**
     * Rectangles scrolling on main thread only.
     */
    scrollRects?: ScrollRect[];
    /**
     * Sticky position constraint information
     */
    stickyPositionConstraint?: StickyPositionConstraint;
}

/**
 * Array of timings, one per paint step.
 */
export type PaintProfile = number[];

export type CompositingReasonsRequest = {
    /**
     * The id of the layer for which we want to get the reasons it was composited.
     */
    layerId: LayerId;
}

export type CompositingReasonsResponse = {
    /**
     * A list of strings specifying reasons for the given layer to become composited.
     */
    compositingReasons: string[];
    /**
     * A list of strings specifying reason IDs for the given layer to become composited.
     */
    compositingReasonIds: string[];
}

export type LoadSnapshotRequest = {
    /**
     * An array of tiles composing the snapshot.
     */
    tiles: PictureTile[];
}

export type LoadSnapshotResponse = {
    /**
     * The id of the snapshot.
     */
    snapshotId: SnapshotId;
}

export type MakeSnapshotRequest = {
    /**
     * The id of the layer.
     */
    layerId: LayerId;
}

export type MakeSnapshotResponse = {
    /**
     * The id of the layer snapshot.
     */
    snapshotId: SnapshotId;
}

export type ProfileSnapshotRequest = {
    /**
     * The id of the layer snapshot.
     */
    snapshotId: SnapshotId;
    /**
     * The maximum number of times to replay the snapshot (1, if not specified).
     */
    minRepeatCount?: integer;
    /**
     * The minimum duration (in seconds) to replay the snapshot.
     */
    minDuration?: number;
    /**
     * The clip rectangle to apply when replaying the snapshot.
     */
    clipRect?: DOM.Rect;
}

export type ProfileSnapshotResponse = {
    /**
     * The array of paint profiles, one per run.
     */
    timings: PaintProfile[];
}

export type ReleaseSnapshotRequest = {
    /**
     * The id of the layer snapshot.
     */
    snapshotId: SnapshotId;
}

export type ReplaySnapshotRequest = {
    /**
     * The id of the layer snapshot.
     */
    snapshotId: SnapshotId;
    /**
     * The first step to replay from (replay from the very start if not specified).
     */
    fromStep?: integer;
    /**
     * The last step to replay to (replay till the end if not specified).
     */
    toStep?: integer;
    /**
     * The scale to apply while replaying (defaults to 1).
     */
    scale?: number;
}

export type ReplaySnapshotResponse = {
    /**
     * A data: URL for resulting image.
     */
    dataURL: string;
}

export type SnapshotCommandLogRequest = {
    /**
     * The id of the layer snapshot.
     */
    snapshotId: SnapshotId;
}

export type SnapshotCommandLogResponse = {
    /**
     * The array of canvas function calls.
     */
    commandLog: any[];
}

export type LayerPaintedEvent = {
    /**
     * The id of the painted layer.
     */
    layerId: LayerId;
    /**
     * Clip rectangle.
     */
    clip: DOM.Rect;
}

export type LayerTreeDidChangeEvent = {
    /**
     * Layer tree, absent if not in the comspositing mode.
     */
    layers?: Layer[];
}

