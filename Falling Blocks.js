javascript:(function() {
  var gameContainer = document.createElement('div');
  gameContainer.style.position = 'fixed';
  gameContainer.style.top = '0';
  gameContainer.style.left = '0';
  gameContainer.style.width = '100%';
  gameContainer.style.height = '100%';
  gameContainer.style.background = '#000';
  gameContainer.style.display = 'flex';
  gameContainer.style.justifyContent = 'center';
  gameContainer.style.alignItems = 'center';
  gameContainer.style.overflow = 'hidden';

  var scoreContainer = document.createElement('div');
  scoreContainer.style.position = 'absolute';
  scoreContainer.style.top = '10px';
  scoreContainer.style.right = '10px';
  scoreContainer.style.color = '#fff';
  scoreContainer.style.fontFamily = 'Arial, sans-serif';
  scoreContainer.style.fontSize = '20px';

  var canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 600;
  canvas.style.border = '1px solid #fff';

  var ctx = canvas.getContext('2d');
  var score = 0;

  gameContainer.appendChild(scoreContainer);
  gameContainer.appendChild(canvas);
  document.body.appendChild(gameContainer);

  function updateScore() {
    scoreContainer.textContent = 'Score: ' + score;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function Block(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = function() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.moveDown = function() {
      this.y += 10;
    };

    this.isCollision = function() {
      return this.y + this.height >= canvas.height;
    };
  }

  function Player(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = function() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.moveLeft = function() {
      this.x -= 10;
      if (this.x < 0) {
        this.x = 0;
      }
    };

    this.moveRight = function() {
      this.x += 10;
      if (this.x + this.width > canvas.width) {
        this.x = canvas.width - this.width;
      }
    };

    this.isCollision = function(block) {
      return (
        this.x < block.x + block.width &&
        this.x + this.width > block.x &&
        this.y < block.y + block.height &&
        this.y + this.height > block.y
      );
    };
  }

  var player = new Player(180, 550, 40, 40, '#fff');
  var blocks = [];

  function createBlock() {
    var width = getRandomInt(20, 80);
    var height = 20;
    var x = getRandomInt(0, canvas.width - width);
    var y = -height;
    var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    var block = new Block(x, y, width, height, color);
    blocks.push(block);
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.draw();

    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      block.draw();
      block.moveDown();

      if (player.isCollision(block)) {
        gameover();
        return;
      }

      if (block.isCollision()) {
        score++;
        updateScore();
        blocks.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(update);
  }

  function gameover() {
    gameContainer.removeEventListener('mousemove', handleMouseMove);
    showGameOverMessage();
  }

  function showGameOverMessage() {
    var messageContainer = document.createElement('div');
    messageContainer.style.position = 'absolute';
    messageContainer.style.top = '50%';
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translate(-50%, -50%)';
    messageContainer.style.color = '#fff';
    messageContainer.style.fontFamily = 'Arial, sans-serif';
    messageContainer.style.fontSize = '30px';
    messageContainer.style.textAlign = 'center';
    messageContainer.textContent = 'Game Over\nScore: ' + score;

    var moreGamesButton = document.createElement('a');
    moreGamesButton.href = 'https://github.com/idislikeapples/bookmarklets';
    moreGamesButton.target = '_blank';
    moreGamesButton.style.display = 'block';
    moreGamesButton.style.marginTop = '20px';
    moreGamesButton.style.color = '#fff';
    moreGamesButton.style.textDecoration = 'none';
    moreGamesButton.textContent = 'More Games';

    messageContainer.appendChild(moreGamesButton);
    gameContainer.appendChild(messageContainer);
  }

  function handleMouseMove(event) {
    player.x = event.clientX - canvas.getBoundingClientRect().left - player.width / 2;
  }

  gameContainer.addEventListener('mousemove', handleMouseMove);

  setInterval(createBlock, 1000);

  update();
})();
