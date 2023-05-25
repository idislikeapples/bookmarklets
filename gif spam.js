javascript:(function() {
  var gifUrl = 'https://giphy.com/embed/74ySzYgrcYkKc'; // Replace with your GIF URL
  var gifSize = 100; // Size of the GIF in pixels
  var speed = 5; // Speed of animation
  var initialDelay = 1000; // Initial delay in milliseconds before adding more GIFs
  var gifMultiplier = 2; // Factor to multiply the number of GIFs by
  var maxGifs = 100; // Maximum number of GIFs to display

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.overflow = 'hidden';

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

  function addGifs() {
    for (var i = 0; i < currentGifs; i++) {
      var gifIntervalId = createGif();
      instances.push(gifIntervalId);
    }

    currentGifs *= gifMultiplier;
    if (currentGifs > maxGifs) {
      currentGifs = maxGifs;
    }
  }

  function startSpam() {
    var intervalId = setInterval(addGifs, initialDelay);
    setTimeout(function() {
      clearInterval(intervalId);
    }, initialDelay * 100);
  }

  startSpam();
