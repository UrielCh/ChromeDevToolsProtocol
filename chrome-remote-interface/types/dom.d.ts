import type * as Page from './page.d.ts'
import type * as Runtime from './runtime.d.ts'

export type integer = number;

/**
 * This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object
 * that has an `id`. This `id` can be used to get additional information on the Node, resolve it into
 * the JavaScript object wrapper, etc. It is important that client receives DOM events only for the
 * nodes that are known to the client. Backend keeps track of the nodes that were sent to the client
 * and never sends the same node twice. It is client's responsibility to collect information about
 * the nodes that were sent to the client.<p>Note that `iframe` owner elements will return
 * corresponding document elements as their child nodes.</p>
 */

/**
 * Unique DOM node identifier.
 */
export type NodeId = integer;

/**
 * Unique DOM node identifier used to reference a node that may not have been pushed to the
 * front-end.
 */
export type BackendNodeId = integer;

/**
 * Backend node with a friendly name.
 */
export interface BackendNode {
    /**
     * `Node`'s nodeType.
     */
    nodeType: integer;
    /**
     * `Node`'s nodeName.
     */
    nodeName: string;
    backendNodeId: BackendNodeId;
}

/**
 * Pseudo element type.
 */
export type PseudoType = ("first-line" | "first-letter" | "before" | "after" | "marker" | "backdrop" | "selection" | "target-text" | "spelling-error" | "grammar-error" | "highlight" | "first-line-inherited" | "scrollbar" | "scrollbar-thumb" | "scrollbar-button" | "scrollbar-track" | "scrollbar-track-piece" | "scrollbar-corner" | "resizer" | "input-list-button" | "transition" | "transition-container" | "transition-old-content" | "transition-new-content");

/**
 * Shadow root type.
 */
export type ShadowRootType = ("user-agent" | "open" | "closed");

/**
 * Document compatibility mode.
 */
export type CompatibilityMode = ("QuirksMode" | "LimitedQuirksMode" | "NoQuirksMode");

/**
 * DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
 * DOMNode is a base node mirror type.
 */
export interface Node {
    /**
     * Node identifier that is passed into the rest of the DOM messages as the `nodeId`. Backend
     * will only push node with given `id` once. It is aware of all requested nodes and will only
     * fire DOM events for nodes known to the client.
     */
    nodeId: NodeId;
    /**
     * The id of the parent node if any.
     */
    parentId?: NodeId;
    /**
     * The BackendNodeId for this node.
     */
    backendNodeId: BackendNodeId;
    /**
     * `Node`'s nodeType.
     */
    nodeType: integer;
    /**
     * `Node`'s nodeName.
     */
    nodeName: string;
    /**
     * `Node`'s localName.
     */
    localName: string;
    /**
     * `Node`'s nodeValue.
     */
    nodeValue: string;
    /**
     * Child count for `Container` nodes.
     */
    childNodeCount?: integer;
    /**
     * Child nodes of this node when requested with children.
     */
    children?: Node[];
    /**
     * Attributes of the `Element` node in the form of flat array `[name1, value1, name2, value2]`.
     */
    attributes?: string[];
    /**
     * Document URL that `Document` or `FrameOwner` node points to.
     */
    documentURL?: string;
    /**
     * Base URL that `Document` or `FrameOwner` node uses for URL completion.
     */
    baseURL?: string;
    /**
     * `DocumentType`'s publicId.
     */
    publicId?: string;
    /**
     * `DocumentType`'s systemId.
     */
    systemId?: string;
    /**
     * `DocumentType`'s internalSubset.
     */
    internalSubset?: string;
    /**
     * `Document`'s XML version in case of XML documents.
     */
    xmlVersion?: string;
    /**
     * `Attr`'s name.
     */
    name?: string;
    /**
     * `Attr`'s value.
     */
    value?: string;
    /**
     * Pseudo element type for this node.
     */
    pseudoType?: PseudoType;
    /**
     * Shadow root type.
     */
    shadowRootType?: ShadowRootType;
    /**
     * Frame ID for frame owner elements.
     */
    frameId?: Page.FrameId;
    /**
     * Content document for frame owner elements.
     */
    contentDocument?: Node;
    /**
     * Shadow root list for given element host.
     */
    shadowRoots?: Node[];
    /**
     * Content document fragment for template elements.
     */
    templateContent?: Node;
    /**
     * Pseudo elements associated with this node.
     */
    pseudoElements?: Node[];
    /**
     * Deprecated, as the HTML Imports API has been removed (crbug.com/937746).
     * This property used to return the imported document for the HTMLImport links.
     * The property is always undefined now.
     */
    importedDocument?: Node;
    /**
     * Distributed nodes for given insertion point.
     */
    distributedNodes?: BackendNode[];
    /**
     * Whether the node is SVG.
     */
    isSVG?: boolean;
    compatibilityMode?: CompatibilityMode;
}

