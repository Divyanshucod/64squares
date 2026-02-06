-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_blackPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_whitePlayerId_fkey";

-- DropForeignKey
ALTER TABLE "Move" DROP CONSTRAINT "Move_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Move" DROP CONSTRAINT "Move_playerId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "whitePlayerId" SET DATA TYPE TEXT,
ALTER COLUMN "blackPlayerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Move" ALTER COLUMN "gameId" SET DATA TYPE TEXT,
ALTER COLUMN "playerId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_whitePlayerId_fkey" FOREIGN KEY ("whitePlayerId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_blackPlayerId_fkey" FOREIGN KEY ("blackPlayerId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
