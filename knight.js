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

// dropdown inputs in the form
const startFile = document.querySelector('#start-file');
const startRank = document.querySelector('#start-rank');
const endFile = document.querySelector('#end-file');
const endRank = document.querySelector('#end-rank');

const Position = (data = 'A1', children = [], parent = null) => ({ data, children, parent });

const Tree = (start = null) => {
  const toCoordinate = (rankFile) => {
    // map rank file to 2D zero-indexed coordinate array
    // rank -> row, file -> col i.e 'C2' -> [1,2]
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
  // maps 2D coordinate array to rank file notation, see toCoordinate
  const toRankFile = (coordinate) => colMap[coordinate[1]] + (coordinate[0] + 1).toString();
  const generateMoves = (position) => {
    const coordinate = toCoordinate(position.data);
    const row = coordinate[0];
    const col = coordinate[1];
    const legalMoves = [];
    // knightMoves is an array of all eight possible moves for a knight
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
      // check if the move is within the 8x8 chess board
      if (nextRow >= 0 && nextRow <= 7 && nextCol >= 0 && nextCol <= 7) {
        legalMoves.push([nextRow, nextCol]);
      }
    });
    // convert legal moves from coordinates back to rank file
    return legalMoves.map((coordinates) => toRankFile(coordinates));
  };
  const buildTree = (position, height = 6) => {
    // at a tree height of 6, all 64 squares are in the tree
    if (!position.data) return null;
    if (height > 0) {
      // set the legal moves for a given square as its children
      const newMoves = generateMoves(position);
      newMoves.forEach((value) => {
        const child = Position(value);
        child.parent = position;
        position.children.push(child);
        buildTree(child, height - 1);
      });
    }
    // return the root of the tree
    return position;
  };
  let root = buildTree(Position(start));
  const setRoot = (rankFile) => {
    root = buildTree(Position(rankFile));
  };
  const getRoot = () => root;
  const find = (rankFile) => {
    // use bfs to return the node with the input rank file
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
    // traverse the tree from the found node to the root
    // and append each node to a stack
    while (current) {
      stack.push(current.data);
      current = current.parent;
    }
    return stack;
  };
  return { setRoot, getRoot, path };
};

const chessBoard = (() => {
  const board = document.querySelector('.board');
  const file = document.querySelector('.file');
  const rank = document.querySelector('.rank');
  // row wise iteration
  for (let j = 8; j > 0; j -= 1) {
    // fill in rank and file divs with correct labels
    const newRank = document.createElement('div');
    newRank.innerText = j;
    newRank.setAttribute('class', 'rankfile');
    rank.appendChild(newRank);

    const newFile = document.createElement('div');
    newFile.innerText = colMap[j - 1];
    newFile.setAttribute('class', 'rankfile');
    file.insertBefore(newFile, file.firstChild);
    // col wise iteration
    for (let i = 0; i < 8; i += 1) {
      const square = document.createElement('div');
      square.setAttribute('class', 'square');
      // add shaded class to every other square
      if (j % 2 !== i % 2) square.classList.add('shaded');
      const position = colMap[i] + j.toString();
      // use data attribute to indicate rank and file
      square.setAttribute('data-index', position);
      board.appendChild(square);
    }
  }
})();

const userSelection = (() => {
  // add rank and file options to dropdown menus
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

const domControl = (() => {
  const form = document.querySelector('.selector-form');
  const tree = Tree();
  let currPair = null;
  // initialize knight icon
  const display = document.querySelector('.display');
  const knight = document.createElement('img');
  knight.setAttribute('src', 'images/knight.png');
  knight.setAttribute('class', 'knight');
  function updateDisplay(rankFile) {
    // update display div with current node in the path
    if (!display.innerText) display.innerText = `Shortest Path: ${rankFile}`;
    else display.innerText += ` -> ${rankFile}`;
  }
  function wait(ms) {
    // delay code by a given number of milliseconds
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(ms), ms);
    });
  }
  async function traversePath(path) {
    // async function to pause between every square traversal
    const submitBtn = document.querySelector('.submit');
    submitBtn.disabled = true; // stop users from changing the start and end while traversePath is running
    const pathCopy = path.slice();
    while (pathCopy.length > 0) {
      const rankFile = pathCopy.pop();
      const query = `[data-index=${rankFile}]`;
      const target = document.querySelector(query);
      target.appendChild(knight); // move the knight icon to next square in the path
      updateDisplay(rankFile);
      // eslint-disable-next-line no-await-in-loop
      await wait(2000);
    }
    submitBtn.disabled = false; // re-enable submit button
  }
  function submitForm(e) {
    e.preventDefault(); // prevent the form from redirecting
    // concatenate values from dropdown menus
    const start = startFile.value + startRank.value;
    const end = endFile.value + endRank.value;
    if (!tree.getRoot() || tree.getRoot().data !== start) {
      // re-build the tree for a null root or when start changes
      tree.setRoot(start);
    }
    if (currPair !== start + end) {
      // calculate path traversal when start or end changes
      display.innerText = '';
      traversePath(tree.path(end));
      currPair = start + end; // update the current start and end pair
    }
  }
  form.addEventListener('submit', submitForm);
})();
