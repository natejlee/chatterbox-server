// YOUR CODE HERE:
var app = {
  server: 'http://127.0.0.1:3000',
  friendList: {},
  results: [],

  init: function(){
    app.fetch();
    app.addFriend();
    app.handleSubmit();

  },

  send: function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      var newData = {
        username: message.username,
        text: message.text,
        roomname: message.room
      };
      console.log(data);
      console.log(message);
      app.addMessage(newData);
      app.fetch();
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });


  },
  fetch: function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();

        for(var i = 0; i < data['results'].length; i++ ) {
          var eachOne = data['results'][i];
          app.addMessage(eachOne);
        }
        console.log(data);
          // var room = data['results'][i].roomname;

        console.log('chatterbox: Messages Received');

      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
       console.error('chatterbox: Failed to receive message');
      }
  });

  },


  addMessage: function(message) {
    var text = "<span id='words'>" + _.escape(message.text) + "</span>"
    var user = "<span class=username>" + _.escape(message.username) + "</span>"
    var sentence = "<div class='set'>" + user +": " + text + "</div>";
    $('#chats').append(sentence);
  },

  clearMessages: function() {

    $('#chats').empty()
  },

  getRoom: function(){

    return data.roomname;
  },

  addRoom: function(roomName) {

    var rooms = "<div class ='room'>" + roomName + "</div>"
    $("#roomSelect").append(rooms);
  },

  addFriend: function(){
    app.getFriend();
  },

  getFriend: function(){

    $('#chats').on('click', '.username', function(event){
       var user = $(this).text();

       if(app.friendList[user] === undefined){
         app.friendList[user] = user;
         $('#friends').append('<div>' + user +'</div>');
       }

    });

  },

  handleSubmit: function() {
    var inputBox = "<span><form>" + "<input id='inputBox' type=text placeholder='your message'/>"+ "<input type='submit'/>"+ "</form></span>";
    $('#main h1').after(inputBox);
    $('#chats').before('<ul class="rooms"></ul>');

    $('form').submit(function(event) {
       event.preventDefault();
        var url = document.URL;
        var user = url.substr(url.indexOf("=") +1,url.length -1);
        var message = $('input').val();
        var room = '';
        var data = {username: user, text: message, roomname:room};
        app.send(data);
        $('#inputBox').val('');
     });
  }

}

app.init();
