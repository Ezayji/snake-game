
// DEFINE GAMEPLAY AREA
const area = document.getElementById("game-area");

// CREATE GAMEPLAY AREA grids
function makeArea(rows, cols) {
   
    area.style.setProperty('grid-template', `repeat(${rows}, 20px) / repeat(${cols}, 20px)`);

    return {
        rows,
        cols
    }

};



// PRINT SNAKE
function snake() {

    snakeLoc.forEach(segment => {
    let snake = document.createElement("div");
    snake.style.gridRowStart = segment.x;
    snake.style.gridColumnStart = segment.y;
    area.appendChild(snake).className = "snake";
    });

}

    // Change snake's head colour
function snakeHead(){
    let snake = document.getElementsByClassName("snake");
    snake[0].style.setProperty('background-color', 'green');
}

// FOOD
    // CREATE NEW FOOD LOCATION
function food(){

    // New food always generates to a place where snake does not exist

    let usedX = snakeLoc.map(a => a.x);
    let usedY = snakeLoc.map(a => a.y);

    let availableX = [];
    for (let i = 0; i <= field.rows - 1; i++){
        if(!usedX.includes(i) && i > 0 && i < field.rows){
            availableX.push(i);
        }
    };

    let availableY = [];
    for (let i = 0; i <= field.cols - 1; i++){
        if(!usedY.includes(i) && i > 0 && i < field.cols){
            availableY.push(i);
        }
    };

    x = availableX[Math.floor(Math.random() * availableX.length)];
    y = availableY[Math.floor(Math.random() * availableY.length)];

    foodLoc = {x: x, y: y};
}

    // PRINT FOOD
function currentFood(){
    let x = foodLoc.x;
    let y = foodLoc.y;

    let food = document.createElement("div");
    food.style.gridRowStart = x;
    food.style.gridColumnStart = y;
    area.appendChild(food).className = "food";

    foodLoc = {x: x, y: y};
}

    // ADD TO SNAKE LENGTH / constant *snakeLevelUp* determines levelup size
function addLength(){
    let x = 0;
    let newSegment = {
        x: -1,//snakeLoc[0].x,
        y: -1//snakeLoc[0].y
    };
    while(x < snakeLevelUp){
        snakeLoc.push(newSegment);
        x += 1;
    }
};

    // Checks food location relative to snakes head and adds length to snake
function checkFood(){
    if (snakeLoc[0].x == foodLoc.x && snakeLoc[0].y == foodLoc.y){
        addLength();
        food();
        foodCounter += 1;
        score += snakeLevelUp * 10;
    }

};

    // Checks for how long food has been uneaten
function foodLife(){
    if(snakeSpeed >= 170){

    } else if (snakeSpeed = 140){

    } else if (snakeSpeed = 120){

    } else if (snakeSpeed = 100){

    } else if (snakeSpeed = 90){

    }
}



// SNAKE DIRECTION 
    // updates location in every loop based on movementDir
function snakeDirection(){
    if(movementDir == "left"){
        snakeLoc[0].y -= 1;
    } else if (movementDir == "up"){
        snakeLoc[0].x -= 1;
    } else if (movementDir == "right"){
        snakeLoc[0].y += 1;
    } else if (movementDir == "down"){
        snakeLoc[0].x += 1;
    }
};

    // check if snake hits border
function borderCheck(){
    if(snakeLoc[0].x < 1 || 
        snakeLoc[0].y < 0 || 
        snakeLoc[0].x > field.rows || 
        snakeLoc[0].y > field.cols)
           { 
        endGame();
    } else {
        return false;
    }
}

    // check if snake tries to eat himself
function cannibalCheck(){
    
   if (snakeLoc.length === 1){
    return; 
    }

   let snakeHead = snakeLoc[0];
   let snakeBody = [];

   for (let i = 1; i < snakeLoc.length; i++){
        let bodyPart = snakeLoc[i];
        snakeBody.push(bodyPart);
   }
   
   for (let i = 1; i <= snakeBody.length - 2; i++){
       if (snakeBody[i].x === snakeHead.x && snakeBody[i].y === snakeHead.y){
           endGame();
       }
   }
   
}

    // move snake segments with the snake
function moveSnakeParts(){
    for (let i = snakeLoc.length - 2; i >= 0; i--){
        snakeLoc[i + 1] = { ...snakeLoc[i] }
    }
};

    // EVENT LISTENER FOR DIRECTION
function giveDirection(){
    document.addEventListener("keydown", function (event) {
        if (event.code == "ArrowLeft" && movementDir == "right"){
            return;
        } else if (event.code == "ArrowRight" && movementDir == "left"){
            return;
        } else if (event.code == "ArrowUp" && movementDir == "down"){
            return;
        } else if (event.code == "ArrowDown" && movementDir == "up"){
            return;
        } else if (event.code == "ArrowLeft"){
            movementDir = "left";
        } else if (event.code == "ArrowUp"){
            movementDir = "up";
        } else if (event.code == "ArrowRight"){
            movementDir = "right";
        } else if (event.code == "ArrowDown"){
            movementDir = "down";
        } 
    });
}



