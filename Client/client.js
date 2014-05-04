$(function() {
	drawShitOnCanvas();
	var socket  = io.connect('http://localhost:4004'),
	text = $('#text');

	socket.on('connect', function () {
		text.html('connected');
		socket.on('message', function (msg) {
			text.html(msg);
		});
	});

	socket.on('disconnect', function () {
            text.html('disconnected');
        });
	
  var $window = $(window);
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box
  var $chatPage = $('.chat.page'); // The chatroom page

  // Draws pic + black border on the canvas.
  function drawShitOnCanvas () {
	var canvas = document.createElement("canvas");
	canvas.width = 500;
	canvas.height = 500;
	document.getElementById("canvasDiv").appendChild(canvas);
	var context = canvas.getContext('2d');
	context.fillStyle = "#0000FF";
	context.strokeStyle = "black";
	context.lineWidth = 10;
	context.fillRect(0,0,500,500);
	context.strokeRect(0,0,500,500);
	var pic = new Image();
	pic.onload = function()
	{
		context.drawImage(pic, 10, 10, 300, 300);
	}

	pic.src = 'images/420praiseit.png';
}

  // Sends a chat message
  function sendMessage () {
    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message
    if (message) {
      $inputMessage.val('');
      addChatMessage({
        message: message
      });
      // send the server a message
      socket.emit('message', message);
    }
  }

  // Adds the message to the browser
  function addChatMessage (data) {
    var messageBodyDiv = '<span class="messageBody">' +
      data.message + '</span>';

    var messageDiv = '<li class="message">' + messageBodyDiv + '</li>';
    var $messageDiv = $(messageDiv).data('username', data.username);

    addMessageElement($messageDiv);
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  function addMessageElement (el) {
    var $el = $(el);
	$messages.append($el);
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).html() || input;
  }

  // Keyboard events

  $window.keydown(function (event) {
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
        sendMessage();
    }
  });

  // Socket events

  // Whenever the server broadcasts a message, update the chat body
  socket.on('message', function (data) {
    addChatMessage(data);
  });
});