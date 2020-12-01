class Player {
    constructor() {
        this.x = 80;
        this.y = 127;
        this.dx = 0;
        this.dy = 0;
        this.imageId = 'space-ranger';
        this.direction = 'down';
        this.imageStartPoints = {
            right: [193, 225],
            left: [131, 161],
            down: [65, 98],
            up: [0, 33]
        };
        this.PLAYER_DIM = 32;
    }

    forDraw() {
        return {
            imageId: this.imageId,
            drawImageParameters: [
                this.imageStartPoints[this.direction][0],
                0,
                this.PLAYER_DIM,
                this.PLAYER_DIM,
                this.x,
                this.y,
                this.PLAYER_DIM,
                this.PLAYER_DIM
            ]
        }
    }
}

module.exports = Player;