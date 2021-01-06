const express = require('express');
const app = express();

app.use(express.json());

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