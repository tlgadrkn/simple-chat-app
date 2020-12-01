const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

const port = process.env.PORT;
const dbURI = process.env.DB_URI;

const Message = mongoose.model('messages', {
  sender: String,
  message: String,
});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', () => {
  console.log('a user connected');
});

app.get('/messages', (req, res) => {
  Message.find({}, (err, data) => {
    res.send(data);
  });
});

app.post('/messages', async (req, res) => {
  const message = new Message(req.body);

  const savedMessage = await message.save();
  console.log('message saved');

  io.emit('message', req.body);
  res.sendStatus(200);
});

mongoose.connect(
  encodeURI(dbURI),
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log('connection to db', err);
  }
);

http.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
