const socket = io();

const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

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
    $("#menu").addClass("display-none");
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
    $("#menu").removeClass("display-none");
    $("#chat-container").addClass("display-none");
});

socket.on("online-users", (onlineUsers) => {
    $("#onlineUsers").html(`Online users: ${onlineUsers}`);
});

socket.on("joined-left-user", (message) => {
    $("#chat-messages").append(message);
});

socket.on("menu", function() {
    console.log("You left chat!");
    document.getElementById("menu").classList.remove("display-none");
    document.getElementById("chat-container").classList.add("display-none");
})

$("#create-game-button").click(() => {
    const userName = $("#game-name-input").val();
    if (userName.length > 0) {
        $("#game-name-missing").addClass("display-none");
        socket.emit("create-game", userName);
    } else {
        $("#game-name-missingr").removeClass("display-none");
    }
});

socket.on('game-loop', function(objectsForDraw) {
    $("#menu").addClass("display-none");
    $("#game-container").removeClass("display-none");
    const img = $("#map-image")[0];
    context.drawImage(img, 0, 0);

    objectsForDraw.forEach(function(objectForDraw) {
        context.drawImage(
            document.getElementById(objectForDraw.imageId),
            ...objectForDraw.drawImageParameters
        )
    })
});

document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case 'ArrowUp':
            socket.emit('start-moving-player', 'up');
            break;
        case 'ArrowDown':
            {
                socket.emit('start-moving-player', 'down');
                break;
            }
        case 'ArrowLeft':
            {
                socket.emit('start-moving-player', 'left');
                break;
            }
        case 'ArrowRight':
            {
                socket.emit('start-moving-player', 'right');
                break;
            }
    }
})

document.addEventListener('keyup', function(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            socket.emit('stop-moving-player', 'dy');
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            socket.emit('stop-moving-player', 'dx');
            break;
    }
});

socket.on('add-game-to-list', function(options) {
    const gameElementContainer = document.createElement('div');
    gameElementContainer.classList.add('game-element');
    gameElementContainer.id = options.gameId;

    const gameNameElement = document.createElement('p');
    gameNameElement.innerHTML = options.gameName;
    const joinGameButton = document.createElement('button');
    joinGameButton.innerHTML = 'Join Game!';

    joinGameButton.addEventListener('click', function() {
        socket.emit('join-game', options.gameId);
    })

    gameElementContainer.appendChild(gameNameElement);
    gameElementContainer.appendChild(joinGameButton);

    document.getElementById('game-list').appendChild(gameElementContainer);
});

socket.on('remove-game-from-list', function(gameId) {
    document.getElementById(gameId).classList.add('display-none');
});

socket.on('game-over', function(reason) {
    // When one player leave the game or press "leave game" button
    context.font = "bold 50px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
});

// TEMA CURS 4
document.getElementById("back-to-menu").addEventListener("click", function() {
    window.location.reload();
    // document.getElementById("game-container").classList.add("display-none");
    // document.getElementById("menu").classList.remove("display-none");
})