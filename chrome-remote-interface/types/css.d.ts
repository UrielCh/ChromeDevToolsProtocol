import type * as DOM from './dom.d.ts'
import type * as Page from './page.d.ts'

export type integer = number;

/**
 * This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles)
 * have an associated `id` used in subsequent operations on the related object. Each object type has
 * a specific `id` structure, and those are not interchangeable between objects of different kinds.
 * CSS objects can be loaded using the `get*ForNode()` calls (which accept a DOM node id). A client
 * can also keep track of stylesheets via the `styleSheetAdded`/`styleSheetRemoved` events and
 * subsequently load the required stylesheet contents using the `getStyleSheet[Text]()` methods.
 */

export type StyleSheetId = string;

/**
 * Stylesheet type: "injected" for stylesheets injected via extension, "user-agent" for user-agent
 * stylesheets, "inspector" for stylesheets created by the inspector (i.e. those holding the "via
 * inspector" rules), "regular" for regular stylesheets.
 */
export type StyleSheetOrigin = ("injected" | "user-agent" | "inspector" | "regular");

/**
 * CSS rule collection for a single pseudo style.
 */
export type PseudoElementMatches = {
    /**
     * Pseudo element type.
     */
    pseudoType: DOM.PseudoType;
    /**
     * Matches of CSS rules applicable to the pseudo style.
     */
    matches: RuleMatch[];
}

/**
 * Inherited CSS rule collection from ancestor node.
 */
export type InheritedStyleEntry = {
    /**
     * The ancestor node's inline style, if any, in the style inheritance chain.
     */
    inlineStyle?: CSSStyle;
    /**
     * Matches of CSS rules matching the ancestor node in the style inheritance chain.
     */
    matchedCSSRules: RuleMatch[];
}

/**
 * Match data for a CSS rule.
 */
export type RuleMatch = {
    /**
     * CSS rule in the match.
     */
    rule: CSSRule;
    /**
     * Matching selector indices in the rule's selectorList selectors (0-based).
     */
    matchingSelectors: integer[];
}

/**
 * Data for a simple selector (these are delimited by commas in a selector list).
 */
export type Value = {
    /**
     * Value text.
     */
    text: string;
    /**
     * Value range in the underlying resource (if available).
     */
    range?: SourceRange;
}

/**
 * Selector list data.
 */
export type SelectorList = {
    /**
     * Selectors in the list.
     */
    selectors: Value[];
    /**
     * Rule selector text.
     */
    text: string;
}

/**
 * CSS stylesheet metainformation.
 */
export type CSSStyleSheetHeader = {
    /**
     * The stylesheet identifier.
     */
    styleSheetId: StyleSheetId;
    /**
     * Owner frame identifier.
     */
    frameId: Page.FrameId;
    /**
     * Stylesheet resource URL. Empty if this is a constructed stylesheet created using
     * new CSSStyleSheet() (but non-empty if this is a constructed sylesheet imported
     * as a CSS module script).
     */
    sourceURL: string;
    /**
     * URL of source map associated with the stylesheet (if any).
     */
    sourceMapURL?: string;
    /**
     * Stylesheet origin.
     */
    origin: StyleSheetOrigin;
    /**
     * Stylesheet title.
     */
    title: string;
    /**
     * The backend id for the owner node of the stylesheet.
     */
    ownerNode?: DOM.BackendNodeId;
    /**
     * Denotes whether the stylesheet is disabled.
     */
    disabled: boolean;
    /**
     * Whether the sourceURL field value comes from the sourceURL comment.
     */
    hasSourceURL?: boolean;
    /**
     * Whether this stylesheet is created for STYLE tag by parser. This flag is not set for
     * document.written STYLE tags.
     */
    isInline: boolean;
    /**
     * Whether this stylesheet is mutable. Inline stylesheets become mutable
     * after they have been modified via CSSOM API.
     * <link> element's stylesheets become mutable only if DevTools modifies them.
     * Constructed stylesheets (new CSSStyleSheet()) are mutable immediately after creation.
     */
    isMutable: boolean;
    /**
     * True if this stylesheet is created through new CSSStyleSheet() or imported as a
     * CSS module script.
     */
    isConstructed: boolean;
    /**
     * Line offset of the stylesheet within the resource (zero based).
     */
    startLine: number;
    /**
     * Column offset of the stylesheet within the resource (zero based).
     */
    startColumn: number;
    /**
     * Size of the content (in characters).
     */
    length: number;
    /**
     * Line offset of the end of the stylesheet within the resource (zero based).
     */
    endLine: number;
    /**
     * Column offset of the end of the stylesheet within the resource (zero based).
     */
    endColumn: number;
}

