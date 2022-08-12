import type * as DOM from './dom.d.ts'
import type * as Page from './page.d.ts'
import type * as Runtime from './runtime.d.ts'

export type integer = number;

/**
 * This domain provides various functionality related to drawing atop the inspected page.
 */

/**
 * Configuration data for drawing the source order of an elements children.
 */
export type SourceOrderConfig = {
    /**
     * the color to outline the givent element in.
     */
    parentOutlineColor: DOM.RGBA;
    /**
     * the color to outline the child elements in.
     */
    childOutlineColor: DOM.RGBA;
}

/**
 * Configuration data for the highlighting of Grid elements.
 */
export type GridHighlightConfig = {
    /**
     * Whether the extension lines from grid cells to the rulers should be shown (default: false).
     */
    showGridExtensionLines?: boolean;
    /**
     * Show Positive line number labels (default: false).
     */
    showPositiveLineNumbers?: boolean;
    /**
     * Show Negative line number labels (default: false).
     */
    showNegativeLineNumbers?: boolean;
    /**
     * Show area name labels (default: false).
     */
    showAreaNames?: boolean;
    /**
     * Show line name labels (default: false).
     */
    showLineNames?: boolean;
    /**
     * Show track size labels (default: false).
     */
    showTrackSizes?: boolean;
    /**
     * The grid container border highlight color (default: transparent).
     */
    gridBorderColor?: DOM.RGBA;
    /**
     * The cell border color (default: transparent). Deprecated, please use rowLineColor and columnLineColor instead.
     */
    cellBorderColor?: DOM.RGBA;
    /**
     * The row line color (default: transparent).
     */
    rowLineColor?: DOM.RGBA;
    /**
     * The column line color (default: transparent).
     */
    columnLineColor?: DOM.RGBA;
    /**
     * Whether the grid border is dashed (default: false).
     */
    gridBorderDash?: boolean;
    /**
     * Whether the cell border is dashed (default: false). Deprecated, please us rowLineDash and columnLineDash instead.
     */
    cellBorderDash?: boolean;
    /**
     * Whether row lines are dashed (default: false).
     */
    rowLineDash?: boolean;
    /**
     * Whether column lines are dashed (default: false).
     */
    columnLineDash?: boolean;
    /**
     * The row gap highlight fill color (default: transparent).
     */
    rowGapColor?: DOM.RGBA;
    /**
     * The row gap hatching fill color (default: transparent).
     */
    rowHatchColor?: DOM.RGBA;
    /**
     * The column gap highlight fill color (default: transparent).
     */
    columnGapColor?: DOM.RGBA;
    /**
     * The column gap hatching fill color (default: transparent).
     */
    columnHatchColor?: DOM.RGBA;
    /**
     * The named grid areas border color (Default: transparent).
     */
    areaBorderColor?: DOM.RGBA;
    /**
     * The grid container background color (Default: transparent).
     */
    gridBackgroundColor?: DOM.RGBA;
}

/**
 * Configuration data for the highlighting of Flex container elements.
 */
export type FlexContainerHighlightConfig = {
    /**
     * The style of the container border
     */
    containerBorder?: LineStyle;
    /**
     * The style of the separator between lines
     */
    lineSeparator?: LineStyle;
    /**
     * The style of the separator between items
     */
    itemSeparator?: LineStyle;
    /**
     * Style of content-distribution space on the main axis (justify-content).
     */
    mainDistributedSpace?: BoxStyle;
    /**
     * Style of content-distribution space on the cross axis (align-content).
     */
    crossDistributedSpace?: BoxStyle;
    /**
     * Style of empty space caused by row gaps (gap/row-gap).
     */
    rowGapSpace?: BoxStyle;
    /**
     * Style of empty space caused by columns gaps (gap/column-gap).
     */
    columnGapSpace?: BoxStyle;
    /**
     * Style of the self-alignment line (align-items).
     */
    crossAlignment?: LineStyle;
}

/**
 * Configuration data for the highlighting of Flex item elements.
 */
export type FlexItemHighlightConfig = {
    /**
     * Style of the box representing the item's base size
     */
    baseSizeBox?: BoxStyle;
    /**
     * Style of the border around the box representing the item's base size
     */
    baseSizeBorder?: LineStyle;
    /**
     * Style of the arrow representing if the item grew or shrank
     */
    flexibilityArrow?: LineStyle;
}

export const enum LineStylePattern {
    Dashed = "dashed",
    Dotted = "dotted",
}

