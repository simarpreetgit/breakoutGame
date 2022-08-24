console.log("connected");

const windowWidth = 600;
const windowHeight = 400;

const rows = 6;
const cols = 4;

let rightDown = false;
let leftDown = false;
let alive = true;

const brickWidth = Math.round(windowWidth/cols - 4);
const brickHeight = Math.round((windowHeight * 1/2) / rows - 10);

//const brickWidth = windowWidth/cols -4;
//const brickHeight =(windowHeight * 1/2) / rows - 10;

// const brickWidth = Math.floor(Math.random()*16777215).windowHeight/cols -4;
// const brickHeight = Math.floor(Math.random()*16777215).windowHeight * 1/2 /rows - 10;

let bricks = [];
let score = 0;

let paddle = {
	x: windowWidth/2 - 50,
	y: windowHeight - 15,
	width: 100,
	height: 10
}

let ball = {
	x: paddle.x - 25,
	y: paddle.y - 50,
	speedX: 3,
	speedY: 6,
	diameter: 20 
}

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
        fill('blue');
        rect(brick.x, brick.y, brick.width, brick.height);
        noStroke();
    })
}

function draw() {
    background('black');
    if(alive) {
        drawBricks();
        drawPaddle();
        drawBall();
        
    }
}

function keyPressed() {
    if(keyCode === RIGHT_ARROW) {
        rightDown = true;
    }
    if(keyCode === LEFT_ARROW) {
        leftDown = true;
    }

    if(keyCode === 32 && !alive) {
        alive = true;
        paddle.x = windowWidth / 2 - 50,
        ball.x = paddle.x - 25,
        ball.y = paddle.y - 50,
        ball.speedX = 3;
        ball.speedY = 6;
        bricks.splice(0, bricks.length);
        score = 0;
        generateBricks();
    }
}
function keyReleased() {
    if(keyCode === RIGHT_ARROW) {
        rightDown = false;
    }
    if(keyCode === LEFT_ARROW) {
        leftDown = false;
    }
}

function drawPaddle() {
    fill('green');
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    if(rightDown && paddle.x + paddle.width < windowWidth) {
        paddle.x += 10;
    }
    if(leftDown && paddle.x > 0) {
        paddle.x -= 10;
    }
}


function drawBall() {
    fill('white');
    circle(ball.x, ball.y, ball.diameter);

    if(ball.y - ball.diameter / 2 <= 0) {
        ball.speedY = -ball.speedY;
    }
    
    if(ball.y + ball.diameter / 2 >= windowHeight) {
        alive = false;
    }
	
    if(ball.x - ball.diameter / 2 <= 0 || ball.x + ball.diameter / 2 >= windowWidth) {
        ball.speedX = -ball.speedX;
    }

    if(ball.y + ball.diameter / 2 >= paddle.y &&
    ball.x >= paddle.x && ball.x < paddle.x + paddle.width/2) 
    {
      ball.speedY = -ball.speedY;
      if(ball.speedX > 0)
       {
          ball.speedX = -ball.speedX;
      }
  }

  if(ball.y + ball.diameter / 2 >= paddle.y && ball.x >= paddle.x + paddle.width/2 && ball.x < paddle.x + paddle.width) {
        ball.speedY = -ball.speedY;
        if(ball.speedX < 0) {
            ball.speedX = -ball.speedX;
        }
    }

    bricks.forEach((brick, index) => {
        if(ball.y - ball.diameter / 2 <= brick.y + brick.height && ball.x >= brick.x && ball.x <= brick.x + brick.width) {
            ball.speedY = -ball.speedY;
            bricks.splice(index, 1);
            score++;
            if(bricks.length === 0) alive = false;
        }
    });



    ball.x += ball.speedX;
    ball.y += ball.speedY;
}
