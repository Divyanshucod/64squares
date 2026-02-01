import { storeInstance } from "../store.js";
import { Events } from "../gameManager.js";
import { SocketManager } from "../socketServer.js";

export function handleMessage(
  socketManager: SocketManager,
  data: any
) {
  const { gameId, event } = data;

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
    case Events.Resume:
      game.resumeGame(socketManager);
      break;

    case Events.Move:
      game.makeMove(socketManager, data);
      break;

    case Events.Chat:
      game.sendChat(socketManager, data.message);
      break;

    default:
      socketManager.send({
        event: "ERROR",
        message: "Unknown event"
      });
  }
}
