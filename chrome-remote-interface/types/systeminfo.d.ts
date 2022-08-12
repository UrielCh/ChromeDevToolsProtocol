
export type integer = number;

/**
 * The SystemInfo domain defines methods and events for querying low-level system information.
 */

/**
 * Describes a single graphics processor (GPU).
 */
export interface GPUDevice {
    /**
     * PCI ID of the GPU vendor, if available; 0 otherwise.
     */
    vendorId: number;
    /**
     * PCI ID of the GPU device, if available; 0 otherwise.
     */
    deviceId: number;
    /**
     * Sub sys ID of the GPU, only available on Windows.
     */
    subSysId?: number;
    /**
     * Revision of the GPU, only available on Windows.
     */
    revision?: number;
    /**
     * String description of the GPU vendor, if the PCI ID is not available.
     */
    vendorString: string;
    /**
     * String description of the GPU device, if the PCI ID is not available.
     */
    deviceString: string;
    /**
     * String description of the GPU driver vendor.
     */
    driverVendor: string;
    /**
     * String description of the GPU driver version.
     */
    driverVersion: string;
}

/**
 * Describes the width and height dimensions of an entity.
 */
export interface Size {
    /**
     * Width in pixels.
     */
    width: integer;
    /**
     * Height in pixels.
     */
    height: integer;
}

/**
 * Describes a supported video decoding profile with its associated minimum and
 * maximum resolutions.
 */
export interface VideoDecodeAcceleratorCapability {
    /**
     * Video codec profile that is supported, e.g. VP9 Profile 2.
     */
    profile: string;
    /**
     * Maximum video dimensions in pixels supported for this |profile|.
     */
    maxResolution: Size;
    /**
     * Minimum video dimensions in pixels supported for this |profile|.
     */
    minResolution: Size;
}

/**
 * Describes a supported video encoding profile with its associated maximum
 * resolution and maximum framerate.
 */
export interface VideoEncodeAcceleratorCapability {
    /**
     * Video codec profile that is supported, e.g H264 Main.
     */
    profile: string;
    /**
     * Maximum video dimensions in pixels supported for this |profile|.
     */
    maxResolution: Size;
    /**
     * Maximum encoding framerate in frames per second supported for this
     * |profile|, as fraction's numerator and denominator, e.g. 24/1 fps,
     * 24000/1001 fps, etc.
     */
    maxFramerateNumerator: integer;
    maxFramerateDenominator: integer;
}

/**
 * YUV subsampling type of the pixels of a given image.
 */
export type SubsamplingFormat = ("yuv420" | "yuv422" | "yuv444");

/**
 * Image format of a given image.
 */
export type ImageType = ("jpeg" | "webp" | "unknown");

/**
 * Describes a supported image decoding profile with its associated minimum and
 * maximum resolutions and subsampling.
 */
export interface ImageDecodeAcceleratorCapability {
    /**
     * Image coded, e.g. Jpeg.
     */
    imageType: ImageType;
    /**
     * Maximum supported dimensions of the image in pixels.
     */
    maxDimensions: Size;
    /**
     * Minimum supported dimensions of the image in pixels.
     */
    minDimensions: Size;
    /**
     * Optional array of supported subsampling formats, e.g. 4:2:0, if known.
     */
    subsamplings: SubsamplingFormat[];
}

/**
 * Provides information about the GPU(s) on the system.
 */
export interface GPUInfo {
    /**
     * The graphics devices on the system. Element 0 is the primary GPU.
     */
    devices: GPUDevice[];
    /**
     * An optional dictionary of additional GPU related attributes.
     */
    auxAttributes?: any;
    /**
     * An optional dictionary of graphics features and their status.
     */
    featureStatus?: any;
    /**
     * An optional array of GPU driver bug workarounds.
     */
    driverBugWorkarounds: string[];
    /**
     * Supported accelerated video decoding capabilities.
     */
    videoDecoding: VideoDecodeAcceleratorCapability[];
    /**
     * Supported accelerated video encoding capabilities.
     */
    videoEncoding: VideoEncodeAcceleratorCapability[];
    /**
     * Supported accelerated image decoding capabilities.
     */
    imageDecoding: ImageDecodeAcceleratorCapability[];
}

/**
 * Represents process info.
 */
export interface ProcessInfo {
    /**
     * Specifies process type.
     */
    type: string;
    /**
     * Specifies process id.
     */
    id: integer;
    /**
     * Specifies cumulative CPU usage in seconds across all threads of the
     * process since the process start.
     */
    cpuTime: number;
}

export interface GetInfoResponse {
    /**
     * Information about the GPUs on the system.
     */
    gpu: GPUInfo;
    /**
     * A platform-dependent description of the model of the machine. On Mac OS, this is, for
     * example, 'MacBookPro'. Will be the empty string if not supported.
     */
    modelName: string;
    /**
     * A platform-dependent description of the version of the machine. On Mac OS, this is, for
     * example, '10.1'. Will be the empty string if not supported.
     */
    modelVersion: string;
    /**
     * The command line string used to launch the browser. Will be the empty string if not
     * supported.
     */
    commandLine: string;
}

export interface GetProcessInfoResponse {
    /**
     * An array of process info blocks.
     */
    processInfo: ProcessInfo[];
}

