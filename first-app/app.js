const Logger = require('./logger');
const path = require('path');
const os = require('os');
const fs = require('fs');

function sayHello(name) {
    console.log("Hello " + name);
}

// First App
sayHello("Marcos");

// Module
console.log(Logger);

// Node Building Modules PATH
var pathObj = path.parse(__filename);
console.log(pathObj);

// Node Building Medules OS
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log("Total Memory: " + totalMemory);
// Template String
// ES6 / 2015 : ECMAScript 6
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

// Node Building Modules FS
// Syncronous Method
var files = fs.readdirSync('./');
console.log(files);
// Asyncronous Method
fs.readdir('$', function(err, files) {
    if(err) console.log("Error: ", err);
    else console.log("Result: ", files);
});

// Node Building Modules EVENTS
// Events is a class, so you need to instantiate it to use
    //const emitter = new EventEmitter();
// Register a listener
const logger = new Logger();
logger.on('messageLogged', (arg) => {
    console.log("Listener Called: ", arg);
});
// Raise um event (Making a noise, produce a signal)
//emitter.emit('messageLogged', { id: 1, url: 'http://' });
logger.log('message');











