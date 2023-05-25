javascript:(function() {
  var message = prompt('Enter your message:');

  // Send message through the communication channel
  localStorage.setItem('bookmarkletMessenger', message);
})();