// SCORE AND LEVEL
function showLevel(){
    let box = document.getElementById("score");
        // make sure score and level is printed once every interval
    box.innerHTML = '';
    
    let p = document.createElement('p');
    let p2 = document.createElement('p');
    
    p.textContent = `Level:${foodCounter}`;
    p2.textContent = `Score:${score}`;

    box.appendChild(p);
    box.appendChild(p2);
}

    // increase speed after certain levels
function increaseSpeed(){
    let levelDif = foodCounter - oldFoodCount;
    if (levelDif == 5 && snakeSpeed > 140){
        snakeSpeed -= 30;
        oldFoodCount = foodCounter;
        console.log(levelDif);
        console.log(snakeSpeed);
        frame = clearTimeout(frame);
        frame = setInterval(gameFrame, snakeSpeed);
    } else if (levelDif == 5 && snakeSpeed == 140){
        snakeSpeed -= 20;
        oldFoodCount = foodCounter;
        console.log(levelDif);
        console.log(snakeSpeed);
        frame = clearTimeout(frame);
        frame = setInterval(gameFrame, snakeSpeed);
    } else if (levelDif == 5 && snakeSpeed <= 100){
        snakeSpeed -= 10;
        oldFoodCount = foodCounter;
        console.log(levelDif);
        console.log(snakeSpeed);
        frame = clearTimeout(frame);
        frame = setInterval(gameFrame, snakeSpeed);
    }
}

    // high score table
function highScore(){
    if (score > high){
        high = score;
    } else {
        return;
    }
    let highScore = document.getElementById("best");
    highScore.style.setProperty('display', 'flex');
    highScore.innerHTML = '';

    let p = document.createElement('p');
    let p2 = document.createElement('p');

    p.textContent = "High score:";
    p2.textContent = `${high}`;

    highScore.appendChild(p);
    highScore.appendChild(p2);
}


// PAUSE and RESUME
    const pauseBut = document.getElementById('pause');
    const resumeBut = document.getElementById('resume');

function pauseGame(){
    pauseBut.style.setProperty('display', 'none');
    resumeBut.style.setProperty('display', 'initial');
    frame = clearTimeout(frame);
}

function continueGame(){
    resumeBut.style.setProperty('display', 'none');
    pauseBut.style.setProperty('display', 'initial');
    frame = setInterval(gameFrame, snakeSpeed);
}



// BEGIN THE GAME 
let startBut = document.getElementById("start");

function beginGame(){
    let welcomePage = document.getElementById("welcome");
    let scoreBoard = document.getElementById("score");
    welcomePage.style.setProperty('display', 'none');
    pauseBut.style.setProperty('display', 'initial');
    scoreBoard.style.setProperty('display', 'flex');
    frame = setInterval(gameFrame, snakeSpeed);
}



// END THE GAME IF LOSE
function endGame(){
    clearTimeout(frame);
    highScore();
    snakeLoc = [{x: 30, y: 13}];
    foodCounter = 0;
    foodCounter = 0;
    oldFoodCount = 0;
    foodLoc = {x: 15, y:13};
    movementDir = "";
    score = 0;
    snakeSpeed = 200;
    frame = setInterval(gameFrame, snakeSpeed);
}



////
    // CREATE A LAYOUT with 25 columns and 30 rows (25 * 30) for 500px * 600px field
const field = makeArea(30, 25);

    // SNAKE START LOC
let snakeLoc = [{x: 30, y: 13}];
 
    // FOOD START LOCATION and COUNTER (foodCounter = level)
let foodCounter = 0;
let oldFoodCount = 0;
let foodLoc = {x: 15, y:13};

document.getElementsByClassName("food")[foodCounter].style.gridRowStart = foodLoc.x;
document.getElementsByClassName("food")[foodCounter].style.gridColumnStart = foodLoc.y;

    // CURRENT MOVEMENT
let movementDir = "";

    // SEGMENTS ADDED WITH LEVELUP
const snakeLevelUp = 2;

    // SCORE
let score = 0;

    // HOLD HIGH SCORE
let high = 0;

    // SNAKE SPEED
let snakeSpeed = 200;

    // FOOD UNEATEN TIME
let foodLive = 0;



// ONE GAME INTERVAL
function gameFrame(){
        // makes sure only neccessary divs are printed
    area.innerHTML = '';

        // increases speed after certain levels
    increaseSpeed();

        // prints snake
    snake();

        // sets the colour for snake's head
    snakeHead();

        // moves all the snake parts in the same path as head 
    moveSnakeParts();

        // prints food
    currentFood();

        // checks food location relative to snake head and adds length if eaten
    checkFood();

        // checks if the snake tries to eat itself
    cannibalCheck();

        // listens for keypress
    giveDirection();

        // moves the snake relative to current given direction
    snakeDirection();

        // checks if snake is within the borders else ends the game
    borderCheck();

        // updates level and score
    showLevel();
}



let frame;

startBut.onclick = beginGame;
pauseBut.onclick = pauseGame;
resumeBut.onclick = continueGame;

