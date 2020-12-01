const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = 3000;
const io = require('socket.io')(http);

http.listen(port, function() {
    console.log(`[SERVER STARTED AT PORT ${port}]`);
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

var counter = 0;

io.on("connection", (socket) => {
    socket.on("join-counting-party", () => {
        console.log(`A user with id: ${socket.id} connect to counting party.`);
        socket.join("counting-party");
        socket.emit("joined-party", counter);
    });

    socket.on("gather", () => {
        io.to("counting-party").emit("counter-gather", ++counter);
    })
});