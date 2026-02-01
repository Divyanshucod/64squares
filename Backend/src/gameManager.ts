import { Chess, WHITE } from "chess.js";
import type { SocketManager } from "./socketServer.js";
export enum Turn {
  WHITE = "WHITE",
  BLACK = "BLACK",
}
export enum Events {
  Waiting_Opponent = "Waiting_Opponent",
  Start_Game = "Start_Game",
  End_Game = "End_Game",
  Move = "Move",
  Illegal_Move = "Illegal_Movee",
  Create_Board = "Create_Board",
  Resume = "Resume",
  Chat = "Chat",
  Checked = "Checked",
  Common = "Common",
  New_Game = "New_Game",
  Join_Game = "Join_Game"
}
export class GameObect {
  gameId: string | undefined;
  whitePlayerId: string | undefined;
  blackPlayerId: string | undefined;
  whitePlayerSocket: SocketManager | undefined;
  blackPlayerSocket: SocketManager | undefined;
  spectators: SocketManager[];
  Chessobject: Chess;
  turn: Turn | undefined;
  lastMoveTimestamp: number | undefined;
  clock:
    | {
        BLACK: number;
        WHITE: number;
      }
    | undefined;
  constructor(gameId: string) {
    this.gameId = gameId;
    this.spectators = [];
    this.Chessobject = new Chess();
  }

  addPlayer(playerId: string, playerSocket: SocketManager) {
    if (!this.whitePlayerId) {
      this.whitePlayerId = playerId;
      this.whitePlayerSocket = playerSocket;
      this.turn = Turn.WHITE;
      playerSocket.send({
        event: Events.Waiting_Opponent,
        message: "Waiting for opponent... ",
      });
    } else {
      this.blackPlayerId = playerId;
      this.blackPlayerSocket = playerSocket;
      this.lastMoveTimestamp = Date.now();
      this.clock = {
        BLACK: 300000,
        WHITE: 300000,
      };
      playerSocket.send({
        event: Events.Create_Board,
        gameId: this.gameId,
        boardFEN: this.Chessobject.fen(),
        turn: this.turn,
        clock: this.clock,
        timestamp: Date.now(),
      });
      this.whitePlayerSocket?.send({
        event: Events.Create_Board,
        gameId: this.gameId,
        boardFEN: this.Chessobject.fen(),
        turn: this.turn,
        clock: this.clock,
        timestamp: Date.now(),
      });
    }
  }

  addSpectators(spectator: SocketManager) {
    this.spectators?.push(spectator);
    spectator.send({
      event: Events.Create_Board,
      gameId: this.gameId,
      boardFEN: this.Chessobject.fen(),
      turn: this.turn,
      clock: this.clock,
      timestamp: Date.now(),
      spectatorCount: this.spectators.length,
    });
    this.spectators.forEach((specator) =>
      specator.send({
        event: Events.Common,
        spectatorCount: this.spectators.length,
      }),
    );
    this.blackPlayerSocket?.send({
      event: Events.Common,
      spectatorCount: this.spectators.length,
    });
    this.whitePlayerSocket?.send({
      event: Events.Common,
      spectatorCount: this.spectators.length,
    });
  }

  makeMove({
    move: { from, to },
    turn,
    timestamp,
  }: {
    move: { from: string; to: string };
    turn: Turn;
    timestamp: number;
  }) {
    try {
      this.Chessobject.move({ from, to });
      // notify both with the current move {from: to:}
      this.calculateRemainigTime(turn, timestamp);
      if (this.Chessobject.inCheck()) {
        // notify the opposite color that he/she got checked
        this.broadCastSpecific(turn, Events.Checked);
        return;
      }
      if (this.Chessobject.isGameOver()) {
        // current person won the  match
        this.broadCastSpecific(turn, Events.End_Game);
        return;
      } else {
        this.broadCast(turn, Events.Move);
      }
    } catch (error) {
      if (Turn.BLACK == turn) {
        // notify the opposite made a illegal move
        this.blackPlayerSocket?.send({
          event: Events.Illegal_Move,
          gameId: this.gameId,
          turn: this.turn,
          clock: this.clock,
          timestamp: Date.now(),
        });
      } else {
        this.whitePlayerSocket?.send({
          event: Events.Illegal_Move,
          gameId: this.gameId,

          turn: this.turn,
          clock: this.clock,
          timestamp: Date.now(),
        });
        // notify the opposite made a illegal move
      }
    }
  }

