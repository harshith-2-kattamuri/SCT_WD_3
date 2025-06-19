const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (gameState[cellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    gameActive = false;
    status.textContent = `Player ${currentPlayer} Wins!`;
    return;
  }

  if (checkDraw()) {
    gameActive = false;
    status.textContent = "Game Draw!";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  for (let combination of winningCombinations) {
    if (combination.every(index => gameState[index] === currentPlayer)) {
      // Add winning animation to the winning cells
      combination.forEach(index => {
        cells[index].classList.add('winner');
      });
      status.classList.add('winner');
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return gameState.every(cell => cell !== '');
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = `Player ${currentPlayer}'s Turn`;
  status.classList.remove('winner');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'winner');
  });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);