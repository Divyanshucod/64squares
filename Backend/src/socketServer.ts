import WebSocket from "ws";

export class SocketManager {
  socket: WebSocket | undefined;

  constructor(ws:WebSocket) {
    this.socket = ws
  }

  send(data: any) {
    if (this.socket) {
       this.socket.send(JSON.stringify(
        data
       ))
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
