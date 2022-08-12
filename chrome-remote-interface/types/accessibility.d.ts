import type * as DOM from './dom.d.ts'
import type * as Page from './page.d.ts'
import type * as Runtime from './runtime.d.ts'

export type integer = number;


/**
 * Unique accessibility node identifier.
 */
export type AXNodeId = string;

/**
 * Enum of possible property types.
 */
export type AXValueType = ("boolean" | "tristate" | "booleanOrUndefined" | "idref" | "idrefList" | "integer" | "node" | "nodeList" | "number" | "string" | "computedString" | "token" | "tokenList" | "domRelation" | "role" | "internalRole" | "valueUndefined");

/**
 * Enum of possible property sources.
 */
export type AXValueSourceType = ("attribute" | "implicit" | "style" | "contents" | "placeholder" | "relatedElement");

/**
 * Enum of possible native property sources (as a subtype of a particular AXValueSourceType).
 */
export type AXValueNativeSourceType = ("description" | "figcaption" | "label" | "labelfor" | "labelwrapped" | "legend" | "rubyannotation" | "tablecaption" | "title" | "other");

/**
 * A single source for a computed AX property.
 */
export type AXValueSource = {
    /**
     * What type of source this is.
     */
    type: AXValueSourceType;
    /**
     * The value of this property source.
     */
    value?: AXValue;
    /**
     * The name of the relevant attribute, if any.
     */
    attribute?: string;
    /**
     * The value of the relevant attribute, if any.
     */
    attributeValue?: AXValue;
    /**
     * Whether this source is superseded by a higher priority source.
     */
    superseded?: boolean;
    /**
     * The native markup source for this value, e.g. a <label> element.
     */
    nativeSource?: AXValueNativeSourceType;
    /**
     * The value, such as a node or node list, of the native source.
     */
    nativeSourceValue?: AXValue;
    /**
     * Whether the value for this property is invalid.
     */
    invalid?: boolean;
    /**
     * Reason for the value being invalid, if it is.
     */
    invalidReason?: string;
}

export type AXRelatedNode = {
    /**
     * The BackendNodeId of the related DOM node.
     */
    backendDOMNodeId: DOM.BackendNodeId;
    /**
     * The IDRef value provided, if any.
     */
    idref?: string;
    /**
     * The text alternative of this node in the current context.
     */
    text?: string;
}

export type AXProperty = {
    /**
     * The name of this property.
     */
    name: AXPropertyName;
    /**
     * The value of this property.
     */
    value: AXValue;
}

/**
 * A single computed AX property.
 */
export type AXValue = {
    /**
     * The type of this value.
     */
    type: AXValueType;
    /**
     * The computed value of this property.
     */
    value?: any;
    /**
     * One or more related nodes, if applicable.
     */
    relatedNodes?: AXRelatedNode[];
    /**
     * The sources which contributed to the computation of this property.
     */
    sources?: AXValueSource[];
}

/**
 * Values of AXProperty name:
 * - from 'busy' to 'roledescription': states which apply to every AX node
 * - from 'live' to 'root': attributes which apply to nodes in live regions
 * - from 'autocomplete' to 'valuetext': attributes which apply to widgets
 * - from 'checked' to 'selected': states which apply to widgets
 * - from 'activedescendant' to 'owns' - relationships between elements other than parent/child/sibling.
 */
export type AXPropertyName = ("busy" | "disabled" | "editable" | "focusable" | "focused" | "hidden" | "hiddenRoot" | "invalid" | "keyshortcuts" | "settable" | "roledescription" | "live" | "atomic" | "relevant" | "root" | "autocomplete" | "hasPopup" | "level" | "multiselectable" | "orientation" | "multiline" | "readonly" | "required" | "valuemin" | "valuemax" | "valuetext" | "checked" | "expanded" | "modal" | "pressed" | "selected" | "activedescendant" | "controls" | "describedby" | "details" | "errormessage" | "flowto" | "labelledby" | "owns");

/**
 * A node in the accessibility tree.
 */
