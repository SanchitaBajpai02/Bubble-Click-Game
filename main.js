let count = 60;
let rn = 0;
let scoreinc = 0;
let gameOver = false;

// Function to generate bubbles
function generateBubbles() {
    if (gameOver) return;
    let clutter = "";
    for (let i = 1; i <= 112; i++) {
        let num = Math.floor(Math.random() * 10);  // Generate random number for bubble
        clutter += `<div class="bubble">${num}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = clutter;
}

// Timer function
function startTimer() {
    const timerInterval = setInterval(function () {
        if (count > 0 && !gameOver) {
            count--;
            document.querySelector("#timeinter").textContent = count;
        } else if (count === 0 && !gameOver) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Update the 'hit' value shown at the top
function updateHitValue() {
    rn = Math.floor(Math.random() * 10);  // Random number to hit
    document.querySelector("#hitval").textContent = rn;
}

// Increase the score when a correct bubble is clicked
function updateScore() {
    scoreinc += 10;  // Add 10 points per hit
    document.querySelector("#scoreval").textContent = scoreinc;
}

// End the game
function endGame() {
    gameOver = true;
    document.querySelector("#pbtm").innerHTML = "";  // Clear bubbles
    document.querySelector("#gameOver").style.display = "block";  // Show Game Over screen
    document.querySelector("#finalScore").textContent = scoreinc;  // Display final score
}

// Handle bubble clicks
document.querySelector("#pbtm").addEventListener("click", function (e) {
    if (gameOver) return;  // Prevent clicking after game over
    const clicked = Number(e.target.textContent);
    if (clicked === rn) {  // Correct bubble clicked
        updateScore();
        updateHitValue();
        generateBubbles();
    }
});

// Restart the game when clicking "Play Again"
document.querySelector("#restartBtn").addEventListener("click", function () {
    count = 60;
    scoreinc = 0;
    gameOver = false;
    document.querySelector("#timeinter").textContent = count;
    document.querySelector("#scoreval").textContent = scoreinc;
    document.querySelector("#gameOver").style.display = "none";
    updateHitValue();
    startTimer();
    generateBubbles();
});

// Initialize game state
updateHitValue();
startTimer();
generateBubbles();
