
export type integer = number;


/**
 * Run-time execution metric.
 */
export interface Metric {
    /**
     * Metric name.
     */
    name: string;
    /**
     * Metric value.
     */
    value: number;
}

export const enum EnableRequestTimeDomain {
    TimeTicks = "timeTicks",
    ThreadTicks = "threadTicks",
}

export interface EnableRequest {
    /**
     * Time domain to use for collecting and reporting duration metrics. (EnableRequestTimeDomain enum)
     */
    timeDomain?: ("timeTicks" | "threadTicks");
}

export const enum SetTimeDomainRequestTimeDomain {
    TimeTicks = "timeTicks",
    ThreadTicks = "threadTicks",
}

export interface SetTimeDomainRequest {
    /**
     * Time domain (SetTimeDomainRequestTimeDomain enum)
     */
    timeDomain: ("timeTicks" | "threadTicks");
}

export interface GetMetricsResponse {
    /**
     * Current values for run-time metrics.
     */
    metrics: Metric[];
}

/**
 * Current values of the metrics.
 */
export interface MetricsEvent {
    /**
     * Current values of the metrics.
     */
    metrics: Metric[];
    /**
     * Timestamp title.
     */
    title: string;
}

