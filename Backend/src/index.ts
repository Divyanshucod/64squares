import express from "express";
import cors from "cors";
import { GameRouter } from "./routes/game.js";
import { WebSocketServer } from "ws";
import { SocketManager } from "./socketServer.js";
import { handleMessage } from "./webSocket/handleMessage.js";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
const wss = new WebSocketServer({ port: 3001 });
app.use("/game", GameRouter);
// websocket server creation

wss.on("connection", (ws, req) => {
  const socketManager = authenticate(ws, req);
  if (!socketManager) return;

  ws.on("message", (message, isBinary) => {
    if (isBinary) return;

    try {
      const data = JSON.parse(message.toString());
      handleMessage(socketManager, data);
    } catch {
      socketManager.send({
        event: "ERROR",
        message: "Invalid JSON"
      });
    }
  });

  ws.on("close", () => {
    socketManager.handleDisconnect();
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});

function authenticate(ws:any,req:any){
  const fullUrl = new URL(req.url!, `http://${req.headers.host}`);
  const token = fullUrl.searchParams.get('playerId') || undefined
  if(token){
  const socketManager = new SocketManager(ws,token);
  return socketManager;
  }else{
    ws.close(1008,"Token is required!")
    return undefined;
  }
}