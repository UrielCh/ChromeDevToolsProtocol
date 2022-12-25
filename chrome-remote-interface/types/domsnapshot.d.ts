import type * as DOM from './dom.d.ts'
import type * as Page from './page.d.ts'
import type * as DOMDebugger from './domdebugger.d.ts'

export type integer = number;

/**
 * This domain facilitates obtaining document snapshots with DOM, layout, and style information.
 */

/**
 * A Node in the DOM tree.
 */
export type DOMNode = {
    /**
     * `Node`'s nodeType.
     */
    nodeType: integer;
    /**
     * `Node`'s nodeName.
     */
    nodeName: string;
    /**
     * `Node`'s nodeValue.
     */
    nodeValue: string;
    /**
     * Only set for textarea elements, contains the text value.
     */
    textValue?: string;
    /**
     * Only set for input elements, contains the input's associated text value.
     */
    inputValue?: string;
    /**
     * Only set for radio and checkbox input elements, indicates if the element has been checked
     */
    inputChecked?: boolean;
    /**
     * Only set for option elements, indicates if the element has been selected
     */
    optionSelected?: boolean;
    /**
     * `Node`'s id, corresponds to DOM.Node.backendNodeId.
     */
    backendNodeId: DOM.BackendNodeId;
    /**
     * The indexes of the node's child nodes in the `domNodes` array returned by `getSnapshot`, if
     * any.
     */
    childNodeIndexes?: integer[];
    /**
     * Attributes of an `Element` node.
     */
    attributes?: NameValue[];
    /**
     * Indexes of pseudo elements associated with this node in the `domNodes` array returned by
     * `getSnapshot`, if any.
     */
    pseudoElementIndexes?: integer[];
    /**
     * The index of the node's related layout tree node in the `layoutTreeNodes` array returned by
     * `getSnapshot`, if any.
     */
    layoutNodeIndex?: integer;
    /**
     * Document URL that `Document` or `FrameOwner` node points to.
     */
    documentURL?: string;
    /**
     * Base URL that `Document` or `FrameOwner` node uses for URL completion.
     */
    baseURL?: string;
    /**
     * Only set for documents, contains the document's content language.
     */
    contentLanguage?: string;
    /**
     * Only set for documents, contains the document's character set encoding.
     */
    documentEncoding?: string;
    /**
     * `DocumentType` node's publicId.
     */
    publicId?: string;
    /**
     * `DocumentType` node's systemId.
     */
    systemId?: string;
    /**
     * Frame ID for frame owner elements and also for the document node.
     */
    frameId?: Page.FrameId;
    /**
     * The index of a frame owner element's content document in the `domNodes` array returned by
     * `getSnapshot`, if any.
     */
    contentDocumentIndex?: integer;
    /**
     * Type of a pseudo element node.
     */
    pseudoType?: DOM.PseudoType;
    /**
     * Shadow root type.
     */
    shadowRootType?: DOM.ShadowRootType;
    /**
     * Whether this DOM node responds to mouse clicks. This includes nodes that have had click
     * event listeners attached via JavaScript as well as anchor tags that naturally navigate when
     * clicked.
     */
    isClickable?: boolean;
    /**
     * Details of the node's event listeners, if any.
     */
    eventListeners?: DOMDebugger.EventListener[];
    /**
     * The selected url for nodes with a srcset attribute.
     */
    currentSourceURL?: string;
    /**
     * The url of the script (if any) that generates this node.
     */
    originURL?: string;
    /**
     * Scroll offsets, set when this node is a Document.
     */
    scrollOffsetX?: number;
    scrollOffsetY?: number;
}

/**
 * Details of post layout rendered text positions. The exact layout should not be regarded as
 * stable and may change between versions.
 */
export type InlineTextBox = {
    /**
     * The bounding box in document coordinates. Note that scroll offset of the document is ignored.
     */
    boundingBox: DOM.Rect;
    /**
     * The starting index in characters, for this post layout textbox substring. Characters that
     * would be represented as a surrogate pair in UTF-16 have length 2.
     */
    startCharacterIndex: integer;
    /**
     * The number of characters in this post layout textbox substring. Characters that would be
     * represented as a surrogate pair in UTF-16 have length 2.
     */
    numCharacters: integer;
}

/**
 * Details of an element in the DOM tree with a LayoutObject.
 */
