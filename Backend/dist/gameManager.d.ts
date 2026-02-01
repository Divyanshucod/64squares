import { Chess } from "chess.js";
import type { SocketManager } from "./socketServer.js";
export declare enum Turn {
    WHITE = "WHITE",
    BLACK = "BLACK"
}
export declare enum Events {
    Waiting_Opponent = "Waiting_Opponent",
    Start_Game = "Start_Game",
    End_Game = "End_Game",
    Move = "Move",
    Illegal_Move = "Illegal_Movee",
    Create_Board = "Create_Board",
    Resume = "Resume",
    Chat = "Chat",
    Checked = "Checked"
}
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
    constructor(gameId: string);
    addPlayer(playerId: string, playerSocket: SocketManager): void;
    addSpectators(spectator: SocketManager): void;
    makeMove({ move: { from, to }, turn, timestamp }: {
        move: {
            from: string;
            to: string;
        };
        turn: Turn;
        timestamp: number;
    }): void;
    calculateRemainigTime(turn: Turn, timestamp: number): void;
}
//# sourceMappingURL=gameManager.d.ts.map