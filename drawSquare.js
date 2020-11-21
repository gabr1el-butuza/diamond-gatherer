document.getElementById("backBtn").onclick = function() {
    location.href = "/index.html";
};

const canvas = document.getElementById("drawCanvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

document.getElementById("drawBtn").onclick = function() {
    var color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    const x = 570;
    const y = 370;
    ctx.fillStyle = color;
    ctx.fillRect(randomCoordinate(x), randomCoordinate(y), 30, 30); //x, y, width, height
};

function randomCoordinate(value) {
    var z = Math.floor((Math.random() * value) + 1);
    return z;
}