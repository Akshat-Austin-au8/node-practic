require('express-async-errors');
require('winston-mongdb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const express = require('express');
const error = require('./middleware/error');
const auth = require('./routes/auth');
const app = express();

process.on('uncoughtException', (ex) =>
{
  console.log("we got an ncought exception");
  wisnton.error(ex.message, ex);
})

winston.add(winston.transports.file, { filename: 'logfile.log ' });
winston.add(winston.transports.mongodb, {
  db: 'mongodb://localhost/vidly',
  level: 'info'
});

if (!config.get('jwtPrivateKey'))
{
  console.error('FATEL ERROR: jwtPrivateKey is not defined.........');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));