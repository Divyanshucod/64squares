import { Events, GameObect, Turn } from "./gameManager.js";
import { v4 as uuidv4 } from "uuid";
import type { SocketManager } from "./socketServer.js";
class Store {
  Games: GameObect[] | undefined;
  constructor() {
    this.Games = [];
  }

  createGame(playerSocket: SocketManager) {
    const gameId = uuidv4();
    const newChess = new GameObect(gameId);
    this.Games?.push(newChess);
    newChess.addPlayer(playerSocket);
  }
  removeGame(gameId: string) {
    const remainingGames = this.Games?.filter((game) => game.gameId != gameId);
    this.Games = remainingGames;
  }
  getGame(gameId: string) {
    return this.Games?.find((game) => game.gameId == gameId);
  }


  autoMatch(playerSocket:SocketManager){
     const anygame = this.Games?.find(game => game.blackPlayerId == undefined);
     if(!anygame){
      throw new Error("Auto match can't happen as no available for auto match!")
     }
     anygame.addPlayer(playerSocket)
     return;
  }
}

export const storeInstance = new Store();
