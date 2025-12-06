const cursor = document.querySelector(".cursor");
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.getElementById("score");
const startGame = document.getElementById("startGame");
const startButton = document.getElementById("startButton");
const gameBoard = document.querySelector(".gameBoard");
const timerBoard = document.getElementById("timer");

startButton.addEventListener("click", () => {
  startGame.style.display = "none";
  gameBoard.style.display = "flex";
  cursor.style.display = "block";
  const gameDuration = 0.2;
  let timeLeft = gameDuration * 60;

  setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimer();
    }
  }, 1000);

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerBoard.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
});

let score = 0;

const soundHit = new Audio("assets/smash.mp3");

function run() {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];

  let timer = null;

  const img = document.createElement("img");
  img.classList.add("mole");
  img.src = "assets/mole.png";

  img.addEventListener("click", () => {
    score += 10;
    soundHit.play();
    scoreBoard.textContent = score;
    img.src = "assets/mole-whacked.png";
    clearTimeout(timer);
    setTimeout(() => {
      hole.removeChild(img);
      run();
    }, 500);
  });

  hole.appendChild(img);

  timer = setTimeout(() => {
    hole.removeChild(img);
    run();
  }, 1500);
  if (timeLeft === 0) {
    hole.removeChild(img);
    document.getElementById(
      "gameOver"
    ).textContent = `Game Over! Your final score is: ${score}`;
    document.getElementById("gameOver").style.display = "block";
    score = 0;
    scoreBoard.textContent = score;
    timeLeft = gameDuration * 60;
    startGame.style.display = "flex";
    gameBoard.style.display = "none";
    cursor.style.display = "none";
  }
}
run();

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
