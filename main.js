const cursor = document.querySelector(".cursor");
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.getElementById("score");
const startGameDiv = document.getElementById("startGame");
const startButton = document.getElementById("startButton");
const gameBoard = document.querySelector(".gameBoard");
const timerBoard = document.getElementById("timer");
const gameOverText = document.getElementById("gameOver");
const intro = document.getElementById("intro");

let score = 0;
let timeLeft;
let gameTimerId;
let moleTimeoutId;
let isGameRunning = false;
const gameDuration = 60;

intro.textContent = `Welcome to Whack-a-Mole! Click on the moles as they pop up to score points. You have ${gameDuration} seconds to get the highest score possible. Good luck!`;

const soundHit = new Audio("assets/smash.mp3");

startButton.addEventListener("click", () => {
  score = 0;
  scoreBoard.textContent = score;
  timeLeft = gameDuration;
  isGameRunning = true;

  startGameDiv.style.display = "none";
  gameOverText.style.display = "none";
  gameBoard.style.display = "flex";
  cursor.style.display = "block";

  updateTimerDisplay();

  gameTimerId = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  run();
});

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerBoard.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function run() {
  if (!isGameRunning) return;

  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];

  const img = document.createElement("img");
  img.classList.add("mole");
  img.src = "assets/mole.png";

  img.addEventListener("click", () => {
    if (!img.parentNode) return;

    score += 10;
    soundHit.currentTime = 0;
    soundHit.play();

    scoreBoard.textContent = score;
    img.src = "assets/mole-whacked.png";

    setTimeout(() => {
      if (hole.contains(img)) {
        hole.removeChild(img);
      }
    }, 500);
  });

  hole.appendChild(img);
  if (score < 100) {
    moleTimeoutId = setTimeout(() => {
      if (hole.contains(img)) {
        hole.removeChild(img);
      }
      if (isGameRunning) {
        run();
      }
    }, 1500);
  }
  if (score >= 100 && score < 200) {
    moleTimeoutId = setTimeout(() => {
      if (hole.contains(img)) {
        hole.removeChild(img);
      }
    }, 1000);
    setTimeout(run, 500);
  }
  if (score >= 200) {
    moleTimeoutId = setTimeout(() => {
      if (hole.contains(img)) {
        hole.removeChild(img);
      }
    }, 800);
    setTimeout(run, 400);
  }
}

function endGame() {
  isGameRunning = false;
  clearInterval(gameTimerId);
  clearTimeout(moleTimeoutId);

  holes.forEach((hole) => (hole.innerHTML = ""));
  if (score < 100) {
    gameOverText.textContent = `Good try! You scored ${score} points. Keep practicing to improve your skills!`;
  }
  if (score >= 100 && score < 300) {
    gameOverText.textContent = `Well done! You scored ${score} points. You're getting the hang of it!`;
  }
  if (score >= 300) {
    gameOverText.textContent = `Amazing! You scored ${score} points. You're a Whack a Mole master!`;
  }
  gameOverText.style.display = "block";
  startGameDiv.style.display = "flex";
  gameBoard.style.display = "none";
  cursor.style.display = "none";
}

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});
window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});
window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});
