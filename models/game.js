const server = require('../gameServer');
const Diamond = require('./diamond');

class Game {
    constructor(options) {
        this.id = options.id;
        this.players = options.players;
        this.name = options.name;
        this.gameInterval;
        this.diamonds = [];
        this.bullets = [];
        this.totalDiamonds = 30;
        this.over = false;
        this.diamondsNr = this.totalDiamonds;
        this.start();

    }

    start() {
        const that = this;
        this.gameInterval = setInterval(function () { server.gameLoop(that.id) }, 1000 / 60);
    }

    update() {
        if (this.inProgress() && this.players[0].score + this.players[1].score === this.totalDiamonds) {
            this.over = true;
            this.winner = this.players[0].score > this.players[1].score ? 'space-ranger' : 'pink-lady';
            return;
        }
        this.players.forEach(function (player) {
            player.update();
        })
        this.bullets.forEach((bullet, index) => {
            if (bullet.distance <= 0) {
                delete this.bullets[index];
                //Corectare tema
                // console.log(this.players);
                this.players[0].shoot = false;
                this.players[1].shoot = false;
            } else {
                bullet.update();
            }
        })
    }

    // CLEAR INTERVAL
    stop() {
        clearInterval(this.gameInterval);
    }

    generateDiamonds() {
        for (let i = 0; i < this.totalDiamonds; i++) {
            this.diamonds.push(new Diamond());
        }
    }

    inProgress() {
        return this.players.length == 2;
    }
}

module.exports = Game;