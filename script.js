const board = document.getElementById('game-board');
const status = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');
const playerX = document.getElementById('player-x');
const playerO = document.getElementById('player-o');
const modeBtns = document.querySelectorAll('.mode-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'human'; // 'human' or 'ai'
let gameState = Array(9).fill('');

function drawBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.textContent = gameState[i];
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

drawBoard();
updatePlayers();

function handleCellClick(e) {
  const idx = e.target.dataset.index;
  if (!gameActive || gameState[idx]) return;
  gameState[idx] = currentPlayer;
  drawBoard();
  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  } else if (gameState.every(cell => cell)) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updatePlayers();
  status.textContent = `Player ${currentPlayer}'s turn`;
  if (gameMode === 'ai' && currentPlayer === 'O' && gameActive) {
    setTimeout(aiMove, 500);
  }
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(line => {
    const [a,b,c] = line;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function updatePlayers() {
  playerX.classList.toggle('active', currentPlayer === 'X');
  playerO.classList.toggle('active', currentPlayer === 'O');
}

resetBtn.addEventListener('click', () => {
  gameState = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player X's turn";
  drawBoard();
  updatePlayers();
});

modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    gameMode = btn.id === 'human-vs-ai' ? 'ai' : 'human';
    resetBtn.click();
  });
});

function aiMove() {
  const empty = gameState.map((v,i) => v ? null : i).filter(v => v !== null);
  if (empty.length === 0) return;
  const move = empty[Math.floor(Math.random() * empty.length)];
  gameState[move] = 'O';
  drawBoard();
  if (checkWin()) {
    status.textContent = `Player O wins!`;
    gameActive = false;
    return;
  } else if (gameState.every(cell => cell)) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  currentPlayer = 'X';
  updatePlayers();
  status.textContent = `Player X's turn`;
}

status.textContent = "Player X's turn";
