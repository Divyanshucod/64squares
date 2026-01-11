import express from 'express';
import cors from 'cors';
import { GameRouter } from './routes/game.js';

const PORT = 3000;
const app = express();
app.use(cors())
app.use(express.json())

app.use('/game',GameRouter)

app.listen(PORT,()=>{
    console.log('Server is running on port:'+PORT);
    
})