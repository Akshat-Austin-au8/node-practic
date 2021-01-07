const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
]

router.get('/', (req, res) =>
{
    res.send(courses);
});                          

router.post('/', (req, res) =>
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

router.get('/:id ', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.param.id));
    if (!course) res.status(404).send('the course with this given id is undefined');
    res.send(course);
});

router.put('/:id ', (req, res) =>
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

router.delete('/:id ', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.param.id));
    if (!course) res.status(404).send('the course with this given id is undefined');

    const index = courses.indexOf(courses);
    courses.splice(index, 1);

    res.send(courses);
});

module.exports = router;