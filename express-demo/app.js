const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/course', courses);
app.use('/', home);

//configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));

if (app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...........................');
}

//Db work........
dbDebugger('Connect to the database');

app.use(logger);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...................`));
