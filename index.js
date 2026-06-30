const GameBoard = document.querySelector("gameboard");
const message = document.querySelector("message");
const winCombinations = [
  // Horizontal Wins
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical Wins
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal Wins
  [0, 4, 8],
  [2, 4, 6]
];

function gameBoard() {
    const rows = 3;
    const col = 3;
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < col; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;
    const setBoardValue = (i, j, marker) => {
        board[i][j].setValue(marker);
    }

    const displayBoardConsole = () => { //displays the game board to console
        const display = board.map((row) => row.map((Cell) => Cell.getValue())); //Array of Cell values
        console.log(display);
    }

    const isBoardFull = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < col; j++) {
                if (board[i][j].getValue() === 0)
                    return false;
            }
        }
        return true;
    }

    return {getBoard, setBoardValue, displayBoardConsole, isBoardFull};
}

screenController = () => {
    const boardElem = document.querySelector("#gameboard");
    const message = document.querySelector("#message");

    const updateScreen = (gameController) => {
        let player = gameController.players[gameController.getCurrentPlayerIndex()];
        let playerIndex = gameController.getCurrentPlayerIndex();
        boardElem.textContent = "";
        message.textContent = `It is ${player.getName()}'s turn. `;

        gameController.board.getBoard().forEach((row, rowIndex) => {
            row.forEach((Cell, colIndex) => { 
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.rowIndex = rowIndex;
                cellButton.dataset.colIndex = colIndex;
                cellButton.textContent = Cell.getValue();

                cellButton.addEventListener("click", (e) => { 
                    gameController.boxClick(e, player);
                    const win = gameController.checkWin(e, player);
                    if (win == 1) {
                        console.log("Player: " + player.getName() + " won!!!");
                    }
                    else if (win == 2) 
                        console.log("Draw.");
                    updateScreen(gameController, playerIndex, player);
                });

                boardElem.appendChild(cellButton);
            });
        });
    }

    return {updateScreen};
}

gameController = () => {
    const board = gameBoard();

    const players = [
        createPlayer(document.querySelector("#player1").value, "X"),
        createPlayer(document.querySelector("#player2").value, "O")
    ];

    let currentPlayerIndex = 0;

    const boxClick = (e, player) => { // Sets the text of the board button to the player's mark.
        board.setBoardValue(e.target.dataset.rowIndex, e.target.dataset.colIndex, player.mark);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const checkWin = (e, player) => { //1 = win, 2 = draw
        const cells = board.getBoard().flat();
        let winValue = winCombinations.some(combination => {
            return combination.every(index => cells[index].getValue() === player.mark); 
        }); //This function works by checking if any of the subarrays are true and the subarray is true when every element of the subarray is the player mark
        if (winValue)
            return winValue;
        else if (!winValue && board.isBoardFull())
            return 2;
    };

      const getCurrentPlayerIndex = () => currentPlayerIndex;

    return {board, players, getCurrentPlayerIndex, boxClick, checkWin};
}
const Game = (() => { //IIFE function
    let gameOver;

    const start = () => {
        screenController = screenController();
        gameController = gameController();
        gameController.board.displayBoardConsole();
        screenController.updateScreen(gameController);

        gameOver = false;

        
    }
    return {start};
})();

function Cell() { // return cell object 0 for empty, X for player one, O for player 2
    let value = 0;
    const setValue = (marker) => {
        value = marker;
    }

    const getValue = () => { return value};
    return {setValue, getValue};
}

const createPlayer = (name, mark) => { //Player factory
    const getName = () => name;
    return {name, mark, getName}
}

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
});

//Next:
//Need to display win/loss to screen
//Stop gameboard from being overwritten after a win
//Better design