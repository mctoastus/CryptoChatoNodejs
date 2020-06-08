const socket = io('http://http://localhost:3000');

socket.on('chat-message', data => {
    console.log(data);
})