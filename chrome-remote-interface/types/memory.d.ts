
export type integer = number;


/**
 * Memory pressure level.
 */
export type PressureLevel = ("moderate" | "critical");

/**
 * Heap profile sample.
 */
export type SamplingProfileNode = {
    /**
     * Size of the sampled allocation.
     */
    size: number;
    /**
     * Total bytes attributed to this sample.
     */
    total: number;
    /**
     * Execution stack at the point of allocation.
     */
    stack: string[];
}

/**
 * Array of heap profile samples.
 */
export type SamplingProfile = {
    samples: SamplingProfileNode[];
    modules: Module[];
}

/**
 * Executable module information
 */
export type Module = {
    /**
     * Name of the module.
     */
    name: string;
    /**
     * UUID of the module.
     */
    uuid: string;
    /**
     * Base address where the module is loaded into memory. Encoded as a decimal
     * or hexadecimal (0x prefixed) string.
     */
    baseAddress: string;
    /**
     * Size of the module in bytes.
     */
    size: number;
}

export type GetDOMCountersResponse = {
    documents: integer;
    nodes: integer;
    jsEventListeners: integer;
}

export type SetPressureNotificationsSuppressedRequest = {
    /**
     * If true, memory pressure notifications will be suppressed.
     */
    suppressed: boolean;
}

export type SimulatePressureNotificationRequest = {
    /**
     * Memory pressure level of the notification.
     */
    level: PressureLevel;
}

export type StartSamplingRequest = {
    /**
     * Average number of bytes between samples.
     */
    samplingInterval?: integer;
    /**
     * Do not randomize intervals between samples.
     */
    suppressRandomness?: boolean;
}

export type GetAllTimeSamplingProfileResponse = {
    profile: SamplingProfile;
}

export type GetBrowserSamplingProfileResponse = {
    profile: SamplingProfile;
}

export type GetSamplingProfileResponse = {
    profile: SamplingProfile;
}

