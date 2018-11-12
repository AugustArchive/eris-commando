const { Event } = require('../../src');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'commandRegistered',
            emitter: 'on'
        });
    }

    run(command) {
        console.log(`Command ${command.meta.command} has been registered`);
    }
};