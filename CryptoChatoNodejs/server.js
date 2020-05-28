'use strict';
var http = require('http');
var fs = require('fs');
var port = 3001;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Error 404: File not Found');
        } else {
            res.write(data);
        }
        res.end();
    });
}).listen(port); 

//server.listen(port, function (error) {
//    if (error) {
//        console.log('Error something went wrong: ', error);
//    } else {
//        console.log('Server is listening on port ' + port);
//    }
//});