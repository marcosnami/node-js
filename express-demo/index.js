const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const logger = require('./middleware/logger');
const authenticator = require('./middleware/authenticator');
const courses = require('./routes/courses');
const home = require('./routes/home');

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
app.use('/api/courses', courses);
app.use('/', home);

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));