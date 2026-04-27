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
    const playerOne = createPlayer("Player 1");
    const playerTwo = createPlayer("Player 2");


}

function cell() { //either a 0 for empty, 1 for player one and 2 for player 2
    let value = 0;
    return 0;
}

function createPlayer(name) {
    const userName = name;
    return {userName};
}
