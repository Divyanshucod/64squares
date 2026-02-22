export default function GameBoard() {
  return (
    <div className="aspect-square max-h-full max-w-full overflow-hidden">
      <img
        src="/assets/chess_boards/Chess_Board_Black_White.svg"
        alt="Chess Board"
        className="w-full h-full object-contain"
      />
    </div>
  );
}