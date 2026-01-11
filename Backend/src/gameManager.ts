import {Chess} from 'chess.js'
import type { SocketManager } from './socketServer.js'

export class GameObect {
    gameId : string | undefined
    whitePlayerId : string | undefined
    blackPlayerId : string | undefined
    whitePlayerSocket : SocketManager | undefined
    blackPlayerSocket : SocketManager | undefined
    spectators: SocketManager[]
    Chessobject: Chess
    constructor(gameId:string)
    {
       this.gameId = gameId;
       this.spectators = []
       this.Chessobject = new Chess()
    }

    addPlayer(playerId:string,playerSocket:SocketManager){
        if(!this.whitePlayerId){
            this.whitePlayerId = playerId
            this.whitePlayerSocket = playerSocket
            playerSocket.send('createGame',this.Chessobject.board,'Wait for opponent to join the game..')
        }else{
            this.blackPlayerId = playerId
            this.blackPlayerSocket = playerSocket
            playerSocket.send('start',this.Chessobject.board,'Wait for white to make a move')
            this.whitePlayerSocket?.send('/createGame',this.Chessobject.board,'White make a  move')
        }
    }
    
    addSpectators(spectator:SocketManager){
        this.spectators?.push(spectator);
        spectator.send('board_creation',this.Chessobject.board,'Creating board...')
    }

    makeMove(move:{from:string,to:string}, color:string){
       try {
            this.Chessobject.move(move);
            // notify both with the current move {from: to:}
       } catch (error) {
            if(color == 'BLACK'){
                // notify the opposite made a illegal move
            }else{

                 // notify the opposite made a illegal move
            }
       }
       if(this.Chessobject.inCheck()){
         // notify the opposite color that he/she go checked

       }
       if(this.Chessobject.isGameOver()){
         // current person won the  match
         
       }
    }
}
