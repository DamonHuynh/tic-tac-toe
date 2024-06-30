function createPlayer(symbol){
    let wins = 0;
    const getWins = () => wins;
    const addWin = () => wins++;
    const resetWins = () => wins = 0;
    return {symbol, getWins, addWin, resetWins};
}

const gameboard = function(){
    const board = [null, null, null, null, null, null, null, null, null];
    const move = (tileValue, symbol) =>  board[tileValue] = symbol;
    const resetBoard = () => {
        for (let i = 0; i < 9; i++){
            board[i] = null;
        }
    };
    return {board, move, resetBoard};
}();

const checkWin = function (){
    const horizontal = function() {
        let tiles = [];
        //each row increments by 3
        for (let row = 0; row < 9; row+=3){
            let symbolCounter = 0;
            let firstSymbol = gameboard.board[row];
            for (let tile = 0; tile < 3; tile++){
                if (gameboard.board[tile + row] == null){
                    continue;
                }
                if (gameboard.board[tile + row] == firstSymbol){
                    tiles.push(tile + row);
                    symbolCounter++;
                }
            }
            if (symbolCounter == 3){
                return tiles;
            }
        }
        return null;
    };
    const vertical = () => {
        let tiles = [];
        //each column incerements by 1
        for (let column = 0; column < 3; column++){
            let symbolCounter = 0;
            let firstSymbol = gameboard.board[column];
            for (let tile = 0; tile < 9; tile+=3){
                if (gameboard.board[tile + column] == null){
                    continue;
                }
                if (gameboard.board[tile + column] == firstSymbol){
                    tiles.push(tile + column);
                    symbolCounter++;
                }
            }
            if (symbolCounter == 3){
                return tiles;
            }
        }
        return null;
    };
    const majorDiagnol = () => {
        let first = gameboard.board[0];
        let second = gameboard.board[4];
        let third = gameboard.board[8];
        let isWin = first != null && (first == second && first == third);
        let tiles = [0, 4, 8];
        if (isWin){
            return tiles;
        }
        return null;
    };
    const minorDiagnol = () => {
        let first = gameboard.board[2];
        let second = gameboard.board[4];
        let third = gameboard.board[6];
        let isWin = first != null && (first == second && first == third);
        let tiles = [2, 4, 6];
        if (isWin){
            return tiles;
        }
        return null;
    };

    const draw = () => {
        for (let i = 0; i < 9; i++){
            if (gameboard.board[i] == null){
                return false;
            }
        }
        return [0,1,2,3,4,5,6,7,8];
    }
    const checkAll = () => {
        let results = [horizontal(), vertical(), majorDiagnol(), minorDiagnol()];
        for (let  i = 0; i < 4; i++){
            if (results[i] != null){
                return results[i];
            }
        }
        return null;
    };
    return {checkAll, draw};
}();



const gameController = function() {
    const tiles = document.querySelectorAll(".tile");
    let allTiles = [];
    tiles.forEach((tile) => {
        allTiles.push(tile);
     });
    const player1 = createPlayer("X");
    const player2 = createPlayer("O");
    const player1card = document.querySelector(".player1");
    const player2card = document.querySelector(".player2");
    const player1Score = document.querySelector(".player1score");
    const player2Score = document.querySelector(".player2score");
    const dialog = document.querySelector("dialog");
    const restart = document.querySelector(".restart");
    const dialogText = document.querySelector("p");

    let moveCount = 0;

    const gameOver = () =>{
        let results = checkWin.checkAll();
        let winner = "";
        if (results){
            if (moveCount % 2 == 0){
                player2.addWin();
                winner = "O";
            }
            else{
                player1.addWin();
                winner = "X";
            }
            highlightBoard(results);
            dialog.showModal();
            dialog.classList.toggle("dialog");
            restartGame(winner);
        }
        else if (checkWin.draw()){ 
            winner = "Draw";
            highlightBoard(checkWin.draw());
            dialog.showModal();
            dialog.classList.toggle("dialog");
            restartGame(winner);
        }
        if (player1.getWins() == 3 || player2.getWins() == 3){
            player1.resetWins();
            player2.resetWins();
            dialogText.textContent = `${winner} Wins!!`
        }  
    }

    const updateScore = () => {
        player1Score.textContent = `${player1.getWins()}`;
        player2Score.textContent = `${player2.getWins()}`;
    }

    const highlightBoard = (tileNums) => {
        for (let i = 0; i < tileNums.length; i++){
            allTiles[tileNums[i]].classList.toggle("won");
        }
    }


    const restartGame = (winner) => {
        if (winner == "Draw"){
            dialogText.textContent = `DRAW`;
        }
        else{
            dialogText.textContent = `WINNER:  ${winner}`
        }
        restart.addEventListener("click", () => {
            dialog.close();
            dialog.classList.remove("dialog");
            gameboard.resetBoard();
            tiles.forEach((tile) => {
                tile.textContent = "";
            });
            for (let i = 0; i < 9; i++){
                allTiles[i].classList.remove("won");               
            }
            updateScore();
        });
    }


    const playerMoves = () =>{
        player1card.classList.add("turn");
        tiles.forEach((tile) => {
            tile.addEventListener("mousedown", () => { 
                if (gameboard.board[tile.id] == null){
                    if (moveCount % 2 == 0){
                        tile.textContent = "X";
                        gameboard.move(tile.id, "X");
                        player1card.classList.remove("turn");
                        player2card.classList.toggle("turn");
                    }
                    else{
                        tile.textContent = "O";
                        gameboard.move(tile.id, "O");
                        player2card.classList.remove("turn");
                        player1card.classList.toggle("turn");

                    }
                    console.log(gameboard.board);
                    console.log(moveCount);
                    moveCount++;
                    gameOver();
                }
            });
        });
    }

    return {playerMoves};
}();

gameController.playerMoves();



