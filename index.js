const express = require('express');
const app = express();
const http = require('http');
const path = require("path");
const { Server } = require('socket.io'); // como si mandamos a reguerir la class Socket.io .

const server = http.createServer(app);
const io = new Server(server); // la creamos su instacia o objeto.

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "js")));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname) + '/templates/html/index.html');
});

// la conexion bidirecional
io.on('connection', (socket) => {
    console.log('un usuariio se conextado al chat');

    socket.on('chat message', (data) => {
        io.emit('chat message',{msg: data.msg, name: data.name});
    });

    socket.on('disconnect', () => {
        console.log('el usuario se a desconectado');
    });
});

// encender el server
server.listen(process.env.port || 8080 , function(){
    console.log('escucho el puerto 8080');
});