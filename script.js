var character = document.getElementById("character");
var block = document.getElementById("block");
var gameStarted = false;
var score = 0;
var scoreInterval;
var blockSpeed = 2; // Default speed (2s per cycle)
var blockPasses = 0; // Counts how many times the rock has crossed the game page
var passesToIncreaseSpeed = 5; // change speed after this many passes

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        score = 0;
        blockSpeed = 2; // Reset speed
        blockPasses = 0;
        block.style.animation = `moveBlock ${blockSpeed}s linear infinite`; // Apply animation
        document.getElementById("scoreDisplay").innerText = "Score: " + score;
        
        // starts score counter //
        scoreInterval = setInterval(function () {
            score++;
            document.getElementById("scoreDisplay").innerText = score;
        }, 200);        
    }
}

// Detect when the block completes a full pass across the screen
block.addEventListener("animationiteration", function () {
    if (gameStarted) {
        blockPasses++; // Increase pass count

        if (blockPasses % passesToIncreaseSpeed === 0) {
            increaseSpeed(); // Increase speed after a set number of passes
        }
    }
});


function increaseSpeed() {
    if (gameStarted) {
        blockSpeed = Math.max(0.8, blockSpeed - 0.2); // Reduce animation time (faster movement)

        // Pause animation, update speed, then resume to prevent glitches
        block.style.animationPlayState = "paused";  
        block.style.animationDuration = `${blockSpeed}s`; 
        void block.offsetWidth; // Forces browser to recognize changes
        block.style.animationPlayState = "running";  

        console.log("Level: ", blockSpeed);
    }
}

function jump() {
    if (!gameStarted) return; // Prevent jumping before game starts

    if (!character.classList.contains("jump")) {
        character.classList.add("jump");
        setTimeout(function () {
            character.classList.remove("jump");
        }, 500);
    }
}

// Listen for spacebar to jump
document.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        jump();
    }
});

// Collision Detection
var checkDead = setInterval(function () {
    if (!gameStarted) return;

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (blockLeft < 50 && blockLeft > 0 && characterTop >= 130) {
        block.style.animation = "none";
        gameStarted = false;
        clearInterval(scoreInterval); // Stop score counting
        alert("nooooo! you lose :'( your score: " + score);
    }
}, 10);

let button = document.getElementById("startbtn");

button.addEventListener("mousedown", function() {
    button.classList.add("clicked"); // Apply outline change on mouse down
});

button.addEventListener("mouseup", function() {
    button.classList.remove("clicked"); // Remove outline change on mouse up
});

button.addEventListener("mouseleave", function() {
    button.classList.remove("clicked"); // Ensure outline resets if the mouse leaves the button
});