/**
 * CSS rule representation.
 */
export type CSSRule = {
    /**
     * The css style sheet identifier (absent for user agent stylesheet and user-specified
     * stylesheet rules) this rule came from.
     */
    styleSheetId?: StyleSheetId;
    /**
     * Rule selector data.
     */
    selectorList: SelectorList;
    /**
     * Parent stylesheet's origin.
     */
    origin: StyleSheetOrigin;
    /**
     * Associated style declaration.
     */
    style: CSSStyle;
    /**
     * Media list array (for rules involving media queries). The array enumerates media queries
     * starting with the innermost one, going outwards.
     */
    media?: CSSMedia[];
    /**
     * Container query list array (for rules involving container queries).
     * The array enumerates container queries starting with the innermost one, going outwards.
     */
    containerQueries?: CSSContainerQuery[];
    /**
     * @supports CSS at-rule array.
     * The array enumerates @supports at-rules starting with the innermost one, going outwards.
     */
    supports?: CSSSupports[];
}

/**
 * CSS coverage information.
 */
export type RuleUsage = {
    /**
     * The css style sheet identifier (absent for user agent stylesheet and user-specified
     * stylesheet rules) this rule came from.
     */
    styleSheetId: StyleSheetId;
    /**
     * Offset of the start of the rule (including selector) from the beginning of the stylesheet.
     */
    startOffset: number;
    /**
     * Offset of the end of the rule body from the beginning of the stylesheet.
     */
    endOffset: number;
    /**
     * Indicates whether the rule was actually used by some element in the page.
     */
    used: boolean;
}

/**
 * Text range within a resource. All numbers are zero-based.
 */
export type SourceRange = {
    /**
     * Start line of range.
     */
    startLine: integer;
    /**
     * Start column of range (inclusive).
     */
    startColumn: integer;
    /**
     * End line of range
     */
    endLine: integer;
    /**
     * End column of range (exclusive).
     */
    endColumn: integer;
}

export type ShorthandEntry = {
    /**
     * Shorthand name.
     */
    name: string;
    /**
     * Shorthand value.
     */
    value: string;
    /**
     * Whether the property has "!important" annotation (implies `false` if absent).
     */
    important?: boolean;
}

export type CSSComputedStyleProperty = {
    /**
     * Computed style property name.
     */
    name: string;
    /**
     * Computed style property value.
     */
    value: string;
}

/**
 * CSS style representation.
 */
export type CSSStyle = {
    /**
     * The css style sheet identifier (absent for user agent stylesheet and user-specified
     * stylesheet rules) this rule came from.
     */
    styleSheetId?: StyleSheetId;
    /**
     * CSS properties in the style.
     */
    cssProperties: CSSProperty[];
    /**
     * Computed values for all shorthands found in the style.
     */
    shorthandEntries: ShorthandEntry[];
    /**
     * Style declaration text (if available).
     */
    cssText?: string;
    /**
     * Style declaration range in the enclosing stylesheet (if available).
     */
    range?: SourceRange;
}

/**
 * CSS property declaration data.
 */
export type CSSProperty = {
    /**
     * The property name.
     */
    name: string;
    /**
     * The property value.
     */
    value: string;
    /**
     * Whether the property has "!important" annotation (implies `false` if absent).
     */
    important?: boolean;
    /**
     * Whether the property is implicit (implies `false` if absent).
     */
    implicit?: boolean;
    /**
     * The full property text as specified in the style.
     */
    text?: string;
    /**
     * Whether the property is understood by the browser (implies `true` if absent).
     */
    parsedOk?: boolean;
    /**
     * Whether the property is disabled by the user (present for source-based properties only).
     */
    disabled?: boolean;
    /**
     * The entire property range in the enclosing style declaration (if available).
     */
    range?: SourceRange;
}

export const enum CSSMediaSource {
    MediaRule = "mediaRule",
    ImportRule = "importRule",
    LinkedSheet = "linkedSheet",
    InlineSheet = "inlineSheet",
}

