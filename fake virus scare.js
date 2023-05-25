javascript:(function() {
  var gifUrl = 'https://giphy.com/embed/74ySzYgrcYkKc'; // URL of the GIF you want to display
  var gifSize = 100; // Size of the GIF in pixels
  var speed = 5; // Speed of animation
  var initialDelay = 3000; // Initial delay in milliseconds before adding more GIFs
  var gifMultiplier = 2; // Factor to multiply the number of GIFs by
  var maxGifs = 16; // Maximum number of GIFs to display
  var text = 'your computer is now mine'; // Text to display
  var fontSize = 30; // Font size in pixels
  var colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8f00ff']; // Rainbow colors

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.overflow = 'hidden';

  var intervalId;
  var instances = [];
  var currentGifs = 1;

  function createGif() {
    var gifContainer = document.createElement('iframe');
    gifContainer.src = gifUrl;
    gifContainer.style.position = 'absolute';
    gifContainer.style.left = Math.random() * 100 + '%';
    gifContainer.style.top = Math.random() * 100 + '%';
    gifContainer.style.width = gifSize + 'px';
    gifContainer.style.height = gifSize + 'px';

    var directionX = Math.random() < 0.5 ? -1 : 1;
    var directionY = Math.random() < 0.5 ? -1 : 1;

    function animate() {
      var left = parseFloat(gifContainer.style.left) || 0;
      var top = parseFloat(gifContainer.style.top) || 0;
      var screenWidth = container.clientWidth;
      var screenHeight = container.clientHeight;

      if (left + gifSize >= screenWidth || left <= 0) {
        directionX *= -1;
      }
      if (top + gifSize >= screenHeight || top <= 0) {
        directionY *= -1;
      }

      gifContainer.style.left = (left + speed * directionX) + 'px';
      gifContainer.style.top = (top + speed * directionY) + 'px';
    }

    container.appendChild(gifContainer);
    instances.push(gifContainer);
    var gifIntervalId = setInterval(animate, 10);
    return gifIntervalId;
  }

  function createText() {
    var textContainer = document.createElement('div');
    textContainer.textContent = text;
    textContainer.style.position = 'absolute';
    textContainer.style.left = '50%';
    textContainer.style.top = '50%';
    textContainer.style.transform = 'translate(-50%, -50%)';
    textContainer.style.fontSize = fontSize + 'px';
    textContainer.style.fontWeight = 'bold';
    textContainer.style.whiteSpace = 'nowrap';
    textContainer.style.color = 'white';
    textContainer.style.textShadow = '0 0 5px black';

    var currentColorIndex = 0;
    var frame = 0;

    function animate() {
      textContainer.style.color = colors[currentColorIndex];
      currentColorIndex = (currentColorIndex + 1) % colors.length;
      textContainer.style.textShadow = `0 0 ${frame}px black`;

      frame = (frame + 1) % 10;

      var left = parseFloat(textContainer.style.left) || 0;
      var top = parseFloat(textContainer.style.top) || 0;
      var screenWidth = container.clientWidth;
      var screenHeight = container.clientHeight;
      var containerWidth = textContainer.clientWidth;
      var containerHeight = textContainer.clientHeight;

      if (left + containerWidth >= screenWidth || left <= 0) {
        textContainer.style.left = (left - speed) + 'px';
      }
      if (top + containerHeight >= screenHeight || top <= 0) {
        textContainer.style.top = (top - speed) + 'px';
      }
    }

    container.appendChild(textContainer);
    instances.push(textContainer);
    var textIntervalId = setInterval(animate, 100);
    return textIntervalId;
  }

  function addGifsAndText() {
    for (var i = 0; i < currentGifs; i++) {
      var gifIntervalId = createGif();
      instances.push(gifIntervalId);
    }

    var textIntervalId = createText();
    instances.push(textIntervalId);

    currentGifs *= gifMultiplier;
    if (currentGifs > maxGifs) {
      currentGifs = maxGifs;
    }
  }

  intervalId = setInterval(addGifsAndText, initialDelay);
  document.body.appendChild(container);
})();
