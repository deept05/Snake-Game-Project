// Game Constants and Game Variables
let direction = {x: 0, y: 0};
let inputDir = {x: 0, y: 0}; // Added missing variable
const moveSound = new Audio("move.mp3");
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
let speed = 5;
let lastPaintTime = 0; // Added missing variable
let snakeArr = [{x:13, y:15}];
food = {x:6, y:7};

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function collide(snake){
    // if you bump into urself
    for(let i = 1; i<snakeArr.length; i++ ){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){ /*if both has same direction head and body */
            return true;
        } 
    }
    // if you bump into the wall
    if(snake[0].x >= 18 ||  snake[0].x <= 0 || snake[0].y >= 18 ||  snake[0].y <= 0){
        return true;
    }
    return false;
}


function gameEngine(){
    // Part 1 - Updating the snake and food
    if(collide(snakeArr)){
    gameOverSound.play();
    inputDir = {x:0, y:0};
    alert("Game over: (press ctrl + r to refresh the game");
    snakeArr = [{x : 13, y : 15}];
}




    // If you have eaten the food regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x ,y : snakeArr[0].y + inputDir.y });
        let a = 2, b = 16;
        food = {x : Math.round(a + (b-a)* Math.random()), y : Math.round(a + (b-a)* Math.random()) };
    }

    // Move the snake
    for(let i = snakeArr.length - 1; i > 0; i--){
        snakeArr[i] = {...snakeArr[i - 1]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2 - Display the snake and food
    let playArea = document.getElementById("playArea");
    playArea.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head'); // Fixed classList
        } else {
            snakeElement.classList.add('snake');
        }
        playArea.appendChild(snakeElement);
    });

    // Display food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playArea.appendChild(foodElement);
}

// Main logic
window.requestAnimationFrame(main); // prduces high quality animation completely eliminating flicker ( when gpu > produces more images than ur actual windows can dsiaply) when we use set time out and set interval this causes flicker thats why we use requestanimationframe.
window.addEventListener('keydown', e => {
    switch(e.key){
        case 'ArrowUp':
            console.log("Arrow Up");
            inputDir = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            console.log("Arrow Down");
            inputDir = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            console.log("Arrow Left");
            inputDir = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            console.log("Arrow Right");
            inputDir = {x: 1, y: 0};
            break;
        default:
            break;
    }
});
