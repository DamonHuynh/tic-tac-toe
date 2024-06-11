function createPlayer(symbol){
    let wins = 0;
    const getWins = () => wins;
    const addWin = () => wins++;
    return {symbol, getWins, addWin};
}

const gameboard = function(){
    const board = [null, null, null, null, null, null, null, null, null];
    const move = (tileValue, symbol) =>  board[tileValue] = symbol;
    const resetBoard = () => board = [null, null, null, null, null, null, null, null, null];

    return {board, move, resetBoard};
}();

const checkWin = function (){
    const horizontal = function() {
        let wins = 0;
        for (let row = 0; row < 9; row+=3){
            let symbolCounter = 0;
            let firstSymbol = gameboard.board[row];
            for (let tile = 0; tile < 3; tile++){
                if (gameboard.board[tile + row] == null){
                    continue;
                }
                if (gameboard.board[tile + row] == firstSymbol){
                    symbolCounter++;
                }
            }
            if (symbolCounter == 3){
                return true;
            }
            else{
                return false;
            }
        }
    };
    const vertical = () => {

    };
    const majorDiagnol = () => {

    };
    const minorDiagnol = () => {

    };
    return {horizontal, vertical, majorDiagnol, minorDiagnol};

}();


console.log(gameboard.board)
console.log(checkWin.horizontal());




