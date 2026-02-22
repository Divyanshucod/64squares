import Timer from "./Timer";

export default function InGameUserBanner(){
    return <div className="flex justify-between h-20 w-full border border-amber-50">
        <div className="flex gap-5 h-full w-full items-center">
            <div className="flex items-center">
               <img src="/avatar-icon.svg" alt="Logo" className="h-10 object-contain bg-white rounded-full"/>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-chess-light">Player 1</h2>
                <p className="text-sm text-chess-text/70">Rating: 1500</p>
            </div>
        </div>
        <div className="flex justify-center">
             <Timer/>
        </div>
    </div>
}