const GameBoard = document.querySelector("gameboard");

function gameBoard() {
    const rows = 3;
    const col = 3;
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < col; j++) {
            board[i].push(cell());
        }
    }

}

const Game = (() => { //IIFE function
    let players = []
    let currentPlayerIndex = 0;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        gameOver = false;
    }
})();

function cell() { //either a 0 for empty, 1 for player one and 2 for player 2
    let value = 0;
    return 0;
}

const createPlayer = (name, mark) => { //Player factory
    return {name, mark}
}

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
})