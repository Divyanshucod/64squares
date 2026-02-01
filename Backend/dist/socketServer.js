import WebSocket from "ws";
export class SocketManager {
    socket;
    constructor(ws) {
        this.socket = ws;
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
}
//# sourceMappingURL=socketServer.js.map