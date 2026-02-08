export declare const addMove: (playerId: string, moveMade: {
    from: string;
    to: string;
}, gameId: string) => Promise<{
    fromSquare: string;
    toSquare: string;
    createdAt: Date;
    id: number;
    gameId: string;
    playerId: string;
}>;
export declare const userExists: (playerId: string) => Promise<{
    createdAt: Date;
    id: number;
    userId: string;
    username: string;
    profilePic: string | null;
} | null>;
export declare const gameExists: (gameId: string) => Promise<{
    createdAt: Date;
    id: number;
    gameId: string;
    whitePlayerId: string | null;
    blackPlayerId: string | null;
    status: import("../generated/prisma/enums.js").MatchStatus;
    winner: import("../generated/prisma/enums.js").Winner;
    updatedAt: Date;
} | null>;
export declare const createGame: (gameId: string, playerId: string) => Promise<{
    createdAt: Date;
    id: number;
    gameId: string;
    whitePlayerId: string | null;
    blackPlayerId: string | null;
    status: import("../generated/prisma/enums.js").MatchStatus;
    winner: import("../generated/prisma/enums.js").Winner;
    updatedAt: Date;
}>;
export declare const updateGame: (gameId: string, playerId: string) => Promise<void>;
export declare const updateGameStatus: (gameId: string, status: string, color: string) => Promise<{
    createdAt: Date;
    id: number;
    gameId: string;
    whitePlayerId: string | null;
    blackPlayerId: string | null;
    status: import("../generated/prisma/enums.js").MatchStatus;
    winner: import("../generated/prisma/enums.js").Winner;
    updatedAt: Date;
}>;
export declare const gameDraw: (gameId: string, status: string) => Promise<{
    createdAt: Date;
    id: number;
    gameId: string;
    whitePlayerId: string | null;
    blackPlayerId: string | null;
    status: import("../generated/prisma/enums.js").MatchStatus;
    winner: import("../generated/prisma/enums.js").Winner;
    updatedAt: Date;
}>;
export declare const playerResume: (gameId: string, newPlayerId: string, oldPlayerId: string) => Promise<{
    createdAt: Date;
    id: number;
    gameId: string;
    whitePlayerId: string | null;
    blackPlayerId: string | null;
    status: import("../generated/prisma/enums.js").MatchStatus;
    winner: import("../generated/prisma/enums.js").Winner;
    updatedAt: Date;
}>;
//# sourceMappingURL=dbFunctions.d.ts.map