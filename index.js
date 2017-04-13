var express = require('express');
var app = express();
var port = 3700;

app.get('/', function(req, res){
  res.send('it works!');
});

app.use(express.static(__dirname + '/public'));

// app.listen(port);
var io = require('socket.io').listen(app.listen(port));
console.log('listening on port: ', port);

// socket object is the client's socket
// junction between my server and user's browser
io.sockets.on('connection', function(socket){
  socket.emit('message', {message: 'welcome to lisaChat'})
  // bind another handler to be used as receiver
  // we will catch this send message
  socket.on('send', function(data){
    // foward user sent data to all other sockets 
    io.sockets.emit('message', data);
  });
});

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function(req,res){
  res.render('page');
});
