import { Chess } from "chess.js";
import { SocketManager } from "./socketServer.js";
import { addMove, createGame, gameDraw, updateGame, updateGameStatus } from "./db/dbFunctions.js";
export var Turn;
(function (Turn) {
    Turn["WHITE"] = "WHITE";
    Turn["BLACK"] = "BLACK";
})(Turn || (Turn = {}));
const GAME_TIME = 300_000;
const DISCONNECT_TIMEOUT = 60_000;
export var Events;
(function (Events) {
    Events["WAITING_OPPONENT"] = "WAITING_OPPONENT";
    Events["START_GAME"] = "START_GAME";
    Events["END_GAME"] = "END_GAME";
    Events["MOVE"] = "MOVE";
    Events["ILLIGAL_MOVE"] = "ILLIGAL_MOVE";
    Events["CREATE_BOARD"] = "CREATE_BOARD";
    Events["RESUME"] = "RESUME";
    Events["CHAT"] = "CHAT";
    Events["CHECKED"] = "CHECKED";
    Events["COMMON"] = "COMMON";
    Events["NEW_GAME"] = "NEW_GAME";
    Events["JOIN_GAME"] = "JOIN_GAME";
    Events["PLAYER_DISCONNECTED"] = "PLAYER_DISCONNECTED";
    Events["PLAYER_RECONNECTED"] = "PLAYER_RECONNECTED";
    Events["SPECTATOR"] = "SPECTATOR";
    Events["AUTO_MATCH"] = "AUTO_MATCH";
})(Events || (Events = {}));
export class GameObect {
    gameId;
    whitePlayerId;
    blackPlayerId;
    whitePlayerSocket;
    blackPlayerSocket;
    spectators;
    Chessobject;
    turn;
    lastMoveTimestamp;
    clock;
    disconnectedPlayerInfo;
    constructor(gameId) {
        this.gameId = gameId;
        this.spectators = [];
        this.Chessobject = new Chess();
    }
    getPlayerSocket(color) {
        return color === "white" ? this.whitePlayerSocket : this.blackPlayerSocket;
    }
    broadcastBoard() {
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
    getAllSockets() {
        return [
            this.whitePlayerSocket,
            this.blackPlayerSocket,
            ...this.spectators,
        ].filter(Boolean);
    }
    sendToAll(data) {
        this.getAllSockets().forEach((s) => s.send(data));
    }
    async addPlayer(player) {
        if (this.whitePlayerId && this.blackPlayerId) {
            return player.send({ event: Events.COMMON, message: "Game is full!" });
        }
        player.gameId = this.gameId;
        if (!this.whitePlayerId) {
            this.whitePlayerId = player.userId;
            this.whitePlayerSocket = player;
            player.role = "white";
            this.turn = Turn.WHITE;
            // push add player to the game table
            try {
                await this.handlerDB(Events.NEW_GAME, this.whitePlayerSocket);
            }
            catch (error) {
                return player.send({ event: Events.COMMON, message: error.message });
            }
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
        await this.handlerDB(Events.JOIN_GAME, this.blackPlayerSocket);
        this.broadcastBoard();
    }
    addSpectators(spectator) {
        spectator.role = "spectator";
        spectator.gameId = this.gameId;
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
    broadcastSpectatorCount(message) {
        this.spectators.forEach((specator) => specator.send({
            event: Events.COMMON,
            spectatorCount: this.spectators.length,
            message,
        }));
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
    makeMove(sender, move, timestamp) {
        if (sender.gameId !== this.gameId || sender.role === "spectator")
            return;
        const isWhiteTurn = this.turn === Turn.WHITE;
        if ((isWhiteTurn && sender.userId !== this.whitePlayerId) ||
            (!isWhiteTurn && sender.userId !== this.blackPlayerId)) {
            return sender.send({ event: Events.ILLIGAL_MOVE });
        }
        const result = this.Chessobject.move(move);
        if (!result)
            return sender.send({ event: Events.ILLIGAL_MOVE });
        // store move
        this.handlerDB(Events.MOVE, sender, move);
        this.updateClock(this.turn, timestamp);
        this.turn = isWhiteTurn ? Turn.BLACK : Turn.WHITE;
        this.lastMoveTimestamp = timestamp;
        if (this.Chessobject.isGameOver()) {
            // update the status of the game in db
            this.handlerDB(Events.END_GAME, sender);
            return this.sendToAll({ event: Events.END_GAME });
        }
        if (this.Chessobject.isCheck()) {
            return this.sendToAll({ event: Events.CHECKED, turn: this.turn });
        }
        this.sendToAll({ event: Events.MOVE, turn: this.turn, clock: this.clock });
    }
    updateClock(turn, now) {
        if (!this.clock || !this.lastMoveTimestamp)
            return;
        const diff = now - this.lastMoveTimestamp;
        if (turn === Turn.WHITE)
            this.clock.WHITE -= diff;
        else
            this.clock.BLACK -= diff;
    }
    broadCast(turn, event) {
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
        this.spectators.forEach((spectator) => spectator.send({
            event,
            gameId: this.gameId,
            turn,
            clock: this.clock,
            timestamp: Date.now(),
            spectatorCount: this.spectators.length,
        }));
    }
    resumeGame(player, gameId) {
        if (gameId !== this.gameId || !this.disconnectedPlayerInfo)
            return;
        if (player.userId !== this.disconnectedPlayerInfo.playerId)
            return;
        clearTimeout(this.disconnectedPlayerInfo.timeOutId);
        this.disconnectedPlayerInfo = undefined;
        player.gameId = gameId;
        if (player.userId === this.whitePlayerId)
            this.whitePlayerSocket = player;
        else
            this.blackPlayerSocket = player;
        // update new playerId
        player.send({
            event: Events.RESUME,
            boardFEN: this.Chessobject.fen(),
            turn: this.turn,
            clock: this.clock,
            timestamp: Date.now(),
        });
        this.sendToAll({ event: Events.PLAYER_RECONNECTED, playerId: player.userId });
    }
    sendChat(sender, message) {
        if (sender.gameId !== this.gameId)
            return;
        this.broadCastChat(Events.CHAT, message);
    }
    broadCastChat(event, message) {
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
        this.spectators.forEach((spectator) => spectator.send({
            event,
            gameId: this.gameId,
            timestamp: Date.now(),
            message,
        }));
    }
    broadCastToAll(data) {
        this.whitePlayerSocket?.send(data);
        this.blackPlayerSocket?.send(data);
        this.spectators.forEach((s) => s.send(data));
    }
    handlePlayerDisconnect(player) {
        const color = player.userId === this.whitePlayerId
            ? "white"
            : player.userId === this.blackPlayerId
                ? "black"
                : null;
        if (!color) {
            this.spectators = this.spectators.filter((s) => s.userId !== player.userId);
            return this.broadcastSpectatorCount();
        }
        if (this.disconnectedPlayerInfo) {
            try {
                gameDraw(player.gameId, 'FINISHED');
            }
            catch (error) {
                player.send({ event: Events.COMMON, message: error.message });
            }
            return this.sendToAll({
                event: Events.END_GAME,
                reason: "DRAW_BOTH_DISCONNECTED",
            });
        }
        const deadline = Date.now() + DISCONNECT_TIMEOUT;
        const timeoutId = setTimeout(() => this.forfeitPlayer(color), DISCONNECT_TIMEOUT);
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
    async forfeitPlayer(color) {
        const winner = color === "white" ? Turn.BLACK : Turn.WHITE;
        if (winner == Turn.BLACK) {
            await this.handlerDB(Events.END_GAME, this.blackPlayerSocket);
        }
        else {
            await this.handlerDB(Events.END_GAME, this.whitePlayerSocket);
        }
        this.sendToAll({
            event: Events.END_GAME,
            reason: "FORFEIT",
            winner,
        });
    }
    async handlerDB(processEvent, playerInfo, move) {
        try {
            switch (processEvent) {
                case Events.NEW_GAME:
                    await createGame(playerInfo.gameId, playerInfo.userId);
                    break;
                case Events.JOIN_GAME:
                    await updateGame(playerInfo.gameId, playerInfo.userId);
                    break;
                case Events.MOVE:
                    await addMove(playerInfo.userId, move, playerInfo.gameId);
                    break;
                case Events.END_GAME:
                    await updateGameStatus(playerInfo.gameId, 'FINISHED', playerInfo.role);
                    break;
                default:
                    break;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
// to resume the game userId and gameId is required
//# sourceMappingURL=gameManager.js.map