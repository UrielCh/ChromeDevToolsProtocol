/* eslint-disable no-unused-vars */
/**********************************************************************
 * Auto-generated by protocol-dts-generator.ts, do not edit manually. *
 **********************************************************************/

import Protocol from "./protocol";
/**
 * all protocol events.
 */
export interface ProtocolEventsApi {
    /**
     * The loadComplete event mirrors the load complete event sent by the browser to assistive
     * technology when the web page has finished loading.
     */
    "Accessibility.loadComplete"(params: Protocol.Accessibility.LoadCompleteEvent): void;
    /**
     * The nodesUpdated event is sent every time a previously requested node has changed the in tree.
     */
    "Accessibility.nodesUpdated"(params: Protocol.Accessibility.NodesUpdatedEvent): void;
    /**
     * Event for when an animation has been cancelled.
     */
    "Animation.animationCanceled"(params: Protocol.Animation.AnimationCanceledEvent): void;
    /**
     * Event for each animation that has been created.
     */
    "Animation.animationCreated"(params: Protocol.Animation.AnimationCreatedEvent): void;
    /**
     * Event for animation that has been started.
     */
    "Animation.animationStarted"(params: Protocol.Animation.AnimationStartedEvent): void;
    "Audits.issueAdded"(params: Protocol.Audits.IssueAddedEvent): void;
    /**
     * Called when the recording state for the service has been updated.
     */
    "BackgroundService.recordingStateChanged"(params: Protocol.BackgroundService.RecordingStateChangedEvent): void;
    /**
     * Called with all existing backgroundServiceEvents when enabled, and all new
     * events afterwards if enabled and recording.
     */
    "BackgroundService.backgroundServiceEventReceived"(params: Protocol.BackgroundService.BackgroundServiceEventReceivedEvent): void;
    /**
     * Fired when page is about to start a download.
     */
    "Browser.downloadWillBegin"(params: Protocol.Browser.DownloadWillBeginEvent): void;
    /**
     * Fired when download makes progress. Last call has |done| == true.
     */
    "Browser.downloadProgress"(params: Protocol.Browser.DownloadProgressEvent): void;
    /**
     * Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded
     * web font
     */
    "CSS.fontsUpdated"(params: Protocol.CSS.FontsUpdatedEvent): void;
    /**
     * Fires whenever a MediaQuery result changes (for example, after a browser window has been
     * resized.) The current implementation considers only viewport-dependent media features.
     */
    "CSS.mediaQueryResultChanged"(): void;
    /**
     * Fired whenever an active document stylesheet is added.
     */
    "CSS.styleSheetAdded"(params: Protocol.CSS.StyleSheetAddedEvent): void;
    /**
     * Fired whenever a stylesheet is changed as a result of the client operation.
     */
    "CSS.styleSheetChanged"(params: Protocol.CSS.StyleSheetChangedEvent): void;
    /**
     * Fired whenever an active document stylesheet is removed.
     */
    "CSS.styleSheetRemoved"(params: Protocol.CSS.StyleSheetRemovedEvent): void;
    /**
     * This is fired whenever the list of available sinks changes. A sink is a
     * device or a software surface that you can cast to.
     */
    "Cast.sinksUpdated"(params: Protocol.Cast.SinksUpdatedEvent): void;
    /**
     * This is fired whenever the outstanding issue/error message changes.
     * |issueMessage| is empty if there is no issue.
     */
    "Cast.issueUpdated"(params: Protocol.Cast.IssueUpdatedEvent): void;
    /**
     * Fired when `Element`'s attribute is modified.
     */
    "DOM.attributeModified"(params: Protocol.DOM.AttributeModifiedEvent): void;
    /**
     * Fired when `Element`'s attribute is removed.
     */
    "DOM.attributeRemoved"(params: Protocol.DOM.AttributeRemovedEvent): void;
    /**
     * Mirrors `DOMCharacterDataModified` event.
     */
    "DOM.characterDataModified"(params: Protocol.DOM.CharacterDataModifiedEvent): void;
    /**
     * Fired when `Container`'s child node count has changed.
     */
    "DOM.childNodeCountUpdated"(params: Protocol.DOM.ChildNodeCountUpdatedEvent): void;
    /**
     * Mirrors `DOMNodeInserted` event.
     */
    "DOM.childNodeInserted"(params: Protocol.DOM.ChildNodeInsertedEvent): void;
    /**
     * Mirrors `DOMNodeRemoved` event.
     */
    "DOM.childNodeRemoved"(params: Protocol.DOM.ChildNodeRemovedEvent): void;
    /**
     * Called when distribution is changed.
     */
    "DOM.distributedNodesUpdated"(params: Protocol.DOM.DistributedNodesUpdatedEvent): void;
    /**
     * Fired when `Document` has been totally updated. Node ids are no longer valid.
     */
    "DOM.documentUpdated"(): void;
    /**
     * Fired when `Element`'s inline style is modified via a CSS property modification.
     */
    "DOM.inlineStyleInvalidated"(params: Protocol.DOM.InlineStyleInvalidatedEvent): void;
    /**
     * Called when a pseudo element is added to an element.
     */
    "DOM.pseudoElementAdded"(params: Protocol.DOM.PseudoElementAddedEvent): void;
    /**
     * Called when a pseudo element is removed from an element.
     */
    "DOM.pseudoElementRemoved"(params: Protocol.DOM.PseudoElementRemovedEvent): void;
    /**
     * Fired when backend wants to provide client with the missing DOM structure. This happens upon
     * most of the calls requesting node ids.
     */
    "DOM.setChildNodes"(params: Protocol.DOM.SetChildNodesEvent): void;
    /**
     * Called when shadow root is popped from the element.
     */
    "DOM.shadowRootPopped"(params: Protocol.DOM.ShadowRootPoppedEvent): void;
    /**
     * Called when shadow root is pushed into the element.
     */
    "DOM.shadowRootPushed"(params: Protocol.DOM.ShadowRootPushedEvent): void;
    "DOMStorage.domStorageItemAdded"(params: Protocol.DOMStorage.DomStorageItemAddedEvent): void;
    "DOMStorage.domStorageItemRemoved"(params: Protocol.DOMStorage.DomStorageItemRemovedEvent): void;
    "DOMStorage.domStorageItemUpdated"(params: Protocol.DOMStorage.DomStorageItemUpdatedEvent): void;
    "DOMStorage.domStorageItemsCleared"(params: Protocol.DOMStorage.DomStorageItemsClearedEvent): void;
    "Database.addDatabase"(params: Protocol.Database.AddDatabaseEvent): void;
    /**
     * Notification sent after the virtual time budget for the current VirtualTimePolicy has run out.
     */
    "Emulation.virtualTimeBudgetExpired"(): void;
    /**
     * Issued when the target starts or stops needing BeginFrames.
     * Deprecated. Issue beginFrame unconditionally instead and use result from
     * beginFrame to detect whether the frames were suppressed.
     */
    "HeadlessExperimental.needsBeginFramesChanged"(params: Protocol.HeadlessExperimental.NeedsBeginFramesChangedEvent): void;
    /**
     * Emitted only when `Input.setInterceptDrags` is enabled. Use this data with `Input.dispatchDragEvent` to
     * restore normal drag and drop behavior.
     */
    "Input.dragIntercepted"(params: Protocol.Input.DragInterceptedEvent): void;
    /**
     * Fired when remote debugging connection is about to be terminated. Contains detach reason.
     */
    "Inspector.detached"(params: Protocol.Inspector.DetachedEvent): void;
    /**
     * Fired when debugging target has crashed
     */
    "Inspector.targetCrashed"(): void;
    /**
     * Fired when debugging target has reloaded after crash
     */
    "Inspector.targetReloadedAfterCrash"(): void;
    "LayerTree.layerPainted"(params: Protocol.LayerTree.LayerPaintedEvent): void;
    "LayerTree.layerTreeDidChange"(params: Protocol.LayerTree.LayerTreeDidChangeEvent): void;
    /**
     * Issued when new message was logged.
     */
    "Log.entryAdded"(params: Protocol.Log.EntryAddedEvent): void;
    /**
     * Fired when data chunk was received over the network.
     */
    "Network.dataReceived"(params: Protocol.Network.DataReceivedEvent): void;
    /**
     * Fired when EventSource message is received.
     */
    "Network.eventSourceMessageReceived"(params: Protocol.Network.EventSourceMessageReceivedEvent): void;
    /**
     * Fired when HTTP request has failed to load.
     */
    "Network.loadingFailed"(params: Protocol.Network.LoadingFailedEvent): void;
    /**
     * Fired when HTTP request has finished loading.
     */
    "Network.loadingFinished"(params: Protocol.Network.LoadingFinishedEvent): void;
    /**
     * Details of an intercepted HTTP request, which must be either allowed, blocked, modified or
     * mocked.
     * Deprecated, use Fetch.requestPaused instead.
     */
    "Network.requestIntercepted"(params: Protocol.Network.RequestInterceptedEvent): void;
    /**
     * Fired if request ended up loading from cache.
     */
    "Network.requestServedFromCache"(params: Protocol.Network.RequestServedFromCacheEvent): void;
    /**
     * Fired when page is about to send HTTP request.
     */
    "Network.requestWillBeSent"(params: Protocol.Network.RequestWillBeSentEvent): void;
    /**
     * Fired when resource loading priority is changed
     */
    "Network.resourceChangedPriority"(params: Protocol.Network.ResourceChangedPriorityEvent): void;
    /**
     * Fired when a signed exchange was received over the network
     */
    "Network.signedExchangeReceived"(params: Protocol.Network.SignedExchangeReceivedEvent): void;
    /**
     * Fired when HTTP response is available.
     */
    "Network.responseReceived"(params: Protocol.Network.ResponseReceivedEvent): void;
    /**
     * Fired when WebSocket is closed.
     */
    "Network.webSocketClosed"(params: Protocol.Network.WebSocketClosedEvent): void;
    /**
     * Fired upon WebSocket creation.
     */
    "Network.webSocketCreated"(params: Protocol.Network.WebSocketCreatedEvent): void;
    /**
     * Fired when WebSocket message error occurs.
     */
    "Network.webSocketFrameError"(params: Protocol.Network.WebSocketFrameErrorEvent): void;
    /**
     * Fired when WebSocket message is received.
     */
    "Network.webSocketFrameReceived"(params: Protocol.Network.WebSocketFrameReceivedEvent): void;
    /**
     * Fired when WebSocket message is sent.
     */
    "Network.webSocketFrameSent"(params: Protocol.Network.WebSocketFrameSentEvent): void;
    /**
     * Fired when WebSocket handshake response becomes available.
     */
    "Network.webSocketHandshakeResponseReceived"(params: Protocol.Network.WebSocketHandshakeResponseReceivedEvent): void;
    /**
     * Fired when WebSocket is about to initiate handshake.
     */
    "Network.webSocketWillSendHandshakeRequest"(params: Protocol.Network.WebSocketWillSendHandshakeRequestEvent): void;
    /**
     * Fired upon WebTransport creation.
     */
    "Network.webTransportCreated"(params: Protocol.Network.WebTransportCreatedEvent): void;
    /**
     * Fired when WebTransport handshake is finished.
     */
    "Network.webTransportConnectionEstablished"(params: Protocol.Network.WebTransportConnectionEstablishedEvent): void;
    /**
     * Fired when WebTransport is disposed.
     */
    "Network.webTransportClosed"(params: Protocol.Network.WebTransportClosedEvent): void;
    /**
     * Fired when additional information about a requestWillBeSent event is available from the
     * network stack. Not every requestWillBeSent event will have an additional
     * requestWillBeSentExtraInfo fired for it, and there is no guarantee whether requestWillBeSent
     * or requestWillBeSentExtraInfo will be fired first for the same request.
     */
    "Network.requestWillBeSentExtraInfo"(params: Protocol.Network.RequestWillBeSentExtraInfoEvent): void;
    /**
     * Fired when additional information about a responseReceived event is available from the network
     * stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
     * it, and responseReceivedExtraInfo may be fired before or after responseReceived.
     */
    "Network.responseReceivedExtraInfo"(params: Protocol.Network.ResponseReceivedExtraInfoEvent): void;
    /**
     * Fired exactly once for each Trust Token operation. Depending on
     * the type of the operation and whether the operation succeeded or
     * failed, the event is fired before the corresponding request was sent
     * or after the response was received.
     */
    "Network.trustTokenOperationDone"(params: Protocol.Network.TrustTokenOperationDoneEvent): void;
    /**
     * Fired once when parsing the .wbn file has succeeded.
     * The event contains the information about the web bundle contents.
     */
    "Network.subresourceWebBundleMetadataReceived"(params: Protocol.Network.SubresourceWebBundleMetadataReceivedEvent): void;
    /**
     * Fired once when parsing the .wbn file has failed.
     */
    "Network.subresourceWebBundleMetadataError"(params: Protocol.Network.SubresourceWebBundleMetadataErrorEvent): void;
    /**
     * Fired when handling requests for resources within a .wbn file.
     * Note: this will only be fired for resources that are requested by the webpage.
     */
    "Network.subresourceWebBundleInnerResponseParsed"(params: Protocol.Network.SubresourceWebBundleInnerResponseParsedEvent): void;
    /**
     * Fired when request for resources within a .wbn file failed.
     */
    "Network.subresourceWebBundleInnerResponseError"(params: Protocol.Network.SubresourceWebBundleInnerResponseErrorEvent): void;
    /**
     * Is sent whenever a new report is added.
     * And after 'enableReportingApi' for all existing reports.
     */
    "Network.reportingApiReportAdded"(params: Protocol.Network.ReportingApiReportAddedEvent): void;
    "Network.reportingApiReportUpdated"(params: Protocol.Network.ReportingApiReportUpdatedEvent): void;
    "Network.reportingApiEndpointsChangedForOrigin"(params: Protocol.Network.ReportingApiEndpointsChangedForOriginEvent): void;
    /**
     * Fired when the node should be inspected. This happens after call to `setInspectMode` or when
     * user manually inspects an element.
     */
    "Overlay.inspectNodeRequested"(params: Protocol.Overlay.InspectNodeRequestedEvent): void;
    /**
     * Fired when the node should be highlighted. This happens after call to `setInspectMode`.
     */
    "Overlay.nodeHighlightRequested"(params: Protocol.Overlay.NodeHighlightRequestedEvent): void;
    /**
     * Fired when user asks to capture screenshot of some area on the page.
     */
    "Overlay.screenshotRequested"(params: Protocol.Overlay.ScreenshotRequestedEvent): void;
    /**
     * Fired when user cancels the inspect mode.
     */
    "Overlay.inspectModeCanceled"(): void;
    "Page.domContentEventFired"(params: Protocol.Page.DomContentEventFiredEvent): void;
    /**
     * Emitted only when `page.interceptFileChooser` is enabled.
     */
    "Page.fileChooserOpened"(params: Protocol.Page.FileChooserOpenedEvent): void;
    /**
     * Fired when frame has been attached to its parent.
     */
    "Page.frameAttached"(params: Protocol.Page.FrameAttachedEvent): void;
    /**
     * Fired when frame no longer has a scheduled navigation.
     */
    "Page.frameClearedScheduledNavigation"(params: Protocol.Page.FrameClearedScheduledNavigationEvent): void;
    /**
     * Fired when frame has been detached from its parent.
     */
    "Page.frameDetached"(params: Protocol.Page.FrameDetachedEvent): void;
    /**
     * Fired once navigation of the frame has completed. Frame is now associated with the new loader.
     */
    "Page.frameNavigated"(params: Protocol.Page.FrameNavigatedEvent): void;
    /**
     * Fired when opening document to write to.
     */
    "Page.documentOpened"(params: Protocol.Page.DocumentOpenedEvent): void;
    "Page.frameResized"(): void;
    /**
     * Fired when a renderer-initiated navigation is requested.
     * Navigation may still be cancelled after the event is issued.
     */
    "Page.frameRequestedNavigation"(params: Protocol.Page.FrameRequestedNavigationEvent): void;
    /**
     * Fired when frame schedules a potential navigation.
     */
    "Page.frameScheduledNavigation"(params: Protocol.Page.FrameScheduledNavigationEvent): void;
    /**
     * Fired when frame has started loading.
     */
    "Page.frameStartedLoading"(params: Protocol.Page.FrameStartedLoadingEvent): void;
    /**
     * Fired when frame has stopped loading.
     */
    "Page.frameStoppedLoading"(params: Protocol.Page.FrameStoppedLoadingEvent): void;
    /**
     * Fired when page is about to start a download.
     * Deprecated. Use Browser.downloadWillBegin instead.
     */
    "Page.downloadWillBegin"(params: Protocol.Page.DownloadWillBeginEvent): void;
    /**
     * Fired when download makes progress. Last call has |done| == true.
     * Deprecated. Use Browser.downloadProgress instead.
     */
    "Page.downloadProgress"(params: Protocol.Page.DownloadProgressEvent): void;
    /**
     * Fired when interstitial page was hidden
     */
    "Page.interstitialHidden"(): void;
    /**
     * Fired when interstitial page was shown
     */
    "Page.interstitialShown"(): void;
    /**
     * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been
     * closed.
     */
    "Page.javascriptDialogClosed"(params: Protocol.Page.JavascriptDialogClosedEvent): void;
    /**
     * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to
     * open.
     */
    "Page.javascriptDialogOpening"(params: Protocol.Page.JavascriptDialogOpeningEvent): void;
    /**
     * Fired for top level page lifecycle events such as navigation, load, paint, etc.
     */
    "Page.lifecycleEvent"(params: Protocol.Page.LifecycleEventEvent): void;
    /**
     * Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
     * not assume any ordering with the Page.frameNavigated event. This event is fired only for
     * main-frame history navigation where the document changes (non-same-document navigations),
     * when bfcache navigation fails.
     */
    "Page.backForwardCacheNotUsed"(params: Protocol.Page.BackForwardCacheNotUsedEvent): void;
    "Page.loadEventFired"(params: Protocol.Page.LoadEventFiredEvent): void;
    /**
     * Fired when same-document navigation happens, e.g. due to history API usage or anchor navigation.
     */
    "Page.navigatedWithinDocument"(params: Protocol.Page.NavigatedWithinDocumentEvent): void;
    /**
     * Compressed image data requested by the `startScreencast`.
     */
    "Page.screencastFrame"(params: Protocol.Page.ScreencastFrameEvent): void;
    /**
     * Fired when the page with currently enabled screencast was shown or hidden `.
     */
    "Page.screencastVisibilityChanged"(params: Protocol.Page.ScreencastVisibilityChangedEvent): void;
    /**
     * Fired when a new window is going to be opened, via window.open(), link click, form submission,
     * etc.
     */
    "Page.windowOpen"(params: Protocol.Page.WindowOpenEvent): void;
    /**
     * Issued for every compilation cache generated. Is only available
     * if Page.setGenerateCompilationCache is enabled.
     */
    "Page.compilationCacheProduced"(params: Protocol.Page.CompilationCacheProducedEvent): void;
    /**
     * Current values of the metrics.
     */
    "Performance.metrics"(params: Protocol.Performance.MetricsEvent): void;
    /**
     * Sent when a performance timeline event is added. See reportPerformanceTimeline method.
     */
    "PerformanceTimeline.timelineEventAdded"(params: Protocol.PerformanceTimeline.TimelineEventAddedEvent): void;
    /**
     * There is a certificate error. If overriding certificate errors is enabled, then it should be
     * handled with the `handleCertificateError` command. Note: this event does not fire if the
     * certificate error has been allowed internally. Only one client per target should override
     * certificate errors at the same time.
     */
    "Security.certificateError"(params: Protocol.Security.CertificateErrorEvent): void;
    /**
     * The security state of the page changed.
     */
    "Security.visibleSecurityStateChanged"(params: Protocol.Security.VisibleSecurityStateChangedEvent): void;
    /**
     * The security state of the page changed. No longer being sent.
     */
    "Security.securityStateChanged"(params: Protocol.Security.SecurityStateChangedEvent): void;
    "ServiceWorker.workerErrorReported"(params: Protocol.ServiceWorker.WorkerErrorReportedEvent): void;
    "ServiceWorker.workerRegistrationUpdated"(params: Protocol.ServiceWorker.WorkerRegistrationUpdatedEvent): void;
    "ServiceWorker.workerVersionUpdated"(params: Protocol.ServiceWorker.WorkerVersionUpdatedEvent): void;
    /**
     * A cache's contents have been modified.
     */
    "Storage.cacheStorageContentUpdated"(params: Protocol.Storage.CacheStorageContentUpdatedEvent): void;
    /**
     * A cache has been added/deleted.
     */
    "Storage.cacheStorageListUpdated"(params: Protocol.Storage.CacheStorageListUpdatedEvent): void;
    /**
     * The origin's IndexedDB object store has been modified.
     */
    "Storage.indexedDBContentUpdated"(params: Protocol.Storage.IndexedDBContentUpdatedEvent): void;
    /**
     * The origin's IndexedDB database list has been modified.
     */
    "Storage.indexedDBListUpdated"(params: Protocol.Storage.IndexedDBListUpdatedEvent): void;
    /**
     * One of the interest groups was accessed by the associated page.
     */
    "Storage.interestGroupAccessed"(params: Protocol.Storage.InterestGroupAccessedEvent): void;
    /**
     * Issued when attached to target because of auto-attach or `attachToTarget` command.
     */
    "Target.attachedToTarget"(params: Protocol.Target.AttachedToTargetEvent): void;
    /**
     * Issued when detached from target for any reason (including `detachFromTarget` command). Can be
     * issued multiple times per target if multiple sessions have been attached to it.
     */
    "Target.detachedFromTarget"(params: Protocol.Target.DetachedFromTargetEvent): void;
    /**
     * Notifies about a new protocol message received from the session (as reported in
     * `attachedToTarget` event).
     */
    "Target.receivedMessageFromTarget"(params: Protocol.Target.ReceivedMessageFromTargetEvent): void;
    /**
     * Issued when a possible inspection target is created.
     */
    "Target.targetCreated"(params: Protocol.Target.TargetCreatedEvent): void;
    /**
     * Issued when a target is destroyed.
     */
    "Target.targetDestroyed"(params: Protocol.Target.TargetDestroyedEvent): void;
    /**
     * Issued when a target has crashed.
     */
    "Target.targetCrashed"(params: Protocol.Target.TargetCrashedEvent): void;
    /**
     * Issued when some information about a target has changed. This only happens between
     * `targetCreated` and `targetDestroyed`.
     */
    "Target.targetInfoChanged"(params: Protocol.Target.TargetInfoChangedEvent): void;
    /**
     * Informs that port was successfully bound and got a specified connection id.
     */
    "Tethering.accepted"(params: Protocol.Tethering.AcceptedEvent): void;
    "Tracing.bufferUsage"(params: Protocol.Tracing.BufferUsageEvent): void;
    /**
     * Contains an bucket of collected trace events. When tracing is stopped collected events will be
     * send as a sequence of dataCollected events followed by tracingComplete event.
     */
    "Tracing.dataCollected"(params: Protocol.Tracing.DataCollectedEvent): void;
    /**
     * Signals that tracing is stopped and there is no trace buffers pending flush, all data were
     * delivered via dataCollected events.
     */
    "Tracing.tracingComplete"(params: Protocol.Tracing.TracingCompleteEvent): void;
    /**
     * Issued when the domain is enabled and the request URL matches the
     * specified filter. The request is paused until the client responds
     * with one of continueRequest, failRequest or fulfillRequest.
     * The stage of the request can be determined by presence of responseErrorReason
     * and responseStatusCode -- the request is at the response stage if either
     * of these fields is present and in the request stage otherwise.
     */
    "Fetch.requestPaused"(params: Protocol.Fetch.RequestPausedEvent): void;
    /**
     * Issued when the domain is enabled with handleAuthRequests set to true.
     * The request is paused until client responds with continueWithAuth.
     */
    "Fetch.authRequired"(params: Protocol.Fetch.AuthRequiredEvent): void;
    /**
     * Notifies that a new BaseAudioContext has been created.
     */
    "WebAudio.contextCreated"(params: Protocol.WebAudio.ContextCreatedEvent): void;
    /**
     * Notifies that an existing BaseAudioContext will be destroyed.
     */
    "WebAudio.contextWillBeDestroyed"(params: Protocol.WebAudio.ContextWillBeDestroyedEvent): void;
    /**
     * Notifies that existing BaseAudioContext has changed some properties (id stays the same)..
     */
    "WebAudio.contextChanged"(params: Protocol.WebAudio.ContextChangedEvent): void;
    /**
     * Notifies that the construction of an AudioListener has finished.
     */
    "WebAudio.audioListenerCreated"(params: Protocol.WebAudio.AudioListenerCreatedEvent): void;
    /**
     * Notifies that a new AudioListener has been created.
     */
    "WebAudio.audioListenerWillBeDestroyed"(params: Protocol.WebAudio.AudioListenerWillBeDestroyedEvent): void;
    /**
     * Notifies that a new AudioNode has been created.
     */
    "WebAudio.audioNodeCreated"(params: Protocol.WebAudio.AudioNodeCreatedEvent): void;
    /**
     * Notifies that an existing AudioNode has been destroyed.
     */
    "WebAudio.audioNodeWillBeDestroyed"(params: Protocol.WebAudio.AudioNodeWillBeDestroyedEvent): void;
    /**
     * Notifies that a new AudioParam has been created.
     */
    "WebAudio.audioParamCreated"(params: Protocol.WebAudio.AudioParamCreatedEvent): void;
    /**
     * Notifies that an existing AudioParam has been destroyed.
     */
    "WebAudio.audioParamWillBeDestroyed"(params: Protocol.WebAudio.AudioParamWillBeDestroyedEvent): void;
    /**
     * Notifies that two AudioNodes are connected.
     */
    "WebAudio.nodesConnected"(params: Protocol.WebAudio.NodesConnectedEvent): void;
    /**
     * Notifies that AudioNodes are disconnected. The destination can be null, and it means all the outgoing connections from the source are disconnected.
     */
    "WebAudio.nodesDisconnected"(params: Protocol.WebAudio.NodesDisconnectedEvent): void;
    /**
     * Notifies that an AudioNode is connected to an AudioParam.
     */
    "WebAudio.nodeParamConnected"(params: Protocol.WebAudio.NodeParamConnectedEvent): void;
    /**
     * Notifies that an AudioNode is disconnected to an AudioParam.
     */
    "WebAudio.nodeParamDisconnected"(params: Protocol.WebAudio.NodeParamDisconnectedEvent): void;
    /**
     * This can be called multiple times, and can be used to set / override /
     * remove player properties. A null propValue indicates removal.
     */
    "Media.playerPropertiesChanged"(params: Protocol.Media.PlayerPropertiesChangedEvent): void;
    /**
     * Send events as a list, allowing them to be batched on the browser for less
     * congestion. If batched, events must ALWAYS be in chronological order.
     */
    "Media.playerEventsAdded"(params: Protocol.Media.PlayerEventsAddedEvent): void;
    /**
     * Send a list of any messages that need to be delivered.
     */
    "Media.playerMessagesLogged"(params: Protocol.Media.PlayerMessagesLoggedEvent): void;
    /**
     * Send a list of any errors that need to be delivered.
     */
    "Media.playerErrorsRaised"(params: Protocol.Media.PlayerErrorsRaisedEvent): void;
    /**
     * Called whenever a player is created, or when a new agent joins and receives
     * a list of active players. If an agent is restored, it will receive the full
     * list of player ids and all events again.
     */
    "Media.playersCreated"(params: Protocol.Media.PlayersCreatedEvent): void;
    /**
     * Issued when new console message is added.
     */
    "Console.messageAdded"(params: Protocol.Console.MessageAddedEvent): void;
    /**
     * Fired when breakpoint is resolved to an actual script and location.
     */
    "Debugger.breakpointResolved"(params: Protocol.Debugger.BreakpointResolvedEvent): void;
    /**
     * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
     */
    "Debugger.paused"(params: Protocol.Debugger.PausedEvent): void;
    /**
     * Fired when the virtual machine resumed execution.
     */
    "Debugger.resumed"(): void;
    /**
     * Fired when virtual machine fails to parse the script.
     */
    "Debugger.scriptFailedToParse"(params: Protocol.Debugger.ScriptFailedToParseEvent): void;
    /**
     * Fired when virtual machine parses script. This event is also fired for all known and uncollected
     * scripts upon enabling debugger.
     */
    "Debugger.scriptParsed"(params: Protocol.Debugger.ScriptParsedEvent): void;
    "HeapProfiler.addHeapSnapshotChunk"(params: Protocol.HeapProfiler.AddHeapSnapshotChunkEvent): void;
    /**
     * If heap objects tracking has been started then backend may send update for one or more fragments
     */
    "HeapProfiler.heapStatsUpdate"(params: Protocol.HeapProfiler.HeapStatsUpdateEvent): void;
    /**
     * If heap objects tracking has been started then backend regularly sends a current value for last
     * seen object id and corresponding timestamp. If the were changes in the heap since last event
     * then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
     */
    "HeapProfiler.lastSeenObjectId"(params: Protocol.HeapProfiler.LastSeenObjectIdEvent): void;
    "HeapProfiler.reportHeapSnapshotProgress"(params: Protocol.HeapProfiler.ReportHeapSnapshotProgressEvent): void;
    "HeapProfiler.resetProfiles"(): void;
    "Profiler.consoleProfileFinished"(params: Protocol.Profiler.ConsoleProfileFinishedEvent): void;
    /**
     * Sent when new profile recording is started using console.profile() call.
     */
    "Profiler.consoleProfileStarted"(params: Protocol.Profiler.ConsoleProfileStartedEvent): void;
    /**
     * Reports coverage delta since the last poll (either from an event like this, or from
     * `takePreciseCoverage` for the current isolate. May only be sent if precise code
     * coverage has been started. This event can be trigged by the embedder to, for example,
     * trigger collection of coverage data immediately at a certain point in time.
     */
    "Profiler.preciseCoverageDeltaUpdate"(params: Protocol.Profiler.PreciseCoverageDeltaUpdateEvent): void;
    /**
     * Notification is issued every time when binding is called.
     */
    "Runtime.bindingCalled"(params: Protocol.Runtime.BindingCalledEvent): void;
    /**
     * Issued when console API was called.
     */
    "Runtime.consoleAPICalled"(params: Protocol.Runtime.ConsoleAPICalledEvent): void;
    /**
     * Issued when unhandled exception was revoked.
     */
    "Runtime.exceptionRevoked"(params: Protocol.Runtime.ExceptionRevokedEvent): void;
    /**
     * Issued when exception was thrown and unhandled.
     */
    "Runtime.exceptionThrown"(params: Protocol.Runtime.ExceptionThrownEvent): void;
    /**
     * Issued when new execution context is created.
     */
    "Runtime.executionContextCreated"(params: Protocol.Runtime.ExecutionContextCreatedEvent): void;
    /**
     * Issued when execution context is destroyed.
     */
    "Runtime.executionContextDestroyed"(params: Protocol.Runtime.ExecutionContextDestroyedEvent): void;
    /**
     * Issued when all executionContexts were cleared in browser
     */
    "Runtime.executionContextsCleared"(): void;
    /**
     * Issued when object should be inspected (for example, as a result of inspect() command line API
     * call).
     */
    "Runtime.inspectRequested"(params: Protocol.Runtime.InspectRequestedEvent): void;
    /**
     * Catch all events
     */
    event(event: ProtocolEventParam),
    /**
     * Message queue is empty
     */
    ready(): void,
    /**
     * websocket connection closed
     */
    disconnect(): void,
}

export type ProtocolEventsName = Exclude<keyof ProtocolEventsApi, "event" | "ready" >;

export interface ProtocolEventParam {
    /**
     * id of the message, empty if it's an event
     */
    id?: number;
    /**
     * error messge
     */
    error?: Error;
    result?: unknown;
    /**
     * error messge
     */
    method: ProtocolEventsName;
    params?: unknown;
    sessionId?: string;
}

export default ProtocolEventsApi;
