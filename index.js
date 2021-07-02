const grid = document.querySelector('.grid');
const startButton = document.querySelector('.start');
let snake = [2, 1, 0];
let width = 20;
const gridArray = [];
let direction = 1;
let timeId = 0
let time = 600;
const SPEED = 0.9;
let foodIndex = 0;

function createGrid() {
  for (let i = 0; i < width * width; i++) {
    let gridCell = document.createElement('div');
    //gridCell.textContent = i;
    gridCell.classList.add('grid-cell');
    grid.appendChild(gridCell);
    gridArray.push(gridCell);
  }
}

createGrid();

function createFood(){
    do{
        foodIndex = Math.floor(Math.random() * (width*width));
    }while(gridArray[foodIndex].classList.contains('snake'));

    gridArray[foodIndex].classList.add('food');
}

function startGame(){
    clearInterval(timeId);

    snake.forEach(index => gridArray[index].classList.remove('snake'));
    snake.forEach(index => gridArray[index].classList.remove('dead-snake'));
    gridArray[foodIndex].classList.remove('food');
    snake = [2,1,0];
    time = 600;
    direction = 1;
    snake.forEach(index => gridArray[index].classList.add('snake'));
    createFood();
    timeId = setInterval(move, time);
}


startButton.addEventListener('click', startGame);

function move(){
    if(detectCollision()){
        snake.forEach(index => gridArray[index].classList.add('dead-snake'));
        return clearInterval(timeId);
    }

    let tail = snake.pop();
    gridArray[tail].classList.remove('snake');
    snake.unshift(snake[0] + direction);
    gridArray[snake[0]].classList.add('snake');

    eatFood(tail);
}


function moveControl(e){
    if(e.keyCode === 40){//bottom
       direction =+ width;
    }
    else if(e.keyCode === 39){//right
        direction =+ 1;
    }
    else if(e.keyCode === 38){//top
        direction =- width;
    }
    else if(e.keyCode === 37){//left
        direction =- 1;
    }
}

document.addEventListener('keydown', moveControl);

function detectCollision(){
    if(
        (snake[0] + width > width*width && direction === width) || //hit bottom
        (snake[0] - width < 0 && direction === -width) || // hit top
        (snake[0] % width === (width -1) && direction === 1) || // hit right
        (snake[0] % width === 0 && direction === -1) || // hit left
        gridArray[snake[0] + direction].classList.contains('snake')
    )
    {
        return true;
    }
}

function eatFood(tail){
    if(gridArray[snake[0]].classList.contains('food')){
        gridArray[foodIndex].classList.remove('food');
        snake.push(tail);
        gridArray[tail].classList.add('snake');
        createFood();
        increaseSpeed();
    }
}

function increaseSpeed(){
    clearInterval(timeId);
    time = time * SPEED;
    timeId = setInterval(move, time);
}