javascript:(function() {
  var basketSize = 80; // Size of the basket in pixels
  var basketSpeed = 10; // Speed of basket movement in pixels
  var emojiSize = 50; // Size of the falling emojis in pixels
  var emojiSpeed = 5; // Speed of falling emojis in pixels
  var score = 0; // Initial score

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.overflow = 'hidden';

  var basket = document.createElement('div');
  basket.style.position = 'absolute';
  basket.style.bottom = '10px';
  basket.style.left = '50%';
  basket.style.transform = 'translateX(-50%)';
  basket.style.width = basketSize + 'px';
  basket.style.height = basketSize + 'px';
  basket.style.background = 'yellow';
  basket.style.border = '2px solid black';

  var scoreText = document.createElement('div');
  scoreText.style.position = 'absolute';
  scoreText.style.top = '10px';
  scoreText.style.right = '10px';
  scoreText.style.fontSize = '24px';
  scoreText.textContent = 'Score: ' + score;

  var rainbowMessage1 = document.createElement('div');
  rainbowMessage1.textContent = 'idislikeapples on github! - Jeremy';
  rainbowMessage1.style.position = 'absolute';
  rainbowMessage1.style.bottom = '10px';
  rainbowMessage1.style.left = '10px';
  rainbowMessage1.style.fontSize = '16px';
  rainbowMessage1.style.color = 'white';
  rainbowMessage1.style.textShadow = '0 0 5px #ff0000, 0 0 5px #ff7f00, 0 0 5px #ffff00, 0 0 5px #00ff00, 0 0 5px #0000ff, 0 0 5px #4b0082, 0 0 5px #8f00ff';

  var rainbowMessage2 = document.createElement('div');
  rainbowMessage2.textContent = 'ihateapples on github! - yef';
  rainbowMessage2.style.position = 'absolute';
  rainbowMessage2.style.bottom = '10px';
  rainbowMessage2.style.right = '10px';
  rainbowMessage2.style.fontSize = '16px';
  rainbowMessage2.style.color = 'white';
  rainbowMessage2.style.textShadow = '0 0 5px #ff0000, 0 0 5px #ff7f00, 0 0 5px #ffff00, 0 0 5px #00ff00, 0 0 5px #0000ff, 0 0 5px #4b0082, 0 0 5px #8f00ff';

  var emojiInterval;

  function createEmoji() {
    var emoji = document.createElement('div');
    emoji.textContent = getEmoji();
    emoji.style.position = 'absolute';
    emoji.style.top = '0';
    emoji.style.left = Math.random() * 100 + '%';
    emoji.style.fontSize = emojiSize + 'px';

    container.appendChild(emoji);

    function animate() {
      var top = parseFloat(emoji.style.top) || 0;
      emoji.style.top = (top + emojiSpeed) + 'px';

      if (top + emojiSize >= window.innerHeight) {
        if (isCaught(emoji)) {
          increaseScore();
        }
        container.removeChild(emoji);
        clearInterval(emojiInterval);
      }
    }

    emojiInterval = setInterval(animate, 20);
  }

  function getEmoji() {
    var emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪'];
    var randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  }

  function isCaught(emoji) {
    var basketRect = basket.getBoundingClientRect();
    var emojiRect = emoji.getBoundingClientRect();

    return (
      emojiRect.left >= basketRect.left &&
      emojiRect.right <= basketRect.right &&
      emojiRect.bottom <= basketRect.bottom
    );
  }

  function increaseScore() {
    score++;
    scoreText.textContent = 'Score: ' + score;
  }

  function moveBasket(direction) {
    var basketRect = basket.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();
    var containerWidth = containerRect.width;

    var newLeft;

    if (direction === 'left') {
      newLeft = basketRect.left - basketSpeed;
      if (newLeft < 0) {
        newLeft = 0;
      }
    } else if (direction === 'right') {
      newLeft = basketRect.left + basketSpeed;
      if (newLeft + basketSize > containerWidth) {
        newLeft = containerWidth - basketSize;
      }
    }

    basket.style.left = newLeft + 'px';
  }

  function handleKeyDown(event) {
    var key = event.key;
    if (key === 'ArrowLeft') {
      moveBasket('left');
    } else if (key === 'ArrowRight') {
      moveBasket('right');
    }
  }

  document.addEventListener('keydown', handleKeyDown);
  container.appendChild(basket);
  container.appendChild(scoreText);
  container.appendChild(rainbowMessage1);
  container.appendChild(rainbowMessage2);
  document.body.appendChild(container);

  setInterval(createEmoji, 1000);
})();
