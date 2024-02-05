document.addEventListener("DOMContentLoaded", function () {
    // Hide Game Screen
    document.getElementById("game-screen").style.display = "none";

    let playerXScore = 0;
    let playerOScore = 0;
    // Score Board
    document.getElementById("player-x-score").innerHTML = "X: " + playerXScore;
    document.getElementById("player-o-score").innerHTML = "O: " + playerOScore;

    // "Next Round" button
    const nextRoundButton = document.getElementById("next-round");

    // "Play Again" button
    const playAgainButton = document.getElementById("play-again");

    // "Play Game" button
    document.getElementById("human").addEventListener("click", function () {
        // Hide Home Screen
        document.getElementById("home-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "block";
    });

    document.getElementById("easy").addEventListener("click", function () {
        // Hide Home Screen
        document.getElementById("home-screen").style.display = "none";
        document.getElementById("game-screen2").style.display = "block";
    });
    document.getElementById("medium").addEventListener("click", function () {
        // Hide Home Screen
        document.getElementById("home-screen").style.display = "none";
        document.getElementById("game-screen2").style.display = "block";
    });
    document.getElementById("difficult").addEventListener("click", function () {
        // Hide Home Screen
        document.getElementById("home-screen").style.display = "none";
        document.getElementById("game-screen2").style.display = "block";
    });

    let boxes = document.querySelectorAll(".main-box");
    let turn = "X";
    let isGameOver = false;
    let boardClickable = true;


    boxes.forEach(e => {
        e.innerHTML = '';
        e.addEventListener("click", () => {
            if (!isGameOver && boardClickable && e.innerHTML === "") {
                e.innerHTML = turn;
                if (Win()) {
                    // Increment the score of the winner
                    if (turn === "X") {
                        playerXScore++;
                    } else {
                        playerOScore++;
                    }

                    // Update scores on the score board
                    document.getElementById("player-x-score").innerHTML = "X: " + playerXScore;
                    document.getElementById("player-o-score").innerHTML = "O: " + playerOScore;

                    if (playerXScore < 5 && playerOScore < 5) {
                        nextRoundButton.style.display = "inline";
                    }

                    // Check if a player reached 5 points
                    if (playerXScore === 5 || playerOScore === 5) {
                        isGameOver = true;
                        const message = "Player " + turn + " wins the game!";
                        document.querySelector("#results").innerHTML = "Press for another match";
                        openPopup(message);
                        playAgainButton.innerHTML = "Play Again";
                        playAgainButton.style.display = "inline";
                        nextRoundButton.style.display = "none";
                    }

                    boardClickable = false;
                } else {
                    Draw();
                    changeTurn();
                }
            }
        });
    });



    function changeTurn() {
        if (turn === "X") {
            turn = "O";
            document.querySelector(".bg").style.left = "85px";
        } else {
            turn = "X";
            document.querySelector(".bg").style.left = "0";
        }
    }

function Win(){
  // Normal Win conditions
    let horizontalConditions = [

        // ROW WINS - HORIZONTAL
        [0, 1, 2, 3, 4, 5],[6, 7, 8, 9, 10, 11],[12, 13, 14, 15, 16, 17],[18, 19, 20, 21, 22, 23],[24, 25, 26, 27, 28, 29],

    ]
    let verticalConditions =[
        //VERTICAL WINS 
        [0, 6, 12, 18, 24 ],[1, 7, 13, 19, 25],[2, 8, 14, 20, 26],[3, 9, 15, 21, 27],[4, 10, 16, 22, 28],[5, 11, 17, 23, 29]
    ]
    // diagonal win conditions
    let threeConditions = [
      [2,7,12],[17,22,27],[3,10,17],[12,19,26]
    ]
    let fourConditions = [
      [3,8,13,18],[2,9,16,23], [11,16,21,26],[6,13,20,27]
    ]
    let fiveConditions=[
      [4,9,14,19,24],[5,10,15,20,25],[0,7,14,21,28],[1,8,15,22,29]
    ]

    let weirdConditions = [
        [6,1], [4,11],[18,25],[23,28]
    ];

    
    for (let i = 0; i < horizontalConditions.length; i++) {
        let v0 = boxes[horizontalConditions[i][0]].innerHTML;
        let v1 = boxes[horizontalConditions[i][1]].innerHTML;
        let v2 = boxes[horizontalConditions[i][2]].innerHTML;
        let v3 = boxes[horizontalConditions[i][3]].innerHTML;
        let v4 = boxes[horizontalConditions[i][4]].innerHTML;
        let v5 = boxes[horizontalConditions[i][5]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2 && v0 === v3 && v0 === v4 && v0 === v5) {
            // Highlight the winning cells
            for (let j = 0; j < 6; j++) {
                boxes[horizontalConditions[i][j]].style.backgroundColor = "#FF2E63";
                boxes[horizontalConditions[i][j]].style.color = "#000";
            }
            return true; 
        }
    }
    for (let i = 0; i < verticalConditions.length; i++) {
        let v0 = boxes[verticalConditions[i][0]].innerHTML;
        let v1 = boxes[verticalConditions[i][1]].innerHTML;
        let v2 = boxes[verticalConditions[i][2]].innerHTML;
        let v3 = boxes[verticalConditions[i][3]].innerHTML;
        let v4 = boxes[verticalConditions[i][4]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2 && v0 === v3 && v0 === v4) {
            // Highlight the winning cells
            for (let j = 0; j < 5; j++) {
                boxes[verticalConditions[i][j]].style.backgroundColor = "#FF2E63";
                boxes[verticalConditions[i][j]].style.color = "#000";
            }
            return true; 
        }
    }
    for (let i = 0; i < fiveConditions.length; i++) {
        let v0 = boxes[fiveConditions[i][0]].innerHTML;
        let v1 = boxes[fiveConditions[i][1]].innerHTML;
        let v2 = boxes[fiveConditions[i][2]].innerHTML;
        let v3 = boxes[fiveConditions[i][3]].innerHTML;
        let v4 = boxes[fiveConditions[i][4]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2 && v0 === v3 && v0 === v4) {
            // Highlight the winning cells
            for (let j = 0; j < 5; j++) {
                boxes[fiveConditions[i][j]].style.backgroundColor = "#FF2E63";
                boxes[fiveConditions[i][j]].style.color = "#000";
            }
            return true; 
        }
    }
    for (let i = 0; i < threeConditions.length; i++) {
        let v0 = boxes[threeConditions[i][0]].innerHTML;
        let v1 = boxes[threeConditions[i][1]].innerHTML;
        let v2 = boxes[threeConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            // Highlight the winning cells
            for (let j = 0; j < 3; j++) {
                boxes[threeConditions[i][j]].style.backgroundColor = "#FF2E63";
                boxes[threeConditions[i][j]].style.color = "#000";
            }
            return true; 
        }
    }
    for (let i = 0; i < fourConditions.length; i++) {
        let v0 = boxes[fourConditions[i][0]].innerHTML;
        let v1 = boxes[fourConditions[i][1]].innerHTML;
        let v2 = boxes[fourConditions[i][2]].innerHTML;
        let v3 = boxes[fourConditions[i][3]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2 && v0 === v3) {
            // Highlight the winning cells
            for (let j = 0; j < 4; j++) {
                boxes[fourConditions[i][j]].style.backgroundColor = "#FF2E63";
                boxes[fourConditions[i][j]].style.color = "#000";
            }
            return true; 
        }
    }

    for (let i = 0; i < weirdConditions.length; i++) {
        let z0 = boxes[weirdConditions[i][0]].innerHTML;
        let z1 = boxes[weirdConditions[i][1]].innerHTML;

        if (z0 !== "" && z0 === z1 ) {
            // Highlight the winning cells
            for (let j = 0; j < 2; j++) {
                boxes[weirdConditions[i][j]].style.backgroundColor = "#FF2E63";
                boxes[weirdConditions[i][j]].style.color = "#000";
            }
            return true; 
        }
    }
    return false; 
}

function Draw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            nextRoundButton.style.display = "inline";
        }
    }
}

