import { Chess } from "chess.js";
import { SocketManager } from "./socketServer.js";
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
  Join_Game = "Join_Game",
  PLAYER_DISCONNECTED = "PLAYER_DISCONNECTED",
  Spectator = "Spectator"
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

  addPlayer(playerSocket: SocketManager) {
    if(this.whitePlayerId && this.blackPlayerId){
      playerSocket.send({
        event:Events.Common,
        message:"Game is full!"
      })
    }
    if (!this.whitePlayerId) {
      playerSocket.gameId = this.gameId!;
      playerSocket.role = 'white';
      this.whitePlayerId = playerSocket.userId;
      this.whitePlayerSocket = playerSocket;
      this.turn = Turn.WHITE;
      playerSocket.send({
        event: Events.Waiting_Opponent,
        message: "Waiting for opponent... ",
      });
    } else {
      playerSocket.gameId = this.gameId!;
      playerSocket.role = 'white';
      this.blackPlayerId = playerSocket.userId;
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
    spectator.role = 'spectator';
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
  }
  broadcastSpectatorCount(){
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
  makeMove(
    sender: SocketManager,
    move: { from: string; to: string },
    timestamp: number,
  ) {
    if (sender.gameId !== this.gameId) return;
    if (sender.role == 'spectator') return;

    const isWhite = sender.userId === this.whitePlayerId;
    const isBlack = sender.userId === this.blackPlayerId;

    if (
      (this.turn === Turn.WHITE && !isWhite) ||
      (this.turn === Turn.BLACK && !isBlack)
    ) {
      sender.send({ event: Events.Illegal_Move });
      return;
    }
    const result = this.Chessobject.move(move);
    if (!result) {
      sender.send({ event: Events.Illegal_Move });
      return;
    }

    this.calculateRemainigTime(this.turn!, timestamp);
    this.lastMoveTimestamp = timestamp;
    this.turn = this.turn === Turn.WHITE ? Turn.BLACK : Turn.WHITE;
    if (this.Chessobject.isCheck()) {
      this.broadCast(this.turn, Events.Checked);
      return;
    }

    if (this.Chessobject.isGameOver()) {
      this.broadCast(this.turn, Events.End_Game);
      return;
    }

    // 7. Normal move broadcast
    this.broadCast(this.turn, Events.Move);
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
  broadCast(turn: Turn, event: Events) {
    this.blackPlayerSocket?.send({
      event,
      gameId: this.gameId,
      turn,
      clock: this.clock,
      timestamp: Date.now(),
      spectatorCount: this.spectators.length,
    });
    this.whitePlayerSocket?.send({
      event,
      gameId: this.gameId,
      turn,
      clock: this.clock,
      timestamp: Date.now(),
      spectatorCount: this.spectators.length,
    });
    // spectators
    this.spectators.forEach((spectator) =>
      spectator.send({
        event,
        gameId: this.gameId,
        turn,
        clock: this.clock,
        timestamp: Date.now(),
        spectatorCount: this.spectators.length,
      }),
    );
  }
 resumeGame(player: SocketManager,gameId:string) {
  if (gameId !== this.gameId) return;

  let target: "white" | "black" | null = null;

  if (gameId === this.whitePlayerId) target = "white";
  else if (gameId === this.blackPlayerId) target = "black";
  else return;
  player.gameId = gameId;
  if (target === "white") this.whitePlayerSocket = player;
  else this.blackPlayerSocket = player;

  player.send({
    event: Events.Resume,
    gameId: this.gameId,
    boardFEN: this.Chessobject.fen(),
    turn: this.turn,
    clock: this.clock,
    timestamp: Date.now(),
  });
}


  sendChat(sender: SocketManager,message:string) {
        if (sender.gameId !== this.gameId) return;
        this.broadCastChat(Events.Chat,message);
  }
  broadCastChat(event:Events,message:string){
        this.blackPlayerSocket?.send({
      event,
      gameId: this.gameId,
      timestamp: Date.now(),
      message
    });
    this.whitePlayerSocket?.send({
      event,
      gameId: this.gameId,
      timestamp: Date.now(),
      message
    });
    // spectators
    this.spectators.forEach((spectator) =>
      spectator.send({
        event,
        gameId: this.gameId,
        timestamp: Date.now(),
        message
      }),
    );
  }
  handlePlayerDisconnect(player: SocketManager) {
  if (player.userId === this.whitePlayerId) {
    this.whitePlayerSocket = undefined;
  } else if (player.userId === this.blackPlayerId) {
    this.blackPlayerSocket = undefined;
  } else {
    // spectator
    this.spectators = this.spectators.filter(s => s !== player);
    this.broadcastSpectatorCount();
  }
}
}

// to resume the game userId and gameId is required
