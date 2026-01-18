import WebSocket from "ws";
export declare class SocketManager {
    socket: WebSocket | undefined;
    constructor(ws: WebSocket);
    send(type: string, data: any, message: string): void;
    receive(): void;
}
//# sourceMappingURL=socketServer.d.ts.map