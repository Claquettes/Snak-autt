let gameStarted = false;
let gameArea = document.getElementById("game-area");
let snake = [{x: 150, y: 150}];
let food = {x: Math.floor(Math.random() * 290), y: Math.floor(Math.random() * 290)};
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop;

// Function to create a new food unit
function createFood() {
    food = {x: Math.floor(Math.random() * 290), y: Math.floor(Math.random() * 290)};
    let foodUnit = document.createElement("div");
    foodUnit.id = "food";
    foodUnit.style.left = food.x + "px";
    foodUnit.style.top = food.y + "px";
    gameArea.appendChild(foodUnit);
}

// Function to move the snake
function move() {
    let snakeHead = snake[snake.length - 1];
    let newX = snakeHead.x + dx;
    let newY = snakeHead.y + dy;
    if (newX >= 0 && newX <= 290 && newY >= 0 && newY <= 290) {
        snake.push({x: newX, y: newY});
        if (newX !== food.x || newY !== food.y) {
            let snakeTail = snake.shift();
            let snakeTailUnit = document.getElementById("snake-unit-" + snakeTail.x + "-" + snakeTail.y);
            snakeTailUnit.parentNode.removeChild(snakeTailUnit);
        } else {
            score++;
            // this will update the score
            document.getElementById("food").parentNode.removeChild(document.getElementById("food"));
            createFood();
        }
        let snakeHeadUnit = document.createElement("div");
        snakeHeadUnit.classList.add("snake-unit");
        snakeHeadUnit.id = "snake-unit-" + newX + "-" + newY;
        snakeHeadUnit.style.left = newX + "px";
        snakeHeadUnit.style.top = newY + "px";
        gameArea.appendChild(snakeHeadUnit);
    } else {
        alert("Game over! Your score is " + score);
        gameStarted = false;
        clearInterval(gameLoop);
    }
}

//start button and the event listener     //start button and the event listener 
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", function(){
        if(!gameStarted){
            createFood();
            for (let i = 0; i < snake.length; i++) {
                let snakeUnit = document.createElement("div");
                snakeUnit.classList.add("snake-unit");
                snakeUnit.id = "snake-unit-" + snake[i].x + "-" + snake[i].y;
                snakeUnit.style.left = snake[i].x + "px";
                snakeUnit.style.top = snake[i].y + "px";
                gameArea.appendChild(snakeUnit);
            }
            gameLoop = setInterval(move, 100);
            document.onkeydown = function(event) {
                if (event.keyCode === 37 && dx !== 10) {
                    dx = -10;
                    dy = 0;
                } else if (event.keyCode === 38 && dy !== 10) {
                    dx = 0;
                    dy = -10;
                } else if (event.keyCode === 39 && dx !== -10) {
                    dx = 10;
                    dy = 0;
                } else if (event.keyCode === 40 && dy !== -10) {
                    dx = 0;
                    dy = 10;
                }
            }
            gameStarted = true;
        }
    });
