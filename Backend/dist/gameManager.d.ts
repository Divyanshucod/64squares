import { Chess } from "chess.js";
import type { SocketManager } from "./socketServer.js";
export declare class GameObect {
    gameId: string | undefined;
    whitePlayerId: string | undefined;
    blackPlayerId: string | undefined;
    whitePlayerSocket: SocketManager | undefined;
    blackPlayerSocket: SocketManager | undefined;
    spectators: SocketManager[];
    Chessobject: Chess;
    constructor(gameId: string);
    addPlayer(playerId: string, playerSocket: SocketManager): void;
    addSpectators(spectator: SocketManager): void;
    makeMove(move: {
        from: string;
        to: string;
    }, color: string): void;
}
//# sourceMappingURL=gameManager.d.ts.map