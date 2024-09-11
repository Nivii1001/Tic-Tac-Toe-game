const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (boardState[index] !== '' || !gameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Congratulations!!!  ${currentPlayer} wins`;
        statusText.style.color = 'green'; 
        gameActive = false;
    } else if (boardState.every(cell => cell !== '')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => boardState[index] === currentPlayer);
    });
}

function restartGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    board.forEach(cell => (cell.textContent = ''));
    statusText.textContent = `${currentPlayer}'s turn`;
}

board.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusText.textContent = `${currentPlayer}'s turn`;