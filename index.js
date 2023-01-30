var timerDisplay = document.querySelector("#timer");
var startBtn = document.querySelector("#startBtn");
var stopBtn = document.querySelector("#stopBtn");
var resetBtn = document.querySelector("#resetBtn");

var workCount = 1 * 25;
var breakCount = 1 * 5;
var intervalId;
var timerState = "work";

function displayTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timerDisplay.innerHTML = minutes + ":" + seconds;
}

function startWork() {
  workCount--;
  displayTime(workCount);
  if (workCount === 0) {
    clearInterval(intervalId);
    var audio = new Audio("./assets/audio/afterfocus.mp3");
    audio.play();
    timerState = "break";
    breakCount = 1 * 5;
    startTimer();
  }
}

function startBreak() {
  breakCount--;
  displayTime(breakCount);
  if (breakCount === 0) {
    clearInterval(intervalId);
    var audio = new Audio("./assets/audio/afterbreak.mp3");
    audio.play();
    timerState = "work";
    workCount = 1 * 25;
    startTimer();
  }
}

function startTimer() {
  if (timerState === "work") {
    intervalId = setInterval(startWork, 1000);
  } else if (timerState === "break") {
    intervalId = setInterval(startBreak, 1000);
  }
}

startBtn.addEventListener("click", function () {
  startTimer();
});

stopBtn.addEventListener("click", function () {
  clearInterval(intervalId);
});

resetBtn.addEventListener("click", function () {
  clearInterval(intervalId);
  timerState = "work";
  workCount = 1 * 25;
  breakCount = 1 * 5;
  displayTime(workCount);
});