/**
 * CSS media rule descriptor.
 */
export type CSSMedia = {
    /**
     * Media query text.
     */
    text: string;
    /**
     * Source of the media query: "mediaRule" if specified by a @media rule, "importRule" if
     * specified by an @import rule, "linkedSheet" if specified by a "media" attribute in a linked
     * stylesheet's LINK tag, "inlineSheet" if specified by a "media" attribute in an inline
     * stylesheet's STYLE tag. (CSSMediaSource enum)
     */
    source: ("mediaRule" | "importRule" | "linkedSheet" | "inlineSheet");
    /**
     * URL of the document containing the media query description.
     */
    sourceURL?: string;
    /**
     * The associated rule (@media or @import) header range in the enclosing stylesheet (if
     * available).
     */
    range?: SourceRange;
    /**
     * Identifier of the stylesheet containing this object (if exists).
     */
    styleSheetId?: StyleSheetId;
    /**
     * Array of media queries.
     */
    mediaList?: MediaQuery[];
}

/**
 * Media query descriptor.
 */
export type MediaQuery = {
    /**
     * Array of media query expressions.
     */
    expressions: MediaQueryExpression[];
    /**
     * Whether the media query condition is satisfied.
     */
    active: boolean;
}

/**
 * Media query expression descriptor.
 */
export type MediaQueryExpression = {
    /**
     * Media query expression value.
     */
    value: number;
    /**
     * Media query expression units.
     */
    unit: string;
    /**
     * Media query expression feature.
     */
    feature: string;
    /**
     * The associated range of the value text in the enclosing stylesheet (if available).
     */
    valueRange?: SourceRange;
    /**
     * Computed length of media query expression (if applicable).
     */
    computedLength?: number;
}

/**
 * CSS container query rule descriptor.
 */
export type CSSContainerQuery = {
    /**
     * Container query text.
     */
    text: string;
    /**
     * The associated rule header range in the enclosing stylesheet (if
     * available).
     */
    range?: SourceRange;
    /**
     * Identifier of the stylesheet containing this object (if exists).
     */
    styleSheetId?: StyleSheetId;
    /**
     * Optional name for the container.
     */
    name?: string;
}

/**
 * CSS Supports at-rule descriptor.
 */
export type CSSSupports = {
    /**
     * Supports rule text.
     */
    text: string;
    /**
     * The associated rule header range in the enclosing stylesheet (if
     * available).
     */
    range?: SourceRange;
    /**
     * Identifier of the stylesheet containing this object (if exists).
     */
    styleSheetId?: StyleSheetId;
}

/**
 * Information about amount of glyphs that were rendered with given font.
 */
export type PlatformFontUsage = {
    /**
     * Font's family name reported by platform.
     */
    familyName: string;
    /**
     * Indicates if the font was downloaded or resolved locally.
     */
    isCustomFont: boolean;
    /**
     * Amount of glyphs that were rendered with this font.
     */
    glyphCount: number;
}

/**
 * Information about font variation axes for variable fonts
 */
export type FontVariationAxis = {
    /**
     * The font-variation-setting tag (a.k.a. "axis tag").
     */
    tag: string;
    /**
     * Human-readable variation name in the default language (normally, "en").
     */
    name: string;
    /**
     * The minimum value (inclusive) the font supports for this tag.
     */
    minValue: number;
    /**
     * The maximum value (inclusive) the font supports for this tag.
     */
    maxValue: number;
    /**
     * The default value.
     */
    defaultValue: number;
}

/**
 * Properties of a web font: https://www.w3.org/TR/2008/REC-CSS2-20080411/fonts.html#font-descriptions
 * and additional information such as platformFontFamily and fontVariationAxes.
 */
export type FontFace = {
    /**
     * The font-family.
     */
    fontFamily: string;
    /**
     * The font-style.
     */
    fontStyle: string;
    /**
     * The font-variant.
     */
    fontVariant: string;
    /**
     * The font-weight.
     */
    fontWeight: string;
    /**
     * The font-stretch.
     */
    fontStretch: string;
    /**
     * The unicode-range.
     */
    unicodeRange: string;
    /**
     * The src.
     */
    src: string;
    /**
     * The resolved platform font family
     */
    platformFontFamily: string;
    /**
     * Available variation settings (a.k.a. "axes").
     */
    fontVariationAxes?: FontVariationAxis[];
}

