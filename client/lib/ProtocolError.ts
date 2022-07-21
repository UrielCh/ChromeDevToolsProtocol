export class ProtocolError extends Error {
  constructor(
        public request: { method: string, params?: unknown, undefined?: string },
        public response: { message: string; data?: string; code?: number },
  ) {
    let { message } = response;
    if (response.data) {
      message += ` (${response.data})`;
    }
    super(message + " caused by " + request.method);
  }
}
