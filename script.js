let gameArea = document.getElementById("game-area");
let snake = [{x: 150, y: 150}];
let dx = 10;
let dy = 0;
let score = 0;
let gameStarted = true;
let gameLoop;

//on récupère depuis le html speed, distance et length, et on les convertit en int
let speed = parseInt(document.getElementById("speed").value);
let distance = parseInt(document.getElementById("distance").value);
let length = parseInt(document.getElementById("length").value);
console.log(speed, distance, length);



function createFood() {
    let foodX = Math.floor(Math.random() * 50) * 10 - distance*10;
    let foodY = Math.floor(Math.random() * 50) * 10 - distance*10;
    console.log(foodX, foodY);
    food = {x: foodX, y: foodY};
    let foodUnit = document.createElement("div");
    foodUnit.id = "food";
    foodUnit.style.left = foodX + "px";
    foodUnit.style.top = foodY + "px";
    gameArea.appendChild(foodUnit);
}
function calculSpeed(){
    let speedToUse = parseInt(speed) * 10;
    console.log(speedToUse);
   
}

function checkCollision() {
    for (let i = 0; i < snake.length - 1; i++) {
        if (snake[i].x === snake[snake.length - 1].x && snake[i].y === snake[snake.length - 1].y) {
            alert("Game over! Your score is " + score);
            gameStarted = false;
            clearInterval(gameLoop);
        }
    }
}



function move() {
    calculSpeed();
    let snakeHead = snake[snake.length - 1];
    let newX = snakeHead.x + dx;
    let newY = snakeHead.y + dy;
    if (newX >= 0 && newX <= 490 && newY >= 0 && newY <= 490) {
        snake.push({x: newX, y: newY});
        checkCollision();
        if (newX === food.x && newY === food.y) {
            score++;
            //on met a jour le score
            document.getElementById("score").innerHTML = score;
            document.getElementById("food").remove();
            createFood();
        } else {
            let snakeTail = snake.shift();
            let snakeTailUnit = document.getElementById("snake-unit-" + snakeTail.x + "-" + snakeTail.y);
            snakeTailUnit.parentNode.removeChild(snakeTailUnit);
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
        //we get the values from the html, the options that the user chose in the select    
        speed = parseInt(document.getElementById("speed").value);
        distance = parseInt(document.getElementById("distance").value);
        length = parseInt(document.getElementById("length").value);
        console.log(speed, distance, length);
        

        if(gameStarted){
            startButton.innerHTML = "Restart";
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
        }else{
            //WE DELETE THE FOOD
            document.getElementById("food").remove();
            //WE DELETE THE SNAKE
            for (let i = 0; i < snake.length; i++) {
                let snakeUnit = document.getElementById("snake-unit-" + snake[i].x + "-" + snake[i].y);
                snakeUnit.parentNode.removeChild(snakeUnit);
            }
            //WE RESET THE SCORE
            score = 0;
            //WE RESET THE SNAKE
            snake = [{x: 150, y: 150}];
            //WE RESET THE DIRECTION
            dx = 10;
            dy = 0;
            //WE RESET THE GAME STARTED
            startButton.innerHTML = "Start";
            gameStarted = true;
        }

    });
