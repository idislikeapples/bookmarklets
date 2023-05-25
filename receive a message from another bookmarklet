javascript:(function() {
  // Continuously check for new messages
  setInterval(function() {
    // Retrieve message from the communication channel
    var message = localStorage.getItem('bookmarkletMessenger');

    // Check if there is a new message
    if (message) {
      // Display the message
      alert('New Message: ' + message);

      // Clear the message in the communication channel
      localStorage.removeItem('bookmarkletMessenger');
    }
  }, 1000); // Check every 1 second
})();
