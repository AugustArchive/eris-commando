const { Event } = require('../../src');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'commandRun',
            emitter: 'on'
        });
    }

    run(command) {
        console.log(`Ran the command ${command.command}`);
    }
};