  calculateRemainigTime(turn: Turn, timestamp: number) {
    if (turn == Turn.BLACK && this.lastMoveTimestamp) {
      const remainingTime = this.clock
        ? this.clock.BLACK - (timestamp - this.lastMoveTimestamp)
        : 0;
      this.clock = {
        BLACK: remainingTime,
        WHITE: this.clock?.WHITE ?? 30000,
      };
    } else if (turn == Turn.WHITE && this.lastMoveTimestamp) {
      const remainingTime = this.clock
        ? this.clock.WHITE - (timestamp - this.lastMoveTimestamp)
        : 0;
      this.clock = {
        BLACK: this.clock?.BLACK ?? 30000,
        WHITE: remainingTime,
      };
    }
  }
  broadCastSpecific(turn: Turn, event: Events) {
    if (turn == Turn.BLACK) {
      this.whitePlayerSocket?.send({
        event,
        gameId: this.gameId,
        turn: Turn.WHITE,
        clock: this.clock,
        timestamp: Date.now(),
        spectatorCount: this.spectators.length,
      });
    } else {
      this.blackPlayerSocket?.send({
        event,
        gameId: this.gameId,
        turn: Turn.BLACK,
        clock: this.clock,
        timestamp: Date.now(),
        spectatorCount: this.spectators.length,
      });
    }
    // spectators
    this.spectators.forEach((spectator) =>
      spectator.send({
        event: Events.Move,
        gameId: this.gameId,
        turn: this.turn,
        clock: this.clock,
        timestamp: Date.now(),
        spectatorCount: this.spectators.length,
      }),
    );
  }
  broadCast(turn: Turn, event: Events) {
    this.blackPlayerSocket?.send({
      event: Events.Move,
      gameId: this.gameId,
      turn: turn == Turn.BLACK ? Turn.WHITE : Turn.BLACK,
      clock: this.clock,
      timestamp: Date.now(),
      spectatorCount: this.spectators.length,
    });
    this.whitePlayerSocket?.send({
      event: Events.Move,
      gameId: this.gameId,
      turn: turn == Turn.BLACK ? Turn.WHITE : Turn.BLACK,
      clock: this.clock,
      timestamp: Date.now(),
      spectatorCount: this.spectators.length,
    });
    // spectators
    this.spectators.forEach((spectator) =>
      spectator.send({
        event: Events.Move,
        gameId: this.gameId,
        turn: turn == Turn.BLACK ? Turn.WHITE : Turn.BLACK,
        clock: this.clock,
        timestamp: Date.now(),
        spectatorCount: this.spectators.length,
      }),
    );
  }
  private sendToAll(payload: any) {
  this.whitePlayerSocket?.send(payload);
  this.blackPlayerSocket?.send(payload);
  this.spectators.forEach(s => s.send(payload));
}
  resumeGame(player: SocketManager) {
    if (player.userId == this.whitePlayerId) { // how do i disconnect here? what i can do is that before calling this function i will check the playerId before only.
      this.whitePlayerSocket = player;
      this.whitePlayerSocket.send({
        event: Events.Resume,
        gameId: this.gameId,
        boardFEN: this.Chessobject.fen(),
        turn: this.turn,
        clock: this.clock,
        timestamp: Date.now(),
      });
    } else if(player.userId == this.whitePlayerId) {
      this.blackPlayerSocket = player;
      this.blackPlayerSocket.send({
        event: Events.Resume,
        gameId: this.gameId,
        boardFEN: this.Chessobject.fen(),
        turn: this.turn,
        clock: this.clock,
        timestamp: Date.now(),
      });
    }
    else{
      return
    }
  }

  sendChat(player:SocketManager){

  }
}

// to resume the game userId and gameId is required
