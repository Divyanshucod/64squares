export const squareToCoords = (square: string, size: number) => {
  const file = square.charCodeAt(0) - 97; // a=0
  const rank = 8 - parseInt(square[1]);   // invert for top-left origin

 return {
  x: file * size,
  y: rank * size-5
};
};