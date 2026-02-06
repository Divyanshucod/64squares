
import { prisma } from "./prisma.js"

export const addMove= async (playerId:string,moveMade:{from:string,to:string},gameId:string)=>{
   try {
     const user = await userExists(playerId);
     if(!user){
         throw new Error("Player doesn't exist!")
     }
     const game = await gameExists(gameId)
     if(!game){
         throw new Error("Game doesn't exist!")
     }
     const move = await prisma.move.create({
        data:{
            gameId,
            playerId,
            fromSquare: moveMade.from,
            toSquare:moveMade.to
        }
     })
     
   } catch (error) {
     throw new Error("Could not able to add move, something went wrong")
   }
}

const userExists = async (playerId:string)=>{
    try {
        const user = await prisma.user.findFirst({
            where:{userId:playerId}
        })
        return user;
    } catch (error) {
        throw new Error("Could not able to verify user, something went wrong")
    }
}

const gameExists = async (gameId:string)=>{
    try {
        const game = await prisma.game.findFirst({
            where:{gameId:gameId}
        })
        return game;
    } catch (error) {
        throw new Error("Could not able find game, something went wrong")
    }
}