// Tic Tac Toe Game JavaScript
// This script makes the game interactive and is beginner-friendly!

// Select elements from the HTML
const board = document.getElementById('game-board');
const status = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');
const playerX = document.getElementById('player-x');
const playerO = document.getElementById('player-o');
const modeBtns = document.querySelectorAll('.mode-btn');

// Game variables
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'human'; // 'human' or 'ai'
let gameState = Array(9).fill('');

// Draw the board: creates 9 cells and sets up click events
function drawBoard() {
  board.innerHTML = ''; // Clear the board area
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div'); // Create a cell
    cell.classList.add('cell'); // Add styling class
    cell.dataset.index = i; // Store cell index for game logic
    cell.textContent = gameState[i]; // Show X, O, or empty
    cell.addEventListener('click', handleCellClick); // Make cell clickable
    board.appendChild(cell); // Add cell to the board
  }
}

drawBoard(); // Initial board setup
updatePlayers(); // Highlight current player

// Handle cell click: runs when a cell is clicked
function handleCellClick(e) {
  const idx = e.target.dataset.index; // Get which cell was clicked
  if (!gameActive || gameState[idx]) return; // Ignore if game over or cell filled
  gameState[idx] = currentPlayer; // Mark cell with current player's symbol
  drawBoard(); // Update board display
  if (checkWin()) { // Check for win
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false; // Stop the game
    return;
  } else if (gameState.every(cell => cell)) { // Check for draw
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
  updatePlayers(); // Update highlight
  status.textContent = `Player ${currentPlayer}'s turn`; // Show turn
  // If AI mode and O's turn, make AI move
  if (gameMode === 'ai' && currentPlayer === 'O' && gameActive) {
    setTimeout(aiMove, 500); // Delay for realism
  }
}

// Check for a win: returns true if someone won
function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6] // diags
  ];
  return wins.some(line => {
    const [a,b,c] = line; // Destructure indices
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]; // All same and not empty
  });
}

// Update player highlight: shows whose turn it is
function updatePlayers() {
  playerX.classList.toggle('active', currentPlayer === 'X'); // Highlight X
  playerO.classList.toggle('active', currentPlayer === 'O'); // Highlight O
}

// Reset game
resetBtn.addEventListener('click', () => {
  gameState = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player X's turn";
  drawBoard();
  updatePlayers();
});

// Mode selection
modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    gameMode = btn.id === 'human-vs-ai' ? 'ai' : 'human';
    resetBtn.click();
  });
});

// Simple AI move (random empty cell)
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

// Initial status
status.textContent = "Player X's turn";
