
    // gameplay area
const area = document.getElementById("game-area");

// CREATE GAMEPLAY AREA grids
function makeArea(rows, cols) {
   
    area.style.setProperty('grid-template', `repeat(${rows}, 20px) / repeat(${cols}, 20px)`);

    return {
        rows,
        cols
    }

};



// CREATE SNAKE
function snake() {

    snakeLoc.forEach(segment => {
    let snake = document.createElement("div");
    snake.style.gridRowStart = segment.x;
    snake.style.gridColumnStart = segment.y;
    area.appendChild(snake).className = "snake";
    });

}



// FOOD

    // CREATE NEW FOOD LOCATION
function food(){

    // New food always generates to a place where snake does not exist

    let usedX = snakeLoc.map(a => a.x);
    let usedY = snakeLoc.map(a => a.y);

    let availableX = [];
    for (let i = 0; i < field.rows; i++){
        if(!usedX.includes(i)){
            availableX.push(i);
        }
    };

    let availableY = [];
    for (let i = 0; i < field.cols; i++){
        if(!usedY.includes(i)){
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

    // Add to snake length / constant *snakeLevelUp* determines levelup size
function addLength(){
    let x = 0;
    let newSegment = {
        x: snakeLoc[0].x,
        y: snakeLoc[0].y
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
    }

};



// Snake direction 

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



////
    // CREATE A LAYOUT with 25 columns and 30 rows (20 * 30) for 500px * 600px field
const field = makeArea(30, 25);

    // SNAKE LOCATION START LOC
const snakeLoc = [{x: 30, y: 13}];
 
    // FOOD START LOCATION and COUNTER (foodCounter = level)
let foodCounter = 0;
let foodLoc = {x: 15, y:13};

document.getElementsByClassName("food")[foodCounter].style.gridRowStart = foodLoc.x;
document.getElementsByClassName("food")[foodCounter].style.gridColumnStart = foodLoc.y;


    // CURRENT MOVEMENT
let movementDir = "";

    // SEGMENTS ADDED WITH LEVELUP
const snakeLevelUp = 4;



function gameFrame(){
        // makes sure only neccessary divs are printed
    area.innerHTML = '';
    
        // prints snake
    snake();

        // moves all the snake parts in the same path as head 
    moveSnakeParts();

        // prints food
    currentFood();

        // checks food location relative to snake head and adds length if eaten
    checkFood();

        // listens for keypress
    giveDirection();

        // moves the snake relative to current given direction
    snakeDirection();

        // checks if snake is within the borders else ends the game
    borderCheck();

    console.log(`Level: ${foodCounter}`);
}

//gameFrame();

const frame = setInterval(gameFrame, 200);

function endGame(){
    clearTimeout(frame);
}