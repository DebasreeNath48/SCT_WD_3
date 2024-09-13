const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const gameStatus = document.getElementById('gameStatus'); 
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cellIndex = Array.from(cells).indexOf(event.target);

    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    updateBoard(cellIndex);
    checkForWinner();
    if (isGameActive) {
        switchPlayer();
    }
};

const updateBoard = (index) => {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.querySelector('h1').textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s Turn`;
};

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        gameStatus.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'} wins!`; 
        return;
    }

    if (!board.includes('')) {
        isGameActive = false;
        gameStatus.textContent = 'It\'s a draw!'; 
        return;
    }
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    document.querySelector('h1').textContent = "Tic-Tac-Toe";
    gameStatus.textContent = ''; 
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
