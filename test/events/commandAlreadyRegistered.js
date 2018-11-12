const { Event } = require('../../src');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'commandAlreadyRegistered',
            emitter: 'on'
        });
    }

    run(command) {
        console.log(`Command ${command.command} is already registered.`);
    }
};