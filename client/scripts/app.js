// YOUR CODE HERE:

/* $.ajax({
 url: "test.html",
 context: document.body
 })*/

setInterval(function(){
  $.ajax({
    url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    dataType: 'json',
    success: function (results) {
      displayMessages(results);
    }
  }) ;
}, 1000);

var uniqueRooms = {};

var displayMessages = function (obj) {
  console.log(obj);
  var results = obj.results;
  var chats = $('#chats');
  var $roomList = $('#roomList');

  for(var i=0; i<results.length; i++) {
    var currentRoom = results[i].roomname;

    if (uniqueRooms[currentRoom] === undefined) {
      uniqueRooms[currentRoom] = currentRoom;
      var $options = $('<option></option>');    // <option value="volvo">Volvo</option>
      $options.attr('value', currentRoom);
      $options.text(currentRoom);
      $options.appendTo($roomList);
    }


    var $messageContainer = $('<article class="chat"></article>');

    var username = results[i].username;
    var message = results[i].text;
    var $username = $('<p class="username"></p>');
    var $message = $('<p></p>');
    $username.appendTo($messageContainer);
    $message.appendTo($messageContainer);
    $username.text(username);
    $message.text(message);
    $messageContainer.appendTo(chats);

  }

};