/**
 * A structure holding an RGBA color.
 */
export interface RGBA {
    /**
     * The red component, in the [0-255] range.
     */
    r: integer;
    /**
     * The green component, in the [0-255] range.
     */
    g: integer;
    /**
     * The blue component, in the [0-255] range.
     */
    b: integer;
    /**
     * The alpha component, in the [0-1] range (default: 1).
     */
    a?: number;
}

/**
 * An array of quad vertices, x immediately followed by y for each point, points clock-wise.
 */
export type Quad = number[];

/**
 * Box model.
 */
export interface BoxModel {
    /**
     * Content box
     */
    content: Quad;
    /**
     * Padding box
     */
    padding: Quad;
    /**
     * Border box
     */
    border: Quad;
    /**
     * Margin box
     */
    margin: Quad;
    /**
     * Node width
     */
    width: integer;
    /**
     * Node height
     */
    height: integer;
    /**
     * Shape outside coordinates
     */
    shapeOutside?: ShapeOutsideInfo;
}

/**
 * CSS Shape Outside details.
 */
export interface ShapeOutsideInfo {
    /**
     * Shape bounds
     */
    bounds: Quad;
    /**
     * Shape coordinate details
     */
    shape: any[];
    /**
     * Margin shape bounds
     */
    marginShape: any[];
}

/**
 * Rectangle.
 */
export interface Rect {
    /**
     * X coordinate
     */
    x: number;
    /**
     * Y coordinate
     */
    y: number;
    /**
     * Rectangle width
     */
    width: number;
    /**
     * Rectangle height
     */
    height: number;
}

export interface CSSComputedStyleProperty {
    /**
     * Computed style property name.
     */
    name: string;
    /**
     * Computed style property value.
     */
    value: string;
}

export interface CollectClassNamesFromSubtreeRequest {
    /**
     * Id of the node to collect class names.
     */
    nodeId: NodeId;
}

export interface CollectClassNamesFromSubtreeResponse {
    /**
     * Class name list.
     */
    classNames: string[];
}

export interface CopyToRequest {
    /**
     * Id of the node to copy.
     */
    nodeId: NodeId;
    /**
     * Id of the element to drop the copy into.
     */
    targetNodeId: NodeId;
    /**
     * Drop the copy before this node (if absent, the copy becomes the last child of
     * `targetNodeId`).
     */
    insertBeforeNodeId?: NodeId;
}

export interface CopyToResponse {
    /**
     * Id of the node clone.
     */
    nodeId: NodeId;
}

export interface DescribeNodeRequest {
    /**
     * Identifier of the node.
     */
    nodeId?: NodeId;
    /**
     * Identifier of the backend node.
     */
    backendNodeId?: BackendNodeId;
    /**
     * JavaScript object id of the node wrapper.
     */
    objectId?: Runtime.RemoteObjectId;
    /**
     * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
     * entire subtree or provide an integer larger than 0.
     */
    depth?: integer;
    /**
     * Whether or not iframes and shadow roots should be traversed when returning the subtree
     * (default is false).
     */
    pierce?: boolean;
}

export interface DescribeNodeResponse {
    /**
     * Node description.
     */
    node: Node;
}

