var app = require('express')();
var http = require('http').Server(app);
const cors = require('cors');
var io = require('socket.io')(http);
const path = require('path');
const { storeMsg, getMessages } = require('./utils/storeMsgs');

let users = 0;

app.use(cors());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', async function (socket) {
  socket.emit("me", socket.id);
  socket.emit("oldMessages", await getMessages());
  users += 1;
  io.sockets.emit("users", users);
  // console.log(users);
  socket.on('sendMessage', (data) => {
    io.sockets.emit("getMessage", { you: socket.id, data });
    // console.log(data);
    storeMsg(socket.id, data);
  })
  socket.on('disconnect', function () {
    users -= 1;
    // console.log(users)
    io.sockets.emit("users", users);
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});