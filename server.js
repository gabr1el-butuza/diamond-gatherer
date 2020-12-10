const chatServer = require('./chatServer');
const gameServer = require('./gameServer');
const chatPort = 5050;
const gamePort = 3000;

// Access to public file(main.js, style.js ...)
chatServer.chatApp.use(chatServer.express.static(__dirname + '/public'));
gameServer.gameApp.use(chatServer.express.static(__dirname + '/public'));

// Starting server
chatServer.httpChat.listen(chatPort, function () {
    console.log(`[CHAT SERVER STARTED AT PORT ${chatPort}]`);
});

gameServer.httpGame.listen(gamePort, function () {
    console.log(`[GAME SERVER STARTED AT PORT ${gamePort}]`);
});

// Server response
chatServer.chatApp.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

gameServer.gameApp.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

// app.get('/about', function(request, response) {
//     response.sendFile(__dirname + '/about.html');
// });