export interface ScrollIntoViewIfNeededRequest {
    /**
     * Identifier of the node.
     */
    nodeId?: NodeId;
    /**
     * Identifier of the backend node.
     */
    backendNodeId?: BackendNodeId;
    /**
     * JavaScript object id of the node wrapper.
     */
    objectId?: Runtime.RemoteObjectId;
    /**
     * The rect to be scrolled into view, relative to the node's border box, in CSS pixels.
     * When omitted, center of the node will be used, similar to Element.scrollIntoView.
     */
    rect?: Rect;
}

export interface DiscardSearchResultsRequest {
    /**
     * Unique search session identifier.
     */
    searchId: string;
}

export const enum EnableRequestIncludeWhitespace {
    None = "none",
    All = "all",
}

export interface EnableRequest {
    /**
     * Whether to include whitespaces in the children array of returned Nodes. (EnableRequestIncludeWhitespace enum)
     */
    includeWhitespace?: ("none" | "all");
}

export interface FocusRequest {
    /**
     * Identifier of the node.
     */
    nodeId?: NodeId;
    /**
     * Identifier of the backend node.
     */
    backendNodeId?: BackendNodeId;
    /**
     * JavaScript object id of the node wrapper.
     */
    objectId?: Runtime.RemoteObjectId;
}

export interface GetAttributesRequest {
    /**
     * Id of the node to retrieve attibutes for.
     */
    nodeId: NodeId;
}

export interface GetAttributesResponse {
    /**
     * An interleaved array of node attribute names and values.
     */
    attributes: string[];
}

export interface GetBoxModelRequest {
    /**
     * Identifier of the node.
     */
    nodeId?: NodeId;
    /**
     * Identifier of the backend node.
     */
    backendNodeId?: BackendNodeId;
    /**
     * JavaScript object id of the node wrapper.
     */
    objectId?: Runtime.RemoteObjectId;
}

export interface GetBoxModelResponse {
    /**
     * Box model for the node.
     */
    model: BoxModel;
}

export interface GetContentQuadsRequest {
    /**
     * Identifier of the node.
     */
    nodeId?: NodeId;
    /**
     * Identifier of the backend node.
     */
    backendNodeId?: BackendNodeId;
    /**
     * JavaScript object id of the node wrapper.
     */
    objectId?: Runtime.RemoteObjectId;
}

export interface GetContentQuadsResponse {
    /**
     * Quads that describe node layout relative to viewport.
     */
    quads: Quad[];
}

export interface GetDocumentRequest {
    /**
     * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
     * entire subtree or provide an integer larger than 0.
     */
    depth?: integer;
    /**
     * Whether or not iframes and shadow roots should be traversed when returning the subtree
     * (default is false).
     */
    pierce?: boolean;
}

export interface GetDocumentResponse {
    /**
     * Resulting node.
     */
    root: Node;
}

export interface GetFlattenedDocumentRequest {
    /**
     * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
     * entire subtree or provide an integer larger than 0.
     */
    depth?: integer;
    /**
     * Whether or not iframes and shadow roots should be traversed when returning the subtree
     * (default is false).
     */
    pierce?: boolean;
}

export interface GetFlattenedDocumentResponse {
    /**
     * Resulting node.
     */
    nodes: Node[];
}

export interface GetNodesForSubtreeByStyleRequest {
    /**
     * Node ID pointing to the root of a subtree.
     */
    nodeId: NodeId;
    /**
     * The style to filter nodes by (includes nodes if any of properties matches).
     */
    computedStyles: CSSComputedStyleProperty[];
    /**
     * Whether or not iframes and shadow roots in the same target should be traversed when returning the
     * results (default is false).
     */
    pierce?: boolean;
}

export interface GetNodesForSubtreeByStyleResponse {
    /**
     * Resulting nodes.
     */
    nodeIds: NodeId[];
}

export interface GetNodeForLocationRequest {
    /**
     * X coordinate.
     */
    x: integer;
    /**
     * Y coordinate.
     */
    y: integer;
    /**
     * False to skip to the nearest non-UA shadow root ancestor (default: false).
     */
    includeUserAgentShadowDOM?: boolean;
    /**
     * Whether to ignore pointer-events: none on elements and hit test them.
     */
    ignorePointerEventsNone?: boolean;
}

