import { prisma } from "./prisma.js";
export const addMove = async (playerId, moveMade, gameId) => {
    try {
        // player exist in the game
        const game = await gameExists(gameId);
        if (!game) {
            throw new Error("Game not exist!");
        }
        if (game.blackPlayerId !== playerId && game.whitePlayerId !== playerId) {
            throw new Error("Player doesn't belongs to the game!");
        }
        const move = await prisma.move.create({
            data: {
                gameId,
                playerId,
                fromSquare: moveMade.from,
                toSquare: moveMade.to
            }
        });
        return move;
    }
    catch (error) {
        throw new Error("Could not able to add move, something went wrong");
    }
};
export const userExists = async (playerId) => {
    try {
        const user = await prisma.user.findFirst({
            where: { userId: playerId }
        });
        return user;
    }
    catch (error) {
        throw new Error("Could not able to verify user, something went wrong");
    }
};
export const gameExists = async (gameId) => {
    try {
        const game = await prisma.game.findFirst({
            where: { gameId: gameId }
        });
        return game;
    }
    catch (error) {
        throw new Error("Could not able find game, something went wrong");
    }
};
export const createGame = async (gameId, playerId) => {
    // check if gameId is already there
    try {
        const game = await prisma.game.findFirst({
            where: { gameId: gameId }
        });
        if (game) {
            throw new Error("Game already exits!");
        }
        // create new game
        const newgame = await prisma.game.create({
            data: {
                gameId: gameId,
                whitePlayerId: playerId,
                status: 'WAITING'
            }
        });
        console.log(newgame);
        return newgame;
    }
    catch (error) {
        console.log(error);
        throw new Error("Something went wrong at the time of game creation");
    }
};
export const updateGame = async (gameId, playerId) => {
    // check if game not exist
    const game = await prisma.game.findFirst({
        where: { gameId: gameId }
    });
    if (!game) {
        throw new Error("Game doesn't exist!");
    }
    // update game
    const newgame = await prisma.game.update({
        where: { gameId: gameId },
        data: {
            blackPlayerId: playerId,
            status: 'ONGOING'
        }
    });
    return;
};
export const updateGameStatus = async (gameId, status, color) => {
    // check if game not exist
    const game = await prisma.game.findFirst({
        where: { gameId: gameId }
    });
    if (!game) {
        throw new Error("Game doesn't exist!");
    }
    // update game
    const newgame = await prisma.game.update({
        where: { gameId: gameId },
        data: {
            status: status == 'FINISHED' ? 'FINISHED' : 'ONGOING',
            winner: color == 'black' ? "BLACK" : "WHITE"
        }
    });
    return newgame;
};
export const gameDraw = async (gameId, status) => {
    // check if game not exist
    const game = await prisma.game.findFirst({
        where: { gameId: gameId }
    });
    if (!game) {
        throw new Error("Game doesn't exist!");
    }
    // update game
    const newgame = await prisma.game.update({
        where: { gameId: gameId },
        data: {
            status: status == 'FINISHED' ? 'FINISHED' : 'ONGOING'
        }
    });
    return newgame;
};
export const playerResume = async (gameId, newPlayerId, oldPlayerId) => {
    const game = await gameExists((gameId));
    if (!game) {
        throw new Error("No game exists!");
    }
    if (game.blackPlayerId !== oldPlayerId && game.whitePlayerId !== oldPlayerId)
        throw new Error("Player doesn't belong to the game!");
    else if (game.blackPlayerId == oldPlayerId) {
        return await prisma.game.update({
            where: { gameId: gameId },
            data: { blackPlayerId: newPlayerId }
        });
    }
    else {
        return await prisma.game.update({
            where: { gameId: gameId },
            data: { blackPlayerId: newPlayerId }
        });
    }
};
//# sourceMappingURL=dbFunctions.js.map