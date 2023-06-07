/* eslint-disable no-undef */
const colMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
};

const Position = (data = 'A1', children = [], parent = null) => ({ data, children, parent });

const Tree = (start = null) => {
  const toCoordinate = (rankFile) => {
    const fileMap = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
    };
    const col = rankFile[0];
    const row = parseInt(rankFile[1], 10) - 1;
    return [row, fileMap[col]];
  };
  const toRankFile = (coordinate) => colMap[coordinate[1]] + (coordinate[0] + 1).toString();
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
    if (!position.data) return null;
    if (height > 0) {
      const newMoves = generateMoves(position);
      newMoves.forEach((value) => {
        const child = Position(value);
        child.parent = position;
        position.children.push(child);
        buildTree(child, height - 1);
      });
    }
    return position;
  };
  let root = buildTree(Position(start));
  const setRoot = (rankFile) => {
    root = buildTree(Position(rankFile));
  };
  const getRoot = () => root;
  const find = (rankFile) => {
    if (!root) return null;
    const queue = [];
    queue.push(root);
    let current = null;
    while (queue.length > 0) {
      current = queue.shift();
      if (current.data === rankFile) return current;
      current.children.forEach((child) => queue.push(child));
    }
    return null;
  };
  const path = (rankFile) => {
    let current = find(rankFile);
    const stack = [];
    while (current) {
      stack.push(current.data);
      current = current.parent;
    }
    return stack;
  };
  return { generateMoves, toCoordinate, toRankFile, buildTree, find, setRoot, getRoot, path };
};

const chessBoard = (() => {
  const board = document.querySelector('.board');
  let square = null;
  let position = null;
  // row wise
  for (let j = 8; j > 0; j -= 1) {
    // col wise
    for (let i = 0; i < 8; i += 1) {
      square = document.createElement('div');
      square.setAttribute('class', 'square');
      if (j % 2 !== i % 2) square.classList.add('shaded');
      position = colMap[i] + j.toString();
      square.setAttribute('data-index', position);
      board.appendChild(square);
    }
  }
})();

const userSelection = (() => {
  const startFile = document.querySelector('#start-file');
  const startRank = document.querySelector('#start-rank');
  const endFile = document.querySelector('#end-file');
  const endRank = document.querySelector('#end-rank');
  for (let i = 0; i < 8; i += 1) {
    const optionFile = document.createElement('option');
    optionFile.setAttribute('value', colMap[i]);
    optionFile.innerText = colMap[i];
    const cloneFile = optionFile.cloneNode();
    cloneFile.innerText = colMap[i];
    startFile.appendChild(optionFile);
    endFile.appendChild(cloneFile);

    const optionRank = document.createElement('option');
    optionRank.setAttribute('value', i + 1);
    optionRank.innerText = i + 1;
    const cloneRank = optionRank.cloneNode();
    cloneRank.innerText = i + 1;
    startRank.appendChild(optionRank);
    endRank.appendChild(cloneRank);
  }
})();
