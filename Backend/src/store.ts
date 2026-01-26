import { GameObect } from "./gameManager.js";
import {v4 as uuidv4} from 'uuid';
import type { SocketManager } from "./socketServer.js";
class Store {
    Games : GameObect[] | undefined
    constructor(){
        this.Games = []
    }

    createGame(playerSocket:SocketManager,playerToken:string){
      const game = this.Games?.find(game => game.blackPlayerId == undefined)
      if(game){
        const playerId = playerToken;
        game.addPlayer(playerId,playerSocket)
      }else{
        const gameId = uuidv4()
        const playerId = playerToken
        const newChess = new GameObect(gameId)
        this.Games?.push(newChess)
        newChess.addPlayer(playerId,playerSocket)
      }
      console.log(this.Games);
    }

    removeGame(gameId:string){
       const remainingGames = this.Games?.filter(game => game.gameId != gameId)
       this.Games = remainingGames;
    }
}

export const storeInstance = new Store();