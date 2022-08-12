
export type integer = number;


export interface TouchPoint {
    /**
     * X coordinate of the event relative to the main frame's viewport in CSS pixels.
     */
    x: number;
    /**
     * Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
     * the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
     */
    y: number;
    /**
     * X radius of the touch area (default: 1.0).
     */
    radiusX?: number;
    /**
     * Y radius of the touch area (default: 1.0).
     */
    radiusY?: number;
    /**
     * Rotation angle (default: 0.0).
     */
    rotationAngle?: number;
    /**
     * Force (default: 1.0).
     */
    force?: number;
    /**
     * The normalized tangential pressure, which has a range of [-1,1] (default: 0).
     */
    tangentialPressure?: number;
    /**
     * The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0)
     */
    tiltX?: integer;
    /**
     * The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
     */
    tiltY?: integer;
    /**
     * The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
     */
    twist?: integer;
    /**
     * Identifier used to track touch sources between events, must be unique within an event.
     */
    id?: number;
}

export type GestureSourceType = ("default" | "touch" | "mouse");

export type MouseButton = ("none" | "left" | "middle" | "right" | "back" | "forward");

/**
 * UTC time in seconds, counted from January 1, 1970.
 */
export type TimeSinceEpoch = number;

export interface DragDataItem {
    /**
     * Mime type of the dragged data.
     */
    mimeType: string;
    /**
     * Depending of the value of `mimeType`, it contains the dragged link,
     * text, HTML markup or any other data.
     */
    data: string;
    /**
     * Title associated with a link. Only valid when `mimeType` == "text/uri-list".
     */
    title?: string;
    /**
     * Stores the base URL for the contained markup. Only valid when `mimeType`
     * == "text/html".
     */
    baseURL?: string;
}

export interface DragData {
    items: DragDataItem[];
    /**
     * List of filenames that should be included when dropping
     */
    files?: string[];
    /**
     * Bit field representing allowed drag operations. Copy = 1, Link = 2, Move = 16
     */
    dragOperationsMask: integer;
}

export const enum DispatchDragEventRequestType {
    DragEnter = "dragEnter",
    DragOver = "dragOver",
    Drop = "drop",
    DragCancel = "dragCancel",
}

export interface DispatchDragEventRequest {
    /**
     * Type of the drag event. (DispatchDragEventRequestType enum)
     */
    type: ("dragEnter" | "dragOver" | "drop" | "dragCancel");
    /**
     * X coordinate of the event relative to the main frame's viewport in CSS pixels.
     */
    x: number;
    /**
     * Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
     * the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
     */
    y: number;
    data: DragData;
    /**
     * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
     * (default: 0).
     */
    modifiers?: integer;
}

export const enum DispatchKeyEventRequestType {
    KeyDown = "keyDown",
    KeyUp = "keyUp",
    RawKeyDown = "rawKeyDown",
    Char = "char",
}

export interface DispatchKeyEventRequest {
    /**
     * Type of the key event. (DispatchKeyEventRequestType enum)
     */
    type: ("keyDown" | "keyUp" | "rawKeyDown" | "char");
    /**
     * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
     * (default: 0).
     */
    modifiers?: integer;
    /**
     * Time at which the event occurred.
     */
    timestamp?: TimeSinceEpoch;
    /**
     * Text as generated by processing a virtual key code with a keyboard layout. Not needed for
     * for `keyUp` and `rawKeyDown` events (default: "")
     */
    text?: string;
    /**
     * Text that would have been generated by the keyboard if no modifiers were pressed (except for
     * shift). Useful for shortcut (accelerator) key handling (default: "").
     */
    unmodifiedText?: string;
    /**
     * Unique key identifier (e.g., 'U+0041') (default: "").
     */
    keyIdentifier?: string;
    /**
     * Unique DOM defined string value for each physical key (e.g., 'KeyA') (default: "").
     */
    code?: string;
    /**
     * Unique DOM defined string value describing the meaning of the key in the context of active
     * modifiers, keyboard layout, etc (e.g., 'AltGr') (default: "").
     */
    key?: string;
    /**
     * Windows virtual key code (default: 0).
     */
    windowsVirtualKeyCode?: integer;
    /**
     * Native virtual key code (default: 0).
     */
    nativeVirtualKeyCode?: integer;
    /**
     * Whether the event was generated from auto repeat (default: false).
     */
    autoRepeat?: boolean;
    /**
     * Whether the event was generated from the keypad (default: false).
     */
    isKeypad?: boolean;
    /**
     * Whether the event was a system key event (default: false).
     */
    isSystemKey?: boolean;
    /**
     * Whether the event was from the left or right side of the keyboard. 1=Left, 2=Right (default:
     * 0).
     */
    location?: integer;
    /**
     * Editing commands to send with the key event (e.g., 'selectAll') (default: []).
     * These are related to but not equal the command names used in `document.execCommand` and NSStandardKeyBindingResponding.
     * See https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/editing/commands/editor_command_names.h for valid command names.
     */
    commands?: string[];
}

