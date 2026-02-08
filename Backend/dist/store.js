import { Events, GameObect, Turn } from "./gameManager.js";
import { v4 as uuidv4 } from "uuid";
class Store {
    Games;
    constructor() {
        this.Games = [];
    }
    createGame(playerSocket) {
        const gameId = uuidv4();
        const newChess = new GameObect(gameId);
        this.Games?.push(newChess);
        newChess.addPlayer(playerSocket);
    }
    removeGame(gameId) {
        const remainingGames = this.Games?.filter((game) => game.gameId != gameId);
        this.Games = remainingGames;
    }
    getGame(gameId) {
        return this.Games?.find((game) => game.gameId == gameId);
    }
    autoMatch(playerSocket) {
        const anygame = this.Games?.find(game => game.blackPlayerId == undefined);
        if (!anygame) {
            throw new Error("Auto match can't happen as no available for auto match!");
        }
        anygame.addPlayer(playerSocket);
        return;
    }
}
export const storeInstance = new Store();
//# sourceMappingURL=store.js.map