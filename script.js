function createGame(){
    const game = Array(9).fill("")

    const createPlayers = () =>{
        return {player1:"O" , player2:"X"}
    };
     const players = createPlayers();
    let currentPlayer = players.player1
        
    const makeMove = (index) => {
        
        if(index < 0 || index >= game.length){
            console.log("Invalid move.")
            return
        }
        if (game[index] !== ""){
            console.log("Spot taken")
            return
        }
        
        game[index] = currentPlayer;
       
        checkWinner();
    
        console.log(game)
         if(checkWinner()){
            console.log(`${currentPlayer} wins!`)
            return;
         }
         if(!game.includes("")){
            console.log("It's a draw!");
            return;
         }
         currentPlayer = currentPlayer === players.player1 ? players.player2 : players.player1
         
        }
         const checkWinner = () =>{
            const winCombo = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], 
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]  
               ]
               for (const combo of winCombo){
                const [a,b,c] = combo;
                if(game[a] && game[a] === game[b] && game[a] === game[c]){
                    return true
                }
                return false;
               
               }
             
            }
               
         
    return {makeMove}
    
 
}
    
 const josh = createGame()
