
export type integer = number;

/**
 * This domain allows inspection of Web Audio API.
 * https://webaudio.github.io/web-audio-api/
 */

/**
 * An unique ID for a graph object (AudioContext, AudioNode, AudioParam) in Web Audio API
 */
export type GraphObjectId = string;

/**
 * Enum of BaseAudioContext types
 */
export type ContextType = ("realtime" | "offline");

/**
 * Enum of AudioContextState from the spec
 */
export type ContextState = ("suspended" | "running" | "closed");

/**
 * Enum of AudioNode types
 */
export type NodeType = string;

/**
 * Enum of AudioNode::ChannelCountMode from the spec
 */
export type ChannelCountMode = ("clamped-max" | "explicit" | "max");

/**
 * Enum of AudioNode::ChannelInterpretation from the spec
 */
export type ChannelInterpretation = ("discrete" | "speakers");

/**
 * Enum of AudioParam types
 */
export type ParamType = string;

/**
 * Enum of AudioParam::AutomationRate from the spec
 */
export type AutomationRate = ("a-rate" | "k-rate");

/**
 * Fields in AudioContext that change in real-time.
 */
export interface ContextRealtimeData {
    /**
     * The current context time in second in BaseAudioContext.
     */
    currentTime: number;
    /**
     * The time spent on rendering graph divided by render quantum duration,
     * and multiplied by 100. 100 means the audio renderer reached the full
     * capacity and glitch may occur.
     */
    renderCapacity: number;
    /**
     * A running mean of callback interval.
     */
    callbackIntervalMean: number;
    /**
     * A running variance of callback interval.
     */
    callbackIntervalVariance: number;
}

/**
 * Protocol object for BaseAudioContext
 */
export interface BaseAudioContext {
    contextId: GraphObjectId;
    contextType: ContextType;
    contextState: ContextState;
    realtimeData?: ContextRealtimeData;
    /**
     * Platform-dependent callback buffer size.
     */
    callbackBufferSize: number;
    /**
     * Number of output channels supported by audio hardware in use.
     */
    maxOutputChannelCount: number;
    /**
     * Context sample rate.
     */
    sampleRate: number;
}

/**
 * Protocol object for AudioListener
 */
export interface AudioListener {
    listenerId: GraphObjectId;
    contextId: GraphObjectId;
}

/**
 * Protocol object for AudioNode
 */
export interface AudioNode {
    nodeId: GraphObjectId;
    contextId: GraphObjectId;
    nodeType: NodeType;
    numberOfInputs: number;
    numberOfOutputs: number;
    channelCount: number;
    channelCountMode: ChannelCountMode;
    channelInterpretation: ChannelInterpretation;
}

/**
 * Protocol object for AudioParam
 */
export interface AudioParam {
    paramId: GraphObjectId;
    nodeId: GraphObjectId;
    contextId: GraphObjectId;
    paramType: ParamType;
    rate: AutomationRate;
    defaultValue: number;
    minValue: number;
    maxValue: number;
}

export interface GetRealtimeDataRequest {
    contextId: GraphObjectId;
}

export interface GetRealtimeDataResponse {
    realtimeData: ContextRealtimeData;
}

/**
 * Notifies that a new BaseAudioContext has been created.
 */
export interface ContextCreatedEvent {
    context: BaseAudioContext;
}

/**
 * Notifies that an existing BaseAudioContext will be destroyed.
 */
export interface ContextWillBeDestroyedEvent {
    contextId: GraphObjectId;
}

/**
 * Notifies that existing BaseAudioContext has changed some properties (id stays the same)..
 */
export interface ContextChangedEvent {
    context: BaseAudioContext;
}

/**
 * Notifies that the construction of an AudioListener has finished.
 */
export interface AudioListenerCreatedEvent {
    listener: AudioListener;
}

/**
 * Notifies that a new AudioListener has been created.
 */
export interface AudioListenerWillBeDestroyedEvent {
    contextId: GraphObjectId;
    listenerId: GraphObjectId;
}

/**
 * Notifies that a new AudioNode has been created.
 */
export interface AudioNodeCreatedEvent {
    node: AudioNode;
}

/**
 * Notifies that an existing AudioNode has been destroyed.
 */
export interface AudioNodeWillBeDestroyedEvent {
    contextId: GraphObjectId;
    nodeId: GraphObjectId;
}

/**
 * Notifies that a new AudioParam has been created.
 */
export interface AudioParamCreatedEvent {
    param: AudioParam;
}

/**
 * Notifies that an existing AudioParam has been destroyed.
 */
export interface AudioParamWillBeDestroyedEvent {
    contextId: GraphObjectId;
    nodeId: GraphObjectId;
    paramId: GraphObjectId;
}

/**
 * Notifies that two AudioNodes are connected.
 */
export interface NodesConnectedEvent {
    contextId: GraphObjectId;
    sourceId: GraphObjectId;
    destinationId: GraphObjectId;
    sourceOutputIndex?: number;
    destinationInputIndex?: number;
}

/**
 * Notifies that AudioNodes are disconnected. The destination can be null, and it means all the outgoing connections from the source are disconnected.
 */
export interface NodesDisconnectedEvent {
    contextId: GraphObjectId;
    sourceId: GraphObjectId;
    destinationId: GraphObjectId;
    sourceOutputIndex?: number;
    destinationInputIndex?: number;
}

/**
 * Notifies that an AudioNode is connected to an AudioParam.
 */
export interface NodeParamConnectedEvent {
    contextId: GraphObjectId;
    sourceId: GraphObjectId;
    destinationId: GraphObjectId;
    sourceOutputIndex?: number;
}

/**
 * Notifies that an AudioNode is disconnected to an AudioParam.
 */
export interface NodeParamDisconnectedEvent {
    contextId: GraphObjectId;
    sourceId: GraphObjectId;
    destinationId: GraphObjectId;
    sourceOutputIndex?: number;
}

