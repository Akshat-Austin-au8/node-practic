const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

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

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
]

app.get('/', (req, res) =>
{
    res.send('hello worls');
});

app.get('/api/courses', (req, res) =>
{
    res.send(courses);
});

app.post('/api/courses', (req, res) =>
{
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    
    if (result.error)
    {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const course = {
        id: course.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id ', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.param.id));
    if (!course) res.status(404).send('the course with this given id is undefined');
    res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...................`));

app.put('/api/courses/:id ', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.param.id));
    if (!course) res.status(404).send('the course with this given id is undefined');

    //validate
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    
    if (result.error)
    {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    //update course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id ', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.param.id));
    if (!course) res.status(404).send('the course with this given id is undefined');

    const index = courses.indexOf(courses);
    courses.splice(index, 1);

    res.send(courses);
});