import WebSocket from "ws";
import { storeInstance } from "./store.js";
export class SocketManager {
    socket;
    userId;
    gameId;
    role;
    constructor(ws, userId) {
        this.socket = ws;
        this.userId = userId;
    }
    send(data) {
        if (this.socket) {
            this.socket.send(JSON.stringify(data));
        }
    }
    receive() {
        if (this.socket) {
            this.socket.on('message', (data) => {
                console.log(data + "From manager");
            });
        }
    }
    handleDisconnect() {
        if (!this.gameId)
            return;
        const game = storeInstance.getGame(this.gameId);
        if (!game)
            return;
        game.handlePlayerDisconnect(this);
    }
}
//# sourceMappingURL=socketServer.js.map