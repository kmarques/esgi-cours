const db = require('./lib/db');
const User = require('./models/user');
const movieRouter = require('./routes/movie');
const securityRouter = require('./routes/security');
const verifyToken = require('./middlewares/security')
const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(verifyToken);
app.use('/movies', movieRouter);
app.use('/', securityRouter);

app.listen(3000, () => console.log('Listening'));