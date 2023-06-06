const Position = (data = [0, 0], children = []) => ({ data, children });

const Tree = () => {
  const generateMoves = (position) => {
    const row = position.data[0];
    const col = position.data[1];
    const legalMoves = [];
    const knightMoves = [
      [-2, -1],
      [-2, 1],
      [2, -1],
      [2, 1],
      [1, -2],
      [1, 2],
      [-1, -2],
      [-1, 2],
    ];
    knightMoves.forEach((move) => {
      const nextRow = row + move[0];
      const nextCol = col + move[1];
      if (nextRow >= 0 && nextRow <= 7 && nextCol >= 0 && nextCol <= 7) {
        legalMoves.push([nextRow, nextCol]);
      }
    });
    return legalMoves;
  };
  return { generateMoves };
};
