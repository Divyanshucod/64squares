import WebSocket from "ws";
import { storeInstance } from "./store.js";

export class SocketManager {
  socket: WebSocket;
  userId: string;

  gameId?: string;
  role?: "white" | "black" | "spectator";
  constructor(ws:WebSocket,userId:string) {
    this.socket = ws
    this.userId = userId
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

   handleDisconnect() {
    if (!this.gameId) return;
    const game = storeInstance.getGame(this.gameId);
    game?.resumeGame(this);
  }
}
