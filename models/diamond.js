const RIGHT_EDGE = 860;
const DOWN_EDGE = 540;

class Diamond {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.imageId = 'diamond';
        this.width = 26;
        this.height = 21;
        this.randomValues();
    }

    forDraw() {
        return {
            imageId: this.imageId,
            drawImageParameters: [
                this.x,
                this.y
            ]
        }
    }

    //TEMA CURS 5.1
    randomValues() {
        let xr, yr;
        xr = Math.floor(Math.random() * RIGHT_EDGE + 50);
        yr = Math.floor(Math.random() * DOWN_EDGE + 50);
        console.log(`xr: ${xr}, yr: ${yr}`);
        //Corectare tema 
        if (xr > 195 && xr < 775 || yr > 191 && yr < 481) {
            this.x = xr;
            this.y = yr;
            //console.log(`XR = ${xr}, YR = ${yr}`);
        } else {
            this.randomValues();
        }
    }
}

module.exports = Diamond;