function resetGame() {
    // Reset turn to X
    turn = "X";
    document.querySelector(".bg").style.left = "0";

    // Reset the board
    resetBoard();
    boardClickable = true;
}


function resetBoard() {
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
}

playAgainButton.addEventListener("click", () => {
    isGameOver = false;
    document.querySelector("#results").innerHTML = "";
    playAgainButton.style.display = "none";

    // Reset scores on the score board
    playerXScore = 0;
    playerOScore = 0;

    document.getElementById("player-x-score").innerHTML = "X: " + playerXScore;
    document.getElementById("player-o-score").innerHTML = "O: " + playerOScore;

    resetGame();
});

nextRoundButton.addEventListener("click", () => {
    // Reset the board for the next round

    resetBoard();
    nextRoundButton.style.display = "none";
    isGameOver = false; 
    document.querySelector("#results").innerHTML = "";

    resetGame();
    boardClickable = true;
});
});

//AI FUNCTIONS WALA

//AI -> gameSign[0], Human -> gameSign[1]

playerXScore = 0;
playerOScore = 0;
var gameSign = ["X", "O"];
var gameAreas = document.querySelectorAll(".area");
var currentPlayer;
var chosenLevel;
var playedMoves = 0;
// creating two dimensional array for game table
var gameTable = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];
// creating two dimensional array for game fields
var gameFields = [];

