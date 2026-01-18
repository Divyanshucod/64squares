import { Router } from "express";
import { SocketManager } from "../socketServer.js";
import { storeInstance } from "../store.js";
const router = Router();
router.get('/createGame', (req, res) => {
    try {
        // first create socket connection
    }
    catch (error) {
        console.log(error);
        res.json({
            message: 'Internal server error, try after sometime!'
        });
    }
});
export const GameRouter = router;
//# sourceMappingURL=game.js.map