const Position = (data = 'A1', children = []) => ({ data, children });

const Tree = () => {
  const toCoordinate = (rankFile) => {
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
    const row = rankFile[0];
    const col = parseInt(rankFile[1], 10) - 1;
    return [rowMap[row], col];
  };
  const toRankFile = (coordinate) => {
    const rowMap = {
      0: 'A',
      1: 'B',
      2: 'C',
      3: 'D',
      4: 'E',
      5: 'F',
      6: 'G',
      7: 'H',
    };
    return rowMap[coordinate[0]] + (coordinate[1] + 1).toString();
  };
  const generateMoves = (position) => {
    const coordinate = toCoordinate(position.data);
    const row = coordinate[0];
    const col = coordinate[1];
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
    return legalMoves.map((coordinates) => toRankFile(coordinates));
  };
  const buildTree = (position, height = 6) => {
    if (height > 0) {
      const newMoves = generateMoves(position);
      newMoves.forEach((value) => {
        const child = Position(value);
        position.children.push(child);
        buildTree(child, height - 1);
      });
    }
    return position;
  };
  return { generateMoves, toCoordinate, toRankFile, buildTree };
};