/**
 * Style information for drawing a line.
 */
export type LineStyle = {
    /**
     * The color of the line (default: transparent)
     */
    color?: DOM.RGBA;
    /**
     * The line pattern (default: solid) (LineStylePattern enum)
     */
    pattern?: ("dashed" | "dotted");
}

/**
 * Style information for drawing a box.
 */
export type BoxStyle = {
    /**
     * The background color for the box (default: transparent)
     */
    fillColor?: DOM.RGBA;
    /**
     * The hatching color for the box (default: transparent)
     */
    hatchColor?: DOM.RGBA;
}

export type ContrastAlgorithm = ("aa" | "aaa" | "apca");

/**
 * Configuration data for the highlighting of page elements.
 */
export type HighlightConfig = {
    /**
     * Whether the node info tooltip should be shown (default: false).
     */
    showInfo?: boolean;
    /**
     * Whether the node styles in the tooltip (default: false).
     */
    showStyles?: boolean;
    /**
     * Whether the rulers should be shown (default: false).
     */
    showRulers?: boolean;
    /**
     * Whether the a11y info should be shown (default: true).
     */
    showAccessibilityInfo?: boolean;
    /**
     * Whether the extension lines from node to the rulers should be shown (default: false).
     */
    showExtensionLines?: boolean;
    /**
     * The content box highlight fill color (default: transparent).
     */
    contentColor?: DOM.RGBA;
    /**
     * The padding highlight fill color (default: transparent).
     */
    paddingColor?: DOM.RGBA;
    /**
     * The border highlight fill color (default: transparent).
     */
    borderColor?: DOM.RGBA;
    /**
     * The margin highlight fill color (default: transparent).
     */
    marginColor?: DOM.RGBA;
    /**
     * The event target element highlight fill color (default: transparent).
     */
    eventTargetColor?: DOM.RGBA;
    /**
     * The shape outside fill color (default: transparent).
     */
    shapeColor?: DOM.RGBA;
    /**
     * The shape margin fill color (default: transparent).
     */
    shapeMarginColor?: DOM.RGBA;
    /**
     * The grid layout color (default: transparent).
     */
    cssGridColor?: DOM.RGBA;
    /**
     * The color format used to format color styles (default: hex).
     */
    colorFormat?: ColorFormat;
    /**
     * The grid layout highlight configuration (default: all transparent).
     */
    gridHighlightConfig?: GridHighlightConfig;
    /**
     * The flex container highlight configuration (default: all transparent).
     */
    flexContainerHighlightConfig?: FlexContainerHighlightConfig;
    /**
     * The flex item highlight configuration (default: all transparent).
     */
    flexItemHighlightConfig?: FlexItemHighlightConfig;
    /**
     * The contrast algorithm to use for the contrast ratio (default: aa).
     */
    contrastAlgorithm?: ContrastAlgorithm;
    /**
     * The container query container highlight configuration (default: all transparent).
     */
    containerQueryContainerHighlightConfig?: ContainerQueryContainerHighlightConfig;
}

export type ColorFormat = ("rgb" | "hsl" | "hex");

/**
 * Configurations for Persistent Grid Highlight
 */
export type GridNodeHighlightConfig = {
    /**
     * A descriptor for the highlight appearance.
     */
    gridHighlightConfig: GridHighlightConfig;
    /**
     * Identifier of the node to highlight.
     */
    nodeId: DOM.NodeId;
}

export type FlexNodeHighlightConfig = {
    /**
     * A descriptor for the highlight appearance of flex containers.
     */
    flexContainerHighlightConfig: FlexContainerHighlightConfig;
    /**
     * Identifier of the node to highlight.
     */
    nodeId: DOM.NodeId;
}

export type ScrollSnapContainerHighlightConfig = {
    /**
     * The style of the snapport border (default: transparent)
     */
    snapportBorder?: LineStyle;
    /**
     * The style of the snap area border (default: transparent)
     */
    snapAreaBorder?: LineStyle;
    /**
     * The margin highlight fill color (default: transparent).
     */
    scrollMarginColor?: DOM.RGBA;
    /**
     * The padding highlight fill color (default: transparent).
     */
    scrollPaddingColor?: DOM.RGBA;
}

export type ScrollSnapHighlightConfig = {
    /**
     * A descriptor for the highlight appearance of scroll snap containers.
     */
    scrollSnapContainerHighlightConfig: ScrollSnapContainerHighlightConfig;
    /**
     * Identifier of the node to highlight.
     */
    nodeId: DOM.NodeId;
}

