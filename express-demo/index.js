const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const logger = require('./logger');
const authenticator = require('./authenticator');

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Thirdparty middleware
app.use(helmet());
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger("Morgan enabled...");
}

console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

// Customized middleware
app.use(logger);
app.use(authenticator);

// DB Configuration
dbDebugger("Database configuration...");

const courses = [
    { id : 1, name : 'course1'},
    { id : 2, name : 'course2'},
    { id : 3, name : 'course3'}
];
app.get('/', (req, res) => {
    //res.send('Hello World!');
    res.render('index', { title: "My Applicaiton", message: "Hello World" });
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`There is not a course with id ${req.params.id}`);
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params.month);
    //res.send(req.query.sortBy);
})

app.post('/api/courses', (req, res) => {
    const { error } = validadeCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id : courses.length + 1, 
        name : req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`There is not a course with id ${req.params.id}`);

    const { error } = validadeCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`There is not a course with id ${req.params.id}`);

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validadeCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));