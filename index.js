const GameBoard = document.querySelector("gameboard");

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

    return {getBoard, setBoardValue, displayBoardConsole};
}

screenController = () => {
    const boardElem = document.querySelector("#gameboard");
    const message = document.querySelector("#message");

    const updateScreen = (gameController) => {
        let player = gameController.players[gameController.currentPlayerIndex];
        let playerIndex = gameController.currentPlayerIndex;
        boardElem.textContent = "";
        message.textContent = `It is ${player.getName()}'s turn. `;

        gameController.board.getBoard().forEach((row, rowIndex) => {
            row.forEach((Cell, colIndex) => { 
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.rowIndex = rowIndex;
                cellButton.dataset.colIndex = colIndex;
                cellButton.textContent = Cell.getValue();

                cellButton.addEventListener("click", (e) => { //need to change player index and check winning conditions
                    gameController.boxClick(e, player);
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

    currentPlayerIndex = 0;

    const boxClick = (e, player) => { // Sets the text of the board button to the player's mark.
        board.setBoardValue(e.target.dataset.rowIndex, e.target.dataset.colIndex, player.mark);
    };


    return {board, players, currentPlayerIndex, boxClick};
}
const Game = (() => { //IIFE function
    let gameOver;

    const start = () => {
        screenController = screenController();
        gameController = gameController();
        gameController.board.displayBoardConsole();
        screenController.updateScreen(gameController);
        //Need function to update screen when board button is clicked and playRound() function

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