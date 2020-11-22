const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const messages = [];

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/messages', (req, res) => {
  res.send(messages.map((m) => m));
});

app.post('/messages', (req, res) => {
  console.log(req.body);
  messages.push(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