for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 6; j++) {
    gameFields[i] = [];
  }
}

// get area divs into two dimensional array
var counter = 0;
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 6; j++) {
    gameFields[i][j] = gameAreas[counter++];
  }
}

// gets value of all gameFields into gameTable
function updateGameTable() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 6; j++) {
      gameTable[i][j] = gameFields[i][j].innerHTML;
    }
  }
}

function resetAiTable(){
    gameAreas.forEach((element) =>{
        element.innerHTML = '';
    })
    moveAI();
    document.querySelector("#results").innerHTML ="";
}

function changeTurn() {
    if (currentPlayer == "AI") {
        document.querySelector(".bg1").style.left = "85px";
      } else if (currentPlayer == "Human") {
        document.querySelector(".bg1").style.left = "0";
      }

}


// adding event listener to buttons and depends on player input call function for selected difficulty
document.querySelectorAll(".diff").forEach((element) => {
  element.addEventListener("click", (event) => {
    chosenLevel = event.target.name;
    document.querySelector(".difficulty-bar").style.display = "none";
    //starts game
    startGameAi();
  });
});

function startGameAi() {
  //ads event listeners to all fields
  getEmptyFields().forEach((element) => {
    element.addEventListener("click", placeHumanPlayerSign);
  });
  //choses randomly who will play first move, gives X to first player and calls first player
  var players = ["AI", "Human"];
  currentPlayer = players[0];

  if (currentPlayer == "AI") {
    moveAI();
  } else {
    // rotates signs if human is first
    gameSign = ["X", "O"];
    currentPlayer = "Human";

  }
} 

function aiGameOver(){
    gameAreas.forEach((element) => {
        element.removeEventListener("click", placeHumanPlayerSign);
    });
}
//calls next player depending on who was previous player
function nextPlayer() {
  const nextRoundButton = document.getElementById("next-round");
  
  if (playerXScore === 5) {
      aiGameOver();
      showNewPopup("Player X wins!")
      showPlayAgainButton();;
  }
  
  if (playerOScore === 5) {
      aiGameOver();
      showNewPopup("Player O wins!")
      showPlayAgainButton();;
  }

  changeTurn();
  updateGameTable();
  if (checkWinner() == null) {
    if (currentPlayer === "AI") {
      // adds hover class for all empty fields
      getEmptyFields().forEach((element) => {
        element.classList.add("field");
      });

      currentPlayer = "Human";
    //   document.querySelector(".turn-status").innerHTML = "Its your turn:";
    } else {
      moveAI();
    }
  } else if (checkWinner() == gameSign[0]) {
    nextRoundButton.style.display = "inline";
    playerXScore++;
    document.querySelector("#results").innerHTML ="1 Point for Player X";
    // document.querySelector(".turn-status").innerHTML = "Computer Won";
  } else if (checkWinner() == gameSign[1]) {
    nextRoundButton.style.display = "inline";
    playerOScore++
    document.querySelector("#results").innerHTML ="1 Point for Player O";
    
    // document.querySelector(".turn-status").innerHTML = "You Won";
    currentPlayer = "";
  } else {
    document.querySelector(".turn-status").innerHTML = "Draw!";
  }
  
  
  document.getElementById("player-x-score1").innerHTML = "X: " + playerXScore;
  document.getElementById("player-o-score1").innerHTML = "O: " + playerOScore;
}

function placeHumanPlayerSign(e) {
  if (currentPlayer == "Human" && e.target.innerHTML == "") {
    e.target.innerHTML = gameSign[1];
    playedMoves++;
    changeTurn();
    nextPlayer();
    
  }
}

