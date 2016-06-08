//green: 0, red: 1, blue: 2, yellow: 3
var colorButton = [];
var sequence = [
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0];
//total sequence values generated
var position = 0;
//gamestate values
var on = false;
var strict = false;
var playing = false;
var playerTurn = false;
//computer place in sequence
var computerPosition;
//players place in sequence
var playerPosition;
var btnOn;
var display;
var light;
var btnColor = [
  "green", "red", "blue", "yellow"
];
var btnFlashColor = [
  "gray", "gray", "gray", "gray"
];
//were button flash timeouts are saved
var btnTimeout = {
  0:undefined,
  1:undefined,
  2:undefined,
  3:undefined
};
var sequenceTimeout;
var errorTimeout;
var computerPlayTimeout;
var winTimeout;
var btnSound = [
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
];

window.onload = function() {
  //initialize node variables
  colorButton.push(document.getElementById("btn-green"));
  colorButton.push(document.getElementById("btn-red"));
  colorButton.push(document.getElementById("btn-blue"));
  colorButton.push(document.getElementById("btn-yellow"));
  btnOn = document.getElementById("btn-on");
  display = document.getElementById("throne-display");
  light = document.getElementById("light");

  //add button event listeners
  colorButton[0].addEventListener("click", btnGreen, false);
  colorButton[1].addEventListener("click", btnRed, false);
  colorButton[2].addEventListener("click", btnBlue, false);
  colorButton[3].addEventListener("click", btnYellow, false);
  btnOn.addEventListener("click", btnPower, false);
  document.getElementById("btn-start").addEventListener("click", btnStart, false);
  document.getElementById("btn-strict").addEventListener("click", btnStrict, false);
}
//add arguments to the event functions to make usefull
function btnGreen(){
  btnPress(0);
}
function btnRed(){
  btnPress(1);
}
function btnBlue(){
  btnPress(2);
}
function btnYellow(){
  btnPress(3);
}
//function that gets called when any of the big four buttons is pressed
function btnPress(btn) {
  if (on) { btnFlash(btn); }
  if (playerTurn) {
    if (sequence[playerPosition] === btn) {
      playerPosition++;
      if (playerPosition > 19) {
        win();
      }
      else if (playerPosition > position){
        playerTurn = false;
        increaseSequence();
        computerPosition = 0;
        computerPlayTimeout = window.setTimeout(playSequence, 1200);
      }
    }
    else {
      playerError();
    }
  }
  else if (playing) {
    playerError();
  }
}
//called when power is toggled
function btnPower(){
  on = !on;
  if (on){
    btnOn.firstChild.style.backgroundColor = "inherit";
    btnOn.lastChild.style.backgroundColor = "black";
    display.textContent = "-";
  }
  else {
    endEvents();
    btnOn.firstChild.style.backgroundColor = "black";
    btnOn.lastChild.style.backgroundColor = "inherit";
    display.textContent = "";
    //clear game state
    strict = false;
    light.style.backgroundColor = "black";
    playing = false;
    playerTurn = false;
  }
}
//flashes specified button and plays it's sound
function btnFlash(btn) {
  //clears any previous flash timeouts so current flash ends at correct time
  window.clearTimeout(btnTimeout[btn]);
  //runs after specified time to clear flash
  function clear(){
    colorButton[btn].style.backgroundColor = btnColor[btn];
  }
  //sets the button to the flash color
  colorButton[btn].style.backgroundColor = btnFlashColor[btn];
  //if the buttons sound is not playing then play it, otherwise reset the current player time
  if (btnSound[btn].paused){
    btnSound[btn].play();
  }
  else {
    btnSound[btn].currentTime = 0;
  }
  //set a timeout to revert to the default color
  btnTimeout[btn] = window.setTimeout(clear, 400);
}
function btnStart() {
  if (on) {
    endEvents();
    position = -1;
    playing = true;
    increaseSequence();
    computerPosition = 0;
    playSequence();
  }
}
function btnStrict() {
  if (on) {
    strict = !strict;
    if (strict) {
      light.style.backgroundColor = "red";
    }
    else {
      light.style.backgroundColor = "black";
    }
  }
}
function increaseSequence(){
  position += 1;
  sequence[position] = Math.floor(Math.random() * 4);
  display.textContent = position + 1;
}
//plays sequence from computerPosition to postion
//allways zero computerPosition before calling
//probibly better in an object so it zero's computerPosition for us?
function playSequence(){
  btnFlash(sequence[computerPosition]);
  computerPosition++;
  if (computerPosition <= position) {
    sequenceTimeout = window.setTimeout(playSequence, 500);
  }
  else {
    //if the computer has ended it's turn initilize player turn
    playerPosition = 0;
    playerTurn = true;
  }
}
//clears all timeouts, stops sounds and resets button colors
function endEvents(){
  window.clearTimeout(sequenceTimeout);
  window.clearTimeout(errorTimeout);
  window.clearTimeout(computerPlayTimeout);
  window.clearTimeout(winTimeout);
  for (var i; i < 4; i++){
    if (!btnSound[i].paused){
      btnSound.pause();
      btnSound.currentTime = 0;
    }
    window.clearTimeout(btnTimeout(i));
    colorBtn[i].style.backgroundColor = btnColor[i];
  }
}
function playerError() {
  function endError() {
    display.textContent = position + 1;
    computerPosition = 0;
    playSequence();
  }
  playerturn = false;
  //if strict is enabled randomize sequence
  if (strict) {
    for (var p = 0; p <= position; p++) {
      sequence[p] = Math.floor(Math.random() * 4);
    }
  }
  display.textContent = "!!";
  errorTimeout = window.setTimeout(endError, 2000);
}
function win() {
  function endWin() {
    btnStart();
  }
  display.textContent = "W";
  winTimeout = window.setTimeout(endWin, 4000);
}
