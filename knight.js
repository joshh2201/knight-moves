const Position = (data = 'A1', children = []) => ({ data, children });

const Tree = () => {
  const toCoordinate = (position) => {
    const rowMap = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
    };

    const row = position.data[0];
    const col = parseInt(position.data[1], 10) - 1;
    return [rowMap.row, col];
  };
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
  const seen = new Set();
  const buildTree = (position) => {
    const moves = generateMoves(position);
  };
  return { generateMoves, toCoordinate };
};
