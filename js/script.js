var canvas;
var canvasContext;
var ballX = 0;
var ballY = 0;
var ballSpeedX = 4;
var ballSpeedY = 2;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 15;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}

function handleMouseClick(evt) {
	if(showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvasContext.font = "30px Ranchers";

	var framesPerSecond = 240;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

	canvas.addEventListener('mousedown', handleMouseClick);

	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
	});
}

function ballReset() {
	if(player1Score >= WINNING_SCORE ||
	   player2Score >= WINNING_SCORE) {
	   	showingWinScreen = true;
	}

	ballSpeedX =  0;
	ballSpeedY =  0;

	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
	setTimeout(function() {
		ballSpeedX = 4;
	    ballSpeedY = 0;
	}, 500);
	
}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
	if(paddle2YCenter < ballY - 50) {
		paddle2Y += 6;
	} else if(paddle2YCenter > ballY + 50) {
		paddle2Y -= 6;
	}
}

function moveEverything() {
	if(showingWinScreen) {
		return;
	}
	computerMovement();
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if(ballX < 20) {
		if(ballY > paddle1Y &&
		   ballY < paddle1Y+PADDLE_HEIGHT) {
			ballSpeedX = - ballSpeedX;
		    var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
		    ballSpeedY = deltaY * 0.12;
		} else {
			player2Score ++; //must be before ballReset()
			ballReset();			
		}
	}
	if(ballX > canvas.width - 20) {
		if(ballY > paddle2Y &&
		   ballY < paddle2Y+PADDLE_HEIGHT) {
			ballSpeedX = - ballSpeedX;
		    var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
		    ballSpeedY = deltaY * 0.12;
		} else {
			player1Score ++; //must be before ballReset()
			ballReset();			
		}
	}
	if(ballY < 0) {
		ballSpeedY = - ballSpeedY;
	}
	if(ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
}

function drawNet() {
	for(var i = 0; i < canvas.height; i += 40) {
		colorRect(canvas.width/2-1, i, 2, 20, 'white');
	}
}

function drawEverything() {
	//This is our black canvas
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	if(showingWinScreen) {
		canvasContext.fillStyle = 'white';

		if(player1Score >= WINNING_SCORE) {
			canvasContext.fillText("YOU  WON !!", 320, 200);
		} else if(player2Score >= WINNING_SCORE) {
			canvasContext.fillText("Computer Won !!", 315, 200);
		}

		canvasContext.fillStyle = 'white';
		canvasContext.fillText("click to continue", 315, 500);
		return;
	}

	drawNet();	
	//This is our left player paddle
	colorRect(20, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	//This is our right player paddle
	colorRect(canvas.width - PADDLE_THICKNESS - 20, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	//this is our ball
	colorCircle(ballX, ballY, 10, 'white');
	//this is our score text
	canvasContext.fillStyle = 'red';
	canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}