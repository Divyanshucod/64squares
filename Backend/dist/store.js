import { GameObect } from "./gameManager.js";
import { v4 as uuidv4 } from 'uuid';
class Store {
    Games;
    constructor() {
        this.Games = [];
    }
    createGame(playerSocket, playerToken) {
        const game = this.Games?.find(game => game.blackPlayerId == undefined);
        if (game) {
            const playerId = playerToken;
            game.addPlayer(playerId, playerSocket);
        }
        else {
            const gameId = uuidv4();
            const playerId = playerToken;
            const newChess = new GameObect(gameId);
            this.Games?.push(newChess);
            newChess.addPlayer(playerId, playerSocket);
        }
        console.log(this.Games);
    }
    removeGame(gameId) {
        const remainingGames = this.Games?.filter(game => game.gameId != gameId);
        this.Games = remainingGames;
    }
}
export const storeInstance = new Store();
//# sourceMappingURL=store.js.map