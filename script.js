const Player = (name,Symbol) => {
    return {name,Symbol};
}
const Display = (() => {
    const renderBoard = (game) => {
        const board = document.querySelector(".display");
        board.innerHTML = ''; // Clear the board before rendering

        game.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => {
                GameFlow.makeMove(index);
                cellElement.textContent = game[index];
            });
            board.appendChild(cellElement);
        });
    }

        return { renderBoard };
    })();
    const GameFlow = (() => {
        let game = Array(9).fill("");
        let players = [Player("Player 1", "O"), Player("Player 2", "X")];
        let currentPlayer = players[0];
        gameOver = false;
    
        const makeMove = (index) => {
            if (index < 0 || index >= game.length) {
                console.log("Invalid move.");
               
                return;
            }
            if (game[index] !== "") {
                console.log("Spot taken");
                return;
            }
    
            game[index] = currentPlayer.Symbol;
    
            if (checkWinner()) {
                console.log(`${currentPlayer.name} wins!`);
                gameOver = true;
                return;
            }
            if (!game.includes("")) {
                console.log("It's a draw!");
                gameOver = true;
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
    
        const startGame = () => {
            game = Array(9).fill("");
            currentPlayer = players[0];
            gameOver = false;
            Display.renderBoard(game);
        };
    
        return { makeMove, startGame };
    })();
    
GameFlow.startGame();