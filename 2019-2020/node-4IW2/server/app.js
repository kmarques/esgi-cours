const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.listen(3000, () => console.log('listening...'));
app.use(bodyparser.json());

app.get('/hello', (req, res) => {
  res.json({msg: "Hello"});
});

app.post('/new', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});