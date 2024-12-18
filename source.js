/*

user function: 
    name
    score

game function:
    add users
    initialize game board
    operate game board
    get winner

game board function:
    initialize board array
    get users
    gameloop:
        whos turn is it
        input in a location
            collision check
        win condition check
    return winner
    
    

*/

let newGameDialog = document.querySelector("#newGameDialog");
let newGameCancel = document.querySelector("#newGameCancel");
let newGameAction = document.querySelector("#newGameAction");
let game = "";

let newGameButton = document.querySelector("#newGame");
let newRoundButton = document.querySelector("#newRound");
let endGameButton = document.querySelector("#endGame");
let xocells = document.querySelectorAll(".ttt-cell");

function createPlayer(name) {
  let score = 0;
  const getName = () => name;
  const getScore = () => score;
  const increaseScore = () => ++score;
  const resetScore = () => (score = 0);
  return { getName, getScore, increaseScore, resetScore };
}




function gameController(player1, player2) {
  let playerx = player1;
  let playero = player2;
  let tttBoard = gameBoard();
  return { playerx, playero, tttBoard };
}

function displayBoardHTML(tttBoard) {
  const tttBoardState = tttBoard.gameStatus().boardState;
  for (cell of xocells) {
    cellid = cell.getAttribute("id");
    if (tttBoardState[parseInt(cellid[9])] == "") {
      cell.innerHTML = ``;
    }
    if (tttBoardState[parseInt(cellid[9])] == "X") {
      cell.innerHTML = `<img src="images/alpha-x.png">`;
    }
    if (tttBoardState[parseInt(cellid[9])] == "O") {
      cell.innerHTML = `<img src="images/alpha-o.png">`;
    }
  }
}

function clearFlags() {
  const flagO = document.querySelector("#turnFlagO");
  const flagX = document.querySelector("#turnFlagX");
  flagO.style.display = "none";
  flagX.style.display = "none";
}

function changeFlag(currentPlayer) {
  const flagO = document.querySelector("#turnFlagO");
  const flagX = document.querySelector("#turnFlagX");
  if (currentPlayer == "X") {
    flagX.style.display = "block";
    flagO.style.display = "none";
  } else if (currentPlayer == "O") {
    flagX.style.display = "none";
    flagO.style.display = "block";
  }
}

function displayPlayerNames(playerX, playerO) {
  const playerXname = document.querySelector("#playerXDisplay");
  const playerOname = document.querySelector("#playerODisplay");
  playerXname.innerHTML = playerX;
  playerOname.innerHTML = playerO;
}

function clearPlayerNames() {
  const playerXname = document.querySelector("#playerXDisplay");
  const playerOname = document.querySelector("#playerODisplay");
  playerXname.innerHTML = "";
  playerOname.innerHTML = "";
}

function updateScore() {
  const scoreX = document.querySelector("#scoreX");
  const scoreO = document.querySelector("#scoreO");
  scoreX.innerHTML = game.playerx.getScore();
  scoreO.innerHTML = game.playero.getScore();
}

function gameActive() {
  newGameButton.style.display = "none";
  newRoundButton.style.display = "block";
  endGameButton.style.display = "block";
}
function gameInactive() {
  newGameButton.style.display = "block";
  newRoundButton.style.display = "none";
  endGameButton.style.display = "none";
}

newGameButton.addEventListener("click", () => {
  document.getElementById("playerXName").value = "";
  document.getElementById("playerOName").value = "";
  newGameDialog.showModal();
});

newRoundButton.addEventListener("click", () => {
  const gameStatus = game.tttBoard.resetGame();
  changeFlag(gameStatus.currentPlayer);
  updateScore();
  displayBoardHTML(game.tttBoard);
});

endGameButton.addEventListener("click", () => {
  const gameStatus = game.tttBoard.endGame();
  clearFlags();
  updateScore();
  displayBoardHTML(game.tttBoard);
  gameInactive();
});

function handleUserInput(returnValue) {
  if (returnValue == "newGame") {
    const player1name = document.querySelector("#playerXName").value;
    const player2name = document.querySelector("#playerOName").value;

    game = gameController(createPlayer(player1name), createPlayer(player2name));
    game.playerx.resetScore();
    game.playero.resetScore();
    const gameStatus = game.tttBoard.resetGame();
    changeFlag(gameStatus.currentPlayer);
    updateScore();
    displayPlayerNames(player1name, player2name);
    displayBoardHTML(game.tttBoard);
    gameActive();
  }
}

newGameDialog.addEventListener("close", () => {
  //   openCheck(addBookDialog);
  handleUserInput(newGameDialog.returnValue);
});

newGameAction.addEventListener("click", (e) => {
  e.preventDefault();
  newGameDialog.close("newGame");
});

newGameCancel.addEventListener("click", () => {
  newGameDialog.close();
  gameInactive();
});

for (const cell of xocells) {
  cell.addEventListener("click", () => {
    const cellid = cell.getAttribute("id");
    const gameStatus = game.tttBoard.gameStatus();
    const currentPlayer = gameStatus.currentPlayer;
    if (gameStatus.gameActive) {
      turnResult = game.tttBoard.playTurn(parseInt(cellid[9]));
      if (turnResult.callSuccess) {
        if (currentPlayer == "X") {
          cell.innerHTML = `<img src="images/alpha-x.png">`;
        } else if (currentPlayer == "O") {
          cell.innerHTML = `<img src="images/alpha-o.png">`;
        }
        changeFlag(turnResult.currentPlayer);
        if (turnResult.winState.win) {
          if (turnResult.winState.winner == "X") {
            game.playerx.increaseScore();
          }
          if (turnResult.winState.winner == "O") {
            game.playero.increaseScore();
          }
          updateScore();
          clearFlags();
          if (turnResult.winState.winner == "") {
            alert(`game is a tie`);
          } else {
            alert(`winner is ${turnResult.winState.winner}`);
          }
        }
      }
    }
  });
}

function displayBoard(board) {
  let b = board.slice(0);
  for (i in b) {
    if (b[i] == "") {
      b[i] = " ";
    }
  }
  console.log(`
        ${b[0]}|${b[1]}|${b[2]}
        ${b[3]}|${b[4]}|${b[5]}
        ${b[6]}|${b[7]}|${b[8]}
        `);
}

gameInactive();
clearFlags();
