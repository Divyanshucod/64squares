export class SocketManager {
  socket: WebSocket | undefined;

  constructor(server: any) {
    this.socket = new WebSocket(server);
  }

  send(type: string, data: any, message: string) {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          type,
          data,
          message,
        })
      );
    }
  }

  receive() {
    if (this.socket) {
      this.socket.onmessage = (event: MessageEvent) => {
        return event.data;
      };
    }
  }
}
