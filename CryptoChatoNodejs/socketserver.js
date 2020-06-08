const io = require('socket.io')(3000);

io.on('connection', socket => {
    console.log("12");
    socket.emit('chat-message', 'Hello World');
})