import type * as DOM from './dom.d.ts'
import type * as Page from './page.d.ts'
import type * as Network from './network.d.ts'

export type integer = number;

/**
 * This domain emulates different environments for the page.
 */

export const enum ScreenOrientationType {
    PortraitPrimary = "portraitPrimary",
    PortraitSecondary = "portraitSecondary",
    LandscapePrimary = "landscapePrimary",
    LandscapeSecondary = "landscapeSecondary",
}

/**
 * Screen orientation.
 */
export interface ScreenOrientation {
    /**
     * Orientation type. (ScreenOrientationType enum)
     */
    type: ("portraitPrimary" | "portraitSecondary" | "landscapePrimary" | "landscapeSecondary");
    /**
     * Orientation angle.
     */
    angle: integer;
}

export const enum DisplayFeatureOrientation {
    Vertical = "vertical",
    Horizontal = "horizontal",
}

export interface DisplayFeature {
    /**
     * Orientation of a display feature in relation to screen (DisplayFeatureOrientation enum)
     */
    orientation: ("vertical" | "horizontal");
    /**
     * The offset from the screen origin in either the x (for vertical
     * orientation) or y (for horizontal orientation) direction.
     */
    offset: integer;
    /**
     * A display feature may mask content such that it is not physically
     * displayed - this length along with the offset describes this area.
     * A display feature that only splits content will have a 0 mask_length.
     */
    maskLength: integer;
}

export interface MediaFeature {
    name: string;
    value: string;
}

/**
 * advance: If the scheduler runs out of immediate work, the virtual time base may fast forward to
 * allow the next delayed task (if any) to run; pause: The virtual time base may not advance;
 * pauseIfNetworkFetchesPending: The virtual time base may not advance if there are any pending
 * resource fetches.
 */
export type VirtualTimePolicy = ("advance" | "pause" | "pauseIfNetworkFetchesPending");

/**
 * Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
 */
export interface UserAgentBrandVersion {
    brand: string;
    version: string;
}

/**
 * Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
 * Missing optional values will be filled in by the target with what it would normally use.
 */
export interface UserAgentMetadata {
    brands?: UserAgentBrandVersion[];
    fullVersionList?: UserAgentBrandVersion[];
    fullVersion?: string;
    platform: string;
    platformVersion: string;
    architecture: string;
    model: string;
    mobile: boolean;
}

/**
 * Enum of image types that can be disabled.
 */
export type DisabledImageType = ("avif" | "jxl" | "webp");

export interface CanEmulateResponse {
    /**
     * True if emulation is supported.
     */
    result: boolean;
}

export interface SetFocusEmulationEnabledRequest {
    /**
     * Whether to enable to disable focus emulation.
     */
    enabled: boolean;
}

export interface SetAutoDarkModeOverrideRequest {
    /**
     * Whether to enable or disable automatic dark mode.
     * If not specified, any existing override will be cleared.
     */
    enabled?: boolean;
}

export interface SetCPUThrottlingRateRequest {
    /**
     * Throttling rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc).
     */
    rate: number;
}

export interface SetDefaultBackgroundColorOverrideRequest {
    /**
     * RGBA of the default background color. If not specified, any existing override will be
     * cleared.
     */
    color?: DOM.RGBA;
}

export interface SetDeviceMetricsOverrideRequest {
    /**
     * Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.
     */
    width: integer;
    /**
     * Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.
     */
    height: integer;
    /**
     * Overriding device scale factor value. 0 disables the override.
     */
    deviceScaleFactor: number;
    /**
     * Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text
     * autosizing and more.
     */
    mobile: boolean;
    /**
     * Scale to apply to resulting view image.
     */
    scale?: number;
    /**
     * Overriding screen width value in pixels (minimum 0, maximum 10000000).
     */
    screenWidth?: integer;
    /**
     * Overriding screen height value in pixels (minimum 0, maximum 10000000).
     */
    screenHeight?: integer;
    /**
     * Overriding view X position on screen in pixels (minimum 0, maximum 10000000).
     */
    positionX?: integer;
    /**
     * Overriding view Y position on screen in pixels (minimum 0, maximum 10000000).
     */
    positionY?: integer;
    /**
     * Do not set visible view size, rely upon explicit setVisibleSize call.
     */
    dontSetVisibleSize?: boolean;
    /**
     * Screen orientation override.
     */
    screenOrientation?: ScreenOrientation;
    /**
     * If set, the visible area of the page will be overridden to this viewport. This viewport
     * change is not observed by the page, e.g. viewport-relative elements do not change positions.
     */
    viewport?: Page.Viewport;
    /**
     * If set, the display feature of a multi-segment screen. If not set, multi-segment support
     * is turned-off.
     */
    displayFeature?: DisplayFeature;
}