export interface GetNodeForLocationResponse {
    /**
     * Resulting node.
     */
    backendNodeId: BackendNodeId;
    /**
     * Frame this node belongs to.
     */
    frameId: Page.FrameId;
    /**
     * Id of the node at given coordinates, only when enabled and requested document.
     */
    nodeId?: NodeId;
}

export interface GetOuterHTMLRequest {
    /**
     * Identifier of the node.
     */
    nodeId?: NodeId;
    /**
     * Identifier of the backend node.
     */
    backendNodeId?: BackendNodeId;
    /**
     * JavaScript object id of the node wrapper.
     */
    objectId?: Runtime.RemoteObjectId;
}

export interface GetOuterHTMLResponse {
    /**
     * Outer HTML markup.
     */
    outerHTML: string;
}

export interface GetRelayoutBoundaryRequest {
    /**
     * Id of the node.
     */
    nodeId: NodeId;
}

export interface GetRelayoutBoundaryResponse {
    /**
     * Relayout boundary node id for the given node.
     */
    nodeId: NodeId;
}

export interface GetSearchResultsRequest {
    /**
     * Unique search session identifier.
     */
    searchId: string;
    /**
     * Start index of the search result to be returned.
     */
    fromIndex: integer;
    /**
     * End index of the search result to be returned.
     */
    toIndex: integer;
}

export interface GetSearchResultsResponse {
    /**
     * Ids of the search result nodes.
     */
    nodeIds: NodeId[];
}

export interface MoveToRequest {
    /**
     * Id of the node to move.
     */
    nodeId: NodeId;
    /**
     * Id of the element to drop the moved node into.
     */
    targetNodeId: NodeId;
    /**
     * Drop node before this one (if absent, the moved node becomes the last child of
     * `targetNodeId`).
     */
    insertBeforeNodeId?: NodeId;
}

export interface MoveToResponse {
    /**
     * New id of the moved node.
     */
    nodeId: NodeId;
}

export interface PerformSearchRequest {
    /**
     * Plain text or query selector or XPath search query.
     */
    query: string;
    /**
     * True to search in user agent shadow DOM.
     */
    includeUserAgentShadowDOM?: boolean;
}

export interface PerformSearchResponse {
    /**
     * Unique search session identifier.
     */
    searchId: string;
    /**
     * Number of search results.
     */
    resultCount: integer;
}

export interface PushNodeByPathToFrontendRequest {
    /**
     * Path to node in the proprietary format.
     */
    path: string;
}

export interface PushNodeByPathToFrontendResponse {
    /**
     * Id of the node for given path.
     */
    nodeId: NodeId;
}

export interface PushNodesByBackendIdsToFrontendRequest {
    /**
     * The array of backend node ids.
     */
    backendNodeIds: BackendNodeId[];
}

export interface PushNodesByBackendIdsToFrontendResponse {
    /**
     * The array of ids of pushed nodes that correspond to the backend ids specified in
     * backendNodeIds.
     */
    nodeIds: NodeId[];
}

export interface QuerySelectorRequest {
    /**
     * Id of the node to query upon.
     */
    nodeId: NodeId;
    /**
     * Selector string.
     */
    selector: string;
}

export interface QuerySelectorResponse {
    /**
     * Query selector result.
     */
    nodeId: NodeId;
}

export interface QuerySelectorAllRequest {
    /**
     * Id of the node to query upon.
     */
    nodeId: NodeId;
    /**
     * Selector string.
     */
    selector: string;
}

export interface QuerySelectorAllResponse {
    /**
     * Query selector result.
     */
    nodeIds: NodeId[];
}

export interface RemoveAttributeRequest {
    /**
     * Id of the element to remove attribute from.
     */
    nodeId: NodeId;
    /**
     * Name of the attribute to remove.
     */
    name: string;
}

export interface RemoveNodeRequest {
    /**
     * Id of the node to remove.
     */
    nodeId: NodeId;
}

