import { Events, GameObect, Turn } from "./gameManager.js";
import {v4 as uuidv4} from 'uuid';
import type { SocketManager } from "./socketServer.js";
class Store {
    Games : GameObect[] | undefined
    constructor(){
        this.Games = []
    }

    createGame(playerSocket:SocketManager,playerId:string){
        const gameId = uuidv4()
        const newChess = new GameObect(gameId)
        this.Games?.push(newChess)
        newChess.addPlayer(playerId,playerSocket)
        newChess.broadCast(Turn.WHITE,Events.Waiting_Opponent)
      }
    joinTheGame(playerId:string,gameId:string,playerSocket:SocketManager){
       const game = this.Games?.find(game => game.gameId == gameId)
       if(game?.blackPlayerId != undefined && game.whitePlayerId != undefined){
          playerSocket.send({even:Events.Common,message:"Game is full!"})
       }
       else{
          if(game && game.blackPlayerId == undefined){
            game.blackPlayerId = playerId;
            game.blackPlayerSocket = playerSocket
            game.broadCast(Turn.WHITE,Events.Start_Game)
          }
          else if(game && game.whitePlayerId == undefined){
            game.whitePlayerId = playerId;
            game.whitePlayerSocket = playerSocket
            game.broadCast(Turn.WHITE,Events.Start_Game)
          }
       }
    }
    autoMatch(playerId:string, playerSocket:SocketManager){
      const game = this.Games?.find(game => game.blackPlayerId == undefined)
      if(game){
        game.whitePlayerId = playerId
        game.whitePlayerSocket = playerSocket
        game.broadCast(Turn.WHITE,Events.Start_Game)
      } // otherwise let them wait
    }
    removeGame(gameId:string){
       const remainingGames = this.Games?.filter(game => game.gameId != gameId)
       this.Games = remainingGames;
    }
    getGame(gameId:string){
      return this.Games?.find(game => game.gameId == gameId)
    }
}

export const storeInstance = new Store();