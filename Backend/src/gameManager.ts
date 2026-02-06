import { Chess } from "chess.js";
import { SocketManager } from "./socketServer.js";
type PlayerColor = "white" | "black";
export enum Turn {
  WHITE = "WHITE",
  BLACK = "BLACK",
}
const GAME_TIME = 300_000;
const DISCONNECT_TIMEOUT = 60_000;

export enum Events {
  WAITING_OPPONENT = "WAITING_OPPONENT",
  START_GAME = "START_GAME",
  END_GAME = "END_GAME",
  MOVE = "MOVE",
  ILLIGAL_MOVE = "ILLIGAL_MOVE",
  CREATE_BOARD = "CREATE_BOARD",
  RESUME = "RESUME",
  CHAT = "CHAT",
  CHECKED = "CHECKED",
  COMMON = "COMMON",
  NEW_GAME = "NEW_GAME",
  JOIN_GAME = "JOIN_GAME",
  PLAYER_DISCONNECTED = "PLAYER_DISCONNECTED",
  PLAYER_RECONNECTED = "PLAYER_RECONNECTED",
  SPECTATOR = "SPECTATOR",
}
type DisconnectInfo = {
  playerId: string;
  timeOutId: NodeJS.Timeout;
  deadLine: number;
  color: string;
};
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
  disconnectedPlayerInfo?: DisconnectInfo | undefined;
  constructor(gameId: string) {
    this.gameId = gameId;
    this.spectators = [];
    this.Chessobject = new Chess();
  }
  private getPlayerSocket(color: PlayerColor) {
    return color === "white" ? this.whitePlayerSocket : this.blackPlayerSocket;
  }
  private broadcastBoard() {
    this.sendToAll({
      event: Events.CREATE_BOARD,
      gameId: this.gameId,
      boardFEN: this.Chessobject.fen(),
      turn: this.turn,
      clock: this.clock,
      timestamp: Date.now(),
      spectatorCount: this.spectators.length,
    });
  }

  private getAllSockets(): SocketManager[] {
    return [
      this.whitePlayerSocket,
      this.blackPlayerSocket,
      ...this.spectators,
    ].filter(Boolean) as SocketManager[];
  }

  private sendToAll(data: any) {
    this.getAllSockets().forEach((s) => s.send(data));
  }
  addPlayer(player: SocketManager) {
    if (this.whitePlayerId && this.blackPlayerId) {
      return player.send({ event: Events.COMMON, message: "Game is full!" });
    }

    player.gameId = this.gameId!;

    if (!this.whitePlayerId) {
      this.whitePlayerId = player.userId;
      this.whitePlayerSocket = player;
      player.role = "white";
      this.turn = Turn.WHITE;
      // push add player to the game table
      
      return player.send({
        event: Events.WAITING_OPPONENT,
        message: "Waiting for opponent...",
      });
    }

    this.blackPlayerId = player.userId;
    this.blackPlayerSocket = player;
    player.role = "black";

    this.clock = { WHITE: GAME_TIME, BLACK: GAME_TIME };
    this.lastMoveTimestamp = Date.now();

    this.broadcastBoard();
  }

  addSpectators(spectator: SocketManager) {
    spectator.role = "spectator";
    this.spectators?.push(spectator);
    spectator.send({
      event: Events.CREATE_BOARD,
      gameId: this.gameId,
      boardFEN: this.Chessobject.fen(),
      turn: this.turn,
      clock: this.clock,
      timestamp: Date.now(),
      spectatorCount: this.spectators.length,
    });
    this.broadcastSpectatorCount();
    // notify all with the updated spectator count
  }
  broadcastSpectatorCount(message?: string) {
    this.spectators.forEach((specator) =>
      specator.send({
        event: Events.COMMON,
        spectatorCount: this.spectators.length,
        message,
      }),
    );
    this.blackPlayerSocket?.send({
      event: Events.COMMON,
      spectatorCount: this.spectators.length,
      message,
    });
    this.whitePlayerSocket?.send({
      event: Events.COMMON,
      spectatorCount: this.spectators.length,
      message,
    });
  }
  makeMove(
    sender: SocketManager,
    move: { from: string; to: string },
    timestamp: number,
  ) {
    if (sender.gameId !== this.gameId || sender.role === "spectator") return;

    const isWhiteTurn = this.turn === Turn.WHITE;
    if (
      (isWhiteTurn && sender.userId !== this.whitePlayerId) ||
      (!isWhiteTurn && sender.userId !== this.blackPlayerId)
    ) {
      return sender.send({ event: Events.ILLIGAL_MOVE });
    }

    const result = this.Chessobject.move(move);
    if (!result) return sender.send({ event: Events.ILLIGAL_MOVE });

    this.updateClock(this.turn!, timestamp);
    this.turn = isWhiteTurn ? Turn.BLACK : Turn.WHITE;
    this.lastMoveTimestamp = timestamp;

    if (this.Chessobject.isGameOver()) {
      return this.sendToAll({ event: Events.END_GAME });
    }

    if (this.Chessobject.isCheck()) {
      return this.sendToAll({ event: Events.CHECKED, turn: this.turn });
    }

    this.sendToAll({ event: Events.MOVE, turn: this.turn, clock: this.clock });
  }

  private updateClock(turn: Turn, now: number) {
    if (!this.clock || !this.lastMoveTimestamp) return;

    const diff = now - this.lastMoveTimestamp;

    if (turn === Turn.WHITE) this.clock.WHITE -= diff;
    else this.clock.BLACK -= diff;
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
  resumeGame(player: SocketManager, gameId: string) {
    if (gameId !== this.gameId || !this.disconnectedPlayerInfo) return;

    if (player.userId !== this.disconnectedPlayerInfo.playerId) return;

    clearTimeout(this.disconnectedPlayerInfo.timeOutId);
    this.disconnectedPlayerInfo = undefined;

    player.gameId = gameId;

    if (player.userId === this.whitePlayerId) this.whitePlayerSocket = player;
    else this.blackPlayerSocket = player;

    player.send({
      event: Events.RESUME,
      boardFEN: this.Chessobject.fen(),
      turn: this.turn,
      clock: this.clock,
      timestamp: Date.now(),
    });

    this.sendToAll({ event: Events.PLAYER_RECONNECTED,playerId:player.userId });
  }

  sendChat(sender: SocketManager, message: string) {
    if (sender.gameId !== this.gameId) return;
    this.broadCastChat(Events.CHAT, message);
  }
  broadCastChat(event: Events, message: string) {
    this.blackPlayerSocket?.send({
      event,
      gameId: this.gameId,
      timestamp: Date.now(),
      message,
    });
    this.whitePlayerSocket?.send({
      event,
      gameId: this.gameId,
      timestamp: Date.now(),
      message,
    });
    // spectators
    this.spectators.forEach((spectator) =>
      spectator.send({
        event,
        gameId: this.gameId,
        timestamp: Date.now(),
        message,
      }),
    );
  }
  broadCastToAll(data: any) {
    this.whitePlayerSocket?.send(data);
    this.blackPlayerSocket?.send(data);
    this.spectators.forEach((s) => s.send(data));
  }
  handlePlayerDisconnect(player: SocketManager) {
    const color: PlayerColor | null =
      player.userId === this.whitePlayerId
        ? "white"
        : player.userId === this.blackPlayerId
          ? "black"
          : null;

    if (!color) {
      this.spectators = this.spectators.filter((s) => s !== player);
      return this.broadcastSpectatorCount();
    }

    if (this.disconnectedPlayerInfo) {
      return this.sendToAll({
        event: Events.END_GAME,
        reason: "DRAW_BOTH_DISCONNECTED",
      });
    }

    const deadline = Date.now() + DISCONNECT_TIMEOUT;

    const timeoutId = setTimeout(
      () => this.forfeitPlayer(color),
      DISCONNECT_TIMEOUT,
    );

    this.disconnectedPlayerInfo = {
      playerId: player.userId,
      color,
      timeOutId: timeoutId,
      deadLine: deadline,
    };

    this.sendToAll({
      event: Events.PLAYER_DISCONNECTED,
      playerColor: color,
      deadline,
    });
  }

  forfeitPlayer(color: PlayerColor) {
    const winner = color === "white" ? Turn.BLACK : Turn.WHITE;

    this.sendToAll({
      event: Events.END_GAME,
      reason: "FORFEIT",
      winner,
    });
  }
}

// to resume the game userId and gameId is required
