interface HttpRequest {
  method: "GET" | "POST";
  path: string;
  headers: { [key: string]: string };
  body: ArrayBuffer | string;
}
interface HttpResponse {
  statusCode: number;
  headers: Map<string, string>;
  body: Uint8Array;
}
interface WorkerInitialData {
  requirements: string[];
  mainScriptData?: string;
}

/**
 * Input messages from kernel to worker
 */
interface InMessageBase {
  type: string;
  data?: unknown;
}
interface InitDataMessage extends InMessageBase {
  type: "initData";
  data: WorkerInitialData;
}
interface WebSocketConnectMessage extends InMessageBase {
  type: "websocket:connect";
  data: {
    path: string;
  };
}
interface WebSocketSendMessage extends InMessageBase {
  type: "websocket:send";
  data: {
    payload: Uint8Array;
  };
}
interface HttpRequestMessage extends InMessageBase {
  type: "http:request";
  data: {
    httpCommId: number;
    request: HttpRequest;
  };
}
interface MainScriptSetMessage extends InMessageBase {
  type: "mainscript:set";
  data: {
    mainScriptData: string;
  };
}
type InMessage =
  | InitDataMessage
  | WebSocketConnectMessage
  | WebSocketSendMessage
  | HttpRequestMessage
  | MainScriptSetMessage;

interface StliteWorker extends Worker {
  postMessage(message: InMessage);
}

/**
 * Output messages from worker to kernel
 */
interface OutMessageBase {
  type: string;
  data?: unknown;
}
interface StartEventMessage extends OutMessageBase {
  type: "event:start";
}
interface LoadedEventMessage extends OutMessageBase {
  type: "event:loaded";
}
interface WebSocketBackMessage extends OutMessageBase {
  type: "websocket:message";
  data: {
    payload: Uint8Array;
  };
}
interface HttpResponseMessage extends OutMessageBase {
  type: "http:response";
  data: {
    httpCommId: number;
    response: HttpResponse;
  };
}
type OutMessage =
  | StartEventMessage
  | LoadedEventMessage
  | WebSocketBackMessage
  | HttpResponseMessage;