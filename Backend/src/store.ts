import { GameObect } from "./gameManager.js";
import {v4 as uuidv4} from 'uuid';
import type { SocketManager } from "./socketServer.js";
class Store {
    Games : GameObect[] | undefined
    constructor(){
        this.Games = []
    }

    createGame(playerSocket:SocketManager){
      const game = this.Games?.find(game => game.blackPlayerId == undefined)
      if(game){
        const playerId = uuidv4();
        game.addPlayer(playerId,playerSocket)
      }else{
        const gameId = uuidv4()
        const playerId = uuidv4()
        const newChess = new GameObect(gameId)
        this.Games?.push(newChess)
        newChess.addPlayer(playerId,playerSocket)
      }
    }

    removeGame(gameId:string){
       const remainingGames = this.Games?.filter(game => game.gameId != gameId)
       this.Games = remainingGames;
    }
}

export const storeInstance = new Store();