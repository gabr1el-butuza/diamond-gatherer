// ________________________TEMA 2 ________________________
// 2.1
console.log("-----2.1-----");
const arr1 = ["Love", "I", "Javascript"];

console.log(`arr inainte de modificare: ${arr1}`);

arr1.splice(1, 1);
arr1.unshift("I");

console.log(`arr dupa modificare: ${arr1}`);

//2.2 
console.log("-----2.2-----");
const arr2 = ["Paul", 1, false, { name: "Jon Snow" },
    [1, 2, 3], null, undefined,
    function() { console.log('Test') }
];

arr2.forEach((item, index, ) => {
    console.log(`pozitia: ${index} >>> valoare: ${item} >>> tipul: ${typeof item}`);
});

//2.3 --- 2.4
const canvas = document.getElementById("canvasId");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

let [marioX, marioY] = [100, 100];
const mario = new Image();

getMarioImg();
initMario();
document.addEventListener("keydown", function(event) {
    context.clearRect(0, 0, 604, 400);
    var keyCode = event.keyCode;
    var [canvasWidth, canvasHeight] = [canvas.width, canvas.height];
    switch (keyCode) {
        case 87: //up
            {
                if (marioY > 0) {
                    marioY -= 10;
                }
                break;
            }
        case 83: //down
            {
                if (marioY < canvasHeight - 30) {
                    marioY += 10;
                }
                break;
            }
        case 65: //left
            {
                if (marioX > 0) {
                    marioX -= 10;
                }
                break;
            }
        case 68: //right
            {
                if (marioX < canvasWidth - 30) {
                    marioX += 10;
                }
                break;
            }
    }
    drawMario(marioX, marioY);
});

function getMarioImg() {
    mario.src = 'assets/mario.png'
}

function initMario() {
    mario.onload = () => {
        drawMario(marioX, marioY);
    }
}

function drawMario(marioX, marioY) {
    const [MARIO_WIDTH, MARIO_HEIGHT] = [32, 39];
    context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT)

}

//2.5
document.getElementById("btn").onclick = function() {
    location.href = "/drawSquare.html";
};

//2.6
console.log("-----2.6-----");
import { Rocket } from './rocket.js';

console.log("----- Rocket 1 ---->");
const rocket1 = new Rocket("Sentinel", 25000, 6000, 5000, 0);
rocket1.launch() ? rocket1.distanceTravelledByTheRocket(100000) && rocket1.land() : "";

console.log("----- Rocket 2 ---->");
const rocket2 = new Rocket("Falcon", 50000, 10000, 21000, 0);
rocket2.launch() ? rocket2.distanceTravelledByTheRocket(500000) && rocket2.land() : "";

console.log("----- Rocket 3---->");
const rocket3 = new Rocket("Falcon", 42000, 20000, 2000, 0);
rocket3.launch() ? rocket3.distanceTravelledByTheRocket(2000000) && rocket3.land() : "";