import { Chess, WHITE } from "chess.js";
export var Turn;
(function (Turn) {
    Turn["WHITE"] = "WHITE";
    Turn["BLACK"] = "BLACK";
})(Turn || (Turn = {}));
export var Events;
(function (Events) {
    Events["Waiting_Opponent"] = "Waiting_Opponent";
    Events["Start_Game"] = "Start_Game";
    Events["End_Game"] = "End_Game";
    Events["Move"] = "Move";
    Events["Illegal_Move"] = "Illegal_Movee";
    Events["Create_Board"] = "Create_Board";
    Events["Resume"] = "Resume";
    Events["Chat"] = "Chat";
    Events["Checked"] = "Checked";
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
    constructor(gameId) {
        this.gameId = gameId;
        this.spectators = [];
        this.Chessobject = new Chess();
    }
    addPlayer(playerId, playerSocket) {
        if (!this.whitePlayerId) {
            this.whitePlayerId = playerId;
            this.whitePlayerSocket = playerSocket;
            this.turn = Turn.WHITE;
            playerSocket.send({
                event: Events.Waiting_Opponent,
                message: "Waiting for opponent... "
            });
        }
        else {
            this.blackPlayerId = playerId;
            this.blackPlayerSocket = playerSocket;
            this.lastMoveTimestamp = Date.now();
            this.clock = {
                BLACK: 300000,
                WHITE: 300000
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
    addSpectators(spectator) {
        this.spectators?.push(spectator);
        spectator.send({
            event: "create-board",
            gameId: `${this.gameId}`,
            boardFEN: `${this.Chessobject.fen()}`,
            turn: `${this.turn}`,
            clock: {
                WHITE: 300000,
                BLACK: 300000,
            },
            timestamp: `${Date.now()}`,
        });
    }
    makeMove({ move: { from, to }, turn, timestamp }) {
        try {
            this.Chessobject.move({ from, to });
            // notify both with the current move {from: to:}
            this.calculateRemainigTime(turn, timestamp);
            if (this.Chessobject.inCheck()) {
                // notify the opposite color that he/she got checked
                if (turn == Turn.BLACK) {
                    this.whitePlayerSocket?.send({
                        event: Events.Checked,
                        gameId: this.gameId,
                        turn: Turn.WHITE,
                        clock: this
                            .clock,
                        timestamp: Date.now(),
                    });
                }
                else {
                    this.blackPlayerSocket?.send({
                        event: Events.Move,
                        gameId: this.gameId,
                        turn: Turn.BLACK,
                        clock: this.clock,
                        timestamp: Date.now(),
                    });
                }
                // spectators
                this.spectators.forEach((spectator) => spectator.send({
                    event: Events.Move,
                    gameId: this.gameId,
                    turn: this.turn,
                    clock: this.clock,
                    timestamp: Date.now(),
                }));
            }
            if (this.Chessobject.isGameOver()) {
                // current person won the  match
                if (Turn.BLACK == turn) {
                    this.whitePlayerSocket?.send({
                        event: Events.End_Game,
                        gameId: this.gameId,
                        turn: Turn.WHITE,
                        clock: this.clock,
                        timestamp: Date.now(),
                    });
                }
                else {
                    this.blackPlayerSocket?.send({
                        event: Events.End_Game,
                        gameId: this.gameId,
                        turn: Turn.BLACK,
                        clock: this.clock,
                        timestamp: Date.now(),
                    });
                }
                // spectators
                this.spectators.forEach((spectator) => spectator.send({
                    event: Events.End_Game,
                    gameId: this.gameId,
                    turn: turn == Turn.BLACK ? Turn.WHITE : Turn.BLACK,
                    clock: this.clock,
                    timestamp: Date.now(),
                }));
            }
            this.blackPlayerSocket?.send({
                event: Events.Move,
                gameId: this.gameId,
                turn: turn == Turn.BLACK ? Turn.WHITE : Turn.BLACK,
                clock: this.clock,
                timestamp: Date.now(),
            });
            this.whitePlayerSocket?.send({
                event: Events.Move,
                gameId: this.gameId,
                turn: turn == Turn.BLACK ? Turn.WHITE : Turn.BLACK,
                clock: this.clock,
                timestamp: Date.now(),
            });
            // spectators
            this.spectators.forEach((spectator) => spectator.send({
                event: Events.Move,
                gameId: this.gameId,
                turn: turn == Turn.BLACK ? Turn.WHITE : Turn.BLACK,
                clock: this.clock,
                timestamp: Date.now(),
            }));
        }
        catch (error) {
            if (Turn.BLACK == turn) {
                // notify the opposite made a illegal move
                this.blackPlayerSocket?.send({
                    event: Events.Illegal_Move,
                    gameId: this.gameId,
                    turn: this.turn,
                    clock: this.clock,
                    timestamp: Date.now(),
                });
            }
            else {
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
    calculateRemainigTime(turn, timestamp) {
        if (turn == Turn.BLACK && this.lastMoveTimestamp) {
            const remainingTime = this.clock ? this.clock.BLACK - (timestamp - this.lastMoveTimestamp) : 0;
            this.clock = {
                BLACK: remainingTime,
                WHITE: this.clock?.WHITE ?? 30000
            };
        }
        else if (turn == Turn.WHITE && this.lastMoveTimestamp) {
            const remainingTime = this.clock ? this.clock.WHITE - (timestamp - this.lastMoveTimestamp) : 0;
            this.clock = {
                BLACK: this.clock?.BLACK ?? 30000,
                WHITE: remainingTime
            };
        }
    }
}
//# sourceMappingURL=gameManager.js.map