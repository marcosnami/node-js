const EventEmitter = require('events');

console.log(__filename);
console.log(__dirname);

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {

    log(message) {
        console.log(message);
        this.emit('messageLogged', { id: 1, url: 'http://' });
    }

}

module.exports = Logger;
