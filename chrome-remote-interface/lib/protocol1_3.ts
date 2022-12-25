import { Protocol } from "./Protocol.ts";
/**
 * imported form https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/json/browser_protocol.json
 * formated with prettier 
 * https://chromedevtools.github.io/devtools-protocol/tot/
 * Date: 2022-12-21 04:28:10 +0000
 */
export const localDescriptor: Protocol.ProtocolShape = {
  version: {
    major: "1",
    minor: "3",
  },
  domains: [
    {
      domain: "Accessibility",
      experimental: true,
      dependencies: ["DOM"],
      types: [
        {
          id: "AXNodeId",
          description: "Unique accessibility node identifier.",
          type: "string",
        },
        {
          id: "AXValueType",
          description: "Enum of possible property types.",
          type: "string",
          enum: [
            "boolean",
            "tristate",
            "booleanOrUndefined",
            "idref",
            "idrefList",
            "integer",
            "node",
            "nodeList",
            "number",
            "string",
            "computedString",
            "token",
            "tokenList",
            "domRelation",
            "role",
            "internalRole",
            "valueUndefined",
          ],
        },
        {
          id: "AXValueSourceType",
          description: "Enum of possible property sources.",
          type: "string",
          enum: [
            "attribute",
            "implicit",
            "style",
            "contents",
            "placeholder",
            "relatedElement",
          ],
        },
        {
          id: "AXValueNativeSourceType",
          description:
            "Enum of possible native property sources (as a subtype of a particular AXValueSourceType).",
          type: "string",
          enum: [
            "description",
            "figcaption",
            "label",
            "labelfor",
            "labelwrapped",
            "legend",
            "rubyannotation",
            "tablecaption",
            "title",
            "other",
          ],
        },
        {
          id: "AXValueSource",
          description: "A single source for a computed AX property.",
          type: "object",
          properties: [
            {
              name: "type",
              description: "What type of source this is.",
              $ref: "AXValueSourceType",
            },
            {
              name: "value",
              description: "The value of this property source.",
              optional: true,
              $ref: "AXValue",
            },
            {
              name: "attribute",
              description: "The name of the relevant attribute, if any.",
              optional: true,
              type: "string",
            },
            {
              name: "attributeValue",
              description: "The value of the relevant attribute, if any.",
              optional: true,
              $ref: "AXValue",
            },
            {
              name: "superseded",
              description:
                "Whether this source is superseded by a higher priority source.",
              optional: true,
              type: "boolean",
            },
            {
              name: "nativeSource",
              description:
                "The native markup source for this value, e.g. a <label> element.",
              optional: true,
              $ref: "AXValueNativeSourceType",
            },
            {
              name: "nativeSourceValue",
              description:
                "The value, such as a node or node list, of the native source.",
              optional: true,
              $ref: "AXValue",
            },
            {
              name: "invalid",
              description: "Whether the value for this property is invalid.",
              optional: true,
              type: "boolean",
            },
            {
              name: "invalidReason",
              description: "Reason for the value being invalid, if it is.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "AXRelatedNode",
          type: "object",
          properties: [
            {
              name: "backendDOMNodeId",
              description: "The BackendNodeId of the related DOM node.",
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "idref",
              description: "The IDRef value provided, if any.",
              optional: true,
              type: "string",
            },
            {
              name: "text",
              description:
                "The text alternative of this node in the current context.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "AXProperty",
          type: "object",
          properties: [
            {
              name: "name",
              description: "The name of this property.",
              $ref: "AXPropertyName",
            },
            {
              name: "value",
              description: "The value of this property.",
              $ref: "AXValue",
            },
          ],
        },
        {
          id: "AXValue",
          description: "A single computed AX property.",
          type: "object",
          properties: [
            {
              name: "type",
              description: "The type of this value.",
              $ref: "AXValueType",
            },
            {
              name: "value",
              description: "The computed value of this property.",
              optional: true,
              type: "any",
            },
            {
              name: "relatedNodes",
              description: "One or more related nodes, if applicable.",
              optional: true,
              type: "array",
              items: {
                $ref: "AXRelatedNode",
              },
            },
            {
              name: "sources",
              description:
                "The sources which contributed to the computation of this property.",
              optional: true,
              type: "array",
              items: {
                $ref: "AXValueSource",
              },
            },
          ],
        },
        {
          id: "AXPropertyName",
          description:
            "Values of AXProperty name:\n- from 'busy' to 'roledescription': states which apply to every AX node\n- from 'live' to 'root': attributes which apply to nodes in live regions\n- from 'autocomplete' to 'valuetext': attributes which apply to widgets\n- from 'checked' to 'selected': states which apply to widgets\n- from 'activedescendant' to 'owns' - relationships between elements other than parent/child/sibling.",
          type: "string",
          enum: [
            "busy",
            "disabled",
            "editable",
            "focusable",
            "focused",
            "hidden",
            "hiddenRoot",
            "invalid",
            "keyshortcuts",
            "settable",
            "roledescription",
            "live",
            "atomic",
            "relevant",
            "root",
            "autocomplete",
            "hasPopup",
            "level",
            "multiselectable",
            "orientation",
            "multiline",
            "readonly",
            "required",
            "valuemin",
            "valuemax",
            "valuetext",
            "checked",
            "expanded",
            "modal",
            "pressed",
            "selected",
            "activedescendant",
            "controls",
            "describedby",
            "details",
            "errormessage",
            "flowto",
            "labelledby",
            "owns",
          ],
        },
        {
          id: "AXNode",
          description: "A node in the accessibility tree.",
          type: "object",
          properties: [
            {
              name: "nodeId",
              description: "Unique identifier for this node.",
              $ref: "AXNodeId",
            },
            {
              name: "ignored",
              description: "Whether this node is ignored for accessibility",
              type: "boolean",
            },
            {
              name: "ignoredReasons",
              description: "Collection of reasons why this node is hidden.",
              optional: true,
              type: "array",
              items: {
                $ref: "AXProperty",
              },
            },
            {
              name: "role",
              description: "This `Node`'s role, whether explicit or implicit.",
              optional: true,
              $ref: "AXValue",
            },
            {
              name: "chromeRole",
              description: "This `Node`'s Chrome raw role.",
              optional: true,
              $ref: "AXValue",
            },
            {
              name: "name",
              description: "The accessible name for this `Node`.",
              optional: true,
              $ref: "AXValue",
            },
            {
              name: "description",
              description: "The accessible description for this `Node`.",
              optional: true,
              $ref: "AXValue",
            },
            {
              name: "value",
              description: "The value for this `Node`.",
              optional: true,
              $ref: "AXValue",
            },
            {
              name: "properties",
              description: "All other properties",
              optional: true,
              type: "array",
              items: {
                $ref: "AXProperty",
              },
            },
            {
              name: "parentId",
              description: "ID for this node's parent.",
              optional: true,
              $ref: "AXNodeId",
            },
            {
              name: "childIds",
              description: "IDs for each of this node's child nodes.",
              optional: true,
              type: "array",
              items: {
                $ref: "AXNodeId",
              },
            },
            {
              name: "backendDOMNodeId",
              description:
                "The backend ID for the associated DOM node, if any.",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "frameId",
              description:
                "The frame ID for the frame associated with this nodes document.",
              optional: true,
              $ref: "Page.FrameId",
            },
          ],
        },
      ],
      commands: [
        {
          name: "disable",
          description: "Disables the accessibility domain.",
        },
        {
          name: "enable",
          description:
            "Enables the accessibility domain which causes `AXNodeId`s to remain consistent between method calls.\nThis turns on accessibility for the page, which can impact performance until accessibility is disabled.",
        },
        {
          name: "getPartialAXTree",
          description:
            "Fetches the accessibility node and partial accessibility tree for this DOM node, if it exists.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description:
                "Identifier of the node to get the partial accessibility tree for.",
              optional: true,
              $ref: "DOM.NodeId",
            },
            {
              name: "backendNodeId",
              description:
                "Identifier of the backend node to get the partial accessibility tree for.",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "objectId",
              description:
                "JavaScript object id of the node wrapper to get the partial accessibility tree for.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
            {
              name: "fetchRelatives",
              description:
                "Whether to fetch this nodes ancestors, siblings and children. Defaults to true.",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "nodes",
              description:
                "The `Accessibility.AXNode` for this DOM node, if it exists, plus its ancestors, siblings and\nchildren, if requested.",
              type: "array",
              items: {
                $ref: "AXNode",
              },
            },
          ],
        },
        {
          name: "getFullAXTree",
          description:
            "Fetches the entire accessibility tree for the root Document",
          experimental: true,
          parameters: [
            {
              name: "depth",
              description:
                "The maximum depth at which descendants of the root node should be retrieved.\nIf omitted, the full tree is returned.",
              optional: true,
              type: "integer",
            },
            {
              name: "frameId",
              description:
                "The frame for whose document the AX tree should be retrieved.\nIf omited, the root frame is used.",
              optional: true,
              $ref: "Page.FrameId",
            },
          ],
          returns: [
            {
              name: "nodes",
              type: "array",
              items: {
                $ref: "AXNode",
              },
            },
          ],
        },
        {
          name: "getRootAXNode",
          description:
            "Fetches the root node.\nRequires `enable()` to have been called previously.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              description:
                "The frame in whose document the node resides.\nIf omitted, the root frame is used.",
              optional: true,
              $ref: "Page.FrameId",
            },
          ],
          returns: [
            {
              name: "node",
              $ref: "AXNode",
            },
          ],
        },
        {
          name: "getAXNodeAndAncestors",
          description:
            "Fetches a node and all ancestors up to and including the root.\nRequires `enable()` to have been called previously.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description: "Identifier of the node to get.",
              optional: true,
              $ref: "DOM.NodeId",
            },
            {
              name: "backendNodeId",
              description: "Identifier of the backend node to get.",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "objectId",
              description: "JavaScript object id of the node wrapper to get.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
          ],
          returns: [
            {
              name: "nodes",
              type: "array",
              items: {
                $ref: "AXNode",
              },
            },
          ],
        },
        {
          name: "getChildAXNodes",
          description:
            "Fetches a particular accessibility node by AXNodeId.\nRequires `enable()` to have been called previously.",
          experimental: true,
          parameters: [
            {
              name: "id",
              $ref: "AXNodeId",
            },
            {
              name: "frameId",
              description:
                "The frame in whose document the node resides.\nIf omitted, the root frame is used.",
              optional: true,
              $ref: "Page.FrameId",
            },
          ],
          returns: [
            {
              name: "nodes",
              type: "array",
              items: {
                $ref: "AXNode",
              },
            },
          ],
        },
        {
          name: "queryAXTree",
          description:
            "Query a DOM node's accessibility subtree for accessible name and role.\nThis command computes the name and role for all nodes in the subtree, including those that are\nignored for accessibility, and returns those that mactch the specified name and role. If no DOM\nnode is specified, or the DOM node does not exist, the command returns an error. If neither\n`accessibleName` or `role` is specified, it returns all the accessibility nodes in the subtree.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description: "Identifier of the node for the root to query.",
              optional: true,
              $ref: "DOM.NodeId",
            },
            {
              name: "backendNodeId",
              description:
                "Identifier of the backend node for the root to query.",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "objectId",
              description:
                "JavaScript object id of the node wrapper for the root to query.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
            {
              name: "accessibleName",
              description: "Find nodes with this computed name.",
              optional: true,
              type: "string",
            },
            {
              name: "role",
              description: "Find nodes with this computed role.",
              optional: true,
              type: "string",
            },
          ],
          returns: [
            {
              name: "nodes",
              description:
                "A list of `Accessibility.AXNode` matching the specified attributes,\nincluding nodes that are ignored for accessibility.",
              type: "array",
              items: {
                $ref: "AXNode",
              },
            },
          ],
        },
      ],
      events: [
        {
          name: "loadComplete",
          description:
            "The loadComplete event mirrors the load complete event sent by the browser to assistive\ntechnology when the web page has finished loading.",
          experimental: true,
          parameters: [
            {
              name: "root",
              description: "New document root node.",
              $ref: "AXNode",
            },
          ],
        },
        {
          name: "nodesUpdated",
          description:
            "The nodesUpdated event is sent every time a previously requested node has changed the in tree.",
          experimental: true,
          parameters: [
            {
              name: "nodes",
              description: "Updated node data.",
              type: "array",
              items: {
                $ref: "AXNode",
              },
            },
          ],
        },
      ],
    },
    {
      domain: "Animation",
      experimental: true,
      dependencies: ["Runtime", "DOM"],
      types: [
        {
          id: "Animation",
          description: "Animation instance.",
          type: "object",
          properties: [
            {
              name: "id",
              description: "`Animation`'s id.",
              type: "string",
            },
            {
              name: "name",
              description: "`Animation`'s name.",
              type: "string",
            },
            {
              name: "pausedState",
              description: "`Animation`'s internal paused state.",
              type: "boolean",
            },
            {
              name: "playState",
              description: "`Animation`'s play state.",
              type: "string",
            },
            {
              name: "playbackRate",
              description: "`Animation`'s playback rate.",
              type: "number",
            },
            {
              name: "startTime",
              description: "`Animation`'s start time.",
              type: "number",
            },
            {
              name: "currentTime",
              description: "`Animation`'s current time.",
              type: "number",
            },
            {
              name: "type",
              description: "Animation type of `Animation`.",
              type: "string",
              enum: ["CSSTransition", "CSSAnimation", "WebAnimation"],
            },
            {
              name: "source",
              description: "`Animation`'s source animation node.",
              optional: true,
              $ref: "AnimationEffect",
            },
            {
              name: "cssId",
              description:
                "A unique ID for `Animation` representing the sources that triggered this CSS\nanimation/transition.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "AnimationEffect",
          description: "AnimationEffect instance",
          type: "object",
          properties: [
            {
              name: "delay",
              description: "`AnimationEffect`'s delay.",
              type: "number",
            },
            {
              name: "endDelay",
              description: "`AnimationEffect`'s end delay.",
              type: "number",
            },
            {
              name: "iterationStart",
              description: "`AnimationEffect`'s iteration start.",
              type: "number",
            },
            {
              name: "iterations",
              description: "`AnimationEffect`'s iterations.",
              type: "number",
            },
            {
              name: "duration",
              description: "`AnimationEffect`'s iteration duration.",
              type: "number",
            },
            {
              name: "direction",
              description: "`AnimationEffect`'s playback direction.",
              type: "string",
            },
            {
              name: "fill",
              description: "`AnimationEffect`'s fill mode.",
              type: "string",
            },
            {
              name: "backendNodeId",
              description: "`AnimationEffect`'s target node.",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "keyframesRule",
              description: "`AnimationEffect`'s keyframes.",
              optional: true,
              $ref: "KeyframesRule",
            },
            {
              name: "easing",
              description: "`AnimationEffect`'s timing function.",
              type: "string",
            },
          ],
        },
        {
          id: "KeyframesRule",
          description: "Keyframes Rule",
          type: "object",
          properties: [
            {
              name: "name",
              description: "CSS keyframed animation's name.",
              optional: true,
              type: "string",
            },
            {
              name: "keyframes",
              description: "List of animation keyframes.",
              type: "array",
              items: {
                $ref: "KeyframeStyle",
              },
            },
          ],
        },
        {
          id: "KeyframeStyle",
          description: "Keyframe Style",
          type: "object",
          properties: [
            {
              name: "offset",
              description: "Keyframe's time offset.",
              type: "string",
            },
            {
              name: "easing",
              description: "`AnimationEffect`'s timing function.",
              type: "string",
            },
          ],
        },
      ],
      commands: [
        {
          name: "disable",
          description: "Disables animation domain notifications.",
        },
        {
          name: "enable",
          description: "Enables animation domain notifications.",
        },
        {
          name: "getCurrentTime",
          description: "Returns the current time of the an animation.",
          parameters: [
            {
              name: "id",
              description: "Id of animation.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "currentTime",
              description: "Current time of the page.",
              type: "number",
            },
          ],
        },
        {
          name: "getPlaybackRate",
          description: "Gets the playback rate of the document timeline.",
          returns: [
            {
              name: "playbackRate",
              description: "Playback rate for animations on page.",
              type: "number",
            },
          ],
        },
        {
          name: "releaseAnimations",
          description:
            "Releases a set of animations to no longer be manipulated.",
          parameters: [
            {
              name: "animations",
              description: "List of animation ids to seek.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "resolveAnimation",
          description: "Gets the remote object of the Animation.",
          parameters: [
            {
              name: "animationId",
              description: "Animation id.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "remoteObject",
              description: "Corresponding remote object.",
              $ref: "Runtime.RemoteObject",
            },
          ],
        },
        {
          name: "seekAnimations",
          description:
            "Seek a set of animations to a particular time within each animation.",
          parameters: [
            {
              name: "animations",
              description: "List of animation ids to seek.",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "currentTime",
              description: "Set the current time of each animation.",
              type: "number",
            },
          ],
        },
        {
          name: "setPaused",
          description: "Sets the paused state of a set of animations.",
          parameters: [
            {
              name: "animations",
              description: "Animations to set the pause state of.",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "paused",
              description: "Paused state to set to.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setPlaybackRate",
          description: "Sets the playback rate of the document timeline.",
          parameters: [
            {
              name: "playbackRate",
              description: "Playback rate for animations on page",
              type: "number",
            },
          ],
        },
        {
          name: "setTiming",
          description: "Sets the timing of an animation node.",
          parameters: [
            {
              name: "animationId",
              description: "Animation id.",
              type: "string",
            },
            {
              name: "duration",
              description: "Duration of the animation.",
              type: "number",
            },
            {
              name: "delay",
              description: "Delay of the animation.",
              type: "number",
            },
          ],
        },
      ],
      events: [
        {
          name: "animationCanceled",
          description: "Event for when an animation has been cancelled.",
          parameters: [
            {
              name: "id",
              description: "Id of the animation that was cancelled.",
              type: "string",
            },
          ],
        },
        {
          name: "animationCreated",
          description: "Event for each animation that has been created.",
          parameters: [
            {
              name: "id",
              description: "Id of the animation that was created.",
              type: "string",
            },
          ],
        },
        {
          name: "animationStarted",
          description: "Event for animation that has been started.",
          parameters: [
            {
              name: "animation",
              description: "Animation that was started.",
              $ref: "Animation",
            },
          ],
        },
      ],
    },
    {
      domain: "Audits",
      description:
        "Audits domain allows investigation of page violations and possible improvements.",
      experimental: true,
      dependencies: ["Network"],
      types: [
        {
          id: "AffectedCookie",
          description:
            "Information about a cookie that is affected by an inspector issue.",
          type: "object",
          properties: [
            {
              name: "name",
              description:
                "The following three properties uniquely identify a cookie",
              type: "string",
            },
            {
              name: "path",
              type: "string",
            },
            {
              name: "domain",
              type: "string",
            },
          ],
        },
        {
          id: "AffectedRequest",
          description:
            "Information about a request that is affected by an inspector issue.",
          type: "object",
          properties: [
            {
              name: "requestId",
              description: "The unique request id.",
              $ref: "Network.RequestId",
            },
            {
              name: "url",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "AffectedFrame",
          description:
            "Information about the frame affected by an inspector issue.",
          type: "object",
          properties: [
            {
              name: "frameId",
              $ref: "Page.FrameId",
            },
          ],
        },
        {
          id: "CookieExclusionReason",
          type: "string",
          enum: [
            "ExcludeSameSiteUnspecifiedTreatedAsLax",
            "ExcludeSameSiteNoneInsecure",
            "ExcludeSameSiteLax",
            "ExcludeSameSiteStrict",
            "ExcludeInvalidSameParty",
            "ExcludeSamePartyCrossPartyContext",
            "ExcludeDomainNonASCII",
            "ExcludeThirdPartyCookieBlockedInFirstPartySet",
          ],
        },
        {
          id: "CookieWarningReason",
          type: "string",
          enum: [
            "WarnSameSiteUnspecifiedCrossSiteContext",
            "WarnSameSiteNoneInsecure",
            "WarnSameSiteUnspecifiedLaxAllowUnsafe",
            "WarnSameSiteStrictLaxDowngradeStrict",
            "WarnSameSiteStrictCrossDowngradeStrict",
            "WarnSameSiteStrictCrossDowngradeLax",
            "WarnSameSiteLaxCrossDowngradeStrict",
            "WarnSameSiteLaxCrossDowngradeLax",
            "WarnAttributeValueExceedsMaxSize",
            "WarnDomainNonASCII",
          ],
        },
        {
          id: "CookieOperation",
          type: "string",
          enum: ["SetCookie", "ReadCookie"],
        },
        {
          id: "CookieIssueDetails",
          description:
            "This information is currently necessary, as the front-end has a difficult\ntime finding a specific cookie. With this, we can convey specific error\ninformation without the cookie.",
          type: "object",
          properties: [
            {
              name: "cookie",
              description:
                "If AffectedCookie is not set then rawCookieLine contains the raw\nSet-Cookie header string. This hints at a problem where the\ncookie line is syntactically or semantically malformed in a way\nthat no valid cookie could be created.",
              optional: true,
              $ref: "AffectedCookie",
            },
            {
              name: "rawCookieLine",
              optional: true,
              type: "string",
            },
            {
              name: "cookieWarningReasons",
              type: "array",
              items: {
                $ref: "CookieWarningReason",
              },
            },
            {
              name: "cookieExclusionReasons",
              type: "array",
              items: {
                $ref: "CookieExclusionReason",
              },
            },
            {
              name: "operation",
              description:
                "Optionally identifies the site-for-cookies and the cookie url, which\nmay be used by the front-end as additional context.",
              $ref: "CookieOperation",
            },
            {
              name: "siteForCookies",
              optional: true,
              type: "string",
            },
            {
              name: "cookieUrl",
              optional: true,
              type: "string",
            },
            {
              name: "request",
              optional: true,
              $ref: "AffectedRequest",
            },
          ],
        },
        {
          id: "MixedContentResolutionStatus",
          type: "string",
          enum: [
            "MixedContentBlocked",
            "MixedContentAutomaticallyUpgraded",
            "MixedContentWarning",
          ],
        },
        {
          id: "MixedContentResourceType",
          type: "string",
          enum: [
            "AttributionSrc",
            "Audio",
            "Beacon",
            "CSPReport",
            "Download",
            "EventSource",
            "Favicon",
            "Font",
            "Form",
            "Frame",
            "Image",
            "Import",
            "Manifest",
            "Ping",
            "PluginData",
            "PluginResource",
            "Prefetch",
            "Resource",
            "Script",
            "ServiceWorker",
            "SharedWorker",
            "Stylesheet",
            "Track",
            "Video",
            "Worker",
            "XMLHttpRequest",
            "XSLT",
          ],
        },
        {
          id: "MixedContentIssueDetails",
          type: "object",
          properties: [
            {
              name: "resourceType",
              description:
                "The type of resource causing the mixed content issue (css, js, iframe,\nform,...). Marked as optional because it is mapped to from\nblink::mojom::RequestContextType, which will be replaced\nby network::mojom::RequestDestination",
              optional: true,
              $ref: "MixedContentResourceType",
            },
            {
              name: "resolutionStatus",
              description: "The way the mixed content issue is being resolved.",
              $ref: "MixedContentResolutionStatus",
            },
            {
              name: "insecureURL",
              description:
                "The unsafe http url causing the mixed content issue.",
              type: "string",
            },
            {
              name: "mainResourceURL",
              description: "The url responsible for the call to an unsafe url.",
              type: "string",
            },
            {
              name: "request",
              description:
                "The mixed content request.\nDoes not always exist (e.g. for unsafe form submission urls).",
              optional: true,
              $ref: "AffectedRequest",
            },
            {
              name: "frame",
              description:
                "Optional because not every mixed content issue is necessarily linked to a frame.",
              optional: true,
              $ref: "AffectedFrame",
            },
          ],
        },
        {
          id: "BlockedByResponseReason",
          description:
            "Enum indicating the reason a response has been blocked. These reasons are\nrefinements of the net error BLOCKED_BY_RESPONSE.",
          type: "string",
          enum: [
            "CoepFrameResourceNeedsCoepHeader",
            "CoopSandboxedIFrameCannotNavigateToCoopPage",
            "CorpNotSameOrigin",
            "CorpNotSameOriginAfterDefaultedToSameOriginByCoep",
            "CorpNotSameSite",
          ],
        },
        {
          id: "BlockedByResponseIssueDetails",
          description:
            "Details for a request that has been blocked with the BLOCKED_BY_RESPONSE\ncode. Currently only used for COEP/COOP, but may be extended to include\nsome CSP errors in the future.",
          type: "object",
          properties: [
            {
              name: "request",
              $ref: "AffectedRequest",
            },
            {
              name: "parentFrame",
              optional: true,
              $ref: "AffectedFrame",
            },
            {
              name: "blockedFrame",
              optional: true,
              $ref: "AffectedFrame",
            },
            {
              name: "reason",
              $ref: "BlockedByResponseReason",
            },
          ],
        },
        {
          id: "HeavyAdResolutionStatus",
          type: "string",
          enum: ["HeavyAdBlocked", "HeavyAdWarning"],
        },
        {
          id: "HeavyAdReason",
          type: "string",
          enum: ["NetworkTotalLimit", "CpuTotalLimit", "CpuPeakLimit"],
        },
        {
          id: "HeavyAdIssueDetails",
          type: "object",
          properties: [
            {
              name: "resolution",
              description:
                "The resolution status, either blocking the content or warning.",
              $ref: "HeavyAdResolutionStatus",
            },
            {
              name: "reason",
              description:
                "The reason the ad was blocked, total network or cpu or peak cpu.",
              $ref: "HeavyAdReason",
            },
            {
              name: "frame",
              description: "The frame that was blocked.",
              $ref: "AffectedFrame",
            },
          ],
        },
        {
          id: "ContentSecurityPolicyViolationType",
          type: "string",
          enum: [
            "kInlineViolation",
            "kEvalViolation",
            "kURLViolation",
            "kTrustedTypesSinkViolation",
            "kTrustedTypesPolicyViolation",
            "kWasmEvalViolation",
          ],
        },
        {
          id: "SourceCodeLocation",
          type: "object",
          properties: [
            {
              name: "scriptId",
              optional: true,
              $ref: "Runtime.ScriptId",
            },
            {
              name: "url",
              type: "string",
            },
            {
              name: "lineNumber",
              type: "integer",
            },
            {
              name: "columnNumber",
              type: "integer",
            },
          ],
        },
        {
          id: "ContentSecurityPolicyIssueDetails",
          type: "object",
          properties: [
            {
              name: "blockedURL",
              description: "The url not included in allowed sources.",
              optional: true,
              type: "string",
            },
            {
              name: "violatedDirective",
              description:
                "Specific directive that is violated, causing the CSP issue.",
              type: "string",
            },
            {
              name: "isReportOnly",
              type: "boolean",
            },
            {
              name: "contentSecurityPolicyViolationType",
              $ref: "ContentSecurityPolicyViolationType",
            },
            {
              name: "frameAncestor",
              optional: true,
              $ref: "AffectedFrame",
            },
            {
              name: "sourceCodeLocation",
              optional: true,
              $ref: "SourceCodeLocation",
            },
            {
              name: "violatingNodeId",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
          ],
        },
        {
          id: "SharedArrayBufferIssueType",
          type: "string",
          enum: ["TransferIssue", "CreationIssue"],
        },
        {
          id: "SharedArrayBufferIssueDetails",
          description:
            "Details for a issue arising from an SAB being instantiated in, or\ntransferred to a context that is not cross-origin isolated.",
          type: "object",
          properties: [
            {
              name: "sourceCodeLocation",
              $ref: "SourceCodeLocation",
            },
            {
              name: "isWarning",
              type: "boolean",
            },
            {
              name: "type",
              $ref: "SharedArrayBufferIssueType",
            },
          ],
        },
        {
          id: "TwaQualityEnforcementViolationType",
          type: "string",
          enum: ["kHttpError", "kUnavailableOffline", "kDigitalAssetLinks"],
        },
        {
          id: "TrustedWebActivityIssueDetails",
          type: "object",
          properties: [
            {
              name: "url",
              description: "The url that triggers the violation.",
              type: "string",
            },
            {
              name: "violationType",
              $ref: "TwaQualityEnforcementViolationType",
            },
            {
              name: "httpStatusCode",
              optional: true,
              type: "integer",
            },
            {
              name: "packageName",
              description:
                "The package name of the Trusted Web Activity client app. This field is\nonly used when violation type is kDigitalAssetLinks.",
              optional: true,
              type: "string",
            },
            {
              name: "signature",
              description:
                "The signature of the Trusted Web Activity client app. This field is only\nused when violation type is kDigitalAssetLinks.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "LowTextContrastIssueDetails",
          type: "object",
          properties: [
            {
              name: "violatingNodeId",
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "violatingNodeSelector",
              type: "string",
            },
            {
              name: "contrastRatio",
              type: "number",
            },
            {
              name: "thresholdAA",
              type: "number",
            },
            {
              name: "thresholdAAA",
              type: "number",
            },
            {
              name: "fontSize",
              type: "string",
            },
            {
              name: "fontWeight",
              type: "string",
            },
          ],
        },
        {
          id: "CorsIssueDetails",
          description:
            "Details for a CORS related issue, e.g. a warning or error related to\nCORS RFC1918 enforcement.",
          type: "object",
          properties: [
            {
              name: "corsErrorStatus",
              $ref: "Network.CorsErrorStatus",
            },
            {
              name: "isWarning",
              type: "boolean",
            },
            {
              name: "request",
              $ref: "AffectedRequest",
            },
            {
              name: "location",
              optional: true,
              $ref: "SourceCodeLocation",
            },
            {
              name: "initiatorOrigin",
              optional: true,
              type: "string",
            },
            {
              name: "resourceIPAddressSpace",
              optional: true,
              $ref: "Network.IPAddressSpace",
            },
            {
              name: "clientSecurityState",
              optional: true,
              $ref: "Network.ClientSecurityState",
            },
          ],
        },
        {
          id: "AttributionReportingIssueType",
          type: "string",
          enum: [
            "PermissionPolicyDisabled",
            "PermissionPolicyNotDelegated",
            "UntrustworthyReportingOrigin",
            "InsecureContext",
            "InvalidHeader",
            "InvalidRegisterTriggerHeader",
            "InvalidEligibleHeader",
            "TooManyConcurrentRequests",
            "SourceAndTriggerHeaders",
            "SourceIgnored",
            "TriggerIgnored",
          ],
        },
        {
          id: "AttributionReportingIssueDetails",
          description:
            'Details for issues around "Attribution Reporting API" usage.\nExplainer: https://github.com/WICG/attribution-reporting-api',
          type: "object",
          properties: [
            {
              name: "violationType",
              $ref: "AttributionReportingIssueType",
            },
            {
              name: "request",
              optional: true,
              $ref: "AffectedRequest",
            },
            {
              name: "violatingNodeId",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "invalidParameter",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "QuirksModeIssueDetails",
          description:
            "Details for issues about documents in Quirks Mode\nor Limited Quirks Mode that affects page layouting.",
          type: "object",
          properties: [
            {
              name: "isLimitedQuirksMode",
              description:
                'If false, it means the document\'s mode is "quirks"\ninstead of "limited-quirks".',
              type: "boolean",
            },
            {
              name: "documentNodeId",
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "url",
              type: "string",
            },
            {
              name: "frameId",
              $ref: "Page.FrameId",
            },
            {
              name: "loaderId",
              $ref: "Network.LoaderId",
            },
          ],
        },
        {
          id: "NavigatorUserAgentIssueDetails",
          type: "object",
          properties: [
            {
              name: "url",
              type: "string",
            },
            {
              name: "location",
              optional: true,
              $ref: "SourceCodeLocation",
            },
          ],
        },
        {
          id: "GenericIssueErrorType",
          type: "string",
          enum: ["CrossOriginPortalPostMessageError", "FormLabelForNameError"],
        },
        {
          id: "GenericIssueDetails",
          description:
            "Depending on the concrete errorType, different properties are set.",
          type: "object",
          properties: [
            {
              name: "errorType",
              description:
                "Issues with the same errorType are aggregated in the frontend.",
              $ref: "GenericIssueErrorType",
            },
            {
              name: "frameId",
              optional: true,
              $ref: "Page.FrameId",
            },
            {
              name: "violatingNodeId",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
          ],
        },
        {
          id: "DeprecationIssueType",
          type: "string",
          enum: [
            "AuthorizationCoveredByWildcard",
            "CanRequestURLHTTPContainingNewline",
            "ChromeLoadTimesConnectionInfo",
            "ChromeLoadTimesFirstPaintAfterLoadTime",
            "ChromeLoadTimesWasAlternateProtocolAvailable",
            "CookieWithTruncatingChar",
            "CrossOriginAccessBasedOnDocumentDomain",
            "CrossOriginWindowAlert",
            "CrossOriginWindowConfirm",
            "CSSSelectorInternalMediaControlsOverlayCastButton",
            "DeprecationExample",
            "DocumentDomainSettingWithoutOriginAgentClusterHeader",
            "EventPath",
            "ExpectCTHeader",
            "GeolocationInsecureOrigin",
            "GeolocationInsecureOriginDeprecatedNotRemoved",
            "GetUserMediaInsecureOrigin",
            "HostCandidateAttributeGetter",
            "IdentityInCanMakePaymentEvent",
            "InsecurePrivateNetworkSubresourceRequest",
            "LocalCSSFileExtensionRejected",
            "MediaSourceAbortRemove",
            "MediaSourceDurationTruncatingBuffered",
            "NoSysexWebMIDIWithoutPermission",
            "NotificationInsecureOrigin",
            "NotificationPermissionRequestedIframe",
            "ObsoleteWebRtcCipherSuite",
            "OpenWebDatabaseInsecureContext",
            "OverflowVisibleOnReplacedElement",
            "PaymentInstruments",
            "PaymentRequestCSPViolation",
            "PersistentQuotaType",
            "PictureSourceSrc",
            "PrefixedCancelAnimationFrame",
            "PrefixedRequestAnimationFrame",
            "PrefixedStorageInfo",
            "PrefixedVideoDisplayingFullscreen",
            "PrefixedVideoEnterFullscreen",
            "PrefixedVideoEnterFullScreen",
            "PrefixedVideoExitFullscreen",
            "PrefixedVideoExitFullScreen",
            "PrefixedVideoSupportsFullscreen",
            "RangeExpand",
            "RequestedSubresourceWithEmbeddedCredentials",
            "RTCConstraintEnableDtlsSrtpFalse",
            "RTCConstraintEnableDtlsSrtpTrue",
            "RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics",
            "RTCPeerConnectionSdpSemanticsPlanB",
            "RtcpMuxPolicyNegotiate",
            "SharedArrayBufferConstructedWithoutIsolation",
            "TextToSpeech_DisallowedByAutoplay",
            "V8SharedArrayBufferConstructedInExtensionWithoutIsolation",
            "XHRJSONEncodingDetection",
            "XMLHttpRequestSynchronousInNonWorkerOutsideBeforeUnload",
            "XRSupportsSession",
          ],
        },
        {
          id: "DeprecationIssueDetails",
          description:
            "This issue tracks information needed to print a deprecation message.\nhttps://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md",
          type: "object",
          properties: [
            {
              name: "affectedFrame",
              optional: true,
              $ref: "AffectedFrame",
            },
            {
              name: "sourceCodeLocation",
              $ref: "SourceCodeLocation",
            },
            {
              name: "type",
              $ref: "DeprecationIssueType",
            },
          ],
        },
        {
          id: "ClientHintIssueReason",
          type: "string",
          enum: ["MetaTagAllowListInvalidOrigin", "MetaTagModifiedHTML"],
        },
        {
          id: "FederatedAuthRequestIssueDetails",
          type: "object",
          properties: [
            {
              name: "federatedAuthRequestIssueReason",
              $ref: "FederatedAuthRequestIssueReason",
            },
          ],
        },
        {
          id: "FederatedAuthRequestIssueReason",
          description:
            "Represents the failure reason when a federated authentication reason fails.\nShould be updated alongside RequestIdTokenStatus in\nthird_party/blink/public/mojom/devtools/inspector_issue.mojom to include\nall cases except for success.",
          type: "string",
          enum: [
            "ShouldEmbargo",
            "TooManyRequests",
            "WellKnownHttpNotFound",
            "WellKnownNoResponse",
            "WellKnownInvalidResponse",
            "ConfigNotInWellKnown",
            "WellKnownTooBig",
            "ConfigHttpNotFound",
            "ConfigNoResponse",
            "ConfigInvalidResponse",
            "ClientMetadataHttpNotFound",
            "ClientMetadataNoResponse",
            "ClientMetadataInvalidResponse",
            "DisabledInSettings",
            "ErrorFetchingSignin",
            "InvalidSigninResponse",
            "AccountsHttpNotFound",
            "AccountsNoResponse",
            "AccountsInvalidResponse",
            "IdTokenHttpNotFound",
            "IdTokenNoResponse",
            "IdTokenInvalidResponse",
            "IdTokenInvalidRequest",
            "ErrorIdToken",
            "Canceled",
            "RpPageNotVisible",
          ],
        },
        {
          id: "ClientHintIssueDetails",
          description:
            "This issue tracks client hints related issues. It's used to deprecate old\nfeatures, encourage the use of new ones, and provide general guidance.",
          type: "object",
          properties: [
            {
              name: "sourceCodeLocation",
              $ref: "SourceCodeLocation",
            },
            {
              name: "clientHintIssueReason",
              $ref: "ClientHintIssueReason",
            },
          ],
        },
        {
          id: "InspectorIssueCode",
          description:
            "A unique identifier for the type of issue. Each type may use one of the\noptional fields in InspectorIssueDetails to convey more specific\ninformation about the kind of issue.",
          type: "string",
          enum: [
            "CookieIssue",
            "MixedContentIssue",
            "BlockedByResponseIssue",
            "HeavyAdIssue",
            "ContentSecurityPolicyIssue",
            "SharedArrayBufferIssue",
            "TrustedWebActivityIssue",
            "LowTextContrastIssue",
            "CorsIssue",
            "AttributionReportingIssue",
            "QuirksModeIssue",
            "NavigatorUserAgentIssue",
            "GenericIssue",
            "DeprecationIssue",
            "ClientHintIssue",
            "FederatedAuthRequestIssue",
          ],
        },
        {
          id: "InspectorIssueDetails",
          description:
            "This struct holds a list of optional fields with additional information\nspecific to the kind of issue. When adding a new issue code, please also\nadd a new optional field to this type.",
          type: "object",
          properties: [
            {
              name: "cookieIssueDetails",
              optional: true,
              $ref: "CookieIssueDetails",
            },
            {
              name: "mixedContentIssueDetails",
              optional: true,
              $ref: "MixedContentIssueDetails",
            },
            {
              name: "blockedByResponseIssueDetails",
              optional: true,
              $ref: "BlockedByResponseIssueDetails",
            },
            {
              name: "heavyAdIssueDetails",
              optional: true,
              $ref: "HeavyAdIssueDetails",
            },
            {
              name: "contentSecurityPolicyIssueDetails",
              optional: true,
              $ref: "ContentSecurityPolicyIssueDetails",
            },
            {
              name: "sharedArrayBufferIssueDetails",
              optional: true,
              $ref: "SharedArrayBufferIssueDetails",
            },
            {
              name: "twaQualityEnforcementDetails",
              optional: true,
              $ref: "TrustedWebActivityIssueDetails",
            },
            {
              name: "lowTextContrastIssueDetails",
              optional: true,
              $ref: "LowTextContrastIssueDetails",
            },
            {
              name: "corsIssueDetails",
              optional: true,
              $ref: "CorsIssueDetails",
            },
            {
              name: "attributionReportingIssueDetails",
              optional: true,
              $ref: "AttributionReportingIssueDetails",
            },
            {
              name: "quirksModeIssueDetails",
              optional: true,
              $ref: "QuirksModeIssueDetails",
            },
            {
              name: "navigatorUserAgentIssueDetails",
              optional: true,
              $ref: "NavigatorUserAgentIssueDetails",
            },
            {
              name: "genericIssueDetails",
              optional: true,
              $ref: "GenericIssueDetails",
            },
            {
              name: "deprecationIssueDetails",
              optional: true,
              $ref: "DeprecationIssueDetails",
            },
            {
              name: "clientHintIssueDetails",
              optional: true,
              $ref: "ClientHintIssueDetails",
            },
            {
              name: "federatedAuthRequestIssueDetails",
              optional: true,
              $ref: "FederatedAuthRequestIssueDetails",
            },
          ],
        },
        {
          id: "IssueId",
          description:
            "A unique id for a DevTools inspector issue. Allows other entities (e.g.\nexceptions, CDP message, console messages, etc.) to reference an issue.",
          type: "string",
        },
        {
          id: "InspectorIssue",
          description: "An inspector issue reported from the back-end.",
          type: "object",
          properties: [
            {
              name: "code",
              $ref: "InspectorIssueCode",
            },
            {
              name: "details",
              $ref: "InspectorIssueDetails",
            },
            {
              name: "issueId",
              description:
                "A unique id for this issue. May be omitted if no other entity (e.g.\nexception, CDP message, etc.) is referencing this issue.",
              optional: true,
              $ref: "IssueId",
            },
          ],
        },
      ],
      commands: [
        {
          name: "getEncodedResponse",
          description:
            "Returns the response body and size if it were re-encoded with the specified settings. Only\napplies to images.",
          parameters: [
            {
              name: "requestId",
              description:
                "Identifier of the network request to get content for.",
              $ref: "Network.RequestId",
            },
            {
              name: "encoding",
              description: "The encoding to use.",
              type: "string",
              enum: ["webp", "jpeg", "png"],
            },
            {
              name: "quality",
              description: "The quality of the encoding (0-1). (defaults to 1)",
              optional: true,
              type: "number",
            },
            {
              name: "sizeOnly",
              description:
                "Whether to only return the size information (defaults to false).",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "body",
              description:
                "The encoded body as a base64 string. Omitted if sizeOnly is true. (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
            {
              name: "originalSize",
              description: "Size before re-encoding.",
              type: "integer",
            },
            {
              name: "encodedSize",
              description: "Size after re-encoding.",
              type: "integer",
            },
          ],
        },
        {
          name: "disable",
          description:
            "Disables issues domain, prevents further issues from being reported to the client.",
        },
        {
          name: "enable",
          description:
            "Enables issues domain, sends the issues collected so far to the client by means of the\n`issueAdded` event.",
        },
        {
          name: "checkContrast",
          description:
            "Runs the contrast check for the target page. Found issues are reported\nusing Audits.issueAdded event.",
          parameters: [
            {
              name: "reportAAA",
              description:
                "Whether to report WCAG AAA level issues. Default is false.",
              optional: true,
              type: "boolean",
            },
          ],
        },
      ],
      events: [
        {
          name: "issueAdded",
          parameters: [
            {
              name: "issue",
              $ref: "InspectorIssue",
            },
          ],
        },
      ],
    },
    {
      domain: "BackgroundService",
      description: "Defines events for background web platform features.",
      experimental: true,
      types: [
        {
          id: "ServiceName",
          description:
            "The Background Service that will be associated with the commands/events.\nEvery Background Service operates independently, but they share the same\nAPI.",
          type: "string",
          enum: [
            "backgroundFetch",
            "backgroundSync",
            "pushMessaging",
            "notifications",
            "paymentHandler",
            "periodicBackgroundSync",
          ],
        },
        {
          id: "EventMetadata",
          description:
            "A key-value pair for additional event information to pass along.",
          type: "object",
          properties: [
            {
              name: "key",
              type: "string",
            },
            {
              name: "value",
              type: "string",
            },
          ],
        },
        {
          id: "BackgroundServiceEvent",
          type: "object",
          properties: [
            {
              name: "timestamp",
              description: "Timestamp of the event (in seconds).",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "origin",
              description: "The origin this event belongs to.",
              type: "string",
            },
            {
              name: "serviceWorkerRegistrationId",
              description: "The Service Worker ID that initiated the event.",
              $ref: "ServiceWorker.RegistrationID",
            },
            {
              name: "service",
              description: "The Background Service this event belongs to.",
              $ref: "ServiceName",
            },
            {
              name: "eventName",
              description: "A description of the event.",
              type: "string",
            },
            {
              name: "instanceId",
              description: "An identifier that groups related events together.",
              type: "string",
            },
            {
              name: "eventMetadata",
              description: "A list of event-specific information.",
              type: "array",
              items: {
                $ref: "EventMetadata",
              },
            },
            {
              name: "storageKey",
              description: "Storage key this event belongs to.",
              type: "string",
            },
          ],
        },
      ],
      commands: [
        {
          name: "startObserving",
          description: "Enables event updates for the service.",
          parameters: [
            {
              name: "service",
              $ref: "ServiceName",
            },
          ],
        },
        {
          name: "stopObserving",
          description: "Disables event updates for the service.",
          parameters: [
            {
              name: "service",
              $ref: "ServiceName",
            },
          ],
        },
        {
          name: "setRecording",
          description: "Set the recording state for the service.",
          parameters: [
            {
              name: "shouldRecord",
              type: "boolean",
            },
            {
              name: "service",
              $ref: "ServiceName",
            },
          ],
        },
        {
          name: "clearEvents",
          description: "Clears all stored data for the service.",
          parameters: [
            {
              name: "service",
              $ref: "ServiceName",
            },
          ],
        },
      ],
      events: [
        {
          name: "recordingStateChanged",
          description:
            "Called when the recording state for the service has been updated.",
          parameters: [
            {
              name: "isRecording",
              type: "boolean",
            },
            {
              name: "service",
              $ref: "ServiceName",
            },
          ],
        },
        {
          name: "backgroundServiceEventReceived",
          description:
            "Called with all existing backgroundServiceEvents when enabled, and all new\nevents afterwards if enabled and recording.",
          parameters: [
            {
              name: "backgroundServiceEvent",
              $ref: "BackgroundServiceEvent",
            },
          ],
        },
      ],
    },
    {
      domain: "Browser",
      description:
        "The Browser domain defines methods and events for browser managing.",
      types: [
        {
          id: "BrowserContextID",
          experimental: true,
          type: "string",
        },
        {
          id: "WindowID",
          experimental: true,
          type: "integer",
        },
        {
          id: "WindowState",
          description: "The state of the browser window.",
          experimental: true,
          type: "string",
          enum: ["normal", "minimized", "maximized", "fullscreen"],
        },
        {
          id: "Bounds",
          description: "Browser window bounds information",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "left",
              description:
                "The offset from the left edge of the screen to the window in pixels.",
              optional: true,
              type: "integer",
            },
            {
              name: "top",
              description:
                "The offset from the top edge of the screen to the window in pixels.",
              optional: true,
              type: "integer",
            },
            {
              name: "width",
              description: "The window width in pixels.",
              optional: true,
              type: "integer",
            },
            {
              name: "height",
              description: "The window height in pixels.",
              optional: true,
              type: "integer",
            },
            {
              name: "windowState",
              description: "The window state. Default to normal.",
              optional: true,
              $ref: "WindowState",
            },
          ],
        },
        {
          id: "PermissionType",
          experimental: true,
          type: "string",
          enum: [
            "accessibilityEvents",
            "audioCapture",
            "backgroundSync",
            "backgroundFetch",
            "clipboardReadWrite",
            "clipboardSanitizedWrite",
            "displayCapture",
            "durableStorage",
            "flash",
            "geolocation",
            "idleDetection",
            "localFonts",
            "midi",
            "midiSysex",
            "nfc",
            "notifications",
            "paymentHandler",
            "periodicBackgroundSync",
            "protectedMediaIdentifier",
            "sensors",
            "storageAccess",
            "videoCapture",
            "videoCapturePanTiltZoom",
            "wakeLockScreen",
            "wakeLockSystem",
            "windowManagement",
          ],
        },
        {
          id: "PermissionSetting",
          experimental: true,
          type: "string",
          enum: ["granted", "denied", "prompt"],
        },
        {
          id: "PermissionDescriptor",
          description:
            "Definition of PermissionDescriptor defined in the Permissions API:\nhttps://w3c.github.io/permissions/#dictdef-permissiondescriptor.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "name",
              description:
                "Name of permission.\nSee https://cs.chromium.org/chromium/src/third_party/blink/renderer/modules/permissions/permission_descriptor.idl for valid permission names.",
              type: "string",
            },
            {
              name: "sysex",
              description:
                'For "midi" permission, may also specify sysex control.',
              optional: true,
              type: "boolean",
            },
            {
              name: "userVisibleOnly",
              description:
                'For "push" permission, may specify userVisibleOnly.\nNote that userVisibleOnly = true is the only currently supported type.',
              optional: true,
              type: "boolean",
            },
            {
              name: "allowWithoutSanitization",
              description:
                'For "clipboard" permission, may specify allowWithoutSanitization.',
              optional: true,
              type: "boolean",
            },
            {
              name: "panTiltZoom",
              description: 'For "camera" permission, may specify panTiltZoom.',
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          id: "BrowserCommandId",
          description: "Browser command ids used by executeBrowserCommand.",
          experimental: true,
          type: "string",
          enum: ["openTabSearch", "closeTabSearch"],
        },
        {
          id: "Bucket",
          description: "Chrome histogram bucket.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "low",
              description: "Minimum value (inclusive).",
              type: "integer",
            },
            {
              name: "high",
              description: "Maximum value (exclusive).",
              type: "integer",
            },
            {
              name: "count",
              description: "Number of samples.",
              type: "integer",
            },
          ],
        },
        {
          id: "Histogram",
          description: "Chrome histogram.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "name",
              description: "Name.",
              type: "string",
            },
            {
              name: "sum",
              description: "Sum of sample values.",
              type: "integer",
            },
            {
              name: "count",
              description: "Total number of samples.",
              type: "integer",
            },
            {
              name: "buckets",
              description: "Buckets.",
              type: "array",
              items: {
                $ref: "Bucket",
              },
            },
          ],
        },
      ],
      commands: [
        {
          name: "setPermission",
          description: "Set permission settings for given origin.",
          experimental: true,
          parameters: [
            {
              name: "permission",
              description: "Descriptor of permission to override.",
              $ref: "PermissionDescriptor",
            },
            {
              name: "setting",
              description: "Setting of the permission.",
              $ref: "PermissionSetting",
            },
            {
              name: "origin",
              description:
                "Origin the permission applies to, all origins if not specified.",
              optional: true,
              type: "string",
            },
            {
              name: "browserContextId",
              description:
                "Context to override. When omitted, default browser context is used.",
              optional: true,
              $ref: "BrowserContextID",
            },
          ],
        },
        {
          name: "grantPermissions",
          description:
            "Grant specific permissions to the given origin and reject all others.",
          experimental: true,
          parameters: [
            {
              name: "permissions",
              type: "array",
              items: {
                $ref: "PermissionType",
              },
            },
            {
              name: "origin",
              description:
                "Origin the permission applies to, all origins if not specified.",
              optional: true,
              type: "string",
            },
            {
              name: "browserContextId",
              description:
                "BrowserContext to override permissions. When omitted, default browser context is used.",
              optional: true,
              $ref: "BrowserContextID",
            },
          ],
        },
        {
          name: "resetPermissions",
          description: "Reset all permission management for all origins.",
          experimental: true,
          parameters: [
            {
              name: "browserContextId",
              description:
                "BrowserContext to reset permissions. When omitted, default browser context is used.",
              optional: true,
              $ref: "BrowserContextID",
            },
          ],
        },
        {
          name: "setDownloadBehavior",
          description: "Set the behavior when downloading a file.",
          experimental: true,
          parameters: [
            {
              name: "behavior",
              description:
                "Whether to allow all or deny all download requests, or use default Chrome behavior if\navailable (otherwise deny). |allowAndName| allows download and names files according to\ntheir dowmload guids.",
              type: "string",
              enum: ["deny", "allow", "allowAndName", "default"],
            },
            {
              name: "browserContextId",
              description:
                "BrowserContext to set download behavior. When omitted, default browser context is used.",
              optional: true,
              $ref: "BrowserContextID",
            },
            {
              name: "downloadPath",
              description:
                "The default path to save downloaded files to. This is required if behavior is set to 'allow'\nor 'allowAndName'.",
              optional: true,
              type: "string",
            },
            {
              name: "eventsEnabled",
              description:
                "Whether to emit download events (defaults to false).",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "cancelDownload",
          description: "Cancel a download if in progress",
          experimental: true,
          parameters: [
            {
              name: "guid",
              description: "Global unique identifier of the download.",
              type: "string",
            },
            {
              name: "browserContextId",
              description:
                "BrowserContext to perform the action in. When omitted, default browser context is used.",
              optional: true,
              $ref: "BrowserContextID",
            },
          ],
        },
        {
          name: "close",
          description: "Close browser gracefully.",
        },
        {
          name: "crash",
          description: "Crashes browser on the main thread.",
          experimental: true,
        },
        {
          name: "crashGpuProcess",
          description: "Crashes GPU process.",
          experimental: true,
        },
        {
          name: "getVersion",
          description: "Returns version information.",
          returns: [
            {
              name: "protocolVersion",
              description: "Protocol version.",
              type: "string",
            },
            {
              name: "product",
              description: "Product name.",
              type: "string",
            },
            {
              name: "revision",
              description: "Product revision.",
              type: "string",
            },
            {
              name: "userAgent",
              description: "User-Agent.",
              type: "string",
            },
            {
              name: "jsVersion",
              description: "V8 version.",
              type: "string",
            },
          ],
        },
        {
          name: "getBrowserCommandLine",
          description:
            "Returns the command line switches for the browser process if, and only if\n--enable-automation is on the commandline.",
          experimental: true,
          returns: [
            {
              name: "arguments",
              description: "Commandline parameters",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "getHistograms",
          description: "Get Chrome histograms.",
          experimental: true,
          parameters: [
            {
              name: "query",
              description:
                "Requested substring in name. Only histograms which have query as a\nsubstring in their name are extracted. An empty or absent query returns\nall histograms.",
              optional: true,
              type: "string",
            },
            {
              name: "delta",
              description: "If true, retrieve delta since last call.",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "histograms",
              description: "Histograms.",
              type: "array",
              items: {
                $ref: "Histogram",
              },
            },
          ],
        },
        {
          name: "getHistogram",
          description: "Get a Chrome histogram by name.",
          experimental: true,
          parameters: [
            {
              name: "name",
              description: "Requested histogram name.",
              type: "string",
            },
            {
              name: "delta",
              description: "If true, retrieve delta since last call.",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "histogram",
              description: "Histogram.",
              $ref: "Histogram",
            },
          ],
        },
        {
          name: "getWindowBounds",
          description: "Get position and size of the browser window.",
          experimental: true,
          parameters: [
            {
              name: "windowId",
              description: "Browser window id.",
              $ref: "WindowID",
            },
          ],
          returns: [
            {
              name: "bounds",
              description:
                "Bounds information of the window. When window state is 'minimized', the restored window\nposition and size are returned.",
              $ref: "Bounds",
            },
          ],
        },
        {
          name: "getWindowForTarget",
          description:
            "Get the browser window that contains the devtools target.",
          experimental: true,
          parameters: [
            {
              name: "targetId",
              description:
                "Devtools agent host id. If called as a part of the session, associated targetId is used.",
              optional: true,
              $ref: "Target.TargetID",
            },
          ],
          returns: [
            {
              name: "windowId",
              description: "Browser window id.",
              $ref: "WindowID",
            },
            {
              name: "bounds",
              description:
                "Bounds information of the window. When window state is 'minimized', the restored window\nposition and size are returned.",
              $ref: "Bounds",
            },
          ],
        },
        {
          name: "setWindowBounds",
          description: "Set position and/or size of the browser window.",
          experimental: true,
          parameters: [
            {
              name: "windowId",
              description: "Browser window id.",
              $ref: "WindowID",
            },
            {
              name: "bounds",
              description:
                "New window bounds. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined\nwith 'left', 'top', 'width' or 'height'. Leaves unspecified fields unchanged.",
              $ref: "Bounds",
            },
          ],
        },
        {
          name: "setDockTile",
          description: "Set dock tile details, platform-specific.",
          experimental: true,
          parameters: [
            {
              name: "badgeLabel",
              optional: true,
              type: "string",
            },
            {
              name: "image",
              description:
                "Png encoded image. (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "executeBrowserCommand",
          description: "Invoke custom browser commands used by telemetry.",
          experimental: true,
          parameters: [
            {
              name: "commandId",
              $ref: "BrowserCommandId",
            },
          ],
        },
      ],
      events: [
        {
          name: "downloadWillBegin",
          description: "Fired when page is about to start a download.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame that caused the download to begin.",
              $ref: "Page.FrameId",
            },
            {
              name: "guid",
              description: "Global unique identifier of the download.",
              type: "string",
            },
            {
              name: "url",
              description: "URL of the resource being downloaded.",
              type: "string",
            },
            {
              name: "suggestedFilename",
              description:
                "Suggested file name of the resource (the actual name of the file saved on disk may differ).",
              type: "string",
            },
          ],
        },
        {
          name: "downloadProgress",
          description:
            "Fired when download makes progress. Last call has |done| == true.",
          experimental: true,
          parameters: [
            {
              name: "guid",
              description: "Global unique identifier of the download.",
              type: "string",
            },
            {
              name: "totalBytes",
              description: "Total expected bytes to download.",
              type: "number",
            },
            {
              name: "receivedBytes",
              description: "Total bytes received.",
              type: "number",
            },
            {
              name: "state",
              description: "Download status.",
              type: "string",
              enum: ["inProgress", "completed", "canceled"],
            },
          ],
        },
      ],
    },
    {
      domain: "CSS",
      description:
        "This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles)\nhave an associated `id` used in subsequent operations on the related object. Each object type has\na specific `id` structure, and those are not interchangeable between objects of different kinds.\nCSS objects can be loaded using the `get*ForNode()` calls (which accept a DOM node id). A client\ncan also keep track of stylesheets via the `styleSheetAdded`/`styleSheetRemoved` events and\nsubsequently load the required stylesheet contents using the `getStyleSheet[Text]()` methods.",
      experimental: true,
      dependencies: ["DOM", "Page"],
      types: [
        {
          id: "StyleSheetId",
          type: "string",
        },
        {
          id: "StyleSheetOrigin",
          description:
            'Stylesheet type: "injected" for stylesheets injected via extension, "user-agent" for user-agent\nstylesheets, "inspector" for stylesheets created by the inspector (i.e. those holding the "via\ninspector" rules), "regular" for regular stylesheets.',
          type: "string",
          enum: ["injected", "user-agent", "inspector", "regular"],
        },
        {
          id: "PseudoElementMatches",
          description: "CSS rule collection for a single pseudo style.",
          type: "object",
          properties: [
            {
              name: "pseudoType",
              description: "Pseudo element type.",
              $ref: "DOM.PseudoType",
            },
            {
              name: "pseudoIdentifier",
              description: "Pseudo element custom ident.",
              optional: true,
              type: "string",
            },
            {
              name: "matches",
              description:
                "Matches of CSS rules applicable to the pseudo style.",
              type: "array",
              items: {
                $ref: "RuleMatch",
              },
            },
          ],
        },
        {
          id: "InheritedStyleEntry",
          description: "Inherited CSS rule collection from ancestor node.",
          type: "object",
          properties: [
            {
              name: "inlineStyle",
              description:
                "The ancestor node's inline style, if any, in the style inheritance chain.",
              optional: true,
              $ref: "CSSStyle",
            },
            {
              name: "matchedCSSRules",
              description:
                "Matches of CSS rules matching the ancestor node in the style inheritance chain.",
              type: "array",
              items: {
                $ref: "RuleMatch",
              },
            },
          ],
        },
        {
          id: "InheritedPseudoElementMatches",
          description:
            "Inherited pseudo element matches from pseudos of an ancestor node.",
          type: "object",
          properties: [
            {
              name: "pseudoElements",
              description:
                "Matches of pseudo styles from the pseudos of an ancestor node.",
              type: "array",
              items: {
                $ref: "PseudoElementMatches",
              },
            },
          ],
        },
        {
          id: "RuleMatch",
          description: "Match data for a CSS rule.",
          type: "object",
          properties: [
            {
              name: "rule",
              description: "CSS rule in the match.",
              $ref: "CSSRule",
            },
            {
              name: "matchingSelectors",
              description:
                "Matching selector indices in the rule's selectorList selectors (0-based).",
              type: "array",
              items: {
                type: "integer",
              },
            },
          ],
        },
        {
          id: "Value",
          description:
            "Data for a simple selector (these are delimited by commas in a selector list).",
          type: "object",
          properties: [
            {
              name: "text",
              description: "Value text.",
              type: "string",
            },
            {
              name: "range",
              description:
                "Value range in the underlying resource (if available).",
              optional: true,
              $ref: "SourceRange",
            },
          ],
        },
        {
          id: "SelectorList",
          description: "Selector list data.",
          type: "object",
          properties: [
            {
              name: "selectors",
              description: "Selectors in the list.",
              type: "array",
              items: {
                $ref: "Value",
              },
            },
            {
              name: "text",
              description: "Rule selector text.",
              type: "string",
            },
          ],
        },
        {
          id: "CSSStyleSheetHeader",
          description: "CSS stylesheet metainformation.",
          type: "object",
          properties: [
            {
              name: "styleSheetId",
              description: "The stylesheet identifier.",
              $ref: "StyleSheetId",
            },
            {
              name: "frameId",
              description: "Owner frame identifier.",
              $ref: "Page.FrameId",
            },
            {
              name: "sourceURL",
              description:
                "Stylesheet resource URL. Empty if this is a constructed stylesheet created using\nnew CSSStyleSheet() (but non-empty if this is a constructed sylesheet imported\nas a CSS module script).",
              type: "string",
            },
            {
              name: "sourceMapURL",
              description:
                "URL of source map associated with the stylesheet (if any).",
              optional: true,
              type: "string",
            },
            {
              name: "origin",
              description: "Stylesheet origin.",
              $ref: "StyleSheetOrigin",
            },
            {
              name: "title",
              description: "Stylesheet title.",
              type: "string",
            },
            {
              name: "ownerNode",
              description:
                "The backend id for the owner node of the stylesheet.",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "disabled",
              description: "Denotes whether the stylesheet is disabled.",
              type: "boolean",
            },
            {
              name: "hasSourceURL",
              description:
                "Whether the sourceURL field value comes from the sourceURL comment.",
              optional: true,
              type: "boolean",
            },
            {
              name: "isInline",
              description:
                "Whether this stylesheet is created for STYLE tag by parser. This flag is not set for\ndocument.written STYLE tags.",
              type: "boolean",
            },
            {
              name: "isMutable",
              description:
                "Whether this stylesheet is mutable. Inline stylesheets become mutable\nafter they have been modified via CSSOM API.\n<link> element's stylesheets become mutable only if DevTools modifies them.\nConstructed stylesheets (new CSSStyleSheet()) are mutable immediately after creation.",
              type: "boolean",
            },
            {
              name: "isConstructed",
              description:
                "True if this stylesheet is created through new CSSStyleSheet() or imported as a\nCSS module script.",
              type: "boolean",
            },
            {
              name: "startLine",
              description:
                "Line offset of the stylesheet within the resource (zero based).",
              type: "number",
            },
            {
              name: "startColumn",
              description:
                "Column offset of the stylesheet within the resource (zero based).",
              type: "number",
            },
            {
              name: "length",
              description: "Size of the content (in characters).",
              type: "number",
            },
            {
              name: "endLine",
              description:
                "Line offset of the end of the stylesheet within the resource (zero based).",
              type: "number",
            },
            {
              name: "endColumn",
              description:
                "Column offset of the end of the stylesheet within the resource (zero based).",
              type: "number",
            },
          ],
        },
        {
          id: "CSSRule",
          description: "CSS rule representation.",
          type: "object",
          properties: [
            {
              name: "styleSheetId",
              description:
                "The css style sheet identifier (absent for user agent stylesheet and user-specified\nstylesheet rules) this rule came from.",
              optional: true,
              $ref: "StyleSheetId",
            },
            {
              name: "selectorList",
              description: "Rule selector data.",
              $ref: "SelectorList",
            },
            {
              name: "origin",
              description: "Parent stylesheet's origin.",
              $ref: "StyleSheetOrigin",
            },
            {
              name: "style",
              description: "Associated style declaration.",
              $ref: "CSSStyle",
            },
            {
              name: "media",
              description:
                "Media list array (for rules involving media queries). The array enumerates media queries\nstarting with the innermost one, going outwards.",
              optional: true,
              type: "array",
              items: {
                $ref: "CSSMedia",
              },
            },
            {
              name: "containerQueries",
              description:
                "Container query list array (for rules involving container queries).\nThe array enumerates container queries starting with the innermost one, going outwards.",
              experimental: true,
              optional: true,
              type: "array",
              items: {
                $ref: "CSSContainerQuery",
              },
            },
            {
              name: "supports",
              description:
                "@supports CSS at-rule array.\nThe array enumerates @supports at-rules starting with the innermost one, going outwards.",
              experimental: true,
              optional: true,
              type: "array",
              items: {
                $ref: "CSSSupports",
              },
            },
            {
              name: "layers",
              description:
                "Cascade layer array. Contains the layer hierarchy that this rule belongs to starting\nwith the innermost layer and going outwards.",
              experimental: true,
              optional: true,
              type: "array",
              items: {
                $ref: "CSSLayer",
              },
            },
            {
              name: "scopes",
              description:
                "@scope CSS at-rule array.\nThe array enumerates @scope at-rules starting with the innermost one, going outwards.",
              experimental: true,
              optional: true,
              type: "array",
              items: {
                $ref: "CSSScope",
              },
            },
          ],
        },
        {
          id: "RuleUsage",
          description: "CSS coverage information.",
          type: "object",
          properties: [
            {
              name: "styleSheetId",
              description:
                "The css style sheet identifier (absent for user agent stylesheet and user-specified\nstylesheet rules) this rule came from.",
              $ref: "StyleSheetId",
            },
            {
              name: "startOffset",
              description:
                "Offset of the start of the rule (including selector) from the beginning of the stylesheet.",
              type: "number",
            },
            {
              name: "endOffset",
              description:
                "Offset of the end of the rule body from the beginning of the stylesheet.",
              type: "number",
            },
            {
              name: "used",
              description:
                "Indicates whether the rule was actually used by some element in the page.",
              type: "boolean",
            },
          ],
        },
        {
          id: "SourceRange",
          description:
            "Text range within a resource. All numbers are zero-based.",
          type: "object",
          properties: [
            {
              name: "startLine",
              description: "Start line of range.",
              type: "integer",
            },
            {
              name: "startColumn",
              description: "Start column of range (inclusive).",
              type: "integer",
            },
            {
              name: "endLine",
              description: "End line of range",
              type: "integer",
            },
            {
              name: "endColumn",
              description: "End column of range (exclusive).",
              type: "integer",
            },
          ],
        },
        {
          id: "ShorthandEntry",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Shorthand name.",
              type: "string",
            },
            {
              name: "value",
              description: "Shorthand value.",
              type: "string",
            },
            {
              name: "important",
              description:
                'Whether the property has "!important" annotation (implies `false` if absent).',
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          id: "CSSComputedStyleProperty",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Computed style property name.",
              type: "string",
            },
            {
              name: "value",
              description: "Computed style property value.",
              type: "string",
            },
          ],
        },
        {
          id: "CSSStyle",
          description: "CSS style representation.",
          type: "object",
          properties: [
            {
              name: "styleSheetId",
              description:
                "The css style sheet identifier (absent for user agent stylesheet and user-specified\nstylesheet rules) this rule came from.",
              optional: true,
              $ref: "StyleSheetId",
            },
            {
              name: "cssProperties",
              description: "CSS properties in the style.",
              type: "array",
              items: {
                $ref: "CSSProperty",
              },
            },
            {
              name: "shorthandEntries",
              description:
                "Computed values for all shorthands found in the style.",
              type: "array",
              items: {
                $ref: "ShorthandEntry",
              },
            },
            {
              name: "cssText",
              description: "Style declaration text (if available).",
              optional: true,
              type: "string",
            },
            {
              name: "range",
              description:
                "Style declaration range in the enclosing stylesheet (if available).",
              optional: true,
              $ref: "SourceRange",
            },
          ],
        },
        {
          id: "CSSProperty",
          description: "CSS property declaration data.",
          type: "object",
          properties: [
            {
              name: "name",
              description: "The property name.",
              type: "string",
            },
            {
              name: "value",
              description: "The property value.",
              type: "string",
            },
            {
              name: "important",
              description:
                'Whether the property has "!important" annotation (implies `false` if absent).',
              optional: true,
              type: "boolean",
            },
            {
              name: "implicit",
              description:
                "Whether the property is implicit (implies `false` if absent).",
              optional: true,
              type: "boolean",
            },
            {
              name: "text",
              description: "The full property text as specified in the style.",
              optional: true,
              type: "string",
            },
            {
              name: "parsedOk",
              description:
                "Whether the property is understood by the browser (implies `true` if absent).",
              optional: true,
              type: "boolean",
            },
            {
              name: "disabled",
              description:
                "Whether the property is disabled by the user (present for source-based properties only).",
              optional: true,
              type: "boolean",
            },
            {
              name: "range",
              description:
                "The entire property range in the enclosing style declaration (if available).",
              optional: true,
              $ref: "SourceRange",
            },
            {
              name: "longhandProperties",
              description:
                "Parsed longhand components of this property if it is a shorthand.\nThis field will be empty if the given property is not a shorthand.",
              experimental: true,
              optional: true,
              type: "array",
              items: {
                $ref: "CSSProperty",
              },
            },
          ],
        },
        {
          id: "CSSMedia",
          description: "CSS media rule descriptor.",
          type: "object",
          properties: [
            {
              name: "text",
              description: "Media query text.",
              type: "string",
            },
            {
              name: "source",
              description:
                'Source of the media query: "mediaRule" if specified by a @media rule, "importRule" if\nspecified by an @import rule, "linkedSheet" if specified by a "media" attribute in a linked\nstylesheet\'s LINK tag, "inlineSheet" if specified by a "media" attribute in an inline\nstylesheet\'s STYLE tag.',
              type: "string",
              enum: ["mediaRule", "importRule", "linkedSheet", "inlineSheet"],
            },
            {
              name: "sourceURL",
              description:
                "URL of the document containing the media query description.",
              optional: true,
              type: "string",
            },
            {
              name: "range",
              description:
                "The associated rule (@media or @import) header range in the enclosing stylesheet (if\navailable).",
              optional: true,
              $ref: "SourceRange",
            },
            {
              name: "styleSheetId",
              description:
                "Identifier of the stylesheet containing this object (if exists).",
              optional: true,
              $ref: "StyleSheetId",
            },
            {
              name: "mediaList",
              description: "Array of media queries.",
              optional: true,
              type: "array",
              items: {
                $ref: "MediaQuery",
              },
            },
          ],
        },
        {
          id: "MediaQuery",
          description: "Media query descriptor.",
          type: "object",
          properties: [
            {
              name: "expressions",
              description: "Array of media query expressions.",
              type: "array",
              items: {
                $ref: "MediaQueryExpression",
              },
            },
            {
              name: "active",
              description: "Whether the media query condition is satisfied.",
              type: "boolean",
            },
          ],
        },
        {
          id: "MediaQueryExpression",
          description: "Media query expression descriptor.",
          type: "object",
          properties: [
            {
              name: "value",
              description: "Media query expression value.",
              type: "number",
            },
            {
              name: "unit",
              description: "Media query expression units.",
              type: "string",
            },
            {
              name: "feature",
              description: "Media query expression feature.",
              type: "string",
            },
            {
              name: "valueRange",
              description:
                "The associated range of the value text in the enclosing stylesheet (if available).",
              optional: true,
              $ref: "SourceRange",
            },
            {
              name: "computedLength",
              description:
                "Computed length of media query expression (if applicable).",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          id: "CSSContainerQuery",
          description: "CSS container query rule descriptor.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "text",
              description: "Container query text.",
              type: "string",
            },
            {
              name: "range",
              description:
                "The associated rule header range in the enclosing stylesheet (if\navailable).",
              optional: true,
              $ref: "SourceRange",
            },
            {
              name: "styleSheetId",
              description:
                "Identifier of the stylesheet containing this object (if exists).",
              optional: true,
              $ref: "StyleSheetId",
            },
            {
              name: "name",
              description: "Optional name for the container.",
              optional: true,
              type: "string",
            },
            {
              name: "physicalAxes",
              description: "Optional physical axes queried for the container.",
              optional: true,
              $ref: "DOM.PhysicalAxes",
            },
            {
              name: "logicalAxes",
              description: "Optional logical axes queried for the container.",
              optional: true,
              $ref: "DOM.LogicalAxes",
            },
          ],
        },
        {
          id: "CSSSupports",
          description: "CSS Supports at-rule descriptor.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "text",
              description: "Supports rule text.",
              type: "string",
            },
            {
              name: "active",
              description: "Whether the supports condition is satisfied.",
              type: "boolean",
            },
            {
              name: "range",
              description:
                "The associated rule header range in the enclosing stylesheet (if\navailable).",
              optional: true,
              $ref: "SourceRange",
            },
            {
              name: "styleSheetId",
              description:
                "Identifier of the stylesheet containing this object (if exists).",
              optional: true,
              $ref: "StyleSheetId",
            },
          ],
        },
        {
          id: "CSSScope",
          description: "CSS Scope at-rule descriptor.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "text",
              description: "Scope rule text.",
              type: "string",
            },
            {
              name: "range",
              description:
                "The associated rule header range in the enclosing stylesheet (if\navailable).",
              optional: true,
              $ref: "SourceRange",
            },
            {
              name: "styleSheetId",
              description:
                "Identifier of the stylesheet containing this object (if exists).",
              optional: true,
              $ref: "StyleSheetId",
            },
          ],
        },
        {
          id: "CSSLayer",
          description: "CSS Layer at-rule descriptor.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "text",
              description: "Layer name.",
              type: "string",
            },
            {
              name: "range",
              description:
                "The associated rule header range in the enclosing stylesheet (if\navailable).",
              optional: true,
              $ref: "SourceRange",
            },
            {
              name: "styleSheetId",
              description:
                "Identifier of the stylesheet containing this object (if exists).",
              optional: true,
              $ref: "StyleSheetId",
            },
          ],
        },
        {
          id: "CSSLayerData",
          description: "CSS Layer data.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "name",
              description: "Layer name.",
              type: "string",
            },
            {
              name: "subLayers",
              description: "Direct sub-layers",
              optional: true,
              type: "array",
              items: {
                $ref: "CSSLayerData",
              },
            },
            {
              name: "order",
              description:
                "Layer order. The order determines the order of the layer in the cascade order.\nA higher number has higher priority in the cascade order.",
              type: "number",
            },
          ],
        },
        {
          id: "PlatformFontUsage",
          description:
            "Information about amount of glyphs that were rendered with given font.",
          type: "object",
          properties: [
            {
              name: "familyName",
              description: "Font's family name reported by platform.",
              type: "string",
            },
            {
              name: "isCustomFont",
              description:
                "Indicates if the font was downloaded or resolved locally.",
              type: "boolean",
            },
            {
              name: "glyphCount",
              description:
                "Amount of glyphs that were rendered with this font.",
              type: "number",
            },
          ],
        },
        {
          id: "FontVariationAxis",
          description:
            "Information about font variation axes for variable fonts",
          type: "object",
          properties: [
            {
              name: "tag",
              description:
                'The font-variation-setting tag (a.k.a. "axis tag").',
              type: "string",
            },
            {
              name: "name",
              description:
                'Human-readable variation name in the default language (normally, "en").',
              type: "string",
            },
            {
              name: "minValue",
              description:
                "The minimum value (inclusive) the font supports for this tag.",
              type: "number",
            },
            {
              name: "maxValue",
              description:
                "The maximum value (inclusive) the font supports for this tag.",
              type: "number",
            },
            {
              name: "defaultValue",
              description: "The default value.",
              type: "number",
            },
          ],
        },
        {
          id: "FontFace",
          description:
            "Properties of a web font: https://www.w3.org/TR/2008/REC-CSS2-20080411/fonts.html#font-descriptions\nand additional information such as platformFontFamily and fontVariationAxes.",
          type: "object",
          properties: [
            {
              name: "fontFamily",
              description: "The font-family.",
              type: "string",
            },
            {
              name: "fontStyle",
              description: "The font-style.",
              type: "string",
            },
            {
              name: "fontVariant",
              description: "The font-variant.",
              type: "string",
            },
            {
              name: "fontWeight",
              description: "The font-weight.",
              type: "string",
            },
            {
              name: "fontStretch",
              description: "The font-stretch.",
              type: "string",
            },
            {
              name: "fontDisplay",
              description: "The font-display.",
              type: "string",
            },
            {
              name: "unicodeRange",
              description: "The unicode-range.",
              type: "string",
            },
            {
              name: "src",
              description: "The src.",
              type: "string",
            },
            {
              name: "platformFontFamily",
              description: "The resolved platform font family",
              type: "string",
            },
            {
              name: "fontVariationAxes",
              description: 'Available variation settings (a.k.a. "axes").',
              optional: true,
              type: "array",
              items: {
                $ref: "FontVariationAxis",
              },
            },
          ],
        },
        {
          id: "CSSKeyframesRule",
          description: "CSS keyframes rule representation.",
          type: "object",
          properties: [
            {
              name: "animationName",
              description: "Animation name.",
              $ref: "Value",
            },
            {
              name: "keyframes",
              description: "List of keyframes.",
              type: "array",
              items: {
                $ref: "CSSKeyframeRule",
              },
            },
          ],
        },
        {
          id: "CSSKeyframeRule",
          description: "CSS keyframe rule representation.",
          type: "object",
          properties: [
            {
              name: "styleSheetId",
              description:
                "The css style sheet identifier (absent for user agent stylesheet and user-specified\nstylesheet rules) this rule came from.",
              optional: true,
              $ref: "StyleSheetId",
            },
            {
              name: "origin",
              description: "Parent stylesheet's origin.",
              $ref: "StyleSheetOrigin",
            },
            {
              name: "keyText",
              description: "Associated key text.",
              $ref: "Value",
            },
            {
              name: "style",
              description: "Associated style declaration.",
              $ref: "CSSStyle",
            },
          ],
        },
        {
          id: "StyleDeclarationEdit",
          description:
            "A descriptor of operation to mutate style declaration text.",
          type: "object",
          properties: [
            {
              name: "styleSheetId",
              description: "The css style sheet identifier.",
              $ref: "StyleSheetId",
            },
            {
              name: "range",
              description:
                "The range of the style text in the enclosing stylesheet.",
              $ref: "SourceRange",
            },
            {
              name: "text",
              description: "New style text.",
              type: "string",
            },
          ],
        },
      ],
      commands: [
        {
          name: "addRule",
          description:
            "Inserts a new rule with the given `ruleText` in a stylesheet with given `styleSheetId`, at the\nposition specified by `location`.",
          parameters: [
            {
              name: "styleSheetId",
              description:
                "The css style sheet identifier where a new rule should be inserted.",
              $ref: "StyleSheetId",
            },
            {
              name: "ruleText",
              description: "The text of a new rule.",
              type: "string",
            },
            {
              name: "location",
              description:
                "Text position of a new rule in the target style sheet.",
              $ref: "SourceRange",
            },
          ],
          returns: [
            {
              name: "rule",
              description: "The newly created rule.",
              $ref: "CSSRule",
            },
          ],
        },
        {
          name: "collectClassNames",
          description: "Returns all class names from specified stylesheet.",
          parameters: [
            {
              name: "styleSheetId",
              $ref: "StyleSheetId",
            },
          ],
          returns: [
            {
              name: "classNames",
              description: "Class name list.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "createStyleSheet",
          description:
            'Creates a new special "via-inspector" stylesheet in the frame with given `frameId`.',
          parameters: [
            {
              name: "frameId",
              description:
                'Identifier of the frame where "via-inspector" stylesheet should be created.',
              $ref: "Page.FrameId",
            },
          ],
          returns: [
            {
              name: "styleSheetId",
              description:
                'Identifier of the created "via-inspector" stylesheet.',
              $ref: "StyleSheetId",
            },
          ],
        },
        {
          name: "disable",
          description: "Disables the CSS agent for the given page.",
        },
        {
          name: "enable",
          description:
            "Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been\nenabled until the result of this command is received.",
        },
        {
          name: "forcePseudoState",
          description:
            "Ensures that the given node will have specified pseudo-classes whenever its style is computed by\nthe browser.",
          parameters: [
            {
              name: "nodeId",
              description:
                "The element id for which to force the pseudo state.",
              $ref: "DOM.NodeId",
            },
            {
              name: "forcedPseudoClasses",
              description:
                "Element pseudo classes to force when computing the element's style.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "getBackgroundColors",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to get background colors for.",
              $ref: "DOM.NodeId",
            },
          ],
          returns: [
            {
              name: "backgroundColors",
              description:
                "The range of background colors behind this element, if it contains any visible text. If no\nvisible text is present, this will be undefined. In the case of a flat background color,\nthis will consist of simply that color. In the case of a gradient, this will consist of each\nof the color stops. For anything more complicated, this will be an empty array. Images will\nbe ignored (as if the image had failed to load).",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "computedFontSize",
              description:
                "The computed font size for this node, as a CSS computed value string (e.g. '12px').",
              optional: true,
              type: "string",
            },
            {
              name: "computedFontWeight",
              description:
                "The computed font weight for this node, as a CSS computed value string (e.g. 'normal' or\n'100').",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "getComputedStyleForNode",
          description:
            "Returns the computed style for a DOM node identified by `nodeId`.",
          parameters: [
            {
              name: "nodeId",
              $ref: "DOM.NodeId",
            },
          ],
          returns: [
            {
              name: "computedStyle",
              description: "Computed style for the specified DOM node.",
              type: "array",
              items: {
                $ref: "CSSComputedStyleProperty",
              },
            },
          ],
        },
        {
          name: "getInlineStylesForNode",
          description:
            'Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM\nattributes) for a DOM node identified by `nodeId`.',
          parameters: [
            {
              name: "nodeId",
              $ref: "DOM.NodeId",
            },
          ],
          returns: [
            {
              name: "inlineStyle",
              description: "Inline style for the specified DOM node.",
              optional: true,
              $ref: "CSSStyle",
            },
            {
              name: "attributesStyle",
              description:
                'Attribute-defined element style (e.g. resulting from "width=20 height=100%").',
              optional: true,
              $ref: "CSSStyle",
            },
          ],
        },
        {
          name: "getMatchedStylesForNode",
          description:
            "Returns requested styles for a DOM node identified by `nodeId`.",
          parameters: [
            {
              name: "nodeId",
              $ref: "DOM.NodeId",
            },
          ],
          returns: [
            {
              name: "inlineStyle",
              description: "Inline style for the specified DOM node.",
              optional: true,
              $ref: "CSSStyle",
            },
            {
              name: "attributesStyle",
              description:
                'Attribute-defined element style (e.g. resulting from "width=20 height=100%").',
              optional: true,
              $ref: "CSSStyle",
            },
            {
              name: "matchedCSSRules",
              description:
                "CSS rules matching this node, from all applicable stylesheets.",
              optional: true,
              type: "array",
              items: {
                $ref: "RuleMatch",
              },
            },
            {
              name: "pseudoElements",
              description: "Pseudo style matches for this node.",
              optional: true,
              type: "array",
              items: {
                $ref: "PseudoElementMatches",
              },
            },
            {
              name: "inherited",
              description:
                "A chain of inherited styles (from the immediate node parent up to the DOM tree root).",
              optional: true,
              type: "array",
              items: {
                $ref: "InheritedStyleEntry",
              },
            },
            {
              name: "inheritedPseudoElements",
              description:
                "A chain of inherited pseudo element styles (from the immediate node parent up to the DOM tree root).",
              optional: true,
              type: "array",
              items: {
                $ref: "InheritedPseudoElementMatches",
              },
            },
            {
              name: "cssKeyframesRules",
              description:
                "A list of CSS keyframed animations matching this node.",
              optional: true,
              type: "array",
              items: {
                $ref: "CSSKeyframesRule",
              },
            },
            {
              name: "parentLayoutNodeId",
              description:
                "Id of the first parent element that does not have display: contents.",
              experimental: true,
              optional: true,
              $ref: "DOM.NodeId",
            },
          ],
        },
        {
          name: "getMediaQueries",
          description:
            "Returns all media queries parsed by the rendering engine.",
          returns: [
            {
              name: "medias",
              type: "array",
              items: {
                $ref: "CSSMedia",
              },
            },
          ],
        },
        {
          name: "getPlatformFontsForNode",
          description:
            "Requests information about platform fonts which we used to render child TextNodes in the given\nnode.",
          parameters: [
            {
              name: "nodeId",
              $ref: "DOM.NodeId",
            },
          ],
          returns: [
            {
              name: "fonts",
              description: "Usage statistics for every employed platform font.",
              type: "array",
              items: {
                $ref: "PlatformFontUsage",
              },
            },
          ],
        },
        {
          name: "getStyleSheetText",
          description: "Returns the current textual content for a stylesheet.",
          parameters: [
            {
              name: "styleSheetId",
              $ref: "StyleSheetId",
            },
          ],
          returns: [
            {
              name: "text",
              description: "The stylesheet text.",
              type: "string",
            },
          ],
        },
        {
          name: "getLayersForNode",
          description:
            "Returns all layers parsed by the rendering engine for the tree scope of a node.\nGiven a DOM element identified by nodeId, getLayersForNode returns the root\nlayer for the nearest ancestor document or shadow root. The layer root contains\nthe full layer tree for the tree scope and their ordering.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              $ref: "DOM.NodeId",
            },
          ],
          returns: [
            {
              name: "rootLayer",
              $ref: "CSSLayerData",
            },
          ],
        },
        {
          name: "trackComputedStyleUpdates",
          description:
            "Starts tracking the given computed styles for updates. The specified array of properties\nreplaces the one previously specified. Pass empty array to disable tracking.\nUse takeComputedStyleUpdates to retrieve the list of nodes that had properties modified.\nThe changes to computed style properties are only tracked for nodes pushed to the front-end\nby the DOM agent. If no changes to the tracked properties occur after the node has been pushed\nto the front-end, no updates will be issued for the node.",
          experimental: true,
          parameters: [
            {
              name: "propertiesToTrack",
              type: "array",
              items: {
                $ref: "CSSComputedStyleProperty",
              },
            },
          ],
        },
        {
          name: "takeComputedStyleUpdates",
          description: "Polls the next batch of computed style updates.",
          experimental: true,
          returns: [
            {
              name: "nodeIds",
              description:
                "The list of node Ids that have their tracked computed styles updated",
              type: "array",
              items: {
                $ref: "DOM.NodeId",
              },
            },
          ],
        },
        {
          name: "setEffectivePropertyValueForNode",
          description:
            "Find a rule with the given active property for the given node and set the new value for this\nproperty",
          parameters: [
            {
              name: "nodeId",
              description: "The element id for which to set property.",
              $ref: "DOM.NodeId",
            },
            {
              name: "propertyName",
              type: "string",
            },
            {
              name: "value",
              type: "string",
            },
          ],
        },
        {
          name: "setKeyframeKey",
          description: "Modifies the keyframe rule key text.",
          parameters: [
            {
              name: "styleSheetId",
              $ref: "StyleSheetId",
            },
            {
              name: "range",
              $ref: "SourceRange",
            },
            {
              name: "keyText",
              type: "string",
            },
          ],
          returns: [
            {
              name: "keyText",
              description: "The resulting key text after modification.",
              $ref: "Value",
            },
          ],
        },
        {
          name: "setMediaText",
          description: "Modifies the rule selector.",
          parameters: [
            {
              name: "styleSheetId",
              $ref: "StyleSheetId",
            },
            {
              name: "range",
              $ref: "SourceRange",
            },
            {
              name: "text",
              type: "string",
            },
          ],
          returns: [
            {
              name: "media",
              description: "The resulting CSS media rule after modification.",
              $ref: "CSSMedia",
            },
          ],
        },
        {
          name: "setContainerQueryText",
          description: "Modifies the expression of a container query.",
          experimental: true,
          parameters: [
            {
              name: "styleSheetId",
              $ref: "StyleSheetId",
            },
            {
              name: "range",
              $ref: "SourceRange",
            },
            {
              name: "text",
              type: "string",
            },
          ],
          returns: [
            {
              name: "containerQuery",
              description:
                "The resulting CSS container query rule after modification.",
              $ref: "CSSContainerQuery",
            },
          ],
        },
        {
          name: "setSupportsText",
          description: "Modifies the expression of a supports at-rule.",
          experimental: true,
          parameters: [
            {
              name: "styleSheetId",
              $ref: "StyleSheetId",
            },
            {
              name: "range",
              $ref: "SourceRange",
            },
            {
              name: "text",
              type: "string",
            },
          ],
          returns: [
            {
              name: "supports",
              description:
                "The resulting CSS Supports rule after modification.",
              $ref: "CSSSupports",
            },
          ],
        },
        {
          name: "setScopeText",
          description: "Modifies the expression of a scope at-rule.",
          experimental: true,
          parameters: [
            {
              name: "styleSheetId",
              $ref: "StyleSheetId",
            },
            {
              name: "range",
              $ref: "SourceRange",
            },
            {
              name: "text",
              type: "string",
            },
          ],
          returns: [
            {
              name: "scope",
              description: "The resulting CSS Scope rule after modification.",
              $ref: "CSSScope",
            },
          ],
        },
        {
          name: "setRuleSelector",
          description: "Modifies the rule selector.",
          parameters: [
            {
              name: "styleSheetId",
              $ref: "StyleSheetId",
            },
            {
              name: "range",
              $ref: "SourceRange",
            },
            {
              name: "selector",
              type: "string",
            },
          ],
          returns: [
            {
              name: "selectorList",
              description: "The resulting selector list after modification.",
              $ref: "SelectorList",
            },
          ],
        },
        {
          name: "setStyleSheetText",
          description: "Sets the new stylesheet text.",
          parameters: [
            {
              name: "styleSheetId",
              $ref: "StyleSheetId",
            },
            {
              name: "text",
              type: "string",
            },
          ],
          returns: [
            {
              name: "sourceMapURL",
              description: "URL of source map associated with script (if any).",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "setStyleTexts",
          description:
            "Applies specified style edits one after another in the given order.",
          parameters: [
            {
              name: "edits",
              type: "array",
              items: {
                $ref: "StyleDeclarationEdit",
              },
            },
          ],
          returns: [
            {
              name: "styles",
              description: "The resulting styles after modification.",
              type: "array",
              items: {
                $ref: "CSSStyle",
              },
            },
          ],
        },
        {
          name: "startRuleUsageTracking",
          description: "Enables the selector recording.",
        },
        {
          name: "stopRuleUsageTracking",
          description:
            "Stop tracking rule usage and return the list of rules that were used since last call to\n`takeCoverageDelta` (or since start of coverage instrumentation)",
          returns: [
            {
              name: "ruleUsage",
              type: "array",
              items: {
                $ref: "RuleUsage",
              },
            },
          ],
        },
        {
          name: "takeCoverageDelta",
          description:
            "Obtain list of rules that became used since last call to this method (or since start of coverage\ninstrumentation)",
          returns: [
            {
              name: "coverage",
              type: "array",
              items: {
                $ref: "RuleUsage",
              },
            },
            {
              name: "timestamp",
              description: "Monotonically increasing time, in seconds.",
              type: "number",
            },
          ],
        },
        {
          name: "setLocalFontsEnabled",
          description:
            "Enables/disables rendering of local CSS fonts (enabled by default).",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              description: "Whether rendering of local fonts is enabled.",
              type: "boolean",
            },
          ],
        },
      ],
      events: [
        {
          name: "fontsUpdated",
          description:
            "Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded\nweb font",
          parameters: [
            {
              name: "font",
              description: "The web font that has loaded.",
              optional: true,
              $ref: "FontFace",
            },
          ],
        },
        {
          name: "mediaQueryResultChanged",
          description:
            "Fires whenever a MediaQuery result changes (for example, after a browser window has been\nresized.) The current implementation considers only viewport-dependent media features.",
        },
        {
          name: "styleSheetAdded",
          description: "Fired whenever an active document stylesheet is added.",
          parameters: [
            {
              name: "header",
              description: "Added stylesheet metainfo.",
              $ref: "CSSStyleSheetHeader",
            },
          ],
        },
        {
          name: "styleSheetChanged",
          description:
            "Fired whenever a stylesheet is changed as a result of the client operation.",
          parameters: [
            {
              name: "styleSheetId",
              $ref: "StyleSheetId",
            },
          ],
        },
        {
          name: "styleSheetRemoved",
          description:
            "Fired whenever an active document stylesheet is removed.",
          parameters: [
            {
              name: "styleSheetId",
              description: "Identifier of the removed stylesheet.",
              $ref: "StyleSheetId",
            },
          ],
        },
      ],
    },
    {
      domain: "CacheStorage",
      experimental: true,
      types: [
        {
          id: "CacheId",
          description: "Unique identifier of the Cache object.",
          type: "string",
        },
        {
          id: "CachedResponseType",
          description: "type of HTTP response cached",
          type: "string",
          enum: [
            "basic",
            "cors",
            "default",
            "error",
            "opaqueResponse",
            "opaqueRedirect",
          ],
        },
        {
          id: "DataEntry",
          description: "Data entry.",
          type: "object",
          properties: [
            {
              name: "requestURL",
              description: "Request URL.",
              type: "string",
            },
            {
              name: "requestMethod",
              description: "Request method.",
              type: "string",
            },
            {
              name: "requestHeaders",
              description: "Request headers",
              type: "array",
              items: {
                $ref: "Header",
              },
            },
            {
              name: "responseTime",
              description: "Number of seconds since epoch.",
              type: "number",
            },
            {
              name: "responseStatus",
              description: "HTTP response status code.",
              type: "integer",
            },
            {
              name: "responseStatusText",
              description: "HTTP response status text.",
              type: "string",
            },
            {
              name: "responseType",
              description: "HTTP response type",
              $ref: "CachedResponseType",
            },
            {
              name: "responseHeaders",
              description: "Response headers",
              type: "array",
              items: {
                $ref: "Header",
              },
            },
          ],
        },
        {
          id: "Cache",
          description: "Cache identifier.",
          type: "object",
          properties: [
            {
              name: "cacheId",
              description: "An opaque unique id of the cache.",
              $ref: "CacheId",
            },
            {
              name: "securityOrigin",
              description: "Security origin of the cache.",
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key of the cache.",
              type: "string",
            },
            {
              name: "cacheName",
              description: "The name of the cache.",
              type: "string",
            },
          ],
        },
        {
          id: "Header",
          type: "object",
          properties: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "value",
              type: "string",
            },
          ],
        },
        {
          id: "CachedResponse",
          description: "Cached response",
          type: "object",
          properties: [
            {
              name: "body",
              description:
                "Entry content, base64-encoded. (Encoded as a base64 string when passed over JSON)",
              type: "string",
            },
          ],
        },
      ],
      commands: [
        {
          name: "deleteCache",
          description: "Deletes a cache.",
          parameters: [
            {
              name: "cacheId",
              description: "Id of cache for deletion.",
              $ref: "CacheId",
            },
          ],
        },
        {
          name: "deleteEntry",
          description: "Deletes a cache entry.",
          parameters: [
            {
              name: "cacheId",
              description: "Id of cache where the entry will be deleted.",
              $ref: "CacheId",
            },
            {
              name: "request",
              description: "URL spec of the request.",
              type: "string",
            },
          ],
        },
        {
          name: "requestCacheNames",
          description: "Requests cache names.",
          parameters: [
            {
              name: "securityOrigin",
              description:
                "At least and at most one of securityOrigin, storageKey must be specified.\nSecurity origin.",
              optional: true,
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key.",
              optional: true,
              type: "string",
            },
          ],
          returns: [
            {
              name: "caches",
              description: "Caches for the security origin.",
              type: "array",
              items: {
                $ref: "Cache",
              },
            },
          ],
        },
        {
          name: "requestCachedResponse",
          description: "Fetches cache entry.",
          parameters: [
            {
              name: "cacheId",
              description: "Id of cache that contains the entry.",
              $ref: "CacheId",
            },
            {
              name: "requestURL",
              description: "URL spec of the request.",
              type: "string",
            },
            {
              name: "requestHeaders",
              description: "headers of the request.",
              type: "array",
              items: {
                $ref: "Header",
              },
            },
          ],
          returns: [
            {
              name: "response",
              description: "Response read from the cache.",
              $ref: "CachedResponse",
            },
          ],
        },
        {
          name: "requestEntries",
          description: "Requests data from cache.",
          parameters: [
            {
              name: "cacheId",
              description: "ID of cache to get entries from.",
              $ref: "CacheId",
            },
            {
              name: "skipCount",
              description: "Number of records to skip.",
              optional: true,
              type: "integer",
            },
            {
              name: "pageSize",
              description: "Number of records to fetch.",
              optional: true,
              type: "integer",
            },
            {
              name: "pathFilter",
              description:
                "If present, only return the entries containing this substring in the path",
              optional: true,
              type: "string",
            },
          ],
          returns: [
            {
              name: "cacheDataEntries",
              description: "Array of object store data entries.",
              type: "array",
              items: {
                $ref: "DataEntry",
              },
            },
            {
              name: "returnCount",
              description:
                "Count of returned entries from this storage. If pathFilter is empty, it\nis the count of all entries from this storage.",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      domain: "Cast",
      description:
        "A domain for interacting with Cast, Presentation API, and Remote Playback API\nfunctionalities.",
      experimental: true,
      types: [
        {
          id: "Sink",
          type: "object",
          properties: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "id",
              type: "string",
            },
            {
              name: "session",
              description:
                "Text describing the current session. Present only if there is an active\nsession on the sink.",
              optional: true,
              type: "string",
            },
          ],
        },
      ],
      commands: [
        {
          name: "enable",
          description:
            "Starts observing for sinks that can be used for tab mirroring, and if set,\nsinks compatible with |presentationUrl| as well. When sinks are found, a\n|sinksUpdated| event is fired.\nAlso starts observing for issue messages. When an issue is added or removed,\nan |issueUpdated| event is fired.",
          parameters: [
            {
              name: "presentationUrl",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "disable",
          description: "Stops observing for sinks and issues.",
        },
        {
          name: "setSinkToUse",
          description:
            "Sets a sink to be used when the web page requests the browser to choose a\nsink via Presentation API, Remote Playback API, or Cast SDK.",
          parameters: [
            {
              name: "sinkName",
              type: "string",
            },
          ],
        },
        {
          name: "startDesktopMirroring",
          description: "Starts mirroring the desktop to the sink.",
          parameters: [
            {
              name: "sinkName",
              type: "string",
            },
          ],
        },
        {
          name: "startTabMirroring",
          description: "Starts mirroring the tab to the sink.",
          parameters: [
            {
              name: "sinkName",
              type: "string",
            },
          ],
        },
        {
          name: "stopCasting",
          description: "Stops the active Cast session on the sink.",
          parameters: [
            {
              name: "sinkName",
              type: "string",
            },
          ],
        },
      ],
      events: [
        {
          name: "sinksUpdated",
          description:
            "This is fired whenever the list of available sinks changes. A sink is a\ndevice or a software surface that you can cast to.",
          parameters: [
            {
              name: "sinks",
              type: "array",
              items: {
                $ref: "Sink",
              },
            },
          ],
        },
        {
          name: "issueUpdated",
          description:
            "This is fired whenever the outstanding issue/error message changes.\n|issueMessage| is empty if there is no issue.",
          parameters: [
            {
              name: "issueMessage",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      domain: "DOM",
      description:
        "This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object\nthat has an `id`. This `id` can be used to get additional information on the Node, resolve it into\nthe JavaScript object wrapper, etc. It is important that client receives DOM events only for the\nnodes that are known to the client. Backend keeps track of the nodes that were sent to the client\nand never sends the same node twice. It is client's responsibility to collect information about\nthe nodes that were sent to the client.<p>Note that `iframe` owner elements will return\ncorresponding document elements as their child nodes.</p>",
      dependencies: ["Runtime"],
      types: [
        {
          id: "NodeId",
          description: "Unique DOM node identifier.",
          type: "integer",
        },
        {
          id: "BackendNodeId",
          description:
            "Unique DOM node identifier used to reference a node that may not have been pushed to the\nfront-end.",
          type: "integer",
        },
        {
          id: "BackendNode",
          description: "Backend node with a friendly name.",
          type: "object",
          properties: [
            {
              name: "nodeType",
              description: "`Node`'s nodeType.",
              type: "integer",
            },
            {
              name: "nodeName",
              description: "`Node`'s nodeName.",
              type: "string",
            },
            {
              name: "backendNodeId",
              $ref: "BackendNodeId",
            },
          ],
        },
        {
          id: "PseudoType",
          description: "Pseudo element type.",
          type: "string",
          enum: [
            "first-line",
            "first-letter",
            "before",
            "after",
            "marker",
            "backdrop",
            "selection",
            "target-text",
            "spelling-error",
            "grammar-error",
            "highlight",
            "first-line-inherited",
            "scrollbar",
            "scrollbar-thumb",
            "scrollbar-button",
            "scrollbar-track",
            "scrollbar-track-piece",
            "scrollbar-corner",
            "resizer",
            "input-list-button",
            "view-transition",
            "view-transition-group",
            "view-transition-image-pair",
            "view-transition-old",
            "view-transition-new",
          ],
        },
        {
          id: "ShadowRootType",
          description: "Shadow root type.",
          type: "string",
          enum: ["user-agent", "open", "closed"],
        },
        {
          id: "CompatibilityMode",
          description: "Document compatibility mode.",
          type: "string",
          enum: ["QuirksMode", "LimitedQuirksMode", "NoQuirksMode"],
        },
        {
          id: "PhysicalAxes",
          description: "ContainerSelector physical axes",
          type: "string",
          enum: ["Horizontal", "Vertical", "Both"],
        },
        {
          id: "LogicalAxes",
          description: "ContainerSelector logical axes",
          type: "string",
          enum: ["Inline", "Block", "Both"],
        },
        {
          id: "Node",
          description:
            "DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.\nDOMNode is a base node mirror type.",
          type: "object",
          properties: [
            {
              name: "nodeId",
              description:
                "Node identifier that is passed into the rest of the DOM messages as the `nodeId`. Backend\nwill only push node with given `id` once. It is aware of all requested nodes and will only\nfire DOM events for nodes known to the client.",
              $ref: "NodeId",
            },
            {
              name: "parentId",
              description: "The id of the parent node if any.",
              optional: true,
              $ref: "NodeId",
            },
            {
              name: "backendNodeId",
              description: "The BackendNodeId for this node.",
              $ref: "BackendNodeId",
            },
            {
              name: "nodeType",
              description: "`Node`'s nodeType.",
              type: "integer",
            },
            {
              name: "nodeName",
              description: "`Node`'s nodeName.",
              type: "string",
            },
            {
              name: "localName",
              description: "`Node`'s localName.",
              type: "string",
            },
            {
              name: "nodeValue",
              description: "`Node`'s nodeValue.",
              type: "string",
            },
            {
              name: "childNodeCount",
              description: "Child count for `Container` nodes.",
              optional: true,
              type: "integer",
            },
            {
              name: "children",
              description:
                "Child nodes of this node when requested with children.",
              optional: true,
              type: "array",
              items: {
                $ref: "Node",
              },
            },
            {
              name: "attributes",
              description:
                "Attributes of the `Element` node in the form of flat array `[name1, value1, name2, value2]`.",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "documentURL",
              description:
                "Document URL that `Document` or `FrameOwner` node points to.",
              optional: true,
              type: "string",
            },
            {
              name: "baseURL",
              description:
                "Base URL that `Document` or `FrameOwner` node uses for URL completion.",
              optional: true,
              type: "string",
            },
            {
              name: "publicId",
              description: "`DocumentType`'s publicId.",
              optional: true,
              type: "string",
            },
            {
              name: "systemId",
              description: "`DocumentType`'s systemId.",
              optional: true,
              type: "string",
            },
            {
              name: "internalSubset",
              description: "`DocumentType`'s internalSubset.",
              optional: true,
              type: "string",
            },
            {
              name: "xmlVersion",
              description: "`Document`'s XML version in case of XML documents.",
              optional: true,
              type: "string",
            },
            {
              name: "name",
              description: "`Attr`'s name.",
              optional: true,
              type: "string",
            },
            {
              name: "value",
              description: "`Attr`'s value.",
              optional: true,
              type: "string",
            },
            {
              name: "pseudoType",
              description: "Pseudo element type for this node.",
              optional: true,
              $ref: "PseudoType",
            },
            {
              name: "pseudoIdentifier",
              description:
                "Pseudo element identifier for this node. Only present if there is a\nvalid pseudoType.",
              optional: true,
              type: "string",
            },
            {
              name: "shadowRootType",
              description: "Shadow root type.",
              optional: true,
              $ref: "ShadowRootType",
            },
            {
              name: "frameId",
              description: "Frame ID for frame owner elements.",
              optional: true,
              $ref: "Page.FrameId",
            },
            {
              name: "contentDocument",
              description: "Content document for frame owner elements.",
              optional: true,
              $ref: "Node",
            },
            {
              name: "shadowRoots",
              description: "Shadow root list for given element host.",
              optional: true,
              type: "array",
              items: {
                $ref: "Node",
              },
            },
            {
              name: "templateContent",
              description: "Content document fragment for template elements.",
              optional: true,
              $ref: "Node",
            },
            {
              name: "pseudoElements",
              description: "Pseudo elements associated with this node.",
              optional: true,
              type: "array",
              items: {
                $ref: "Node",
              },
            },
            {
              name: "importedDocument",
              description:
                "Deprecated, as the HTML Imports API has been removed (crbug.com/937746).\nThis property used to return the imported document for the HTMLImport links.\nThe property is always undefined now.",
              deprecated: true,
              optional: true,
              $ref: "Node",
            },
            {
              name: "distributedNodes",
              description: "Distributed nodes for given insertion point.",
              optional: true,
              type: "array",
              items: {
                $ref: "BackendNode",
              },
            },
            {
              name: "isSVG",
              description: "Whether the node is SVG.",
              optional: true,
              type: "boolean",
            },
            {
              name: "compatibilityMode",
              optional: true,
              $ref: "CompatibilityMode",
            },
            {
              name: "assignedSlot",
              optional: true,
              $ref: "BackendNode",
            },
          ],
        },
        {
          id: "RGBA",
          description: "A structure holding an RGBA color.",
          type: "object",
          properties: [
            {
              name: "r",
              description: "The red component, in the [0-255] range.",
              type: "integer",
            },
            {
              name: "g",
              description: "The green component, in the [0-255] range.",
              type: "integer",
            },
            {
              name: "b",
              description: "The blue component, in the [0-255] range.",
              type: "integer",
            },
            {
              name: "a",
              description:
                "The alpha component, in the [0-1] range (default: 1).",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          id: "Quad",
          description:
            "An array of quad vertices, x immediately followed by y for each point, points clock-wise.",
          type: "array",
          items: {
            type: "number",
          },
        },
        {
          id: "BoxModel",
          description: "Box model.",
          type: "object",
          properties: [
            {
              name: "content",
              description: "Content box",
              $ref: "Quad",
            },
            {
              name: "padding",
              description: "Padding box",
              $ref: "Quad",
            },
            {
              name: "border",
              description: "Border box",
              $ref: "Quad",
            },
            {
              name: "margin",
              description: "Margin box",
              $ref: "Quad",
            },
            {
              name: "width",
              description: "Node width",
              type: "integer",
            },
            {
              name: "height",
              description: "Node height",
              type: "integer",
            },
            {
              name: "shapeOutside",
              description: "Shape outside coordinates",
              optional: true,
              $ref: "ShapeOutsideInfo",
            },
          ],
        },
        {
          id: "ShapeOutsideInfo",
          description: "CSS Shape Outside details.",
          type: "object",
          properties: [
            {
              name: "bounds",
              description: "Shape bounds",
              $ref: "Quad",
            },
            {
              name: "shape",
              description: "Shape coordinate details",
              type: "array",
              items: {
                type: "any",
              },
            },
            {
              name: "marginShape",
              description: "Margin shape bounds",
              type: "array",
              items: {
                type: "any",
              },
            },
          ],
        },
        {
          id: "Rect",
          description: "Rectangle.",
          type: "object",
          properties: [
            {
              name: "x",
              description: "X coordinate",
              type: "number",
            },
            {
              name: "y",
              description: "Y coordinate",
              type: "number",
            },
            {
              name: "width",
              description: "Rectangle width",
              type: "number",
            },
            {
              name: "height",
              description: "Rectangle height",
              type: "number",
            },
          ],
        },
        {
          id: "CSSComputedStyleProperty",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Computed style property name.",
              type: "string",
            },
            {
              name: "value",
              description: "Computed style property value.",
              type: "string",
            },
          ],
        },
      ],
      commands: [
        {
          name: "collectClassNamesFromSubtree",
          description:
            "Collects class names for the node with given id and all of it's child nodes.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to collect class names.",
              $ref: "NodeId",
            },
          ],
          returns: [
            {
              name: "classNames",
              description: "Class name list.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "copyTo",
          description:
            "Creates a deep copy of the specified node and places it into the target container before the\ngiven anchor.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to copy.",
              $ref: "NodeId",
            },
            {
              name: "targetNodeId",
              description: "Id of the element to drop the copy into.",
              $ref: "NodeId",
            },
            {
              name: "insertBeforeNodeId",
              description:
                "Drop the copy before this node (if absent, the copy becomes the last child of\n`targetNodeId`).",
              optional: true,
              $ref: "NodeId",
            },
          ],
          returns: [
            {
              name: "nodeId",
              description: "Id of the node clone.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "describeNode",
          description:
            "Describes node given its id, does not require domain to be enabled. Does not start tracking any\nobjects, can be used for automation.",
          parameters: [
            {
              name: "nodeId",
              description: "Identifier of the node.",
              optional: true,
              $ref: "NodeId",
            },
            {
              name: "backendNodeId",
              description: "Identifier of the backend node.",
              optional: true,
              $ref: "BackendNodeId",
            },
            {
              name: "objectId",
              description: "JavaScript object id of the node wrapper.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
            {
              name: "depth",
              description:
                "The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the\nentire subtree or provide an integer larger than 0.",
              optional: true,
              type: "integer",
            },
            {
              name: "pierce",
              description:
                "Whether or not iframes and shadow roots should be traversed when returning the subtree\n(default is false).",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "node",
              description: "Node description.",
              $ref: "Node",
            },
          ],
        },
        {
          name: "scrollIntoViewIfNeeded",
          description:
            "Scrolls the specified rect of the given node into view if not already visible.\nNote: exactly one between nodeId, backendNodeId and objectId should be passed\nto identify the node.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description: "Identifier of the node.",
              optional: true,
              $ref: "NodeId",
            },
            {
              name: "backendNodeId",
              description: "Identifier of the backend node.",
              optional: true,
              $ref: "BackendNodeId",
            },
            {
              name: "objectId",
              description: "JavaScript object id of the node wrapper.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
            {
              name: "rect",
              description:
                "The rect to be scrolled into view, relative to the node's border box, in CSS pixels.\nWhen omitted, center of the node will be used, similar to Element.scrollIntoView.",
              optional: true,
              $ref: "Rect",
            },
          ],
        },
        {
          name: "disable",
          description: "Disables DOM agent for the given page.",
        },
        {
          name: "discardSearchResults",
          description:
            "Discards search results from the session with the given id. `getSearchResults` should no longer\nbe called for that search.",
          experimental: true,
          parameters: [
            {
              name: "searchId",
              description: "Unique search session identifier.",
              type: "string",
            },
          ],
        },
        {
          name: "enable",
          description: "Enables DOM agent for the given page.",
          parameters: [
            {
              name: "includeWhitespace",
              description:
                "Whether to include whitespaces in the children array of returned Nodes.",
              experimental: true,
              optional: true,
              type: "string",
              enum: ["none", "all"],
            },
          ],
        },
        {
          name: "focus",
          description: "Focuses the given element.",
          parameters: [
            {
              name: "nodeId",
              description: "Identifier of the node.",
              optional: true,
              $ref: "NodeId",
            },
            {
              name: "backendNodeId",
              description: "Identifier of the backend node.",
              optional: true,
              $ref: "BackendNodeId",
            },
            {
              name: "objectId",
              description: "JavaScript object id of the node wrapper.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
          ],
        },
        {
          name: "getAttributes",
          description: "Returns attributes for the specified node.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to retrieve attibutes for.",
              $ref: "NodeId",
            },
          ],
          returns: [
            {
              name: "attributes",
              description:
                "An interleaved array of node attribute names and values.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "getBoxModel",
          description: "Returns boxes for the given node.",
          parameters: [
            {
              name: "nodeId",
              description: "Identifier of the node.",
              optional: true,
              $ref: "NodeId",
            },
            {
              name: "backendNodeId",
              description: "Identifier of the backend node.",
              optional: true,
              $ref: "BackendNodeId",
            },
            {
              name: "objectId",
              description: "JavaScript object id of the node wrapper.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
          ],
          returns: [
            {
              name: "model",
              description: "Box model for the node.",
              $ref: "BoxModel",
            },
          ],
        },
        {
          name: "getContentQuads",
          description:
            "Returns quads that describe node position on the page. This method\nmight return multiple quads for inline nodes.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description: "Identifier of the node.",
              optional: true,
              $ref: "NodeId",
            },
            {
              name: "backendNodeId",
              description: "Identifier of the backend node.",
              optional: true,
              $ref: "BackendNodeId",
            },
            {
              name: "objectId",
              description: "JavaScript object id of the node wrapper.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
          ],
          returns: [
            {
              name: "quads",
              description:
                "Quads that describe node layout relative to viewport.",
              type: "array",
              items: {
                $ref: "Quad",
              },
            },
          ],
        },
        {
          name: "getDocument",
          description:
            "Returns the root DOM node (and optionally the subtree) to the caller.",
          parameters: [
            {
              name: "depth",
              description:
                "The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the\nentire subtree or provide an integer larger than 0.",
              optional: true,
              type: "integer",
            },
            {
              name: "pierce",
              description:
                "Whether or not iframes and shadow roots should be traversed when returning the subtree\n(default is false).",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "root",
              description: "Resulting node.",
              $ref: "Node",
            },
          ],
        },
        {
          name: "getFlattenedDocument",
          description:
            "Returns the root DOM node (and optionally the subtree) to the caller.\nDeprecated, as it is not designed to work well with the rest of the DOM agent.\nUse DOMSnapshot.captureSnapshot instead.",
          deprecated: true,
          parameters: [
            {
              name: "depth",
              description:
                "The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the\nentire subtree or provide an integer larger than 0.",
              optional: true,
              type: "integer",
            },
            {
              name: "pierce",
              description:
                "Whether or not iframes and shadow roots should be traversed when returning the subtree\n(default is false).",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "nodes",
              description: "Resulting node.",
              type: "array",
              items: {
                $ref: "Node",
              },
            },
          ],
        },
        {
          name: "getNodesForSubtreeByStyle",
          description: "Finds nodes with a given computed style in a subtree.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description: "Node ID pointing to the root of a subtree.",
              $ref: "NodeId",
            },
            {
              name: "computedStyles",
              description:
                "The style to filter nodes by (includes nodes if any of properties matches).",
              type: "array",
              items: {
                $ref: "CSSComputedStyleProperty",
              },
            },
            {
              name: "pierce",
              description:
                "Whether or not iframes and shadow roots in the same target should be traversed when returning the\nresults (default is false).",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "nodeIds",
              description: "Resulting nodes.",
              type: "array",
              items: {
                $ref: "NodeId",
              },
            },
          ],
        },
        {
          name: "getNodeForLocation",
          description:
            "Returns node id at given location. Depending on whether DOM domain is enabled, nodeId is\neither returned or not.",
          parameters: [
            {
              name: "x",
              description: "X coordinate.",
              type: "integer",
            },
            {
              name: "y",
              description: "Y coordinate.",
              type: "integer",
            },
            {
              name: "includeUserAgentShadowDOM",
              description:
                "False to skip to the nearest non-UA shadow root ancestor (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "ignorePointerEventsNone",
              description:
                "Whether to ignore pointer-events: none on elements and hit test them.",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "backendNodeId",
              description: "Resulting node.",
              $ref: "BackendNodeId",
            },
            {
              name: "frameId",
              description: "Frame this node belongs to.",
              $ref: "Page.FrameId",
            },
            {
              name: "nodeId",
              description:
                "Id of the node at given coordinates, only when enabled and requested document.",
              optional: true,
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "getOuterHTML",
          description: "Returns node's HTML markup.",
          parameters: [
            {
              name: "nodeId",
              description: "Identifier of the node.",
              optional: true,
              $ref: "NodeId",
            },
            {
              name: "backendNodeId",
              description: "Identifier of the backend node.",
              optional: true,
              $ref: "BackendNodeId",
            },
            {
              name: "objectId",
              description: "JavaScript object id of the node wrapper.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
          ],
          returns: [
            {
              name: "outerHTML",
              description: "Outer HTML markup.",
              type: "string",
            },
          ],
        },
        {
          name: "getRelayoutBoundary",
          description:
            "Returns the id of the nearest ancestor that is a relayout boundary.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node.",
              $ref: "NodeId",
            },
          ],
          returns: [
            {
              name: "nodeId",
              description: "Relayout boundary node id for the given node.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "getSearchResults",
          description:
            "Returns search results from given `fromIndex` to given `toIndex` from the search with the given\nidentifier.",
          experimental: true,
          parameters: [
            {
              name: "searchId",
              description: "Unique search session identifier.",
              type: "string",
            },
            {
              name: "fromIndex",
              description: "Start index of the search result to be returned.",
              type: "integer",
            },
            {
              name: "toIndex",
              description: "End index of the search result to be returned.",
              type: "integer",
            },
          ],
          returns: [
            {
              name: "nodeIds",
              description: "Ids of the search result nodes.",
              type: "array",
              items: {
                $ref: "NodeId",
              },
            },
          ],
        },
        {
          name: "hideHighlight",
          description: "Hides any highlight.",
          redirect: "Overlay",
        },
        {
          name: "highlightNode",
          description: "Highlights DOM node.",
          redirect: "Overlay",
        },
        {
          name: "highlightRect",
          description: "Highlights given rectangle.",
          redirect: "Overlay",
        },
        {
          name: "markUndoableState",
          description: "Marks last undoable state.",
          experimental: true,
        },
        {
          name: "moveTo",
          description:
            "Moves node into the new container, places it before the given anchor.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to move.",
              $ref: "NodeId",
            },
            {
              name: "targetNodeId",
              description: "Id of the element to drop the moved node into.",
              $ref: "NodeId",
            },
            {
              name: "insertBeforeNodeId",
              description:
                "Drop node before this one (if absent, the moved node becomes the last child of\n`targetNodeId`).",
              optional: true,
              $ref: "NodeId",
            },
          ],
          returns: [
            {
              name: "nodeId",
              description: "New id of the moved node.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "performSearch",
          description:
            "Searches for a given string in the DOM tree. Use `getSearchResults` to access search results or\n`cancelSearch` to end this search session.",
          experimental: true,
          parameters: [
            {
              name: "query",
              description:
                "Plain text or query selector or XPath search query.",
              type: "string",
            },
            {
              name: "includeUserAgentShadowDOM",
              description: "True to search in user agent shadow DOM.",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "searchId",
              description: "Unique search session identifier.",
              type: "string",
            },
            {
              name: "resultCount",
              description: "Number of search results.",
              type: "integer",
            },
          ],
        },
        {
          name: "pushNodeByPathToFrontend",
          description:
            "Requests that the node is sent to the caller given its path. // FIXME, use XPath",
          experimental: true,
          parameters: [
            {
              name: "path",
              description: "Path to node in the proprietary format.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "nodeId",
              description: "Id of the node for given path.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "pushNodesByBackendIdsToFrontend",
          description:
            "Requests that a batch of nodes is sent to the caller given their backend node ids.",
          experimental: true,
          parameters: [
            {
              name: "backendNodeIds",
              description: "The array of backend node ids.",
              type: "array",
              items: {
                $ref: "BackendNodeId",
              },
            },
          ],
          returns: [
            {
              name: "nodeIds",
              description:
                "The array of ids of pushed nodes that correspond to the backend ids specified in\nbackendNodeIds.",
              type: "array",
              items: {
                $ref: "NodeId",
              },
            },
          ],
        },
        {
          name: "querySelector",
          description: "Executes `querySelector` on a given node.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to query upon.",
              $ref: "NodeId",
            },
            {
              name: "selector",
              description: "Selector string.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "nodeId",
              description: "Query selector result.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "querySelectorAll",
          description: "Executes `querySelectorAll` on a given node.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to query upon.",
              $ref: "NodeId",
            },
            {
              name: "selector",
              description: "Selector string.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "nodeIds",
              description: "Query selector result.",
              type: "array",
              items: {
                $ref: "NodeId",
              },
            },
          ],
        },
        {
          name: "getTopLayerElements",
          description:
            "Returns NodeIds of current top layer elements.\nTop layer is rendered closest to the user within a viewport, therefore its elements always\nappear on top of all other content.",
          experimental: true,
          returns: [
            {
              name: "nodeIds",
              description: "NodeIds of top layer elements",
              type: "array",
              items: {
                $ref: "NodeId",
              },
            },
          ],
        },
        {
          name: "redo",
          description: "Re-does the last undone action.",
          experimental: true,
        },
        {
          name: "removeAttribute",
          description:
            "Removes attribute with given name from an element with given id.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the element to remove attribute from.",
              $ref: "NodeId",
            },
            {
              name: "name",
              description: "Name of the attribute to remove.",
              type: "string",
            },
          ],
        },
        {
          name: "removeNode",
          description: "Removes node with given id.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to remove.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "requestChildNodes",
          description:
            "Requests that children of the node with given id are returned to the caller in form of\n`setChildNodes` events where not only immediate children are retrieved, but all children down to\nthe specified depth.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to get children for.",
              $ref: "NodeId",
            },
            {
              name: "depth",
              description:
                "The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the\nentire subtree or provide an integer larger than 0.",
              optional: true,
              type: "integer",
            },
            {
              name: "pierce",
              description:
                "Whether or not iframes and shadow roots should be traversed when returning the sub-tree\n(default is false).",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "requestNode",
          description:
            "Requests that the node is sent to the caller given the JavaScript node object reference. All\nnodes that form the path from the node to the root are also sent to the client as a series of\n`setChildNodes` notifications.",
          parameters: [
            {
              name: "objectId",
              description: "JavaScript object id to convert into node.",
              $ref: "Runtime.RemoteObjectId",
            },
          ],
          returns: [
            {
              name: "nodeId",
              description: "Node id for given object.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "resolveNode",
          description:
            "Resolves the JavaScript node object for a given NodeId or BackendNodeId.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to resolve.",
              optional: true,
              $ref: "NodeId",
            },
            {
              name: "backendNodeId",
              description: "Backend identifier of the node to resolve.",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "objectGroup",
              description:
                "Symbolic group name that can be used to release multiple objects.",
              optional: true,
              type: "string",
            },
            {
              name: "executionContextId",
              description: "Execution context in which to resolve the node.",
              optional: true,
              $ref: "Runtime.ExecutionContextId",
            },
          ],
          returns: [
            {
              name: "object",
              description: "JavaScript object wrapper for given node.",
              $ref: "Runtime.RemoteObject",
            },
          ],
        },
        {
          name: "setAttributeValue",
          description: "Sets attribute for an element with given id.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the element to set attribute for.",
              $ref: "NodeId",
            },
            {
              name: "name",
              description: "Attribute name.",
              type: "string",
            },
            {
              name: "value",
              description: "Attribute value.",
              type: "string",
            },
          ],
        },
        {
          name: "setAttributesAsText",
          description:
            "Sets attributes on element with given id. This method is useful when user edits some existing\nattribute value and types in several attribute name/value pairs.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the element to set attributes for.",
              $ref: "NodeId",
            },
            {
              name: "text",
              description:
                "Text with a number of attributes. Will parse this text using HTML parser.",
              type: "string",
            },
            {
              name: "name",
              description:
                "Attribute name to replace with new attributes derived from text in case text parsed\nsuccessfully.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "setFileInputFiles",
          description: "Sets files for the given file input element.",
          parameters: [
            {
              name: "files",
              description: "Array of file paths to set.",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "nodeId",
              description: "Identifier of the node.",
              optional: true,
              $ref: "NodeId",
            },
            {
              name: "backendNodeId",
              description: "Identifier of the backend node.",
              optional: true,
              $ref: "BackendNodeId",
            },
            {
              name: "objectId",
              description: "JavaScript object id of the node wrapper.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
          ],
        },
        {
          name: "setNodeStackTracesEnabled",
          description:
            "Sets if stack traces should be captured for Nodes. See `Node.getNodeStackTraces`. Default is disabled.",
          experimental: true,
          parameters: [
            {
              name: "enable",
              description: "Enable or disable.",
              type: "boolean",
            },
          ],
        },
        {
          name: "getNodeStackTraces",
          description:
            "Gets stack traces associated with a Node. As of now, only provides stack trace for Node creation.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to get stack traces for.",
              $ref: "NodeId",
            },
          ],
          returns: [
            {
              name: "creation",
              description: "Creation stack trace, if available.",
              optional: true,
              $ref: "Runtime.StackTrace",
            },
          ],
        },
        {
          name: "getFileInfo",
          description: "Returns file information for the given\nFile wrapper.",
          experimental: true,
          parameters: [
            {
              name: "objectId",
              description: "JavaScript object id of the node wrapper.",
              $ref: "Runtime.RemoteObjectId",
            },
          ],
          returns: [
            {
              name: "path",
              type: "string",
            },
          ],
        },
        {
          name: "setInspectedNode",
          description:
            "Enables console to refer to the node with given id via $x (see Command Line API for more details\n$x functions).",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description:
                "DOM node id to be accessible by means of $x command line API.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "setNodeName",
          description: "Sets node name for a node with given id.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to set name for.",
              $ref: "NodeId",
            },
            {
              name: "name",
              description: "New node's name.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "nodeId",
              description: "New node's id.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "setNodeValue",
          description: "Sets node value for a node with given id.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to set value for.",
              $ref: "NodeId",
            },
            {
              name: "value",
              description: "New node's value.",
              type: "string",
            },
          ],
        },
        {
          name: "setOuterHTML",
          description: "Sets node HTML markup, returns new node id.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to set markup for.",
              $ref: "NodeId",
            },
            {
              name: "outerHTML",
              description: "Outer HTML markup to set.",
              type: "string",
            },
          ],
        },
        {
          name: "undo",
          description: "Undoes the last performed action.",
          experimental: true,
        },
        {
          name: "getFrameOwner",
          description:
            "Returns iframe node that owns iframe with the given domain.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              $ref: "Page.FrameId",
            },
          ],
          returns: [
            {
              name: "backendNodeId",
              description: "Resulting node.",
              $ref: "BackendNodeId",
            },
            {
              name: "nodeId",
              description:
                "Id of the node at given coordinates, only when enabled and requested document.",
              optional: true,
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "getContainerForNode",
          description:
            "Returns the query container of the given node based on container query\nconditions: containerName, physical, and logical axes. If no axes are\nprovided, the style container is returned, which is the direct parent or the\nclosest element with a matching container-name.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              $ref: "NodeId",
            },
            {
              name: "containerName",
              optional: true,
              type: "string",
            },
            {
              name: "physicalAxes",
              optional: true,
              $ref: "PhysicalAxes",
            },
            {
              name: "logicalAxes",
              optional: true,
              $ref: "LogicalAxes",
            },
          ],
          returns: [
            {
              name: "nodeId",
              description:
                "The container node for the given node, or null if not found.",
              optional: true,
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "getQueryingDescendantsForContainer",
          description:
            "Returns the descendants of a container query container that have\ncontainer queries against this container.",
          experimental: true,
          parameters: [
            {
              name: "nodeId",
              description:
                "Id of the container node to find querying descendants from.",
              $ref: "NodeId",
            },
          ],
          returns: [
            {
              name: "nodeIds",
              description:
                "Descendant nodes with container queries against the given container.",
              type: "array",
              items: {
                $ref: "NodeId",
              },
            },
          ],
        },
      ],
      events: [
        {
          name: "attributeModified",
          description: "Fired when `Element`'s attribute is modified.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node that has changed.",
              $ref: "NodeId",
            },
            {
              name: "name",
              description: "Attribute name.",
              type: "string",
            },
            {
              name: "value",
              description: "Attribute value.",
              type: "string",
            },
          ],
        },
        {
          name: "attributeRemoved",
          description: "Fired when `Element`'s attribute is removed.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node that has changed.",
              $ref: "NodeId",
            },
            {
              name: "name",
              description: "A ttribute name.",
              type: "string",
            },
          ],
        },
        {
          name: "characterDataModified",
          description: "Mirrors `DOMCharacterDataModified` event.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node that has changed.",
              $ref: "NodeId",
            },
            {
              name: "characterData",
              description: "New text value.",
              type: "string",
            },
          ],
        },
        {
          name: "childNodeCountUpdated",
          description: "Fired when `Container`'s child node count has changed.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node that has changed.",
              $ref: "NodeId",
            },
            {
              name: "childNodeCount",
              description: "New node count.",
              type: "integer",
            },
          ],
        },
        {
          name: "childNodeInserted",
          description: "Mirrors `DOMNodeInserted` event.",
          parameters: [
            {
              name: "parentNodeId",
              description: "Id of the node that has changed.",
              $ref: "NodeId",
            },
            {
              name: "previousNodeId",
              description: "Id of the previous sibling.",
              $ref: "NodeId",
            },
            {
              name: "node",
              description: "Inserted node data.",
              $ref: "Node",
            },
          ],
        },
        {
          name: "childNodeRemoved",
          description: "Mirrors `DOMNodeRemoved` event.",
          parameters: [
            {
              name: "parentNodeId",
              description: "Parent id.",
              $ref: "NodeId",
            },
            {
              name: "nodeId",
              description: "Id of the node that has been removed.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "distributedNodesUpdated",
          description: "Called when distribution is changed.",
          experimental: true,
          parameters: [
            {
              name: "insertionPointId",
              description:
                "Insertion point where distributed nodes were updated.",
              $ref: "NodeId",
            },
            {
              name: "distributedNodes",
              description: "Distributed nodes for given insertion point.",
              type: "array",
              items: {
                $ref: "BackendNode",
              },
            },
          ],
        },
        {
          name: "documentUpdated",
          description:
            "Fired when `Document` has been totally updated. Node ids are no longer valid.",
        },
        {
          name: "inlineStyleInvalidated",
          description:
            "Fired when `Element`'s inline style is modified via a CSS property modification.",
          experimental: true,
          parameters: [
            {
              name: "nodeIds",
              description:
                "Ids of the nodes for which the inline styles have been invalidated.",
              type: "array",
              items: {
                $ref: "NodeId",
              },
            },
          ],
        },
        {
          name: "pseudoElementAdded",
          description: "Called when a pseudo element is added to an element.",
          experimental: true,
          parameters: [
            {
              name: "parentId",
              description: "Pseudo element's parent element id.",
              $ref: "NodeId",
            },
            {
              name: "pseudoElement",
              description: "The added pseudo element.",
              $ref: "Node",
            },
          ],
        },
        {
          name: "topLayerElementsUpdated",
          description: "Called when top layer elements are changed.",
          experimental: true,
        },
        {
          name: "pseudoElementRemoved",
          description:
            "Called when a pseudo element is removed from an element.",
          experimental: true,
          parameters: [
            {
              name: "parentId",
              description: "Pseudo element's parent element id.",
              $ref: "NodeId",
            },
            {
              name: "pseudoElementId",
              description: "The removed pseudo element id.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "setChildNodes",
          description:
            "Fired when backend wants to provide client with the missing DOM structure. This happens upon\nmost of the calls requesting node ids.",
          parameters: [
            {
              name: "parentId",
              description: "Parent node id to populate with children.",
              $ref: "NodeId",
            },
            {
              name: "nodes",
              description: "Child nodes array.",
              type: "array",
              items: {
                $ref: "Node",
              },
            },
          ],
        },
        {
          name: "shadowRootPopped",
          description: "Called when shadow root is popped from the element.",
          experimental: true,
          parameters: [
            {
              name: "hostId",
              description: "Host element id.",
              $ref: "NodeId",
            },
            {
              name: "rootId",
              description: "Shadow root id.",
              $ref: "NodeId",
            },
          ],
        },
        {
          name: "shadowRootPushed",
          description: "Called when shadow root is pushed into the element.",
          experimental: true,
          parameters: [
            {
              name: "hostId",
              description: "Host element id.",
              $ref: "NodeId",
            },
            {
              name: "root",
              description: "Shadow root.",
              $ref: "Node",
            },
          ],
        },
      ],
    },
    {
      domain: "DOMDebugger",
      description:
        "DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript\nexecution will stop on these operations as if there was a regular breakpoint set.",
      dependencies: ["DOM", "Debugger", "Runtime"],
      types: [
        {
          id: "DOMBreakpointType",
          description: "DOM breakpoint type.",
          type: "string",
          enum: ["subtree-modified", "attribute-modified", "node-removed"],
        },
        {
          id: "CSPViolationType",
          description: "CSP Violation type.",
          experimental: true,
          type: "string",
          enum: ["trustedtype-sink-violation", "trustedtype-policy-violation"],
        },
        {
          id: "EventListener",
          description: "Object event listener.",
          type: "object",
          properties: [
            {
              name: "type",
              description: "`EventListener`'s type.",
              type: "string",
            },
            {
              name: "useCapture",
              description: "`EventListener`'s useCapture.",
              type: "boolean",
            },
            {
              name: "passive",
              description: "`EventListener`'s passive flag.",
              type: "boolean",
            },
            {
              name: "once",
              description: "`EventListener`'s once flag.",
              type: "boolean",
            },
            {
              name: "scriptId",
              description: "Script id of the handler code.",
              $ref: "Runtime.ScriptId",
            },
            {
              name: "lineNumber",
              description: "Line number in the script (0-based).",
              type: "integer",
            },
            {
              name: "columnNumber",
              description: "Column number in the script (0-based).",
              type: "integer",
            },
            {
              name: "handler",
              description: "Event handler function value.",
              optional: true,
              $ref: "Runtime.RemoteObject",
            },
            {
              name: "originalHandler",
              description: "Event original handler function value.",
              optional: true,
              $ref: "Runtime.RemoteObject",
            },
            {
              name: "backendNodeId",
              description: "Node the listener is added to (if any).",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
          ],
        },
      ],
      commands: [
        {
          name: "getEventListeners",
          description: "Returns event listeners of the given object.",
          parameters: [
            {
              name: "objectId",
              description: "Identifier of the object to return listeners for.",
              $ref: "Runtime.RemoteObjectId",
            },
            {
              name: "depth",
              description:
                "The maximum depth at which Node children should be retrieved, defaults to 1. Use -1 for the\nentire subtree or provide an integer larger than 0.",
              optional: true,
              type: "integer",
            },
            {
              name: "pierce",
              description:
                "Whether or not iframes and shadow roots should be traversed when returning the subtree\n(default is false). Reports listeners for all contexts if pierce is enabled.",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "listeners",
              description: "Array of relevant listeners.",
              type: "array",
              items: {
                $ref: "EventListener",
              },
            },
          ],
        },
        {
          name: "removeDOMBreakpoint",
          description:
            "Removes DOM breakpoint that was set using `setDOMBreakpoint`.",
          parameters: [
            {
              name: "nodeId",
              description: "Identifier of the node to remove breakpoint from.",
              $ref: "DOM.NodeId",
            },
            {
              name: "type",
              description: "Type of the breakpoint to remove.",
              $ref: "DOMBreakpointType",
            },
          ],
        },
        {
          name: "removeEventListenerBreakpoint",
          description: "Removes breakpoint on particular DOM event.",
          parameters: [
            {
              name: "eventName",
              description: "Event name.",
              type: "string",
            },
            {
              name: "targetName",
              description: "EventTarget interface name.",
              experimental: true,
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "removeInstrumentationBreakpoint",
          description: "Removes breakpoint on particular native event.",
          experimental: true,
          parameters: [
            {
              name: "eventName",
              description: "Instrumentation name to stop on.",
              type: "string",
            },
          ],
        },
        {
          name: "removeXHRBreakpoint",
          description: "Removes breakpoint from XMLHttpRequest.",
          parameters: [
            {
              name: "url",
              description: "Resource URL substring.",
              type: "string",
            },
          ],
        },
        {
          name: "setBreakOnCSPViolation",
          description: "Sets breakpoint on particular CSP violations.",
          experimental: true,
          parameters: [
            {
              name: "violationTypes",
              description: "CSP Violations to stop upon.",
              type: "array",
              items: {
                $ref: "CSPViolationType",
              },
            },
          ],
        },
        {
          name: "setDOMBreakpoint",
          description: "Sets breakpoint on particular operation with DOM.",
          parameters: [
            {
              name: "nodeId",
              description: "Identifier of the node to set breakpoint on.",
              $ref: "DOM.NodeId",
            },
            {
              name: "type",
              description: "Type of the operation to stop upon.",
              $ref: "DOMBreakpointType",
            },
          ],
        },
        {
          name: "setEventListenerBreakpoint",
          description: "Sets breakpoint on particular DOM event.",
          parameters: [
            {
              name: "eventName",
              description: "DOM Event name to stop on (any DOM event will do).",
              type: "string",
            },
            {
              name: "targetName",
              description:
                'EventTarget interface name to stop on. If equal to `"*"` or not provided, will stop on any\nEventTarget.',
              experimental: true,
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "setInstrumentationBreakpoint",
          description: "Sets breakpoint on particular native event.",
          experimental: true,
          parameters: [
            {
              name: "eventName",
              description: "Instrumentation name to stop on.",
              type: "string",
            },
          ],
        },
        {
          name: "setXHRBreakpoint",
          description: "Sets breakpoint on XMLHttpRequest.",
          parameters: [
            {
              name: "url",
              description:
                "Resource URL substring. All XHRs having this substring in the URL will get stopped upon.",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      domain: "EventBreakpoints",
      description:
        "EventBreakpoints permits setting breakpoints on particular operations and\nevents in targets that run JavaScript but do not have a DOM.\nJavaScript execution will stop on these operations as if there was a regular\nbreakpoint set.",
      experimental: true,
      commands: [
        {
          name: "setInstrumentationBreakpoint",
          description: "Sets breakpoint on particular native event.",
          parameters: [
            {
              name: "eventName",
              description: "Instrumentation name to stop on.",
              type: "string",
            },
          ],
        },
        {
          name: "removeInstrumentationBreakpoint",
          description: "Removes breakpoint on particular native event.",
          parameters: [
            {
              name: "eventName",
              description: "Instrumentation name to stop on.",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      domain: "DOMSnapshot",
      description:
        "This domain facilitates obtaining document snapshots with DOM, layout, and style information.",
      experimental: true,
      dependencies: ["CSS", "DOM", "DOMDebugger", "Page"],
      types: [
        {
          id: "DOMNode",
          description: "A Node in the DOM tree.",
          type: "object",
          properties: [
            {
              name: "nodeType",
              description: "`Node`'s nodeType.",
              type: "integer",
            },
            {
              name: "nodeName",
              description: "`Node`'s nodeName.",
              type: "string",
            },
            {
              name: "nodeValue",
              description: "`Node`'s nodeValue.",
              type: "string",
            },
            {
              name: "textValue",
              description:
                "Only set for textarea elements, contains the text value.",
              optional: true,
              type: "string",
            },
            {
              name: "inputValue",
              description:
                "Only set for input elements, contains the input's associated text value.",
              optional: true,
              type: "string",
            },
            {
              name: "inputChecked",
              description:
                "Only set for radio and checkbox input elements, indicates if the element has been checked",
              optional: true,
              type: "boolean",
            },
            {
              name: "optionSelected",
              description:
                "Only set for option elements, indicates if the element has been selected",
              optional: true,
              type: "boolean",
            },
            {
              name: "backendNodeId",
              description:
                "`Node`'s id, corresponds to DOM.Node.backendNodeId.",
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "childNodeIndexes",
              description:
                "The indexes of the node's child nodes in the `domNodes` array returned by `getSnapshot`, if\nany.",
              optional: true,
              type: "array",
              items: {
                type: "integer",
              },
            },
            {
              name: "attributes",
              description: "Attributes of an `Element` node.",
              optional: true,
              type: "array",
              items: {
                $ref: "NameValue",
              },
            },
            {
              name: "pseudoElementIndexes",
              description:
                "Indexes of pseudo elements associated with this node in the `domNodes` array returned by\n`getSnapshot`, if any.",
              optional: true,
              type: "array",
              items: {
                type: "integer",
              },
            },
            {
              name: "layoutNodeIndex",
              description:
                "The index of the node's related layout tree node in the `layoutTreeNodes` array returned by\n`getSnapshot`, if any.",
              optional: true,
              type: "integer",
            },
            {
              name: "documentURL",
              description:
                "Document URL that `Document` or `FrameOwner` node points to.",
              optional: true,
              type: "string",
            },
            {
              name: "baseURL",
              description:
                "Base URL that `Document` or `FrameOwner` node uses for URL completion.",
              optional: true,
              type: "string",
            },
            {
              name: "contentLanguage",
              description:
                "Only set for documents, contains the document's content language.",
              optional: true,
              type: "string",
            },
            {
              name: "documentEncoding",
              description:
                "Only set for documents, contains the document's character set encoding.",
              optional: true,
              type: "string",
            },
            {
              name: "publicId",
              description: "`DocumentType` node's publicId.",
              optional: true,
              type: "string",
            },
            {
              name: "systemId",
              description: "`DocumentType` node's systemId.",
              optional: true,
              type: "string",
            },
            {
              name: "frameId",
              description:
                "Frame ID for frame owner elements and also for the document node.",
              optional: true,
              $ref: "Page.FrameId",
            },
            {
              name: "contentDocumentIndex",
              description:
                "The index of a frame owner element's content document in the `domNodes` array returned by\n`getSnapshot`, if any.",
              optional: true,
              type: "integer",
            },
            {
              name: "pseudoType",
              description: "Type of a pseudo element node.",
              optional: true,
              $ref: "DOM.PseudoType",
            },
            {
              name: "shadowRootType",
              description: "Shadow root type.",
              optional: true,
              $ref: "DOM.ShadowRootType",
            },
            {
              name: "isClickable",
              description:
                "Whether this DOM node responds to mouse clicks. This includes nodes that have had click\nevent listeners attached via JavaScript as well as anchor tags that naturally navigate when\nclicked.",
              optional: true,
              type: "boolean",
            },
            {
              name: "eventListeners",
              description: "Details of the node's event listeners, if any.",
              optional: true,
              type: "array",
              items: {
                $ref: "DOMDebugger.EventListener",
              },
            },
            {
              name: "currentSourceURL",
              description:
                "The selected url for nodes with a srcset attribute.",
              optional: true,
              type: "string",
            },
            {
              name: "originURL",
              description:
                "The url of the script (if any) that generates this node.",
              optional: true,
              type: "string",
            },
            {
              name: "scrollOffsetX",
              description: "Scroll offsets, set when this node is a Document.",
              optional: true,
              type: "number",
            },
            {
              name: "scrollOffsetY",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          id: "InlineTextBox",
          description:
            "Details of post layout rendered text positions. The exact layout should not be regarded as\nstable and may change between versions.",
          type: "object",
          properties: [
            {
              name: "boundingBox",
              description:
                "The bounding box in document coordinates. Note that scroll offset of the document is ignored.",
              $ref: "DOM.Rect",
            },
            {
              name: "startCharacterIndex",
              description:
                "The starting index in characters, for this post layout textbox substring. Characters that\nwould be represented as a surrogate pair in UTF-16 have length 2.",
              type: "integer",
            },
            {
              name: "numCharacters",
              description:
                "The number of characters in this post layout textbox substring. Characters that would be\nrepresented as a surrogate pair in UTF-16 have length 2.",
              type: "integer",
            },
          ],
        },
        {
          id: "LayoutTreeNode",
          description:
            "Details of an element in the DOM tree with a LayoutObject.",
          type: "object",
          properties: [
            {
              name: "domNodeIndex",
              description:
                "The index of the related DOM node in the `domNodes` array returned by `getSnapshot`.",
              type: "integer",
            },
            {
              name: "boundingBox",
              description:
                "The bounding box in document coordinates. Note that scroll offset of the document is ignored.",
              $ref: "DOM.Rect",
            },
            {
              name: "layoutText",
              description: "Contents of the LayoutText, if any.",
              optional: true,
              type: "string",
            },
            {
              name: "inlineTextNodes",
              description: "The post-layout inline text nodes, if any.",
              optional: true,
              type: "array",
              items: {
                $ref: "InlineTextBox",
              },
            },
            {
              name: "styleIndex",
              description:
                "Index into the `computedStyles` array returned by `getSnapshot`.",
              optional: true,
              type: "integer",
            },
            {
              name: "paintOrder",
              description:
                "Global paint order index, which is determined by the stacking order of the nodes. Nodes\nthat are painted together will have the same index. Only provided if includePaintOrder in\ngetSnapshot was true.",
              optional: true,
              type: "integer",
            },
            {
              name: "isStackingContext",
              description:
                "Set to true to indicate the element begins a new stacking context.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          id: "ComputedStyle",
          description:
            "A subset of the full ComputedStyle as defined by the request whitelist.",
          type: "object",
          properties: [
            {
              name: "properties",
              description: "Name/value pairs of computed style properties.",
              type: "array",
              items: {
                $ref: "NameValue",
              },
            },
          ],
        },
        {
          id: "NameValue",
          description: "A name/value pair.",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Attribute/property name.",
              type: "string",
            },
            {
              name: "value",
              description: "Attribute/property value.",
              type: "string",
            },
          ],
        },
        {
          id: "StringIndex",
          description: "Index of the string in the strings table.",
          type: "integer",
        },
        {
          id: "ArrayOfStrings",
          description: "Index of the string in the strings table.",
          type: "array",
          items: {
            $ref: "StringIndex",
          },
        },
        {
          id: "RareStringData",
          description: "Data that is only present on rare nodes.",
          type: "object",
          properties: [
            {
              name: "index",
              type: "array",
              items: {
                type: "integer",
              },
            },
            {
              name: "value",
              type: "array",
              items: {
                $ref: "StringIndex",
              },
            },
          ],
        },
        {
          id: "RareBooleanData",
          type: "object",
          properties: [
            {
              name: "index",
              type: "array",
              items: {
                type: "integer",
              },
            },
          ],
        },
        {
          id: "RareIntegerData",
          type: "object",
          properties: [
            {
              name: "index",
              type: "array",
              items: {
                type: "integer",
              },
            },
            {
              name: "value",
              type: "array",
              items: {
                type: "integer",
              },
            },
          ],
        },
        {
          id: "Rectangle",
          type: "array",
          items: {
            type: "number",
          },
        },
        {
          id: "DocumentSnapshot",
          description: "Document snapshot.",
          type: "object",
          properties: [
            {
              name: "documentURL",
              description:
                "Document URL that `Document` or `FrameOwner` node points to.",
              $ref: "StringIndex",
            },
            {
              name: "title",
              description: "Document title.",
              $ref: "StringIndex",
            },
            {
              name: "baseURL",
              description:
                "Base URL that `Document` or `FrameOwner` node uses for URL completion.",
              $ref: "StringIndex",
            },
            {
              name: "contentLanguage",
              description: "Contains the document's content language.",
              $ref: "StringIndex",
            },
            {
              name: "encodingName",
              description: "Contains the document's character set encoding.",
              $ref: "StringIndex",
            },
            {
              name: "publicId",
              description: "`DocumentType` node's publicId.",
              $ref: "StringIndex",
            },
            {
              name: "systemId",
              description: "`DocumentType` node's systemId.",
              $ref: "StringIndex",
            },
            {
              name: "frameId",
              description:
                "Frame ID for frame owner elements and also for the document node.",
              $ref: "StringIndex",
            },
            {
              name: "nodes",
              description: "A table with dom nodes.",
              $ref: "NodeTreeSnapshot",
            },
            {
              name: "layout",
              description: "The nodes in the layout tree.",
              $ref: "LayoutTreeSnapshot",
            },
            {
              name: "textBoxes",
              description: "The post-layout inline text nodes.",
              $ref: "TextBoxSnapshot",
            },
            {
              name: "scrollOffsetX",
              description: "Horizontal scroll offset.",
              optional: true,
              type: "number",
            },
            {
              name: "scrollOffsetY",
              description: "Vertical scroll offset.",
              optional: true,
              type: "number",
            },
            {
              name: "contentWidth",
              description: "Document content width.",
              optional: true,
              type: "number",
            },
            {
              name: "contentHeight",
              description: "Document content height.",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          id: "NodeTreeSnapshot",
          description: "Table containing nodes.",
          type: "object",
          properties: [
            {
              name: "parentIndex",
              description: "Parent node index.",
              optional: true,
              type: "array",
              items: {
                type: "integer",
              },
            },
            {
              name: "nodeType",
              description: "`Node`'s nodeType.",
              optional: true,
              type: "array",
              items: {
                type: "integer",
              },
            },
            {
              name: "shadowRootType",
              description:
                "Type of the shadow root the `Node` is in. String values are equal to the `ShadowRootType` enum.",
              optional: true,
              $ref: "RareStringData",
            },
            {
              name: "nodeName",
              description: "`Node`'s nodeName.",
              optional: true,
              type: "array",
              items: {
                $ref: "StringIndex",
              },
            },
            {
              name: "nodeValue",
              description: "`Node`'s nodeValue.",
              optional: true,
              type: "array",
              items: {
                $ref: "StringIndex",
              },
            },
            {
              name: "backendNodeId",
              description:
                "`Node`'s id, corresponds to DOM.Node.backendNodeId.",
              optional: true,
              type: "array",
              items: {
                $ref: "DOM.BackendNodeId",
              },
            },
            {
              name: "attributes",
              description:
                "Attributes of an `Element` node. Flatten name, value pairs.",
              optional: true,
              type: "array",
              items: {
                $ref: "ArrayOfStrings",
              },
            },
            {
              name: "textValue",
              description:
                "Only set for textarea elements, contains the text value.",
              optional: true,
              $ref: "RareStringData",
            },
            {
              name: "inputValue",
              description:
                "Only set for input elements, contains the input's associated text value.",
              optional: true,
              $ref: "RareStringData",
            },
            {
              name: "inputChecked",
              description:
                "Only set for radio and checkbox input elements, indicates if the element has been checked",
              optional: true,
              $ref: "RareBooleanData",
            },
            {
              name: "optionSelected",
              description:
                "Only set for option elements, indicates if the element has been selected",
              optional: true,
              $ref: "RareBooleanData",
            },
            {
              name: "contentDocumentIndex",
              description:
                "The index of the document in the list of the snapshot documents.",
              optional: true,
              $ref: "RareIntegerData",
            },
            {
              name: "pseudoType",
              description: "Type of a pseudo element node.",
              optional: true,
              $ref: "RareStringData",
            },
            {
              name: "pseudoIdentifier",
              description:
                "Pseudo element identifier for this node. Only present if there is a\nvalid pseudoType.",
              optional: true,
              $ref: "RareStringData",
            },
            {
              name: "isClickable",
              description:
                "Whether this DOM node responds to mouse clicks. This includes nodes that have had click\nevent listeners attached via JavaScript as well as anchor tags that naturally navigate when\nclicked.",
              optional: true,
              $ref: "RareBooleanData",
            },
            {
              name: "currentSourceURL",
              description:
                "The selected url for nodes with a srcset attribute.",
              optional: true,
              $ref: "RareStringData",
            },
            {
              name: "originURL",
              description:
                "The url of the script (if any) that generates this node.",
              optional: true,
              $ref: "RareStringData",
            },
          ],
        },
        {
          id: "LayoutTreeSnapshot",
          description:
            "Table of details of an element in the DOM tree with a LayoutObject.",
          type: "object",
          properties: [
            {
              name: "nodeIndex",
              description:
                "Index of the corresponding node in the `NodeTreeSnapshot` array returned by `captureSnapshot`.",
              type: "array",
              items: {
                type: "integer",
              },
            },
            {
              name: "styles",
              description:
                "Array of indexes specifying computed style strings, filtered according to the `computedStyles` parameter passed to `captureSnapshot`.",
              type: "array",
              items: {
                $ref: "ArrayOfStrings",
              },
            },
            {
              name: "bounds",
              description: "The absolute position bounding box.",
              type: "array",
              items: {
                $ref: "Rectangle",
              },
            },
            {
              name: "text",
              description: "Contents of the LayoutText, if any.",
              type: "array",
              items: {
                $ref: "StringIndex",
              },
            },
            {
              name: "stackingContexts",
              description: "Stacking context information.",
              $ref: "RareBooleanData",
            },
            {
              name: "paintOrders",
              description:
                "Global paint order index, which is determined by the stacking order of the nodes. Nodes\nthat are painted together will have the same index. Only provided if includePaintOrder in\ncaptureSnapshot was true.",
              optional: true,
              type: "array",
              items: {
                type: "integer",
              },
            },
            {
              name: "offsetRects",
              description:
                "The offset rect of nodes. Only available when includeDOMRects is set to true",
              optional: true,
              type: "array",
              items: {
                $ref: "Rectangle",
              },
            },
            {
              name: "scrollRects",
              description:
                "The scroll rect of nodes. Only available when includeDOMRects is set to true",
              optional: true,
              type: "array",
              items: {
                $ref: "Rectangle",
              },
            },
            {
              name: "clientRects",
              description:
                "The client rect of nodes. Only available when includeDOMRects is set to true",
              optional: true,
              type: "array",
              items: {
                $ref: "Rectangle",
              },
            },
            {
              name: "blendedBackgroundColors",
              description:
                "The list of background colors that are blended with colors of overlapping elements.",
              experimental: true,
              optional: true,
              type: "array",
              items: {
                $ref: "StringIndex",
              },
            },
            {
              name: "textColorOpacities",
              description: "The list of computed text opacities.",
              experimental: true,
              optional: true,
              type: "array",
              items: {
                type: "number",
              },
            },
          ],
        },
        {
          id: "TextBoxSnapshot",
          description:
            "Table of details of the post layout rendered text positions. The exact layout should not be regarded as\nstable and may change between versions.",
          type: "object",
          properties: [
            {
              name: "layoutIndex",
              description:
                "Index of the layout tree node that owns this box collection.",
              type: "array",
              items: {
                type: "integer",
              },
            },
            {
              name: "bounds",
              description: "The absolute position bounding box.",
              type: "array",
              items: {
                $ref: "Rectangle",
              },
            },
            {
              name: "start",
              description:
                "The starting index in characters, for this post layout textbox substring. Characters that\nwould be represented as a surrogate pair in UTF-16 have length 2.",
              type: "array",
              items: {
                type: "integer",
              },
            },
            {
              name: "length",
              description:
                "The number of characters in this post layout textbox substring. Characters that would be\nrepresented as a surrogate pair in UTF-16 have length 2.",
              type: "array",
              items: {
                type: "integer",
              },
            },
          ],
        },
      ],
      commands: [
        {
          name: "disable",
          description: "Disables DOM snapshot agent for the given page.",
        },
        {
          name: "enable",
          description: "Enables DOM snapshot agent for the given page.",
        },
        {
          name: "getSnapshot",
          description:
            "Returns a document snapshot, including the full DOM tree of the root node (including iframes,\ntemplate contents, and imported documents) in a flattened array, as well as layout and\nwhite-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is\nflattened.",
          deprecated: true,
          parameters: [
            {
              name: "computedStyleWhitelist",
              description: "Whitelist of computed styles to return.",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "includeEventListeners",
              description:
                "Whether or not to retrieve details of DOM listeners (default false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "includePaintOrder",
              description:
                "Whether to determine and include the paint order index of LayoutTreeNodes (default false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "includeUserAgentShadowTree",
              description:
                "Whether to include UA shadow tree in the snapshot (default false).",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "domNodes",
              description:
                "The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.",
              type: "array",
              items: {
                $ref: "DOMNode",
              },
            },
            {
              name: "layoutTreeNodes",
              description: "The nodes in the layout tree.",
              type: "array",
              items: {
                $ref: "LayoutTreeNode",
              },
            },
            {
              name: "computedStyles",
              description:
                "Whitelisted ComputedStyle properties for each node in the layout tree.",
              type: "array",
              items: {
                $ref: "ComputedStyle",
              },
            },
          ],
        },
        {
          name: "captureSnapshot",
          description:
            "Returns a document snapshot, including the full DOM tree of the root node (including iframes,\ntemplate contents, and imported documents) in a flattened array, as well as layout and\nwhite-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is\nflattened.",
          parameters: [
            {
              name: "computedStyles",
              description: "Whitelist of computed styles to return.",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "includePaintOrder",
              description:
                "Whether to include layout object paint orders into the snapshot.",
              optional: true,
              type: "boolean",
            },
            {
              name: "includeDOMRects",
              description:
                "Whether to include DOM rectangles (offsetRects, clientRects, scrollRects) into the snapshot",
              optional: true,
              type: "boolean",
            },
            {
              name: "includeBlendedBackgroundColors",
              description:
                "Whether to include blended background colors in the snapshot (default: false).\nBlended background color is achieved by blending background colors of all elements\nthat overlap with the current element.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
            {
              name: "includeTextColorOpacities",
              description:
                "Whether to include text color opacity in the snapshot (default: false).\nAn element might have the opacity property set that affects the text color of the element.\nThe final text color opacity is computed based on the opacity of all overlapping elements.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "documents",
              description:
                "The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.",
              type: "array",
              items: {
                $ref: "DocumentSnapshot",
              },
            },
            {
              name: "strings",
              description:
                "Shared string table that all string properties refer to with indexes.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
      ],
    },
    {
      domain: "DOMStorage",
      description: "Query and modify DOM storage.",
      experimental: true,
      types: [
        {
          id: "SerializedStorageKey",
          type: "string",
        },
        {
          id: "StorageId",
          description: "DOM Storage identifier.",
          type: "object",
          properties: [
            {
              name: "securityOrigin",
              description: "Security origin for the storage.",
              optional: true,
              type: "string",
            },
            {
              name: "storageKey",
              description:
                "Represents a key by which DOM Storage keys its CachedStorageAreas",
              optional: true,
              $ref: "SerializedStorageKey",
            },
            {
              name: "isLocalStorage",
              description:
                "Whether the storage is local storage (not session storage).",
              type: "boolean",
            },
          ],
        },
        {
          id: "Item",
          description: "DOM Storage item.",
          type: "array",
          items: {
            type: "string",
          },
        },
      ],
      commands: [
        {
          name: "clear",
          parameters: [
            {
              name: "storageId",
              $ref: "StorageId",
            },
          ],
        },
        {
          name: "disable",
          description:
            "Disables storage tracking, prevents storage events from being sent to the client.",
        },
        {
          name: "enable",
          description:
            "Enables storage tracking, storage events will now be delivered to the client.",
        },
        {
          name: "getDOMStorageItems",
          parameters: [
            {
              name: "storageId",
              $ref: "StorageId",
            },
          ],
          returns: [
            {
              name: "entries",
              type: "array",
              items: {
                $ref: "Item",
              },
            },
          ],
        },
        {
          name: "removeDOMStorageItem",
          parameters: [
            {
              name: "storageId",
              $ref: "StorageId",
            },
            {
              name: "key",
              type: "string",
            },
          ],
        },
        {
          name: "setDOMStorageItem",
          parameters: [
            {
              name: "storageId",
              $ref: "StorageId",
            },
            {
              name: "key",
              type: "string",
            },
            {
              name: "value",
              type: "string",
            },
          ],
        },
      ],
      events: [
        {
          name: "domStorageItemAdded",
          parameters: [
            {
              name: "storageId",
              $ref: "StorageId",
            },
            {
              name: "key",
              type: "string",
            },
            {
              name: "newValue",
              type: "string",
            },
          ],
        },
        {
          name: "domStorageItemRemoved",
          parameters: [
            {
              name: "storageId",
              $ref: "StorageId",
            },
            {
              name: "key",
              type: "string",
            },
          ],
        },
        {
          name: "domStorageItemUpdated",
          parameters: [
            {
              name: "storageId",
              $ref: "StorageId",
            },
            {
              name: "key",
              type: "string",
            },
            {
              name: "oldValue",
              type: "string",
            },
            {
              name: "newValue",
              type: "string",
            },
          ],
        },
        {
          name: "domStorageItemsCleared",
          parameters: [
            {
              name: "storageId",
              $ref: "StorageId",
            },
          ],
        },
      ],
    },
    {
      domain: "Database",
      experimental: true,
      types: [
        {
          id: "DatabaseId",
          description: "Unique identifier of Database object.",
          type: "string",
        },
        {
          id: "Database",
          description: "Database object.",
          type: "object",
          properties: [
            {
              name: "id",
              description: "Database ID.",
              $ref: "DatabaseId",
            },
            {
              name: "domain",
              description: "Database domain.",
              type: "string",
            },
            {
              name: "name",
              description: "Database name.",
              type: "string",
            },
            {
              name: "version",
              description: "Database version.",
              type: "string",
            },
          ],
        },
        {
          id: "Error",
          description: "Database error.",
          type: "object",
          properties: [
            {
              name: "message",
              description: "Error message.",
              type: "string",
            },
            {
              name: "code",
              description: "Error code.",
              type: "integer",
            },
          ],
        },
      ],
      commands: [
        {
          name: "disable",
          description:
            "Disables database tracking, prevents database events from being sent to the client.",
        },
        {
          name: "enable",
          description:
            "Enables database tracking, database events will now be delivered to the client.",
        },
        {
          name: "executeSQL",
          parameters: [
            {
              name: "databaseId",
              $ref: "DatabaseId",
            },
            {
              name: "query",
              type: "string",
            },
          ],
          returns: [
            {
              name: "columnNames",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "values",
              optional: true,
              type: "array",
              items: {
                type: "any",
              },
            },
            {
              name: "sqlError",
              optional: true,
              $ref: "Error",
            },
          ],
        },
        {
          name: "getDatabaseTableNames",
          parameters: [
            {
              name: "databaseId",
              $ref: "DatabaseId",
            },
          ],
          returns: [
            {
              name: "tableNames",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
      ],
      events: [
        {
          name: "addDatabase",
          parameters: [
            {
              name: "database",
              $ref: "Database",
            },
          ],
        },
      ],
    },
    {
      domain: "DeviceOrientation",
      experimental: true,
      commands: [
        {
          name: "clearDeviceOrientationOverride",
          description: "Clears the overridden Device Orientation.",
        },
        {
          name: "setDeviceOrientationOverride",
          description: "Overrides the Device Orientation.",
          parameters: [
            {
              name: "alpha",
              description: "Mock alpha",
              type: "number",
            },
            {
              name: "beta",
              description: "Mock beta",
              type: "number",
            },
            {
              name: "gamma",
              description: "Mock gamma",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      domain: "Emulation",
      description: "This domain emulates different environments for the page.",
      dependencies: ["DOM", "Page", "Runtime"],
      types: [
        {
          id: "ScreenOrientation",
          description: "Screen orientation.",
          type: "object",
          properties: [
            {
              name: "type",
              description: "Orientation type.",
              type: "string",
              enum: [
                "portraitPrimary",
                "portraitSecondary",
                "landscapePrimary",
                "landscapeSecondary",
              ],
            },
            {
              name: "angle",
              description: "Orientation angle.",
              type: "integer",
            },
          ],
        },
        {
          id: "DisplayFeature",
          type: "object",
          properties: [
            {
              name: "orientation",
              description:
                "Orientation of a display feature in relation to screen",
              type: "string",
              enum: ["vertical", "horizontal"],
            },
            {
              name: "offset",
              description:
                "The offset from the screen origin in either the x (for vertical\norientation) or y (for horizontal orientation) direction.",
              type: "integer",
            },
            {
              name: "maskLength",
              description:
                "A display feature may mask content such that it is not physically\ndisplayed - this length along with the offset describes this area.\nA display feature that only splits content will have a 0 mask_length.",
              type: "integer",
            },
          ],
        },
        {
          id: "MediaFeature",
          type: "object",
          properties: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "value",
              type: "string",
            },
          ],
        },
        {
          id: "VirtualTimePolicy",
          description:
            "advance: If the scheduler runs out of immediate work, the virtual time base may fast forward to\nallow the next delayed task (if any) to run; pause: The virtual time base may not advance;\npauseIfNetworkFetchesPending: The virtual time base may not advance if there are any pending\nresource fetches.",
          experimental: true,
          type: "string",
          enum: ["advance", "pause", "pauseIfNetworkFetchesPending"],
        },
        {
          id: "UserAgentBrandVersion",
          description:
            "Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "brand",
              type: "string",
            },
            {
              name: "version",
              type: "string",
            },
          ],
        },
        {
          id: "UserAgentMetadata",
          description:
            "Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints\nMissing optional values will be filled in by the target with what it would normally use.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "brands",
              optional: true,
              type: "array",
              items: {
                $ref: "UserAgentBrandVersion",
              },
            },
            {
              name: "fullVersionList",
              optional: true,
              type: "array",
              items: {
                $ref: "UserAgentBrandVersion",
              },
            },
            {
              name: "fullVersion",
              deprecated: true,
              optional: true,
              type: "string",
            },
            {
              name: "platform",
              type: "string",
            },
            {
              name: "platformVersion",
              type: "string",
            },
            {
              name: "architecture",
              type: "string",
            },
            {
              name: "model",
              type: "string",
            },
            {
              name: "mobile",
              type: "boolean",
            },
            {
              name: "bitness",
              optional: true,
              type: "string",
            },
            {
              name: "wow64",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          id: "DisabledImageType",
          description: "Enum of image types that can be disabled.",
          experimental: true,
          type: "string",
          enum: ["avif", "webp"],
        },
      ],
      commands: [
        {
          name: "canEmulate",
          description: "Tells whether emulation is supported.",
          returns: [
            {
              name: "result",
              description: "True if emulation is supported.",
              type: "boolean",
            },
          ],
        },
        {
          name: "clearDeviceMetricsOverride",
          description: "Clears the overridden device metrics.",
        },
        {
          name: "clearGeolocationOverride",
          description: "Clears the overridden Geolocation Position and Error.",
        },
        {
          name: "resetPageScaleFactor",
          description:
            "Requests that page scale factor is reset to initial values.",
          experimental: true,
        },
        {
          name: "setFocusEmulationEnabled",
          description:
            "Enables or disables simulating a focused and active page.",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              description: "Whether to enable to disable focus emulation.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setAutoDarkModeOverride",
          description:
            "Automatically render all web contents using a dark theme.",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              description:
                "Whether to enable or disable automatic dark mode.\nIf not specified, any existing override will be cleared.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "setCPUThrottlingRate",
          description: "Enables CPU throttling to emulate slow CPUs.",
          experimental: true,
          parameters: [
            {
              name: "rate",
              description:
                "Throttling rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc).",
              type: "number",
            },
          ],
        },
        {
          name: "setDefaultBackgroundColorOverride",
          description:
            "Sets or clears an override of the default background color of the frame. This override is used\nif the content does not specify one.",
          parameters: [
            {
              name: "color",
              description:
                "RGBA of the default background color. If not specified, any existing override will be\ncleared.",
              optional: true,
              $ref: "DOM.RGBA",
            },
          ],
        },
        {
          name: "setDeviceMetricsOverride",
          description:
            'Overrides the values of device screen dimensions (window.screen.width, window.screen.height,\nwindow.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media\nquery results).',
          parameters: [
            {
              name: "width",
              description:
                "Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.",
              type: "integer",
            },
            {
              name: "height",
              description:
                "Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.",
              type: "integer",
            },
            {
              name: "deviceScaleFactor",
              description:
                "Overriding device scale factor value. 0 disables the override.",
              type: "number",
            },
            {
              name: "mobile",
              description:
                "Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text\nautosizing and more.",
              type: "boolean",
            },
            {
              name: "scale",
              description: "Scale to apply to resulting view image.",
              experimental: true,
              optional: true,
              type: "number",
            },
            {
              name: "screenWidth",
              description:
                "Overriding screen width value in pixels (minimum 0, maximum 10000000).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "screenHeight",
              description:
                "Overriding screen height value in pixels (minimum 0, maximum 10000000).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "positionX",
              description:
                "Overriding view X position on screen in pixels (minimum 0, maximum 10000000).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "positionY",
              description:
                "Overriding view Y position on screen in pixels (minimum 0, maximum 10000000).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "dontSetVisibleSize",
              description:
                "Do not set visible view size, rely upon explicit setVisibleSize call.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
            {
              name: "screenOrientation",
              description: "Screen orientation override.",
              optional: true,
              $ref: "ScreenOrientation",
            },
            {
              name: "viewport",
              description:
                "If set, the visible area of the page will be overridden to this viewport. This viewport\nchange is not observed by the page, e.g. viewport-relative elements do not change positions.",
              experimental: true,
              optional: true,
              $ref: "Page.Viewport",
            },
            {
              name: "displayFeature",
              description:
                "If set, the display feature of a multi-segment screen. If not set, multi-segment support\nis turned-off.",
              experimental: true,
              optional: true,
              $ref: "DisplayFeature",
            },
          ],
        },
        {
          name: "setScrollbarsHidden",
          experimental: true,
          parameters: [
            {
              name: "hidden",
              description: "Whether scrollbars should be always hidden.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setDocumentCookieDisabled",
          experimental: true,
          parameters: [
            {
              name: "disabled",
              description: "Whether document.coookie API should be disabled.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setEmitTouchEventsForMouse",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              description:
                "Whether touch emulation based on mouse input should be enabled.",
              type: "boolean",
            },
            {
              name: "configuration",
              description:
                "Touch/gesture events configuration. Default: current platform.",
              optional: true,
              type: "string",
              enum: ["mobile", "desktop"],
            },
          ],
        },
        {
          name: "setEmulatedMedia",
          description:
            "Emulates the given media type or media feature for CSS media queries.",
          parameters: [
            {
              name: "media",
              description:
                "Media type to emulate. Empty string disables the override.",
              optional: true,
              type: "string",
            },
            {
              name: "features",
              description: "Media features to emulate.",
              optional: true,
              type: "array",
              items: {
                $ref: "MediaFeature",
              },
            },
          ],
        },
        {
          name: "setEmulatedVisionDeficiency",
          description: "Emulates the given vision deficiency.",
          experimental: true,
          parameters: [
            {
              name: "type",
              description: "Vision deficiency to emulate.",
              type: "string",
              enum: [
                "none",
                "achromatopsia",
                "blurredVision",
                "deuteranopia",
                "protanopia",
                "tritanopia",
              ],
            },
          ],
        },
        {
          name: "setGeolocationOverride",
          description:
            "Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position\nunavailable.",
          parameters: [
            {
              name: "latitude",
              description: "Mock latitude",
              optional: true,
              type: "number",
            },
            {
              name: "longitude",
              description: "Mock longitude",
              optional: true,
              type: "number",
            },
            {
              name: "accuracy",
              description: "Mock accuracy",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          name: "setIdleOverride",
          description: "Overrides the Idle state.",
          experimental: true,
          parameters: [
            {
              name: "isUserActive",
              description: "Mock isUserActive",
              type: "boolean",
            },
            {
              name: "isScreenUnlocked",
              description: "Mock isScreenUnlocked",
              type: "boolean",
            },
          ],
        },
        {
          name: "clearIdleOverride",
          description: "Clears Idle state overrides.",
          experimental: true,
        },
        {
          name: "setNavigatorOverrides",
          description:
            "Overrides value returned by the javascript navigator object.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "platform",
              description: "The platform navigator.platform should return.",
              type: "string",
            },
          ],
        },
        {
          name: "setPageScaleFactor",
          description: "Sets a specified page scale factor.",
          experimental: true,
          parameters: [
            {
              name: "pageScaleFactor",
              description: "Page scale factor.",
              type: "number",
            },
          ],
        },
        {
          name: "setScriptExecutionDisabled",
          description: "Switches script execution in the page.",
          parameters: [
            {
              name: "value",
              description:
                "Whether script execution should be disabled in the page.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setTouchEmulationEnabled",
          description: "Enables touch on platforms which do not support them.",
          parameters: [
            {
              name: "enabled",
              description:
                "Whether the touch event emulation should be enabled.",
              type: "boolean",
            },
            {
              name: "maxTouchPoints",
              description: "Maximum touch points supported. Defaults to one.",
              optional: true,
              type: "integer",
            },
          ],
        },
        {
          name: "setVirtualTimePolicy",
          description:
            "Turns on virtual time for all frames (replacing real-time with a synthetic time source) and sets\nthe current virtual time policy.  Note this supersedes any previous time budget.",
          experimental: true,
          parameters: [
            {
              name: "policy",
              $ref: "VirtualTimePolicy",
            },
            {
              name: "budget",
              description:
                "If set, after this many virtual milliseconds have elapsed virtual time will be paused and a\nvirtualTimeBudgetExpired event is sent.",
              optional: true,
              type: "number",
            },
            {
              name: "maxVirtualTimeTaskStarvationCount",
              description:
                "If set this specifies the maximum number of tasks that can be run before virtual is forced\nforwards to prevent deadlock.",
              optional: true,
              type: "integer",
            },
            {
              name: "initialVirtualTime",
              description:
                "If set, base::Time::Now will be overridden to initially return this value.",
              optional: true,
              $ref: "Network.TimeSinceEpoch",
            },
          ],
          returns: [
            {
              name: "virtualTimeTicksBase",
              description:
                "Absolute timestamp at which virtual time was first enabled (up time in milliseconds).",
              type: "number",
            },
          ],
        },
        {
          name: "setLocaleOverride",
          description:
            "Overrides default host system locale with the specified one.",
          experimental: true,
          parameters: [
            {
              name: "locale",
              description:
                'ICU style C locale (e.g. "en_US"). If not specified or empty, disables the override and\nrestores default host system locale.',
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "setTimezoneOverride",
          description:
            "Overrides default host system timezone with the specified one.",
          experimental: true,
          parameters: [
            {
              name: "timezoneId",
              description:
                "The timezone identifier. If empty, disables the override and\nrestores default host system timezone.",
              type: "string",
            },
          ],
        },
        {
          name: "setVisibleSize",
          description:
            "Resizes the frame/viewport of the page. Note that this does not affect the frame's container\n(e.g. browser window). Can be used to produce screenshots of the specified size. Not supported\non Android.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "width",
              description: "Frame width (DIP).",
              type: "integer",
            },
            {
              name: "height",
              description: "Frame height (DIP).",
              type: "integer",
            },
          ],
        },
        {
          name: "setDisabledImageTypes",
          experimental: true,
          parameters: [
            {
              name: "imageTypes",
              description: "Image types to disable.",
              type: "array",
              items: {
                $ref: "DisabledImageType",
              },
            },
          ],
        },
        {
          name: "setHardwareConcurrencyOverride",
          experimental: true,
          parameters: [
            {
              name: "hardwareConcurrency",
              description: "Hardware concurrency to report",
              type: "integer",
            },
          ],
        },
        {
          name: "setUserAgentOverride",
          description: "Allows overriding user agent with the given string.",
          parameters: [
            {
              name: "userAgent",
              description: "User agent to use.",
              type: "string",
            },
            {
              name: "acceptLanguage",
              description: "Browser langugage to emulate.",
              optional: true,
              type: "string",
            },
            {
              name: "platform",
              description: "The platform navigator.platform should return.",
              optional: true,
              type: "string",
            },
            {
              name: "userAgentMetadata",
              description:
                "To be sent in Sec-CH-UA-* headers and returned in navigator.userAgentData",
              experimental: true,
              optional: true,
              $ref: "UserAgentMetadata",
            },
          ],
        },
        {
          name: "setAutomationOverride",
          description: "Allows overriding the automation flag.",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              description: "Whether the override should be enabled.",
              type: "boolean",
            },
          ],
        },
      ],
      events: [
        {
          name: "virtualTimeBudgetExpired",
          description:
            "Notification sent after the virtual time budget for the current VirtualTimePolicy has run out.",
          experimental: true,
        },
      ],
    },
    {
      domain: "HeadlessExperimental",
      description:
        "This domain provides experimental commands only supported in headless mode.",
      experimental: true,
      dependencies: ["Page", "Runtime"],
      types: [
        {
          id: "ScreenshotParams",
          description: "Encoding options for a screenshot.",
          type: "object",
          properties: [
            {
              name: "format",
              description: "Image compression format (defaults to png).",
              optional: true,
              type: "string",
              enum: ["jpeg", "png", "webp"],
            },
            {
              name: "quality",
              description:
                "Compression quality from range [0..100] (jpeg only).",
              optional: true,
              type: "integer",
            },
            {
              name: "optimizeForSpeed",
              description:
                "Optimize image encoding for speed, not for resulting size (defaults to false)",
              optional: true,
              type: "boolean",
            },
          ],
        },
      ],
      commands: [
        {
          name: "beginFrame",
          description:
            "Sends a BeginFrame to the target and returns when the frame was completed. Optionally captures a\nscreenshot from the resulting frame. Requires that the target was created with enabled\nBeginFrameControl. Designed for use with --run-all-compositor-stages-before-draw, see also\nhttps://goo.gle/chrome-headless-rendering for more background.",
          parameters: [
            {
              name: "frameTimeTicks",
              description:
                "Timestamp of this BeginFrame in Renderer TimeTicks (milliseconds of uptime). If not set,\nthe current time will be used.",
              optional: true,
              type: "number",
            },
            {
              name: "interval",
              description:
                "The interval between BeginFrames that is reported to the compositor, in milliseconds.\nDefaults to a 60 frames/second interval, i.e. about 16.666 milliseconds.",
              optional: true,
              type: "number",
            },
            {
              name: "noDisplayUpdates",
              description:
                "Whether updates should not be committed and drawn onto the display. False by default. If\ntrue, only side effects of the BeginFrame will be run, such as layout and animations, but\nany visual updates may not be visible on the display or in screenshots.",
              optional: true,
              type: "boolean",
            },
            {
              name: "screenshot",
              description:
                "If set, a screenshot of the frame will be captured and returned in the response. Otherwise,\nno screenshot will be captured. Note that capturing a screenshot can fail, for example,\nduring renderer initialization. In such a case, no screenshot data will be returned.",
              optional: true,
              $ref: "ScreenshotParams",
            },
          ],
          returns: [
            {
              name: "hasDamage",
              description:
                "Whether the BeginFrame resulted in damage and, thus, a new frame was committed to the\ndisplay. Reported for diagnostic uses, may be removed in the future.",
              type: "boolean",
            },
            {
              name: "screenshotData",
              description:
                "Base64-encoded image data of the screenshot, if one was requested and successfully taken. (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "disable",
          description: "Disables headless events for the target.",
          deprecated: true,
        },
        {
          name: "enable",
          description: "Enables headless events for the target.",
          deprecated: true,
        },
      ],
    },
    {
      domain: "IO",
      description: "Input/Output operations for streams produced by DevTools.",
      types: [
        {
          id: "StreamHandle",
          description:
            "This is either obtained from another method or specified as `blob:&lt;uuid&gt;` where\n`&lt;uuid&gt` is an UUID of a Blob.",
          type: "string",
        },
      ],
      commands: [
        {
          name: "close",
          description:
            "Close the stream, discard any temporary backing storage.",
          parameters: [
            {
              name: "handle",
              description: "Handle of the stream to close.",
              $ref: "StreamHandle",
            },
          ],
        },
        {
          name: "read",
          description: "Read a chunk of the stream",
          parameters: [
            {
              name: "handle",
              description: "Handle of the stream to read.",
              $ref: "StreamHandle",
            },
            {
              name: "offset",
              description:
                "Seek to the specified offset before reading (if not specificed, proceed with offset\nfollowing the last read). Some types of streams may only support sequential reads.",
              optional: true,
              type: "integer",
            },
            {
              name: "size",
              description:
                "Maximum number of bytes to read (left upon the agent discretion if not specified).",
              optional: true,
              type: "integer",
            },
          ],
          returns: [
            {
              name: "base64Encoded",
              description: "Set if the data is base64-encoded",
              optional: true,
              type: "boolean",
            },
            {
              name: "data",
              description: "Data that were read.",
              type: "string",
            },
            {
              name: "eof",
              description:
                "Set if the end-of-file condition occurred while reading.",
              type: "boolean",
            },
          ],
        },
        {
          name: "resolveBlob",
          description:
            "Return UUID of Blob object specified by a remote object id.",
          parameters: [
            {
              name: "objectId",
              description: "Object id of a Blob object wrapper.",
              $ref: "Runtime.RemoteObjectId",
            },
          ],
          returns: [
            {
              name: "uuid",
              description: "UUID of the specified Blob.",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      domain: "IndexedDB",
      experimental: true,
      dependencies: ["Runtime"],
      types: [
        {
          id: "DatabaseWithObjectStores",
          description: "Database with an array of object stores.",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Database name.",
              type: "string",
            },
            {
              name: "version",
              description:
                "Database version (type is not 'integer', as the standard\nrequires the version number to be 'unsigned long long')",
              type: "number",
            },
            {
              name: "objectStores",
              description: "Object stores in this database.",
              type: "array",
              items: {
                $ref: "ObjectStore",
              },
            },
          ],
        },
        {
          id: "ObjectStore",
          description: "Object store.",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Object store name.",
              type: "string",
            },
            {
              name: "keyPath",
              description: "Object store key path.",
              $ref: "KeyPath",
            },
            {
              name: "autoIncrement",
              description: "If true, object store has auto increment flag set.",
              type: "boolean",
            },
            {
              name: "indexes",
              description: "Indexes in this object store.",
              type: "array",
              items: {
                $ref: "ObjectStoreIndex",
              },
            },
          ],
        },
        {
          id: "ObjectStoreIndex",
          description: "Object store index.",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Index name.",
              type: "string",
            },
            {
              name: "keyPath",
              description: "Index key path.",
              $ref: "KeyPath",
            },
            {
              name: "unique",
              description: "If true, index is unique.",
              type: "boolean",
            },
            {
              name: "multiEntry",
              description: "If true, index allows multiple entries for a key.",
              type: "boolean",
            },
          ],
        },
        {
          id: "Key",
          description: "Key.",
          type: "object",
          properties: [
            {
              name: "type",
              description: "Key type.",
              type: "string",
              enum: ["number", "string", "date", "array"],
            },
            {
              name: "number",
              description: "Number value.",
              optional: true,
              type: "number",
            },
            {
              name: "string",
              description: "String value.",
              optional: true,
              type: "string",
            },
            {
              name: "date",
              description: "Date value.",
              optional: true,
              type: "number",
            },
            {
              name: "array",
              description: "Array value.",
              optional: true,
              type: "array",
              items: {
                $ref: "Key",
              },
            },
          ],
        },
        {
          id: "KeyRange",
          description: "Key range.",
          type: "object",
          properties: [
            {
              name: "lower",
              description: "Lower bound.",
              optional: true,
              $ref: "Key",
            },
            {
              name: "upper",
              description: "Upper bound.",
              optional: true,
              $ref: "Key",
            },
            {
              name: "lowerOpen",
              description: "If true lower bound is open.",
              type: "boolean",
            },
            {
              name: "upperOpen",
              description: "If true upper bound is open.",
              type: "boolean",
            },
          ],
        },
        {
          id: "DataEntry",
          description: "Data entry.",
          type: "object",
          properties: [
            {
              name: "key",
              description: "Key object.",
              $ref: "Runtime.RemoteObject",
            },
            {
              name: "primaryKey",
              description: "Primary key object.",
              $ref: "Runtime.RemoteObject",
            },
            {
              name: "value",
              description: "Value object.",
              $ref: "Runtime.RemoteObject",
            },
          ],
        },
        {
          id: "KeyPath",
          description: "Key path.",
          type: "object",
          properties: [
            {
              name: "type",
              description: "Key path type.",
              type: "string",
              enum: ["null", "string", "array"],
            },
            {
              name: "string",
              description: "String value.",
              optional: true,
              type: "string",
            },
            {
              name: "array",
              description: "Array value.",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
      ],
      commands: [
        {
          name: "clearObjectStore",
          description: "Clears all entries from an object store.",
          parameters: [
            {
              name: "securityOrigin",
              description:
                "At least and at most one of securityOrigin, storageKey must be specified.\nSecurity origin.",
              optional: true,
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key.",
              optional: true,
              type: "string",
            },
            {
              name: "databaseName",
              description: "Database name.",
              type: "string",
            },
            {
              name: "objectStoreName",
              description: "Object store name.",
              type: "string",
            },
          ],
        },
        {
          name: "deleteDatabase",
          description: "Deletes a database.",
          parameters: [
            {
              name: "securityOrigin",
              description:
                "At least and at most one of securityOrigin, storageKey must be specified.\nSecurity origin.",
              optional: true,
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key.",
              optional: true,
              type: "string",
            },
            {
              name: "databaseName",
              description: "Database name.",
              type: "string",
            },
          ],
        },
        {
          name: "deleteObjectStoreEntries",
          description: "Delete a range of entries from an object store",
          parameters: [
            {
              name: "securityOrigin",
              description:
                "At least and at most one of securityOrigin, storageKey must be specified.\nSecurity origin.",
              optional: true,
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key.",
              optional: true,
              type: "string",
            },
            {
              name: "databaseName",
              type: "string",
            },
            {
              name: "objectStoreName",
              type: "string",
            },
            {
              name: "keyRange",
              description: "Range of entry keys to delete",
              $ref: "KeyRange",
            },
          ],
        },
        {
          name: "disable",
          description: "Disables events from backend.",
        },
        {
          name: "enable",
          description: "Enables events from backend.",
        },
        {
          name: "requestData",
          description: "Requests data from object store or index.",
          parameters: [
            {
              name: "securityOrigin",
              description:
                "At least and at most one of securityOrigin, storageKey must be specified.\nSecurity origin.",
              optional: true,
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key.",
              optional: true,
              type: "string",
            },
            {
              name: "databaseName",
              description: "Database name.",
              type: "string",
            },
            {
              name: "objectStoreName",
              description: "Object store name.",
              type: "string",
            },
            {
              name: "indexName",
              description:
                "Index name, empty string for object store data requests.",
              type: "string",
            },
            {
              name: "skipCount",
              description: "Number of records to skip.",
              type: "integer",
            },
            {
              name: "pageSize",
              description: "Number of records to fetch.",
              type: "integer",
            },
            {
              name: "keyRange",
              description: "Key range.",
              optional: true,
              $ref: "KeyRange",
            },
          ],
          returns: [
            {
              name: "objectStoreDataEntries",
              description: "Array of object store data entries.",
              type: "array",
              items: {
                $ref: "DataEntry",
              },
            },
            {
              name: "hasMore",
              description:
                "If true, there are more entries to fetch in the given range.",
              type: "boolean",
            },
          ],
        },
        {
          name: "getMetadata",
          description: "Gets metadata of an object store",
          parameters: [
            {
              name: "securityOrigin",
              description:
                "At least and at most one of securityOrigin, storageKey must be specified.\nSecurity origin.",
              optional: true,
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key.",
              optional: true,
              type: "string",
            },
            {
              name: "databaseName",
              description: "Database name.",
              type: "string",
            },
            {
              name: "objectStoreName",
              description: "Object store name.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "entriesCount",
              description: "the entries count",
              type: "number",
            },
            {
              name: "keyGeneratorValue",
              description:
                "the current value of key generator, to become the next inserted\nkey into the object store. Valid if objectStore.autoIncrement\nis true.",
              type: "number",
            },
          ],
        },
        {
          name: "requestDatabase",
          description: "Requests database with given name in given frame.",
          parameters: [
            {
              name: "securityOrigin",
              description:
                "At least and at most one of securityOrigin, storageKey must be specified.\nSecurity origin.",
              optional: true,
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key.",
              optional: true,
              type: "string",
            },
            {
              name: "databaseName",
              description: "Database name.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "databaseWithObjectStores",
              description: "Database with an array of object stores.",
              $ref: "DatabaseWithObjectStores",
            },
          ],
        },
        {
          name: "requestDatabaseNames",
          description: "Requests database names for given security origin.",
          parameters: [
            {
              name: "securityOrigin",
              description:
                "At least and at most one of securityOrigin, storageKey must be specified.\nSecurity origin.",
              optional: true,
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key.",
              optional: true,
              type: "string",
            },
          ],
          returns: [
            {
              name: "databaseNames",
              description: "Database names for origin.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
      ],
    },
    {
      domain: "Input",
      types: [
        {
          id: "TouchPoint",
          type: "object",
          properties: [
            {
              name: "x",
              description:
                "X coordinate of the event relative to the main frame's viewport in CSS pixels.",
              type: "number",
            },
            {
              name: "y",
              description:
                "Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to\nthe top of the viewport and Y increases as it proceeds towards the bottom of the viewport.",
              type: "number",
            },
            {
              name: "radiusX",
              description: "X radius of the touch area (default: 1.0).",
              optional: true,
              type: "number",
            },
            {
              name: "radiusY",
              description: "Y radius of the touch area (default: 1.0).",
              optional: true,
              type: "number",
            },
            {
              name: "rotationAngle",
              description: "Rotation angle (default: 0.0).",
              optional: true,
              type: "number",
            },
            {
              name: "force",
              description: "Force (default: 1.0).",
              optional: true,
              type: "number",
            },
            {
              name: "tangentialPressure",
              description:
                "The normalized tangential pressure, which has a range of [-1,1] (default: 0).",
              experimental: true,
              optional: true,
              type: "number",
            },
            {
              name: "tiltX",
              description:
                "The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0)",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "tiltY",
              description:
                "The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "twist",
              description:
                "The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "id",
              description:
                "Identifier used to track touch sources between events, must be unique within an event.",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          id: "GestureSourceType",
          experimental: true,
          type: "string",
          enum: ["default", "touch", "mouse"],
        },
        {
          id: "MouseButton",
          type: "string",
          enum: ["none", "left", "middle", "right", "back", "forward"],
        },
        {
          id: "TimeSinceEpoch",
          description: "UTC time in seconds, counted from January 1, 1970.",
          type: "number",
        },
        {
          id: "DragDataItem",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "mimeType",
              description: "Mime type of the dragged data.",
              type: "string",
            },
            {
              name: "data",
              description:
                "Depending of the value of `mimeType`, it contains the dragged link,\ntext, HTML markup or any other data.",
              type: "string",
            },
            {
              name: "title",
              description:
                'Title associated with a link. Only valid when `mimeType` == "text/uri-list".',
              optional: true,
              type: "string",
            },
            {
              name: "baseURL",
              description:
                'Stores the base URL for the contained markup. Only valid when `mimeType`\n== "text/html".',
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "DragData",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "items",
              type: "array",
              items: {
                $ref: "DragDataItem",
              },
            },
            {
              name: "files",
              description:
                "List of filenames that should be included when dropping",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "dragOperationsMask",
              description:
                "Bit field representing allowed drag operations. Copy = 1, Link = 2, Move = 16",
              type: "integer",
            },
          ],
        },
      ],
      commands: [
        {
          name: "dispatchDragEvent",
          description: "Dispatches a drag event into the page.",
          experimental: true,
          parameters: [
            {
              name: "type",
              description: "Type of the drag event.",
              type: "string",
              enum: ["dragEnter", "dragOver", "drop", "dragCancel"],
            },
            {
              name: "x",
              description:
                "X coordinate of the event relative to the main frame's viewport in CSS pixels.",
              type: "number",
            },
            {
              name: "y",
              description:
                "Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to\nthe top of the viewport and Y increases as it proceeds towards the bottom of the viewport.",
              type: "number",
            },
            {
              name: "data",
              $ref: "DragData",
            },
            {
              name: "modifiers",
              description:
                "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8\n(default: 0).",
              optional: true,
              type: "integer",
            },
          ],
        },
        {
          name: "dispatchKeyEvent",
          description: "Dispatches a key event to the page.",
          parameters: [
            {
              name: "type",
              description: "Type of the key event.",
              type: "string",
              enum: ["keyDown", "keyUp", "rawKeyDown", "char"],
            },
            {
              name: "modifiers",
              description:
                "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8\n(default: 0).",
              optional: true,
              type: "integer",
            },
            {
              name: "timestamp",
              description: "Time at which the event occurred.",
              optional: true,
              $ref: "TimeSinceEpoch",
            },
            {
              name: "text",
              description:
                'Text as generated by processing a virtual key code with a keyboard layout. Not needed for\nfor `keyUp` and `rawKeyDown` events (default: "")',
              optional: true,
              type: "string",
            },
            {
              name: "unmodifiedText",
              description:
                'Text that would have been generated by the keyboard if no modifiers were pressed (except for\nshift). Useful for shortcut (accelerator) key handling (default: "").',
              optional: true,
              type: "string",
            },
            {
              name: "keyIdentifier",
              description:
                "Unique key identifier (e.g., 'U+0041') (default: \"\").",
              optional: true,
              type: "string",
            },
            {
              name: "code",
              description:
                "Unique DOM defined string value for each physical key (e.g., 'KeyA') (default: \"\").",
              optional: true,
              type: "string",
            },
            {
              name: "key",
              description:
                "Unique DOM defined string value describing the meaning of the key in the context of active\nmodifiers, keyboard layout, etc (e.g., 'AltGr') (default: \"\").",
              optional: true,
              type: "string",
            },
            {
              name: "windowsVirtualKeyCode",
              description: "Windows virtual key code (default: 0).",
              optional: true,
              type: "integer",
            },
            {
              name: "nativeVirtualKeyCode",
              description: "Native virtual key code (default: 0).",
              optional: true,
              type: "integer",
            },
            {
              name: "autoRepeat",
              description:
                "Whether the event was generated from auto repeat (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "isKeypad",
              description:
                "Whether the event was generated from the keypad (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "isSystemKey",
              description:
                "Whether the event was a system key event (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "location",
              description:
                "Whether the event was from the left or right side of the keyboard. 1=Left, 2=Right (default:\n0).",
              optional: true,
              type: "integer",
            },
            {
              name: "commands",
              description:
                "Editing commands to send with the key event (e.g., 'selectAll') (default: []).\nThese are related to but not equal the command names used in `document.execCommand` and NSStandardKeyBindingResponding.\nSee https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/editing/commands/editor_command_names.h for valid command names.",
              experimental: true,
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "insertText",
          description:
            "This method emulates inserting text that doesn't come from a key press,\nfor example an emoji keyboard or an IME.",
          experimental: true,
          parameters: [
            {
              name: "text",
              description: "The text to insert.",
              type: "string",
            },
          ],
        },
        {
          name: "imeSetComposition",
          description:
            "This method sets the current candidate text for ime.\nUse imeCommitComposition to commit the final text.\nUse imeSetComposition with empty string as text to cancel composition.",
          experimental: true,
          parameters: [
            {
              name: "text",
              description: "The text to insert",
              type: "string",
            },
            {
              name: "selectionStart",
              description: "selection start",
              type: "integer",
            },
            {
              name: "selectionEnd",
              description: "selection end",
              type: "integer",
            },
            {
              name: "replacementStart",
              description: "replacement start",
              optional: true,
              type: "integer",
            },
            {
              name: "replacementEnd",
              description: "replacement end",
              optional: true,
              type: "integer",
            },
          ],
        },
        {
          name: "dispatchMouseEvent",
          description: "Dispatches a mouse event to the page.",
          parameters: [
            {
              name: "type",
              description: "Type of the mouse event.",
              type: "string",
              enum: [
                "mousePressed",
                "mouseReleased",
                "mouseMoved",
                "mouseWheel",
              ],
            },
            {
              name: "x",
              description:
                "X coordinate of the event relative to the main frame's viewport in CSS pixels.",
              type: "number",
            },
            {
              name: "y",
              description:
                "Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to\nthe top of the viewport and Y increases as it proceeds towards the bottom of the viewport.",
              type: "number",
            },
            {
              name: "modifiers",
              description:
                "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8\n(default: 0).",
              optional: true,
              type: "integer",
            },
            {
              name: "timestamp",
              description: "Time at which the event occurred.",
              optional: true,
              $ref: "TimeSinceEpoch",
            },
            {
              name: "button",
              description: 'Mouse button (default: "none").',
              optional: true,
              $ref: "MouseButton",
            },
            {
              name: "buttons",
              description:
                "A number indicating which buttons are pressed on the mouse when a mouse event is triggered.\nLeft=1, Right=2, Middle=4, Back=8, Forward=16, None=0.",
              optional: true,
              type: "integer",
            },
            {
              name: "clickCount",
              description:
                "Number of times the mouse button was clicked (default: 0).",
              optional: true,
              type: "integer",
            },
            {
              name: "force",
              description:
                "The normalized pressure, which has a range of [0,1] (default: 0).",
              experimental: true,
              optional: true,
              type: "number",
            },
            {
              name: "tangentialPressure",
              description:
                "The normalized tangential pressure, which has a range of [-1,1] (default: 0).",
              experimental: true,
              optional: true,
              type: "number",
            },
            {
              name: "tiltX",
              description:
                "The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "tiltY",
              description:
                "The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "twist",
              description:
                "The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "deltaX",
              description:
                "X delta in CSS pixels for mouse wheel event (default: 0).",
              optional: true,
              type: "number",
            },
            {
              name: "deltaY",
              description:
                "Y delta in CSS pixels for mouse wheel event (default: 0).",
              optional: true,
              type: "number",
            },
            {
              name: "pointerType",
              description: 'Pointer type (default: "mouse").',
              optional: true,
              type: "string",
              enum: ["mouse", "pen"],
            },
          ],
        },
        {
          name: "dispatchTouchEvent",
          description: "Dispatches a touch event to the page.",
          parameters: [
            {
              name: "type",
              description:
                "Type of the touch event. TouchEnd and TouchCancel must not contain any touch points, while\nTouchStart and TouchMove must contains at least one.",
              type: "string",
              enum: ["touchStart", "touchEnd", "touchMove", "touchCancel"],
            },
            {
              name: "touchPoints",
              description:
                "Active touch points on the touch device. One event per any changed point (compared to\nprevious touch event in a sequence) is generated, emulating pressing/moving/releasing points\none by one.",
              type: "array",
              items: {
                $ref: "TouchPoint",
              },
            },
            {
              name: "modifiers",
              description:
                "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8\n(default: 0).",
              optional: true,
              type: "integer",
            },
            {
              name: "timestamp",
              description: "Time at which the event occurred.",
              optional: true,
              $ref: "TimeSinceEpoch",
            },
          ],
        },
        {
          name: "emulateTouchFromMouseEvent",
          description: "Emulates touch event from the mouse event parameters.",
          experimental: true,
          parameters: [
            {
              name: "type",
              description: "Type of the mouse event.",
              type: "string",
              enum: [
                "mousePressed",
                "mouseReleased",
                "mouseMoved",
                "mouseWheel",
              ],
            },
            {
              name: "x",
              description: "X coordinate of the mouse pointer in DIP.",
              type: "integer",
            },
            {
              name: "y",
              description: "Y coordinate of the mouse pointer in DIP.",
              type: "integer",
            },
            {
              name: "button",
              description:
                'Mouse button. Only "none", "left", "right" are supported.',
              $ref: "MouseButton",
            },
            {
              name: "timestamp",
              description:
                "Time at which the event occurred (default: current time).",
              optional: true,
              $ref: "TimeSinceEpoch",
            },
            {
              name: "deltaX",
              description: "X delta in DIP for mouse wheel event (default: 0).",
              optional: true,
              type: "number",
            },
            {
              name: "deltaY",
              description: "Y delta in DIP for mouse wheel event (default: 0).",
              optional: true,
              type: "number",
            },
            {
              name: "modifiers",
              description:
                "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8\n(default: 0).",
              optional: true,
              type: "integer",
            },
            {
              name: "clickCount",
              description:
                "Number of times the mouse button was clicked (default: 0).",
              optional: true,
              type: "integer",
            },
          ],
        },
        {
          name: "setIgnoreInputEvents",
          description: "Ignores input events (useful while auditing page).",
          parameters: [
            {
              name: "ignore",
              description: "Ignores input events processing when set to true.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setInterceptDrags",
          description:
            "Prevents default drag and drop behavior and instead emits `Input.dragIntercepted` events.\nDrag and drop behavior can be directly controlled via `Input.dispatchDragEvent`.",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              type: "boolean",
            },
          ],
        },
        {
          name: "synthesizePinchGesture",
          description:
            "Synthesizes a pinch gesture over a time period by issuing appropriate touch events.",
          experimental: true,
          parameters: [
            {
              name: "x",
              description:
                "X coordinate of the start of the gesture in CSS pixels.",
              type: "number",
            },
            {
              name: "y",
              description:
                "Y coordinate of the start of the gesture in CSS pixels.",
              type: "number",
            },
            {
              name: "scaleFactor",
              description:
                "Relative scale factor after zooming (>1.0 zooms in, <1.0 zooms out).",
              type: "number",
            },
            {
              name: "relativeSpeed",
              description:
                "Relative pointer speed in pixels per second (default: 800).",
              optional: true,
              type: "integer",
            },
            {
              name: "gestureSourceType",
              description:
                "Which type of input events to be generated (default: 'default', which queries the platform\nfor the preferred input type).",
              optional: true,
              $ref: "GestureSourceType",
            },
          ],
        },
        {
          name: "synthesizeScrollGesture",
          description:
            "Synthesizes a scroll gesture over a time period by issuing appropriate touch events.",
          experimental: true,
          parameters: [
            {
              name: "x",
              description:
                "X coordinate of the start of the gesture in CSS pixels.",
              type: "number",
            },
            {
              name: "y",
              description:
                "Y coordinate of the start of the gesture in CSS pixels.",
              type: "number",
            },
            {
              name: "xDistance",
              description:
                "The distance to scroll along the X axis (positive to scroll left).",
              optional: true,
              type: "number",
            },
            {
              name: "yDistance",
              description:
                "The distance to scroll along the Y axis (positive to scroll up).",
              optional: true,
              type: "number",
            },
            {
              name: "xOverscroll",
              description:
                "The number of additional pixels to scroll back along the X axis, in addition to the given\ndistance.",
              optional: true,
              type: "number",
            },
            {
              name: "yOverscroll",
              description:
                "The number of additional pixels to scroll back along the Y axis, in addition to the given\ndistance.",
              optional: true,
              type: "number",
            },
            {
              name: "preventFling",
              description: "Prevent fling (default: true).",
              optional: true,
              type: "boolean",
            },
            {
              name: "speed",
              description: "Swipe speed in pixels per second (default: 800).",
              optional: true,
              type: "integer",
            },
            {
              name: "gestureSourceType",
              description:
                "Which type of input events to be generated (default: 'default', which queries the platform\nfor the preferred input type).",
              optional: true,
              $ref: "GestureSourceType",
            },
            {
              name: "repeatCount",
              description:
                "The number of times to repeat the gesture (default: 0).",
              optional: true,
              type: "integer",
            },
            {
              name: "repeatDelayMs",
              description:
                "The number of milliseconds delay between each repeat. (default: 250).",
              optional: true,
              type: "integer",
            },
            {
              name: "interactionMarkerName",
              description:
                'The name of the interaction markers to generate, if not empty (default: "").',
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "synthesizeTapGesture",
          description:
            "Synthesizes a tap gesture over a time period by issuing appropriate touch events.",
          experimental: true,
          parameters: [
            {
              name: "x",
              description:
                "X coordinate of the start of the gesture in CSS pixels.",
              type: "number",
            },
            {
              name: "y",
              description:
                "Y coordinate of the start of the gesture in CSS pixels.",
              type: "number",
            },
            {
              name: "duration",
              description:
                "Duration between touchdown and touchup events in ms (default: 50).",
              optional: true,
              type: "integer",
            },
            {
              name: "tapCount",
              description:
                "Number of times to perform the tap (e.g. 2 for double tap, default: 1).",
              optional: true,
              type: "integer",
            },
            {
              name: "gestureSourceType",
              description:
                "Which type of input events to be generated (default: 'default', which queries the platform\nfor the preferred input type).",
              optional: true,
              $ref: "GestureSourceType",
            },
          ],
        },
      ],
      events: [
        {
          name: "dragIntercepted",
          description:
            "Emitted only when `Input.setInterceptDrags` is enabled. Use this data with `Input.dispatchDragEvent` to\nrestore normal drag and drop behavior.",
          experimental: true,
          parameters: [
            {
              name: "data",
              $ref: "DragData",
            },
          ],
        },
      ],
    },
    {
      domain: "Inspector",
      experimental: true,
      commands: [
        {
          name: "disable",
          description: "Disables inspector domain notifications.",
        },
        {
          name: "enable",
          description: "Enables inspector domain notifications.",
        },
      ],
      events: [
        {
          name: "detached",
          description:
            "Fired when remote debugging connection is about to be terminated. Contains detach reason.",
          parameters: [
            {
              name: "reason",
              description: "The reason why connection has been terminated.",
              type: "string",
            },
          ],
        },
        {
          name: "targetCrashed",
          description: "Fired when debugging target has crashed",
        },
        {
          name: "targetReloadedAfterCrash",
          description: "Fired when debugging target has reloaded after crash",
        },
      ],
    },
    {
      domain: "LayerTree",
      experimental: true,
      dependencies: ["DOM"],
      types: [
        {
          id: "LayerId",
          description: "Unique Layer identifier.",
          type: "string",
        },
        {
          id: "SnapshotId",
          description: "Unique snapshot identifier.",
          type: "string",
        },
        {
          id: "ScrollRect",
          description: "Rectangle where scrolling happens on the main thread.",
          type: "object",
          properties: [
            {
              name: "rect",
              description: "Rectangle itself.",
              $ref: "DOM.Rect",
            },
            {
              name: "type",
              description:
                "Reason for rectangle to force scrolling on the main thread",
              type: "string",
              enum: [
                "RepaintsOnScroll",
                "TouchEventHandler",
                "WheelEventHandler",
              ],
            },
          ],
        },
        {
          id: "StickyPositionConstraint",
          description: "Sticky position constraints.",
          type: "object",
          properties: [
            {
              name: "stickyBoxRect",
              description:
                "Layout rectangle of the sticky element before being shifted",
              $ref: "DOM.Rect",
            },
            {
              name: "containingBlockRect",
              description:
                "Layout rectangle of the containing block of the sticky element",
              $ref: "DOM.Rect",
            },
            {
              name: "nearestLayerShiftingStickyBox",
              description:
                "The nearest sticky layer that shifts the sticky box",
              optional: true,
              $ref: "LayerId",
            },
            {
              name: "nearestLayerShiftingContainingBlock",
              description:
                "The nearest sticky layer that shifts the containing block",
              optional: true,
              $ref: "LayerId",
            },
          ],
        },
        {
          id: "PictureTile",
          description:
            "Serialized fragment of layer picture along with its offset within the layer.",
          type: "object",
          properties: [
            {
              name: "x",
              description: "Offset from owning layer left boundary",
              type: "number",
            },
            {
              name: "y",
              description: "Offset from owning layer top boundary",
              type: "number",
            },
            {
              name: "picture",
              description:
                "Base64-encoded snapshot data. (Encoded as a base64 string when passed over JSON)",
              type: "string",
            },
          ],
        },
        {
          id: "Layer",
          description: "Information about a compositing layer.",
          type: "object",
          properties: [
            {
              name: "layerId",
              description: "The unique id for this layer.",
              $ref: "LayerId",
            },
            {
              name: "parentLayerId",
              description: "The id of parent (not present for root).",
              optional: true,
              $ref: "LayerId",
            },
            {
              name: "backendNodeId",
              description:
                "The backend id for the node associated with this layer.",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "offsetX",
              description: "Offset from parent layer, X coordinate.",
              type: "number",
            },
            {
              name: "offsetY",
              description: "Offset from parent layer, Y coordinate.",
              type: "number",
            },
            {
              name: "width",
              description: "Layer width.",
              type: "number",
            },
            {
              name: "height",
              description: "Layer height.",
              type: "number",
            },
            {
              name: "transform",
              description:
                "Transformation matrix for layer, default is identity matrix",
              optional: true,
              type: "array",
              items: {
                type: "number",
              },
            },
            {
              name: "anchorX",
              description:
                "Transform anchor point X, absent if no transform specified",
              optional: true,
              type: "number",
            },
            {
              name: "anchorY",
              description:
                "Transform anchor point Y, absent if no transform specified",
              optional: true,
              type: "number",
            },
            {
              name: "anchorZ",
              description:
                "Transform anchor point Z, absent if no transform specified",
              optional: true,
              type: "number",
            },
            {
              name: "paintCount",
              description: "Indicates how many time this layer has painted.",
              type: "integer",
            },
            {
              name: "drawsContent",
              description:
                "Indicates whether this layer hosts any content, rather than being used for\ntransform/scrolling purposes only.",
              type: "boolean",
            },
            {
              name: "invisible",
              description: "Set if layer is not visible.",
              optional: true,
              type: "boolean",
            },
            {
              name: "scrollRects",
              description: "Rectangles scrolling on main thread only.",
              optional: true,
              type: "array",
              items: {
                $ref: "ScrollRect",
              },
            },
            {
              name: "stickyPositionConstraint",
              description: "Sticky position constraint information",
              optional: true,
              $ref: "StickyPositionConstraint",
            },
          ],
        },
        {
          id: "PaintProfile",
          description: "Array of timings, one per paint step.",
          type: "array",
          items: {
            type: "number",
          },
        },
      ],
      commands: [
        {
          name: "compositingReasons",
          description:
            "Provides the reasons why the given layer was composited.",
          parameters: [
            {
              name: "layerId",
              description:
                "The id of the layer for which we want to get the reasons it was composited.",
              $ref: "LayerId",
            },
          ],
          returns: [
            {
              name: "compositingReasons",
              description:
                "A list of strings specifying reasons for the given layer to become composited.",
              deprecated: true,
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "compositingReasonIds",
              description:
                "A list of strings specifying reason IDs for the given layer to become composited.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "disable",
          description: "Disables compositing tree inspection.",
        },
        {
          name: "enable",
          description: "Enables compositing tree inspection.",
        },
        {
          name: "loadSnapshot",
          description: "Returns the snapshot identifier.",
          parameters: [
            {
              name: "tiles",
              description: "An array of tiles composing the snapshot.",
              type: "array",
              items: {
                $ref: "PictureTile",
              },
            },
          ],
          returns: [
            {
              name: "snapshotId",
              description: "The id of the snapshot.",
              $ref: "SnapshotId",
            },
          ],
        },
        {
          name: "makeSnapshot",
          description: "Returns the layer snapshot identifier.",
          parameters: [
            {
              name: "layerId",
              description: "The id of the layer.",
              $ref: "LayerId",
            },
          ],
          returns: [
            {
              name: "snapshotId",
              description: "The id of the layer snapshot.",
              $ref: "SnapshotId",
            },
          ],
        },
        {
          name: "profileSnapshot",
          parameters: [
            {
              name: "snapshotId",
              description: "The id of the layer snapshot.",
              $ref: "SnapshotId",
            },
            {
              name: "minRepeatCount",
              description:
                "The maximum number of times to replay the snapshot (1, if not specified).",
              optional: true,
              type: "integer",
            },
            {
              name: "minDuration",
              description:
                "The minimum duration (in seconds) to replay the snapshot.",
              optional: true,
              type: "number",
            },
            {
              name: "clipRect",
              description:
                "The clip rectangle to apply when replaying the snapshot.",
              optional: true,
              $ref: "DOM.Rect",
            },
          ],
          returns: [
            {
              name: "timings",
              description: "The array of paint profiles, one per run.",
              type: "array",
              items: {
                $ref: "PaintProfile",
              },
            },
          ],
        },
        {
          name: "releaseSnapshot",
          description: "Releases layer snapshot captured by the back-end.",
          parameters: [
            {
              name: "snapshotId",
              description: "The id of the layer snapshot.",
              $ref: "SnapshotId",
            },
          ],
        },
        {
          name: "replaySnapshot",
          description:
            "Replays the layer snapshot and returns the resulting bitmap.",
          parameters: [
            {
              name: "snapshotId",
              description: "The id of the layer snapshot.",
              $ref: "SnapshotId",
            },
            {
              name: "fromStep",
              description:
                "The first step to replay from (replay from the very start if not specified).",
              optional: true,
              type: "integer",
            },
            {
              name: "toStep",
              description:
                "The last step to replay to (replay till the end if not specified).",
              optional: true,
              type: "integer",
            },
            {
              name: "scale",
              description:
                "The scale to apply while replaying (defaults to 1).",
              optional: true,
              type: "number",
            },
          ],
          returns: [
            {
              name: "dataURL",
              description: "A data: URL for resulting image.",
              type: "string",
            },
          ],
        },
        {
          name: "snapshotCommandLog",
          description: "Replays the layer snapshot and returns canvas log.",
          parameters: [
            {
              name: "snapshotId",
              description: "The id of the layer snapshot.",
              $ref: "SnapshotId",
            },
          ],
          returns: [
            {
              name: "commandLog",
              description: "The array of canvas function calls.",
              type: "array",
              items: {
                type: "object",
              },
            },
          ],
        },
      ],
      events: [
        {
          name: "layerPainted",
          parameters: [
            {
              name: "layerId",
              description: "The id of the painted layer.",
              $ref: "LayerId",
            },
            {
              name: "clip",
              description: "Clip rectangle.",
              $ref: "DOM.Rect",
            },
          ],
        },
        {
          name: "layerTreeDidChange",
          parameters: [
            {
              name: "layers",
              description:
                "Layer tree, absent if not in the comspositing mode.",
              optional: true,
              type: "array",
              items: {
                $ref: "Layer",
              },
            },
          ],
        },
      ],
    },
    {
      domain: "Log",
      description: "Provides access to log entries.",
      dependencies: ["Runtime", "Network"],
      types: [
        {
          id: "LogEntry",
          description: "Log entry.",
          type: "object",
          properties: [
            {
              name: "source",
              description: "Log entry source.",
              type: "string",
              enum: [
                "xml",
                "javascript",
                "network",
                "storage",
                "appcache",
                "rendering",
                "security",
                "deprecation",
                "worker",
                "violation",
                "intervention",
                "recommendation",
                "other",
              ],
            },
            {
              name: "level",
              description: "Log entry severity.",
              type: "string",
              enum: ["verbose", "info", "warning", "error"],
            },
            {
              name: "text",
              description: "Logged text.",
              type: "string",
            },
            {
              name: "category",
              optional: true,
              type: "string",
              enum: ["cors"],
            },
            {
              name: "timestamp",
              description: "Timestamp when this entry was added.",
              $ref: "Runtime.Timestamp",
            },
            {
              name: "url",
              description: "URL of the resource if known.",
              optional: true,
              type: "string",
            },
            {
              name: "lineNumber",
              description: "Line number in the resource.",
              optional: true,
              type: "integer",
            },
            {
              name: "stackTrace",
              description: "JavaScript stack trace.",
              optional: true,
              $ref: "Runtime.StackTrace",
            },
            {
              name: "networkRequestId",
              description:
                "Identifier of the network request associated with this entry.",
              optional: true,
              $ref: "Network.RequestId",
            },
            {
              name: "workerId",
              description:
                "Identifier of the worker associated with this entry.",
              optional: true,
              type: "string",
            },
            {
              name: "args",
              description: "Call arguments.",
              optional: true,
              type: "array",
              items: {
                $ref: "Runtime.RemoteObject",
              },
            },
          ],
        },
        {
          id: "ViolationSetting",
          description: "Violation configuration setting.",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Violation type.",
              type: "string",
              enum: [
                "longTask",
                "longLayout",
                "blockedEvent",
                "blockedParser",
                "discouragedAPIUse",
                "handler",
                "recurringHandler",
              ],
            },
            {
              name: "threshold",
              description: "Time threshold to trigger upon.",
              type: "number",
            },
          ],
        },
      ],
      commands: [
        {
          name: "clear",
          description: "Clears the log.",
        },
        {
          name: "disable",
          description:
            "Disables log domain, prevents further log entries from being reported to the client.",
        },
        {
          name: "enable",
          description:
            "Enables log domain, sends the entries collected so far to the client by means of the\n`entryAdded` notification.",
        },
        {
          name: "startViolationsReport",
          description: "start violation reporting.",
          parameters: [
            {
              name: "config",
              description: "Configuration for violations.",
              type: "array",
              items: {
                $ref: "ViolationSetting",
              },
            },
          ],
        },
        {
          name: "stopViolationsReport",
          description: "Stop violation reporting.",
        },
      ],
      events: [
        {
          name: "entryAdded",
          description: "Issued when new message was logged.",
          parameters: [
            {
              name: "entry",
              description: "The entry.",
              $ref: "LogEntry",
            },
          ],
        },
      ],
    },
    {
      domain: "Memory",
      experimental: true,
      types: [
        {
          id: "PressureLevel",
          description: "Memory pressure level.",
          type: "string",
          enum: ["moderate", "critical"],
        },
        {
          id: "SamplingProfileNode",
          description: "Heap profile sample.",
          type: "object",
          properties: [
            {
              name: "size",
              description: "Size of the sampled allocation.",
              type: "number",
            },
            {
              name: "total",
              description: "Total bytes attributed to this sample.",
              type: "number",
            },
            {
              name: "stack",
              description: "Execution stack at the point of allocation.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          id: "SamplingProfile",
          description: "Array of heap profile samples.",
          type: "object",
          properties: [
            {
              name: "samples",
              type: "array",
              items: {
                $ref: "SamplingProfileNode",
              },
            },
            {
              name: "modules",
              type: "array",
              items: {
                $ref: "Module",
              },
            },
          ],
        },
        {
          id: "Module",
          description: "Executable module information",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Name of the module.",
              type: "string",
            },
            {
              name: "uuid",
              description: "UUID of the module.",
              type: "string",
            },
            {
              name: "baseAddress",
              description:
                "Base address where the module is loaded into memory. Encoded as a decimal\nor hexadecimal (0x prefixed) string.",
              type: "string",
            },
            {
              name: "size",
              description: "Size of the module in bytes.",
              type: "number",
            },
          ],
        },
      ],
      commands: [
        {
          name: "getDOMCounters",
          returns: [
            {
              name: "documents",
              type: "integer",
            },
            {
              name: "nodes",
              type: "integer",
            },
            {
              name: "jsEventListeners",
              type: "integer",
            },
          ],
        },
        {
          name: "prepareForLeakDetection",
        },
        {
          name: "forciblyPurgeJavaScriptMemory",
          description: "Simulate OomIntervention by purging V8 memory.",
        },
        {
          name: "setPressureNotificationsSuppressed",
          description:
            "Enable/disable suppressing memory pressure notifications in all processes.",
          parameters: [
            {
              name: "suppressed",
              description:
                "If true, memory pressure notifications will be suppressed.",
              type: "boolean",
            },
          ],
        },
        {
          name: "simulatePressureNotification",
          description:
            "Simulate a memory pressure notification in all processes.",
          parameters: [
            {
              name: "level",
              description: "Memory pressure level of the notification.",
              $ref: "PressureLevel",
            },
          ],
        },
        {
          name: "startSampling",
          description: "Start collecting native memory profile.",
          parameters: [
            {
              name: "samplingInterval",
              description: "Average number of bytes between samples.",
              optional: true,
              type: "integer",
            },
            {
              name: "suppressRandomness",
              description: "Do not randomize intervals between samples.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "stopSampling",
          description: "Stop collecting native memory profile.",
        },
        {
          name: "getAllTimeSamplingProfile",
          description:
            "Retrieve native memory allocations profile\ncollected since renderer process startup.",
          returns: [
            {
              name: "profile",
              $ref: "SamplingProfile",
            },
          ],
        },
        {
          name: "getBrowserSamplingProfile",
          description:
            "Retrieve native memory allocations profile\ncollected since browser process startup.",
          returns: [
            {
              name: "profile",
              $ref: "SamplingProfile",
            },
          ],
        },
        {
          name: "getSamplingProfile",
          description:
            "Retrieve native memory allocations profile collected since last\n`startSampling` call.",
          returns: [
            {
              name: "profile",
              $ref: "SamplingProfile",
            },
          ],
        },
      ],
    },
    {
      domain: "Network",
      description:
        "Network domain allows tracking network activities of the page. It exposes information about http,\nfile, data and other requests and responses, their headers, bodies, timing, etc.",
      dependencies: ["Debugger", "Runtime", "Security"],
      types: [
        {
          id: "ResourceType",
          description:
            "Resource type as it was perceived by the rendering engine.",
          type: "string",
          enum: [
            "Document",
            "Stylesheet",
            "Image",
            "Media",
            "Font",
            "Script",
            "TextTrack",
            "XHR",
            "Fetch",
            "Prefetch",
            "EventSource",
            "WebSocket",
            "Manifest",
            "SignedExchange",
            "Ping",
            "CSPViolationReport",
            "Preflight",
            "Other",
          ],
        },
        {
          id: "LoaderId",
          description: "Unique loader identifier.",
          type: "string",
        },
        {
          id: "RequestId",
          description: "Unique request identifier.",
          type: "string",
        },
        {
          id: "InterceptionId",
          description: "Unique intercepted request identifier.",
          type: "string",
        },
        {
          id: "ErrorReason",
          description: "Network level fetch failure reason.",
          type: "string",
          enum: [
            "Failed",
            "Aborted",
            "TimedOut",
            "AccessDenied",
            "ConnectionClosed",
            "ConnectionReset",
            "ConnectionRefused",
            "ConnectionAborted",
            "ConnectionFailed",
            "NameNotResolved",
            "InternetDisconnected",
            "AddressUnreachable",
            "BlockedByClient",
            "BlockedByResponse",
          ],
        },
        {
          id: "TimeSinceEpoch",
          description: "UTC time in seconds, counted from January 1, 1970.",
          type: "number",
        },
        {
          id: "MonotonicTime",
          description:
            "Monotonically increasing time in seconds since an arbitrary point in the past.",
          type: "number",
        },
        {
          id: "Headers",
          description:
            "Request / response headers as keys / values of JSON object.",
          type: "object",
        },
        {
          id: "ConnectionType",
          description:
            "The underlying connection technology that the browser is supposedly using.",
          type: "string",
          enum: [
            "none",
            "cellular2g",
            "cellular3g",
            "cellular4g",
            "bluetooth",
            "ethernet",
            "wifi",
            "wimax",
            "other",
          ],
        },
        {
          id: "CookieSameSite",
          description:
            "Represents the cookie's 'SameSite' status:\nhttps://tools.ietf.org/html/draft-west-first-party-cookies",
          type: "string",
          enum: ["Strict", "Lax", "None"],
        },
        {
          id: "CookiePriority",
          description:
            "Represents the cookie's 'Priority' status:\nhttps://tools.ietf.org/html/draft-west-cookie-priority-00",
          experimental: true,
          type: "string",
          enum: ["Low", "Medium", "High"],
        },
        {
          id: "CookieSourceScheme",
          description:
            'Represents the source scheme of the origin that originally set the cookie.\nA value of "Unset" allows protocol clients to emulate legacy cookie scope for the scheme.\nThis is a temporary ability and it will be removed in the future.',
          experimental: true,
          type: "string",
          enum: ["Unset", "NonSecure", "Secure"],
        },
        {
          id: "ResourceTiming",
          description: "Timing information for the request.",
          type: "object",
          properties: [
            {
              name: "requestTime",
              description:
                "Timing's requestTime is a baseline in seconds, while the other numbers are ticks in\nmilliseconds relatively to this requestTime.",
              type: "number",
            },
            {
              name: "proxyStart",
              description: "Started resolving proxy.",
              type: "number",
            },
            {
              name: "proxyEnd",
              description: "Finished resolving proxy.",
              type: "number",
            },
            {
              name: "dnsStart",
              description: "Started DNS address resolve.",
              type: "number",
            },
            {
              name: "dnsEnd",
              description: "Finished DNS address resolve.",
              type: "number",
            },
            {
              name: "connectStart",
              description: "Started connecting to the remote host.",
              type: "number",
            },
            {
              name: "connectEnd",
              description: "Connected to the remote host.",
              type: "number",
            },
            {
              name: "sslStart",
              description: "Started SSL handshake.",
              type: "number",
            },
            {
              name: "sslEnd",
              description: "Finished SSL handshake.",
              type: "number",
            },
            {
              name: "workerStart",
              description: "Started running ServiceWorker.",
              experimental: true,
              type: "number",
            },
            {
              name: "workerReady",
              description: "Finished Starting ServiceWorker.",
              experimental: true,
              type: "number",
            },
            {
              name: "workerFetchStart",
              description: "Started fetch event.",
              experimental: true,
              type: "number",
            },
            {
              name: "workerRespondWithSettled",
              description: "Settled fetch event respondWith promise.",
              experimental: true,
              type: "number",
            },
            {
              name: "sendStart",
              description: "Started sending request.",
              type: "number",
            },
            {
              name: "sendEnd",
              description: "Finished sending request.",
              type: "number",
            },
            {
              name: "pushStart",
              description: "Time the server started pushing request.",
              experimental: true,
              type: "number",
            },
            {
              name: "pushEnd",
              description: "Time the server finished pushing request.",
              experimental: true,
              type: "number",
            },
            {
              name: "receiveHeadersEnd",
              description: "Finished receiving response headers.",
              type: "number",
            },
          ],
        },
        {
          id: "ResourcePriority",
          description: "Loading priority of a resource request.",
          type: "string",
          enum: ["VeryLow", "Low", "Medium", "High", "VeryHigh"],
        },
        {
          id: "PostDataEntry",
          description: "Post data entry for HTTP request",
          type: "object",
          properties: [
            {
              name: "bytes",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "Request",
          description: "HTTP request data.",
          type: "object",
          properties: [
            {
              name: "url",
              description: "Request URL (without fragment).",
              type: "string",
            },
            {
              name: "urlFragment",
              description:
                "Fragment of the requested URL starting with hash, if present.",
              optional: true,
              type: "string",
            },
            {
              name: "method",
              description: "HTTP request method.",
              type: "string",
            },
            {
              name: "headers",
              description: "HTTP request headers.",
              $ref: "Headers",
            },
            {
              name: "postData",
              description: "HTTP POST request data.",
              optional: true,
              type: "string",
            },
            {
              name: "hasPostData",
              description:
                "True when the request has POST data. Note that postData might still be omitted when this flag is true when the data is too long.",
              optional: true,
              type: "boolean",
            },
            {
              name: "postDataEntries",
              description:
                "Request body elements. This will be converted from base64 to binary",
              experimental: true,
              optional: true,
              type: "array",
              items: {
                $ref: "PostDataEntry",
              },
            },
            {
              name: "mixedContentType",
              description: "The mixed content type of the request.",
              optional: true,
              $ref: "Security.MixedContentType",
            },
            {
              name: "initialPriority",
              description:
                "Priority of the resource request at the time request is sent.",
              $ref: "ResourcePriority",
            },
            {
              name: "referrerPolicy",
              description:
                "The referrer policy of the request, as defined in https://www.w3.org/TR/referrer-policy/",
              type: "string",
              enum: [
                "unsafe-url",
                "no-referrer-when-downgrade",
                "no-referrer",
                "origin",
                "origin-when-cross-origin",
                "same-origin",
                "strict-origin",
                "strict-origin-when-cross-origin",
              ],
            },
            {
              name: "isLinkPreload",
              description: "Whether is loaded via link preload.",
              optional: true,
              type: "boolean",
            },
            {
              name: "trustTokenParams",
              description:
                'Set for requests when the TrustToken API is used. Contains the parameters\npassed by the developer (e.g. via "fetch") as understood by the backend.',
              experimental: true,
              optional: true,
              $ref: "TrustTokenParams",
            },
            {
              name: "isSameSite",
              description:
                "True if this resource request is considered to be the 'same site' as the\nrequest correspondinfg to the main frame.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          id: "SignedCertificateTimestamp",
          description: "Details of a signed certificate timestamp (SCT).",
          type: "object",
          properties: [
            {
              name: "status",
              description: "Validation status.",
              type: "string",
            },
            {
              name: "origin",
              description: "Origin.",
              type: "string",
            },
            {
              name: "logDescription",
              description: "Log name / description.",
              type: "string",
            },
            {
              name: "logId",
              description: "Log ID.",
              type: "string",
            },
            {
              name: "timestamp",
              description:
                "Issuance date. Unlike TimeSinceEpoch, this contains the number of\nmilliseconds since January 1, 1970, UTC, not the number of seconds.",
              type: "number",
            },
            {
              name: "hashAlgorithm",
              description: "Hash algorithm.",
              type: "string",
            },
            {
              name: "signatureAlgorithm",
              description: "Signature algorithm.",
              type: "string",
            },
            {
              name: "signatureData",
              description: "Signature data.",
              type: "string",
            },
          ],
        },
        {
          id: "SecurityDetails",
          description: "Security details about a request.",
          type: "object",
          properties: [
            {
              name: "protocol",
              description: 'Protocol name (e.g. "TLS 1.2" or "QUIC").',
              type: "string",
            },
            {
              name: "keyExchange",
              description:
                "Key Exchange used by the connection, or the empty string if not applicable.",
              type: "string",
            },
            {
              name: "keyExchangeGroup",
              description:
                "(EC)DH group used by the connection, if applicable.",
              optional: true,
              type: "string",
            },
            {
              name: "cipher",
              description: "Cipher name.",
              type: "string",
            },
            {
              name: "mac",
              description:
                "TLS MAC. Note that AEAD ciphers do not have separate MACs.",
              optional: true,
              type: "string",
            },
            {
              name: "certificateId",
              description: "Certificate ID value.",
              $ref: "Security.CertificateId",
            },
            {
              name: "subjectName",
              description: "Certificate subject name.",
              type: "string",
            },
            {
              name: "sanList",
              description:
                "Subject Alternative Name (SAN) DNS names and IP addresses.",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "issuer",
              description: "Name of the issuing CA.",
              type: "string",
            },
            {
              name: "validFrom",
              description: "Certificate valid from date.",
              $ref: "TimeSinceEpoch",
            },
            {
              name: "validTo",
              description: "Certificate valid to (expiration) date",
              $ref: "TimeSinceEpoch",
            },
            {
              name: "signedCertificateTimestampList",
              description: "List of signed certificate timestamps (SCTs).",
              type: "array",
              items: {
                $ref: "SignedCertificateTimestamp",
              },
            },
            {
              name: "certificateTransparencyCompliance",
              description:
                "Whether the request complied with Certificate Transparency policy",
              $ref: "CertificateTransparencyCompliance",
            },
            {
              name: "serverSignatureAlgorithm",
              description:
                "The signature algorithm used by the server in the TLS server signature,\nrepresented as a TLS SignatureScheme code point. Omitted if not\napplicable or not known.",
              optional: true,
              type: "integer",
            },
            {
              name: "encryptedClientHello",
              description: "Whether the connection used Encrypted ClientHello",
              type: "boolean",
            },
          ],
        },
        {
          id: "CertificateTransparencyCompliance",
          description:
            "Whether the request complied with Certificate Transparency policy.",
          type: "string",
          enum: ["unknown", "not-compliant", "compliant"],
        },
        {
          id: "BlockedReason",
          description: "The reason why request was blocked.",
          type: "string",
          enum: [
            "other",
            "csp",
            "mixed-content",
            "origin",
            "inspector",
            "subresource-filter",
            "content-type",
            "coep-frame-resource-needs-coep-header",
            "coop-sandboxed-iframe-cannot-navigate-to-coop-page",
            "corp-not-same-origin",
            "corp-not-same-origin-after-defaulted-to-same-origin-by-coep",
            "corp-not-same-site",
          ],
        },
        {
          id: "CorsError",
          description: "The reason why request was blocked.",
          type: "string",
          enum: [
            "DisallowedByMode",
            "InvalidResponse",
            "WildcardOriginNotAllowed",
            "MissingAllowOriginHeader",
            "MultipleAllowOriginValues",
            "InvalidAllowOriginValue",
            "AllowOriginMismatch",
            "InvalidAllowCredentials",
            "CorsDisabledScheme",
            "PreflightInvalidStatus",
            "PreflightDisallowedRedirect",
            "PreflightWildcardOriginNotAllowed",
            "PreflightMissingAllowOriginHeader",
            "PreflightMultipleAllowOriginValues",
            "PreflightInvalidAllowOriginValue",
            "PreflightAllowOriginMismatch",
            "PreflightInvalidAllowCredentials",
            "PreflightMissingAllowExternal",
            "PreflightInvalidAllowExternal",
            "PreflightMissingAllowPrivateNetwork",
            "PreflightInvalidAllowPrivateNetwork",
            "InvalidAllowMethodsPreflightResponse",
            "InvalidAllowHeadersPreflightResponse",
            "MethodDisallowedByPreflightResponse",
            "HeaderDisallowedByPreflightResponse",
            "RedirectContainsCredentials",
            "InsecurePrivateNetwork",
            "InvalidPrivateNetworkAccess",
            "UnexpectedPrivateNetworkAccess",
            "NoCorsRedirectModeNotFollow",
          ],
        },
        {
          id: "CorsErrorStatus",
          type: "object",
          properties: [
            {
              name: "corsError",
              $ref: "CorsError",
            },
            {
              name: "failedParameter",
              type: "string",
            },
          ],
        },
        {
          id: "ServiceWorkerResponseSource",
          description: "Source of serviceworker response.",
          type: "string",
          enum: ["cache-storage", "http-cache", "fallback-code", "network"],
        },
        {
          id: "TrustTokenParams",
          description:
            "Determines what type of Trust Token operation is executed and\ndepending on the type, some additional parameters. The values\nare specified in third_party/blink/renderer/core/fetch/trust_token.idl.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "type",
              $ref: "TrustTokenOperationType",
            },
            {
              name: "refreshPolicy",
              description:
                'Only set for "token-redemption" type and determine whether\nto request a fresh SRR or use a still valid cached SRR.',
              type: "string",
              enum: ["UseCached", "Refresh"],
            },
            {
              name: "issuers",
              description:
                "Origins of issuers from whom to request tokens or redemption\nrecords.",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          id: "TrustTokenOperationType",
          experimental: true,
          type: "string",
          enum: ["Issuance", "Redemption", "Signing"],
        },
        {
          id: "AlternateProtocolUsage",
          description:
            "The reason why Chrome uses a specific transport protocol for HTTP semantics.",
          experimental: true,
          type: "string",
          enum: [
            "alternativeJobWonWithoutRace",
            "alternativeJobWonRace",
            "mainJobWonRace",
            "mappingMissing",
            "broken",
            "dnsAlpnH3JobWonWithoutRace",
            "dnsAlpnH3JobWonRace",
            "unspecifiedReason",
          ],
        },
        {
          id: "Response",
          description: "HTTP response data.",
          type: "object",
          properties: [
            {
              name: "url",
              description:
                "Response URL. This URL can be different from CachedResource.url in case of redirect.",
              type: "string",
            },
            {
              name: "status",
              description: "HTTP response status code.",
              type: "integer",
            },
            {
              name: "statusText",
              description: "HTTP response status text.",
              type: "string",
            },
            {
              name: "headers",
              description: "HTTP response headers.",
              $ref: "Headers",
            },
            {
              name: "headersText",
              description:
                "HTTP response headers text. This has been replaced by the headers in Network.responseReceivedExtraInfo.",
              deprecated: true,
              optional: true,
              type: "string",
            },
            {
              name: "mimeType",
              description: "Resource mimeType as determined by the browser.",
              type: "string",
            },
            {
              name: "requestHeaders",
              description:
                "Refined HTTP request headers that were actually transmitted over the network.",
              optional: true,
              $ref: "Headers",
            },
            {
              name: "requestHeadersText",
              description:
                "HTTP request headers text. This has been replaced by the headers in Network.requestWillBeSentExtraInfo.",
              deprecated: true,
              optional: true,
              type: "string",
            },
            {
              name: "connectionReused",
              description:
                "Specifies whether physical connection was actually reused for this request.",
              type: "boolean",
            },
            {
              name: "connectionId",
              description:
                "Physical connection id that was actually used for this request.",
              type: "number",
            },
            {
              name: "remoteIPAddress",
              description: "Remote IP address.",
              optional: true,
              type: "string",
            },
            {
              name: "remotePort",
              description: "Remote port.",
              optional: true,
              type: "integer",
            },
            {
              name: "fromDiskCache",
              description:
                "Specifies that the request was served from the disk cache.",
              optional: true,
              type: "boolean",
            },
            {
              name: "fromServiceWorker",
              description:
                "Specifies that the request was served from the ServiceWorker.",
              optional: true,
              type: "boolean",
            },
            {
              name: "fromPrefetchCache",
              description:
                "Specifies that the request was served from the prefetch cache.",
              optional: true,
              type: "boolean",
            },
            {
              name: "encodedDataLength",
              description:
                "Total number of bytes received for this request so far.",
              type: "number",
            },
            {
              name: "timing",
              description: "Timing information for the given request.",
              optional: true,
              $ref: "ResourceTiming",
            },
            {
              name: "serviceWorkerResponseSource",
              description: "Response source of response from ServiceWorker.",
              optional: true,
              $ref: "ServiceWorkerResponseSource",
            },
            {
              name: "responseTime",
              description:
                "The time at which the returned response was generated.",
              optional: true,
              $ref: "TimeSinceEpoch",
            },
            {
              name: "cacheStorageCacheName",
              description: "Cache Storage Cache Name.",
              optional: true,
              type: "string",
            },
            {
              name: "protocol",
              description: "Protocol used to fetch this request.",
              optional: true,
              type: "string",
            },
            {
              name: "alternateProtocolUsage",
              description:
                "The reason why Chrome uses a specific transport protocol for HTTP semantics.",
              experimental: true,
              optional: true,
              $ref: "AlternateProtocolUsage",
            },
            {
              name: "securityState",
              description: "Security state of the request resource.",
              $ref: "Security.SecurityState",
            },
            {
              name: "securityDetails",
              description: "Security details for the request.",
              optional: true,
              $ref: "SecurityDetails",
            },
          ],
        },
        {
          id: "WebSocketRequest",
          description: "WebSocket request data.",
          type: "object",
          properties: [
            {
              name: "headers",
              description: "HTTP request headers.",
              $ref: "Headers",
            },
          ],
        },
        {
          id: "WebSocketResponse",
          description: "WebSocket response data.",
          type: "object",
          properties: [
            {
              name: "status",
              description: "HTTP response status code.",
              type: "integer",
            },
            {
              name: "statusText",
              description: "HTTP response status text.",
              type: "string",
            },
            {
              name: "headers",
              description: "HTTP response headers.",
              $ref: "Headers",
            },
            {
              name: "headersText",
              description: "HTTP response headers text.",
              optional: true,
              type: "string",
            },
            {
              name: "requestHeaders",
              description: "HTTP request headers.",
              optional: true,
              $ref: "Headers",
            },
            {
              name: "requestHeadersText",
              description: "HTTP request headers text.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "WebSocketFrame",
          description:
            "WebSocket message data. This represents an entire WebSocket message, not just a fragmented frame as the name suggests.",
          type: "object",
          properties: [
            {
              name: "opcode",
              description: "WebSocket message opcode.",
              type: "number",
            },
            {
              name: "mask",
              description: "WebSocket message mask.",
              type: "boolean",
            },
            {
              name: "payloadData",
              description:
                "WebSocket message payload data.\nIf the opcode is 1, this is a text message and payloadData is a UTF-8 string.\nIf the opcode isn't 1, then payloadData is a base64 encoded string representing binary data.",
              type: "string",
            },
          ],
        },
        {
          id: "CachedResource",
          description: "Information about the cached resource.",
          type: "object",
          properties: [
            {
              name: "url",
              description:
                "Resource URL. This is the url of the original network request.",
              type: "string",
            },
            {
              name: "type",
              description: "Type of this resource.",
              $ref: "ResourceType",
            },
            {
              name: "response",
              description: "Cached response data.",
              optional: true,
              $ref: "Response",
            },
            {
              name: "bodySize",
              description: "Cached response body size.",
              type: "number",
            },
          ],
        },
        {
          id: "Initiator",
          description: "Information about the request initiator.",
          type: "object",
          properties: [
            {
              name: "type",
              description: "Type of this initiator.",
              type: "string",
              enum: [
                "parser",
                "script",
                "preload",
                "SignedExchange",
                "preflight",
                "other",
              ],
            },
            {
              name: "stack",
              description:
                "Initiator JavaScript stack trace, set for Script only.",
              optional: true,
              $ref: "Runtime.StackTrace",
            },
            {
              name: "url",
              description:
                "Initiator URL, set for Parser type or for Script type (when script is importing module) or for SignedExchange type.",
              optional: true,
              type: "string",
            },
            {
              name: "lineNumber",
              description:
                "Initiator line number, set for Parser type or for Script type (when script is importing\nmodule) (0-based).",
              optional: true,
              type: "number",
            },
            {
              name: "columnNumber",
              description:
                "Initiator column number, set for Parser type or for Script type (when script is importing\nmodule) (0-based).",
              optional: true,
              type: "number",
            },
            {
              name: "requestId",
              description:
                "Set if another request triggered this request (e.g. preflight).",
              optional: true,
              $ref: "RequestId",
            },
          ],
        },
        {
          id: "Cookie",
          description: "Cookie object",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Cookie name.",
              type: "string",
            },
            {
              name: "value",
              description: "Cookie value.",
              type: "string",
            },
            {
              name: "domain",
              description: "Cookie domain.",
              type: "string",
            },
            {
              name: "path",
              description: "Cookie path.",
              type: "string",
            },
            {
              name: "expires",
              description:
                "Cookie expiration date as the number of seconds since the UNIX epoch.",
              type: "number",
            },
            {
              name: "size",
              description: "Cookie size.",
              type: "integer",
            },
            {
              name: "httpOnly",
              description: "True if cookie is http-only.",
              type: "boolean",
            },
            {
              name: "secure",
              description: "True if cookie is secure.",
              type: "boolean",
            },
            {
              name: "session",
              description: "True in case of session cookie.",
              type: "boolean",
            },
            {
              name: "sameSite",
              description: "Cookie SameSite type.",
              optional: true,
              $ref: "CookieSameSite",
            },
            {
              name: "priority",
              description: "Cookie Priority",
              experimental: true,
              $ref: "CookiePriority",
            },
            {
              name: "sameParty",
              description: "True if cookie is SameParty.",
              experimental: true,
              type: "boolean",
            },
            {
              name: "sourceScheme",
              description: "Cookie source scheme type.",
              experimental: true,
              $ref: "CookieSourceScheme",
            },
            {
              name: "sourcePort",
              description:
                "Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.\nAn unspecified port value allows protocol clients to emulate legacy cookie scope for the port.\nThis is a temporary ability and it will be removed in the future.",
              experimental: true,
              type: "integer",
            },
            {
              name: "partitionKey",
              description:
                "Cookie partition key. The site of the top-level URL the browser was visiting at the start\nof the request to the endpoint that set the cookie.",
              experimental: true,
              optional: true,
              type: "string",
            },
            {
              name: "partitionKeyOpaque",
              description: "True if cookie partition key is opaque.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          id: "SetCookieBlockedReason",
          description:
            "Types of reasons why a cookie may not be stored from a response.",
          experimental: true,
          type: "string",
          enum: [
            "SecureOnly",
            "SameSiteStrict",
            "SameSiteLax",
            "SameSiteUnspecifiedTreatedAsLax",
            "SameSiteNoneInsecure",
            "UserPreferences",
            "ThirdPartyBlockedInFirstPartySet",
            "SyntaxError",
            "SchemeNotSupported",
            "OverwriteSecure",
            "InvalidDomain",
            "InvalidPrefix",
            "UnknownError",
            "SchemefulSameSiteStrict",
            "SchemefulSameSiteLax",
            "SchemefulSameSiteUnspecifiedTreatedAsLax",
            "SamePartyFromCrossPartyContext",
            "SamePartyConflictsWithOtherAttributes",
            "NameValuePairExceedsMaxSize",
          ],
        },
        {
          id: "CookieBlockedReason",
          description:
            "Types of reasons why a cookie may not be sent with a request.",
          experimental: true,
          type: "string",
          enum: [
            "SecureOnly",
            "NotOnPath",
            "DomainMismatch",
            "SameSiteStrict",
            "SameSiteLax",
            "SameSiteUnspecifiedTreatedAsLax",
            "SameSiteNoneInsecure",
            "UserPreferences",
            "ThirdPartyBlockedInFirstPartySet",
            "UnknownError",
            "SchemefulSameSiteStrict",
            "SchemefulSameSiteLax",
            "SchemefulSameSiteUnspecifiedTreatedAsLax",
            "SamePartyFromCrossPartyContext",
            "NameValuePairExceedsMaxSize",
          ],
        },
        {
          id: "BlockedSetCookieWithReason",
          description:
            "A cookie which was not stored from a response with the corresponding reason.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "blockedReasons",
              description: "The reason(s) this cookie was blocked.",
              type: "array",
              items: {
                $ref: "SetCookieBlockedReason",
              },
            },
            {
              name: "cookieLine",
              description:
                'The string representing this individual cookie as it would appear in the header.\nThis is not the entire "cookie" or "set-cookie" header which could have multiple cookies.',
              type: "string",
            },
            {
              name: "cookie",
              description:
                "The cookie object which represents the cookie which was not stored. It is optional because\nsometimes complete cookie information is not available, such as in the case of parsing\nerrors.",
              optional: true,
              $ref: "Cookie",
            },
          ],
        },
        {
          id: "BlockedCookieWithReason",
          description:
            "A cookie with was not sent with a request with the corresponding reason.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "blockedReasons",
              description: "The reason(s) the cookie was blocked.",
              type: "array",
              items: {
                $ref: "CookieBlockedReason",
              },
            },
            {
              name: "cookie",
              description:
                "The cookie object representing the cookie which was not sent.",
              $ref: "Cookie",
            },
          ],
        },
        {
          id: "CookieParam",
          description: "Cookie parameter object",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Cookie name.",
              type: "string",
            },
            {
              name: "value",
              description: "Cookie value.",
              type: "string",
            },
            {
              name: "url",
              description:
                "The request-URI to associate with the setting of the cookie. This value can affect the\ndefault domain, path, source port, and source scheme values of the created cookie.",
              optional: true,
              type: "string",
            },
            {
              name: "domain",
              description: "Cookie domain.",
              optional: true,
              type: "string",
            },
            {
              name: "path",
              description: "Cookie path.",
              optional: true,
              type: "string",
            },
            {
              name: "secure",
              description: "True if cookie is secure.",
              optional: true,
              type: "boolean",
            },
            {
              name: "httpOnly",
              description: "True if cookie is http-only.",
              optional: true,
              type: "boolean",
            },
            {
              name: "sameSite",
              description: "Cookie SameSite type.",
              optional: true,
              $ref: "CookieSameSite",
            },
            {
              name: "expires",
              description: "Cookie expiration date, session cookie if not set",
              optional: true,
              $ref: "TimeSinceEpoch",
            },
            {
              name: "priority",
              description: "Cookie Priority.",
              experimental: true,
              optional: true,
              $ref: "CookiePriority",
            },
            {
              name: "sameParty",
              description: "True if cookie is SameParty.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
            {
              name: "sourceScheme",
              description: "Cookie source scheme type.",
              experimental: true,
              optional: true,
              $ref: "CookieSourceScheme",
            },
            {
              name: "sourcePort",
              description:
                "Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.\nAn unspecified port value allows protocol clients to emulate legacy cookie scope for the port.\nThis is a temporary ability and it will be removed in the future.",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "partitionKey",
              description:
                "Cookie partition key. The site of the top-level URL the browser was visiting at the start\nof the request to the endpoint that set the cookie.\nIf not set, the cookie will be set as not partitioned.",
              experimental: true,
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "AuthChallenge",
          description:
            "Authorization challenge for HTTP status code 401 or 407.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "source",
              description: "Source of the authentication challenge.",
              optional: true,
              type: "string",
              enum: ["Server", "Proxy"],
            },
            {
              name: "origin",
              description: "Origin of the challenger.",
              type: "string",
            },
            {
              name: "scheme",
              description:
                "The authentication scheme used, such as basic or digest",
              type: "string",
            },
            {
              name: "realm",
              description: "The realm of the challenge. May be empty.",
              type: "string",
            },
          ],
        },
        {
          id: "AuthChallengeResponse",
          description: "Response to an AuthChallenge.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "response",
              description:
                "The decision on what to do in response to the authorization challenge.  Default means\ndeferring to the default behavior of the net stack, which will likely either the Cancel\nauthentication or display a popup dialog box.",
              type: "string",
              enum: ["Default", "CancelAuth", "ProvideCredentials"],
            },
            {
              name: "username",
              description:
                "The username to provide, possibly empty. Should only be set if response is\nProvideCredentials.",
              optional: true,
              type: "string",
            },
            {
              name: "password",
              description:
                "The password to provide, possibly empty. Should only be set if response is\nProvideCredentials.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "InterceptionStage",
          description:
            "Stages of the interception to begin intercepting. Request will intercept before the request is\nsent. Response will intercept after the response is received.",
          experimental: true,
          type: "string",
          enum: ["Request", "HeadersReceived"],
        },
        {
          id: "RequestPattern",
          description: "Request pattern for interception.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "urlPattern",
              description:
                "Wildcards (`'*'` -> zero or more, `'?'` -> exactly one) are allowed. Escape character is\nbackslash. Omitting is equivalent to `\"*\"`.",
              optional: true,
              type: "string",
            },
            {
              name: "resourceType",
              description:
                "If set, only requests for matching resource types will be intercepted.",
              optional: true,
              $ref: "ResourceType",
            },
            {
              name: "interceptionStage",
              description:
                "Stage at which to begin intercepting requests. Default is Request.",
              optional: true,
              $ref: "InterceptionStage",
            },
          ],
        },
        {
          id: "SignedExchangeSignature",
          description:
            "Information about a signed exchange signature.\nhttps://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#rfc.section.3.1",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "label",
              description: "Signed exchange signature label.",
              type: "string",
            },
            {
              name: "signature",
              description: "The hex string of signed exchange signature.",
              type: "string",
            },
            {
              name: "integrity",
              description: "Signed exchange signature integrity.",
              type: "string",
            },
            {
              name: "certUrl",
              description: "Signed exchange signature cert Url.",
              optional: true,
              type: "string",
            },
            {
              name: "certSha256",
              description:
                "The hex string of signed exchange signature cert sha256.",
              optional: true,
              type: "string",
            },
            {
              name: "validityUrl",
              description: "Signed exchange signature validity Url.",
              type: "string",
            },
            {
              name: "date",
              description: "Signed exchange signature date.",
              type: "integer",
            },
            {
              name: "expires",
              description: "Signed exchange signature expires.",
              type: "integer",
            },
            {
              name: "certificates",
              description: "The encoded certificates.",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          id: "SignedExchangeHeader",
          description:
            "Information about a signed exchange header.\nhttps://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#cbor-representation",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "requestUrl",
              description: "Signed exchange request URL.",
              type: "string",
            },
            {
              name: "responseCode",
              description: "Signed exchange response code.",
              type: "integer",
            },
            {
              name: "responseHeaders",
              description: "Signed exchange response headers.",
              $ref: "Headers",
            },
            {
              name: "signatures",
              description: "Signed exchange response signature.",
              type: "array",
              items: {
                $ref: "SignedExchangeSignature",
              },
            },
            {
              name: "headerIntegrity",
              description:
                'Signed exchange header integrity hash in the form of "sha256-<base64-hash-value>".',
              type: "string",
            },
          ],
        },
        {
          id: "SignedExchangeErrorField",
          description: "Field type for a signed exchange related error.",
          experimental: true,
          type: "string",
          enum: [
            "signatureSig",
            "signatureIntegrity",
            "signatureCertUrl",
            "signatureCertSha256",
            "signatureValidityUrl",
            "signatureTimestamps",
          ],
        },
        {
          id: "SignedExchangeError",
          description: "Information about a signed exchange response.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "message",
              description: "Error message.",
              type: "string",
            },
            {
              name: "signatureIndex",
              description: "The index of the signature which caused the error.",
              optional: true,
              type: "integer",
            },
            {
              name: "errorField",
              description: "The field which caused the error.",
              optional: true,
              $ref: "SignedExchangeErrorField",
            },
          ],
        },
        {
          id: "SignedExchangeInfo",
          description: "Information about a signed exchange response.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "outerResponse",
              description:
                "The outer response of signed HTTP exchange which was received from network.",
              $ref: "Response",
            },
            {
              name: "header",
              description: "Information about the signed exchange header.",
              optional: true,
              $ref: "SignedExchangeHeader",
            },
            {
              name: "securityDetails",
              description: "Security details for the signed exchange header.",
              optional: true,
              $ref: "SecurityDetails",
            },
            {
              name: "errors",
              description:
                "Errors occurred while handling the signed exchagne.",
              optional: true,
              type: "array",
              items: {
                $ref: "SignedExchangeError",
              },
            },
          ],
        },
        {
          id: "ContentEncoding",
          description: "List of content encodings supported by the backend.",
          experimental: true,
          type: "string",
          enum: ["deflate", "gzip", "br"],
        },
        {
          id: "PrivateNetworkRequestPolicy",
          experimental: true,
          type: "string",
          enum: [
            "Allow",
            "BlockFromInsecureToMorePrivate",
            "WarnFromInsecureToMorePrivate",
            "PreflightBlock",
            "PreflightWarn",
          ],
        },
        {
          id: "IPAddressSpace",
          experimental: true,
          type: "string",
          enum: ["Local", "Private", "Public", "Unknown"],
        },
        {
          id: "ConnectTiming",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "requestTime",
              description:
                "Timing's requestTime is a baseline in seconds, while the other numbers are ticks in\nmilliseconds relatively to this requestTime. Matches ResourceTiming's requestTime for\nthe same request (but not for redirected requests).",
              type: "number",
            },
          ],
        },
        {
          id: "ClientSecurityState",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "initiatorIsSecureContext",
              type: "boolean",
            },
            {
              name: "initiatorIPAddressSpace",
              $ref: "IPAddressSpace",
            },
            {
              name: "privateNetworkRequestPolicy",
              $ref: "PrivateNetworkRequestPolicy",
            },
          ],
        },
        {
          id: "CrossOriginOpenerPolicyValue",
          experimental: true,
          type: "string",
          enum: [
            "SameOrigin",
            "SameOriginAllowPopups",
            "RestrictProperties",
            "UnsafeNone",
            "SameOriginPlusCoep",
            "RestrictPropertiesPlusCoep",
          ],
        },
        {
          id: "CrossOriginOpenerPolicyStatus",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "value",
              $ref: "CrossOriginOpenerPolicyValue",
            },
            {
              name: "reportOnlyValue",
              $ref: "CrossOriginOpenerPolicyValue",
            },
            {
              name: "reportingEndpoint",
              optional: true,
              type: "string",
            },
            {
              name: "reportOnlyReportingEndpoint",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "CrossOriginEmbedderPolicyValue",
          experimental: true,
          type: "string",
          enum: ["None", "Credentialless", "RequireCorp"],
        },
        {
          id: "CrossOriginEmbedderPolicyStatus",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "value",
              $ref: "CrossOriginEmbedderPolicyValue",
            },
            {
              name: "reportOnlyValue",
              $ref: "CrossOriginEmbedderPolicyValue",
            },
            {
              name: "reportingEndpoint",
              optional: true,
              type: "string",
            },
            {
              name: "reportOnlyReportingEndpoint",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "SecurityIsolationStatus",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "coop",
              optional: true,
              $ref: "CrossOriginOpenerPolicyStatus",
            },
            {
              name: "coep",
              optional: true,
              $ref: "CrossOriginEmbedderPolicyStatus",
            },
          ],
        },
        {
          id: "ReportStatus",
          description: "The status of a Reporting API report.",
          experimental: true,
          type: "string",
          enum: ["Queued", "Pending", "MarkedForRemoval", "Success"],
        },
        {
          id: "ReportId",
          experimental: true,
          type: "string",
        },
        {
          id: "ReportingApiReport",
          description:
            "An object representing a report generated by the Reporting API.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "id",
              $ref: "ReportId",
            },
            {
              name: "initiatorUrl",
              description: "The URL of the document that triggered the report.",
              type: "string",
            },
            {
              name: "destination",
              description:
                "The name of the endpoint group that should be used to deliver the report.",
              type: "string",
            },
            {
              name: "type",
              description:
                "The type of the report (specifies the set of data that is contained in the report body).",
              type: "string",
            },
            {
              name: "timestamp",
              description: "When the report was generated.",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "depth",
              description: "How many uploads deep the related request was.",
              type: "integer",
            },
            {
              name: "completedAttempts",
              description:
                "The number of delivery attempts made so far, not including an active attempt.",
              type: "integer",
            },
            {
              name: "body",
              type: "object",
            },
            {
              name: "status",
              $ref: "ReportStatus",
            },
          ],
        },
        {
          id: "ReportingApiEndpoint",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "url",
              description:
                "The URL of the endpoint to which reports may be delivered.",
              type: "string",
            },
            {
              name: "groupName",
              description: "Name of the endpoint group.",
              type: "string",
            },
          ],
        },
        {
          id: "LoadNetworkResourcePageResult",
          description:
            "An object providing the result of a network resource load.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "success",
              type: "boolean",
            },
            {
              name: "netError",
              description: "Optional values used for error reporting.",
              optional: true,
              type: "number",
            },
            {
              name: "netErrorName",
              optional: true,
              type: "string",
            },
            {
              name: "httpStatusCode",
              optional: true,
              type: "number",
            },
            {
              name: "stream",
              description:
                "If successful, one of the following two fields holds the result.",
              optional: true,
              $ref: "IO.StreamHandle",
            },
            {
              name: "headers",
              description: "Response headers.",
              optional: true,
              $ref: "Network.Headers",
            },
          ],
        },
        {
          id: "LoadNetworkResourceOptions",
          description:
            "An options object that may be extended later to better support CORS,\nCORB and streaming.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "disableCache",
              type: "boolean",
            },
            {
              name: "includeCredentials",
              type: "boolean",
            },
          ],
        },
      ],
      commands: [
        {
          name: "setAcceptedEncodings",
          description:
            "Sets a list of content encodings that will be accepted. Empty list means no encoding is accepted.",
          experimental: true,
          parameters: [
            {
              name: "encodings",
              description: "List of accepted content encodings.",
              type: "array",
              items: {
                $ref: "ContentEncoding",
              },
            },
          ],
        },
        {
          name: "clearAcceptedEncodingsOverride",
          description: "Clears accepted encodings set by setAcceptedEncodings",
          experimental: true,
        },
        {
          name: "canClearBrowserCache",
          description: "Tells whether clearing browser cache is supported.",
          deprecated: true,
          returns: [
            {
              name: "result",
              description: "True if browser cache can be cleared.",
              type: "boolean",
            },
          ],
        },
        {
          name: "canClearBrowserCookies",
          description: "Tells whether clearing browser cookies is supported.",
          deprecated: true,
          returns: [
            {
              name: "result",
              description: "True if browser cookies can be cleared.",
              type: "boolean",
            },
          ],
        },
        {
          name: "canEmulateNetworkConditions",
          description:
            "Tells whether emulation of network conditions is supported.",
          deprecated: true,
          returns: [
            {
              name: "result",
              description:
                "True if emulation of network conditions is supported.",
              type: "boolean",
            },
          ],
        },
        {
          name: "clearBrowserCache",
          description: "Clears browser cache.",
        },
        {
          name: "clearBrowserCookies",
          description: "Clears browser cookies.",
        },
        {
          name: "continueInterceptedRequest",
          description:
            "Response to Network.requestIntercepted which either modifies the request to continue with any\nmodifications, or blocks it, or completes it with the provided response bytes. If a network\nfetch occurs as a result which encounters a redirect an additional Network.requestIntercepted\nevent will be sent with the same InterceptionId.\nDeprecated, use Fetch.continueRequest, Fetch.fulfillRequest and Fetch.failRequest instead.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "interceptionId",
              $ref: "InterceptionId",
            },
            {
              name: "errorReason",
              description:
                "If set this causes the request to fail with the given reason. Passing `Aborted` for requests\nmarked with `isNavigationRequest` also cancels the navigation. Must not be set in response\nto an authChallenge.",
              optional: true,
              $ref: "ErrorReason",
            },
            {
              name: "rawResponse",
              description:
                "If set the requests completes using with the provided base64 encoded raw response, including\nHTTP status line and headers etc... Must not be set in response to an authChallenge. (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
            {
              name: "url",
              description:
                "If set the request url will be modified in a way that's not observable by page. Must not be\nset in response to an authChallenge.",
              optional: true,
              type: "string",
            },
            {
              name: "method",
              description:
                "If set this allows the request method to be overridden. Must not be set in response to an\nauthChallenge.",
              optional: true,
              type: "string",
            },
            {
              name: "postData",
              description:
                "If set this allows postData to be set. Must not be set in response to an authChallenge.",
              optional: true,
              type: "string",
            },
            {
              name: "headers",
              description:
                "If set this allows the request headers to be changed. Must not be set in response to an\nauthChallenge.",
              optional: true,
              $ref: "Headers",
            },
            {
              name: "authChallengeResponse",
              description:
                "Response to a requestIntercepted with an authChallenge. Must not be set otherwise.",
              optional: true,
              $ref: "AuthChallengeResponse",
            },
          ],
        },
        {
          name: "deleteCookies",
          description:
            "Deletes browser cookies with matching name and url or domain/path pair.",
          parameters: [
            {
              name: "name",
              description: "Name of the cookies to remove.",
              type: "string",
            },
            {
              name: "url",
              description:
                "If specified, deletes all the cookies with the given name where domain and path match\nprovided URL.",
              optional: true,
              type: "string",
            },
            {
              name: "domain",
              description:
                "If specified, deletes only cookies with the exact domain.",
              optional: true,
              type: "string",
            },
            {
              name: "path",
              description:
                "If specified, deletes only cookies with the exact path.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "disable",
          description:
            "Disables network tracking, prevents network events from being sent to the client.",
        },
        {
          name: "emulateNetworkConditions",
          description: "Activates emulation of network conditions.",
          parameters: [
            {
              name: "offline",
              description: "True to emulate internet disconnection.",
              type: "boolean",
            },
            {
              name: "latency",
              description:
                "Minimum latency from request sent to response headers received (ms).",
              type: "number",
            },
            {
              name: "downloadThroughput",
              description:
                "Maximal aggregated download throughput (bytes/sec). -1 disables download throttling.",
              type: "number",
            },
            {
              name: "uploadThroughput",
              description:
                "Maximal aggregated upload throughput (bytes/sec).  -1 disables upload throttling.",
              type: "number",
            },
            {
              name: "connectionType",
              description: "Connection type if known.",
              optional: true,
              $ref: "ConnectionType",
            },
          ],
        },
        {
          name: "enable",
          description:
            "Enables network tracking, network events will now be delivered to the client.",
          parameters: [
            {
              name: "maxTotalBufferSize",
              description:
                "Buffer size in bytes to use when preserving network payloads (XHRs, etc).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "maxResourceBufferSize",
              description:
                "Per-resource buffer size in bytes to use when preserving network payloads (XHRs, etc).",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "maxPostDataSize",
              description:
                "Longest post body size (in bytes) that would be included in requestWillBeSent notification",
              optional: true,
              type: "integer",
            },
          ],
        },
        {
          name: "getAllCookies",
          description:
            "Returns all browser cookies. Depending on the backend support, will return detailed cookie\ninformation in the `cookies` field.",
          returns: [
            {
              name: "cookies",
              description: "Array of cookie objects.",
              type: "array",
              items: {
                $ref: "Cookie",
              },
            },
          ],
        },
        {
          name: "getCertificate",
          description: "Returns the DER-encoded certificate.",
          experimental: true,
          parameters: [
            {
              name: "origin",
              description: "Origin to get certificate for.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "tableNames",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "getCookies",
          description:
            "Returns all browser cookies for the current URL. Depending on the backend support, will return\ndetailed cookie information in the `cookies` field.",
          parameters: [
            {
              name: "urls",
              description:
                "The list of URLs for which applicable cookies will be fetched.\nIf not specified, it's assumed to be set to the list containing\nthe URLs of the page and all of its subframes.",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
          returns: [
            {
              name: "cookies",
              description: "Array of cookie objects.",
              type: "array",
              items: {
                $ref: "Cookie",
              },
            },
          ],
        },
        {
          name: "getResponseBody",
          description: "Returns content served for the given request.",
          parameters: [
            {
              name: "requestId",
              description:
                "Identifier of the network request to get content for.",
              $ref: "RequestId",
            },
          ],
          returns: [
            {
              name: "body",
              description: "Response body.",
              type: "string",
            },
            {
              name: "base64Encoded",
              description: "True, if content was sent as base64.",
              type: "boolean",
            },
          ],
        },
        {
          name: "getRequestPostData",
          description:
            "Returns post data sent with the request. Returns an error when no data was sent with the request.",
          parameters: [
            {
              name: "requestId",
              description:
                "Identifier of the network request to get content for.",
              $ref: "RequestId",
            },
          ],
          returns: [
            {
              name: "postData",
              description:
                "Request body string, omitting files from multipart requests",
              type: "string",
            },
          ],
        },
        {
          name: "getResponseBodyForInterception",
          description:
            "Returns content served for the given currently intercepted request.",
          experimental: true,
          parameters: [
            {
              name: "interceptionId",
              description:
                "Identifier for the intercepted request to get body for.",
              $ref: "InterceptionId",
            },
          ],
          returns: [
            {
              name: "body",
              description: "Response body.",
              type: "string",
            },
            {
              name: "base64Encoded",
              description: "True, if content was sent as base64.",
              type: "boolean",
            },
          ],
        },
        {
          name: "takeResponseBodyForInterceptionAsStream",
          description:
            "Returns a handle to the stream representing the response body. Note that after this command,\nthe intercepted request can't be continued as is -- you either need to cancel it or to provide\nthe response body. The stream only supports sequential read, IO.read will fail if the position\nis specified.",
          experimental: true,
          parameters: [
            {
              name: "interceptionId",
              $ref: "InterceptionId",
            },
          ],
          returns: [
            {
              name: "stream",
              $ref: "IO.StreamHandle",
            },
          ],
        },
        {
          name: "replayXHR",
          description:
            "This method sends a new XMLHttpRequest which is identical to the original one. The following\nparameters should be identical: method, url, async, request body, extra headers, withCredentials\nattribute, user, password.",
          experimental: true,
          parameters: [
            {
              name: "requestId",
              description: "Identifier of XHR to replay.",
              $ref: "RequestId",
            },
          ],
        },
        {
          name: "searchInResponseBody",
          description: "Searches for given string in response content.",
          experimental: true,
          parameters: [
            {
              name: "requestId",
              description: "Identifier of the network response to search.",
              $ref: "RequestId",
            },
            {
              name: "query",
              description: "String to search for.",
              type: "string",
            },
            {
              name: "caseSensitive",
              description: "If true, search is case sensitive.",
              optional: true,
              type: "boolean",
            },
            {
              name: "isRegex",
              description: "If true, treats string parameter as regex.",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "result",
              description: "List of search matches.",
              type: "array",
              items: {
                $ref: "Debugger.SearchMatch",
              },
            },
          ],
        },
        {
          name: "setBlockedURLs",
          description: "Blocks URLs from loading.",
          experimental: true,
          parameters: [
            {
              name: "urls",
              description:
                "URL patterns to block. Wildcards ('*') are allowed.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "setBypassServiceWorker",
          description: "Toggles ignoring of service worker for each request.",
          experimental: true,
          parameters: [
            {
              name: "bypass",
              description: "Bypass service worker and load from network.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setCacheDisabled",
          description:
            "Toggles ignoring cache for each request. If `true`, cache will not be used.",
          parameters: [
            {
              name: "cacheDisabled",
              description: "Cache disabled state.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setCookie",
          description:
            "Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.",
          parameters: [
            {
              name: "name",
              description: "Cookie name.",
              type: "string",
            },
            {
              name: "value",
              description: "Cookie value.",
              type: "string",
            },
            {
              name: "url",
              description:
                "The request-URI to associate with the setting of the cookie. This value can affect the\ndefault domain, path, source port, and source scheme values of the created cookie.",
              optional: true,
              type: "string",
            },
            {
              name: "domain",
              description: "Cookie domain.",
              optional: true,
              type: "string",
            },
            {
              name: "path",
              description: "Cookie path.",
              optional: true,
              type: "string",
            },
            {
              name: "secure",
              description: "True if cookie is secure.",
              optional: true,
              type: "boolean",
            },
            {
              name: "httpOnly",
              description: "True if cookie is http-only.",
              optional: true,
              type: "boolean",
            },
            {
              name: "sameSite",
              description: "Cookie SameSite type.",
              optional: true,
              $ref: "CookieSameSite",
            },
            {
              name: "expires",
              description: "Cookie expiration date, session cookie if not set",
              optional: true,
              $ref: "TimeSinceEpoch",
            },
            {
              name: "priority",
              description: "Cookie Priority type.",
              experimental: true,
              optional: true,
              $ref: "CookiePriority",
            },
            {
              name: "sameParty",
              description: "True if cookie is SameParty.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
            {
              name: "sourceScheme",
              description: "Cookie source scheme type.",
              experimental: true,
              optional: true,
              $ref: "CookieSourceScheme",
            },
            {
              name: "sourcePort",
              description:
                "Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.\nAn unspecified port value allows protocol clients to emulate legacy cookie scope for the port.\nThis is a temporary ability and it will be removed in the future.",
              experimental: true,
              optional: true,
              type: "integer",
            },
            {
              name: "partitionKey",
              description:
                "Cookie partition key. The site of the top-level URL the browser was visiting at the start\nof the request to the endpoint that set the cookie.\nIf not set, the cookie will be set as not partitioned.",
              experimental: true,
              optional: true,
              type: "string",
            },
          ],
          returns: [
            {
              name: "success",
              description:
                "Always set to true. If an error occurs, the response indicates protocol error.",
              deprecated: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "setCookies",
          description: "Sets given cookies.",
          parameters: [
            {
              name: "cookies",
              description: "Cookies to be set.",
              type: "array",
              items: {
                $ref: "CookieParam",
              },
            },
          ],
        },
        {
          name: "setExtraHTTPHeaders",
          description:
            "Specifies whether to always send extra HTTP headers with the requests from this page.",
          parameters: [
            {
              name: "headers",
              description: "Map with extra HTTP headers.",
              $ref: "Headers",
            },
          ],
        },
        {
          name: "setAttachDebugStack",
          description:
            "Specifies whether to attach a page script stack id in requests",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              description:
                "Whether to attach a page script stack for debugging purpose.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setRequestInterception",
          description:
            "Sets the requests to intercept that match the provided patterns and optionally resource types.\nDeprecated, please use Fetch.enable instead.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "patterns",
              description:
                "Requests matching any of these patterns will be forwarded and wait for the corresponding\ncontinueInterceptedRequest call.",
              type: "array",
              items: {
                $ref: "RequestPattern",
              },
            },
          ],
        },
        {
          name: "setUserAgentOverride",
          description: "Allows overriding user agent with the given string.",
          redirect: "Emulation",
          parameters: [
            {
              name: "userAgent",
              description: "User agent to use.",
              type: "string",
            },
            {
              name: "acceptLanguage",
              description: "Browser langugage to emulate.",
              optional: true,
              type: "string",
            },
            {
              name: "platform",
              description: "The platform navigator.platform should return.",
              optional: true,
              type: "string",
            },
            {
              name: "userAgentMetadata",
              description:
                "To be sent in Sec-CH-UA-* headers and returned in navigator.userAgentData",
              experimental: true,
              optional: true,
              $ref: "Emulation.UserAgentMetadata",
            },
          ],
        },
        {
          name: "getSecurityIsolationStatus",
          description:
            "Returns information about the COEP/COOP isolation status.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              description:
                "If no frameId is provided, the status of the target is provided.",
              optional: true,
              $ref: "Page.FrameId",
            },
          ],
          returns: [
            {
              name: "status",
              $ref: "SecurityIsolationStatus",
            },
          ],
        },
        {
          name: "enableReportingApi",
          description:
            "Enables tracking for the Reporting API, events generated by the Reporting API will now be delivered to the client.\nEnabling triggers 'reportingApiReportAdded' for all existing reports.",
          experimental: true,
          parameters: [
            {
              name: "enable",
              description:
                "Whether to enable or disable events for the Reporting API",
              type: "boolean",
            },
          ],
        },
        {
          name: "loadNetworkResource",
          description: "Fetches the resource and returns the content.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              description:
                "Frame id to get the resource for. Mandatory for frame targets, and\nshould be omitted for worker targets.",
              optional: true,
              $ref: "Page.FrameId",
            },
            {
              name: "url",
              description: "URL of the resource to get content for.",
              type: "string",
            },
            {
              name: "options",
              description: "Options for the request.",
              $ref: "LoadNetworkResourceOptions",
            },
          ],
          returns: [
            {
              name: "resource",
              $ref: "LoadNetworkResourcePageResult",
            },
          ],
        },
      ],
      events: [
        {
          name: "dataReceived",
          description: "Fired when data chunk was received over the network.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "dataLength",
              description: "Data chunk length.",
              type: "integer",
            },
            {
              name: "encodedDataLength",
              description:
                "Actual bytes received (might be less than dataLength for compressed encodings).",
              type: "integer",
            },
          ],
        },
        {
          name: "eventSourceMessageReceived",
          description: "Fired when EventSource message is received.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "eventName",
              description: "Message type.",
              type: "string",
            },
            {
              name: "eventId",
              description: "Message identifier.",
              type: "string",
            },
            {
              name: "data",
              description: "Message content.",
              type: "string",
            },
          ],
        },
        {
          name: "loadingFailed",
          description: "Fired when HTTP request has failed to load.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "type",
              description: "Resource type.",
              $ref: "ResourceType",
            },
            {
              name: "errorText",
              description: "User friendly error message.",
              type: "string",
            },
            {
              name: "canceled",
              description: "True if loading was canceled.",
              optional: true,
              type: "boolean",
            },
            {
              name: "blockedReason",
              description: "The reason why loading was blocked, if any.",
              optional: true,
              $ref: "BlockedReason",
            },
            {
              name: "corsErrorStatus",
              description:
                "The reason why loading was blocked by CORS, if any.",
              optional: true,
              $ref: "CorsErrorStatus",
            },
          ],
        },
        {
          name: "loadingFinished",
          description: "Fired when HTTP request has finished loading.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "encodedDataLength",
              description: "Total number of bytes received for this request.",
              type: "number",
            },
            {
              name: "shouldReportCorbBlocking",
              description:
                "Set when 1) response was blocked by Cross-Origin Read Blocking and also\n2) this needs to be reported to the DevTools console.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "requestIntercepted",
          description:
            "Details of an intercepted HTTP request, which must be either allowed, blocked, modified or\nmocked.\nDeprecated, use Fetch.requestPaused instead.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "interceptionId",
              description:
                "Each request the page makes will have a unique id, however if any redirects are encountered\nwhile processing that fetch, they will be reported with the same id as the original fetch.\nLikewise if HTTP authentication is needed then the same fetch id will be used.",
              $ref: "InterceptionId",
            },
            {
              name: "request",
              $ref: "Request",
            },
            {
              name: "frameId",
              description: "The id of the frame that initiated the request.",
              $ref: "Page.FrameId",
            },
            {
              name: "resourceType",
              description: "How the requested resource will be used.",
              $ref: "ResourceType",
            },
            {
              name: "isNavigationRequest",
              description:
                "Whether this is a navigation request, which can abort the navigation completely.",
              type: "boolean",
            },
            {
              name: "isDownload",
              description:
                "Set if the request is a navigation that will result in a download.\nOnly present after response is received from the server (i.e. HeadersReceived stage).",
              optional: true,
              type: "boolean",
            },
            {
              name: "redirectUrl",
              description:
                "Redirect location, only sent if a redirect was intercepted.",
              optional: true,
              type: "string",
            },
            {
              name: "authChallenge",
              description:
                "Details of the Authorization Challenge encountered. If this is set then\ncontinueInterceptedRequest must contain an authChallengeResponse.",
              optional: true,
              $ref: "AuthChallenge",
            },
            {
              name: "responseErrorReason",
              description:
                "Response error if intercepted at response stage or if redirect occurred while intercepting\nrequest.",
              optional: true,
              $ref: "ErrorReason",
            },
            {
              name: "responseStatusCode",
              description:
                "Response code if intercepted at response stage or if redirect occurred while intercepting\nrequest or auth retry occurred.",
              optional: true,
              type: "integer",
            },
            {
              name: "responseHeaders",
              description:
                "Response headers if intercepted at the response stage or if redirect occurred while\nintercepting request or auth retry occurred.",
              optional: true,
              $ref: "Headers",
            },
            {
              name: "requestId",
              description:
                "If the intercepted request had a corresponding requestWillBeSent event fired for it, then\nthis requestId will be the same as the requestId present in the requestWillBeSent event.",
              optional: true,
              $ref: "RequestId",
            },
          ],
        },
        {
          name: "requestServedFromCache",
          description: "Fired if request ended up loading from cache.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
          ],
        },
        {
          name: "requestWillBeSent",
          description: "Fired when page is about to send HTTP request.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "loaderId",
              description:
                "Loader identifier. Empty string if the request is fetched from worker.",
              $ref: "LoaderId",
            },
            {
              name: "documentURL",
              description: "URL of the document this request is loaded for.",
              type: "string",
            },
            {
              name: "request",
              description: "Request data.",
              $ref: "Request",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "wallTime",
              description: "Timestamp.",
              $ref: "TimeSinceEpoch",
            },
            {
              name: "initiator",
              description: "Request initiator.",
              $ref: "Initiator",
            },
            {
              name: "redirectHasExtraInfo",
              description:
                "In the case that redirectResponse is populated, this flag indicates whether\nrequestWillBeSentExtraInfo and responseReceivedExtraInfo events will be or were emitted\nfor the request which was just redirected.",
              experimental: true,
              type: "boolean",
            },
            {
              name: "redirectResponse",
              description: "Redirect response data.",
              optional: true,
              $ref: "Response",
            },
            {
              name: "type",
              description: "Type of this resource.",
              optional: true,
              $ref: "ResourceType",
            },
            {
              name: "frameId",
              description: "Frame identifier.",
              optional: true,
              $ref: "Page.FrameId",
            },
            {
              name: "hasUserGesture",
              description:
                "Whether the request is initiated by a user gesture. Defaults to false.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "resourceChangedPriority",
          description: "Fired when resource loading priority is changed",
          experimental: true,
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "newPriority",
              description: "New priority",
              $ref: "ResourcePriority",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
          ],
        },
        {
          name: "signedExchangeReceived",
          description:
            "Fired when a signed exchange was received over the network",
          experimental: true,
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "info",
              description: "Information about the signed exchange response.",
              $ref: "SignedExchangeInfo",
            },
          ],
        },
        {
          name: "responseReceived",
          description: "Fired when HTTP response is available.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "loaderId",
              description:
                "Loader identifier. Empty string if the request is fetched from worker.",
              $ref: "LoaderId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "type",
              description: "Resource type.",
              $ref: "ResourceType",
            },
            {
              name: "response",
              description: "Response data.",
              $ref: "Response",
            },
            {
              name: "hasExtraInfo",
              description:
                "Indicates whether requestWillBeSentExtraInfo and responseReceivedExtraInfo events will be\nor were emitted for this request.",
              experimental: true,
              type: "boolean",
            },
            {
              name: "frameId",
              description: "Frame identifier.",
              optional: true,
              $ref: "Page.FrameId",
            },
          ],
        },
        {
          name: "webSocketClosed",
          description: "Fired when WebSocket is closed.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
          ],
        },
        {
          name: "webSocketCreated",
          description: "Fired upon WebSocket creation.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "url",
              description: "WebSocket request URL.",
              type: "string",
            },
            {
              name: "initiator",
              description: "Request initiator.",
              optional: true,
              $ref: "Initiator",
            },
          ],
        },
        {
          name: "webSocketFrameError",
          description: "Fired when WebSocket message error occurs.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "errorMessage",
              description: "WebSocket error message.",
              type: "string",
            },
          ],
        },
        {
          name: "webSocketFrameReceived",
          description: "Fired when WebSocket message is received.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "response",
              description: "WebSocket response data.",
              $ref: "WebSocketFrame",
            },
          ],
        },
        {
          name: "webSocketFrameSent",
          description: "Fired when WebSocket message is sent.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "response",
              description: "WebSocket response data.",
              $ref: "WebSocketFrame",
            },
          ],
        },
        {
          name: "webSocketHandshakeResponseReceived",
          description:
            "Fired when WebSocket handshake response becomes available.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "response",
              description: "WebSocket response data.",
              $ref: "WebSocketResponse",
            },
          ],
        },
        {
          name: "webSocketWillSendHandshakeRequest",
          description: "Fired when WebSocket is about to initiate handshake.",
          parameters: [
            {
              name: "requestId",
              description: "Request identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "wallTime",
              description: "UTC Timestamp.",
              $ref: "TimeSinceEpoch",
            },
            {
              name: "request",
              description: "WebSocket request data.",
              $ref: "WebSocketRequest",
            },
          ],
        },
        {
          name: "webTransportCreated",
          description: "Fired upon WebTransport creation.",
          parameters: [
            {
              name: "transportId",
              description: "WebTransport identifier.",
              $ref: "RequestId",
            },
            {
              name: "url",
              description: "WebTransport request URL.",
              type: "string",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
            {
              name: "initiator",
              description: "Request initiator.",
              optional: true,
              $ref: "Initiator",
            },
          ],
        },
        {
          name: "webTransportConnectionEstablished",
          description: "Fired when WebTransport handshake is finished.",
          parameters: [
            {
              name: "transportId",
              description: "WebTransport identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
          ],
        },
        {
          name: "webTransportClosed",
          description: "Fired when WebTransport is disposed.",
          parameters: [
            {
              name: "transportId",
              description: "WebTransport identifier.",
              $ref: "RequestId",
            },
            {
              name: "timestamp",
              description: "Timestamp.",
              $ref: "MonotonicTime",
            },
          ],
        },
        {
          name: "requestWillBeSentExtraInfo",
          description:
            "Fired when additional information about a requestWillBeSent event is available from the\nnetwork stack. Not every requestWillBeSent event will have an additional\nrequestWillBeSentExtraInfo fired for it, and there is no guarantee whether requestWillBeSent\nor requestWillBeSentExtraInfo will be fired first for the same request.",
          experimental: true,
          parameters: [
            {
              name: "requestId",
              description:
                "Request identifier. Used to match this information to an existing requestWillBeSent event.",
              $ref: "RequestId",
            },
            {
              name: "associatedCookies",
              description:
                "A list of cookies potentially associated to the requested URL. This includes both cookies sent with\nthe request and the ones not sent; the latter are distinguished by having blockedReason field set.",
              type: "array",
              items: {
                $ref: "BlockedCookieWithReason",
              },
            },
            {
              name: "headers",
              description:
                "Raw request headers as they will be sent over the wire.",
              $ref: "Headers",
            },
            {
              name: "connectTiming",
              description: "Connection timing information for the request.",
              experimental: true,
              $ref: "ConnectTiming",
            },
            {
              name: "clientSecurityState",
              description: "The client security state set for the request.",
              optional: true,
              $ref: "ClientSecurityState",
            },
            {
              name: "siteHasCookieInOtherPartition",
              description:
                "Whether the site has partitioned cookies stored in a partition different than the current one.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "responseReceivedExtraInfo",
          description:
            "Fired when additional information about a responseReceived event is available from the network\nstack. Not every responseReceived event will have an additional responseReceivedExtraInfo for\nit, and responseReceivedExtraInfo may be fired before or after responseReceived.",
          experimental: true,
          parameters: [
            {
              name: "requestId",
              description:
                "Request identifier. Used to match this information to another responseReceived event.",
              $ref: "RequestId",
            },
            {
              name: "blockedCookies",
              description:
                "A list of cookies which were not stored from the response along with the corresponding\nreasons for blocking. The cookies here may not be valid due to syntax errors, which\nare represented by the invalid cookie line string instead of a proper cookie.",
              type: "array",
              items: {
                $ref: "BlockedSetCookieWithReason",
              },
            },
            {
              name: "headers",
              description:
                "Raw response headers as they were received over the wire.",
              $ref: "Headers",
            },
            {
              name: "resourceIPAddressSpace",
              description:
                "The IP address space of the resource. The address space can only be determined once the transport\nestablished the connection, so we can't send it in `requestWillBeSentExtraInfo`.",
              $ref: "IPAddressSpace",
            },
            {
              name: "statusCode",
              description:
                "The status code of the response. This is useful in cases the request failed and no responseReceived\nevent is triggered, which is the case for, e.g., CORS errors. This is also the correct status code\nfor cached requests, where the status in responseReceived is a 200 and this will be 304.",
              type: "integer",
            },
            {
              name: "headersText",
              description:
                "Raw response header text as it was received over the wire. The raw text may not always be\navailable, such as in the case of HTTP/2 or QUIC.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "trustTokenOperationDone",
          description:
            "Fired exactly once for each Trust Token operation. Depending on\nthe type of the operation and whether the operation succeeded or\nfailed, the event is fired before the corresponding request was sent\nor after the response was received.",
          experimental: true,
          parameters: [
            {
              name: "status",
              description:
                "Detailed success or error status of the operation.\n'AlreadyExists' also signifies a successful operation, as the result\nof the operation already exists und thus, the operation was abort\npreemptively (e.g. a cache hit).",
              type: "string",
              enum: [
                "Ok",
                "InvalidArgument",
                "FailedPrecondition",
                "ResourceExhausted",
                "AlreadyExists",
                "Unavailable",
                "Unauthorized",
                "BadResponse",
                "InternalError",
                "UnknownError",
                "FulfilledLocally",
              ],
            },
            {
              name: "type",
              $ref: "TrustTokenOperationType",
            },
            {
              name: "requestId",
              $ref: "RequestId",
            },
            {
              name: "topLevelOrigin",
              description:
                "Top level origin. The context in which the operation was attempted.",
              optional: true,
              type: "string",
            },
            {
              name: "issuerOrigin",
              description:
                'Origin of the issuer in case of a "Issuance" or "Redemption" operation.',
              optional: true,
              type: "string",
            },
            {
              name: "issuedTokenCount",
              description:
                'The number of obtained Trust Tokens on a successful "Issuance" operation.',
              optional: true,
              type: "integer",
            },
          ],
        },
        {
          name: "subresourceWebBundleMetadataReceived",
          description:
            "Fired once when parsing the .wbn file has succeeded.\nThe event contains the information about the web bundle contents.",
          experimental: true,
          parameters: [
            {
              name: "requestId",
              description:
                "Request identifier. Used to match this information to another event.",
              $ref: "RequestId",
            },
            {
              name: "urls",
              description:
                "A list of URLs of resources in the subresource Web Bundle.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "subresourceWebBundleMetadataError",
          description: "Fired once when parsing the .wbn file has failed.",
          experimental: true,
          parameters: [
            {
              name: "requestId",
              description:
                "Request identifier. Used to match this information to another event.",
              $ref: "RequestId",
            },
            {
              name: "errorMessage",
              description: "Error message",
              type: "string",
            },
          ],
        },
        {
          name: "subresourceWebBundleInnerResponseParsed",
          description:
            "Fired when handling requests for resources within a .wbn file.\nNote: this will only be fired for resources that are requested by the webpage.",
          experimental: true,
          parameters: [
            {
              name: "innerRequestId",
              description: "Request identifier of the subresource request",
              $ref: "RequestId",
            },
            {
              name: "innerRequestURL",
              description: "URL of the subresource resource.",
              type: "string",
            },
            {
              name: "bundleRequestId",
              description:
                "Bundle request identifier. Used to match this information to another event.\nThis made be absent in case when the instrumentation was enabled only\nafter webbundle was parsed.",
              optional: true,
              $ref: "RequestId",
            },
          ],
        },
        {
          name: "subresourceWebBundleInnerResponseError",
          description:
            "Fired when request for resources within a .wbn file failed.",
          experimental: true,
          parameters: [
            {
              name: "innerRequestId",
              description: "Request identifier of the subresource request",
              $ref: "RequestId",
            },
            {
              name: "innerRequestURL",
              description: "URL of the subresource resource.",
              type: "string",
            },
            {
              name: "errorMessage",
              description: "Error message",
              type: "string",
            },
            {
              name: "bundleRequestId",
              description:
                "Bundle request identifier. Used to match this information to another event.\nThis made be absent in case when the instrumentation was enabled only\nafter webbundle was parsed.",
              optional: true,
              $ref: "RequestId",
            },
          ],
        },
        {
          name: "reportingApiReportAdded",
          description:
            "Is sent whenever a new report is added.\nAnd after 'enableReportingApi' for all existing reports.",
          experimental: true,
          parameters: [
            {
              name: "report",
              $ref: "ReportingApiReport",
            },
          ],
        },
        {
          name: "reportingApiReportUpdated",
          experimental: true,
          parameters: [
            {
              name: "report",
              $ref: "ReportingApiReport",
            },
          ],
        },
        {
          name: "reportingApiEndpointsChangedForOrigin",
          experimental: true,
          parameters: [
            {
              name: "origin",
              description:
                "Origin of the document(s) which configured the endpoints.",
              type: "string",
            },
            {
              name: "endpoints",
              type: "array",
              items: {
                $ref: "ReportingApiEndpoint",
              },
            },
          ],
        },
      ],
    },
    {
      domain: "Overlay",
      description:
        "This domain provides various functionality related to drawing atop the inspected page.",
      experimental: true,
      dependencies: ["DOM", "Page", "Runtime"],
      types: [
        {
          id: "SourceOrderConfig",
          description:
            "Configuration data for drawing the source order of an elements children.",
          type: "object",
          properties: [
            {
              name: "parentOutlineColor",
              description: "the color to outline the givent element in.",
              $ref: "DOM.RGBA",
            },
            {
              name: "childOutlineColor",
              description: "the color to outline the child elements in.",
              $ref: "DOM.RGBA",
            },
          ],
        },
        {
          id: "GridHighlightConfig",
          description:
            "Configuration data for the highlighting of Grid elements.",
          type: "object",
          properties: [
            {
              name: "showGridExtensionLines",
              description:
                "Whether the extension lines from grid cells to the rulers should be shown (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "showPositiveLineNumbers",
              description: "Show Positive line number labels (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "showNegativeLineNumbers",
              description: "Show Negative line number labels (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "showAreaNames",
              description: "Show area name labels (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "showLineNames",
              description: "Show line name labels (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "showTrackSizes",
              description: "Show track size labels (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "gridBorderColor",
              description:
                "The grid container border highlight color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "cellBorderColor",
              description:
                "The cell border color (default: transparent). Deprecated, please use rowLineColor and columnLineColor instead.",
              deprecated: true,
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "rowLineColor",
              description: "The row line color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "columnLineColor",
              description: "The column line color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "gridBorderDash",
              description:
                "Whether the grid border is dashed (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "cellBorderDash",
              description:
                "Whether the cell border is dashed (default: false). Deprecated, please us rowLineDash and columnLineDash instead.",
              deprecated: true,
              optional: true,
              type: "boolean",
            },
            {
              name: "rowLineDash",
              description: "Whether row lines are dashed (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "columnLineDash",
              description: "Whether column lines are dashed (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "rowGapColor",
              description:
                "The row gap highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "rowHatchColor",
              description:
                "The row gap hatching fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "columnGapColor",
              description:
                "The column gap highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "columnHatchColor",
              description:
                "The column gap hatching fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "areaBorderColor",
              description:
                "The named grid areas border color (Default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "gridBackgroundColor",
              description:
                "The grid container background color (Default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
          ],
        },
        {
          id: "FlexContainerHighlightConfig",
          description:
            "Configuration data for the highlighting of Flex container elements.",
          type: "object",
          properties: [
            {
              name: "containerBorder",
              description: "The style of the container border",
              optional: true,
              $ref: "LineStyle",
            },
            {
              name: "lineSeparator",
              description: "The style of the separator between lines",
              optional: true,
              $ref: "LineStyle",
            },
            {
              name: "itemSeparator",
              description: "The style of the separator between items",
              optional: true,
              $ref: "LineStyle",
            },
            {
              name: "mainDistributedSpace",
              description:
                "Style of content-distribution space on the main axis (justify-content).",
              optional: true,
              $ref: "BoxStyle",
            },
            {
              name: "crossDistributedSpace",
              description:
                "Style of content-distribution space on the cross axis (align-content).",
              optional: true,
              $ref: "BoxStyle",
            },
            {
              name: "rowGapSpace",
              description:
                "Style of empty space caused by row gaps (gap/row-gap).",
              optional: true,
              $ref: "BoxStyle",
            },
            {
              name: "columnGapSpace",
              description:
                "Style of empty space caused by columns gaps (gap/column-gap).",
              optional: true,
              $ref: "BoxStyle",
            },
            {
              name: "crossAlignment",
              description: "Style of the self-alignment line (align-items).",
              optional: true,
              $ref: "LineStyle",
            },
          ],
        },
        {
          id: "FlexItemHighlightConfig",
          description:
            "Configuration data for the highlighting of Flex item elements.",
          type: "object",
          properties: [
            {
              name: "baseSizeBox",
              description: "Style of the box representing the item's base size",
              optional: true,
              $ref: "BoxStyle",
            },
            {
              name: "baseSizeBorder",
              description:
                "Style of the border around the box representing the item's base size",
              optional: true,
              $ref: "LineStyle",
            },
            {
              name: "flexibilityArrow",
              description:
                "Style of the arrow representing if the item grew or shrank",
              optional: true,
              $ref: "LineStyle",
            },
          ],
        },
        {
          id: "LineStyle",
          description: "Style information for drawing a line.",
          type: "object",
          properties: [
            {
              name: "color",
              description: "The color of the line (default: transparent)",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "pattern",
              description: "The line pattern (default: solid)",
              optional: true,
              type: "string",
              enum: ["dashed", "dotted"],
            },
          ],
        },
        {
          id: "BoxStyle",
          description: "Style information for drawing a box.",
          type: "object",
          properties: [
            {
              name: "fillColor",
              description:
                "The background color for the box (default: transparent)",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "hatchColor",
              description:
                "The hatching color for the box (default: transparent)",
              optional: true,
              $ref: "DOM.RGBA",
            },
          ],
        },
        {
          id: "ContrastAlgorithm",
          type: "string",
          enum: ["aa", "aaa", "apca"],
        },
        {
          id: "HighlightConfig",
          description:
            "Configuration data for the highlighting of page elements.",
          type: "object",
          properties: [
            {
              name: "showInfo",
              description:
                "Whether the node info tooltip should be shown (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "showStyles",
              description:
                "Whether the node styles in the tooltip (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "showRulers",
              description:
                "Whether the rulers should be shown (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "showAccessibilityInfo",
              description:
                "Whether the a11y info should be shown (default: true).",
              optional: true,
              type: "boolean",
            },
            {
              name: "showExtensionLines",
              description:
                "Whether the extension lines from node to the rulers should be shown (default: false).",
              optional: true,
              type: "boolean",
            },
            {
              name: "contentColor",
              description:
                "The content box highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "paddingColor",
              description:
                "The padding highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "borderColor",
              description:
                "The border highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "marginColor",
              description:
                "The margin highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "eventTargetColor",
              description:
                "The event target element highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "shapeColor",
              description:
                "The shape outside fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "shapeMarginColor",
              description:
                "The shape margin fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "cssGridColor",
              description: "The grid layout color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "colorFormat",
              description:
                "The color format used to format color styles (default: hex).",
              optional: true,
              $ref: "ColorFormat",
            },
            {
              name: "gridHighlightConfig",
              description:
                "The grid layout highlight configuration (default: all transparent).",
              optional: true,
              $ref: "GridHighlightConfig",
            },
            {
              name: "flexContainerHighlightConfig",
              description:
                "The flex container highlight configuration (default: all transparent).",
              optional: true,
              $ref: "FlexContainerHighlightConfig",
            },
            {
              name: "flexItemHighlightConfig",
              description:
                "The flex item highlight configuration (default: all transparent).",
              optional: true,
              $ref: "FlexItemHighlightConfig",
            },
            {
              name: "contrastAlgorithm",
              description:
                "The contrast algorithm to use for the contrast ratio (default: aa).",
              optional: true,
              $ref: "ContrastAlgorithm",
            },
            {
              name: "containerQueryContainerHighlightConfig",
              description:
                "The container query container highlight configuration (default: all transparent).",
              optional: true,
              $ref: "ContainerQueryContainerHighlightConfig",
            },
          ],
        },
        {
          id: "ColorFormat",
          type: "string",
          enum: ["rgb", "hsl", "hwb", "hex"],
        },
        {
          id: "GridNodeHighlightConfig",
          description: "Configurations for Persistent Grid Highlight",
          type: "object",
          properties: [
            {
              name: "gridHighlightConfig",
              description: "A descriptor for the highlight appearance.",
              $ref: "GridHighlightConfig",
            },
            {
              name: "nodeId",
              description: "Identifier of the node to highlight.",
              $ref: "DOM.NodeId",
            },
          ],
        },
        {
          id: "FlexNodeHighlightConfig",
          type: "object",
          properties: [
            {
              name: "flexContainerHighlightConfig",
              description:
                "A descriptor for the highlight appearance of flex containers.",
              $ref: "FlexContainerHighlightConfig",
            },
            {
              name: "nodeId",
              description: "Identifier of the node to highlight.",
              $ref: "DOM.NodeId",
            },
          ],
        },
        {
          id: "ScrollSnapContainerHighlightConfig",
          type: "object",
          properties: [
            {
              name: "snapportBorder",
              description:
                "The style of the snapport border (default: transparent)",
              optional: true,
              $ref: "LineStyle",
            },
            {
              name: "snapAreaBorder",
              description:
                "The style of the snap area border (default: transparent)",
              optional: true,
              $ref: "LineStyle",
            },
            {
              name: "scrollMarginColor",
              description:
                "The margin highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "scrollPaddingColor",
              description:
                "The padding highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
          ],
        },
        {
          id: "ScrollSnapHighlightConfig",
          type: "object",
          properties: [
            {
              name: "scrollSnapContainerHighlightConfig",
              description:
                "A descriptor for the highlight appearance of scroll snap containers.",
              $ref: "ScrollSnapContainerHighlightConfig",
            },
            {
              name: "nodeId",
              description: "Identifier of the node to highlight.",
              $ref: "DOM.NodeId",
            },
          ],
        },
        {
          id: "HingeConfig",
          description: "Configuration for dual screen hinge",
          type: "object",
          properties: [
            {
              name: "rect",
              description: "A rectangle represent hinge",
              $ref: "DOM.Rect",
            },
            {
              name: "contentColor",
              description:
                "The content box highlight fill color (default: a dark color).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "outlineColor",
              description:
                "The content box highlight outline color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
          ],
        },
        {
          id: "ContainerQueryHighlightConfig",
          type: "object",
          properties: [
            {
              name: "containerQueryContainerHighlightConfig",
              description:
                "A descriptor for the highlight appearance of container query containers.",
              $ref: "ContainerQueryContainerHighlightConfig",
            },
            {
              name: "nodeId",
              description: "Identifier of the container node to highlight.",
              $ref: "DOM.NodeId",
            },
          ],
        },
        {
          id: "ContainerQueryContainerHighlightConfig",
          type: "object",
          properties: [
            {
              name: "containerBorder",
              description: "The style of the container border.",
              optional: true,
              $ref: "LineStyle",
            },
            {
              name: "descendantBorder",
              description: "The style of the descendants' borders.",
              optional: true,
              $ref: "LineStyle",
            },
          ],
        },
        {
          id: "IsolatedElementHighlightConfig",
          type: "object",
          properties: [
            {
              name: "isolationModeHighlightConfig",
              description:
                "A descriptor for the highlight appearance of an element in isolation mode.",
              $ref: "IsolationModeHighlightConfig",
            },
            {
              name: "nodeId",
              description: "Identifier of the isolated element to highlight.",
              $ref: "DOM.NodeId",
            },
          ],
        },
        {
          id: "IsolationModeHighlightConfig",
          type: "object",
          properties: [
            {
              name: "resizerColor",
              description:
                "The fill color of the resizers (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "resizerHandleColor",
              description:
                "The fill color for resizer handles (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "maskColor",
              description:
                "The fill color for the mask covering non-isolated elements (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
          ],
        },
        {
          id: "InspectMode",
          type: "string",
          enum: [
            "searchForNode",
            "searchForUAShadowDOM",
            "captureAreaScreenshot",
            "showDistances",
            "none",
          ],
        },
      ],
      commands: [
        {
          name: "disable",
          description: "Disables domain notifications.",
        },
        {
          name: "enable",
          description: "Enables domain notifications.",
        },
        {
          name: "getHighlightObjectForTest",
          description: "For testing.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to get highlight object for.",
              $ref: "DOM.NodeId",
            },
            {
              name: "includeDistance",
              description: "Whether to include distance info.",
              optional: true,
              type: "boolean",
            },
            {
              name: "includeStyle",
              description: "Whether to include style info.",
              optional: true,
              type: "boolean",
            },
            {
              name: "colorFormat",
              description:
                "The color format to get config with (default: hex).",
              optional: true,
              $ref: "ColorFormat",
            },
            {
              name: "showAccessibilityInfo",
              description:
                "Whether to show accessibility info (default: true).",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "highlight",
              description: "Highlight data for the node.",
              type: "object",
            },
          ],
        },
        {
          name: "getGridHighlightObjectsForTest",
          description: "For Persistent Grid testing.",
          parameters: [
            {
              name: "nodeIds",
              description: "Ids of the node to get highlight object for.",
              type: "array",
              items: {
                $ref: "DOM.NodeId",
              },
            },
          ],
          returns: [
            {
              name: "highlights",
              description: "Grid Highlight data for the node ids provided.",
              type: "object",
            },
          ],
        },
        {
          name: "getSourceOrderHighlightObjectForTest",
          description: "For Source Order Viewer testing.",
          parameters: [
            {
              name: "nodeId",
              description: "Id of the node to highlight.",
              $ref: "DOM.NodeId",
            },
          ],
          returns: [
            {
              name: "highlight",
              description:
                "Source order highlight data for the node id provided.",
              type: "object",
            },
          ],
        },
        {
          name: "hideHighlight",
          description: "Hides any highlight.",
        },
        {
          name: "highlightFrame",
          description:
            "Highlights owner element of the frame with given id.\nDeprecated: Doesn't work reliablity and cannot be fixed due to process\nseparatation (the owner node might be in a different process). Determine\nthe owner node in the client and use highlightNode.",
          deprecated: true,
          parameters: [
            {
              name: "frameId",
              description: "Identifier of the frame to highlight.",
              $ref: "Page.FrameId",
            },
            {
              name: "contentColor",
              description:
                "The content box highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "contentOutlineColor",
              description:
                "The content box highlight outline color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
          ],
        },
        {
          name: "highlightNode",
          description:
            "Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or\nobjectId must be specified.",
          parameters: [
            {
              name: "highlightConfig",
              description: "A descriptor for the highlight appearance.",
              $ref: "HighlightConfig",
            },
            {
              name: "nodeId",
              description: "Identifier of the node to highlight.",
              optional: true,
              $ref: "DOM.NodeId",
            },
            {
              name: "backendNodeId",
              description: "Identifier of the backend node to highlight.",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "objectId",
              description:
                "JavaScript object id of the node to be highlighted.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
            {
              name: "selector",
              description: "Selectors to highlight relevant nodes.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "highlightQuad",
          description:
            "Highlights given quad. Coordinates are absolute with respect to the main frame viewport.",
          parameters: [
            {
              name: "quad",
              description: "Quad to highlight",
              $ref: "DOM.Quad",
            },
            {
              name: "color",
              description: "The highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "outlineColor",
              description:
                "The highlight outline color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
          ],
        },
        {
          name: "highlightRect",
          description:
            "Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.",
          parameters: [
            {
              name: "x",
              description: "X coordinate",
              type: "integer",
            },
            {
              name: "y",
              description: "Y coordinate",
              type: "integer",
            },
            {
              name: "width",
              description: "Rectangle width",
              type: "integer",
            },
            {
              name: "height",
              description: "Rectangle height",
              type: "integer",
            },
            {
              name: "color",
              description: "The highlight fill color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
            {
              name: "outlineColor",
              description:
                "The highlight outline color (default: transparent).",
              optional: true,
              $ref: "DOM.RGBA",
            },
          ],
        },
        {
          name: "highlightSourceOrder",
          description:
            "Highlights the source order of the children of the DOM node with given id or with the given\nJavaScript object wrapper. Either nodeId or objectId must be specified.",
          parameters: [
            {
              name: "sourceOrderConfig",
              description:
                "A descriptor for the appearance of the overlay drawing.",
              $ref: "SourceOrderConfig",
            },
            {
              name: "nodeId",
              description: "Identifier of the node to highlight.",
              optional: true,
              $ref: "DOM.NodeId",
            },
            {
              name: "backendNodeId",
              description: "Identifier of the backend node to highlight.",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
            {
              name: "objectId",
              description:
                "JavaScript object id of the node to be highlighted.",
              optional: true,
              $ref: "Runtime.RemoteObjectId",
            },
          ],
        },
        {
          name: "setInspectMode",
          description:
            "Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted.\nBackend then generates 'inspectNodeRequested' event upon element selection.",
          parameters: [
            {
              name: "mode",
              description: "Set an inspection mode.",
              $ref: "InspectMode",
            },
            {
              name: "highlightConfig",
              description:
                "A descriptor for the highlight appearance of hovered-over nodes. May be omitted if `enabled\n== false`.",
              optional: true,
              $ref: "HighlightConfig",
            },
          ],
        },
        {
          name: "setShowAdHighlights",
          description:
            "Highlights owner element of all frames detected to be ads.",
          parameters: [
            {
              name: "show",
              description: "True for showing ad highlights",
              type: "boolean",
            },
          ],
        },
        {
          name: "setPausedInDebuggerMessage",
          parameters: [
            {
              name: "message",
              description:
                "The message to display, also triggers resume and step over controls.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "setShowDebugBorders",
          description: "Requests that backend shows debug borders on layers",
          parameters: [
            {
              name: "show",
              description: "True for showing debug borders",
              type: "boolean",
            },
          ],
        },
        {
          name: "setShowFPSCounter",
          description: "Requests that backend shows the FPS counter",
          parameters: [
            {
              name: "show",
              description: "True for showing the FPS counter",
              type: "boolean",
            },
          ],
        },
        {
          name: "setShowGridOverlays",
          description: "Highlight multiple elements with the CSS Grid overlay.",
          parameters: [
            {
              name: "gridNodeHighlightConfigs",
              description:
                "An array of node identifiers and descriptors for the highlight appearance.",
              type: "array",
              items: {
                $ref: "GridNodeHighlightConfig",
              },
            },
          ],
        },
        {
          name: "setShowFlexOverlays",
          parameters: [
            {
              name: "flexNodeHighlightConfigs",
              description:
                "An array of node identifiers and descriptors for the highlight appearance.",
              type: "array",
              items: {
                $ref: "FlexNodeHighlightConfig",
              },
            },
          ],
        },
        {
          name: "setShowScrollSnapOverlays",
          parameters: [
            {
              name: "scrollSnapHighlightConfigs",
              description:
                "An array of node identifiers and descriptors for the highlight appearance.",
              type: "array",
              items: {
                $ref: "ScrollSnapHighlightConfig",
              },
            },
          ],
        },
        {
          name: "setShowContainerQueryOverlays",
          parameters: [
            {
              name: "containerQueryHighlightConfigs",
              description:
                "An array of node identifiers and descriptors for the highlight appearance.",
              type: "array",
              items: {
                $ref: "ContainerQueryHighlightConfig",
              },
            },
          ],
        },
        {
          name: "setShowPaintRects",
          description: "Requests that backend shows paint rectangles",
          parameters: [
            {
              name: "result",
              description: "True for showing paint rectangles",
              type: "boolean",
            },
          ],
        },
        {
          name: "setShowLayoutShiftRegions",
          description: "Requests that backend shows layout shift regions",
          parameters: [
            {
              name: "result",
              description: "True for showing layout shift regions",
              type: "boolean",
            },
          ],
        },
        {
          name: "setShowScrollBottleneckRects",
          description: "Requests that backend shows scroll bottleneck rects",
          parameters: [
            {
              name: "show",
              description: "True for showing scroll bottleneck rects",
              type: "boolean",
            },
          ],
        },
        {
          name: "setShowHitTestBorders",
          description: "Deprecated, no longer has any effect.",
          deprecated: true,
          parameters: [
            {
              name: "show",
              description: "True for showing hit-test borders",
              type: "boolean",
            },
          ],
        },
        {
          name: "setShowWebVitals",
          description:
            "Request that backend shows an overlay with web vital metrics.",
          parameters: [
            {
              name: "show",
              type: "boolean",
            },
          ],
        },
        {
          name: "setShowViewportSizeOnResize",
          description: "Paints viewport size upon main frame resize.",
          parameters: [
            {
              name: "show",
              description: "Whether to paint size or not.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setShowHinge",
          description: "Add a dual screen device hinge",
          parameters: [
            {
              name: "hingeConfig",
              description: "hinge data, null means hideHinge",
              optional: true,
              $ref: "HingeConfig",
            },
          ],
        },
        {
          name: "setShowIsolatedElements",
          description: "Show elements in isolation mode with overlays.",
          parameters: [
            {
              name: "isolatedElementHighlightConfigs",
              description:
                "An array of node identifiers and descriptors for the highlight appearance.",
              type: "array",
              items: {
                $ref: "IsolatedElementHighlightConfig",
              },
            },
          ],
        },
      ],
      events: [
        {
          name: "inspectNodeRequested",
          description:
            "Fired when the node should be inspected. This happens after call to `setInspectMode` or when\nuser manually inspects an element.",
          parameters: [
            {
              name: "backendNodeId",
              description: "Id of the node to inspect.",
              $ref: "DOM.BackendNodeId",
            },
          ],
        },
        {
          name: "nodeHighlightRequested",
          description:
            "Fired when the node should be highlighted. This happens after call to `setInspectMode`.",
          parameters: [
            {
              name: "nodeId",
              $ref: "DOM.NodeId",
            },
          ],
        },
        {
          name: "screenshotRequested",
          description:
            "Fired when user asks to capture screenshot of some area on the page.",
          parameters: [
            {
              name: "viewport",
              description:
                "Viewport to capture, in device independent pixels (dip).",
              $ref: "Page.Viewport",
            },
          ],
        },
        {
          name: "inspectModeCanceled",
          description: "Fired when user cancels the inspect mode.",
        },
      ],
    },
    {
      domain: "Page",
      description:
        "Actions and events related to the inspected page belong to the page domain.",
      dependencies: ["Debugger", "DOM", "IO", "Network", "Runtime"],
      types: [
        {
          id: "FrameId",
          description: "Unique frame identifier.",
          type: "string",
        },
        {
          id: "AdFrameType",
          description:
            "Indicates whether a frame has been identified as an ad.",
          experimental: true,
          type: "string",
          enum: ["none", "child", "root"],
        },
        {
          id: "AdFrameExplanation",
          experimental: true,
          type: "string",
          enum: ["ParentIsAd", "CreatedByAdScript", "MatchedBlockingRule"],
        },
        {
          id: "AdFrameStatus",
          description:
            "Indicates whether a frame has been identified as an ad and why.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "adFrameType",
              $ref: "AdFrameType",
            },
            {
              name: "explanations",
              optional: true,
              type: "array",
              items: {
                $ref: "AdFrameExplanation",
              },
            },
          ],
        },
        {
          id: "AdScriptId",
          description:
            "Identifies the bottom-most script which caused the frame to be labelled\nas an ad.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "scriptId",
              description:
                "Script Id of the bottom-most script which caused the frame to be labelled\nas an ad.",
              $ref: "Runtime.ScriptId",
            },
            {
              name: "debuggerId",
              description: "Id of adScriptId's debugger.",
              $ref: "Runtime.UniqueDebuggerId",
            },
          ],
        },
        {
          id: "SecureContextType",
          description:
            "Indicates whether the frame is a secure context and why it is the case.",
          experimental: true,
          type: "string",
          enum: [
            "Secure",
            "SecureLocalhost",
            "InsecureScheme",
            "InsecureAncestor",
          ],
        },
        {
          id: "CrossOriginIsolatedContextType",
          description:
            "Indicates whether the frame is cross-origin isolated and why it is the case.",
          experimental: true,
          type: "string",
          enum: ["Isolated", "NotIsolated", "NotIsolatedFeatureDisabled"],
        },
        {
          id: "GatedAPIFeatures",
          experimental: true,
          type: "string",
          enum: [
            "SharedArrayBuffers",
            "SharedArrayBuffersTransferAllowed",
            "PerformanceMeasureMemory",
            "PerformanceProfile",
          ],
        },
        {
          id: "PermissionsPolicyFeature",
          description:
            "All Permissions Policy features. This enum should match the one defined\nin third_party/blink/renderer/core/permissions_policy/permissions_policy_features.json5.",
          experimental: true,
          type: "string",
          enum: [
            "accelerometer",
            "ambient-light-sensor",
            "attribution-reporting",
            "autoplay",
            "bluetooth",
            "browsing-topics",
            "camera",
            "ch-dpr",
            "ch-device-memory",
            "ch-downlink",
            "ch-ect",
            "ch-prefers-color-scheme",
            "ch-prefers-reduced-motion",
            "ch-rtt",
            "ch-save-data",
            "ch-ua",
            "ch-ua-arch",
            "ch-ua-bitness",
            "ch-ua-platform",
            "ch-ua-model",
            "ch-ua-mobile",
            "ch-ua-full",
            "ch-ua-full-version",
            "ch-ua-full-version-list",
            "ch-ua-platform-version",
            "ch-ua-reduced",
            "ch-ua-wow64",
            "ch-viewport-height",
            "ch-viewport-width",
            "ch-width",
            "clipboard-read",
            "clipboard-write",
            "compute-pressure",
            "cross-origin-isolated",
            "direct-sockets",
            "display-capture",
            "document-domain",
            "encrypted-media",
            "execution-while-out-of-viewport",
            "execution-while-not-rendered",
            "focus-without-user-activation",
            "fullscreen",
            "frobulate",
            "gamepad",
            "geolocation",
            "gyroscope",
            "hid",
            "identity-credentials-get",
            "idle-detection",
            "interest-cohort",
            "join-ad-interest-group",
            "keyboard-map",
            "local-fonts",
            "magnetometer",
            "microphone",
            "midi",
            "otp-credentials",
            "payment",
            "picture-in-picture",
            "publickey-credentials-get",
            "run-ad-auction",
            "screen-wake-lock",
            "serial",
            "shared-autofill",
            "shared-storage",
            "smart-card",
            "storage-access",
            "sync-xhr",
            "trust-token-redemption",
            "unload",
            "usb",
            "vertical-scroll",
            "web-share",
            "window-placement",
            "xr-spatial-tracking",
          ],
        },
        {
          id: "PermissionsPolicyBlockReason",
          description:
            "Reason for a permissions policy feature to be disabled.",
          experimental: true,
          type: "string",
          enum: [
            "Header",
            "IframeAttribute",
            "InFencedFrameTree",
            "InIsolatedApp",
          ],
        },
        {
          id: "PermissionsPolicyBlockLocator",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "frameId",
              $ref: "FrameId",
            },
            {
              name: "blockReason",
              $ref: "PermissionsPolicyBlockReason",
            },
          ],
        },
        {
          id: "PermissionsPolicyFeatureState",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "feature",
              $ref: "PermissionsPolicyFeature",
            },
            {
              name: "allowed",
              type: "boolean",
            },
            {
              name: "locator",
              optional: true,
              $ref: "PermissionsPolicyBlockLocator",
            },
          ],
        },
        {
          id: "OriginTrialTokenStatus",
          description:
            "Origin Trial(https://www.chromium.org/blink/origin-trials) support.\nStatus for an Origin Trial token.",
          experimental: true,
          type: "string",
          enum: [
            "Success",
            "NotSupported",
            "Insecure",
            "Expired",
            "WrongOrigin",
            "InvalidSignature",
            "Malformed",
            "WrongVersion",
            "FeatureDisabled",
            "TokenDisabled",
            "FeatureDisabledForUser",
            "UnknownTrial",
          ],
        },
        {
          id: "OriginTrialStatus",
          description: "Status for an Origin Trial.",
          experimental: true,
          type: "string",
          enum: [
            "Enabled",
            "ValidTokenNotProvided",
            "OSNotSupported",
            "TrialNotAllowed",
          ],
        },
        {
          id: "OriginTrialUsageRestriction",
          experimental: true,
          type: "string",
          enum: ["None", "Subset"],
        },
        {
          id: "OriginTrialToken",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "origin",
              type: "string",
            },
            {
              name: "matchSubDomains",
              type: "boolean",
            },
            {
              name: "trialName",
              type: "string",
            },
            {
              name: "expiryTime",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "isThirdParty",
              type: "boolean",
            },
            {
              name: "usageRestriction",
              $ref: "OriginTrialUsageRestriction",
            },
          ],
        },
        {
          id: "OriginTrialTokenWithStatus",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "rawTokenText",
              type: "string",
            },
            {
              name: "parsedToken",
              description:
                "`parsedToken` is present only when the token is extractable and\nparsable.",
              optional: true,
              $ref: "OriginTrialToken",
            },
            {
              name: "status",
              $ref: "OriginTrialTokenStatus",
            },
          ],
        },
        {
          id: "OriginTrial",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "trialName",
              type: "string",
            },
            {
              name: "status",
              $ref: "OriginTrialStatus",
            },
            {
              name: "tokensWithStatus",
              type: "array",
              items: {
                $ref: "OriginTrialTokenWithStatus",
              },
            },
          ],
        },
        {
          id: "Frame",
          description: "Information about the Frame on the page.",
          type: "object",
          properties: [
            {
              name: "id",
              description: "Frame unique identifier.",
              $ref: "FrameId",
            },
            {
              name: "parentId",
              description: "Parent frame identifier.",
              optional: true,
              $ref: "FrameId",
            },
            {
              name: "loaderId",
              description:
                "Identifier of the loader associated with this frame.",
              $ref: "Network.LoaderId",
            },
            {
              name: "name",
              description: "Frame's name as specified in the tag.",
              optional: true,
              type: "string",
            },
            {
              name: "url",
              description: "Frame document's URL without fragment.",
              type: "string",
            },
            {
              name: "urlFragment",
              description: "Frame document's URL fragment including the '#'.",
              experimental: true,
              optional: true,
              type: "string",
            },
            {
              name: "domainAndRegistry",
              description:
                'Frame document\'s registered domain, taking the public suffixes list into account.\nExtracted from the Frame\'s url.\nExample URLs: http://www.google.com/file.html -> "google.com"\n              http://a.b.co.uk/file.html      -> "b.co.uk"',
              experimental: true,
              type: "string",
            },
            {
              name: "securityOrigin",
              description: "Frame document's security origin.",
              type: "string",
            },
            {
              name: "mimeType",
              description:
                "Frame document's mimeType as determined by the browser.",
              type: "string",
            },
            {
              name: "unreachableUrl",
              description:
                "If the frame failed to load, this contains the URL that could not be loaded. Note that unlike url above, this URL may contain a fragment.",
              experimental: true,
              optional: true,
              type: "string",
            },
            {
              name: "adFrameStatus",
              description:
                "Indicates whether this frame was tagged as an ad and why.",
              experimental: true,
              optional: true,
              $ref: "AdFrameStatus",
            },
            {
              name: "secureContextType",
              description:
                "Indicates whether the main document is a secure context and explains why that is the case.",
              experimental: true,
              $ref: "SecureContextType",
            },
            {
              name: "crossOriginIsolatedContextType",
              description:
                "Indicates whether this is a cross origin isolated context.",
              experimental: true,
              $ref: "CrossOriginIsolatedContextType",
            },
            {
              name: "gatedAPIFeatures",
              description:
                "Indicated which gated APIs / features are available.",
              experimental: true,
              type: "array",
              items: {
                $ref: "GatedAPIFeatures",
              },
            },
          ],
        },
        {
          id: "FrameResource",
          description: "Information about the Resource on the page.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "url",
              description: "Resource URL.",
              type: "string",
            },
            {
              name: "type",
              description: "Type of this resource.",
              $ref: "Network.ResourceType",
            },
            {
              name: "mimeType",
              description: "Resource mimeType as determined by the browser.",
              type: "string",
            },
            {
              name: "lastModified",
              description: "last-modified timestamp as reported by server.",
              optional: true,
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "contentSize",
              description: "Resource content size.",
              optional: true,
              type: "number",
            },
            {
              name: "failed",
              description: "True if the resource failed to load.",
              optional: true,
              type: "boolean",
            },
            {
              name: "canceled",
              description: "True if the resource was canceled during loading.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          id: "FrameResourceTree",
          description:
            "Information about the Frame hierarchy along with their cached resources.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "frame",
              description: "Frame information for this tree item.",
              $ref: "Frame",
            },
            {
              name: "childFrames",
              description: "Child frames.",
              optional: true,
              type: "array",
              items: {
                $ref: "FrameResourceTree",
              },
            },
            {
              name: "resources",
              description: "Information about frame resources.",
              type: "array",
              items: {
                $ref: "FrameResource",
              },
            },
          ],
        },
        {
          id: "FrameTree",
          description: "Information about the Frame hierarchy.",
          type: "object",
          properties: [
            {
              name: "frame",
              description: "Frame information for this tree item.",
              $ref: "Frame",
            },
            {
              name: "childFrames",
              description: "Child frames.",
              optional: true,
              type: "array",
              items: {
                $ref: "FrameTree",
              },
            },
          ],
        },
        {
          id: "ScriptIdentifier",
          description: "Unique script identifier.",
          type: "string",
        },
        {
          id: "TransitionType",
          description: "Transition type.",
          type: "string",
          enum: [
            "link",
            "typed",
            "address_bar",
            "auto_bookmark",
            "auto_subframe",
            "manual_subframe",
            "generated",
            "auto_toplevel",
            "form_submit",
            "reload",
            "keyword",
            "keyword_generated",
            "other",
          ],
        },
        {
          id: "NavigationEntry",
          description: "Navigation history entry.",
          type: "object",
          properties: [
            {
              name: "id",
              description: "Unique id of the navigation history entry.",
              type: "integer",
            },
            {
              name: "url",
              description: "URL of the navigation history entry.",
              type: "string",
            },
            {
              name: "userTypedURL",
              description: "URL that the user typed in the url bar.",
              type: "string",
            },
            {
              name: "title",
              description: "Title of the navigation history entry.",
              type: "string",
            },
            {
              name: "transitionType",
              description: "Transition type.",
              $ref: "TransitionType",
            },
          ],
        },
        {
          id: "ScreencastFrameMetadata",
          description: "Screencast frame metadata.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "offsetTop",
              description: "Top offset in DIP.",
              type: "number",
            },
            {
              name: "pageScaleFactor",
              description: "Page scale factor.",
              type: "number",
            },
            {
              name: "deviceWidth",
              description: "Device screen width in DIP.",
              type: "number",
            },
            {
              name: "deviceHeight",
              description: "Device screen height in DIP.",
              type: "number",
            },
            {
              name: "scrollOffsetX",
              description: "Position of horizontal scroll in CSS pixels.",
              type: "number",
            },
            {
              name: "scrollOffsetY",
              description: "Position of vertical scroll in CSS pixels.",
              type: "number",
            },
            {
              name: "timestamp",
              description: "Frame swap timestamp.",
              optional: true,
              $ref: "Network.TimeSinceEpoch",
            },
          ],
        },
        {
          id: "DialogType",
          description: "Javascript dialog type.",
          type: "string",
          enum: ["alert", "confirm", "prompt", "beforeunload"],
        },
        {
          id: "AppManifestError",
          description: "Error while paring app manifest.",
          type: "object",
          properties: [
            {
              name: "message",
              description: "Error message.",
              type: "string",
            },
            {
              name: "critical",
              description:
                "If criticial, this is a non-recoverable parse error.",
              type: "integer",
            },
            {
              name: "line",
              description: "Error line.",
              type: "integer",
            },
            {
              name: "column",
              description: "Error column.",
              type: "integer",
            },
          ],
        },
        {
          id: "AppManifestParsedProperties",
          description: "Parsed app manifest properties.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "scope",
              description: "Computed scope value",
              type: "string",
            },
          ],
        },
        {
          id: "LayoutViewport",
          description: "Layout viewport position and dimensions.",
          type: "object",
          properties: [
            {
              name: "pageX",
              description:
                "Horizontal offset relative to the document (CSS pixels).",
              type: "integer",
            },
            {
              name: "pageY",
              description:
                "Vertical offset relative to the document (CSS pixels).",
              type: "integer",
            },
            {
              name: "clientWidth",
              description: "Width (CSS pixels), excludes scrollbar if present.",
              type: "integer",
            },
            {
              name: "clientHeight",
              description:
                "Height (CSS pixels), excludes scrollbar if present.",
              type: "integer",
            },
          ],
        },
        {
          id: "VisualViewport",
          description: "Visual viewport position, dimensions, and scale.",
          type: "object",
          properties: [
            {
              name: "offsetX",
              description:
                "Horizontal offset relative to the layout viewport (CSS pixels).",
              type: "number",
            },
            {
              name: "offsetY",
              description:
                "Vertical offset relative to the layout viewport (CSS pixels).",
              type: "number",
            },
            {
              name: "pageX",
              description:
                "Horizontal offset relative to the document (CSS pixels).",
              type: "number",
            },
            {
              name: "pageY",
              description:
                "Vertical offset relative to the document (CSS pixels).",
              type: "number",
            },
            {
              name: "clientWidth",
              description: "Width (CSS pixels), excludes scrollbar if present.",
              type: "number",
            },
            {
              name: "clientHeight",
              description:
                "Height (CSS pixels), excludes scrollbar if present.",
              type: "number",
            },
            {
              name: "scale",
              description:
                "Scale relative to the ideal viewport (size at width=device-width).",
              type: "number",
            },
            {
              name: "zoom",
              description:
                "Page zoom factor (CSS to device independent pixels ratio).",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          id: "Viewport",
          description: "Viewport for capturing screenshot.",
          type: "object",
          properties: [
            {
              name: "x",
              description: "X offset in device independent pixels (dip).",
              type: "number",
            },
            {
              name: "y",
              description: "Y offset in device independent pixels (dip).",
              type: "number",
            },
            {
              name: "width",
              description:
                "Rectangle width in device independent pixels (dip).",
              type: "number",
            },
            {
              name: "height",
              description:
                "Rectangle height in device independent pixels (dip).",
              type: "number",
            },
            {
              name: "scale",
              description: "Page scale factor.",
              type: "number",
            },
          ],
        },
        {
          id: "FontFamilies",
          description: "Generic font families collection.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "standard",
              description: "The standard font-family.",
              optional: true,
              type: "string",
            },
            {
              name: "fixed",
              description: "The fixed font-family.",
              optional: true,
              type: "string",
            },
            {
              name: "serif",
              description: "The serif font-family.",
              optional: true,
              type: "string",
            },
            {
              name: "sansSerif",
              description: "The sansSerif font-family.",
              optional: true,
              type: "string",
            },
            {
              name: "cursive",
              description: "The cursive font-family.",
              optional: true,
              type: "string",
            },
            {
              name: "fantasy",
              description: "The fantasy font-family.",
              optional: true,
              type: "string",
            },
            {
              name: "math",
              description: "The math font-family.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "ScriptFontFamilies",
          description: "Font families collection for a script.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "script",
              description:
                "Name of the script which these font families are defined for.",
              type: "string",
            },
            {
              name: "fontFamilies",
              description: "Generic font families collection for the script.",
              $ref: "FontFamilies",
            },
          ],
        },
        {
          id: "FontSizes",
          description: "Default font sizes.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "standard",
              description: "Default standard font size.",
              optional: true,
              type: "integer",
            },
            {
              name: "fixed",
              description: "Default fixed font size.",
              optional: true,
              type: "integer",
            },
          ],
        },
        {
          id: "ClientNavigationReason",
          experimental: true,
          type: "string",
          enum: [
            "formSubmissionGet",
            "formSubmissionPost",
            "httpHeaderRefresh",
            "scriptInitiated",
            "metaTagRefresh",
            "pageBlockInterstitial",
            "reload",
            "anchorClick",
          ],
        },
        {
          id: "ClientNavigationDisposition",
          experimental: true,
          type: "string",
          enum: ["currentTab", "newTab", "newWindow", "download"],
        },
        {
          id: "InstallabilityErrorArgument",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "name",
              description:
                "Argument name (e.g. name:'minimum-icon-size-in-pixels').",
              type: "string",
            },
            {
              name: "value",
              description: "Argument value (e.g. value:'64').",
              type: "string",
            },
          ],
        },
        {
          id: "InstallabilityError",
          description: "The installability error",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "errorId",
              description:
                "The error id (e.g. 'manifest-missing-suitable-icon').",
              type: "string",
            },
            {
              name: "errorArguments",
              description:
                "The list of error arguments (e.g. {name:'minimum-icon-size-in-pixels', value:'64'}).",
              type: "array",
              items: {
                $ref: "InstallabilityErrorArgument",
              },
            },
          ],
        },
        {
          id: "ReferrerPolicy",
          description: "The referring-policy used for the navigation.",
          experimental: true,
          type: "string",
          enum: [
            "noReferrer",
            "noReferrerWhenDowngrade",
            "origin",
            "originWhenCrossOrigin",
            "sameOrigin",
            "strictOrigin",
            "strictOriginWhenCrossOrigin",
            "unsafeUrl",
          ],
        },
        {
          id: "CompilationCacheParams",
          description:
            "Per-script compilation cache parameters for `Page.produceCompilationCache`",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "url",
              description:
                "The URL of the script to produce a compilation cache entry for.",
              type: "string",
            },
            {
              name: "eager",
              description:
                "A hint to the backend whether eager compilation is recommended.\n(the actual compilation mode used is upon backend discretion).",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          id: "NavigationType",
          description: "The type of a frameNavigated event.",
          experimental: true,
          type: "string",
          enum: ["Navigation", "BackForwardCacheRestore"],
        },
        {
          id: "BackForwardCacheNotRestoredReason",
          description: "List of not restored reasons for back-forward cache.",
          experimental: true,
          type: "string",
          enum: [
            "NotPrimaryMainFrame",
            "BackForwardCacheDisabled",
            "RelatedActiveContentsExist",
            "HTTPStatusNotOK",
            "SchemeNotHTTPOrHTTPS",
            "Loading",
            "WasGrantedMediaAccess",
            "DisableForRenderFrameHostCalled",
            "DomainNotAllowed",
            "HTTPMethodNotGET",
            "SubframeIsNavigating",
            "Timeout",
            "CacheLimit",
            "JavaScriptExecution",
            "RendererProcessKilled",
            "RendererProcessCrashed",
            "SchedulerTrackedFeatureUsed",
            "ConflictingBrowsingInstance",
            "CacheFlushed",
            "ServiceWorkerVersionActivation",
            "SessionRestored",
            "ServiceWorkerPostMessage",
            "EnteredBackForwardCacheBeforeServiceWorkerHostAdded",
            "RenderFrameHostReused_SameSite",
            "RenderFrameHostReused_CrossSite",
            "ServiceWorkerClaim",
            "IgnoreEventAndEvict",
            "HaveInnerContents",
            "TimeoutPuttingInCache",
            "BackForwardCacheDisabledByLowMemory",
            "BackForwardCacheDisabledByCommandLine",
            "NetworkRequestDatapipeDrainedAsBytesConsumer",
            "NetworkRequestRedirected",
            "NetworkRequestTimeout",
            "NetworkExceedsBufferLimit",
            "NavigationCancelledWhileRestoring",
            "NotMostRecentNavigationEntry",
            "BackForwardCacheDisabledForPrerender",
            "UserAgentOverrideDiffers",
            "ForegroundCacheLimit",
            "BrowsingInstanceNotSwapped",
            "BackForwardCacheDisabledForDelegate",
            "UnloadHandlerExistsInMainFrame",
            "UnloadHandlerExistsInSubFrame",
            "ServiceWorkerUnregistration",
            "CacheControlNoStore",
            "CacheControlNoStoreCookieModified",
            "CacheControlNoStoreHTTPOnlyCookieModified",
            "NoResponseHead",
            "Unknown",
            "ActivationNavigationsDisallowedForBug1234857",
            "ErrorDocument",
            "FencedFramesEmbedder",
            "WebSocket",
            "WebTransport",
            "WebRTC",
            "MainResourceHasCacheControlNoStore",
            "MainResourceHasCacheControlNoCache",
            "SubresourceHasCacheControlNoStore",
            "SubresourceHasCacheControlNoCache",
            "ContainsPlugins",
            "DocumentLoaded",
            "DedicatedWorkerOrWorklet",
            "OutstandingNetworkRequestOthers",
            "OutstandingIndexedDBTransaction",
            "RequestedMIDIPermission",
            "RequestedAudioCapturePermission",
            "RequestedVideoCapturePermission",
            "RequestedBackForwardCacheBlockedSensors",
            "RequestedBackgroundWorkPermission",
            "BroadcastChannel",
            "IndexedDBConnection",
            "WebXR",
            "SharedWorker",
            "WebLocks",
            "WebHID",
            "WebShare",
            "RequestedStorageAccessGrant",
            "WebNfc",
            "OutstandingNetworkRequestFetch",
            "OutstandingNetworkRequestXHR",
            "AppBanner",
            "Printing",
            "WebDatabase",
            "PictureInPicture",
            "Portal",
            "SpeechRecognizer",
            "IdleManager",
            "PaymentManager",
            "SpeechSynthesis",
            "KeyboardLock",
            "WebOTPService",
            "OutstandingNetworkRequestDirectSocket",
            "InjectedJavascript",
            "InjectedStyleSheet",
            "KeepaliveRequest",
            "IndexedDBEvent",
            "Dummy",
            "AuthorizationHeader",
            "ContentSecurityHandler",
            "ContentWebAuthenticationAPI",
            "ContentFileChooser",
            "ContentSerial",
            "ContentFileSystemAccess",
            "ContentMediaDevicesDispatcherHost",
            "ContentWebBluetooth",
            "ContentWebUSB",
            "ContentMediaSessionService",
            "ContentScreenReader",
            "EmbedderPopupBlockerTabHelper",
            "EmbedderSafeBrowsingTriggeredPopupBlocker",
            "EmbedderSafeBrowsingThreatDetails",
            "EmbedderAppBannerManager",
            "EmbedderDomDistillerViewerSource",
            "EmbedderDomDistillerSelfDeletingRequestDelegate",
            "EmbedderOomInterventionTabHelper",
            "EmbedderOfflinePage",
            "EmbedderChromePasswordManagerClientBindCredentialManager",
            "EmbedderPermissionRequestManager",
            "EmbedderModalDialog",
            "EmbedderExtensions",
            "EmbedderExtensionMessaging",
            "EmbedderExtensionMessagingForOpenPort",
            "EmbedderExtensionSentMessageToCachedFrame",
          ],
        },
        {
          id: "BackForwardCacheNotRestoredReasonType",
          description: "Types of not restored reasons for back-forward cache.",
          experimental: true,
          type: "string",
          enum: ["SupportPending", "PageSupportNeeded", "Circumstantial"],
        },
        {
          id: "BackForwardCacheNotRestoredExplanation",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "type",
              description: "Type of the reason",
              $ref: "BackForwardCacheNotRestoredReasonType",
            },
            {
              name: "reason",
              description: "Not restored reason",
              $ref: "BackForwardCacheNotRestoredReason",
            },
            {
              name: "context",
              description:
                "Context associated with the reason. The meaning of this context is\ndependent on the reason:\n- EmbedderExtensionSentMessageToCachedFrame: the extension ID.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "BackForwardCacheNotRestoredExplanationTree",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "url",
              description: "URL of each frame",
              type: "string",
            },
            {
              name: "explanations",
              description: "Not restored reasons of each frame",
              type: "array",
              items: {
                $ref: "BackForwardCacheNotRestoredExplanation",
              },
            },
            {
              name: "children",
              description: "Array of children frame",
              type: "array",
              items: {
                $ref: "BackForwardCacheNotRestoredExplanationTree",
              },
            },
          ],
        },
        {
          id: "PrerenderFinalStatus",
          description: "List of FinalStatus reasons for Prerender2.",
          type: "string",
          enum: [
            "Activated",
            "Destroyed",
            "LowEndDevice",
            "InvalidSchemeRedirect",
            "InvalidSchemeNavigation",
            "InProgressNavigation",
            "NavigationRequestBlockedByCsp",
            "MainFrameNavigation",
            "MojoBinderPolicy",
            "RendererProcessCrashed",
            "RendererProcessKilled",
            "Download",
            "TriggerDestroyed",
            "NavigationNotCommitted",
            "NavigationBadHttpStatus",
            "ClientCertRequested",
            "NavigationRequestNetworkError",
            "MaxNumOfRunningPrerendersExceeded",
            "CancelAllHostsForTesting",
            "DidFailLoad",
            "Stop",
            "SslCertificateError",
            "LoginAuthRequested",
            "UaChangeRequiresReload",
            "BlockedByClient",
            "AudioOutputDeviceRequested",
            "MixedContent",
            "TriggerBackgrounded",
            "EmbedderTriggeredAndCrossOriginRedirected",
            "MemoryLimitExceeded",
            "FailToGetMemoryUsage",
            "DataSaverEnabled",
            "HasEffectiveUrl",
            "ActivatedBeforeStarted",
            "InactivePageRestriction",
            "StartFailed",
            "TimeoutBackgrounded",
            "CrossSiteRedirect",
            "CrossSiteNavigation",
            "SameSiteCrossOriginRedirect",
            "SameSiteCrossOriginNavigation",
            "SameSiteCrossOriginRedirectNotOptIn",
            "SameSiteCrossOriginNavigationNotOptIn",
            "ActivationNavigationParameterMismatch",
            "ActivatedInBackground",
            "EmbedderHostDisallowed",
            "ActivationNavigationDestroyedBeforeSuccess",
          ],
        },
      ],
      commands: [
        {
          name: "addScriptToEvaluateOnLoad",
          description:
            "Deprecated, please use addScriptToEvaluateOnNewDocument instead.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "scriptSource",
              type: "string",
            },
          ],
          returns: [
            {
              name: "identifier",
              description: "Identifier of the added script.",
              $ref: "ScriptIdentifier",
            },
          ],
        },
        {
          name: "addScriptToEvaluateOnNewDocument",
          description:
            "Evaluates given script in every frame upon creation (before loading frame's scripts).",
          parameters: [
            {
              name: "source",
              type: "string",
            },
            {
              name: "worldName",
              description:
                "If specified, creates an isolated world with the given name and evaluates given script in it.\nThis world name will be used as the ExecutionContextDescription::name when the corresponding\nevent is emitted.",
              experimental: true,
              optional: true,
              type: "string",
            },
            {
              name: "includeCommandLineAPI",
              description:
                "Specifies whether command line API should be available to the script, defaults\nto false.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "identifier",
              description: "Identifier of the added script.",
              $ref: "ScriptIdentifier",
            },
          ],
        },
        {
          name: "bringToFront",
          description: "Brings page to front (activates tab).",
        },
        {
          name: "captureScreenshot",
          description: "Capture page screenshot.",
          parameters: [
            {
              name: "format",
              description: "Image compression format (defaults to png).",
              optional: true,
              type: "string",
              enum: ["jpeg", "png", "webp"],
            },
            {
              name: "quality",
              description:
                "Compression quality from range [0..100] (jpeg only).",
              optional: true,
              type: "integer",
            },
            {
              name: "clip",
              description: "Capture the screenshot of a given region only.",
              optional: true,
              $ref: "Viewport",
            },
            {
              name: "fromSurface",
              description:
                "Capture the screenshot from the surface, rather than the view. Defaults to true.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
            {
              name: "captureBeyondViewport",
              description:
                "Capture the screenshot beyond the viewport. Defaults to false.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
            {
              name: "optimizeForSpeed",
              description:
                "Optimize image encoding for speed, not for resulting size (defaults to false)",
              experimental: true,
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "data",
              description:
                "Base64-encoded image data. (Encoded as a base64 string when passed over JSON)",
              type: "string",
            },
          ],
        },
        {
          name: "captureSnapshot",
          description:
            "Returns a snapshot of the page as a string. For MHTML format, the serialization includes\niframes, shadow DOM, external resources, and element-inline styles.",
          experimental: true,
          parameters: [
            {
              name: "format",
              description: "Format (defaults to mhtml).",
              optional: true,
              type: "string",
              enum: ["mhtml"],
            },
          ],
          returns: [
            {
              name: "data",
              description: "Serialized page data.",
              type: "string",
            },
          ],
        },
        {
          name: "clearDeviceMetricsOverride",
          description: "Clears the overridden device metrics.",
          experimental: true,
          deprecated: true,
          redirect: "Emulation",
        },
        {
          name: "clearDeviceOrientationOverride",
          description: "Clears the overridden Device Orientation.",
          experimental: true,
          deprecated: true,
          redirect: "DeviceOrientation",
        },
        {
          name: "clearGeolocationOverride",
          description: "Clears the overridden Geolocation Position and Error.",
          deprecated: true,
          redirect: "Emulation",
        },
        {
          name: "createIsolatedWorld",
          description: "Creates an isolated world for the given frame.",
          parameters: [
            {
              name: "frameId",
              description:
                "Id of the frame in which the isolated world should be created.",
              $ref: "FrameId",
            },
            {
              name: "worldName",
              description:
                "An optional name which is reported in the Execution Context.",
              optional: true,
              type: "string",
            },
            {
              name: "grantUniveralAccess",
              description:
                "Whether or not universal access should be granted to the isolated world. This is a powerful\noption, use with caution.",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "executionContextId",
              description: "Execution context of the isolated world.",
              $ref: "Runtime.ExecutionContextId",
            },
          ],
        },
        {
          name: "deleteCookie",
          description:
            "Deletes browser cookie with given name, domain and path.",
          experimental: true,
          deprecated: true,
          redirect: "Network",
          parameters: [
            {
              name: "cookieName",
              description: "Name of the cookie to remove.",
              type: "string",
            },
            {
              name: "url",
              description: "URL to match cooke domain and path.",
              type: "string",
            },
          ],
        },
        {
          name: "disable",
          description: "Disables page domain notifications.",
        },
        {
          name: "enable",
          description: "Enables page domain notifications.",
        },
        {
          name: "getAppManifest",
          returns: [
            {
              name: "url",
              description: "Manifest location.",
              type: "string",
            },
            {
              name: "errors",
              type: "array",
              items: {
                $ref: "AppManifestError",
              },
            },
            {
              name: "data",
              description: "Manifest content.",
              optional: true,
              type: "string",
            },
            {
              name: "parsed",
              description: "Parsed manifest properties",
              experimental: true,
              optional: true,
              $ref: "AppManifestParsedProperties",
            },
          ],
        },
        {
          name: "getInstallabilityErrors",
          experimental: true,
          returns: [
            {
              name: "installabilityErrors",
              type: "array",
              items: {
                $ref: "InstallabilityError",
              },
            },
          ],
        },
        {
          name: "getManifestIcons",
          experimental: true,
          returns: [
            {
              name: "primaryIcon",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "getAppId",
          description:
            "Returns the unique (PWA) app id.\nOnly returns values if the feature flag 'WebAppEnableManifestId' is enabled",
          experimental: true,
          returns: [
            {
              name: "appId",
              description:
                "App id, either from manifest's id attribute or computed from start_url",
              optional: true,
              type: "string",
            },
            {
              name: "recommendedId",
              description:
                "Recommendation for manifest's id attribute to match current id computed from start_url",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "getAdScriptId",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              $ref: "FrameId",
            },
          ],
          returns: [
            {
              name: "adScriptId",
              description:
                "Identifies the bottom-most script which caused the frame to be labelled\nas an ad. Only sent if frame is labelled as an ad and id is available.",
              optional: true,
              $ref: "AdScriptId",
            },
          ],
        },
        {
          name: "getCookies",
          description:
            "Returns all browser cookies for the page and all of its subframes. Depending\non the backend support, will return detailed cookie information in the\n`cookies` field.",
          experimental: true,
          deprecated: true,
          redirect: "Network",
          returns: [
            {
              name: "cookies",
              description: "Array of cookie objects.",
              type: "array",
              items: {
                $ref: "Network.Cookie",
              },
            },
          ],
        },
        {
          name: "getFrameTree",
          description: "Returns present frame tree structure.",
          returns: [
            {
              name: "frameTree",
              description: "Present frame tree structure.",
              $ref: "FrameTree",
            },
          ],
        },
        {
          name: "getLayoutMetrics",
          description:
            "Returns metrics relating to the layouting of the page, such as viewport bounds/scale.",
          returns: [
            {
              name: "layoutViewport",
              description:
                "Deprecated metrics relating to the layout viewport. Is in device pixels. Use `cssLayoutViewport` instead.",
              deprecated: true,
              $ref: "LayoutViewport",
            },
            {
              name: "visualViewport",
              description:
                "Deprecated metrics relating to the visual viewport. Is in device pixels. Use `cssVisualViewport` instead.",
              deprecated: true,
              $ref: "VisualViewport",
            },
            {
              name: "contentSize",
              description:
                "Deprecated size of scrollable area. Is in DP. Use `cssContentSize` instead.",
              deprecated: true,
              $ref: "DOM.Rect",
            },
            {
              name: "cssLayoutViewport",
              description:
                "Metrics relating to the layout viewport in CSS pixels.",
              $ref: "LayoutViewport",
            },
            {
              name: "cssVisualViewport",
              description:
                "Metrics relating to the visual viewport in CSS pixels.",
              $ref: "VisualViewport",
            },
            {
              name: "cssContentSize",
              description: "Size of scrollable area in CSS pixels.",
              $ref: "DOM.Rect",
            },
          ],
        },
        {
          name: "getNavigationHistory",
          description: "Returns navigation history for the current page.",
          returns: [
            {
              name: "currentIndex",
              description: "Index of the current navigation history entry.",
              type: "integer",
            },
            {
              name: "entries",
              description: "Array of navigation history entries.",
              type: "array",
              items: {
                $ref: "NavigationEntry",
              },
            },
          ],
        },
        {
          name: "resetNavigationHistory",
          description: "Resets navigation history for the current page.",
        },
        {
          name: "getResourceContent",
          description: "Returns content of the given resource.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              description: "Frame id to get resource for.",
              $ref: "FrameId",
            },
            {
              name: "url",
              description: "URL of the resource to get content for.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "content",
              description: "Resource content.",
              type: "string",
            },
            {
              name: "base64Encoded",
              description: "True, if content was served as base64.",
              type: "boolean",
            },
          ],
        },
        {
          name: "getResourceTree",
          description: "Returns present frame / resource tree structure.",
          experimental: true,
          returns: [
            {
              name: "frameTree",
              description: "Present frame / resource tree structure.",
              $ref: "FrameResourceTree",
            },
          ],
        },
        {
          name: "handleJavaScriptDialog",
          description:
            "Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).",
          parameters: [
            {
              name: "accept",
              description: "Whether to accept or dismiss the dialog.",
              type: "boolean",
            },
            {
              name: "promptText",
              description:
                "The text to enter into the dialog prompt before accepting. Used only if this is a prompt\ndialog.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "navigate",
          description: "Navigates current page to the given URL.",
          parameters: [
            {
              name: "url",
              description: "URL to navigate the page to.",
              type: "string",
            },
            {
              name: "referrer",
              description: "Referrer URL.",
              optional: true,
              type: "string",
            },
            {
              name: "transitionType",
              description: "Intended transition type.",
              optional: true,
              $ref: "TransitionType",
            },
            {
              name: "frameId",
              description:
                "Frame id to navigate, if not specified navigates the top frame.",
              optional: true,
              $ref: "FrameId",
            },
            {
              name: "referrerPolicy",
              description: "Referrer-policy used for the navigation.",
              experimental: true,
              optional: true,
              $ref: "ReferrerPolicy",
            },
          ],
          returns: [
            {
              name: "frameId",
              description:
                "Frame id that has navigated (or failed to navigate)",
              $ref: "FrameId",
            },
            {
              name: "loaderId",
              description:
                "Loader identifier. This is omitted in case of same-document navigation,\nas the previously committed loaderId would not change.",
              optional: true,
              $ref: "Network.LoaderId",
            },
            {
              name: "errorText",
              description:
                "User friendly error message, present if and only if navigation has failed.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "navigateToHistoryEntry",
          description: "Navigates current page to the given history entry.",
          parameters: [
            {
              name: "entryId",
              description: "Unique id of the entry to navigate to.",
              type: "integer",
            },
          ],
        },
        {
          name: "printToPDF",
          description: "Print page as PDF.",
          parameters: [
            {
              name: "landscape",
              description: "Paper orientation. Defaults to false.",
              optional: true,
              type: "boolean",
            },
            {
              name: "displayHeaderFooter",
              description: "Display header and footer. Defaults to false.",
              optional: true,
              type: "boolean",
            },
            {
              name: "printBackground",
              description: "Print background graphics. Defaults to false.",
              optional: true,
              type: "boolean",
            },
            {
              name: "scale",
              description: "Scale of the webpage rendering. Defaults to 1.",
              optional: true,
              type: "number",
            },
            {
              name: "paperWidth",
              description: "Paper width in inches. Defaults to 8.5 inches.",
              optional: true,
              type: "number",
            },
            {
              name: "paperHeight",
              description: "Paper height in inches. Defaults to 11 inches.",
              optional: true,
              type: "number",
            },
            {
              name: "marginTop",
              description:
                "Top margin in inches. Defaults to 1cm (~0.4 inches).",
              optional: true,
              type: "number",
            },
            {
              name: "marginBottom",
              description:
                "Bottom margin in inches. Defaults to 1cm (~0.4 inches).",
              optional: true,
              type: "number",
            },
            {
              name: "marginLeft",
              description:
                "Left margin in inches. Defaults to 1cm (~0.4 inches).",
              optional: true,
              type: "number",
            },
            {
              name: "marginRight",
              description:
                "Right margin in inches. Defaults to 1cm (~0.4 inches).",
              optional: true,
              type: "number",
            },
            {
              name: "pageRanges",
              description:
                "Paper ranges to print, one based, e.g., '1-5, 8, 11-13'. Pages are\nprinted in the document order, not in the order specified, and no\nmore than once.\nDefaults to empty string, which implies the entire document is printed.\nThe page numbers are quietly capped to actual page count of the\ndocument, and ranges beyond the end of the document are ignored.\nIf this results in no pages to print, an error is reported.\nIt is an error to specify a range with start greater than end.",
              optional: true,
              type: "string",
            },
            {
              name: "headerTemplate",
              description:
                "HTML template for the print header. Should be valid HTML markup with following\nclasses used to inject printing values into them:\n- `date`: formatted print date\n- `title`: document title\n- `url`: document location\n- `pageNumber`: current page number\n- `totalPages`: total pages in the document\n\nFor example, `<span class=title></span>` would generate span containing the title.",
              optional: true,
              type: "string",
            },
            {
              name: "footerTemplate",
              description:
                "HTML template for the print footer. Should use the same format as the `headerTemplate`.",
              optional: true,
              type: "string",
            },
            {
              name: "preferCSSPageSize",
              description:
                "Whether or not to prefer page size as defined by css. Defaults to false,\nin which case the content will be scaled to fit the paper size.",
              optional: true,
              type: "boolean",
            },
            {
              name: "transferMode",
              description: "return as stream",
              experimental: true,
              optional: true,
              type: "string",
              enum: ["ReturnAsBase64", "ReturnAsStream"],
            },
          ],
          returns: [
            {
              name: "data",
              description:
                "Base64-encoded pdf data. Empty if |returnAsStream| is specified. (Encoded as a base64 string when passed over JSON)",
              type: "string",
            },
            {
              name: "stream",
              description:
                "A handle of the stream that holds resulting PDF data.",
              experimental: true,
              optional: true,
              $ref: "IO.StreamHandle",
            },
          ],
        },
        {
          name: "reload",
          description: "Reloads given page optionally ignoring the cache.",
          parameters: [
            {
              name: "ignoreCache",
              description:
                "If true, browser cache is ignored (as if the user pressed Shift+refresh).",
              optional: true,
              type: "boolean",
            },
            {
              name: "scriptToEvaluateOnLoad",
              description:
                "If set, the script will be injected into all frames of the inspected page after reload.\nArgument will be ignored if reloading dataURL origin.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "removeScriptToEvaluateOnLoad",
          description:
            "Deprecated, please use removeScriptToEvaluateOnNewDocument instead.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "identifier",
              $ref: "ScriptIdentifier",
            },
          ],
        },
        {
          name: "removeScriptToEvaluateOnNewDocument",
          description: "Removes given script from the list.",
          parameters: [
            {
              name: "identifier",
              $ref: "ScriptIdentifier",
            },
          ],
        },
        {
          name: "screencastFrameAck",
          description:
            "Acknowledges that a screencast frame has been received by the frontend.",
          experimental: true,
          parameters: [
            {
              name: "sessionId",
              description: "Frame number.",
              type: "integer",
            },
          ],
        },
        {
          name: "searchInResource",
          description: "Searches for given string in resource content.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              description: "Frame id for resource to search in.",
              $ref: "FrameId",
            },
            {
              name: "url",
              description: "URL of the resource to search in.",
              type: "string",
            },
            {
              name: "query",
              description: "String to search for.",
              type: "string",
            },
            {
              name: "caseSensitive",
              description: "If true, search is case sensitive.",
              optional: true,
              type: "boolean",
            },
            {
              name: "isRegex",
              description: "If true, treats string parameter as regex.",
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "result",
              description: "List of search matches.",
              type: "array",
              items: {
                $ref: "Debugger.SearchMatch",
              },
            },
          ],
        },
        {
          name: "setAdBlockingEnabled",
          description: "Enable Chrome's experimental ad filter on all sites.",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              description: "Whether to block ads.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setBypassCSP",
          description: "Enable page Content Security Policy by-passing.",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              description: "Whether to bypass page CSP.",
              type: "boolean",
            },
          ],
        },
        {
          name: "getPermissionsPolicyState",
          description: "Get Permissions Policy state on given frame.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              $ref: "FrameId",
            },
          ],
          returns: [
            {
              name: "states",
              type: "array",
              items: {
                $ref: "PermissionsPolicyFeatureState",
              },
            },
          ],
        },
        {
          name: "getOriginTrials",
          description: "Get Origin Trials on given frame.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              $ref: "FrameId",
            },
          ],
          returns: [
            {
              name: "originTrials",
              type: "array",
              items: {
                $ref: "OriginTrial",
              },
            },
          ],
        },
        {
          name: "setDeviceMetricsOverride",
          description:
            'Overrides the values of device screen dimensions (window.screen.width, window.screen.height,\nwindow.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media\nquery results).',
          experimental: true,
          deprecated: true,
          redirect: "Emulation",
          parameters: [
            {
              name: "width",
              description:
                "Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.",
              type: "integer",
            },
            {
              name: "height",
              description:
                "Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.",
              type: "integer",
            },
            {
              name: "deviceScaleFactor",
              description:
                "Overriding device scale factor value. 0 disables the override.",
              type: "number",
            },
            {
              name: "mobile",
              description:
                "Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text\nautosizing and more.",
              type: "boolean",
            },
            {
              name: "scale",
              description: "Scale to apply to resulting view image.",
              optional: true,
              type: "number",
            },
            {
              name: "screenWidth",
              description:
                "Overriding screen width value in pixels (minimum 0, maximum 10000000).",
              optional: true,
              type: "integer",
            },
            {
              name: "screenHeight",
              description:
                "Overriding screen height value in pixels (minimum 0, maximum 10000000).",
              optional: true,
              type: "integer",
            },
            {
              name: "positionX",
              description:
                "Overriding view X position on screen in pixels (minimum 0, maximum 10000000).",
              optional: true,
              type: "integer",
            },
            {
              name: "positionY",
              description:
                "Overriding view Y position on screen in pixels (minimum 0, maximum 10000000).",
              optional: true,
              type: "integer",
            },
            {
              name: "dontSetVisibleSize",
              description:
                "Do not set visible view size, rely upon explicit setVisibleSize call.",
              optional: true,
              type: "boolean",
            },
            {
              name: "screenOrientation",
              description: "Screen orientation override.",
              optional: true,
              $ref: "Emulation.ScreenOrientation",
            },
            {
              name: "viewport",
              description:
                "The viewport dimensions and scale. If not set, the override is cleared.",
              optional: true,
              $ref: "Viewport",
            },
          ],
        },
        {
          name: "setDeviceOrientationOverride",
          description: "Overrides the Device Orientation.",
          experimental: true,
          deprecated: true,
          redirect: "DeviceOrientation",
          parameters: [
            {
              name: "alpha",
              description: "Mock alpha",
              type: "number",
            },
            {
              name: "beta",
              description: "Mock beta",
              type: "number",
            },
            {
              name: "gamma",
              description: "Mock gamma",
              type: "number",
            },
          ],
        },
        {
          name: "setFontFamilies",
          description: "Set generic font families.",
          experimental: true,
          parameters: [
            {
              name: "fontFamilies",
              description:
                "Specifies font families to set. If a font family is not specified, it won't be changed.",
              $ref: "FontFamilies",
            },
            {
              name: "forScripts",
              description:
                "Specifies font families to set for individual scripts.",
              optional: true,
              type: "array",
              items: {
                $ref: "ScriptFontFamilies",
              },
            },
          ],
        },
        {
          name: "setFontSizes",
          description: "Set default font sizes.",
          experimental: true,
          parameters: [
            {
              name: "fontSizes",
              description:
                "Specifies font sizes to set. If a font size is not specified, it won't be changed.",
              $ref: "FontSizes",
            },
          ],
        },
        {
          name: "setDocumentContent",
          description: "Sets given markup as the document's HTML.",
          parameters: [
            {
              name: "frameId",
              description: "Frame id to set HTML for.",
              $ref: "FrameId",
            },
            {
              name: "html",
              description: "HTML content to set.",
              type: "string",
            },
          ],
        },
        {
          name: "setDownloadBehavior",
          description: "Set the behavior when downloading a file.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "behavior",
              description:
                "Whether to allow all or deny all download requests, or use default Chrome behavior if\navailable (otherwise deny).",
              type: "string",
              enum: ["deny", "allow", "default"],
            },
            {
              name: "downloadPath",
              description:
                "The default path to save downloaded files to. This is required if behavior is set to 'allow'",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "setGeolocationOverride",
          description:
            "Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position\nunavailable.",
          deprecated: true,
          redirect: "Emulation",
          parameters: [
            {
              name: "latitude",
              description: "Mock latitude",
              optional: true,
              type: "number",
            },
            {
              name: "longitude",
              description: "Mock longitude",
              optional: true,
              type: "number",
            },
            {
              name: "accuracy",
              description: "Mock accuracy",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          name: "setLifecycleEventsEnabled",
          description: "Controls whether page will emit lifecycle events.",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              description: "If true, starts emitting lifecycle events.",
              type: "boolean",
            },
          ],
        },
        {
          name: "setTouchEmulationEnabled",
          description: "Toggles mouse event-based touch event emulation.",
          experimental: true,
          deprecated: true,
          redirect: "Emulation",
          parameters: [
            {
              name: "enabled",
              description:
                "Whether the touch event emulation should be enabled.",
              type: "boolean",
            },
            {
              name: "configuration",
              description:
                "Touch/gesture events configuration. Default: current platform.",
              optional: true,
              type: "string",
              enum: ["mobile", "desktop"],
            },
          ],
        },
        {
          name: "startScreencast",
          description:
            "Starts sending each frame using the `screencastFrame` event.",
          experimental: true,
          parameters: [
            {
              name: "format",
              description: "Image compression format.",
              optional: true,
              type: "string",
              enum: ["jpeg", "png"],
            },
            {
              name: "quality",
              description: "Compression quality from range [0..100].",
              optional: true,
              type: "integer",
            },
            {
              name: "maxWidth",
              description: "Maximum screenshot width.",
              optional: true,
              type: "integer",
            },
            {
              name: "maxHeight",
              description: "Maximum screenshot height.",
              optional: true,
              type: "integer",
            },
            {
              name: "everyNthFrame",
              description: "Send every n-th frame.",
              optional: true,
              type: "integer",
            },
          ],
        },
        {
          name: "stopLoading",
          description:
            "Force the page stop all navigations and pending resource fetches.",
        },
        {
          name: "crash",
          description:
            "Crashes renderer on the IO thread, generates minidumps.",
          experimental: true,
        },
        {
          name: "close",
          description:
            "Tries to close page, running its beforeunload hooks, if any.",
          experimental: true,
        },
        {
          name: "setWebLifecycleState",
          description:
            "Tries to update the web lifecycle state of the page.\nIt will transition the page to the given state according to:\nhttps://github.com/WICG/web-lifecycle/",
          experimental: true,
          parameters: [
            {
              name: "state",
              description: "Target lifecycle state",
              type: "string",
              enum: ["frozen", "active"],
            },
          ],
        },
        {
          name: "stopScreencast",
          description: "Stops sending each frame in the `screencastFrame`.",
          experimental: true,
        },
        {
          name: "produceCompilationCache",
          description:
            "Requests backend to produce compilation cache for the specified scripts.\n`scripts` are appeneded to the list of scripts for which the cache\nwould be produced. The list may be reset during page navigation.\nWhen script with a matching URL is encountered, the cache is optionally\nproduced upon backend discretion, based on internal heuristics.\nSee also: `Page.compilationCacheProduced`.",
          experimental: true,
          parameters: [
            {
              name: "scripts",
              type: "array",
              items: {
                $ref: "CompilationCacheParams",
              },
            },
          ],
        },
        {
          name: "addCompilationCache",
          description:
            "Seeds compilation cache for given url. Compilation cache does not survive\ncross-process navigation.",
          experimental: true,
          parameters: [
            {
              name: "url",
              type: "string",
            },
            {
              name: "data",
              description:
                "Base64-encoded data (Encoded as a base64 string when passed over JSON)",
              type: "string",
            },
          ],
        },
        {
          name: "clearCompilationCache",
          description: "Clears seeded compilation cache.",
          experimental: true,
        },
        {
          name: "setSPCTransactionMode",
          description:
            "Sets the Secure Payment Confirmation transaction mode.\nhttps://w3c.github.io/secure-payment-confirmation/#sctn-automation-set-spc-transaction-mode",
          experimental: true,
          parameters: [
            {
              name: "mode",
              type: "string",
              enum: ["none", "autoAccept", "autoReject", "autoOptOut"],
            },
          ],
        },
        {
          name: "generateTestReport",
          description: "Generates a report for testing.",
          experimental: true,
          parameters: [
            {
              name: "message",
              description: "Message to be displayed in the report.",
              type: "string",
            },
            {
              name: "group",
              description:
                "Specifies the endpoint group to deliver the report to.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "waitForDebugger",
          description:
            "Pauses page execution. Can be resumed using generic Runtime.runIfWaitingForDebugger.",
          experimental: true,
        },
        {
          name: "setInterceptFileChooserDialog",
          description:
            "Intercept file chooser requests and transfer control to protocol clients.\nWhen file chooser interception is enabled, native file chooser dialog is not shown.\nInstead, a protocol event `Page.fileChooserOpened` is emitted.",
          experimental: true,
          parameters: [
            {
              name: "enabled",
              type: "boolean",
            },
          ],
        },
      ],
      events: [
        {
          name: "domContentEventFired",
          parameters: [
            {
              name: "timestamp",
              $ref: "Network.MonotonicTime",
            },
          ],
        },
        {
          name: "fileChooserOpened",
          description:
            "Emitted only when `page.interceptFileChooser` is enabled.",
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame containing input node.",
              experimental: true,
              $ref: "FrameId",
            },
            {
              name: "mode",
              description: "Input mode.",
              type: "string",
              enum: ["selectSingle", "selectMultiple"],
            },
            {
              name: "backendNodeId",
              description:
                'Input node id. Only present for file choosers opened via an <input type="file"> element.',
              experimental: true,
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
          ],
        },
        {
          name: "frameAttached",
          description: "Fired when frame has been attached to its parent.",
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame that has been attached.",
              $ref: "FrameId",
            },
            {
              name: "parentFrameId",
              description: "Parent frame identifier.",
              $ref: "FrameId",
            },
            {
              name: "stack",
              description:
                "JavaScript stack trace of when frame was attached, only set if frame initiated from script.",
              optional: true,
              $ref: "Runtime.StackTrace",
            },
          ],
        },
        {
          name: "frameClearedScheduledNavigation",
          description: "Fired when frame no longer has a scheduled navigation.",
          deprecated: true,
          parameters: [
            {
              name: "frameId",
              description:
                "Id of the frame that has cleared its scheduled navigation.",
              $ref: "FrameId",
            },
          ],
        },
        {
          name: "frameDetached",
          description: "Fired when frame has been detached from its parent.",
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame that has been detached.",
              $ref: "FrameId",
            },
            {
              name: "reason",
              experimental: true,
              type: "string",
              enum: ["remove", "swap"],
            },
          ],
        },
        {
          name: "frameNavigated",
          description:
            "Fired once navigation of the frame has completed. Frame is now associated with the new loader.",
          parameters: [
            {
              name: "frame",
              description: "Frame object.",
              $ref: "Frame",
            },
            {
              name: "type",
              experimental: true,
              $ref: "NavigationType",
            },
          ],
        },
        {
          name: "documentOpened",
          description: "Fired when opening document to write to.",
          experimental: true,
          parameters: [
            {
              name: "frame",
              description: "Frame object.",
              $ref: "Frame",
            },
          ],
        },
        {
          name: "frameResized",
          experimental: true,
        },
        {
          name: "frameRequestedNavigation",
          description:
            "Fired when a renderer-initiated navigation is requested.\nNavigation may still be cancelled after the event is issued.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame that is being navigated.",
              $ref: "FrameId",
            },
            {
              name: "reason",
              description: "The reason for the navigation.",
              $ref: "ClientNavigationReason",
            },
            {
              name: "url",
              description: "The destination URL for the requested navigation.",
              type: "string",
            },
            {
              name: "disposition",
              description: "The disposition for the navigation.",
              $ref: "ClientNavigationDisposition",
            },
          ],
        },
        {
          name: "frameScheduledNavigation",
          description: "Fired when frame schedules a potential navigation.",
          deprecated: true,
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame that has scheduled a navigation.",
              $ref: "FrameId",
            },
            {
              name: "delay",
              description:
                "Delay (in seconds) until the navigation is scheduled to begin. The navigation is not\nguaranteed to start.",
              type: "number",
            },
            {
              name: "reason",
              description: "The reason for the navigation.",
              $ref: "ClientNavigationReason",
            },
            {
              name: "url",
              description: "The destination URL for the scheduled navigation.",
              type: "string",
            },
          ],
        },
        {
          name: "frameStartedLoading",
          description: "Fired when frame has started loading.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame that has started loading.",
              $ref: "FrameId",
            },
          ],
        },
        {
          name: "frameStoppedLoading",
          description: "Fired when frame has stopped loading.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame that has stopped loading.",
              $ref: "FrameId",
            },
          ],
        },
        {
          name: "downloadWillBegin",
          description:
            "Fired when page is about to start a download.\nDeprecated. Use Browser.downloadWillBegin instead.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame that caused download to begin.",
              $ref: "FrameId",
            },
            {
              name: "guid",
              description: "Global unique identifier of the download.",
              type: "string",
            },
            {
              name: "url",
              description: "URL of the resource being downloaded.",
              type: "string",
            },
            {
              name: "suggestedFilename",
              description:
                "Suggested file name of the resource (the actual name of the file saved on disk may differ).",
              type: "string",
            },
          ],
        },
        {
          name: "downloadProgress",
          description:
            "Fired when download makes progress. Last call has |done| == true.\nDeprecated. Use Browser.downloadProgress instead.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "guid",
              description: "Global unique identifier of the download.",
              type: "string",
            },
            {
              name: "totalBytes",
              description: "Total expected bytes to download.",
              type: "number",
            },
            {
              name: "receivedBytes",
              description: "Total bytes received.",
              type: "number",
            },
            {
              name: "state",
              description: "Download status.",
              type: "string",
              enum: ["inProgress", "completed", "canceled"],
            },
          ],
        },
        {
          name: "interstitialHidden",
          description: "Fired when interstitial page was hidden",
        },
        {
          name: "interstitialShown",
          description: "Fired when interstitial page was shown",
        },
        {
          name: "javascriptDialogClosed",
          description:
            "Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been\nclosed.",
          parameters: [
            {
              name: "result",
              description: "Whether dialog was confirmed.",
              type: "boolean",
            },
            {
              name: "userInput",
              description: "User input in case of prompt.",
              type: "string",
            },
          ],
        },
        {
          name: "javascriptDialogOpening",
          description:
            "Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to\nopen.",
          parameters: [
            {
              name: "url",
              description: "Frame url.",
              type: "string",
            },
            {
              name: "message",
              description: "Message that will be displayed by the dialog.",
              type: "string",
            },
            {
              name: "type",
              description: "Dialog type.",
              $ref: "DialogType",
            },
            {
              name: "hasBrowserHandler",
              description:
                "True iff browser is capable showing or acting on the given dialog. When browser has no\ndialog handler for given target, calling alert while Page domain is engaged will stall\nthe page execution. Execution can be resumed via calling Page.handleJavaScriptDialog.",
              type: "boolean",
            },
            {
              name: "defaultPrompt",
              description: "Default dialog prompt.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "lifecycleEvent",
          description:
            "Fired for top level page lifecycle events such as navigation, load, paint, etc.",
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame.",
              $ref: "FrameId",
            },
            {
              name: "loaderId",
              description:
                "Loader identifier. Empty string if the request is fetched from worker.",
              $ref: "Network.LoaderId",
            },
            {
              name: "name",
              type: "string",
            },
            {
              name: "timestamp",
              $ref: "Network.MonotonicTime",
            },
          ],
        },
        {
          name: "backForwardCacheNotUsed",
          description:
            "Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do\nnot assume any ordering with the Page.frameNavigated event. This event is fired only for\nmain-frame history navigation where the document changes (non-same-document navigations),\nwhen bfcache navigation fails.",
          experimental: true,
          parameters: [
            {
              name: "loaderId",
              description: "The loader id for the associated navgation.",
              $ref: "Network.LoaderId",
            },
            {
              name: "frameId",
              description: "The frame id of the associated frame.",
              $ref: "FrameId",
            },
            {
              name: "notRestoredExplanations",
              description:
                "Array of reasons why the page could not be cached. This must not be empty.",
              type: "array",
              items: {
                $ref: "BackForwardCacheNotRestoredExplanation",
              },
            },
            {
              name: "notRestoredExplanationsTree",
              description:
                "Tree structure of reasons why the page could not be cached for each frame.",
              optional: true,
              $ref: "BackForwardCacheNotRestoredExplanationTree",
            },
          ],
        },
        {
          name: "prerenderAttemptCompleted",
          description: "Fired when a prerender attempt is completed.",
          experimental: true,
          parameters: [
            {
              name: "initiatingFrameId",
              description: "The frame id of the frame initiating prerendering.",
              $ref: "FrameId",
            },
            {
              name: "prerenderingUrl",
              type: "string",
            },
            {
              name: "finalStatus",
              $ref: "PrerenderFinalStatus",
            },
            {
              name: "disallowedApiMethod",
              description:
                "This is used to give users more information about the name of the API call\nthat is incompatible with prerender and has caused the cancellation of the attempt",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "loadEventFired",
          parameters: [
            {
              name: "timestamp",
              $ref: "Network.MonotonicTime",
            },
          ],
        },
        {
          name: "navigatedWithinDocument",
          description:
            "Fired when same-document navigation happens, e.g. due to history API usage or anchor navigation.",
          experimental: true,
          parameters: [
            {
              name: "frameId",
              description: "Id of the frame.",
              $ref: "FrameId",
            },
            {
              name: "url",
              description: "Frame's new url.",
              type: "string",
            },
          ],
        },
        {
          name: "screencastFrame",
          description:
            "Compressed image data requested by the `startScreencast`.",
          experimental: true,
          parameters: [
            {
              name: "data",
              description:
                "Base64-encoded compressed image. (Encoded as a base64 string when passed over JSON)",
              type: "string",
            },
            {
              name: "metadata",
              description: "Screencast frame metadata.",
              $ref: "ScreencastFrameMetadata",
            },
            {
              name: "sessionId",
              description: "Frame number.",
              type: "integer",
            },
          ],
        },
        {
          name: "screencastVisibilityChanged",
          description:
            "Fired when the page with currently enabled screencast was shown or hidden `.",
          experimental: true,
          parameters: [
            {
              name: "visible",
              description: "True if the page is visible.",
              type: "boolean",
            },
          ],
        },
        {
          name: "windowOpen",
          description:
            "Fired when a new window is going to be opened, via window.open(), link click, form submission,\netc.",
          parameters: [
            {
              name: "url",
              description: "The URL for the new window.",
              type: "string",
            },
            {
              name: "windowName",
              description: "Window name.",
              type: "string",
            },
            {
              name: "windowFeatures",
              description: "An array of enabled window features.",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "userGesture",
              description: "Whether or not it was triggered by user gesture.",
              type: "boolean",
            },
          ],
        },
        {
          name: "compilationCacheProduced",
          description:
            "Issued for every compilation cache generated. Is only available\nif Page.setGenerateCompilationCache is enabled.",
          experimental: true,
          parameters: [
            {
              name: "url",
              type: "string",
            },
            {
              name: "data",
              description:
                "Base64-encoded data (Encoded as a base64 string when passed over JSON)",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      domain: "Performance",
      types: [
        {
          id: "Metric",
          description: "Run-time execution metric.",
          type: "object",
          properties: [
            {
              name: "name",
              description: "Metric name.",
              type: "string",
            },
            {
              name: "value",
              description: "Metric value.",
              type: "number",
            },
          ],
        },
      ],
      commands: [
        {
          name: "disable",
          description: "Disable collecting and reporting metrics.",
        },
        {
          name: "enable",
          description: "Enable collecting and reporting metrics.",
          parameters: [
            {
              name: "timeDomain",
              description:
                "Time domain to use for collecting and reporting duration metrics.",
              optional: true,
              type: "string",
              enum: ["timeTicks", "threadTicks"],
            },
          ],
        },
        {
          name: "setTimeDomain",
          description:
            "Sets time domain to use for collecting and reporting duration metrics.\nNote that this must be called before enabling metrics collection. Calling\nthis method while metrics collection is enabled returns an error.",
          experimental: true,
          deprecated: true,
          parameters: [
            {
              name: "timeDomain",
              description: "Time domain",
              type: "string",
              enum: ["timeTicks", "threadTicks"],
            },
          ],
        },
        {
          name: "getMetrics",
          description: "Retrieve current values of run-time metrics.",
          returns: [
            {
              name: "metrics",
              description: "Current values for run-time metrics.",
              type: "array",
              items: {
                $ref: "Metric",
              },
            },
          ],
        },
      ],
      events: [
        {
          name: "metrics",
          description: "Current values of the metrics.",
          parameters: [
            {
              name: "metrics",
              description: "Current values of the metrics.",
              type: "array",
              items: {
                $ref: "Metric",
              },
            },
            {
              name: "title",
              description: "Timestamp title.",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      domain: "PerformanceTimeline",
      description:
        "Reporting of performance timeline events, as specified in\nhttps://w3c.github.io/performance-timeline/#dom-performanceobserver.",
      experimental: true,
      dependencies: ["DOM", "Network"],
      types: [
        {
          id: "LargestContentfulPaint",
          description:
            "See https://github.com/WICG/LargestContentfulPaint and largest_contentful_paint.idl",
          type: "object",
          properties: [
            {
              name: "renderTime",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "loadTime",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "size",
              description: "The number of pixels being painted.",
              type: "number",
            },
            {
              name: "elementId",
              description: "The id attribute of the element, if available.",
              optional: true,
              type: "string",
            },
            {
              name: "url",
              description: "The URL of the image (may be trimmed).",
              optional: true,
              type: "string",
            },
            {
              name: "nodeId",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
          ],
        },
        {
          id: "LayoutShiftAttribution",
          type: "object",
          properties: [
            {
              name: "previousRect",
              $ref: "DOM.Rect",
            },
            {
              name: "currentRect",
              $ref: "DOM.Rect",
            },
            {
              name: "nodeId",
              optional: true,
              $ref: "DOM.BackendNodeId",
            },
          ],
        },
        {
          id: "LayoutShift",
          description:
            "See https://wicg.github.io/layout-instability/#sec-layout-shift and layout_shift.idl",
          type: "object",
          properties: [
            {
              name: "value",
              description: "Score increment produced by this event.",
              type: "number",
            },
            {
              name: "hadRecentInput",
              type: "boolean",
            },
            {
              name: "lastInputTime",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "sources",
              type: "array",
              items: {
                $ref: "LayoutShiftAttribution",
              },
            },
          ],
        },
        {
          id: "TimelineEvent",
          type: "object",
          properties: [
            {
              name: "frameId",
              description:
                "Identifies the frame that this event is related to. Empty for non-frame targets.",
              $ref: "Page.FrameId",
            },
            {
              name: "type",
              description:
                'The event type, as specified in https://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype\nThis determines which of the optional "details" fiedls is present.',
              type: "string",
            },
            {
              name: "name",
              description: "Name may be empty depending on the type.",
              type: "string",
            },
            {
              name: "time",
              description:
                "Time in seconds since Epoch, monotonically increasing within document lifetime.",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "duration",
              description: "Event duration, if applicable.",
              optional: true,
              type: "number",
            },
            {
              name: "lcpDetails",
              optional: true,
              $ref: "LargestContentfulPaint",
            },
            {
              name: "layoutShiftDetails",
              optional: true,
              $ref: "LayoutShift",
            },
          ],
        },
      ],
      commands: [
        {
          name: "enable",
          description:
            "Previously buffered events would be reported before method returns.\nSee also: timelineEventAdded",
          parameters: [
            {
              name: "eventTypes",
              description:
                "The types of event to report, as specified in\nhttps://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype\nThe specified filter overrides any previous filters, passing empty\nfilter disables recording.\nNote that not all types exposed to the web platform are currently supported.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
      ],
      events: [
        {
          name: "timelineEventAdded",
          description:
            "Sent when a performance timeline event is added. See reportPerformanceTimeline method.",
          parameters: [
            {
              name: "event",
              $ref: "TimelineEvent",
            },
          ],
        },
      ],
    },
    {
      domain: "Security",
      description: "Security",
      types: [
        {
          id: "CertificateId",
          description: "An internal certificate ID value.",
          type: "integer",
        },
        {
          id: "MixedContentType",
          description:
            "A description of mixed content (HTTP resources on HTTPS pages), as defined by\nhttps://www.w3.org/TR/mixed-content/#categories",
          type: "string",
          enum: ["blockable", "optionally-blockable", "none"],
        },
        {
          id: "SecurityState",
          description: "The security level of a page or resource.",
          type: "string",
          enum: [
            "unknown",
            "neutral",
            "insecure",
            "secure",
            "info",
            "insecure-broken",
          ],
        },
        {
          id: "CertificateSecurityState",
          description:
            "Details about the security state of the page certificate.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "protocol",
              description: 'Protocol name (e.g. "TLS 1.2" or "QUIC").',
              type: "string",
            },
            {
              name: "keyExchange",
              description:
                "Key Exchange used by the connection, or the empty string if not applicable.",
              type: "string",
            },
            {
              name: "keyExchangeGroup",
              description:
                "(EC)DH group used by the connection, if applicable.",
              optional: true,
              type: "string",
            },
            {
              name: "cipher",
              description: "Cipher name.",
              type: "string",
            },
            {
              name: "mac",
              description:
                "TLS MAC. Note that AEAD ciphers do not have separate MACs.",
              optional: true,
              type: "string",
            },
            {
              name: "certificate",
              description: "Page certificate.",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "subjectName",
              description: "Certificate subject name.",
              type: "string",
            },
            {
              name: "issuer",
              description: "Name of the issuing CA.",
              type: "string",
            },
            {
              name: "validFrom",
              description: "Certificate valid from date.",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "validTo",
              description: "Certificate valid to (expiration) date",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "certificateNetworkError",
              description:
                "The highest priority network error code, if the certificate has an error.",
              optional: true,
              type: "string",
            },
            {
              name: "certificateHasWeakSignature",
              description:
                "True if the certificate uses a weak signature aglorithm.",
              type: "boolean",
            },
            {
              name: "certificateHasSha1Signature",
              description:
                "True if the certificate has a SHA1 signature in the chain.",
              type: "boolean",
            },
            {
              name: "modernSSL",
              description: "True if modern SSL",
              type: "boolean",
            },
            {
              name: "obsoleteSslProtocol",
              description:
                "True if the connection is using an obsolete SSL protocol.",
              type: "boolean",
            },
            {
              name: "obsoleteSslKeyExchange",
              description:
                "True if the connection is using an obsolete SSL key exchange.",
              type: "boolean",
            },
            {
              name: "obsoleteSslCipher",
              description:
                "True if the connection is using an obsolete SSL cipher.",
              type: "boolean",
            },
            {
              name: "obsoleteSslSignature",
              description:
                "True if the connection is using an obsolete SSL signature.",
              type: "boolean",
            },
          ],
        },
        {
          id: "SafetyTipStatus",
          experimental: true,
          type: "string",
          enum: ["badReputation", "lookalike"],
        },
        {
          id: "SafetyTipInfo",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "safetyTipStatus",
              description:
                "Describes whether the page triggers any safety tips or reputation warnings. Default is unknown.",
              $ref: "SafetyTipStatus",
            },
            {
              name: "safeUrl",
              description:
                'The URL the safety tip suggested ("Did you mean?"). Only filled in for lookalike matches.',
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "VisibleSecurityState",
          description: "Security state information about the page.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "securityState",
              description: "The security level of the page.",
              $ref: "SecurityState",
            },
            {
              name: "certificateSecurityState",
              description: "Security state details about the page certificate.",
              optional: true,
              $ref: "CertificateSecurityState",
            },
            {
              name: "safetyTipInfo",
              description:
                "The type of Safety Tip triggered on the page. Note that this field will be set even if the Safety Tip UI was not actually shown.",
              optional: true,
              $ref: "SafetyTipInfo",
            },
            {
              name: "securityStateIssueIds",
              description: "Array of security state issues ids.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          id: "SecurityStateExplanation",
          description:
            "An explanation of an factor contributing to the security state.",
          type: "object",
          properties: [
            {
              name: "securityState",
              description:
                "Security state representing the severity of the factor being explained.",
              $ref: "SecurityState",
            },
            {
              name: "title",
              description: "Title describing the type of factor.",
              type: "string",
            },
            {
              name: "summary",
              description: "Short phrase describing the type of factor.",
              type: "string",
            },
            {
              name: "description",
              description: "Full text explanation of the factor.",
              type: "string",
            },
            {
              name: "mixedContentType",
              description:
                "The type of mixed content described by the explanation.",
              $ref: "MixedContentType",
            },
            {
              name: "certificate",
              description: "Page certificate.",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "recommendations",
              description: "Recommendations to fix any issues.",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          id: "InsecureContentStatus",
          description: "Information about insecure content on the page.",
          deprecated: true,
          type: "object",
          properties: [
            {
              name: "ranMixedContent",
              description: "Always false.",
              type: "boolean",
            },
            {
              name: "displayedMixedContent",
              description: "Always false.",
              type: "boolean",
            },
            {
              name: "containedMixedForm",
              description: "Always false.",
              type: "boolean",
            },
            {
              name: "ranContentWithCertErrors",
              description: "Always false.",
              type: "boolean",
            },
            {
              name: "displayedContentWithCertErrors",
              description: "Always false.",
              type: "boolean",
            },
            {
              name: "ranInsecureContentStyle",
              description: "Always set to unknown.",
              $ref: "SecurityState",
            },
            {
              name: "displayedInsecureContentStyle",
              description: "Always set to unknown.",
              $ref: "SecurityState",
            },
          ],
        },
        {
          id: "CertificateErrorAction",
          description:
            "The action to take when a certificate error occurs. continue will continue processing the\nrequest and cancel will cancel the request.",
          type: "string",
          enum: ["continue", "cancel"],
        },
      ],
      commands: [
        {
          name: "disable",
          description: "Disables tracking security state changes.",
        },
        {
          name: "enable",
          description: "Enables tracking security state changes.",
        },
        {
          name: "setIgnoreCertificateErrors",
          description:
            "Enable/disable whether all certificate errors should be ignored.",
          experimental: true,
          parameters: [
            {
              name: "ignore",
              description: "If true, all certificate errors will be ignored.",
              type: "boolean",
            },
          ],
        },
        {
          name: "handleCertificateError",
          description:
            "Handles a certificate error that fired a certificateError event.",
          deprecated: true,
          parameters: [
            {
              name: "eventId",
              description: "The ID of the event.",
              type: "integer",
            },
            {
              name: "action",
              description: "The action to take on the certificate error.",
              $ref: "CertificateErrorAction",
            },
          ],
        },
        {
          name: "setOverrideCertificateErrors",
          description:
            "Enable/disable overriding certificate errors. If enabled, all certificate error events need to\nbe handled by the DevTools client and should be answered with `handleCertificateError` commands.",
          deprecated: true,
          parameters: [
            {
              name: "override",
              description: "If true, certificate errors will be overridden.",
              type: "boolean",
            },
          ],
        },
      ],
      events: [
        {
          name: "certificateError",
          description:
            "There is a certificate error. If overriding certificate errors is enabled, then it should be\nhandled with the `handleCertificateError` command. Note: this event does not fire if the\ncertificate error has been allowed internally. Only one client per target should override\ncertificate errors at the same time.",
          deprecated: true,
          parameters: [
            {
              name: "eventId",
              description: "The ID of the event.",
              type: "integer",
            },
            {
              name: "errorType",
              description: "The type of the error.",
              type: "string",
            },
            {
              name: "requestURL",
              description: "The url that was requested.",
              type: "string",
            },
          ],
        },
        {
          name: "visibleSecurityStateChanged",
          description: "The security state of the page changed.",
          experimental: true,
          parameters: [
            {
              name: "visibleSecurityState",
              description: "Security state information about the page.",
              $ref: "VisibleSecurityState",
            },
          ],
        },
        {
          name: "securityStateChanged",
          description:
            "The security state of the page changed. No longer being sent.",
          deprecated: true,
          parameters: [
            {
              name: "securityState",
              description: "Security state.",
              $ref: "SecurityState",
            },
            {
              name: "schemeIsCryptographic",
              description:
                "True if the page was loaded over cryptographic transport such as HTTPS.",
              deprecated: true,
              type: "boolean",
            },
            {
              name: "explanations",
              description:
                "Previously a list of explanations for the security state. Now always\nempty.",
              deprecated: true,
              type: "array",
              items: {
                $ref: "SecurityStateExplanation",
              },
            },
            {
              name: "insecureContentStatus",
              description: "Information about insecure content on the page.",
              deprecated: true,
              $ref: "InsecureContentStatus",
            },
            {
              name: "summary",
              description:
                "Overrides user-visible description of the state. Always omitted.",
              deprecated: true,
              optional: true,
              type: "string",
            },
          ],
        },
      ],
    },
    {
      domain: "ServiceWorker",
      experimental: true,
      dependencies: ["Target"],
      types: [
        {
          id: "RegistrationID",
          type: "string",
        },
        {
          id: "ServiceWorkerRegistration",
          description: "ServiceWorker registration.",
          type: "object",
          properties: [
            {
              name: "registrationId",
              $ref: "RegistrationID",
            },
            {
              name: "scopeURL",
              type: "string",
            },
            {
              name: "isDeleted",
              type: "boolean",
            },
          ],
        },
        {
          id: "ServiceWorkerVersionRunningStatus",
          type: "string",
          enum: ["stopped", "starting", "running", "stopping"],
        },
        {
          id: "ServiceWorkerVersionStatus",
          type: "string",
          enum: [
            "new",
            "installing",
            "installed",
            "activating",
            "activated",
            "redundant",
          ],
        },
        {
          id: "ServiceWorkerVersion",
          description: "ServiceWorker version.",
          type: "object",
          properties: [
            {
              name: "versionId",
              type: "string",
            },
            {
              name: "registrationId",
              $ref: "RegistrationID",
            },
            {
              name: "scriptURL",
              type: "string",
            },
            {
              name: "runningStatus",
              $ref: "ServiceWorkerVersionRunningStatus",
            },
            {
              name: "status",
              $ref: "ServiceWorkerVersionStatus",
            },
            {
              name: "scriptLastModified",
              description: "The Last-Modified header value of the main script.",
              optional: true,
              type: "number",
            },
            {
              name: "scriptResponseTime",
              description:
                "The time at which the response headers of the main script were received from the server.\nFor cached script it is the last time the cache entry was validated.",
              optional: true,
              type: "number",
            },
            {
              name: "controlledClients",
              optional: true,
              type: "array",
              items: {
                $ref: "Target.TargetID",
              },
            },
            {
              name: "targetId",
              optional: true,
              $ref: "Target.TargetID",
            },
          ],
        },
        {
          id: "ServiceWorkerErrorMessage",
          description: "ServiceWorker error message.",
          type: "object",
          properties: [
            {
              name: "errorMessage",
              type: "string",
            },
            {
              name: "registrationId",
              $ref: "RegistrationID",
            },
            {
              name: "versionId",
              type: "string",
            },
            {
              name: "sourceURL",
              type: "string",
            },
            {
              name: "lineNumber",
              type: "integer",
            },
            {
              name: "columnNumber",
              type: "integer",
            },
          ],
        },
      ],
      commands: [
        {
          name: "deliverPushMessage",
          parameters: [
            {
              name: "origin",
              type: "string",
            },
            {
              name: "registrationId",
              $ref: "RegistrationID",
            },
            {
              name: "data",
              type: "string",
            },
          ],
        },
        {
          name: "disable",
        },
        {
          name: "dispatchSyncEvent",
          parameters: [
            {
              name: "origin",
              type: "string",
            },
            {
              name: "registrationId",
              $ref: "RegistrationID",
            },
            {
              name: "tag",
              type: "string",
            },
            {
              name: "lastChance",
              type: "boolean",
            },
          ],
        },
        {
          name: "dispatchPeriodicSyncEvent",
          parameters: [
            {
              name: "origin",
              type: "string",
            },
            {
              name: "registrationId",
              $ref: "RegistrationID",
            },
            {
              name: "tag",
              type: "string",
            },
          ],
        },
        {
          name: "enable",
        },
        {
          name: "inspectWorker",
          parameters: [
            {
              name: "versionId",
              type: "string",
            },
          ],
        },
        {
          name: "setForceUpdateOnPageLoad",
          parameters: [
            {
              name: "forceUpdateOnPageLoad",
              type: "boolean",
            },
          ],
        },
        {
          name: "skipWaiting",
          parameters: [
            {
              name: "scopeURL",
              type: "string",
            },
          ],
        },
        {
          name: "startWorker",
          parameters: [
            {
              name: "scopeURL",
              type: "string",
            },
          ],
        },
        {
          name: "stopAllWorkers",
        },
        {
          name: "stopWorker",
          parameters: [
            {
              name: "versionId",
              type: "string",
            },
          ],
        },
        {
          name: "unregister",
          parameters: [
            {
              name: "scopeURL",
              type: "string",
            },
          ],
        },
        {
          name: "updateRegistration",
          parameters: [
            {
              name: "scopeURL",
              type: "string",
            },
          ],
        },
      ],
      events: [
        {
          name: "workerErrorReported",
          parameters: [
            {
              name: "errorMessage",
              $ref: "ServiceWorkerErrorMessage",
            },
          ],
        },
        {
          name: "workerRegistrationUpdated",
          parameters: [
            {
              name: "registrations",
              type: "array",
              items: {
                $ref: "ServiceWorkerRegistration",
              },
            },
          ],
        },
        {
          name: "workerVersionUpdated",
          parameters: [
            {
              name: "versions",
              type: "array",
              items: {
                $ref: "ServiceWorkerVersion",
              },
            },
          ],
        },
      ],
    },
    {
      domain: "Storage",
      experimental: true,
      dependencies: ["Browser", "Network"],
      types: [
        {
          id: "SerializedStorageKey",
          type: "string",
        },
        {
          id: "StorageType",
          description: "Enum of possible storage types.",
          type: "string",
          enum: [
            "appcache",
            "cookies",
            "file_systems",
            "indexeddb",
            "local_storage",
            "shader_cache",
            "websql",
            "service_workers",
            "cache_storage",
            "interest_groups",
            "shared_storage",
            "all",
            "other",
          ],
        },
        {
          id: "UsageForType",
          description: "Usage for a storage type.",
          type: "object",
          properties: [
            {
              name: "storageType",
              description: "Name of storage type.",
              $ref: "StorageType",
            },
            {
              name: "usage",
              description: "Storage usage (bytes).",
              type: "number",
            },
          ],
        },
        {
          id: "TrustTokens",
          description:
            "Pair of issuer origin and number of available (signed, but not used) Trust\nTokens from that issuer.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "issuerOrigin",
              type: "string",
            },
            {
              name: "count",
              type: "number",
            },
          ],
        },
        {
          id: "InterestGroupAccessType",
          description: "Enum of interest group access types.",
          type: "string",
          enum: ["join", "leave", "update", "loaded", "bid", "win"],
        },
        {
          id: "InterestGroupAd",
          description: "Ad advertising element inside an interest group.",
          type: "object",
          properties: [
            {
              name: "renderUrl",
              type: "string",
            },
            {
              name: "metadata",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "InterestGroupDetails",
          description: "The full details of an interest group.",
          type: "object",
          properties: [
            {
              name: "ownerOrigin",
              type: "string",
            },
            {
              name: "name",
              type: "string",
            },
            {
              name: "expirationTime",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "joiningOrigin",
              type: "string",
            },
            {
              name: "biddingUrl",
              optional: true,
              type: "string",
            },
            {
              name: "biddingWasmHelperUrl",
              optional: true,
              type: "string",
            },
            {
              name: "updateUrl",
              optional: true,
              type: "string",
            },
            {
              name: "trustedBiddingSignalsUrl",
              optional: true,
              type: "string",
            },
            {
              name: "trustedBiddingSignalsKeys",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "userBiddingSignals",
              optional: true,
              type: "string",
            },
            {
              name: "ads",
              type: "array",
              items: {
                $ref: "InterestGroupAd",
              },
            },
            {
              name: "adComponents",
              type: "array",
              items: {
                $ref: "InterestGroupAd",
              },
            },
          ],
        },
        {
          id: "SharedStorageAccessType",
          description: "Enum of shared storage access types.",
          type: "string",
          enum: [
            "documentAddModule",
            "documentSelectURL",
            "documentRun",
            "documentSet",
            "documentAppend",
            "documentDelete",
            "documentClear",
            "workletSet",
            "workletAppend",
            "workletDelete",
            "workletClear",
            "workletGet",
            "workletKeys",
            "workletEntries",
            "workletLength",
            "workletRemainingBudget",
          ],
        },
        {
          id: "SharedStorageEntry",
          description:
            "Struct for a single key-value pair in an origin's shared storage.",
          type: "object",
          properties: [
            {
              name: "key",
              type: "string",
            },
            {
              name: "value",
              type: "string",
            },
          ],
        },
        {
          id: "SharedStorageMetadata",
          description: "Details for an origin's shared storage.",
          type: "object",
          properties: [
            {
              name: "creationTime",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "length",
              type: "integer",
            },
            {
              name: "remainingBudget",
              type: "number",
            },
          ],
        },
        {
          id: "SharedStorageReportingMetadata",
          description:
            "Pair of reporting metadata details for a candidate URL for `selectURL()`.",
          type: "object",
          properties: [
            {
              name: "eventType",
              type: "string",
            },
            {
              name: "reportingUrl",
              type: "string",
            },
          ],
        },
        {
          id: "SharedStorageUrlWithMetadata",
          description: "Bundles a candidate URL with its reporting metadata.",
          type: "object",
          properties: [
            {
              name: "url",
              description: "Spec of candidate URL.",
              type: "string",
            },
            {
              name: "reportingMetadata",
              description: "Any associated reporting metadata.",
              type: "array",
              items: {
                $ref: "SharedStorageReportingMetadata",
              },
            },
          ],
        },
        {
          id: "SharedStorageAccessParams",
          description:
            "Bundles the parameters for shared storage access events whose\npresence/absence can vary according to SharedStorageAccessType.",
          type: "object",
          properties: [
            {
              name: "scriptSourceUrl",
              description:
                "Spec of the module script URL.\nPresent only for SharedStorageAccessType.documentAddModule.",
              optional: true,
              type: "string",
            },
            {
              name: "operationName",
              description:
                "Name of the registered operation to be run.\nPresent only for SharedStorageAccessType.documentRun and\nSharedStorageAccessType.documentSelectURL.",
              optional: true,
              type: "string",
            },
            {
              name: "serializedData",
              description:
                "The operation's serialized data in bytes (converted to a string).\nPresent only for SharedStorageAccessType.documentRun and\nSharedStorageAccessType.documentSelectURL.",
              optional: true,
              type: "string",
            },
            {
              name: "urlsWithMetadata",
              description:
                "Array of candidate URLs' specs, along with any associated metadata.\nPresent only for SharedStorageAccessType.documentSelectURL.",
              optional: true,
              type: "array",
              items: {
                $ref: "SharedStorageUrlWithMetadata",
              },
            },
            {
              name: "key",
              description:
                "Key for a specific entry in an origin's shared storage.\nPresent only for SharedStorageAccessType.documentSet,\nSharedStorageAccessType.documentAppend,\nSharedStorageAccessType.documentDelete,\nSharedStorageAccessType.workletSet,\nSharedStorageAccessType.workletAppend,\nSharedStorageAccessType.workletDelete, and\nSharedStorageAccessType.workletGet.",
              optional: true,
              type: "string",
            },
            {
              name: "value",
              description:
                "Value for a specific entry in an origin's shared storage.\nPresent only for SharedStorageAccessType.documentSet,\nSharedStorageAccessType.documentAppend,\nSharedStorageAccessType.workletSet, and\nSharedStorageAccessType.workletAppend.",
              optional: true,
              type: "string",
            },
            {
              name: "ignoreIfPresent",
              description:
                "Whether or not to set an entry for a key if that key is already present.\nPresent only for SharedStorageAccessType.documentSet and\nSharedStorageAccessType.workletSet.",
              optional: true,
              type: "boolean",
            },
          ],
        },
      ],
      commands: [
        {
          name: "getStorageKeyForFrame",
          description: "Returns a storage key given a frame id.",
          parameters: [
            {
              name: "frameId",
              $ref: "Page.FrameId",
            },
          ],
          returns: [
            {
              name: "storageKey",
              $ref: "SerializedStorageKey",
            },
          ],
        },
        {
          name: "clearDataForOrigin",
          description: "Clears storage for origin.",
          parameters: [
            {
              name: "origin",
              description: "Security origin.",
              type: "string",
            },
            {
              name: "storageTypes",
              description: "Comma separated list of StorageType to clear.",
              type: "string",
            },
          ],
        },
        {
          name: "clearDataForStorageKey",
          description: "Clears storage for storage key.",
          parameters: [
            {
              name: "storageKey",
              description: "Storage key.",
              type: "string",
            },
            {
              name: "storageTypes",
              description: "Comma separated list of StorageType to clear.",
              type: "string",
            },
          ],
        },
        {
          name: "getCookies",
          description: "Returns all browser cookies.",
          parameters: [
            {
              name: "browserContextId",
              description:
                "Browser context to use when called on the browser endpoint.",
              optional: true,
              $ref: "Browser.BrowserContextID",
            },
          ],
          returns: [
            {
              name: "cookies",
              description: "Array of cookie objects.",
              type: "array",
              items: {
                $ref: "Network.Cookie",
              },
            },
          ],
        },
        {
          name: "setCookies",
          description: "Sets given cookies.",
          parameters: [
            {
              name: "cookies",
              description: "Cookies to be set.",
              type: "array",
              items: {
                $ref: "Network.CookieParam",
              },
            },
            {
              name: "browserContextId",
              description:
                "Browser context to use when called on the browser endpoint.",
              optional: true,
              $ref: "Browser.BrowserContextID",
            },
          ],
        },
        {
          name: "clearCookies",
          description: "Clears cookies.",
          parameters: [
            {
              name: "browserContextId",
              description:
                "Browser context to use when called on the browser endpoint.",
              optional: true,
              $ref: "Browser.BrowserContextID",
            },
          ],
        },
        {
          name: "getUsageAndQuota",
          description: "Returns usage and quota in bytes.",
          parameters: [
            {
              name: "origin",
              description: "Security origin.",
              type: "string",
            },
          ],
          returns: [
            {
              name: "usage",
              description: "Storage usage (bytes).",
              type: "number",
            },
            {
              name: "quota",
              description: "Storage quota (bytes).",
              type: "number",
            },
            {
              name: "overrideActive",
              description:
                "Whether or not the origin has an active storage quota override",
              type: "boolean",
            },
            {
              name: "usageBreakdown",
              description: "Storage usage per type (bytes).",
              type: "array",
              items: {
                $ref: "UsageForType",
              },
            },
          ],
        },
        {
          name: "overrideQuotaForOrigin",
          description: "Override quota for the specified origin",
          experimental: true,
          parameters: [
            {
              name: "origin",
              description: "Security origin.",
              type: "string",
            },
            {
              name: "quotaSize",
              description:
                "The quota size (in bytes) to override the original quota with.\nIf this is called multiple times, the overridden quota will be equal to\nthe quotaSize provided in the final call. If this is called without\nspecifying a quotaSize, the quota will be reset to the default value for\nthe specified origin. If this is called multiple times with different\norigins, the override will be maintained for each origin until it is\ndisabled (called without a quotaSize).",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          name: "trackCacheStorageForOrigin",
          description:
            "Registers origin to be notified when an update occurs to its cache storage list.",
          parameters: [
            {
              name: "origin",
              description: "Security origin.",
              type: "string",
            },
          ],
        },
        {
          name: "trackCacheStorageForStorageKey",
          description:
            "Registers storage key to be notified when an update occurs to its cache storage list.",
          parameters: [
            {
              name: "storageKey",
              description: "Storage key.",
              type: "string",
            },
          ],
        },
        {
          name: "trackIndexedDBForOrigin",
          description:
            "Registers origin to be notified when an update occurs to its IndexedDB.",
          parameters: [
            {
              name: "origin",
              description: "Security origin.",
              type: "string",
            },
          ],
        },
        {
          name: "trackIndexedDBForStorageKey",
          description:
            "Registers storage key to be notified when an update occurs to its IndexedDB.",
          parameters: [
            {
              name: "storageKey",
              description: "Storage key.",
              type: "string",
            },
          ],
        },
        {
          name: "untrackCacheStorageForOrigin",
          description:
            "Unregisters origin from receiving notifications for cache storage.",
          parameters: [
            {
              name: "origin",
              description: "Security origin.",
              type: "string",
            },
          ],
        },
        {
          name: "untrackCacheStorageForStorageKey",
          description:
            "Unregisters storage key from receiving notifications for cache storage.",
          parameters: [
            {
              name: "storageKey",
              description: "Storage key.",
              type: "string",
            },
          ],
        },
        {
          name: "untrackIndexedDBForOrigin",
          description:
            "Unregisters origin from receiving notifications for IndexedDB.",
          parameters: [
            {
              name: "origin",
              description: "Security origin.",
              type: "string",
            },
          ],
        },
        {
          name: "untrackIndexedDBForStorageKey",
          description:
            "Unregisters storage key from receiving notifications for IndexedDB.",
          parameters: [
            {
              name: "storageKey",
              description: "Storage key.",
              type: "string",
            },
          ],
        },
        {
          name: "getTrustTokens",
          description:
            "Returns the number of stored Trust Tokens per issuer for the\ncurrent browsing context.",
          experimental: true,
          returns: [
            {
              name: "tokens",
              type: "array",
              items: {
                $ref: "TrustTokens",
              },
            },
          ],
        },
        {
          name: "clearTrustTokens",
          description:
            "Removes all Trust Tokens issued by the provided issuerOrigin.\nLeaves other stored data, including the issuer's Redemption Records, intact.",
          experimental: true,
          parameters: [
            {
              name: "issuerOrigin",
              type: "string",
            },
          ],
          returns: [
            {
              name: "didDeleteTokens",
              description: "True if any tokens were deleted, false otherwise.",
              type: "boolean",
            },
          ],
        },
        {
          name: "getInterestGroupDetails",
          description: "Gets details for a named interest group.",
          experimental: true,
          parameters: [
            {
              name: "ownerOrigin",
              type: "string",
            },
            {
              name: "name",
              type: "string",
            },
          ],
          returns: [
            {
              name: "details",
              $ref: "InterestGroupDetails",
            },
          ],
        },
        {
          name: "setInterestGroupTracking",
          description:
            "Enables/Disables issuing of interestGroupAccessed events.",
          experimental: true,
          parameters: [
            {
              name: "enable",
              type: "boolean",
            },
          ],
        },
        {
          name: "getSharedStorageMetadata",
          description: "Gets metadata for an origin's shared storage.",
          experimental: true,
          parameters: [
            {
              name: "ownerOrigin",
              type: "string",
            },
          ],
          returns: [
            {
              name: "metadata",
              $ref: "SharedStorageMetadata",
            },
          ],
        },
        {
          name: "getSharedStorageEntries",
          description: "Gets the entries in an given origin's shared storage.",
          experimental: true,
          parameters: [
            {
              name: "ownerOrigin",
              type: "string",
            },
          ],
          returns: [
            {
              name: "entries",
              type: "array",
              items: {
                $ref: "SharedStorageEntry",
              },
            },
          ],
        },
        {
          name: "setSharedStorageEntry",
          description:
            "Sets entry with `key` and `value` for a given origin's shared storage.",
          experimental: true,
          parameters: [
            {
              name: "ownerOrigin",
              type: "string",
            },
            {
              name: "key",
              type: "string",
            },
            {
              name: "value",
              type: "string",
            },
            {
              name: "ignoreIfPresent",
              description:
                "If `ignoreIfPresent` is included and true, then only sets the entry if\n`key` doesn't already exist.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "deleteSharedStorageEntry",
          description:
            "Deletes entry for `key` (if it exists) for a given origin's shared storage.",
          experimental: true,
          parameters: [
            {
              name: "ownerOrigin",
              type: "string",
            },
            {
              name: "key",
              type: "string",
            },
          ],
        },
        {
          name: "clearSharedStorageEntries",
          description:
            "Clears all entries for a given origin's shared storage.",
          experimental: true,
          parameters: [
            {
              name: "ownerOrigin",
              type: "string",
            },
          ],
        },
        {
          name: "resetSharedStorageBudget",
          description:
            "Resets the budget for `ownerOrigin` by clearing all budget withdrawals.",
          experimental: true,
          parameters: [
            {
              name: "ownerOrigin",
              type: "string",
            },
          ],
        },
        {
          name: "setSharedStorageTracking",
          description:
            "Enables/disables issuing of sharedStorageAccessed events.",
          experimental: true,
          parameters: [
            {
              name: "enable",
              type: "boolean",
            },
          ],
        },
      ],
      events: [
        {
          name: "cacheStorageContentUpdated",
          description: "A cache's contents have been modified.",
          parameters: [
            {
              name: "origin",
              description: "Origin to update.",
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key to update.",
              type: "string",
            },
            {
              name: "cacheName",
              description: "Name of cache in origin.",
              type: "string",
            },
          ],
        },
        {
          name: "cacheStorageListUpdated",
          description: "A cache has been added/deleted.",
          parameters: [
            {
              name: "origin",
              description: "Origin to update.",
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key to update.",
              type: "string",
            },
          ],
        },
        {
          name: "indexedDBContentUpdated",
          description: "The origin's IndexedDB object store has been modified.",
          parameters: [
            {
              name: "origin",
              description: "Origin to update.",
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key to update.",
              type: "string",
            },
            {
              name: "databaseName",
              description: "Database to update.",
              type: "string",
            },
            {
              name: "objectStoreName",
              description: "ObjectStore to update.",
              type: "string",
            },
          ],
        },
        {
          name: "indexedDBListUpdated",
          description:
            "The origin's IndexedDB database list has been modified.",
          parameters: [
            {
              name: "origin",
              description: "Origin to update.",
              type: "string",
            },
            {
              name: "storageKey",
              description: "Storage key to update.",
              type: "string",
            },
          ],
        },
        {
          name: "interestGroupAccessed",
          description:
            "One of the interest groups was accessed by the associated page.",
          parameters: [
            {
              name: "accessTime",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "type",
              $ref: "InterestGroupAccessType",
            },
            {
              name: "ownerOrigin",
              type: "string",
            },
            {
              name: "name",
              type: "string",
            },
          ],
        },
        {
          name: "sharedStorageAccessed",
          description:
            "Shared storage was accessed by the associated page.\nThe following parameters are included in all events.",
          parameters: [
            {
              name: "accessTime",
              description: "Time of the access.",
              $ref: "Network.TimeSinceEpoch",
            },
            {
              name: "type",
              description:
                "Enum value indicating the Shared Storage API method invoked.",
              $ref: "SharedStorageAccessType",
            },
            {
              name: "mainFrameId",
              description:
                "DevTools Frame Token for the primary frame tree's root.",
              $ref: "Page.FrameId",
            },
            {
              name: "ownerOrigin",
              description:
                "Serialized origin for the context that invoked the Shared Storage API.",
              type: "string",
            },
            {
              name: "params",
              description:
                "The sub-parameters warapped by `params` are all optional and their\npresence/absence depends on `type`.",
              $ref: "SharedStorageAccessParams",
            },
          ],
        },
      ],
    },
    {
      domain: "SystemInfo",
      description:
        "The SystemInfo domain defines methods and events for querying low-level system information.",
      experimental: true,
      types: [
        {
          id: "GPUDevice",
          description: "Describes a single graphics processor (GPU).",
          type: "object",
          properties: [
            {
              name: "vendorId",
              description:
                "PCI ID of the GPU vendor, if available; 0 otherwise.",
              type: "number",
            },
            {
              name: "deviceId",
              description:
                "PCI ID of the GPU device, if available; 0 otherwise.",
              type: "number",
            },
            {
              name: "subSysId",
              description: "Sub sys ID of the GPU, only available on Windows.",
              optional: true,
              type: "number",
            },
            {
              name: "revision",
              description: "Revision of the GPU, only available on Windows.",
              optional: true,
              type: "number",
            },
            {
              name: "vendorString",
              description:
                "String description of the GPU vendor, if the PCI ID is not available.",
              type: "string",
            },
            {
              name: "deviceString",
              description:
                "String description of the GPU device, if the PCI ID is not available.",
              type: "string",
            },
            {
              name: "driverVendor",
              description: "String description of the GPU driver vendor.",
              type: "string",
            },
            {
              name: "driverVersion",
              description: "String description of the GPU driver version.",
              type: "string",
            },
          ],
        },
        {
          id: "Size",
          description:
            "Describes the width and height dimensions of an entity.",
          type: "object",
          properties: [
            {
              name: "width",
              description: "Width in pixels.",
              type: "integer",
            },
            {
              name: "height",
              description: "Height in pixels.",
              type: "integer",
            },
          ],
        },
        {
          id: "VideoDecodeAcceleratorCapability",
          description:
            "Describes a supported video decoding profile with its associated minimum and\nmaximum resolutions.",
          type: "object",
          properties: [
            {
              name: "profile",
              description:
                "Video codec profile that is supported, e.g. VP9 Profile 2.",
              type: "string",
            },
            {
              name: "maxResolution",
              description:
                "Maximum video dimensions in pixels supported for this |profile|.",
              $ref: "Size",
            },
            {
              name: "minResolution",
              description:
                "Minimum video dimensions in pixels supported for this |profile|.",
              $ref: "Size",
            },
          ],
        },
        {
          id: "VideoEncodeAcceleratorCapability",
          description:
            "Describes a supported video encoding profile with its associated maximum\nresolution and maximum framerate.",
          type: "object",
          properties: [
            {
              name: "profile",
              description:
                "Video codec profile that is supported, e.g H264 Main.",
              type: "string",
            },
            {
              name: "maxResolution",
              description:
                "Maximum video dimensions in pixels supported for this |profile|.",
              $ref: "Size",
            },
            {
              name: "maxFramerateNumerator",
              description:
                "Maximum encoding framerate in frames per second supported for this\n|profile|, as fraction's numerator and denominator, e.g. 24/1 fps,\n24000/1001 fps, etc.",
              type: "integer",
            },
            {
              name: "maxFramerateDenominator",
              type: "integer",
            },
          ],
        },
        {
          id: "SubsamplingFormat",
          description: "YUV subsampling type of the pixels of a given image.",
          type: "string",
          enum: ["yuv420", "yuv422", "yuv444"],
        },
        {
          id: "ImageType",
          description: "Image format of a given image.",
          type: "string",
          enum: ["jpeg", "webp", "unknown"],
        },
        {
          id: "ImageDecodeAcceleratorCapability",
          description:
            "Describes a supported image decoding profile with its associated minimum and\nmaximum resolutions and subsampling.",
          type: "object",
          properties: [
            {
              name: "imageType",
              description: "Image coded, e.g. Jpeg.",
              $ref: "ImageType",
            },
            {
              name: "maxDimensions",
              description:
                "Maximum supported dimensions of the image in pixels.",
              $ref: "Size",
            },
            {
              name: "minDimensions",
              description:
                "Minimum supported dimensions of the image in pixels.",
              $ref: "Size",
            },
            {
              name: "subsamplings",
              description:
                "Optional array of supported subsampling formats, e.g. 4:2:0, if known.",
              type: "array",
              items: {
                $ref: "SubsamplingFormat",
              },
            },
          ],
        },
        {
          id: "GPUInfo",
          description: "Provides information about the GPU(s) on the system.",
          type: "object",
          properties: [
            {
              name: "devices",
              description:
                "The graphics devices on the system. Element 0 is the primary GPU.",
              type: "array",
              items: {
                $ref: "GPUDevice",
              },
            },
            {
              name: "auxAttributes",
              description:
                "An optional dictionary of additional GPU related attributes.",
              optional: true,
              type: "object",
            },
            {
              name: "featureStatus",
              description:
                "An optional dictionary of graphics features and their status.",
              optional: true,
              type: "object",
            },
            {
              name: "driverBugWorkarounds",
              description: "An optional array of GPU driver bug workarounds.",
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "videoDecoding",
              description: "Supported accelerated video decoding capabilities.",
              type: "array",
              items: {
                $ref: "VideoDecodeAcceleratorCapability",
              },
            },
            {
              name: "videoEncoding",
              description: "Supported accelerated video encoding capabilities.",
              type: "array",
              items: {
                $ref: "VideoEncodeAcceleratorCapability",
              },
            },
            {
              name: "imageDecoding",
              description: "Supported accelerated image decoding capabilities.",
              type: "array",
              items: {
                $ref: "ImageDecodeAcceleratorCapability",
              },
            },
          ],
        },
        {
          id: "ProcessInfo",
          description: "Represents process info.",
          type: "object",
          properties: [
            {
              name: "type",
              description: "Specifies process type.",
              type: "string",
            },
            {
              name: "id",
              description: "Specifies process id.",
              type: "integer",
            },
            {
              name: "cpuTime",
              description:
                "Specifies cumulative CPU usage in seconds across all threads of the\nprocess since the process start.",
              type: "number",
            },
          ],
        },
      ],
      commands: [
        {
          name: "getInfo",
          description: "Returns information about the system.",
          returns: [
            {
              name: "gpu",
              description: "Information about the GPUs on the system.",
              $ref: "GPUInfo",
            },
            {
              name: "modelName",
              description:
                "A platform-dependent description of the model of the machine. On Mac OS, this is, for\nexample, 'MacBookPro'. Will be the empty string if not supported.",
              type: "string",
            },
            {
              name: "modelVersion",
              description:
                "A platform-dependent description of the version of the machine. On Mac OS, this is, for\nexample, '10.1'. Will be the empty string if not supported.",
              type: "string",
            },
            {
              name: "commandLine",
              description:
                "The command line string used to launch the browser. Will be the empty string if not\nsupported.",
              type: "string",
            },
          ],
        },
        {
          name: "getFeatureState",
          description: "Returns information about the feature state.",
          parameters: [
            {
              name: "featureState",
              type: "string",
            },
          ],
          returns: [
            {
              name: "featureEnabled",
              type: "boolean",
            },
          ],
        },
        {
          name: "getProcessInfo",
          description: "Returns information about all running processes.",
          returns: [
            {
              name: "processInfo",
              description: "An array of process info blocks.",
              type: "array",
              items: {
                $ref: "ProcessInfo",
              },
            },
          ],
        },
      ],
    },
    {
      domain: "Target",
      description:
        "Supports additional targets discovery and allows to attach to them.",
      types: [
        {
          id: "TargetID",
          type: "string",
        },
        {
          id: "SessionID",
          description: "Unique identifier of attached debugging session.",
          type: "string",
        },
        {
          id: "TargetInfo",
          type: "object",
          properties: [
            {
              name: "targetId",
              $ref: "TargetID",
            },
            {
              name: "type",
              type: "string",
            },
            {
              name: "title",
              type: "string",
            },
            {
              name: "url",
              type: "string",
            },
            {
              name: "attached",
              description: "Whether the target has an attached client.",
              type: "boolean",
            },
            {
              name: "openerId",
              description: "Opener target Id",
              optional: true,
              $ref: "TargetID",
            },
            {
              name: "canAccessOpener",
              description:
                "Whether the target has access to the originating window.",
              experimental: true,
              type: "boolean",
            },
            {
              name: "openerFrameId",
              description:
                "Frame id of originating window (is only set if target has an opener).",
              experimental: true,
              optional: true,
              $ref: "Page.FrameId",
            },
            {
              name: "browserContextId",
              experimental: true,
              optional: true,
              $ref: "Browser.BrowserContextID",
            },
            {
              name: "subtype",
              description:
                'Provides additional details for specific target types. For example, for\nthe type of "page", this may be set to "portal" or "prerender".',
              experimental: true,
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "FilterEntry",
          description:
            "A filter used by target query/discovery/auto-attach operations.",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "exclude",
              description:
                "If set, causes exclusion of mathcing targets from the list.",
              optional: true,
              type: "boolean",
            },
            {
              name: "type",
              description: "If not present, matches any type.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          id: "TargetFilter",
          description:
            'The entries in TargetFilter are matched sequentially against targets and\nthe first entry that matches determines if the target is included or not,\ndepending on the value of `exclude` field in the entry.\nIf filter is not specified, the one assumed is\n[{type: "browser", exclude: true}, {type: "tab", exclude: true}, {}]\n(i.e. include everything but `browser` and `tab`).',
          experimental: true,
          type: "array",
          items: {
            $ref: "FilterEntry",
          },
        },
        {
          id: "RemoteLocation",
          experimental: true,
          type: "object",
          properties: [
            {
              name: "host",
              type: "string",
            },
            {
              name: "port",
              type: "integer",
            },
          ],
        },
      ],
      commands: [
        {
          name: "activateTarget",
          description: "Activates (focuses) the target.",
          parameters: [
            {
              name: "targetId",
              $ref: "TargetID",
            },
          ],
        },
        {
          name: "attachToTarget",
          description: "Attaches to the target with given id.",
          parameters: [
            {
              name: "targetId",
              $ref: "TargetID",
            },
            {
              name: "flatten",
              description:
                'Enables "flat" access to the session via specifying sessionId attribute in the commands.\nWe plan to make this the default, deprecate non-flattened mode,\nand eventually retire it. See crbug.com/991325.',
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "sessionId",
              description: "Id assigned to the session.",
              $ref: "SessionID",
            },
          ],
        },
        {
          name: "attachToBrowserTarget",
          description:
            "Attaches to the browser target, only uses flat sessionId mode.",
          experimental: true,
          returns: [
            {
              name: "sessionId",
              description: "Id assigned to the session.",
              $ref: "SessionID",
            },
          ],
        },
        {
          name: "closeTarget",
          description:
            "Closes the target. If the target is a page that gets closed too.",
          parameters: [
            {
              name: "targetId",
              $ref: "TargetID",
            },
          ],
          returns: [
            {
              name: "success",
              description:
                "Always set to true. If an error occurs, the response indicates protocol error.",
              deprecated: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "exposeDevToolsProtocol",
          description:
            "Inject object to the target's main frame that provides a communication\nchannel with browser target.\n\nInjected object will be available as `window[bindingName]`.\n\nThe object has the follwing API:\n- `binding.send(json)` - a method to send messages over the remote debugging protocol\n- `binding.onmessage = json => handleMessage(json)` - a callback that will be called for the protocol notifications and command responses.",
          experimental: true,
          parameters: [
            {
              name: "targetId",
              $ref: "TargetID",
            },
            {
              name: "bindingName",
              description: "Binding name, 'cdp' if not specified.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "createBrowserContext",
          description:
            "Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than\none.",
          experimental: true,
          parameters: [
            {
              name: "disposeOnDetach",
              description:
                "If specified, disposes this context when debugging session disconnects.",
              optional: true,
              type: "boolean",
            },
            {
              name: "proxyServer",
              description:
                "Proxy server, similar to the one passed to --proxy-server",
              optional: true,
              type: "string",
            },
            {
              name: "proxyBypassList",
              description:
                "Proxy bypass list, similar to the one passed to --proxy-bypass-list",
              optional: true,
              type: "string",
            },
            {
              name: "originsWithUniversalNetworkAccess",
              description:
                "An optional list of origins to grant unlimited cross-origin access to.\nParts of the URL other than those constituting origin are ignored.",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
          returns: [
            {
              name: "browserContextId",
              description: "The id of the context created.",
              $ref: "Browser.BrowserContextID",
            },
          ],
        },
        {
          name: "getBrowserContexts",
          description:
            "Returns all browser contexts created with `Target.createBrowserContext` method.",
          experimental: true,
          returns: [
            {
              name: "browserContextIds",
              description: "An array of browser context ids.",
              type: "array",
              items: {
                $ref: "Browser.BrowserContextID",
              },
            },
          ],
        },
        {
          name: "createTarget",
          description: "Creates a new page.",
          parameters: [
            {
              name: "url",
              description:
                "The initial URL the page will be navigated to. An empty string indicates about:blank.",
              type: "string",
            },
            {
              name: "width",
              description: "Frame width in DIP (headless chrome only).",
              optional: true,
              type: "integer",
            },
            {
              name: "height",
              description: "Frame height in DIP (headless chrome only).",
              optional: true,
              type: "integer",
            },
            {
              name: "browserContextId",
              description: "The browser context to create the page in.",
              experimental: true,
              optional: true,
              $ref: "Browser.BrowserContextID",
            },
            {
              name: "enableBeginFrameControl",
              description:
                "Whether BeginFrames for this target will be controlled via DevTools (headless chrome only,\nnot supported on MacOS yet, false by default).",
              experimental: true,
              optional: true,
              type: "boolean",
            },
            {
              name: "newWindow",
              description:
                "Whether to create a new Window or Tab (chrome-only, false by default).",
              optional: true,
              type: "boolean",
            },
            {
              name: "background",
              description:
                "Whether to create the target in background or foreground (chrome-only,\nfalse by default).",
              optional: true,
              type: "boolean",
            },
            {
              name: "forTab",
              description: 'Whether to create the target of type "tab".',
              experimental: true,
              optional: true,
              type: "boolean",
            },
          ],
          returns: [
            {
              name: "targetId",
              description: "The id of the page opened.",
              $ref: "TargetID",
            },
          ],
        },
        {
          name: "detachFromTarget",
          description: "Detaches session with given id.",
          parameters: [
            {
              name: "sessionId",
              description: "Session to detach.",
              optional: true,
              $ref: "SessionID",
            },
            {
              name: "targetId",
              description: "Deprecated.",
              deprecated: true,
              optional: true,
              $ref: "TargetID",
            },
          ],
        },
        {
          name: "disposeBrowserContext",
          description:
            "Deletes a BrowserContext. All the belonging pages will be closed without calling their\nbeforeunload hooks.",
          experimental: true,
          parameters: [
            {
              name: "browserContextId",
              $ref: "Browser.BrowserContextID",
            },
          ],
        },
        {
          name: "getTargetInfo",
          description: "Returns information about a target.",
          experimental: true,
          parameters: [
            {
              name: "targetId",
              optional: true,
              $ref: "TargetID",
            },
          ],
          returns: [
            {
              name: "targetInfo",
              $ref: "TargetInfo",
            },
          ],
        },
        {
          name: "getTargets",
          description: "Retrieves a list of available targets.",
          parameters: [
            {
              name: "filter",
              description:
                "Only targets matching filter will be reported. If filter is not specified\nand target discovery is currently enabled, a filter used for target discovery\nis used for consistency.",
              experimental: true,
              optional: true,
              $ref: "TargetFilter",
            },
          ],
          returns: [
            {
              name: "targetInfos",
              description: "The list of targets.",
              type: "array",
              items: {
                $ref: "TargetInfo",
              },
            },
          ],
        },
        {
          name: "sendMessageToTarget",
          description:
            "Sends protocol message over session with given id.\nConsider using flat mode instead; see commands attachToTarget, setAutoAttach,\nand crbug.com/991325.",
          deprecated: true,
          parameters: [
            {
              name: "message",
              type: "string",
            },
            {
              name: "sessionId",
              description: "Identifier of the session.",
              optional: true,
              $ref: "SessionID",
            },
            {
              name: "targetId",
              description: "Deprecated.",
              deprecated: true,
              optional: true,
              $ref: "TargetID",
            },
          ],
        },
        {
          name: "setAutoAttach",
          description:
            "Controls whether to automatically attach to new targets which are considered to be related to\nthis one. When turned on, attaches to all existing related targets as well. When turned off,\nautomatically detaches from all currently attached targets.\nThis also clears all targets added by `autoAttachRelated` from the list of targets to watch\nfor creation of related targets.",
          experimental: true,
          parameters: [
            {
              name: "autoAttach",
              description: "Whether to auto-attach to related targets.",
              type: "boolean",
            },
            {
              name: "waitForDebuggerOnStart",
              description:
                "Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`\nto run paused targets.",
              type: "boolean",
            },
            {
              name: "flatten",
              description:
                'Enables "flat" access to the session via specifying sessionId attribute in the commands.\nWe plan to make this the default, deprecate non-flattened mode,\nand eventually retire it. See crbug.com/991325.',
              optional: true,
              type: "boolean",
            },
            {
              name: "filter",
              description: "Only targets matching filter will be attached.",
              experimental: true,
              optional: true,
              $ref: "TargetFilter",
            },
          ],
        },
        {
          name: "autoAttachRelated",
          description:
            "Adds the specified target to the list of targets that will be monitored for any related target\ncreation (such as child frames, child workers and new versions of service worker) and reported\nthrough `attachedToTarget`. The specified target is also auto-attached.\nThis cancels the effect of any previous `setAutoAttach` and is also cancelled by subsequent\n`setAutoAttach`. Only available at the Browser target.",
          experimental: true,
          parameters: [
            {
              name: "targetId",
              $ref: "TargetID",
            },
            {
              name: "waitForDebuggerOnStart",
              description:
                "Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`\nto run paused targets.",
              type: "boolean",
            },
            {
              name: "filter",
              description: "Only targets matching filter will be attached.",
              experimental: true,
              optional: true,
              $ref: "TargetFilter",
            },
          ],
        },
        {
          name: "setDiscoverTargets",
          description:
            "Controls whether to discover available targets and notify via\n`targetCreated/targetInfoChanged/targetDestroyed` events.",
          parameters: [
            {
              name: "discover",
              description: "Whether to discover available targets.",
              type: "boolean",
            },
            {
              name: "filter",
              description:
                "Only targets matching filter will be attached. If `discover` is false,\n`filter` must be omitted or empty.",
              experimental: true,
              optional: true,
              $ref: "TargetFilter",
            },
          ],
        },
        {
          name: "setRemoteLocations",
          description:
            "Enables target discovery for the specified locations, when `setDiscoverTargets` was set to\n`true`.",
          experimental: true,
          parameters: [
            {
              name: "locations",
              description: "List of remote locations.",
              type: "array",
              items: {
                $ref: "RemoteLocation",
              },
            },
          ],
        },
      ],
      events: [
        {
          name: "attachedToTarget",
          description:
            "Issued when attached to target because of auto-attach or `attachToTarget` command.",
          experimental: true,
          parameters: [
            {
              name: "sessionId",
              description:
                "Identifier assigned to the session used to send/receive messages.",
              $ref: "SessionID",
            },
            {
              name: "targetInfo",
              $ref: "TargetInfo",
            },
            {
              name: "waitingForDebugger",
              type: "boolean",
            },
          ],
        },
        {
          name: "detachedFromTarget",
          description:
            "Issued when detached from target for any reason (including `detachFromTarget` command). Can be\nissued multiple times per target if multiple sessions have been attached to it.",
          experimental: true,
          parameters: [
            {
              name: "sessionId",
              description: "Detached session identifier.",
              $ref: "SessionID",
            },
            {
              name: "targetId",
              description: "Deprecated.",
              deprecated: true,
              optional: true,
              $ref: "TargetID",
            },
          ],
        },
        {
          name: "receivedMessageFromTarget",
          description:
            "Notifies about a new protocol message received from the session (as reported in\n`attachedToTarget` event).",
          parameters: [
            {
              name: "sessionId",
              description: "Identifier of a session which sends a message.",
              $ref: "SessionID",
            },
            {
              name: "message",
              type: "string",
            },
            {
              name: "targetId",
              description: "Deprecated.",
              deprecated: true,
              optional: true,
              $ref: "TargetID",
            },
          ],
        },
        {
          name: "targetCreated",
          description: "Issued when a possible inspection target is created.",
          parameters: [
            {
              name: "targetInfo",
              $ref: "TargetInfo",
            },
          ],
        },
        {
          name: "targetDestroyed",
          description: "Issued when a target is destroyed.",
          parameters: [
            {
              name: "targetId",
              $ref: "TargetID",
            },
          ],
        },
        {
          name: "targetCrashed",
          description: "Issued when a target has crashed.",
          parameters: [
            {
              name: "targetId",
              $ref: "TargetID",
            },
            {
              name: "status",
              description: "Termination status type.",
              type: "string",
            },
            {
              name: "errorCode",
              description: "Termination error code.",
              type: "integer",
            },
          ],
        },
        {
          name: "targetInfoChanged",
          description:
            "Issued when some information about a target has changed. This only happens between\n`targetCreated` and `targetDestroyed`.",
          parameters: [
            {
              name: "targetInfo",
              $ref: "TargetInfo",
            },
          ],
        },
      ],
    },
    {
      domain: "Tethering",
      description:
        "The Tethering domain defines methods and events for browser port binding.",
      experimental: true,
      commands: [
        {
          name: "bind",
          description: "Request browser port binding.",
          parameters: [
            {
              name: "port",
              description: "Port number to bind.",
              type: "integer",
            },
          ],
        },
        {
          name: "unbind",
          description: "Request browser port unbinding.",
          parameters: [
            {
              name: "port",
              description: "Port number to unbind.",
              type: "integer",
            },
          ],
        },
      ],
      events: [
        {
          name: "accepted",
          description:
            "Informs that port was successfully bound and got a specified connection id.",
          parameters: [
            {
              name: "port",
              description: "Port number that was successfully bound.",
              type: "integer",
            },
            {
              name: "connectionId",
              description: "Connection id to be used.",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      domain: "Tracing",
      experimental: true,
      dependencies: ["IO"],
      types: [
        {
          id: "MemoryDumpConfig",
          description:
            'Configuration for memory dump. Used only when "memory-infra" category is enabled.',
          type: "object",
        },
        {
          id: "TraceConfig",
          type: "object",
          properties: [
            {
              name: "recordMode",
              description: "Controls how the trace buffer stores data.",
              optional: true,
              type: "string",
              enum: [
                "recordUntilFull",
                "recordContinuously",
                "recordAsMuchAsPossible",
                "echoToConsole",
              ],
            },
            {
              name: "traceBufferSizeInKb",
              description:
                "Size of the trace buffer in kilobytes. If not specified or zero is passed, a default value\nof 200 MB would be used.",
              optional: true,
              type: "number",
            },
            {
              name: "enableSampling",
              description: "Turns on JavaScript stack sampling.",
              optional: true,
              type: "boolean",
            },
            {
              name: "enableSystrace",
              description: "Turns on system tracing.",
              optional: true,
              type: "boolean",
            },
            {
              name: "enableArgumentFilter",
              description: "Turns on argument filter.",
              optional: true,
              type: "boolean",
            },
            {
              name: "includedCategories",
              description: "Included category filters.",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "excludedCategories",
              description: "Excluded category filters.",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "syntheticDelays",
              description: "Configuration to synthesize the delays in tracing.",
              optional: true,
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              name: "memoryDumpConfig",
              description:
                'Configuration for memory dump triggers. Used only when "memory-infra" category is enabled.',
              optional: true,
              $ref: "MemoryDumpConfig",
            },
          ],
        },
        {
          id: "StreamFormat",
          description:
            "Data format of a trace. Can be either the legacy JSON format or the\nprotocol buffer format. Note that the JSON format will be deprecated soon.",
          type: "string",
          enum: ["json", "proto"],
        },
        {
          id: "StreamCompression",
          description:
            "Compression type to use for traces returned via streams.",
          type: "string",
          enum: ["none", "gzip"],
        },
        {
          id: "MemoryDumpLevelOfDetail",
          description:
            "Details exposed when memory request explicitly declared.\nKeep consistent with memory_dump_request_args.h and\nmemory_instrumentation.mojom",
          type: "string",
          enum: ["background", "light", "detailed"],
        },
        {
          id: "TracingBackend",
          description:
            "Backend type to use for tracing. `chrome` uses the Chrome-integrated\ntracing service and is supported on all platforms. `system` is only\nsupported on Chrome OS and uses the Perfetto system tracing service.\n`auto` chooses `system` when the perfettoConfig provided to Tracing.start\nspecifies at least one non-Chrome data source; otherwise uses `chrome`.",
          type: "string",
          enum: ["auto", "chrome", "system"],
        },
      ],
      commands: [
        {
          name: "end",
          description: "Stop trace events collection.",
        },
        {
          name: "getCategories",
          description: "Gets supported tracing categories.",
          returns: [
            {
              name: "categories",
              description: "A list of supported tracing categories.",
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
        {
          name: "recordClockSyncMarker",
          description: "Record a clock sync marker in the trace.",
          parameters: [
            {
              name: "syncId",
              description: "The ID of this clock sync marker",
              type: "string",
            },
          ],
        },
        {
          name: "requestMemoryDump",
          description: "Request a global memory dump.",
          parameters: [
            {
              name: "deterministic",
              description:
                "Enables more deterministic results by forcing garbage collection",
              optional: true,
              type: "boolean",
            },
            {
              name: "levelOfDetail",
              description:
                'Specifies level of details in memory dump. Defaults to "detailed".',
              optional: true,
              $ref: "MemoryDumpLevelOfDetail",
            },
          ],
          returns: [
            {
              name: "dumpGuid",
              description: "GUID of the resulting global memory dump.",
              type: "string",
            },
            {
              name: "success",
              description: "True iff the global memory dump succeeded.",
              type: "boolean",
            },
          ],
        },
        {
          name: "start",
          description: "Start trace events collection.",
          parameters: [
            {
              name: "categories",
              description: "Category/tag filter",
              deprecated: true,
              optional: true,
              type: "string",
            },
            {
              name: "options",
              description: "Tracing options",
              deprecated: true,
              optional: true,
              type: "string",
            },
            {
              name: "bufferUsageReportingInterval",
              description:
                "If set, the agent will issue bufferUsage events at this interval, specified in milliseconds",
              optional: true,
              type: "number",
            },
            {
              name: "transferMode",
              description:
                "Whether to report trace events as series of dataCollected events or to save trace to a\nstream (defaults to `ReportEvents`).",
              optional: true,
              type: "string",
              enum: ["ReportEvents", "ReturnAsStream"],
            },
            {
              name: "streamFormat",
              description:
                "Trace data format to use. This only applies when using `ReturnAsStream`\ntransfer mode (defaults to `json`).",
              optional: true,
              $ref: "StreamFormat",
            },
            {
              name: "streamCompression",
              description:
                "Compression format to use. This only applies when using `ReturnAsStream`\ntransfer mode (defaults to `none`)",
              optional: true,
              $ref: "StreamCompression",
            },
            {
              name: "traceConfig",
              optional: true,
              $ref: "TraceConfig",
            },
            {
              name: "perfettoConfig",
              description:
                "Base64-encoded serialized perfetto.protos.TraceConfig protobuf message\nWhen specified, the parameters `categories`, `options`, `traceConfig`\nare ignored. (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
            {
              name: "tracingBackend",
              description: "Backend type (defaults to `auto`)",
              optional: true,
              $ref: "TracingBackend",
            },
          ],
        },
      ],
      events: [
        {
          name: "bufferUsage",
          parameters: [
            {
              name: "percentFull",
              description:
                "A number in range [0..1] that indicates the used size of event buffer as a fraction of its\ntotal size.",
              optional: true,
              type: "number",
            },
            {
              name: "eventCount",
              description: "An approximate number of events in the trace log.",
              optional: true,
              type: "number",
            },
            {
              name: "value",
              description:
                "A number in range [0..1] that indicates the used size of event buffer as a fraction of its\ntotal size.",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          name: "dataCollected",
          description:
            "Contains a bucket of collected trace events. When tracing is stopped collected events will be\nsent as a sequence of dataCollected events followed by tracingComplete event.",
          parameters: [
            {
              name: "value",
              type: "array",
              items: {
                type: "object",
              },
            },
          ],
        },
        {
          name: "tracingComplete",
          description:
            "Signals that tracing is stopped and there is no trace buffers pending flush, all data were\ndelivered via dataCollected events.",
          parameters: [
            {
              name: "dataLossOccurred",
              description:
                "Indicates whether some trace data is known to have been lost, e.g. because the trace ring\nbuffer wrapped around.",
              type: "boolean",
            },
            {
              name: "stream",
              description:
                "A handle of the stream that holds resulting trace data.",
              optional: true,
              $ref: "IO.StreamHandle",
            },
            {
              name: "traceFormat",
              description: "Trace data format of returned stream.",
              optional: true,
              $ref: "StreamFormat",
            },
            {
              name: "streamCompression",
              description: "Compression format of returned stream.",
              optional: true,
              $ref: "StreamCompression",
            },
          ],
        },
      ],
    },
    {
      domain: "Fetch",
      description:
        "A domain for letting clients substitute browser's network layer with client code.",
      dependencies: ["Network", "IO", "Page"],
      types: [
        {
          id: "RequestId",
          description: "Unique request identifier.",
          type: "string",
        },
        {
          id: "RequestStage",
          description:
            "Stages of the request to handle. Request will intercept before the request is\nsent. Response will intercept after the response is received (but before response\nbody is received).",
          type: "string",
          enum: ["Request", "Response"],
        },
        {
          id: "RequestPattern",
          type: "object",
          properties: [
            {
              name: "urlPattern",
              description:
                "Wildcards (`'*'` -> zero or more, `'?'` -> exactly one) are allowed. Escape character is\nbackslash. Omitting is equivalent to `\"*\"`.",
              optional: true,
              type: "string",
            },
            {
              name: "resourceType",
              description:
                "If set, only requests for matching resource types will be intercepted.",
              optional: true,
              $ref: "Network.ResourceType",
            },
            {
              name: "requestStage",
              description:
                "Stage at which to begin intercepting requests. Default is Request.",
              optional: true,
              $ref: "RequestStage",
            },
          ],
        },
        {
          id: "HeaderEntry",
          description: "Response HTTP header entry",
          type: "object",
          properties: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "value",
              type: "string",
            },
          ],
        },
        {
          id: "AuthChallenge",
          description:
            "Authorization challenge for HTTP status code 401 or 407.",
          type: "object",
          properties: [
            {
              name: "source",
              description: "Source of the authentication challenge.",
              optional: true,
              type: "string",
              enum: ["Server", "Proxy"],
            },
            {
              name: "origin",
              description: "Origin of the challenger.",
              type: "string",
            },
            {
              name: "scheme",
              description:
                "The authentication scheme used, such as basic or digest",
              type: "string",
            },
            {
              name: "realm",
              description: "The realm of the challenge. May be empty.",
              type: "string",
            },
          ],
        },
        {
          id: "AuthChallengeResponse",
          description: "Response to an AuthChallenge.",
          type: "object",
          properties: [
            {
              name: "response",
              description:
                "The decision on what to do in response to the authorization challenge.  Default means\ndeferring to the default behavior of the net stack, which will likely either the Cancel\nauthentication or display a popup dialog box.",
              type: "string",
              enum: ["Default", "CancelAuth", "ProvideCredentials"],
            },
            {
              name: "username",
              description:
                "The username to provide, possibly empty. Should only be set if response is\nProvideCredentials.",
              optional: true,
              type: "string",
            },
            {
              name: "password",
              description:
                "The password to provide, possibly empty. Should only be set if response is\nProvideCredentials.",
              optional: true,
              type: "string",
            },
          ],
        },
      ],
      commands: [
        {
          name: "disable",
          description: "Disables the fetch domain.",
        },
        {
          name: "enable",
          description:
            "Enables issuing of requestPaused events. A request will be paused until client\ncalls one of failRequest, fulfillRequest or continueRequest/continueWithAuth.",
          parameters: [
            {
              name: "patterns",
              description:
                "If specified, only requests matching any of these patterns will produce\nfetchRequested event and will be paused until clients response. If not set,\nall requests will be affected.",
              optional: true,
              type: "array",
              items: {
                $ref: "RequestPattern",
              },
            },
            {
              name: "handleAuthRequests",
              description:
                "If true, authRequired events will be issued and requests will be paused\nexpecting a call to continueWithAuth.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "failRequest",
          description: "Causes the request to fail with specified reason.",
          parameters: [
            {
              name: "requestId",
              description: "An id the client received in requestPaused event.",
              $ref: "RequestId",
            },
            {
              name: "errorReason",
              description: "Causes the request to fail with the given reason.",
              $ref: "Network.ErrorReason",
            },
          ],
        },
        {
          name: "fulfillRequest",
          description: "Provides response to the request.",
          parameters: [
            {
              name: "requestId",
              description: "An id the client received in requestPaused event.",
              $ref: "RequestId",
            },
            {
              name: "responseCode",
              description: "An HTTP response code.",
              type: "integer",
            },
            {
              name: "responseHeaders",
              description: "Response headers.",
              optional: true,
              type: "array",
              items: {
                $ref: "HeaderEntry",
              },
            },
            {
              name: "binaryResponseHeaders",
              description:
                "Alternative way of specifying response headers as a \\0-separated\nseries of name: value pairs. Prefer the above method unless you\nneed to represent some non-UTF8 values that can't be transmitted\nover the protocol as text. (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
            {
              name: "body",
              description:
                "A response body. If absent, original response body will be used if\nthe request is intercepted at the response stage and empty body\nwill be used if the request is intercepted at the request stage. (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
            {
              name: "responsePhrase",
              description:
                "A textual representation of responseCode.\nIf absent, a standard phrase matching responseCode is used.",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "continueRequest",
          description:
            "Continues the request, optionally modifying some of its parameters.",
          parameters: [
            {
              name: "requestId",
              description: "An id the client received in requestPaused event.",
              $ref: "RequestId",
            },
            {
              name: "url",
              description:
                "If set, the request url will be modified in a way that's not observable by page.",
              optional: true,
              type: "string",
            },
            {
              name: "method",
              description: "If set, the request method is overridden.",
              optional: true,
              type: "string",
            },
            {
              name: "postData",
              description:
                "If set, overrides the post data in the request. (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
            {
              name: "headers",
              description:
                "If set, overrides the request headers. Note that the overrides do not\nextend to subsequent redirect hops, if a redirect happens. Another override\nmay be applied to a different request produced by a redirect.",
              optional: true,
              type: "array",
              items: {
                $ref: "HeaderEntry",
              },
            },
            {
              name: "interceptResponse",
              description:
                "If set, overrides response interception behavior for this request.",
              experimental: true,
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "continueWithAuth",
          description:
            "Continues a request supplying authChallengeResponse following authRequired event.",
          parameters: [
            {
              name: "requestId",
              description: "An id the client received in authRequired event.",
              $ref: "RequestId",
            },
            {
              name: "authChallengeResponse",
              description: "Response to  with an authChallenge.",
              $ref: "AuthChallengeResponse",
            },
          ],
        },
        {
          name: "continueResponse",
          description:
            "Continues loading of the paused response, optionally modifying the\nresponse headers. If either responseCode or headers are modified, all of them\nmust be present.",
          experimental: true,
          parameters: [
            {
              name: "requestId",
              description: "An id the client received in requestPaused event.",
              $ref: "RequestId",
            },
            {
              name: "responseCode",
              description:
                "An HTTP response code. If absent, original response code will be used.",
              optional: true,
              type: "integer",
            },
            {
              name: "responsePhrase",
              description:
                "A textual representation of responseCode.\nIf absent, a standard phrase matching responseCode is used.",
              optional: true,
              type: "string",
            },
            {
              name: "responseHeaders",
              description:
                "Response headers. If absent, original response headers will be used.",
              optional: true,
              type: "array",
              items: {
                $ref: "HeaderEntry",
              },
            },
            {
              name: "binaryResponseHeaders",
              description:
                "Alternative way of specifying response headers as a \\0-separated\nseries of name: value pairs. Prefer the above method unless you\nneed to represent some non-UTF8 values that can't be transmitted\nover the protocol as text. (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
          ],
        },
        {
          name: "getResponseBody",
          description:
            "Causes the body of the response to be received from the server and\nreturned as a single string. May only be issued for a request that\nis paused in the Response stage and is mutually exclusive with\ntakeResponseBodyForInterceptionAsStream. Calling other methods that\naffect the request or disabling fetch domain before body is received\nresults in an undefined behavior.",
          parameters: [
            {
              name: "requestId",
              description:
                "Identifier for the intercepted request to get body for.",
              $ref: "RequestId",
            },
          ],
          returns: [
            {
              name: "body",
              description: "Response body.",
              type: "string",
            },
            {
              name: "base64Encoded",
              description: "True, if content was sent as base64.",
              type: "boolean",
            },
          ],
        },
        {
          name: "takeResponseBodyAsStream",
          description:
            "Returns a handle to the stream representing the response body.\nThe request must be paused in the HeadersReceived stage.\nNote that after this command the request can't be continued\nas is -- client either needs to cancel it or to provide the\nresponse body.\nThe stream only supports sequential read, IO.read will fail if the position\nis specified.\nThis method is mutually exclusive with getResponseBody.\nCalling other methods that affect the request or disabling fetch\ndomain before body is received results in an undefined behavior.",
          parameters: [
            {
              name: "requestId",
              $ref: "RequestId",
            },
          ],
          returns: [
            {
              name: "stream",
              $ref: "IO.StreamHandle",
            },
          ],
        },
      ],
      events: [
        {
          name: "requestPaused",
          description:
            "Issued when the domain is enabled and the request URL matches the\nspecified filter. The request is paused until the client responds\nwith one of continueRequest, failRequest or fulfillRequest.\nThe stage of the request can be determined by presence of responseErrorReason\nand responseStatusCode -- the request is at the response stage if either\nof these fields is present and in the request stage otherwise.",
          parameters: [
            {
              name: "requestId",
              description: "Each request the page makes will have a unique id.",
              $ref: "RequestId",
            },
            {
              name: "request",
              description: "The details of the request.",
              $ref: "Network.Request",
            },
            {
              name: "frameId",
              description: "The id of the frame that initiated the request.",
              $ref: "Page.FrameId",
            },
            {
              name: "resourceType",
              description: "How the requested resource will be used.",
              $ref: "Network.ResourceType",
            },
            {
              name: "responseErrorReason",
              description: "Response error if intercepted at response stage.",
              optional: true,
              $ref: "Network.ErrorReason",
            },
            {
              name: "responseStatusCode",
              description: "Response code if intercepted at response stage.",
              optional: true,
              type: "integer",
            },
            {
              name: "responseStatusText",
              description:
                "Response status text if intercepted at response stage.",
              optional: true,
              type: "string",
            },
            {
              name: "responseHeaders",
              description:
                "Response headers if intercepted at the response stage.",
              optional: true,
              type: "array",
              items: {
                $ref: "HeaderEntry",
              },
            },
            {
              name: "networkId",
              description:
                "If the intercepted request had a corresponding Network.requestWillBeSent event fired for it,\nthen this networkId will be the same as the requestId present in the requestWillBeSent event.",
              optional: true,
              $ref: "Network.RequestId",
            },
            {
              name: "redirectedRequestId",
              description:
                "If the request is due to a redirect response from the server, the id of the request that\nhas caused the redirect.",
              experimental: true,
              optional: true,
              $ref: "RequestId",
            },
          ],
        },
        {
          name: "authRequired",
          description:
            "Issued when the domain is enabled with handleAuthRequests set to true.\nThe request is paused until client responds with continueWithAuth.",
          parameters: [
            {
              name: "requestId",
              description: "Each request the page makes will have a unique id.",
              $ref: "RequestId",
            },
            {
              name: "request",
              description: "The details of the request.",
              $ref: "Network.Request",
            },
            {
              name: "frameId",
              description: "The id of the frame that initiated the request.",
              $ref: "Page.FrameId",
            },
            {
              name: "resourceType",
              description: "How the requested resource will be used.",
              $ref: "Network.ResourceType",
            },
            {
              name: "authChallenge",
              description:
                "Details of the Authorization Challenge encountered.\nIf this is set, client should respond with continueRequest that\ncontains AuthChallengeResponse.",
              $ref: "AuthChallenge",
            },
          ],
        },
      ],
    },
    {
      domain: "WebAudio",
      description:
        "This domain allows inspection of Web Audio API.\nhttps://webaudio.github.io/web-audio-api/",
      experimental: true,
      types: [
        {
          id: "GraphObjectId",
          description:
            "An unique ID for a graph object (AudioContext, AudioNode, AudioParam) in Web Audio API",
          type: "string",
        },
        {
          id: "ContextType",
          description: "Enum of BaseAudioContext types",
          type: "string",
          enum: ["realtime", "offline"],
        },
        {
          id: "ContextState",
          description: "Enum of AudioContextState from the spec",
          type: "string",
          enum: ["suspended", "running", "closed"],
        },
        {
          id: "NodeType",
          description: "Enum of AudioNode types",
          type: "string",
        },
        {
          id: "ChannelCountMode",
          description: "Enum of AudioNode::ChannelCountMode from the spec",
          type: "string",
          enum: ["clamped-max", "explicit", "max"],
        },
        {
          id: "ChannelInterpretation",
          description: "Enum of AudioNode::ChannelInterpretation from the spec",
          type: "string",
          enum: ["discrete", "speakers"],
        },
        {
          id: "ParamType",
          description: "Enum of AudioParam types",
          type: "string",
        },
        {
          id: "AutomationRate",
          description: "Enum of AudioParam::AutomationRate from the spec",
          type: "string",
          enum: ["a-rate", "k-rate"],
        },
        {
          id: "ContextRealtimeData",
          description: "Fields in AudioContext that change in real-time.",
          type: "object",
          properties: [
            {
              name: "currentTime",
              description:
                "The current context time in second in BaseAudioContext.",
              type: "number",
            },
            {
              name: "renderCapacity",
              description:
                "The time spent on rendering graph divided by render quantum duration,\nand multiplied by 100. 100 means the audio renderer reached the full\ncapacity and glitch may occur.",
              type: "number",
            },
            {
              name: "callbackIntervalMean",
              description: "A running mean of callback interval.",
              type: "number",
            },
            {
              name: "callbackIntervalVariance",
              description: "A running variance of callback interval.",
              type: "number",
            },
          ],
        },
        {
          id: "BaseAudioContext",
          description: "Protocol object for BaseAudioContext",
          type: "object",
          properties: [
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
            {
              name: "contextType",
              $ref: "ContextType",
            },
            {
              name: "contextState",
              $ref: "ContextState",
            },
            {
              name: "realtimeData",
              optional: true,
              $ref: "ContextRealtimeData",
            },
            {
              name: "callbackBufferSize",
              description: "Platform-dependent callback buffer size.",
              type: "number",
            },
            {
              name: "maxOutputChannelCount",
              description:
                "Number of output channels supported by audio hardware in use.",
              type: "number",
            },
            {
              name: "sampleRate",
              description: "Context sample rate.",
              type: "number",
            },
          ],
        },
        {
          id: "AudioListener",
          description: "Protocol object for AudioListener",
          type: "object",
          properties: [
            {
              name: "listenerId",
              $ref: "GraphObjectId",
            },
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
          ],
        },
        {
          id: "AudioNode",
          description: "Protocol object for AudioNode",
          type: "object",
          properties: [
            {
              name: "nodeId",
              $ref: "GraphObjectId",
            },
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
            {
              name: "nodeType",
              $ref: "NodeType",
            },
            {
              name: "numberOfInputs",
              type: "number",
            },
            {
              name: "numberOfOutputs",
              type: "number",
            },
            {
              name: "channelCount",
              type: "number",
            },
            {
              name: "channelCountMode",
              $ref: "ChannelCountMode",
            },
            {
              name: "channelInterpretation",
              $ref: "ChannelInterpretation",
            },
          ],
        },
        {
          id: "AudioParam",
          description: "Protocol object for AudioParam",
          type: "object",
          properties: [
            {
              name: "paramId",
              $ref: "GraphObjectId",
            },
            {
              name: "nodeId",
              $ref: "GraphObjectId",
            },
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
            {
              name: "paramType",
              $ref: "ParamType",
            },
            {
              name: "rate",
              $ref: "AutomationRate",
            },
            {
              name: "defaultValue",
              type: "number",
            },
            {
              name: "minValue",
              type: "number",
            },
            {
              name: "maxValue",
              type: "number",
            },
          ],
        },
      ],
      commands: [
        {
          name: "enable",
          description:
            "Enables the WebAudio domain and starts sending context lifetime events.",
        },
        {
          name: "disable",
          description: "Disables the WebAudio domain.",
        },
        {
          name: "getRealtimeData",
          description: "Fetch the realtime data from the registered contexts.",
          parameters: [
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
          ],
          returns: [
            {
              name: "realtimeData",
              $ref: "ContextRealtimeData",
            },
          ],
        },
      ],
      events: [
        {
          name: "contextCreated",
          description: "Notifies that a new BaseAudioContext has been created.",
          parameters: [
            {
              name: "context",
              $ref: "BaseAudioContext",
            },
          ],
        },
        {
          name: "contextWillBeDestroyed",
          description:
            "Notifies that an existing BaseAudioContext will be destroyed.",
          parameters: [
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
          ],
        },
        {
          name: "contextChanged",
          description:
            "Notifies that existing BaseAudioContext has changed some properties (id stays the same)..",
          parameters: [
            {
              name: "context",
              $ref: "BaseAudioContext",
            },
          ],
        },
        {
          name: "audioListenerCreated",
          description:
            "Notifies that the construction of an AudioListener has finished.",
          parameters: [
            {
              name: "listener",
              $ref: "AudioListener",
            },
          ],
        },
        {
          name: "audioListenerWillBeDestroyed",
          description: "Notifies that a new AudioListener has been created.",
          parameters: [
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
            {
              name: "listenerId",
              $ref: "GraphObjectId",
            },
          ],
        },
        {
          name: "audioNodeCreated",
          description: "Notifies that a new AudioNode has been created.",
          parameters: [
            {
              name: "node",
              $ref: "AudioNode",
            },
          ],
        },
        {
          name: "audioNodeWillBeDestroyed",
          description:
            "Notifies that an existing AudioNode has been destroyed.",
          parameters: [
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
            {
              name: "nodeId",
              $ref: "GraphObjectId",
            },
          ],
        },
        {
          name: "audioParamCreated",
          description: "Notifies that a new AudioParam has been created.",
          parameters: [
            {
              name: "param",
              $ref: "AudioParam",
            },
          ],
        },
        {
          name: "audioParamWillBeDestroyed",
          description:
            "Notifies that an existing AudioParam has been destroyed.",
          parameters: [
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
            {
              name: "nodeId",
              $ref: "GraphObjectId",
            },
            {
              name: "paramId",
              $ref: "GraphObjectId",
            },
          ],
        },
        {
          name: "nodesConnected",
          description: "Notifies that two AudioNodes are connected.",
          parameters: [
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
            {
              name: "sourceId",
              $ref: "GraphObjectId",
            },
            {
              name: "destinationId",
              $ref: "GraphObjectId",
            },
            {
              name: "sourceOutputIndex",
              optional: true,
              type: "number",
            },
            {
              name: "destinationInputIndex",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          name: "nodesDisconnected",
          description:
            "Notifies that AudioNodes are disconnected. The destination can be null, and it means all the outgoing connections from the source are disconnected.",
          parameters: [
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
            {
              name: "sourceId",
              $ref: "GraphObjectId",
            },
            {
              name: "destinationId",
              $ref: "GraphObjectId",
            },
            {
              name: "sourceOutputIndex",
              optional: true,
              type: "number",
            },
            {
              name: "destinationInputIndex",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          name: "nodeParamConnected",
          description:
            "Notifies that an AudioNode is connected to an AudioParam.",
          parameters: [
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
            {
              name: "sourceId",
              $ref: "GraphObjectId",
            },
            {
              name: "destinationId",
              $ref: "GraphObjectId",
            },
            {
              name: "sourceOutputIndex",
              optional: true,
              type: "number",
            },
          ],
        },
        {
          name: "nodeParamDisconnected",
          description:
            "Notifies that an AudioNode is disconnected to an AudioParam.",
          parameters: [
            {
              name: "contextId",
              $ref: "GraphObjectId",
            },
            {
              name: "sourceId",
              $ref: "GraphObjectId",
            },
            {
              name: "destinationId",
              $ref: "GraphObjectId",
            },
            {
              name: "sourceOutputIndex",
              optional: true,
              type: "number",
            },
          ],
        },
      ],
    },
    {
      domain: "WebAuthn",
      description:
        "This domain allows configuring virtual authenticators to test the WebAuthn\nAPI.",
      experimental: true,
      types: [
        {
          id: "AuthenticatorId",
          type: "string",
        },
        {
          id: "AuthenticatorProtocol",
          type: "string",
          enum: ["u2f", "ctap2"],
        },
        {
          id: "Ctap2Version",
          type: "string",
          enum: ["ctap2_0", "ctap2_1"],
        },
        {
          id: "AuthenticatorTransport",
          type: "string",
          enum: ["usb", "nfc", "ble", "cable", "internal"],
        },
        {
          id: "VirtualAuthenticatorOptions",
          type: "object",
          properties: [
            {
              name: "protocol",
              $ref: "AuthenticatorProtocol",
            },
            {
              name: "ctap2Version",
              description: "Defaults to ctap2_0. Ignored if |protocol| == u2f.",
              optional: true,
              $ref: "Ctap2Version",
            },
            {
              name: "transport",
              $ref: "AuthenticatorTransport",
            },
            {
              name: "hasResidentKey",
              description: "Defaults to false.",
              optional: true,
              type: "boolean",
            },
            {
              name: "hasUserVerification",
              description: "Defaults to false.",
              optional: true,
              type: "boolean",
            },
            {
              name: "hasLargeBlob",
              description:
                "If set to true, the authenticator will support the largeBlob extension.\nhttps://w3c.github.io/webauthn#largeBlob\nDefaults to false.",
              optional: true,
              type: "boolean",
            },
            {
              name: "hasCredBlob",
              description:
                "If set to true, the authenticator will support the credBlob extension.\nhttps://fidoalliance.org/specs/fido-v2.1-rd-20201208/fido-client-to-authenticator-protocol-v2.1-rd-20201208.html#sctn-credBlob-extension\nDefaults to false.",
              optional: true,
              type: "boolean",
            },
            {
              name: "hasMinPinLength",
              description:
                "If set to true, the authenticator will support the minPinLength extension.\nhttps://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html#sctn-minpinlength-extension\nDefaults to false.",
              optional: true,
              type: "boolean",
            },
            {
              name: "automaticPresenceSimulation",
              description:
                "If set to true, tests of user presence will succeed immediately.\nOtherwise, they will not be resolved. Defaults to true.",
              optional: true,
              type: "boolean",
            },
            {
              name: "isUserVerified",
              description:
                "Sets whether User Verification succeeds or fails for an authenticator.\nDefaults to false.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          id: "Credential",
          type: "object",
          properties: [
            {
              name: "credentialId",
              type: "string",
            },
            {
              name: "isResidentCredential",
              type: "boolean",
            },
            {
              name: "rpId",
              description:
                "Relying Party ID the credential is scoped to. Must be set when adding a\ncredential.",
              optional: true,
              type: "string",
            },
            {
              name: "privateKey",
              description:
                "The ECDSA P-256 private key in PKCS#8 format. (Encoded as a base64 string when passed over JSON)",
              type: "string",
            },
            {
              name: "userHandle",
              description:
                "An opaque byte sequence with a maximum size of 64 bytes mapping the\ncredential to a specific user. (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
            {
              name: "signCount",
              description:
                "Signature counter. This is incremented by one for each successful\nassertion.\nSee https://w3c.github.io/webauthn/#signature-counter",
              type: "integer",
            },
            {
              name: "largeBlob",
              description:
                "The large blob associated with the credential.\nSee https://w3c.github.io/webauthn/#sctn-large-blob-extension (Encoded as a base64 string when passed over JSON)",
              optional: true,
              type: "string",
            },
          ],
        },
      ],
      commands: [
        {
          name: "enable",
          description:
            "Enable the WebAuthn domain and start intercepting credential storage and\nretrieval with a virtual authenticator.",
          parameters: [
            {
              name: "enableUI",
              description:
                "Whether to enable the WebAuthn user interface. Enabling the UI is\nrecommended for debugging and demo purposes, as it is closer to the real\nexperience. Disabling the UI is recommended for automated testing.\nSupported at the embedder's discretion if UI is available.\nDefaults to false.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "disable",
          description: "Disable the WebAuthn domain.",
        },
        {
          name: "addVirtualAuthenticator",
          description: "Creates and adds a virtual authenticator.",
          parameters: [
            {
              name: "options",
              $ref: "VirtualAuthenticatorOptions",
            },
          ],
          returns: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
          ],
        },
        {
          name: "setResponseOverrideBits",
          description:
            "Resets parameters isBogusSignature, isBadUV, isBadUP to false if they are not present.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
            {
              name: "isBogusSignature",
              description:
                "If isBogusSignature is set, overrides the signature in the authenticator response to be zero.\nDefaults to false.",
              optional: true,
              type: "boolean",
            },
            {
              name: "isBadUV",
              description:
                "If isBadUV is set, overrides the UV bit in the flags in the authenticator response to\nbe zero. Defaults to false.",
              optional: true,
              type: "boolean",
            },
            {
              name: "isBadUP",
              description:
                "If isBadUP is set, overrides the UP bit in the flags in the authenticator response to\nbe zero. Defaults to false.",
              optional: true,
              type: "boolean",
            },
          ],
        },
        {
          name: "removeVirtualAuthenticator",
          description: "Removes the given authenticator.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
          ],
        },
        {
          name: "addCredential",
          description: "Adds the credential to the specified authenticator.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
            {
              name: "credential",
              $ref: "Credential",
            },
          ],
        },
        {
          name: "getCredential",
          description:
            "Returns a single credential stored in the given virtual authenticator that\nmatches the credential ID.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
            {
              name: "credentialId",
              type: "string",
            },
          ],
          returns: [
            {
              name: "credential",
              $ref: "Credential",
            },
          ],
        },
        {
          name: "getCredentials",
          description:
            "Returns all the credentials stored in the given virtual authenticator.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
          ],
          returns: [
            {
              name: "credentials",
              type: "array",
              items: {
                $ref: "Credential",
              },
            },
          ],
        },
        {
          name: "removeCredential",
          description: "Removes a credential from the authenticator.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
            {
              name: "credentialId",
              type: "string",
            },
          ],
        },
        {
          name: "clearCredentials",
          description: "Clears all the credentials from the specified device.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
          ],
        },
        {
          name: "setUserVerified",
          description:
            "Sets whether User Verification succeeds or fails for an authenticator.\nThe default is true.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
            {
              name: "isUserVerified",
              type: "boolean",
            },
          ],
        },
        {
          name: "setAutomaticPresenceSimulation",
          description:
            "Sets whether tests of user presence will succeed immediately (if true) or fail to resolve (if false) for an authenticator.\nThe default is true.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
            {
              name: "enabled",
              type: "boolean",
            },
          ],
        },
      ],
      events: [
        {
          name: "credentialAdded",
          description:
            "Triggered when a credential is added to an authenticator.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
            {
              name: "credential",
              $ref: "Credential",
            },
          ],
        },
        {
          name: "credentialAsserted",
          description:
            "Triggered when a credential is used in a webauthn assertion.",
          parameters: [
            {
              name: "authenticatorId",
              $ref: "AuthenticatorId",
            },
            {
              name: "credential",
              $ref: "Credential",
            },
          ],
        },
      ],
    },
    {
      domain: "Media",
      description: "This domain allows detailed inspection of media elements",
      experimental: true,
      types: [
        {
          id: "PlayerId",
          description:
            "Players will get an ID that is unique within the agent context.",
          type: "string",
        },
        {
          id: "Timestamp",
          type: "number",
        },
        {
          id: "PlayerMessage",
          description:
            "Have one type per entry in MediaLogRecord::Type\nCorresponds to kMessage",
          type: "object",
          properties: [
            {
              name: "level",
              description:
                "Keep in sync with MediaLogMessageLevel\nWe are currently keeping the message level 'error' separate from the\nPlayerError type because right now they represent different things,\nthis one being a DVLOG(ERROR) style log message that gets printed\nbased on what log level is selected in the UI, and the other is a\nrepresentation of a media::PipelineStatus object. Soon however we're\ngoing to be moving away from using PipelineStatus for errors and\nintroducing a new error type which should hopefully let us integrate\nthe error log level into the PlayerError type.",
              type: "string",
              enum: ["error", "warning", "info", "debug"],
            },
            {
              name: "message",
              type: "string",
            },
          ],
        },
        {
          id: "PlayerProperty",
          description: "Corresponds to kMediaPropertyChange",
          type: "object",
          properties: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "value",
              type: "string",
            },
          ],
        },
        {
          id: "PlayerEvent",
          description: "Corresponds to kMediaEventTriggered",
          type: "object",
          properties: [
            {
              name: "timestamp",
              $ref: "Timestamp",
            },
            {
              name: "value",
              type: "string",
            },
          ],
        },
        {
          id: "PlayerErrorSourceLocation",
          description:
            "Represents logged source line numbers reported in an error.\nNOTE: file and line are from chromium c++ implementation code, not js.",
          type: "object",
          properties: [
            {
              name: "file",
              type: "string",
            },
            {
              name: "line",
              type: "integer",
            },
          ],
        },
        {
          id: "PlayerError",
          description: "Corresponds to kMediaError",
          type: "object",
          properties: [
            {
              name: "errorType",
              type: "string",
            },
            {
              name: "code",
              description:
                "Code is the numeric enum entry for a specific set of error codes, such\nas PipelineStatusCodes in media/base/pipeline_status.h",
              type: "integer",
            },
            {
              name: "stack",
              description:
                "A trace of where this error was caused / where it passed through.",
              type: "array",
              items: {
                $ref: "PlayerErrorSourceLocation",
              },
            },
            {
              name: "cause",
              description:
                "Errors potentially have a root cause error, ie, a DecoderError might be\ncaused by an WindowsError",
              type: "array",
              items: {
                $ref: "PlayerError",
              },
            },
            {
              name: "data",
              description:
                "Extra data attached to an error, such as an HRESULT, Video Codec, etc.",
              type: "object",
            },
          ],
        },
      ],
      events: [
        {
          name: "playerPropertiesChanged",
          description:
            "This can be called multiple times, and can be used to set / override /\nremove player properties. A null propValue indicates removal.",
          parameters: [
            {
              name: "playerId",
              $ref: "PlayerId",
            },
            {
              name: "properties",
              type: "array",
              items: {
                $ref: "PlayerProperty",
              },
            },
          ],
        },
        {
          name: "playerEventsAdded",
          description:
            "Send events as a list, allowing them to be batched on the browser for less\ncongestion. If batched, events must ALWAYS be in chronological order.",
          parameters: [
            {
              name: "playerId",
              $ref: "PlayerId",
            },
            {
              name: "events",
              type: "array",
              items: {
                $ref: "PlayerEvent",
              },
            },
          ],
        },
        {
          name: "playerMessagesLogged",
          description: "Send a list of any messages that need to be delivered.",
          parameters: [
            {
              name: "playerId",
              $ref: "PlayerId",
            },
            {
              name: "messages",
              type: "array",
              items: {
                $ref: "PlayerMessage",
              },
            },
          ],
        },
        {
          name: "playerErrorsRaised",
          description: "Send a list of any errors that need to be delivered.",
          parameters: [
            {
              name: "playerId",
              $ref: "PlayerId",
            },
            {
              name: "errors",
              type: "array",
              items: {
                $ref: "PlayerError",
              },
            },
          ],
        },
        {
          name: "playersCreated",
          description:
            "Called whenever a player is created, or when a new agent joins and receives\na list of active players. If an agent is restored, it will receive the full\nlist of player ids and all events again.",
          parameters: [
            {
              name: "players",
              type: "array",
              items: {
                $ref: "PlayerId",
              },
            },
          ],
        },
      ],
      commands: [
        {
          name: "enable",
          description: "Enables the Media domain",
        },
        {
          name: "disable",
          description: "Disables the Media domain.",
        },
      ],
    },
  ],
};
