export default function VideoCall() {
  return (
    <div className="w-full h-full bg-chess-darker rounded-lg border border-chess-border/20">
        <div className="px-4 py-2">
            <h3 className="text-chess-text text-center font-bold">Video Call</h3>
        </div>
        <div className="p-4">
            <div className="bg-chess-light/10 border border-chess-border/20 rounded-lg p-2">
                <p className="text-chess-text text-center">Video Call in Progress</p>
            </div>
        </div>
    </div>
  );
}