export type LayoutTreeNode = {
    /**
     * The index of the related DOM node in the `domNodes` array returned by `getSnapshot`.
     */
    domNodeIndex: integer;
    /**
     * The bounding box in document coordinates. Note that scroll offset of the document is ignored.
     */
    boundingBox: DOM.Rect;
    /**
     * Contents of the LayoutText, if any.
     */
    layoutText?: string;
    /**
     * The post-layout inline text nodes, if any.
     */
    inlineTextNodes?: InlineTextBox[];
    /**
     * Index into the `computedStyles` array returned by `getSnapshot`.
     */
    styleIndex?: integer;
    /**
     * Global paint order index, which is determined by the stacking order of the nodes. Nodes
     * that are painted together will have the same index. Only provided if includePaintOrder in
     * getSnapshot was true.
     */
    paintOrder?: integer;
    /**
     * Set to true to indicate the element begins a new stacking context.
     */
    isStackingContext?: boolean;
}

/**
 * A subset of the full ComputedStyle as defined by the request whitelist.
 */
export type ComputedStyle = {
    /**
     * Name/value pairs of computed style properties.
     */
    properties: NameValue[];
}

/**
 * A name/value pair.
 */
export type NameValue = {
    /**
     * Attribute/property name.
     */
    name: string;
    /**
     * Attribute/property value.
     */
    value: string;
}

/**
 * Index of the string in the strings table.
 */
export type StringIndex = integer;

/**
 * Index of the string in the strings table.
 */
export type ArrayOfStrings = StringIndex[];

/**
 * Data that is only present on rare nodes.
 */
export type RareStringData = {
    index: integer[];
    value: StringIndex[];
}

export type RareBooleanData = {
    index: integer[];
}

export type RareIntegerData = {
    index: integer[];
    value: integer[];
}

export type Rectangle = number[];

/**
 * Document snapshot.
 */
export type DocumentSnapshot = {
    /**
     * Document URL that `Document` or `FrameOwner` node points to.
     */
    documentURL: StringIndex;
    /**
     * Document title.
     */
    title: StringIndex;
    /**
     * Base URL that `Document` or `FrameOwner` node uses for URL completion.
     */
    baseURL: StringIndex;
    /**
     * Contains the document's content language.
     */
    contentLanguage: StringIndex;
    /**
     * Contains the document's character set encoding.
     */
    encodingName: StringIndex;
    /**
     * `DocumentType` node's publicId.
     */
    publicId: StringIndex;
    /**
     * `DocumentType` node's systemId.
     */
    systemId: StringIndex;
    /**
     * Frame ID for frame owner elements and also for the document node.
     */
    frameId: StringIndex;
    /**
     * A table with dom nodes.
     */
    nodes: NodeTreeSnapshot;
    /**
     * The nodes in the layout tree.
     */
    layout: LayoutTreeSnapshot;
    /**
     * The post-layout inline text nodes.
     */
    textBoxes: TextBoxSnapshot;
    /**
     * Horizontal scroll offset.
     */
    scrollOffsetX?: number;
    /**
     * Vertical scroll offset.
     */
    scrollOffsetY?: number;
    /**
     * Document content width.
     */
    contentWidth?: number;
    /**
     * Document content height.
     */
    contentHeight?: number;
}

/**
 * Table containing nodes.
 */
export type NodeTreeSnapshot = {
    /**
     * Parent node index.
     */
    parentIndex?: integer[];
    /**
     * `Node`'s nodeType.
     */
    nodeType?: integer[];
    /**
     * Type of the shadow root the `Node` is in. String values are equal to the `ShadowRootType` enum.
     */
    shadowRootType?: RareStringData;
    /**
     * `Node`'s nodeName.
     */
    nodeName?: StringIndex[];
    /**
     * `Node`'s nodeValue.
     */
    nodeValue?: StringIndex[];
    /**
     * `Node`'s id, corresponds to DOM.Node.backendNodeId.
     */
    backendNodeId?: DOM.BackendNodeId[];
    /**
     * Attributes of an `Element` node. Flatten name, value pairs.
     */
    attributes?: ArrayOfStrings[];
    /**
     * Only set for textarea elements, contains the text value.
     */
    textValue?: RareStringData;
    /**
     * Only set for input elements, contains the input's associated text value.
     */
    inputValue?: RareStringData;
    /**
     * Only set for radio and checkbox input elements, indicates if the element has been checked
     */
    inputChecked?: RareBooleanData;
    /**
     * Only set for option elements, indicates if the element has been selected
     */
    optionSelected?: RareBooleanData;
    /**
     * The index of the document in the list of the snapshot documents.
     */
    contentDocumentIndex?: RareIntegerData;
    /**
     * Type of a pseudo element node.
     */
    pseudoType?: RareStringData;
    /**
     * Pseudo element identifier for this node. Only present if there is a
     * valid pseudoType.
     */
    pseudoIdentifier?: RareStringData;
    /**
     * Whether this DOM node responds to mouse clicks. This includes nodes that have had click
     * event listeners attached via JavaScript as well as anchor tags that naturally navigate when
     * clicked.
     */
    isClickable?: RareBooleanData;
    /**
     * The selected url for nodes with a srcset attribute.
     */
    currentSourceURL?: RareStringData;
    /**
     * The url of the script (if any) that generates this node.
     */
    originURL?: RareStringData;
}