export type AXNode = {
    /**
     * Unique identifier for this node.
     */
    nodeId: AXNodeId;
    /**
     * Whether this node is ignored for accessibility
     */
    ignored: boolean;
    /**
     * Collection of reasons why this node is hidden.
     */
    ignoredReasons?: AXProperty[];
    /**
     * This `Node`'s role, whether explicit or implicit.
     */
    role?: AXValue;
    /**
     * The accessible name for this `Node`.
     */
    name?: AXValue;
    /**
     * The accessible description for this `Node`.
     */
    description?: AXValue;
    /**
     * The value for this `Node`.
     */
    value?: AXValue;
    /**
     * All other properties
     */
    properties?: AXProperty[];
    /**
     * ID for this node's parent.
     */
    parentId?: AXNodeId;
    /**
     * IDs for each of this node's child nodes.
     */
    childIds?: AXNodeId[];
    /**
     * The backend ID for the associated DOM node, if any.
     */
    backendDOMNodeId?: DOM.BackendNodeId;
    /**
     * The frame ID for the frame associated with this nodes document.
     */
    frameId?: Page.FrameId;
}

export type GetPartialAXTreeRequest = {
    /**
     * Identifier of the node to get the partial accessibility tree for.
     */
    nodeId?: DOM.NodeId;
    /**
     * Identifier of the backend node to get the partial accessibility tree for.
     */
    backendNodeId?: DOM.BackendNodeId;
    /**
     * JavaScript object id of the node wrapper to get the partial accessibility tree for.
     */
    objectId?: Runtime.RemoteObjectId;
    /**
     * Whether to fetch this nodes ancestors, siblings and children. Defaults to true.
     */
    fetchRelatives?: boolean;
}

export type GetPartialAXTreeResponse = {
    /**
     * The `Accessibility.AXNode` for this DOM node, if it exists, plus its ancestors, siblings and
     * children, if requested.
     */
    nodes: AXNode[];
}

export type GetFullAXTreeRequest = {
    /**
     * The maximum depth at which descendants of the root node should be retrieved.
     * If omitted, the full tree is returned.
     */
    depth?: integer;
    /**
     * Deprecated. This parameter has been renamed to `depth`. If depth is not provided, max_depth will be used.
     */
    max_depth?: integer;
    /**
     * The frame for whose document the AX tree should be retrieved.
     * If omited, the root frame is used.
     */
    frameId?: Page.FrameId;
}

export type GetFullAXTreeResponse = {
    nodes: AXNode[];
}

export type GetRootAXNodeRequest = {
    /**
     * The frame in whose document the node resides.
     * If omitted, the root frame is used.
     */
    frameId?: Page.FrameId;
}

export type GetRootAXNodeResponse = {
    node: AXNode;
}

export type GetAXNodeAndAncestorsRequest = {
    /**
     * Identifier of the node to get.
     */
    nodeId?: DOM.NodeId;
    /**
     * Identifier of the backend node to get.
     */
    backendNodeId?: DOM.BackendNodeId;
    /**
     * JavaScript object id of the node wrapper to get.
     */
    objectId?: Runtime.RemoteObjectId;
}

export type GetAXNodeAndAncestorsResponse = {
    nodes: AXNode[];
}

export type GetChildAXNodesRequest = {
    id: AXNodeId;
    /**
     * The frame in whose document the node resides.
     * If omitted, the root frame is used.
     */
    frameId?: Page.FrameId;
}

export type GetChildAXNodesResponse = {
    nodes: AXNode[];
}

export type QueryAXTreeRequest = {
    /**
     * Identifier of the node for the root to query.
     */
    nodeId?: DOM.NodeId;
    /**
     * Identifier of the backend node for the root to query.
     */
    backendNodeId?: DOM.BackendNodeId;
    /**
     * JavaScript object id of the node wrapper for the root to query.
     */
    objectId?: Runtime.RemoteObjectId;
    /**
     * Find nodes with this computed name.
     */
    accessibleName?: string;
    /**
     * Find nodes with this computed role.
     */
    role?: string;
}

export type QueryAXTreeResponse = {
    /**
     * A list of `Accessibility.AXNode` matching the specified attributes,
     * including nodes that are ignored for accessibility.
     */
    nodes: AXNode[];
}

/**
 * The loadComplete event mirrors the load complete event sent by the browser to assistive
 * technology when the web page has finished loading.
 */
export type LoadCompleteEvent = {
    /**
     * New document root node.
     */
    root: AXNode;
}

/**
 * The nodesUpdated event is sent every time a previously requested node has changed the in tree.
 */
export type NodesUpdatedEvent = {
    /**
     * Updated node data.
     */
    nodes: AXNode[];
}

