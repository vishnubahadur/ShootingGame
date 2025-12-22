const gameArea = document.querySelector(".gamearea");
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const popup = document.getElementById("popup");
const finalScoreDisplay = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");
// const crosshair = document.getElementById("crosshair");
const difficultySelect = document.getElementById("difficulty");

// Shooting sound
const shootingSound = new Audio("https://www.fesliyanstudios.com/play-mp3/387"); // pistol shot

let score = 0;
let timeLeft =30;
let gameInterval;
let timerInterval;
let moveSpeed = 2500; // default for medium

// Difficulty Logic
function updateDifficulty() {
    const diff = difficultySelect.value;

    if (diff === "easy") {
        moveSpeed = 2500;
        target.style.width = "70px";
        target.style.height = "70px";
    } 
    else if (diff === "medium") {
        moveSpeed = 1600;
        target.style.width = "50px";
        target.style.height = "50px";
    } 
    else if (diff === "hard") {
        moveSpeed = 1000;
        target.style.width = "30px";
        target.style.height = "30px";
    }
}

// Move crosshair
// document.addEventListener("mousemove", e => {
//     crosshair.style.left = `${e.clientX}px`;
//     crosshair.style.top = `${e.clientY}px`;
// });

// Move target randomly
function moveTarget() {
    const x = Math.random() * ((window.innerWidth - 400) - target.clientWidth);
    const y = Math.random() * ((window.innerHeight - 200) - target.clientHeight);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    
}

// When target is clicked
target.addEventListener("click", () => {
    shootingSound.currentTime = 0;
    shootingSound.play();

    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    moveTarget();
});

// Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

// Start game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = "Score: 0";
    timerDisplay.textContent = "Time: 30";
    popup.style.display = "none";

    updateDifficulty();
    moveTarget();

    clearInterval(gameInterval);
    gameInterval = setInterval(moveTarget, moveSpeed);

    clearInterval(timerInterval);
    startTimer();
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    finalScoreDisplay.textContent = `Your Score: ${score}`;
    popup.style.display = "flex";
}

// Restart button
restartBtn.addEventListener("click", startGame);

// Update difficulty when changed
difficultySelect.addEventListener("change", startGame);

// Start automatically
startGame();
