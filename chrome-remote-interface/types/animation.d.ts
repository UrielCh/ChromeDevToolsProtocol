import type * as DOM from './dom.d.ts'
import type * as Runtime from './runtime.d.ts'

export type integer = number;


export const enum AnimationType {
    CSSTransition = "CSSTransition",
    CSSAnimation = "CSSAnimation",
    WebAnimation = "WebAnimation",
}

/**
 * Animation instance.
 */
export type Animation = {
    /**
     * `Animation`'s id.
     */
    id: string;
    /**
     * `Animation`'s name.
     */
    name: string;
    /**
     * `Animation`'s internal paused state.
     */
    pausedState: boolean;
    /**
     * `Animation`'s play state.
     */
    playState: string;
    /**
     * `Animation`'s playback rate.
     */
    playbackRate: number;
    /**
     * `Animation`'s start time.
     */
    startTime: number;
    /**
     * `Animation`'s current time.
     */
    currentTime: number;
    /**
     * Animation type of `Animation`. (AnimationType enum)
     */
    type: ("CSSTransition" | "CSSAnimation" | "WebAnimation");
    /**
     * `Animation`'s source animation node.
     */
    source?: AnimationEffect;
    /**
     * A unique ID for `Animation` representing the sources that triggered this CSS
     * animation/transition.
     */
    cssId?: string;
}

/**
 * AnimationEffect instance
 */
export type AnimationEffect = {
    /**
     * `AnimationEffect`'s delay.
     */
    delay: number;
    /**
     * `AnimationEffect`'s end delay.
     */
    endDelay: number;
    /**
     * `AnimationEffect`'s iteration start.
     */
    iterationStart: number;
    /**
     * `AnimationEffect`'s iterations.
     */
    iterations: number;
    /**
     * `AnimationEffect`'s iteration duration.
     */
    duration: number;
    /**
     * `AnimationEffect`'s playback direction.
     */
    direction: string;
    /**
     * `AnimationEffect`'s fill mode.
     */
    fill: string;
    /**
     * `AnimationEffect`'s target node.
     */
    backendNodeId?: DOM.BackendNodeId;
    /**
     * `AnimationEffect`'s keyframes.
     */
    keyframesRule?: KeyframesRule;
    /**
     * `AnimationEffect`'s timing function.
     */
    easing: string;
}

/**
 * Keyframes Rule
 */
export type KeyframesRule = {
    /**
     * CSS keyframed animation's name.
     */
    name?: string;
    /**
     * List of animation keyframes.
     */
    keyframes: KeyframeStyle[];
}

/**
 * Keyframe Style
 */
export type KeyframeStyle = {
    /**
     * Keyframe's time offset.
     */
    offset: string;
    /**
     * `AnimationEffect`'s timing function.
     */
    easing: string;
}

export type GetCurrentTimeRequest = {
    /**
     * Id of animation.
     */
    id: string;
}

export type GetCurrentTimeResponse = {
    /**
     * Current time of the page.
     */
    currentTime: number;
}

export type GetPlaybackRateResponse = {
    /**
     * Playback rate for animations on page.
     */
    playbackRate: number;
}

export type ReleaseAnimationsRequest = {
    /**
     * List of animation ids to seek.
     */
    animations: string[];
}

export type ResolveAnimationRequest = {
    /**
     * Animation id.
     */
    animationId: string;
}

export type ResolveAnimationResponse = {
    /**
     * Corresponding remote object.
     */
    remoteObject: Runtime.RemoteObject;
}

export type SeekAnimationsRequest = {
    /**
     * List of animation ids to seek.
     */
    animations: string[];
    /**
     * Set the current time of each animation.
     */
    currentTime: number;
}

export type SetPausedRequest = {
    /**
     * Animations to set the pause state of.
     */
    animations: string[];
    /**
     * Paused state to set to.
     */
    paused: boolean;
}

export type SetPlaybackRateRequest = {
    /**
     * Playback rate for animations on page
     */
    playbackRate: number;
}

export type SetTimingRequest = {
    /**
     * Animation id.
     */
    animationId: string;
    /**
     * Duration of the animation.
     */
    duration: number;
    /**
     * Delay of the animation.
     */
    delay: number;
}

/**
 * Event for when an animation has been cancelled.
 */
export type AnimationCanceledEvent = {
    /**
     * Id of the animation that was cancelled.
     */
    id: string;
}

/**
 * Event for each animation that has been created.
 */
export type AnimationCreatedEvent = {
    /**
     * Id of the animation that was created.
     */
    id: string;
}

/**
 * Event for animation that has been started.
 */
export type AnimationStartedEvent = {
    /**
     * Animation that was started.
     */
    animation: Animation;
}

