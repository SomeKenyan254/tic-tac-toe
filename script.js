const Player = (name,symbol) => {
    return {name,symbol};
}
const Display = (() => {
    const renderBoard = (game) => {
        const board = document.querySelector(".display");
        board.innerHTML = ''; // Clear the board before rendering

        game.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            if(cell === "O"){
                cellElement.style.backgroundColor = "red"
            }
            else if(cell == "X"){
                cellElement.style.backgroundColor = "blue"
            }
            cellElement.addEventListener('click', () => {
                GameFlow.makeMove(index);
                
            });
            board.appendChild(cellElement);
        });
    }

        return { renderBoard };
})();
const GameFlow = (() => {
        let game = Array(9).fill("");
        let players = [];
        let currentPlayer;
        let gameOver = false;
        let score = 0;
        resultDiv = document.querySelector(".results")
        resultDiv.innerHTML=""
        const resultMsg = document.createElement("div")
    
        const makeMove = (index) => {
            if (index < 0 || index >= game.length || gameOver) {
                alert("not valid");
               
                return;
            }
            if (game[index] !== "") {
                alert("Spot taken");
                return;
            }
    
            game[index] = currentPlayer.symbol;
            Display.renderBoard(game)
           
            

    
            if (checkWinner()) {
                score ++
                resultMsg.textContent = (`${currentPlayer.name} wins! by ${score} `);
                gameOver = true;
                resultDiv.appendChild(resultMsg)    
                return ;
            }
            else if (!game.includes("")) {
                resultMsg.textContent = ("It's a draw!");
                gameOver = true;
                resultDiv.appendChild(resultMsg)
                return;
            }
            currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
            
        };
    
        const checkWinner = () => {
            const winCombo = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const combo of winCombo) {
                const [a, b, c] = combo;
                if (game[a] && game[a] === game[b] && game[a] === game[c]) {
                    return true;
                }
            }
            return false;
        };
    
        const startGame = (player1Name, player1Symbol, player2Name, player2Symbol) => {
            if (player1Symbol === player2Symbol) {
                alert("Players must choose different symbols!");
                return;
            }
    
            players = [
                Player(player1Name, player1Symbol),
                Player(player2Name, player2Symbol)
            ];
            game = Array(9).fill("");
            currentPlayer = players[0];
            gameOver = false;
            Display.renderBoard(game);
        };
    
        return { makeMove, startGame };
})();
document.querySelector("#playerForm").addEventListener("submit", function(e){
    e.preventDefault();

    const player1Name = document.querySelector("#Player1").value;
    const player1Symbol = document.querySelector("#symbol_1").value;
    const player2Name = document.querySelector("#Player2").value;
    const player2Symbol = document.querySelector("#symbol_2").value;

    GameFlow.startGame(player1Name, player1Symbol, player2Name, player2Symbol);
})
