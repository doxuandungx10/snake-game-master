
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));


// Set views
app.set('views', './views');
app.set('view engine', 'ejs')


app.get('', function (req, res) {
    res.render('index');
});
app.get('/client', function (req, res) {
    res.render('client');
});




io.on('connection', function (socket) {
    console.log('Detected a new connection');
    socket.on('direction', function (direction) {
        console.log(direction);
        socket.broadcast.emit('directionFromServer', direction);
    });
    // socket.broadcast.emit();
    // io.emit();
});
server.listen(3000, function () {
    console.log('listening on *:3000');
});