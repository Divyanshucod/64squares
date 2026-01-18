import express from 'express';
import cors from 'cors';
import { GameRouter } from './routes/game.js';
import { WebSocketServer } from 'ws';
import { SocketManager } from './socketServer.js';
import { storeInstance } from './store.js';
const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
const wss = new WebSocketServer({ port: 3001 });
app.use('/game', GameRouter);
// websocket server creation
wss.on('connection', (ws, req) => {
    console.log("person connect to our server ws:" + JSON.stringify(ws), "req:" + JSON.stringify(req));
    const socketManager = new SocketManager(ws);
    storeInstance.createGame(socketManager);
    ws.on('message', (data) => {
        console.log(data);
    });
    ws.on('close', (data) => {
        console.log(data + "Connection closed!");
    });
});
app.listen(PORT, () => {
    console.log('Server is running on port:' + PORT);
});
//# sourceMappingURL=index.js.map