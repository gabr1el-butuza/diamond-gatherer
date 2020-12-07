const server = require('../gameServer');

class Game {
    constructor(options) {
        this.id = options.id;
        this.players = options.players;
        this.name = options.name;
        this.gameInterval;
        this.start();

    }

    start() {
        const that = this;
        this.gameInterval = setInterval(function() { server.gameLoop(that.id) }, 1000 / 60);
    }

    update() {
        this.players.forEach(function(player) {
            player.move();
        })
    }

    // CLEAR INTERVAL
    stop() {
        console.log("STOP INTERVAL |><><><><|");
        clearInterval(this.gameInterval);
    }
}

module.exports = Game;