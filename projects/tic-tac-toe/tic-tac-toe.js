var playerMark;
var computerMark;
var boardState = [
  "blank", "blank", "blank",
  "blank", "blank", "blank",
  "blank", "blank", "blank"
];
var winCombs = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
var twoOf = [
  [0,1,2],
  [1,2,0],
  [0,2,1]
];
var moveOrder = [4,1,3,5,7,0,2,6,8];
var overLay;
var tile;
var moves = 0;
var message;

window.onload = function() {
  overLay = document.getElementById("overlay");
  tile = document.getElementsByClassName("tile");
  message = document.getElementById("overlay-message");
  document.getElementsByClassName("selection")[0].onclick = chooseX;
  document.getElementsByClassName("selection")[1].onclick = chooseO;
}

function chooseX(arg, arg2){
  playerMark = "X";
  computerMark = "O";
  gameStart();
}
function chooseO(){
  playerMark = "O";
  computerMark = "X";
  gameStart();
}
function gameStart() {
  overLay.style.visibility = "hidden";
  resetBoard();
}
//resets the game board, called whenever a game starts
function resetBoard() {
  for (var i = 0; i < 9; i++) {
    tile[i].innerHTML = "&nbsp;";
    tile[i].style.cursor = "pointer";
    boardState[i] = "blank";
  }
  moves = 0;
}
//to be run when the game is over and supplied with the winner
function gameOver(winner) {
  if (winner === playerMark){
    message.innerHTML = "You win!<br>play again?";
  }
  else if (winner === computerMark) {
    message.innerHTML = "You Loose!<br>play again?";
  }
  else {
    message.innerHTML = "Tie Game<br>play again?";
  }
  overLay.style.visibility = "visible";
}
//the player makes a move on the tile of the argument when this is called
function playerMove(location){
  if (boardState[location] === 'blank') {
    move(location, playerMark);
    computerMove();
  }
}
function move(location, mark) {
  if (boardState[location] === "blank") {
    boardState[location] = mark;
    tile[location].innerHTML = mark;
    tile[location].style.cursor = "default";
    moves++;
    winCheck();
  }
  else {
    console.log("INVALID MOVE BY PLAYER " + mark + " at " + location);
  }
}
//the computer makes a move when this is called
function computerMove() {
  var computerWin = undefined;
  var playerWin = undefined;
  function winScenario(mark){
    var winTile = undefined;
    for (var p = 0; p < 8; p++){
      for (var i = 0; i < 3; i++){
        if (boardState[winCombs[p][twoOf[i][0]]] === mark && boardState[winCombs[p][twoOf[i][1]]] === mark  && boardState[winCombs[p][twoOf[i][2]]] == "blank")
        return winCombs[p][twoOf[i][2]];
      }
    }
    return null;
  }
  if (moves === 0 || moves === 1) {
    if (boardState[1] === "blank"){
      move(1, computerMark);
      return;
    }
    else {
      move(3, computerMark);
      return;
    }
  }
  computerWin = winScenario(computerMark);
  playerWin = winScenario(playerMark);
  if (computerWin){
    move(computerWin, computerMark);
    return;
  }
  else if (playerWin){
    move(playerWin, computerMark);
    return;
  }
  for (var j = 0; j < 9; j++){
    if (boardState[moveOrder[j]] === "blank"){
      move(moveOrder[j], computerMark);
      return;
    }
  }
}
//indicates the winning peices
function winIndicate(loc1, loc2, loc3){
  console.log("winning locations: " + loc1 + " " + loc2 + " " + loc3);
  gameOver(boardState[loc1]);
}
//checks for game winning conditions
function winCheck(){
  //returns true if the given mark has a win condition
  function win(mark){
   for (var p = 0; p<8; p++){
     if (boardState[winCombs[p][0]] === mark && boardState[winCombs[p][1]] === mark && boardState[winCombs[p][2]] === mark){
       locations = winCombs[p];
       console.log("winning locations: " + winCombs[p]);
       console.log("mark: ", mark);
       return true;
     }
   }
   return false;
  }
  var locations;
  //in either the player of the computer won pass the winning locations to winIndicate
  if (win(playerMark) || win(computerMark)){
    winIndicate(locations[0], locations[1], locations[2]);
  }
  else if (moves === 9){
    gameOver("tie");
  }
}
