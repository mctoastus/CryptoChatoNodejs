const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

// express stuff

app.use(loggingMiddleware);
app.use('/data', express.static('directory'));

app.get('/', (req, res) => {
    //res.send('Home Page');
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/users', authorizeUsersAccess, (req, res) => {
    console.log("Admin Status:", req.admin);
    res.send('Users Page');
})

function loggingMiddleware(req, res, next) {
    console.log(`${new Date().toISOString()}: ${req.originalUrl}`);
    next();
}

function authorizeUsersAccess(req, res, next) {
    if (req.query.admin === 'true') {
        req.admin = true;
        next()
    } else {
        res.send('ERROR: You must be an admin');
    }
}

function middlewareFunction(req, res, next) {
    next();
}

var server = app.listen(3005, () => console.log('Server Started'));

var io = socket(server);

// socket stuff

const users = {};
const userColors = {};

io.on('connection', socket => {
    // broadcasts a msg
    socket.on('send-chat-message', msg => {
        socket.broadcast.emit('chat-message', { msg: msg, name: users[socket.id], color: userColors[socket.id] });
    }); 
    // connects the name to socket id and broadcasts a msg
    socket.on('new-user', name => {
        users[socket.id] = name;
        userColors[socket.id] = randomColor();
        socket.broadcast.emit('user-connected', name);
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
        delete userColors[socket.id];
    })
})

function randomColor() {
    var color;
    var rndm = Math.floor(Math.random() * Math.floor(5));
    if (rndm == 0) color = "#0074D9";
    if (rndm == 1) color = "#3D9970";
    if (rndm == 2) color = "#FF851B";
    if (rndm == 3) color = "#AAAAAA";
    if (rndm == 4) color = "#85144b";
    return color;
}

//'use strict';
//var http = require('http');
//var fs = require('fs');
//var port = 3001;

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/html' });
//    fs.readFile('./index.html', null, function (error, data) {
//        if (error) {
//            res.writeHead(404);
//            res.write('Error 404: File not Found');
//        } else {
//            res.write(data);
//        }
//        res.end();
//    });
//}).listen(port); 
////server.listen(port, function (error) {
////    if (error) {
////        console.log('Error something went wrong: ', error);
////    } else {
////        console.log('Server is listening on port ' + port);
////    }
////});