export interface InsertTextRequest {
    /**
     * The text to insert.
     */
    text: string;
}

export interface ImeSetCompositionRequest {
    /**
     * The text to insert
     */
    text: string;
    /**
     * selection start
     */
    selectionStart: integer;
    /**
     * selection end
     */
    selectionEnd: integer;
    /**
     * replacement start
     */
    replacementStart?: integer;
    /**
     * replacement end
     */
    replacementEnd?: integer;
}

export const enum DispatchMouseEventRequestType {
    MousePressed = "mousePressed",
    MouseReleased = "mouseReleased",
    MouseMoved = "mouseMoved",
    MouseWheel = "mouseWheel",
}

export const enum DispatchMouseEventRequestPointerType {
    Mouse = "mouse",
    Pen = "pen",
}

export interface DispatchMouseEventRequest {
    /**
     * Type of the mouse event. (DispatchMouseEventRequestType enum)
     */
    type: ("mousePressed" | "mouseReleased" | "mouseMoved" | "mouseWheel");
    /**
     * X coordinate of the event relative to the main frame's viewport in CSS pixels.
     */
    x: number;
    /**
     * Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
     * the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
     */
    y: number;
    /**
     * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
     * (default: 0).
     */
    modifiers?: integer;
    /**
     * Time at which the event occurred.
     */
    timestamp?: TimeSinceEpoch;
    /**
     * Mouse button (default: "none").
     */
    button?: MouseButton;
    /**
     * A number indicating which buttons are pressed on the mouse when a mouse event is triggered.
     * Left=1, Right=2, Middle=4, Back=8, Forward=16, None=0.
     */
    buttons?: integer;
    /**
     * Number of times the mouse button was clicked (default: 0).
     */
    clickCount?: integer;
    /**
     * The normalized pressure, which has a range of [0,1] (default: 0).
     */
    force?: number;
    /**
     * The normalized tangential pressure, which has a range of [-1,1] (default: 0).
     */
    tangentialPressure?: number;
    /**
     * The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0).
     */
    tiltX?: integer;
    /**
     * The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
     */
    tiltY?: integer;
    /**
     * The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
     */
    twist?: integer;
    /**
     * X delta in CSS pixels for mouse wheel event (default: 0).
     */
    deltaX?: number;
    /**
     * Y delta in CSS pixels for mouse wheel event (default: 0).
     */
    deltaY?: number;
    /**
     * Pointer type (default: "mouse"). (DispatchMouseEventRequestPointerType enum)
     */
    pointerType?: ("mouse" | "pen");
}

export const enum DispatchTouchEventRequestType {
    TouchStart = "touchStart",
    TouchEnd = "touchEnd",
    TouchMove = "touchMove",
    TouchCancel = "touchCancel",
}

export interface DispatchTouchEventRequest {
    /**
     * Type of the touch event. TouchEnd and TouchCancel must not contain any touch points, while
     * TouchStart and TouchMove must contains at least one. (DispatchTouchEventRequestType enum)
     */
    type: ("touchStart" | "touchEnd" | "touchMove" | "touchCancel");
    /**
     * Active touch points on the touch device. One event per any changed point (compared to
     * previous touch event in a sequence) is generated, emulating pressing/moving/releasing points
     * one by one.
     */
    touchPoints: TouchPoint[];
    /**
     * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
     * (default: 0).
     */
    modifiers?: integer;
    /**
     * Time at which the event occurred.
     */
    timestamp?: TimeSinceEpoch;
}