/**
 * CSS keyframes rule representation.
 */
export type CSSKeyframesRule = {
    /**
     * Animation name.
     */
    animationName: Value;
    /**
     * List of keyframes.
     */
    keyframes: CSSKeyframeRule[];
}

/**
 * CSS keyframe rule representation.
 */
export type CSSKeyframeRule = {
    /**
     * The css style sheet identifier (absent for user agent stylesheet and user-specified
     * stylesheet rules) this rule came from.
     */
    styleSheetId?: StyleSheetId;
    /**
     * Parent stylesheet's origin.
     */
    origin: StyleSheetOrigin;
    /**
     * Associated key text.
     */
    keyText: Value;
    /**
     * Associated style declaration.
     */
    style: CSSStyle;
}

/**
 * A descriptor of operation to mutate style declaration text.
 */
export type StyleDeclarationEdit = {
    /**
     * The css style sheet identifier.
     */
    styleSheetId: StyleSheetId;
    /**
     * The range of the style text in the enclosing stylesheet.
     */
    range: SourceRange;
    /**
     * New style text.
     */
    text: string;
}

export type AddRuleRequest = {
    /**
     * The css style sheet identifier where a new rule should be inserted.
     */
    styleSheetId: StyleSheetId;
    /**
     * The text of a new rule.
     */
    ruleText: string;
    /**
     * Text position of a new rule in the target style sheet.
     */
    location: SourceRange;
}

export type AddRuleResponse = {
    /**
     * The newly created rule.
     */
    rule: CSSRule;
}

export type CollectClassNamesRequest = {
    styleSheetId: StyleSheetId;
}

export type CollectClassNamesResponse = {
    /**
     * Class name list.
     */
    classNames: string[];
}

export type CreateStyleSheetRequest = {
    /**
     * Identifier of the frame where "via-inspector" stylesheet should be created.
     */
    frameId: Page.FrameId;
}

export type CreateStyleSheetResponse = {
    /**
     * Identifier of the created "via-inspector" stylesheet.
     */
    styleSheetId: StyleSheetId;
}

export type ForcePseudoStateRequest = {
    /**
     * The element id for which to force the pseudo state.
     */
    nodeId: DOM.NodeId;
    /**
     * Element pseudo classes to force when computing the element's style.
     */
    forcedPseudoClasses: string[];
}

export type GetBackgroundColorsRequest = {
    /**
     * Id of the node to get background colors for.
     */
    nodeId: DOM.NodeId;
}

export type GetBackgroundColorsResponse = {
    /**
     * The range of background colors behind this element, if it contains any visible text. If no
     * visible text is present, this will be undefined. In the case of a flat background color,
     * this will consist of simply that color. In the case of a gradient, this will consist of each
     * of the color stops. For anything more complicated, this will be an empty array. Images will
     * be ignored (as if the image had failed to load).
     */
    backgroundColors?: string[];
    /**
     * The computed font size for this node, as a CSS computed value string (e.g. '12px').
     */
    computedFontSize?: string;
    /**
     * The computed font weight for this node, as a CSS computed value string (e.g. 'normal' or
     * '100').
     */
    computedFontWeight?: string;
}

export type GetComputedStyleForNodeRequest = {
    nodeId: DOM.NodeId;
}

export type GetComputedStyleForNodeResponse = {
    /**
     * Computed style for the specified DOM node.
     */
    computedStyle: CSSComputedStyleProperty[];
}

export type GetInlineStylesForNodeRequest = {
    nodeId: DOM.NodeId;
}

export type GetInlineStylesForNodeResponse = {
    /**
     * Inline style for the specified DOM node.
     */
    inlineStyle?: CSSStyle;
    /**
     * Attribute-defined element style (e.g. resulting from "width=20 height=100%").
     */
    attributesStyle?: CSSStyle;
}

export type GetMatchedStylesForNodeRequest = {
    nodeId: DOM.NodeId;
}

