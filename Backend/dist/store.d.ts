import { GameObect } from "./gameManager.js";
import type { SocketManager } from "./socketServer.js";
declare class Store {
    Games: GameObect[] | undefined;
    constructor();
    createGame(playerSocket: SocketManager): void;
    removeGame(gameId: string): void;
    getGame(gameId: string): GameObect | undefined;
    autoMatch(playerSocket: SocketManager): void;
}
export declare const storeInstance: Store;
export {};
//# sourceMappingURL=store.d.ts.map