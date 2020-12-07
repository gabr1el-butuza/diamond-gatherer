const express = require('express');
const chatApp = express();
const httpChat = require('http').createServer(chatApp);
const port = 5050;
const io = require('socket.io')(httpChat);

// http.listen(port, function() {
//     console.log(`[SERVER STARTED AT PORT ${port}]`);
// });

//chatApp.use(express.static(__dirname + '/public'));

const chatUsers = {};
var usersSize = 0;

io.on("connection", (socket) => {
    socket.on("join-chat", (userName) => {
        console.log(`A user with id: ${socket.id} and name: ${userName} connect to chat.`);
        chatUsers[socket.id] = userName;
        socket.join("chat");
        socket.emit("joined-chat");
        usersSize = Object.keys(chatUsers).length;
        io.to("chat").emit("online-users", usersSize);
        socket.broadcast.to("chat").emit("joined-left-user", `<p>${userName} joined chat!</p>`);

    });

    socket.on("send-message", (mess, msgColor) => {
        io.to("chat").emit("new-message", chatUsers[socket.id], mess, msgColor);
    })

    socket.on("leave-chat", () => {
        console.log(`[USER ${socket.id} LEFT ROOM CHAT]`);
        var user = chatUsers[socket.id];
        delete chatUsers[socket.id];
        socket.leave("chat");
        socket.emit("menu");
        usersSize = Object.keys(chatUsers).length;
        io.to("chat").emit("online-users", usersSize);
        socket.broadcast.to("chat").emit("joined-left-user", `<p>${user} left chat!</p>`);
    });
});

module.exports.httpChat = httpChat;
module.exports.chatApp = chatApp;
module.exports.express = express;