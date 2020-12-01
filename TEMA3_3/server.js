const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = 3000;
const io = require('socket.io')(http);
// import class
const Player = require(__dirname + "/public/js/player.js");
const Game = require(__dirname + "/public/js/game.js");

http.listen(port, function() {
    console.log(`[SERVER STARTED AT PORT ${port}]`);
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/about', function(request, response) {
    response.sendFile(__dirname + '/about.html');
});

app.use(express.static(__dirname + '/public'));

const users = {};
var usersSize = 0;
const games = {};
//const PLAYER_DIM = 32;

io.on('connection', (socket) => {
    console.log(`A USER CONNECT WITH: ${socket.id}`);

    socket.on("join-chat", (userName) => {
        console.log(`A user with id: ${socket.id} and name: ${userName} connect to chat.`);
        users[socket.id] = userName;
        socket.join("chat");
        socket.emit("joined-chat");
        usersSize = Object.keys(users).length;
        io.to("chat").emit("online-users", usersSize);
        socket.broadcast.to("chat").emit("joined-left-user", `<p>${userName} joined chat!</p>`);

    });

    socket.on("send-message", (mess, msgColor) => {
        io.to("chat").emit("new-message", users[socket.id], mess, msgColor);
    })

    socket.on("leave-chat", () => {
        console.log(`[USER ${socket.id} LEFT ROOM CHAT]`);
        var user = users[socket.id];
        delete users[socket.id];
        socket.leave("chat");
        socket.emit("menu");
        usersSize = Object.keys(users).length;
        io.to("chat").emit("online-users", usersSize);
        socket.broadcast.to("chat").emit("joined-left-user", `<p>${user} left chat!</p>`);
    });

    // create game
    socket.on('create-game', function(gameName) {
        console.log('[NEW GAME CREATED]');
        const gameId = 'game-' + socket.id;
        const players = [new Player()];
        const game = new Game({
            id: gameId,
            players: players
        });
        games[gameId] = game;
        console.log(gameId);
        console.log('[User joined ' + gameId + '] room');
        socket.join(gameId);
        start(gameId);
    })
});

function start(gameId) {
    setInterval(function() { gameLoop(gameId) }, 1000 / 60);
}

function gameLoop(id) {
    const objectsForDraw = [];
    games[id].players.forEach(function(player) {
        objectsForDraw.push(player.forDraw());
    })
    io.to(id).emit('game-loop', objectsForDraw);
}