function moveAI() {
    
  currentPlayer = "AI";

  //removes hover class while computer is playing
  gameAreas.forEach((element) => {
    element.classList.remove("field");
  });

window.setTimeout(()=>{
  switch(chosenLevel) {
    case "Easy":
      // AI is playing only random positions
      easyAI();
      break;

    case "Medium":
      // AI will play 60% hard ans 40% easy
     let rnd = Math.floor(Math.random() * 101);
     
     if(rnd <= 60){
       hardAI();
     }
     else{
       easyAI();
     }
      break;
    case "Hard":
      // AI will be unbeatable using minimax algorithm
      hardAI();
      break;
  }},2000);
}
function easyAI() {
  //choses random empty field
  let emptyFields = getEmptyFields();

  emptyFields[Math.floor(Math.random() * emptyFields.length)].innerHTML =
    gameSign[0];

  nextPlayer(currentPlayer);
}

function hardAI() {
  
  //gets number of human played moves
  
 
  //check if human player played 3 or more moves
  if (playedMoves >= 1) {
    if (checkNextHumanMove()) {
      nextPlayer();
    }else{
      getEmptyFields()[0].innerHTML = gameSign[0];
      nextPlayer();
    }
  } else {
    getEmptyFields()[0].innerHTML = gameSign[0];
    nextPlayer();
  }
}



function checkNextHumanMove() {
  
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 6; j++) {
      
      if (gameTable[i][j] == "") {
        console.log('f');
        gameTable[i][j] = gameSign[0];
       
        if (checkWinner() == gameSign[0]) {
          
          gameFields[i][j].innerHTML = gameSign[0];
          return true;
        }
        gameTable[i][j] = gameSign[1];
        if(checkWinner() == gameSign[1]){
          
          gameFields[i][j].innerHTML = gameSign[0]
          return true;
        }
          gameTable[i][j] = "";
        
      }
    }
  }
  return false;
}

function equals6(n1, n2, n3, n4, n5, n6) {
  return n1 == n2 && n2 == n3 && n3 ==n4 && n4==n5 && n5 == n6 &&  n1 != "";
}
function equals5(n1, n2, n3, n4, n5) {
  return n1 == n2 && n2 == n3 && n3 ==n4 && n4==n5 &&  n1 != "";
}
function equals4(n1, n2, n3, n4) {
  return n1 == n2 && n2 == n3 && n3 ==n4 && n1 != "";
}
function equals3(n1, n2, n3) {
  return n1 == n2 && n2 == n3 && n1 != "";
}

function equals2(n1,n2){
    return n1 == n2 && n2 && n1 != "";
}

