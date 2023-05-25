javascript:(function() {
  // Game configuration
  var gravity = 0.6;
  var jumpForce = -10;
  var pipeSpeed = 3;
  var gapHeight = 150;
  var pipeSpacing = 200;
  var pipeFrequency = 100;
  var birdSize = 40;

  // Game variables
  var bird;
  var pipes = [];
  var score = 0;
  var gameRunning = true;

  // Create bird element
  bird = document.createElement('div');
  bird.style.position = 'fixed';
  bird.style.left = '100px';
  bird.style.top = '50%';
  bird.style.transform = 'translateY(-50%)';
  bird.style.width = birdSize + 'px';
  bird.style.height = birdSize + 'px';
  bird.style.backgroundColor = '#f00';
  document.body.appendChild(bird);

  // Game loop
  function gameLoop() {
    if (!gameRunning) return;

    // Apply gravity to the bird
    var birdTop = parseFloat(bird.style.top);
    var birdVelocity = parseFloat(bird.dataset.velocity) || 0;
    birdVelocity += gravity;
    birdVelocity *= 0.9; // Air resistance
    bird.style.top = (birdTop + birdVelocity) + 'px';
    bird.dataset.velocity = birdVelocity;

    // Check collision with pipes
    for (var i = 0; i < pipes.length; i++) {
      var pipe = pipes[i];
      var pipeLeft = parseFloat(pipe.style.left);
      var pipeTop = parseFloat(pipe.style.top);
      var pipeWidth = parseFloat(pipe.style.width);
      var pipeHeight = parseFloat(pipe.style.height);

      if (collisionCheck(bird, pipe)) {
        endGame();
        return;
      }

      // Remove passed pipes
      if (pipeLeft + pipeWidth < 0) {
        document.body.removeChild(pipe);
        pipes.splice(i, 1);
        i--;
        score++;
      }

      // Move pipes
      pipe.style.left = (pipeLeft - pipeSpeed) + 'px';
    }

    // Generate new pipes
    if (Math.random() < (1 / pipeFrequency)) {
      createPipe();
    }

    // Update score
    updateScore();

    requestAnimationFrame(gameLoop);
  }

  // Create pipe element
  function createPipe() {
    var pipeTop = document.createElement('div');
    var pipeBottom = document.createElement('div');
    var pipeHeight = Math.random() * (window.innerHeight - gapHeight);
    pipeHeight = Math.max(50, pipeHeight); // Minimum height

    pipeTop.style.position = 'fixed';
    pipeTop.style.left = '100%';
    pipeTop.style.top = '0';
    pipeTop.style.width = '60px';
    pipeTop.style.height = pipeHeight + 'px';
    pipeTop.style.backgroundColor = '#0f0';

    pipeBottom.style.position = 'fixed';
    pipeBottom.style.left = '100%';
    pipeBottom.style.bottom = '0';
    pipeBottom.style.width = '60px';
    pipeBottom.style.height = (window.innerHeight - pipeHeight - gapHeight) + 'px';
    pipeBottom.style.backgroundColor = '#0f0';

    document.body.appendChild(pipeTop);
    document.body.appendChild(pipeBottom);
    pipes.push(pipeTop);
    pipes.push(pipeBottom);
  }

  // Check collision between two elements
  function collisionCheck(element1, element2) {
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();

    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  // Update score display
  function updateScore() {
    var scoreDisplay = document.getElementById('flappy-bird-score');
    if (!scoreDisplay) {
      scoreDisplay = document.createElement('div');
      scoreDisplay.id = 'flappy-bird-score';
      scoreDisplay.style.position = 'fixed';
      scoreDisplay.style.top = '10px';
      scoreDisplay.style.right = '10px';
      scoreDisplay.style.fontFamily = 'Arial, sans-serif';
      scoreDisplay.style.fontSize = '24px';
      scoreDisplay.style.color = '#000';
      document.body.appendChild(scoreDisplay);
    }
    scoreDisplay.textContent = 'Score: ' + score;
  }

  // Game over
  function endGame() {
    gameRunning = false;
    var gameOverText = document.createElement('div');
    var moreGamesButton = document.createElement('a');

    gameOverText.textContent = 'Game Over';
    gameOverText.style.position = 'fixed';
    gameOverText.style.top = '50%';
    gameOverText.style.left = '50%';
    gameOverText.style.transform = 'translate(-50%, -50%)';
    gameOverText.style.fontFamily = 'Arial, sans-serif';
    gameOverText.style.fontSize = '40px';
    gameOverText.style.color = '#000';

    moreGamesButton.href = 'https://github.com/idislikeapples/bookmarklets';
    moreGamesButton.target = '_blank';
    moreGamesButton.textContent = 'More Games';
    moreGamesButton.style.display = 'block';
    moreGamesButton.style.position = 'fixed';
    moreGamesButton.style.bottom = '10px';
    moreGamesButton.style.left = '50%';
    moreGamesButton.style.transform = 'translateX(-50%)';
    moreGamesButton.style.padding = '10px 20px';
    moreGamesButton.style.background = '#000';
    moreGamesButton.style.color = '#fff';
    moreGamesButton.style.fontFamily = 'Arial, sans-serif';
    moreGamesButton.style.fontSize = '16px';
    moreGamesButton.style.textDecoration = 'none';

    document.body.appendChild(gameOverText);
    document.body.appendChild(moreGamesButton);
  }

  // Game start
  gameLoop();

  // User input
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
      var birdVelocity = parseFloat(bird.dataset.velocity) || 0;
      birdVelocity = jumpForce;
      bird.dataset.velocity = birdVelocity;
    }
  });
})();
