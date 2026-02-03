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
    // newChess.broadCast(Turn.WHITE,Events.Waiting_Opponent)
  }
  removeGame(gameId: string) {
    const remainingGames = this.Games?.filter((game) => game.gameId != gameId);
    this.Games = remainingGames;
  }
  getGame(gameId: string) {
    return this.Games?.find((game) => game.gameId == gameId);
  }
}

export const storeInstance = new Store();
