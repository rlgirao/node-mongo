require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controller/authController')(app);

const {
  APP_URL,
  APP_PORT
} = process.env;

app.get('/', function (req, res) {
  res.send('Hello world teste');
});

app.listen(APP_PORT);

console.log(`App [ON]: ${APP_URL}:${APP_PORT}`);