function checkWinner() {
  var winner = null;
  //horizontal
  for (let i = 0; i < 5 ; i++) {
    if (
      equals6(
        gameTable[i][0],
        gameTable[i][1],
        gameTable[i][2],
        gameTable[i][3],
        gameTable[i][4],
        gameTable[i][5],

      )
    ) {
      return gameTable[i][0];
    }
    // if (
    //   equals4(
    //     gameTable[i][1],
    //     gameTable[i][2],
    //     gameTable[i][3]
    //   )
    // ) {
    //   return gameTable[i][0];
    // }
    // if (
    //   equals4(
    //     gameTable[i][2],
    //     gameTable[i][3],
    //     gameTable[i][4]
    //   )
    // ) {
    //   return gameTable[i][0];
    // }
    // if (
    //   equals4(
    //     gameTable[i][3],
    //     gameTable[i][4],
    //     gameTable[i][5]
    //   )
    // ) {
    //   return gameTable[i][0];
    // }
    
  }
  //vertical
  for (let i = 0; i < 6; i++) {
    if (
      equals5(
        gameTable[0][i],
        gameTable[1][i],
        gameTable[2][i],
        gameTable[3][i],
        gameTable[4][i]

      )
    ) {
      return gameTable[0][i];
    }
    // if (
    //   equals4(
    //     gameTable[1][i],
    //     gameTable[2][i],
    //     gameTable[3][i]

    //   )
    // ) {
    //   return gameTable[1][i];
    // }
    // if (
    //   equals4(
    //     gameTable[2][i],
    //     gameTable[3][i],
    //     gameTable[4][i]

    //   )
    // ) {
    //   return gameTable[2][i];
    // }
    
  }
  //diagonal right to left
  if (
    equals3(gameTable[0][2], gameTable[1][1], gameTable[2][0])
  ) {
    return gameTable[0][2];
  }
  if (
    equals4(gameTable[0][3], gameTable[1][2], gameTable[2][1], gameTable[3][0])
  ) {
    return gameTable[0][3];
  }
  if (
    equals5(gameTable[0][4], gameTable[1][3], gameTable[2][2], gameTable[3][1], gameTable[4][0])
  ) {
    return gameTable[0][4];
  }
  if (
    equals5(gameTable[0][5], gameTable[1][4],gameTable[2][3],gameTable[3][2],gameTable[4][1])
  ) {
    return gameTable[0][5];
  }
  if (
    equals4(gameTable[1][5], gameTable[2][4],gameTable[3][3],gameTable[4][2])
  ) {
    return gameTable[1][5];
  }
  if (
    equals3(gameTable[2][5], gameTable[3][4],gameTable[4][3])
  ) {
    return gameTable[2][5];
  }
  //diagonal left to right
  if (
    equals3(gameTable[2][0], gameTable[3][1], gameTable[4][2])
  ) {
    return gameTable[2][0];
  }
  if (
    equals4(gameTable[1][0], gameTable[2][1], gameTable[3][2], gameTable[4][3])
  ) {
    return gameTable[1][0];
  }
  if (
    equals5(gameTable[0][0], gameTable[1][1], gameTable[2][2], gameTable[3][3], gameTable[4][4])
  ) {
    return gameTable[0][0];
  }
  if (
    equals5(gameTable[0][1], gameTable[1][2],gameTable[2][3],gameTable[3][4],gameTable[4][5])
  ) {
    return gameTable[0][1];
  }
    //good
  if (
    equals4(gameTable[0][2], gameTable[1][3],gameTable[2][4],gameTable[3][5])
  ) {
    return gameTable[0][2];
  }
  if (
    equals3(gameTable[0][3], gameTable[1][4],gameTable[2][5])
  ) {
    return gameTable[0][3];
  }
  
  // weird conditions 
  if (
    equals2(gameTable[0][1], gameTable[1][0])
  ) {
    return gameTable[0][1];
  }
  if (
    equals2(gameTable[3][0], gameTable[4][1])
  ) {
    return gameTable[3][0];
  }
  if (
    equals2(gameTable[0][4], gameTable[1][5])
  ) {
    return gameTable[0][4];
  }
  if (
    equals2(gameTable[3][5], gameTable[4][4])
  ) {
    return gameTable[3][5];
  }
  
  //checks for squares

  //checks for draw
  if (winner == null && getEmptyFields().length == 0) {
    return "draw";
  } else {
    return winner;
  }
}
// goes through all fields end gets empty ones
function getEmptyFields() {
  var emptyFields = [];
  for (let i = 0; i < 30; i++) {
    if (gameAreas[i].innerHTML == "") {
      emptyFields.push(gameAreas[i]);
    }
  }

  return emptyFields;
}

function openPopup(content) {
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");
  popupContent.innerHTML = content;
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}


function backbtn() {
    // Check which screen is currently displayed and hide it
    var gameScreen = document.getElementById('game-screen');
    var gameScreen2 = document.getElementById('game-screen2');
    var homeScreen = document.getElementById('home-screen');

    if (gameScreen.style.display !== 'none') {
        gameScreen.style.display = 'none';
    
    }

    if (gameScreen2.style.display !== 'none') {
        gameScreen2.style.display = 'none';
    }


    homeScreen.style.display = 'block';
}

function showPopup(message) {
  const popup = document.querySelector('.popup');
  const popupContent = document.querySelector('.popup-content');
  popupContent.innerHTML = message;
  popup.style.display = 'block';
}


function showNewPopup(message) {
  openNewPopup(message);
}

function openNewPopup(content) {
  const newPopup = document.getElementById("new-popup");
  const newPopupContent = document.getElementById("new-popup-content");
  newPopupContent.innerHTML = content;
  newPopup.style.display = "block";
}

function closeNewPopup() {
  const newPopup = document.getElementById("new-popup");
  newPopup.style.display = "none";
}

function showPlayAgainButton() {
  const playAgainButton = document.getElementById("play-again");
  playAgainButton.innerHTML = "Play Again";
  playAgainButton.style.display = "inline";
}
