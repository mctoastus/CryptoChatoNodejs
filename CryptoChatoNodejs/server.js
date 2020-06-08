const express = require('express');
const app = express();
const path = require('path');

app.use(loggingMiddleware);
app.use('/data', express.static('public'));

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
    console.log('Inside Middleware');
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

app.listen(3005, () => console.log('Server Started'));


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