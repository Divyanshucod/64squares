import { storeInstance } from "../store.js";
import { Events } from "../gameManager.js";
import { SocketManager } from "../socketServer.js";
export function handleMessage(socketManager, data) {
    const { gameId, event } = data;
    if (event == Events.NEW_GAME) {
        return storeInstance.createGame(socketManager);
    }
    if (event == Events.AUTO_MATCH) {
        return storeInstance.autoMatch(socketManager);
    }
    if (!gameId) {
        socketManager.send({
            event: "ERROR",
            message: "gameId is required"
        });
        return;
    }
    const game = storeInstance.getGame(gameId);
    if (!game) {
        socketManager.send({
            event: "ERROR",
            message: "No such game"
        });
        return;
    }
    switch (event) {
        case Events.RESUME:
            game.resumeGame(socketManager, gameId);
            break;
        case Events.MOVE:
            game.makeMove(socketManager, data.move, data.timestamp);
            break;
        case Events.CHAT:
            game.sendChat(socketManager, data.message);
            break;
        case Events.JOIN_GAME:
            game.addPlayer(socketManager);
            break;
        case Events.SPECTATOR:
            game.addSpectators(socketManager);
            break;
        default:
            socketManager.send({
                event: "ERROR",
                message: "Unknown event"
            });
    }
}
//# sourceMappingURL=handleMessage.js.map