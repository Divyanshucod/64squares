import WebSocket from "ws";

export class SocketManager {
  socket: WebSocket | undefined;

  constructor(ws:WebSocket) {
    this.socket = ws
  }

  send(type: string, data: any, message: string) {
    if (this.socket) {
       this.socket.send(JSON.stringify({
        data,
        message,
        type
       }))
    }
  }

  receive() {
    if (this.socket) {
      this.socket.on('message',(data)=>{
        console.log(
          data+"From manager"
        );
        
      })
    }
  }
}
