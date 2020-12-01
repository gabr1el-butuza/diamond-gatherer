const socket = io();

$("#join-btn").click(() => {
    const userName = $("#input-name").val();
    if (userName.length > 0) {
        $("#input-error").addClass("display-none");
        socket.emit("join-chat", userName);
    } else {
        $("#input-error").removeClass("display-none");
    }
});

socket.on("joined-chat", () => {
    console.log("You join on the chat!");
    $("#join-chat").addClass("display-none");
    $("#chat-container").removeClass("display-none");
});

$("#message-btn").click(() => {
    const mess = $("#input-message").val();
    const msgColor = $("#msg-color").val();
    socket.emit("send-message", mess, msgColor);
    // clear input
    $("#input-message").val("");
});

socket.on("new-message", (user, mess, msgColor) => {
    $("#chat-messages").append(`<p>${user} : <span style="color: ${msgColor}">${mess}</span></p>`);
});

$("#leave-btn").click(() => {
    socket.emit("leave-chat");
});

socket.on("menu", () => {
    console.log("You left chat!");
    $("#join-chat").removeClass("display-none");
    $("#chat-container").addClass("display-none");
});

socket.on("online-users", (onlineUsers) => {
    $("#onlineUsers").html(`Online users: ${onlineUsers}`);
});

socket.on("joined-left-user", (message) => {
    $("#chat-messages").append(message);
});