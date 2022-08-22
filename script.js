console.log("connected");

const windowWidth = 600;
const windowHeight = 400;

const rows = 6;
const cols = 7;

let rightDown = false;
let leftDown = false;
let alive = true;

// const brickWidth = Math.round(windowWidth/cols - 4);
// const brickHeight = Math.round((windowHeight * 1/2) / rows - 10);

const brickWidth = windowWidth/cols -4;
const brickHeight =(windowHeight * 1/2) / rows - 10;

let bricks = [];
let score = 0;

// let paddle = {
// 	x: windowWidth/2 - 50,
// 	y: windowHeight - 15,
// 	width: 100,
// 	height: 10
// }

// let ball = {
// 	x: paddle.x - 25,
// 	y: paddle.y - 50,
// 	speedX: 6,
// 	speedY: 6,
// 	diameter: 15
// }

function setup() {
	createCanvas(windowWidth, windowHeight);
	generateBricks();
}

function generateBricks() {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            let brickData = {
                x: j * (brickWidth + 2) + 10,
                y: i * (brickHeight + 2) + 30,
		    width: brickWidth,
		    height: brickHeight
            }
        bricks.push(brickData);
        }
    }
}

function drawBricks() {
    bricks.forEach(brick => {
        fill("red");
        rect(brick.x, brick.y, brick.width, brick.height);
        noStroke();
    })
}

function draw() {
    background("black");
    if(alive) {
        drawBricks();
    }
}
