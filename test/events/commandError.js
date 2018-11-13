const { Event } = require('../../src');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'commandError',
            emitter: 'on'
        });
    }

    run(command, ex) {
        console.log(`Command ${command.command}: ${ex.stack}`);
    }
};