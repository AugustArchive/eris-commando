const { Event } = require('../../src');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'ready',
            emitter: 'on'
        });
    }

    run() {
        console.log('Test Bot is ready!');
        this.bot.editStatus('online', { name: '!help for commands', type: 0 });
    }
};