export const enum EmulateTouchFromMouseEventRequestType {
    MousePressed = "mousePressed",
    MouseReleased = "mouseReleased",
    MouseMoved = "mouseMoved",
    MouseWheel = "mouseWheel",
}

export interface EmulateTouchFromMouseEventRequest {
    /**
     * Type of the mouse event. (EmulateTouchFromMouseEventRequestType enum)
     */
    type: ("mousePressed" | "mouseReleased" | "mouseMoved" | "mouseWheel");
    /**
     * X coordinate of the mouse pointer in DIP.
     */
    x: integer;
    /**
     * Y coordinate of the mouse pointer in DIP.
     */
    y: integer;
    /**
     * Mouse button. Only "none", "left", "right" are supported.
     */
    button: MouseButton;
    /**
     * Time at which the event occurred (default: current time).
     */
    timestamp?: TimeSinceEpoch;
    /**
     * X delta in DIP for mouse wheel event (default: 0).
     */
    deltaX?: number;
    /**
     * Y delta in DIP for mouse wheel event (default: 0).
     */
    deltaY?: number;
    /**
     * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
     * (default: 0).
     */
    modifiers?: integer;
    /**
     * Number of times the mouse button was clicked (default: 0).
     */
    clickCount?: integer;
}

export interface SetIgnoreInputEventsRequest {
    /**
     * Ignores input events processing when set to true.
     */
    ignore: boolean;
}

export interface SetInterceptDragsRequest {
    enabled: boolean;
}

export interface SynthesizePinchGestureRequest {
    /**
     * X coordinate of the start of the gesture in CSS pixels.
     */
    x: number;
    /**
     * Y coordinate of the start of the gesture in CSS pixels.
     */
    y: number;
    /**
     * Relative scale factor after zooming (>1.0 zooms in, <1.0 zooms out).
     */
    scaleFactor: number;
    /**
     * Relative pointer speed in pixels per second (default: 800).
     */
    relativeSpeed?: integer;
    /**
     * Which type of input events to be generated (default: 'default', which queries the platform
     * for the preferred input type).
     */
    gestureSourceType?: GestureSourceType;
}

export interface SynthesizeScrollGestureRequest {
    /**
     * X coordinate of the start of the gesture in CSS pixels.
     */
    x: number;
    /**
     * Y coordinate of the start of the gesture in CSS pixels.
     */
    y: number;
    /**
     * The distance to scroll along the X axis (positive to scroll left).
     */
    xDistance?: number;
    /**
     * The distance to scroll along the Y axis (positive to scroll up).
     */
    yDistance?: number;
    /**
     * The number of additional pixels to scroll back along the X axis, in addition to the given
     * distance.
     */
    xOverscroll?: number;
    /**
     * The number of additional pixels to scroll back along the Y axis, in addition to the given
     * distance.
     */
    yOverscroll?: number;
    /**
     * Prevent fling (default: true).
     */
    preventFling?: boolean;
    /**
     * Swipe speed in pixels per second (default: 800).
     */
    speed?: integer;
    /**
     * Which type of input events to be generated (default: 'default', which queries the platform
     * for the preferred input type).
     */
    gestureSourceType?: GestureSourceType;
    /**
     * The number of times to repeat the gesture (default: 0).
     */
    repeatCount?: integer;
    /**
     * The number of milliseconds delay between each repeat. (default: 250).
     */
    repeatDelayMs?: integer;
    /**
     * The name of the interaction markers to generate, if not empty (default: "").
     */
    interactionMarkerName?: string;
}

export interface SynthesizeTapGestureRequest {
    /**
     * X coordinate of the start of the gesture in CSS pixels.
     */
    x: number;
    /**
     * Y coordinate of the start of the gesture in CSS pixels.
     */
    y: number;
    /**
     * Duration between touchdown and touchup events in ms (default: 50).
     */
    duration?: integer;
    /**
     * Number of times to perform the tap (e.g. 2 for double tap, default: 1).
     */
    tapCount?: integer;
    /**
     * Which type of input events to be generated (default: 'default', which queries the platform
     * for the preferred input type).
     */
    gestureSourceType?: GestureSourceType;
}

/**
 * Emitted only when `Input.setInterceptDrags` is enabled. Use this data with `Input.dispatchDragEvent` to
 * restore normal drag and drop behavior.
 */
export interface DragInterceptedEvent {
    data: DragData;
}

