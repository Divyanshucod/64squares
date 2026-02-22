export default function Timer() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-2xl font-mono text-chess-light">05:00</div>
      <div className="w-16 h-1 bg-chess-border rounded-full overflow-hidden">
        <div className="h-full bg-linear-to-r from-green-400 to-green-600 animate-timer-shrink"></div>
      </div>
    </div>
  );
}