/**
 * Configuration for dual screen hinge
 */
export type HingeConfig = {
    /**
     * A rectangle represent hinge
     */
    rect: DOM.Rect;
    /**
     * The content box highlight fill color (default: a dark color).
     */
    contentColor?: DOM.RGBA;
    /**
     * The content box highlight outline color (default: transparent).
     */
    outlineColor?: DOM.RGBA;
}

export type ContainerQueryHighlightConfig = {
    /**
     * A descriptor for the highlight appearance of container query containers.
     */
    containerQueryContainerHighlightConfig: ContainerQueryContainerHighlightConfig;
    /**
     * Identifier of the container node to highlight.
     */
    nodeId: DOM.NodeId;
}

export type ContainerQueryContainerHighlightConfig = {
    /**
     * The style of the container border.
     */
    containerBorder?: LineStyle;
    /**
     * The style of the descendants' borders.
     */
    descendantBorder?: LineStyle;
}

export type IsolatedElementHighlightConfig = {
    /**
     * A descriptor for the highlight appearance of an element in isolation mode.
     */
    isolationModeHighlightConfig: IsolationModeHighlightConfig;
    /**
     * Identifier of the isolated element to highlight.
     */
    nodeId: DOM.NodeId;
}

export type IsolationModeHighlightConfig = {
    /**
     * The fill color of the resizers (default: transparent).
     */
    resizerColor?: DOM.RGBA;
    /**
     * The fill color for resizer handles (default: transparent).
     */
    resizerHandleColor?: DOM.RGBA;
    /**
     * The fill color for the mask covering non-isolated elements (default: transparent).
     */
    maskColor?: DOM.RGBA;
}

export type InspectMode = ("searchForNode" | "searchForUAShadowDOM" | "captureAreaScreenshot" | "showDistances" | "none");

export type GetHighlightObjectForTestRequest = {
    /**
     * Id of the node to get highlight object for.
     */
    nodeId: DOM.NodeId;
    /**
     * Whether to include distance info.
     */
    includeDistance?: boolean;
    /**
     * Whether to include style info.
     */
    includeStyle?: boolean;
    /**
     * The color format to get config with (default: hex).
     */
    colorFormat?: ColorFormat;
    /**
     * Whether to show accessibility info (default: true).
     */
    showAccessibilityInfo?: boolean;
}

export type GetHighlightObjectForTestResponse = {
    /**
     * Highlight data for the node.
     */
    highlight: any;
}

export type GetGridHighlightObjectsForTestRequest = {
    /**
     * Ids of the node to get highlight object for.
     */
    nodeIds: DOM.NodeId[];
}

export type GetGridHighlightObjectsForTestResponse = {
    /**
     * Grid Highlight data for the node ids provided.
     */
    highlights: any;
}

export type GetSourceOrderHighlightObjectForTestRequest = {
    /**
     * Id of the node to highlight.
     */
    nodeId: DOM.NodeId;
}

export type GetSourceOrderHighlightObjectForTestResponse = {
    /**
     * Source order highlight data for the node id provided.
     */
    highlight: any;
}

export type HighlightFrameRequest = {
    /**
     * Identifier of the frame to highlight.
     */
    frameId: Page.FrameId;
    /**
     * The content box highlight fill color (default: transparent).
     */
    contentColor?: DOM.RGBA;
    /**
     * The content box highlight outline color (default: transparent).
     */
    contentOutlineColor?: DOM.RGBA;
}

export type HighlightNodeRequest = {
    /**
     * A descriptor for the highlight appearance.
     */
    highlightConfig: HighlightConfig;
    /**
     * Identifier of the node to highlight.
     */
    nodeId?: DOM.NodeId;
    /**
     * Identifier of the backend node to highlight.
     */
    backendNodeId?: DOM.BackendNodeId;
    /**
     * JavaScript object id of the node to be highlighted.
     */
    objectId?: Runtime.RemoteObjectId;
    /**
     * Selectors to highlight relevant nodes.
     */
    selector?: string;
}

export type HighlightQuadRequest = {
    /**
     * Quad to highlight
     */
    quad: DOM.Quad;
    /**
     * The highlight fill color (default: transparent).
     */
    color?: DOM.RGBA;
    /**
     * The highlight outline color (default: transparent).
     */
    outlineColor?: DOM.RGBA;
}

