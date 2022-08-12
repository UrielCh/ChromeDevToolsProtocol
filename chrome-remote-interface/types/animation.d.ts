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
export interface Animation {
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
export interface AnimationEffect {
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
export interface KeyframesRule {
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
export interface KeyframeStyle {
    /**
     * Keyframe's time offset.
     */
    offset: string;
    /**
     * `AnimationEffect`'s timing function.
     */
    easing: string;
}

export interface GetCurrentTimeRequest {
    /**
     * Id of animation.
     */
    id: string;
}

export interface GetCurrentTimeResponse {
    /**
     * Current time of the page.
     */
    currentTime: number;
}

export interface GetPlaybackRateResponse {
    /**
     * Playback rate for animations on page.
     */
    playbackRate: number;
}

export interface ReleaseAnimationsRequest {
    /**
     * List of animation ids to seek.
     */
    animations: string[];
}

export interface ResolveAnimationRequest {
    /**
     * Animation id.
     */
    animationId: string;
}

export interface ResolveAnimationResponse {
    /**
     * Corresponding remote object.
     */
    remoteObject: Runtime.RemoteObject;
}

export interface SeekAnimationsRequest {
    /**
     * List of animation ids to seek.
     */
    animations: string[];
    /**
     * Set the current time of each animation.
     */
    currentTime: number;
}

export interface SetPausedRequest {
    /**
     * Animations to set the pause state of.
     */
    animations: string[];
    /**
     * Paused state to set to.
     */
    paused: boolean;
}

export interface SetPlaybackRateRequest {
    /**
     * Playback rate for animations on page
     */
    playbackRate: number;
}

export interface SetTimingRequest {
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
export interface AnimationCanceledEvent {
    /**
     * Id of the animation that was cancelled.
     */
    id: string;
}

/**
 * Event for each animation that has been created.
 */
export interface AnimationCreatedEvent {
    /**
     * Id of the animation that was created.
     */
    id: string;
}

/**
 * Event for animation that has been started.
 */
export interface AnimationStartedEvent {
    /**
     * Animation that was started.
     */
    animation: Animation;
}

