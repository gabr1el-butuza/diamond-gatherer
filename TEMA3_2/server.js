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

const users = {};
var usersSize = 0;

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
});