const { Event } = require('../../src');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'commandRegistered',
            emitter: 'on'
        });
    }

    run(command) {
        console.log(`Command ${command.command} has been registered`);
    }
};