export interface SetScrollbarsHiddenRequest {
    /**
     * Whether scrollbars should be always hidden.
     */
    hidden: boolean;
}

export interface SetDocumentCookieDisabledRequest {
    /**
     * Whether document.coookie API should be disabled.
     */
    disabled: boolean;
}

export const enum SetEmitTouchEventsForMouseRequestConfiguration {
    Mobile = "mobile",
    Desktop = "desktop",
}

export interface SetEmitTouchEventsForMouseRequest {
    /**
     * Whether touch emulation based on mouse input should be enabled.
     */
    enabled: boolean;
    /**
     * Touch/gesture events configuration. Default: current platform. (SetEmitTouchEventsForMouseRequestConfiguration enum)
     */
    configuration?: ("mobile" | "desktop");
}

export interface SetEmulatedMediaRequest {
    /**
     * Media type to emulate. Empty string disables the override.
     */
    media?: string;
    /**
     * Media features to emulate.
     */
    features?: MediaFeature[];
}

export const enum SetEmulatedVisionDeficiencyRequestType {
    None = "none",
    Achromatopsia = "achromatopsia",
    BlurredVision = "blurredVision",
    Deuteranopia = "deuteranopia",
    Protanopia = "protanopia",
    Tritanopia = "tritanopia",
}

export interface SetEmulatedVisionDeficiencyRequest {
    /**
     * Vision deficiency to emulate. (SetEmulatedVisionDeficiencyRequestType enum)
     */
    type: ("none" | "achromatopsia" | "blurredVision" | "deuteranopia" | "protanopia" | "tritanopia");
}

export interface SetGeolocationOverrideRequest {
    /**
     * Mock latitude
     */
    latitude?: number;
    /**
     * Mock longitude
     */
    longitude?: number;
    /**
     * Mock accuracy
     */
    accuracy?: number;
}

export interface SetIdleOverrideRequest {
    /**
     * Mock isUserActive
     */
    isUserActive: boolean;
    /**
     * Mock isScreenUnlocked
     */
    isScreenUnlocked: boolean;
}

export interface SetNavigatorOverridesRequest {
    /**
     * The platform navigator.platform should return.
     */
    platform: string;
}

export interface SetPageScaleFactorRequest {
    /**
     * Page scale factor.
     */
    pageScaleFactor: number;
}

export interface SetScriptExecutionDisabledRequest {
    /**
     * Whether script execution should be disabled in the page.
     */
    value: boolean;
}

export interface SetTouchEmulationEnabledRequest {
    /**
     * Whether the touch event emulation should be enabled.
     */
    enabled: boolean;
    /**
     * Maximum touch points supported. Defaults to one.
     */
    maxTouchPoints?: integer;
}

export interface SetVirtualTimePolicyRequest {
    policy: VirtualTimePolicy;
    /**
     * If set, after this many virtual milliseconds have elapsed virtual time will be paused and a
     * virtualTimeBudgetExpired event is sent.
     */
    budget?: number;
    /**
     * If set this specifies the maximum number of tasks that can be run before virtual is forced
     * forwards to prevent deadlock.
     */
    maxVirtualTimeTaskStarvationCount?: integer;
    /**
     * If set, base::Time::Now will be overridden to initially return this value.
     */
    initialVirtualTime?: Network.TimeSinceEpoch;
}

export interface SetVirtualTimePolicyResponse {
    /**
     * Absolute timestamp at which virtual time was first enabled (up time in milliseconds).
     */
    virtualTimeTicksBase: number;
}

export interface SetLocaleOverrideRequest {
    /**
     * ICU style C locale (e.g. "en_US"). If not specified or empty, disables the override and
     * restores default host system locale.
     */
    locale?: string;
}

export interface SetTimezoneOverrideRequest {
    /**
     * The timezone identifier. If empty, disables the override and
     * restores default host system timezone.
     */
    timezoneId: string;
}

export interface SetVisibleSizeRequest {
    /**
     * Frame width (DIP).
     */
    width: integer;
    /**
     * Frame height (DIP).
     */
    height: integer;
}

export interface SetDisabledImageTypesRequest {
    /**
     * Image types to disable.
     */
    imageTypes: DisabledImageType[];
}

export interface SetUserAgentOverrideRequest {
    /**
     * User agent to use.
     */
    userAgent: string;
    /**
     * Browser langugage to emulate.
     */
    acceptLanguage?: string;
    /**
     * The platform navigator.platform should return.
     */
    platform?: string;
    /**
     * To be sent in Sec-CH-UA-* headers and returned in navigator.userAgentData
     */
    userAgentMetadata?: UserAgentMetadata;
}

