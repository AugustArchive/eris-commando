const { Task } = require('../../src');

module.exports = class ConsoleTask extends Task {
    constructor(bot) {
        super(bot, { name: 'console', interval: 60 * 1000 });
    }

    run() {
        console.log('Test!');
    }
};