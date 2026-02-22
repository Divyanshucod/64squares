import Button from "../UI/Button";
import MoveTracker from "./MoveTracker";
import VideoCall from "./VideoCall";

export default function MovesDisplayer() {
  return (
    <div className="w-full max-h-full bg-chess-darker rounded-lg border border-chess-border/20">
        <div className="w-full p-4 flex justify-evenly items-center">
            <Button>
                New Game
            </Button>
            <Button>
                Resign
            </Button>
             <Button>
               Video Call
            </Button>
        </div>
        <div className="p-4 h-[50%] border border-amber-600 overflow-y-auto">
           <MoveTracker/>
        </div>
        <div className="w-full h-full flex gap-4 items-center">
            <VideoCall/>
            <VideoCall/>
        </div>
    </div>
  );
}