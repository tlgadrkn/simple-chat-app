const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;

const messages = [];

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', () => {
  console.log('a user connected');
});

app.get('/messages', (req, res) => {
  console.log('from get', messages);
  res.send(messages.map((m) => m));
});

app.post('/messages', (req, res) => {
  messages.push(req.body);
  console.log('from server post', messages);
  io.emit('message', req.body);
  res.sendStatus(200);
});

http.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
