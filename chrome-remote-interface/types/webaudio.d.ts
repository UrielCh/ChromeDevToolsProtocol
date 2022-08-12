
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
export type ContextRealtimeData = {
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
export type BaseAudioContext = {
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
export type AudioListener = {
    listenerId: GraphObjectId;
    contextId: GraphObjectId;
}

/**
 * Protocol object for AudioNode
 */
export type AudioNode = {
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
export type AudioParam = {
    paramId: GraphObjectId;
    nodeId: GraphObjectId;
    contextId: GraphObjectId;
    paramType: ParamType;
    rate: AutomationRate;
    defaultValue: number;
    minValue: number;
    maxValue: number;
}

export type GetRealtimeDataRequest = {
    contextId: GraphObjectId;
}

export type GetRealtimeDataResponse = {
    realtimeData: ContextRealtimeData;
}

/**
 * Notifies that a new BaseAudioContext has been created.
 */
export type ContextCreatedEvent = {
    context: BaseAudioContext;
}

/**
 * Notifies that an existing BaseAudioContext will be destroyed.
 */
export type ContextWillBeDestroyedEvent = {
    contextId: GraphObjectId;
}

/**
 * Notifies that existing BaseAudioContext has changed some properties (id stays the same)..
 */
export type ContextChangedEvent = {
    context: BaseAudioContext;
}

/**
 * Notifies that the construction of an AudioListener has finished.
 */
export type AudioListenerCreatedEvent = {
    listener: AudioListener;
}

/**
 * Notifies that a new AudioListener has been created.
 */
export type AudioListenerWillBeDestroyedEvent = {
    contextId: GraphObjectId;
    listenerId: GraphObjectId;
}

/**
 * Notifies that a new AudioNode has been created.
 */
export type AudioNodeCreatedEvent = {
    node: AudioNode;
}

/**
 * Notifies that an existing AudioNode has been destroyed.
 */
export type AudioNodeWillBeDestroyedEvent = {
    contextId: GraphObjectId;
    nodeId: GraphObjectId;
}

/**
 * Notifies that a new AudioParam has been created.
 */
export type AudioParamCreatedEvent = {
    param: AudioParam;
}

/**
 * Notifies that an existing AudioParam has been destroyed.
 */
export type AudioParamWillBeDestroyedEvent = {
    contextId: GraphObjectId;
    nodeId: GraphObjectId;
    paramId: GraphObjectId;
}

/**
 * Notifies that two AudioNodes are connected.
 */
export type NodesConnectedEvent = {
    contextId: GraphObjectId;
    sourceId: GraphObjectId;
    destinationId: GraphObjectId;
    sourceOutputIndex?: number;
    destinationInputIndex?: number;
}

/**
 * Notifies that AudioNodes are disconnected. The destination can be null, and it means all the outgoing connections from the source are disconnected.
 */
export type NodesDisconnectedEvent = {
    contextId: GraphObjectId;
    sourceId: GraphObjectId;
    destinationId: GraphObjectId;
    sourceOutputIndex?: number;
    destinationInputIndex?: number;
}

/**
 * Notifies that an AudioNode is connected to an AudioParam.
 */
export type NodeParamConnectedEvent = {
    contextId: GraphObjectId;
    sourceId: GraphObjectId;
    destinationId: GraphObjectId;
    sourceOutputIndex?: number;
}

/**
 * Notifies that an AudioNode is disconnected to an AudioParam.
 */
export type NodeParamDisconnectedEvent = {
    contextId: GraphObjectId;
    sourceId: GraphObjectId;
    destinationId: GraphObjectId;
    sourceOutputIndex?: number;
}