export interface RequestChildNodesRequest {
    /**
     * Id of the node to get children for.
     */
    nodeId: NodeId;
    /**
     * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
     * entire subtree or provide an integer larger than 0.
     */
    depth?: integer;
    /**
     * Whether or not iframes and shadow roots should be traversed when returning the sub-tree
     * (default is false).
     */
    pierce?: boolean;
}

export interface RequestNodeRequest {
    /**
     * JavaScript object id to convert into node.
     */
    objectId: Runtime.RemoteObjectId;
}

export interface RequestNodeResponse {
    /**
     * Node id for given object.
     */
    nodeId: NodeId;
}

export interface ResolveNodeRequest {
    /**
     * Id of the node to resolve.
     */
    nodeId?: NodeId;
    /**
     * Backend identifier of the node to resolve.
     */
    backendNodeId?: BackendNodeId;
    /**
     * Symbolic group name that can be used to release multiple objects.
     */
    objectGroup?: string;
    /**
     * Execution context in which to resolve the node.
     */
    executionContextId?: Runtime.ExecutionContextId;
}

export interface ResolveNodeResponse {
    /**
     * JavaScript object wrapper for given node.
     */
    object: Runtime.RemoteObject;
}

export interface SetAttributeValueRequest {
    /**
     * Id of the element to set attribute for.
     */
    nodeId: NodeId;
    /**
     * Attribute name.
     */
    name: string;
    /**
     * Attribute value.
     */
    value: string;
}

export interface SetAttributesAsTextRequest {
    /**
     * Id of the element to set attributes for.
     */
    nodeId: NodeId;
    /**
     * Text with a number of attributes. Will parse this text using HTML parser.
     */
    text: string;
    /**
     * Attribute name to replace with new attributes derived from text in case text parsed
     * successfully.
     */
    name?: string;
}

export interface SetFileInputFilesRequest {
    /**
     * Array of file paths to set.
     */
    files: string[];
    /**
     * Identifier of the node.
     */
    nodeId?: NodeId;
    /**
     * Identifier of the backend node.
     */
    backendNodeId?: BackendNodeId;
    /**
     * JavaScript object id of the node wrapper.
     */
    objectId?: Runtime.RemoteObjectId;
}

export interface SetNodeStackTracesEnabledRequest {
    /**
     * Enable or disable.
     */
    enable: boolean;
}

export interface GetNodeStackTracesRequest {
    /**
     * Id of the node to get stack traces for.
     */
    nodeId: NodeId;
}

export interface GetNodeStackTracesResponse {
    /**
     * Creation stack trace, if available.
     */
    creation?: Runtime.StackTrace;
}

export interface GetFileInfoRequest {
    /**
     * JavaScript object id of the node wrapper.
     */
    objectId: Runtime.RemoteObjectId;
}

export interface GetFileInfoResponse {
    path: string;
}

export interface SetInspectedNodeRequest {
    /**
     * DOM node id to be accessible by means of $x command line API.
     */
    nodeId: NodeId;
}

export interface SetNodeNameRequest {
    /**
     * Id of the node to set name for.
     */
    nodeId: NodeId;
    /**
     * New node's name.
     */
    name: string;
}

export interface SetNodeNameResponse {
    /**
     * New node's id.
     */
    nodeId: NodeId;
}

export interface SetNodeValueRequest {
    /**
     * Id of the node to set value for.
     */
    nodeId: NodeId;
    /**
     * New node's value.
     */
    value: string;
}

export interface SetOuterHTMLRequest {
    /**
     * Id of the node to set markup for.
     */
    nodeId: NodeId;
    /**
     * Outer HTML markup to set.
     */
    outerHTML: string;
}

export interface GetFrameOwnerRequest {
    frameId: Page.FrameId;
}

export interface GetFrameOwnerResponse {
    /**
     * Resulting node.
     */
    backendNodeId: BackendNodeId;
    /**
     * Id of the node at given coordinates, only when enabled and requested document.
     */
    nodeId?: NodeId;
}

export interface GetContainerForNodeRequest {
    nodeId: NodeId;
    containerName?: string;
}

