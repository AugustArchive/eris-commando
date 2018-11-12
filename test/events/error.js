const { Event } = require('../../src');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'error',
            emitter: 'on'
        });
    }

    run(error, shard) {
        console.log(`[Shard #${shard}] ${error.stack}`);
    }
};