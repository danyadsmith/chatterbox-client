// YOUR CODE HERE:

/* $.ajax({
 url: "test.html",
 context: document.body
 })*/
(function (global) {
  var app = {};

  app.server = 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages';
  app.username = window.location.search.split('username=')[1];
  app.uniqueRooms = {};
  app.friends = [];

  app.init = function () {
    $(document).ready(function() {
      $('#chats').on('click', '.username', app.handleUsernameClick);
      $('#send').on('click', '.submit', app.handleSubmit);
    });
    setInterval(function () {
      app.fetch();
    }, 1000);
  };

  app.fetch = function () {
    var call = $.ajax({
      url: app.server,
      type: 'GET',
      dataType: 'json',
      data: {
        'order': '-createdAt'
      },
      success: function (results) {
        app.displayMessages(results);
      }
    });
    //
    // call.done(function (data, textStatus, jqXHR) {
    //   console.log('data: ' +  JSON.stringify(data) + '\n' + 'textStatus: ' + textStatus + '\n' + 'jqXHR: ' + JSON.stringify(jqXHR));
    // });
  };

  app.send = function (message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      dataType: 'json',
      success: function (results) {

      }
    });
  };

  app.sendMessage = function () {
    var txtMessage = $('.sendMsg input').val();
    var selectedRoom = $('#roomSelect').val();
    var msg = {
      'username': app.username,
      'text': txtMessage,
      'roomname': selectedRoom
    };
    //console.log(msg);
    app.send(msg);
  };

  app.clearMessages = function () {
    $('#chats').text('');
  };


  app.renderMessage = function (message) {
    var chats = $('#chats');
    var $messageContainer = $('<article class="chat"></article>');

    var username = message.username;
    var msgText = message.text;
    var $username = $('<p class="username"></p>');
    var $message = $('<p></p>');

    $username.appendTo($messageContainer);
    $message.appendTo($messageContainer);
    $username.text(username);
    $message.text(msgText);
    $messageContainer.appendTo(chats);
  };

  app.displayMessages = function (obj) {
    //console.log(obj);
    var results = obj.results;
    var chats = $('#chats');
    var $roomList = $('#roomSelect');
    var selectedRoom = $('#roomSelect').val();

    app.clearMessages();

    for (var i = 0; i < results.length; i++) {
      var currentRoom = results[i].roomname;

      if (currentRoom !== undefined && app.uniqueRooms[currentRoom] === undefined) {
        app.renderRoom(currentRoom);
      }

      if (selectedRoom === 'new-room') {
        app.renderMessage(results[i]);
      } else if (selectedRoom === currentRoom) {
        app.renderMessage(results[i]);
      }

    }
  };

  app.renderRoom = function (room) {
    var room = room || $('.addRoom input').val();

    var $roomList = $('#roomSelect');
    var selectedRoom = $('#roomSelect').val();

    app.uniqueRooms[room] = room;
    var $options = $('<option></option>');
    $options.attr('value', room);
    $options.text(room);
    $options.appendTo($roomList);
    $('.addRoom input').val('');
  };

  app.handleUsernameClick = function (event) {
    app.friends.push(event.target.innerText);
  };

  app.handleSubmit = function () {
    app.sendMessage();
  };

  global.app = app;
  app.init();

}(window));