/**
 * Table of details of an element in the DOM tree with a LayoutObject.
 */
export type LayoutTreeSnapshot = {
    /**
     * Index of the corresponding node in the `NodeTreeSnapshot` array returned by `captureSnapshot`.
     */
    nodeIndex: integer[];
    /**
     * Array of indexes specifying computed style strings, filtered according to the `computedStyles` parameter passed to `captureSnapshot`.
     */
    styles: ArrayOfStrings[];
    /**
     * The absolute position bounding box.
     */
    bounds: Rectangle[];
    /**
     * Contents of the LayoutText, if any.
     */
    text: StringIndex[];
    /**
     * Stacking context information.
     */
    stackingContexts: RareBooleanData;
    /**
     * Global paint order index, which is determined by the stacking order of the nodes. Nodes
     * that are painted together will have the same index. Only provided if includePaintOrder in
     * captureSnapshot was true.
     */
    paintOrders?: integer[];
    /**
     * The offset rect of nodes. Only available when includeDOMRects is set to true
     */
    offsetRects?: Rectangle[];
    /**
     * The scroll rect of nodes. Only available when includeDOMRects is set to true
     */
    scrollRects?: Rectangle[];
    /**
     * The client rect of nodes. Only available when includeDOMRects is set to true
     */
    clientRects?: Rectangle[];
    /**
     * The list of background colors that are blended with colors of overlapping elements.
     */
    blendedBackgroundColors?: StringIndex[];
    /**
     * The list of computed text opacities.
     */
    textColorOpacities?: number[];
}

/**
 * Table of details of the post layout rendered text positions. The exact layout should not be regarded as
 * stable and may change between versions.
 */
export type TextBoxSnapshot = {
    /**
     * Index of the layout tree node that owns this box collection.
     */
    layoutIndex: integer[];
    /**
     * The absolute position bounding box.
     */
    bounds: Rectangle[];
    /**
     * The starting index in characters, for this post layout textbox substring. Characters that
     * would be represented as a surrogate pair in UTF-16 have length 2.
     */
    start: integer[];
    /**
     * The number of characters in this post layout textbox substring. Characters that would be
     * represented as a surrogate pair in UTF-16 have length 2.
     */
    length: integer[];
}

export type GetSnapshotRequest = {
    /**
     * Whitelist of computed styles to return.
     */
    computedStyleWhitelist: string[];
    /**
     * Whether or not to retrieve details of DOM listeners (default false).
     */
    includeEventListeners?: boolean;
    /**
     * Whether to determine and include the paint order index of LayoutTreeNodes (default false).
     */
    includePaintOrder?: boolean;
    /**
     * Whether to include UA shadow tree in the snapshot (default false).
     */
    includeUserAgentShadowTree?: boolean;
}

export type GetSnapshotResponse = {
    /**
     * The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.
     */
    domNodes: DOMNode[];
    /**
     * The nodes in the layout tree.
     */
    layoutTreeNodes: LayoutTreeNode[];
    /**
     * Whitelisted ComputedStyle properties for each node in the layout tree.
     */
    computedStyles: ComputedStyle[];
}

export type CaptureSnapshotRequest = {
    /**
     * Whitelist of computed styles to return.
     */
    computedStyles: string[];
    /**
     * Whether to include layout object paint orders into the snapshot.
     */
    includePaintOrder?: boolean;
    /**
     * Whether to include DOM rectangles (offsetRects, clientRects, scrollRects) into the snapshot
     */
    includeDOMRects?: boolean;
    /**
     * Whether to include blended background colors in the snapshot (default: false).
     * Blended background color is achieved by blending background colors of all elements
     * that overlap with the current element.
     */
    includeBlendedBackgroundColors?: boolean;
    /**
     * Whether to include text color opacity in the snapshot (default: false).
     * An element might have the opacity property set that affects the text color of the element.
     * The final text color opacity is computed based on the opacity of all overlapping elements.
     */
    includeTextColorOpacities?: boolean;
}

export type CaptureSnapshotResponse = {
    /**
     * The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.
     */
    documents: DocumentSnapshot[];
    /**
     * Shared string table that all string properties refer to with indexes.
     */
    strings: string[];
}

