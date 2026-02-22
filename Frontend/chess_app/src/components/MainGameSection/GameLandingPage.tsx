import GameBoard from "./GameBoard";
import InGameUserBanner from "./InGameUserBanner";
import MovesDisplayer from "./MovesDisplyer";

export default function GameLandingPage() {
  return (
    <div className="w-full h-screen bg-chess-darker border border-chess-border/20 flex">
      
      <div className="flex-1 flex flex-col border-r border-chess-border/20 p-5 overflow-hidden">
        
        <InGameUserBanner />

        <div className="flex-1 flex items-center justify-center min-h-0">
          <GameBoard />
        </div>

        <InGameUserBanner />
      </div>
      <div className="flex-1 min-h-0">
        <MovesDisplayer />
      </div>

    </div>
  );
}