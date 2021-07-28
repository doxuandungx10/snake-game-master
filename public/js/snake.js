

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const box = 20;
const socket = io();


const ground = new Image();
ground.src = "img/ground2.png";

const foodImg = new Image();
foodImg.src = "img/food2.png";

let body = document.getElementById(`body`);
let screen = document.getElementById(`screen`);

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

let food = {
    x: Math.floor(Math.random() * 38 + 1) * box,
    y: (Math.floor(Math.random() * 30) + 7) * box
}


function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

let score = 0;
let snake = [];
snake[0] = {
    x: 15 * box,
    y: 12 * box
}
let p;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && p != "RIGHT") {
        left.play();
        p = "LEFT";
    } else if (key == 38 && p != "DOWN") {
        p = "UP";
        up.play();
    } else if (key == 39 && p != "LEFT") {
        p = "RIGHT";
        right.play();
    } else if (key == 40 && p != "UP") {
        p = "DOWN";
        down.play();
    }
}

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "rgb(0, 253, 106)" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (p == "LEFT") snakeX -= box;
    if (p == "UP") snakeY -= box;
    if (p == "RIGHT") snakeX += box;
    if (p == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 38 + 1) * box,
            y: (Math.floor(Math.random() * 30) + 7) * box

        }
    } else {
        snake.pop();
    }


    let newhead = {
        x: snakeX,
        y: snakeY
    }


    if (snakeX < box || snakeX > 39 * box - 1 || snakeY < 7 * box || snakeY > 36 * box || collision(newhead, snake)) {
        clearInterval(game);
        dead.play();

        function drawSquare(x, y) {
            ctx.fillStyle = "black";
            ctx.fillRect(box * x, box * y, box, box);
            ctx.strokeStyle = "black";
            ctx.strokeRect(box * x, box * y, box, box);
        }

        function drawScreen() {
            for (r = 1; r < 39; r++) {
                for (c = 7; c < 38; c++) {
                    drawSquare(r, c);
                }
            }
        }
        drawScreen();
        // Over();
        // Over2();
        setTimeout(function () { Over() }, 200);
        setTimeout(function () { Over2() }, 600);
        setTimeout(function () {
            refresh()
        }, 1800);



    }
    let checkBox = document.getElementById("checkbox")
    let startGame = document.getElementById(`startgame`)
    document.createElement('div')
    startGame.addEventListener(`click`, () => {
        checkBox.style.display = "none";
    })

    snake.unshift(newhead);

    ctx.fillStyle = "white";
    ctx.font = "40px Changa one";
    ctx.fillText('Score:' + score, 1.5 * box, 6 * box);
}

function listenServer() {
    socket.on('connection', function () {
        console.log('connected');
    })
    socket.on('directionFromServer', function (direction) {
        p = direction;
    })
}
listenServer();

let game = setInterval(draw, 100);
