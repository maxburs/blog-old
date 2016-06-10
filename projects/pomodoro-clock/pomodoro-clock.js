var time = 1500; //in seconds
var pause = true; //break or session state
//determines if session length also changes the current time
var isReset = true;
var isBreak = false;
var sessionTime = 25; //in minutes
var breakTime = 5; //in minutes
//html elements
var clock;
var sessionElement;
var breakElement;
var modeElement;
//after the window has finished loading start updating elapsed second every seconds
//  and find the locations of elements
window.onload = function() {
  clock = document.getElementById("clock");
  sessionElement = document.getElementById("session-length");
  breakElement = document.getElementById("break-length");
  modeElement = document.getElementById("mode");
  window.setInterval(elapsedSecond, 1000);
}
//call to update clock value using var time
function updateClock(){
  //formats clock components so they are two characters long
  function format(num){
    if (num > 9){
      return num.toString();
    }
    else {
      return "0" + num;
    }
  }
  //does the clock updating
  clock.innerHTML = format(Math.floor(time / 60 )) + ":" + format(time % 60);
}
//gets called every second
function elapsedSecond(){
  if (!pause) {
    time -= 1;
    updateClock();
    if (time === 0){
      modeChange();
      //would figure out how to play music here if i wasn't going to put this on codepen
    }
  }
}
function pauseToggle(){
  pause = !pause;
  isReset = false;
}
function changeBreakLength(difference){
  breakTime += difference;
  if (breakTime === 0){
    breakTime = 1;
  }
  breakElement.innerHTML = breakTime;
  if (isReset && isBreak) {
    time = 60 * breakTime;
    updateClock();
  }
}
function changeSessionLength(difference){
  //change the session time and then set it to the minimun if it's below that
  sessionTime += difference;
  if (sessionTime < 1){
    sessionTime = 1;
  }
  sessionElement.innerHTML = sessionTime;
  //if the clock is in a reset state the update it too
  if (isReset && !isBreak) {
    time = 60 * sessionTime;
    updateClock();
  }
}
function reset(){
  isReset = true;
  pause = true;
  if (isBreak) {
    time = 60 * breakTime;
  }
  else {
    time = 60 * sessionTime;
  }
  updateClock();
}
function modeChange(){
  isBreak = !isBreak;
  if (isBreak) {
    modeElement.innerHTML = "break";
  }
  else {
    modeElement.innerHTML = "session";
  }
  reset();
}
