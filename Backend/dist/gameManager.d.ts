import { Chess } from "chess.js";
import { SocketManager } from "./socketServer.js";
type PlayerColor = "white" | "black";
export declare enum Turn {
    WHITE = "WHITE",
    BLACK = "BLACK"
}
export declare enum Events {
    WAITING_OPPONENT = "WAITING_OPPONENT",
    START_GAME = "START_GAME",
    END_GAME = "END_GAME",
    MOVE = "MOVE",
    ILLIGAL_MOVE = "ILLIGAL_MOVE",
    CREATE_BOARD = "CREATE_BOARD",
    RESUME = "RESUME",
    CHAT = "CHAT",
    CHECKED = "CHECKED",
    COMMON = "COMMON",
    NEW_GAME = "NEW_GAME",
    JOIN_GAME = "JOIN_GAME",
    PLAYER_DISCONNECTED = "PLAYER_DISCONNECTED",
    PLAYER_RECONNECTED = "PLAYER_RECONNECTED",
    SPECTATOR = "SPECTATOR",
    AUTO_MATCH = "AUTO_MATCH"
}
type DisconnectInfo = {
    playerId: string;
    timeOutId: NodeJS.Timeout;
    deadLine: number;
    color: string;
};
export declare class GameObect {
    gameId: string | undefined;
    whitePlayerId: string | undefined;
    blackPlayerId: string | undefined;
    whitePlayerSocket: SocketManager | undefined;
    blackPlayerSocket: SocketManager | undefined;
    spectators: SocketManager[];
    Chessobject: Chess;
    turn: Turn | undefined;
    lastMoveTimestamp: number | undefined;
    clock: {
        BLACK: number;
        WHITE: number;
    } | undefined;
    disconnectedPlayerInfo?: DisconnectInfo | undefined;
    constructor(gameId: string);
    private getPlayerSocket;
    private broadcastBoard;
    private getAllSockets;
    private sendToAll;
    addPlayer(player: SocketManager): Promise<void>;
    addSpectators(spectator: SocketManager): void;
    broadcastSpectatorCount(message?: string): void;
    makeMove(sender: SocketManager, move: {
        from: string;
        to: string;
    }, timestamp: number): void;
    private updateClock;
    broadCast(turn: Turn, event: Events): void;
    resumeGame(player: SocketManager, gameId: string): void;
    sendChat(sender: SocketManager, message: string): void;
    broadCastChat(event: Events, message: string): void;
    broadCastToAll(data: any): void;
    handlePlayerDisconnect(player: SocketManager): void;
    forfeitPlayer(color: PlayerColor): Promise<void>;
    handlerDB(processEvent: Events, playerInfo: SocketManager, move?: {
        from: string;
        to: string;
    }): Promise<void>;
}
export {};
//# sourceMappingURL=gameManager.d.ts.map