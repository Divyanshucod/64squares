import { useState } from "react";
import GameBoard from "../MainGameSection/GameBoard";
import InGameUserBanner from "../MainGameSection/InGameUserBanner";
import HistoryBlock from "./HistoryBlock";

export default function HistoryPage(){
    const [displayMagicJump,setDisplayMagicJump] = useState<boolean>(false)
    return <div className="min-h-screen min-w-screen flex">
           <div className="flex-1 min-h-full max-h-screen text-center relative">
             {displayMagicJump ? <MagicJump
  open={displayMagicJump}
  onClose={() => setDisplayMagicJump(false)}
/> : <button
  onClick={() => setDisplayMagicJump(true)}
  className="w-40 absolute bottom-1 right-2 border border-amber-300 z-10  bg-black/80 backdrop-blur-md"
>
  Track Moves
</button>}
             
             <div className="flex-1 flex flex-col border-r border-chess-border/20 p-5 overflow-hidden h-full">
                    
                    <InGameUserBanner />
            
                    <div className="flex-1 flex items-center justify-center min-h-0">
                      <GameBoard />
                    </div>
            
                    <InGameUserBanner />
                  </div>
           </div>
           <div className="flex-1 border border-amber-400 min-h-full max-h-screen overflow-y-auto">
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
                 <HistoryBlock/>
           </div>
    </div>
}

const MagicJump = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`
        absolute bottom-2 right-2
        w-96 max-h-[50vh]
        flex flex-col
        border border-amber-500 bg-black/80 backdrop-blur-md
        transition-all duration-300 ease-out
        origin-bottom-right
        ${open
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-95 pointer-events-none"}
      `}
    >
      <button onClick={onClose} className="mb-2 w-full">
        close
      </button>

      <div className="flex-1 overflow-y-auto h-full">
        <div className="border border-amber-100">e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
         <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
        <div>e2 → e4</div>
      </div>
    </div>
  );
};