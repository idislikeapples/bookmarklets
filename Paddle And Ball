javascript:(function() {
  // Game configuration
  var canvasWidth = 400;
  var canvasHeight = 400;
  var paddleWidth = 80;
  var paddleHeight = 10;
  var ballRadius = 10;
  var ballSpeed = 3;
  
  // Create the canvas element
  var canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.border = '1px solid black';
  
  // Append the canvas to the document body
  document.body.appendChild(canvas);
  
  // Get the canvas rendering context
  var ctx = canvas.getContext('2d');
  
  // Initialize the paddle position
  var paddleX = (canvasWidth - paddleWidth) / 2;
  
  // Initialize the ball position and velocity
  var ballX = canvasWidth / 2;
  var ballY = canvasHeight - ballRadius - paddleHeight;
  var ballDX = ballSpeed;
  var ballDY = -ballSpeed;
  
  // Function to draw the paddle
  function drawPaddle() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
  }
  
  // Function to draw the ball
  function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }
  
  // Function to update the game state
  function update() {
    // Move the paddle
    if (rightPressed && paddleX < canvasWidth - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }
    
    // Move the ball
    ballX += ballDX;
    ballY += ballDY;
    
    // Check for collision with walls
    if (ballX + ballRadius > canvasWidth || ballX - ballRadius < 0) {
      ballDX = -ballDX;
    }
    if (ballY - ballRadius < 0) {
      ballDY = -ballDY;
    }
    
    // Check for collision with paddle
    if (ballY + ballRadius > canvasHeight - paddleHeight && ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballDY = -ballDY;
    }
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw the paddle and ball
    drawPaddle();
    drawBall();
    
    // Request the next animation frame
    requestAnimationFrame(update);
  }
  
  // Keyboard event listeners
  var rightPressed = false;
  var leftPressed = false;
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
      rightPressed = true;
    } else if (event.key === 'ArrowLeft') {
      leftPressed = true;
    }
  });
  
  document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowRight') {
      rightPressed = false;
    } else if (event.key === 'ArrowLeft') {
      leftPressed = false;
    }
  });
  
  // Start the game
  update();
})();
