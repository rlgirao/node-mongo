require('dotenv/config');
const mongoose = require('mongoose');
const {
    DB_HOSTNAME,
    DB_PORT,
    DB_DATABASE
  } = process.env;

mongoose.connect(`mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))
mongoose.Promise = global.Promise;

module.exports = mongoose;