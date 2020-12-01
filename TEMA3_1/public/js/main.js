const socket = io();

$(document).ready(function() {
    socket.emit("join-counting-party");
    socket.on("joined-party", (counter) => {
        $("#showCounter").html(counter);
    });

});

$("#counter-btn").click(() => {
    socket.emit("gather");
});

socket.on("counter-gather", (counter) => {
    $("#showCounter").html(counter);
});