const io = require('socket.io')(3001, { cors: { origin: "*" } });
console.log("NitroX Server Running on Port 3001...");

io.on('connection', (socket) => {
    console.log("Peer Connected:", socket.id);
    socket.on('file-raw', (data) => {
        socket.broadcast.emit('file-receive', data);
    });
});