export type HighlightRectRequest = {
    /**
     * X coordinate
     */
    x: integer;
    /**
     * Y coordinate
     */
    y: integer;
    /**
     * Rectangle width
     */
    width: integer;
    /**
     * Rectangle height
     */
    height: integer;
    /**
     * The highlight fill color (default: transparent).
     */
    color?: DOM.RGBA;
    /**
     * The highlight outline color (default: transparent).
     */
    outlineColor?: DOM.RGBA;
}

export type HighlightSourceOrderRequest = {
    /**
     * A descriptor for the appearance of the overlay drawing.
     */
    sourceOrderConfig: SourceOrderConfig;
    /**
     * Identifier of the node to highlight.
     */
    nodeId?: DOM.NodeId;
    /**
     * Identifier of the backend node to highlight.
     */
    backendNodeId?: DOM.BackendNodeId;
    /**
     * JavaScript object id of the node to be highlighted.
     */
    objectId?: Runtime.RemoteObjectId;
}

export type SetInspectModeRequest = {
    /**
     * Set an inspection mode.
     */
    mode: InspectMode;
    /**
     * A descriptor for the highlight appearance of hovered-over nodes. May be omitted if `enabled
     * == false`.
     */
    highlightConfig?: HighlightConfig;
}

export type SetShowAdHighlightsRequest = {
    /**
     * True for showing ad highlights
     */
    show: boolean;
}

export type SetPausedInDebuggerMessageRequest = {
    /**
     * The message to display, also triggers resume and step over controls.
     */
    message?: string;
}

export type SetShowDebugBordersRequest = {
    /**
     * True for showing debug borders
     */
    show: boolean;
}

export type SetShowFPSCounterRequest = {
    /**
     * True for showing the FPS counter
     */
    show: boolean;
}

export type SetShowGridOverlaysRequest = {
    /**
     * An array of node identifiers and descriptors for the highlight appearance.
     */
    gridNodeHighlightConfigs: GridNodeHighlightConfig[];
}

export type SetShowFlexOverlaysRequest = {
    /**
     * An array of node identifiers and descriptors for the highlight appearance.
     */
    flexNodeHighlightConfigs: FlexNodeHighlightConfig[];
}

export type SetShowScrollSnapOverlaysRequest = {
    /**
     * An array of node identifiers and descriptors for the highlight appearance.
     */
    scrollSnapHighlightConfigs: ScrollSnapHighlightConfig[];
}

export type SetShowContainerQueryOverlaysRequest = {
    /**
     * An array of node identifiers and descriptors for the highlight appearance.
     */
    containerQueryHighlightConfigs: ContainerQueryHighlightConfig[];
}

export type SetShowPaintRectsRequest = {
    /**
     * True for showing paint rectangles
     */
    result: boolean;
}

export type SetShowLayoutShiftRegionsRequest = {
    /**
     * True for showing layout shift regions
     */
    result: boolean;
}

export type SetShowScrollBottleneckRectsRequest = {
    /**
     * True for showing scroll bottleneck rects
     */
    show: boolean;
}

export type SetShowHitTestBordersRequest = {
    /**
     * True for showing hit-test borders
     */
    show: boolean;
}

export type SetShowWebVitalsRequest = {
    show: boolean;
}

export type SetShowViewportSizeOnResizeRequest = {
    /**
     * Whether to paint size or not.
     */
    show: boolean;
}

export type SetShowHingeRequest = {
    /**
     * hinge data, null means hideHinge
     */
    hingeConfig?: HingeConfig;
}

export type SetShowIsolatedElementsRequest = {
    /**
     * An array of node identifiers and descriptors for the highlight appearance.
     */
    isolatedElementHighlightConfigs: IsolatedElementHighlightConfig[];
}

/**
 * Fired when the node should be inspected. This happens after call to `setInspectMode` or when
 * user manually inspects an element.
 */
export type InspectNodeRequestedEvent = {
    /**
     * Id of the node to inspect.
     */
    backendNodeId: DOM.BackendNodeId;
}

/**
 * Fired when the node should be highlighted. This happens after call to `setInspectMode`.
 */
export type NodeHighlightRequestedEvent = {
    nodeId: DOM.NodeId;
}

/**
 * Fired when user asks to capture screenshot of some area on the page.
 */
export type ScreenshotRequestedEvent = {
    /**
     * Viewport to capture, in device independent pixels (dip).
     */
    viewport: Page.Viewport;
}

