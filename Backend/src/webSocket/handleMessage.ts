import { storeInstance } from "../store.js";
import { Events } from "../gameManager.js";
import { SocketManager } from "../socketServer.js";

export function handleMessage(
  socketManager: SocketManager,
  data: any
) {
  const { gameId, event } = data;

  if(!gameId && event == Events.New_Game){
     storeInstance.createGame(socketManager)
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
    case Events.Resume:
      game.resumeGame(socketManager,gameId);
      break;

    case Events.Move:
      game.makeMove(socketManager, data.move,data.timestamp);
      break;

    case Events.Chat:
      game.sendChat(socketManager, data.message);
      break;
    
    case Events.Join_Game:
      game.addPlayer(socketManager);
      break;

    case Events.Spectator:
      game.addSpectators(socketManager);
      break;
      
    default:
      socketManager.send({
        event: "ERROR",
        message: "Unknown event"
      });
  }
}
