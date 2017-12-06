var canvas;
var canvasContext;
var ballX = 0;
var ballY = 0;
var ballSpeedX = 5;
var ballSpeedY = 2;

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;

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

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 240;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
	});
}

function moveEverything() {
	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;
	if (ballX > canvas.width) {
		ballSpeedX = - ballSpeedX;
	} else if (ballX < 0) {
		ballSpeedX = - ballSpeedX;
	}
	if (ballY > canvas.height) {
		ballSpeedY = - ballSpeedY;
	} else if (ballY < 0) {
		ballSpeedY = - ballSpeedY;
	}
}

function drawEverything() {
	//This is our black canvas
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	//This is our left player paddle
	colorRect(0, paddle1Y, 20, PADDLE_HEIGHT, 'white');
	//this is our ball
	colorCircle(ballX, ballY, 10, 'white');
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