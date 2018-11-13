const { Event } = require('../../src');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'commandCooldown',
            emitter: 'on'
        });
    }

    run(msg, command, left) {
        msg.reply(`${msg.sender.username}, you have ${left.toFixed()} second${left > 1 ? 's' : ''} to execute the \`${command.command}\` command.`);
    }
};