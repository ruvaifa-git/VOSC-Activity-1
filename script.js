const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.innerText = currentPlayer;
  checkWinner();
}

function checkWinner() {
  let roundWon = false;
  
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.innerText = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusText.innerText = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.innerText = `Player ${currentPlayer}'s turn`;
}

resetButton.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusText.innerText = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.innerText = '');
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));