export interface GetContainerForNodeResponse {
    /**
     * The container node for the given node, or null if not found.
     */
    nodeId?: NodeId;
}

export interface GetQueryingDescendantsForContainerRequest {
    /**
     * Id of the container node to find querying descendants from.
     */
    nodeId: NodeId;
}

export interface GetQueryingDescendantsForContainerResponse {
    /**
     * Descendant nodes with container queries against the given container.
     */
    nodeIds: NodeId[];
}

/**
 * Fired when `Element`'s attribute is modified.
 */
export interface AttributeModifiedEvent {
    /**
     * Id of the node that has changed.
     */
    nodeId: NodeId;
    /**
     * Attribute name.
     */
    name: string;
    /**
     * Attribute value.
     */
    value: string;
}

/**
 * Fired when `Element`'s attribute is removed.
 */
export interface AttributeRemovedEvent {
    /**
     * Id of the node that has changed.
     */
    nodeId: NodeId;
    /**
     * A ttribute name.
     */
    name: string;
}

/**
 * Mirrors `DOMCharacterDataModified` event.
 */
export interface CharacterDataModifiedEvent {
    /**
     * Id of the node that has changed.
     */
    nodeId: NodeId;
    /**
     * New text value.
     */
    characterData: string;
}

/**
 * Fired when `Container`'s child node count has changed.
 */
export interface ChildNodeCountUpdatedEvent {
    /**
     * Id of the node that has changed.
     */
    nodeId: NodeId;
    /**
     * New node count.
     */
    childNodeCount: integer;
}

/**
 * Mirrors `DOMNodeInserted` event.
 */
export interface ChildNodeInsertedEvent {
    /**
     * Id of the node that has changed.
     */
    parentNodeId: NodeId;
    /**
     * If of the previous siblint.
     */
    previousNodeId: NodeId;
    /**
     * Inserted node data.
     */
    node: Node;
}

/**
 * Mirrors `DOMNodeRemoved` event.
 */
export interface ChildNodeRemovedEvent {
    /**
     * Parent id.
     */
    parentNodeId: NodeId;
    /**
     * Id of the node that has been removed.
     */
    nodeId: NodeId;
}

/**
 * Called when distribution is changed.
 */
export interface DistributedNodesUpdatedEvent {
    /**
     * Insertion point where distributed nodes were updated.
     */
    insertionPointId: NodeId;
    /**
     * Distributed nodes for given insertion point.
     */
    distributedNodes: BackendNode[];
}

/**
 * Fired when `Element`'s inline style is modified via a CSS property modification.
 */
export interface InlineStyleInvalidatedEvent {
    /**
     * Ids of the nodes for which the inline styles have been invalidated.
     */
    nodeIds: NodeId[];
}

/**
 * Called when a pseudo element is added to an element.
 */
export interface PseudoElementAddedEvent {
    /**
     * Pseudo element's parent element id.
     */
    parentId: NodeId;
    /**
     * The added pseudo element.
     */
    pseudoElement: Node;
}

/**
 * Called when a pseudo element is removed from an element.
 */
export interface PseudoElementRemovedEvent {
    /**
     * Pseudo element's parent element id.
     */
    parentId: NodeId;
    /**
     * The removed pseudo element id.
     */
    pseudoElementId: NodeId;
}

/**
 * Fired when backend wants to provide client with the missing DOM structure. This happens upon
 * most of the calls requesting node ids.
 */
export interface SetChildNodesEvent {
    /**
     * Parent node id to populate with children.
     */
    parentId: NodeId;
    /**
     * Child nodes array.
     */
    nodes: Node[];
}

/**
 * Called when shadow root is popped from the element.
 */
export interface ShadowRootPoppedEvent {
    /**
     * Host element id.
     */
    hostId: NodeId;
    /**
     * Shadow root id.
     */
    rootId: NodeId;
}

/**
 * Called when shadow root is pushed into the element.
 */
export interface ShadowRootPushedEvent {
    /**
     * Host element id.
     */
    hostId: NodeId;
    /**
     * Shadow root.
     */
    root: Node;
}

