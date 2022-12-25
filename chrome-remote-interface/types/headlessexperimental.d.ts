
export type integer = number;

/**
 * This domain provides experimental commands only supported in headless mode.
 */

export const enum ScreenshotParamsFormat {
    Jpeg = "jpeg",
    Png = "png",
    Webp = "webp",
}

/**
 * Encoding options for a screenshot.
 */
export type ScreenshotParams = {
    /**
     * Image compression format (defaults to png). (ScreenshotParamsFormat enum)
     */
    format?: ("jpeg" | "png" | "webp");
    /**
     * Compression quality from range [0..100] (jpeg only).
     */
    quality?: integer;
    /**
     * Optimize image encoding for speed, not for resulting size (defaults to false)
     */
    optimizeForSpeed?: boolean;
}

export type BeginFrameRequest = {
    /**
     * Timestamp of this BeginFrame in Renderer TimeTicks (milliseconds of uptime). If not set,
     * the current time will be used.
     */
    frameTimeTicks?: number;
    /**
     * The interval between BeginFrames that is reported to the compositor, in milliseconds.
     * Defaults to a 60 frames/second interval, i.e. about 16.666 milliseconds.
     */
    interval?: number;
    /**
     * Whether updates should not be committed and drawn onto the display. False by default. If
     * true, only side effects of the BeginFrame will be run, such as layout and animations, but
     * any visual updates may not be visible on the display or in screenshots.
     */
    noDisplayUpdates?: boolean;
    /**
     * If set, a screenshot of the frame will be captured and returned in the response. Otherwise,
     * no screenshot will be captured. Note that capturing a screenshot can fail, for example,
     * during renderer initialization. In such a case, no screenshot data will be returned.
     */
    screenshot?: ScreenshotParams;
}

export type BeginFrameResponse = {
    /**
     * Whether the BeginFrame resulted in damage and, thus, a new frame was committed to the
     * display. Reported for diagnostic uses, may be removed in the future.
     */
    hasDamage: boolean;
    /**
     * Base64-encoded image data of the screenshot, if one was requested and successfully taken. (Encoded as a base64 string when passed over JSON)
     */
    screenshotData?: string;
}

