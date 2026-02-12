import { useRef,useEffect } from "react";
import type { Piece } from "../Type";
import gsap from "gsap";
import { squareToCoords } from "../../logic/squareToCoordinates";

export default function HeroSection() {
  const boardRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<Record<string, HTMLDivElement>>({});

  const squareSize = 80; // adjust based on board size

  const pieces: Piece[] = [
  { id: "bk_e8", type: "king", color: "black", square: "e8" },
  { id: "bq_d8", type: "queen", color: "black", square: "d8" },
  { id: "bn_f6", type: "knight", color: "black", square: "f6" },
  { id: "bp_e7", type: "pawn", color: "black", square: "e7" },
  { id: "bp_d6", type: "pawn", color: "black", square: "d6" },

  // --- White ---
  { id: "wk_e1", type: "king", color: "white", square: "e1" },
  { id: "wq_d1", type: "queen", color: "white", square: "d1" },
  { id: "wb_c4", type: "bishop", color: "white", square: "c4" },
  { id: "wp_e4", type: "pawn", color: "white", square: "e4" },
  { id: "wp_d3", type: "pawn", color: "white", square: "d3" },
];

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    const movePiece = (id: string, to: string) => {
      const piece = pieceRefs.current[id];
      const { x, y } = squareToCoords(to, squareSize);

      return gsap.timeline()
        .to(piece, { z: 40, scale: 1.05, duration: 0.15 })
        .to(piece, { x, y, duration: 0.6 })
        .to(piece, { z: 0, scale: 1, duration: 0.15 });
    };

    // Slight camera tilt for 3D illusion
    tl.to(cameraRef.current, {
      rotateZ: 10,
      duration: 2,
    }, 0);

    tl.add(movePiece("bn_f6", "g4"))        // knight pressure
  .add(movePiece("wp_e4", "e5"), "+=0.3")
  .add(movePiece("bq_d8", "h4"), "+=0.4")
  .add(movePiece("wb_c4", "f7"), "+=0.3") // aggressive diagonal
  .add(movePiece("bk_e8", "d7"), "+=0.4");


  }, []);

  return (
    <div className="scene">
      <div className="camera" ref={cameraRef}>
        <div className="board" ref={boardRef}>
          <img src="/assets/chess_boards/Chess_Board_Black_Brown.svg" alt="board" className="boardImage" />

          <div className="piecesLayer">
            {pieces.map((piece) => {
              const { x, y } = squareToCoords(piece.square, squareSize);  

              return (
                <div
                  key={piece.id}
                  ref={(el) => {
                    if (el) pieceRefs.current[piece.id] = el;
                  }}
                  className="piece"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <img
                    src={`/assets/chess_pieces/${piece.color}-${piece.type}.svg`}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="heroText">
        <h1>64Squares</h1>
        <p>Every move shapes destiny.</p>
      </div>
    </div>
  );
}