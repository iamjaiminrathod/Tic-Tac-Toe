let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let scoreX = 0;
let scoreO = 0;

const boardContainer = document.getElementById('board');
const statusText = document.getElementById('status');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');

function startGame() {
  const p1 = document.getElementById('player1').value || "Player X";
  const p2 = document.getElementById('player2').value || "Player O";
  statusText.textContent = `${p1}'s turn (X)`;
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  renderBoard();
}

function renderBoard() {
  boardContainer.innerHTML = '';
  board.forEach((val, idx) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = idx;
    cell.textContent = val;
    cell.addEventListener('click', handleCellClick);
    boardContainer.appendChild(cell);
  });
}

function handleCellClick(e) {
  const idx = e.target.dataset.index;
  if (!gameActive || board[idx]) return;

  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    endGame(`${currentPlayer} Wins!`);
    highlightWinnerCells();
    updateScore();
    return;
  }

  if (board.every(cell => cell)) {
    endGame('Draw!');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(combo => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      document.querySelectorAll('.cell')[a].classList.add('winner');
      document.querySelectorAll('.cell')[b].classList.add('winner');
      document.querySelectorAll('.cell')[c].classList.add('winner');
      return true;
    }
    return false;
  });
}

function endGame(msg) {
  statusText.textContent = msg;
  gameActive = false;
}

function updateScore() {
  if (currentPlayer === 'X') scoreX++;
  else scoreO++;
  scoreXEl.textContent = `X: ${scoreX}`;
  scoreOEl.textContent = `O: ${scoreO}`;
}

function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  statusText.textContent = `Game reset. ${currentPlayer}'s turn`;
  gameActive = true;
  renderBoard();
}

function resetGame() {
  resetBoard();
  scoreX = 0;
  scoreO = 0;
  scoreXEl.textContent = `X: 0`;
  scoreOEl.textContent = `O: 0`;
  statusText.textContent = "Enter names and press Start";
}
function toggleTheme() {
  document.body.classList.toggle('dark');
}