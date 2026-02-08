import WebSocket from "ws";
export declare class SocketManager {
    socket: WebSocket;
    userId: string;
    gameId?: string;
    role?: "white" | "black" | "spectator";
    constructor(ws: WebSocket, userId: string);
    send(data: any): void;
    receive(): void;
    handleDisconnect(): void;
}
//# sourceMappingURL=socketServer.d.ts.map