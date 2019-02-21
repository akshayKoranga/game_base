//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:9000', {reconnect: true});
// Add a connect listener
socket.on('connect', function (socket) {
   console.log('Connected!');
});

socket.emit('addUser', '15fccf7e32429c5841f05a43e73525a1c719c8a8', function (data) { // args are sent in order to acknowledgement function
   console.log(data); // data will be 'tobi says woot'
 });

 socket.emit('sendChallange', {
   "game_user_by": "15fccf7e32429c5841f05a43e73525a1c719c8a8",
   "game_user_with": "c054a901c6819de2fb589c9a81fa6e1d0cbe3fdb"
})