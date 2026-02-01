import express from "express";
import cors from "cors";
import { GameRouter } from "./routes/game.js";
import { WebSocketServer } from "ws";
import { SocketManager } from "./socketServer.js";
import { storeInstance } from "./store.js";
import { Events } from "./gameManager.js";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
const wss = new WebSocketServer({ port: 3001 });
app.use("/game", GameRouter);
// websocket server creation

wss.on("connection", (ws, req) => {
  // authenticate
   authenticate(ws,req)
  ws.on("message", (message, isBinary) => {
      if (isBinary) {
        console.log("Binary message, ignoring or handling separately");
        return;
      }

      const data = JSON.parse(message.toString());
      console.log(data);

      const game = storeInstance.Games?.find(game => game.gameId == data.gameId);
      if(!game){
        ws.send('No such game exists');
      }
      if(data.event == Events.Resume){
      }
      if(data.event == Events.Move){
         game?.makeMove({
          move:data.move,
          turn:data.turn,
          timestamp:data.timestamp
         })
      }
      else if(data.event == 'Chat'){
         game?.blackPlayerSocket?.send({
          event:Events.Chat,
          message:data.message
         })
          game?.whitePlayerSocket?.send({
          event:Events.Chat,
          message:data.message
         })
          game?.spectators.forEach(spectator => spectator.send({
          event:Events.Chat,
          message:data.message
         }))
      }
    });
  ws.on("close", (data) => {
    console.log(data + "Connection closed!");
    disConnected(ws, data)
  });
});
app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});

function authenticate(ws:any,req:any){
  const fullUrl = new URL(req.url!, `http://${req.headers.host}`);
  const token = fullUrl.searchParams.get('token') || undefined
  const role = fullUrl.searchParams.get('role') || undefined
  const gameId = fullUrl.searchParams.get('gameId') || undefined
  if(!token || !role){ 
     ws.close(1008, "Token and role is required");
    return;}
  if(role == 'spectator' && (gameId != undefined || gameId != '')){
     // find the game in which he/she wants to join
     const game = storeInstance.Games?.find(game => game.gameId == gameId);
    if (!game) {
    ws.close(1008, "No such game exits"); // Policy Violation
    return;
  }
     const socketManager = new SocketManager(ws);
     game.addSpectators(socketManager)
  }
  else{
    const socketManager = new SocketManager(ws);
  storeInstance.createGame(socketManager,token);
  }
}
function disConnected(ws:any,req:any){
  const fullUrl = new URL(req.url!, `http://${req.headers.host}`);
  const token = fullUrl.searchParams.get('token') || undefined
  const role = fullUrl.searchParams.get('role') || undefined

  // find a game first
  const game = storeInstance.Games?.find(game => game.spectators.forEach(spectator => spectator.socket == ws))
  if (!game) {
    ws.close(1008, "No such game exits"); // Policy Violation
    return;
}
   game.spectators = game.spectators.filter(spectator => spectator.socket != ws)
}
// resume the game
// database conection and store  moves there
// When ever someone loses the connect (player then resume), spectator then reduce send the updated count
// what about spectators name or dp same for players