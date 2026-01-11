import { Router } from "express";
import { SocketManager } from "../socketServer.js";
import { storeInstance } from "../store.js";

const router = Router()


router.post('/createGame',(req,res)=>{
    try {
        // first create socket connection
        const wsSocket = new SocketManager(router)
        storeInstance.createGame(wsSocket)
    } catch (error) {
        res.json({
            message:'Internal server error, try after sometime!'
        })
    }
})

export const GameRouter = router;