export type GetMatchedStylesForNodeResponse = {
    /**
     * Inline style for the specified DOM node.
     */
    inlineStyle?: CSSStyle;
    /**
     * Attribute-defined element style (e.g. resulting from "width=20 height=100%").
     */
    attributesStyle?: CSSStyle;
    /**
     * CSS rules matching this node, from all applicable stylesheets.
     */
    matchedCSSRules?: RuleMatch[];
    /**
     * Pseudo style matches for this node.
     */
    pseudoElements?: PseudoElementMatches[];
    /**
     * A chain of inherited styles (from the immediate node parent up to the DOM tree root).
     */
    inherited?: InheritedStyleEntry[];
    /**
     * A list of CSS keyframed animations matching this node.
     */
    cssKeyframesRules?: CSSKeyframesRule[];
}

export type GetMediaQueriesResponse = {
    medias: CSSMedia[];
}

export type GetPlatformFontsForNodeRequest = {
    nodeId: DOM.NodeId;
}

export type GetPlatformFontsForNodeResponse = {
    /**
     * Usage statistics for every employed platform font.
     */
    fonts: PlatformFontUsage[];
}

export type GetStyleSheetTextRequest = {
    styleSheetId: StyleSheetId;
}

export type GetStyleSheetTextResponse = {
    /**
     * The stylesheet text.
     */
    text: string;
}

export type TrackComputedStyleUpdatesRequest = {
    propertiesToTrack: CSSComputedStyleProperty[];
}

export type TakeComputedStyleUpdatesResponse = {
    /**
     * The list of node Ids that have their tracked computed styles updated
     */
    nodeIds: DOM.NodeId[];
}

export type SetEffectivePropertyValueForNodeRequest = {
    /**
     * The element id for which to set property.
     */
    nodeId: DOM.NodeId;
    propertyName: string;
    value: string;
}

export type SetKeyframeKeyRequest = {
    styleSheetId: StyleSheetId;
    range: SourceRange;
    keyText: string;
}

export type SetKeyframeKeyResponse = {
    /**
     * The resulting key text after modification.
     */
    keyText: Value;
}

export type SetMediaTextRequest = {
    styleSheetId: StyleSheetId;
    range: SourceRange;
    text: string;
}

export type SetMediaTextResponse = {
    /**
     * The resulting CSS media rule after modification.
     */
    media: CSSMedia;
}

export type SetContainerQueryTextRequest = {
    styleSheetId: StyleSheetId;
    range: SourceRange;
    text: string;
}

export type SetContainerQueryTextResponse = {
    /**
     * The resulting CSS container query rule after modification.
     */
    containerQuery: CSSContainerQuery;
}

export type SetRuleSelectorRequest = {
    styleSheetId: StyleSheetId;
    range: SourceRange;
    selector: string;
}

export type SetRuleSelectorResponse = {
    /**
     * The resulting selector list after modification.
     */
    selectorList: SelectorList;
}

export type SetStyleSheetTextRequest = {
    styleSheetId: StyleSheetId;
    text: string;
}

export type SetStyleSheetTextResponse = {
    /**
     * URL of source map associated with script (if any).
     */
    sourceMapURL?: string;
}

export type SetStyleTextsRequest = {
    edits: StyleDeclarationEdit[];
}

export type SetStyleTextsResponse = {
    /**
     * The resulting styles after modification.
     */
    styles: CSSStyle[];
}

export type StopRuleUsageTrackingResponse = {
    ruleUsage: RuleUsage[];
}

export type TakeCoverageDeltaResponse = {
    coverage: RuleUsage[];
    /**
     * Monotonically increasing time, in seconds.
     */
    timestamp: number;
}

export type SetLocalFontsEnabledRequest = {
    /**
     * Whether rendering of local fonts is enabled.
     */
    enabled: boolean;
}

/**
 * Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded
 * web font
 */
export type FontsUpdatedEvent = {
    /**
     * The web font that has loaded.
     */
    font?: FontFace;
}

/**
 * Fired whenever an active document stylesheet is added.
 */
export type StyleSheetAddedEvent = {
    /**
     * Added stylesheet metainfo.
     */
    header: CSSStyleSheetHeader;
}

/**
 * Fired whenever a stylesheet is changed as a result of the client operation.
 */
export type StyleSheetChangedEvent = {
    styleSheetId: StyleSheetId;
}

/**
 * Fired whenever an active document stylesheet is removed.
 */
export type StyleSheetRemovedEvent = {
    /**
     * Identifier of the removed stylesheet.
     */
    styleSheetId: StyleSheetId;
}

