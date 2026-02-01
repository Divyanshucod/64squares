import WebSocket from "ws";
export declare class SocketManager {
    socket: WebSocket | undefined;
    constructor(ws: WebSocket);
    send(data: any): void;
    receive(): void;
}
//# sourceMappingURL=socketServer.d.ts.map