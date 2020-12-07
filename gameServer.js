const express = require('express');
const gameApp = express();
const httpGame = require('http').createServer(gameApp);
const port = 3000;
const io = require('socket.io')(httpGame);

//gameApp.use(express.static(__dirname + '/public'));

// import classes
const Game = require("./models/game");
const SpaceRanger = require('./models/space_ranger');
const PinkLady = require('./models/pink_lady');

const games = {};
const players = {};

io.on('connection', (socket) => {
    console.log(`A USER CONNECT WITH: ${socket.id}`);

    socket.join('menu');

    Object.keys(games).forEach(function(gameId) {
        if (games[gameId].players.length === 1) {
            socket.emit('add-game-to-list', { gameName: games[gameId].name, gameId: gameId })
        }
    })

    // create game
    socket.on('create-game', function(gameName) {
        console.log('[NEW GAME CREATED]');
        const gameId = 'game-' + socket.id;
        players[socket.id] = new SpaceRanger({ gameId: gameId, socketId: socket.id });
        const game = new Game({
            id: gameId,
            players: [players[socket.id]],
            name: gameName
        });
        games[gameId] = game;
        console.log(gameId);
        console.log('[User joined ' + gameId + '] room');
        socket.join(gameId);
        io.to('menu').emit('add-game-to-list', { gameName: gameName, gameId: gameId })
    });

    socket.on('start-moving-player', function(direction) {
        if (players[socket.id]) {
            players[socket.id].startMoving(direction);
        }
    });

    socket.on('stop-moving-player', function(axis) {
        if (players[socket.id]) {
            players[socket.id].stopMoving(axis);
        }
    });

    socket.on('join-game', function(gameId) {
        console.log(`[SOCKET ${socket.id} JOINED GAME ${gameId}]`);
        players[socket.id] = new PinkLady({ gameId: gameId, socketId: socket.id });
        games[gameId].players.push(players[socket.id]);
        socket.join(gameId);
        io.to('menu').emit('remove-game-from-list', gameId);
    })

    socket.on('disconnect', function() {
        console.log(`[SOCKET ${socket.id} DISCONNECTED]`);
        if (players[socket.id]) {
            const gameId = players[socket.id].gameId;
            const game = games[gameId];
            const playersToRemoveIds = game.players.map(function(player) {
                    return player.socketId;
                })
                // When game is over, stop game loop with clearInterval
            clearInterval(game.stop());
            delete games[gameId];
            playersToRemoveIds.forEach(function(playerToRemoveId) {
                delete players[playerToRemoveId];
            })
            io.to(gameId).emit('game-over', 'A player disconnected');
        }
    })
});

function gameLoop(id) {
    if (games[id]) {
        games[id].update();
        const objectsForDraw = [];
        games[id].players.forEach(function(player) {
            objectsForDraw.push(player.forDraw());
        })
        io.to(id).emit('game-loop', objectsForDraw);
    }
}

module.exports.gameLoop = gameLoop;
module.exports.httpGame = httpGame;
module.exports.gameApp = gameApp;