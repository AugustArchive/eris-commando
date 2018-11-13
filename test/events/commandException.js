const { Event } = require('../../src');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'commandException',
            emitter: 'on'
        });
    }

    run(msg, command, reason) {
        if (reason === 'guild')
            return msg.reply(`${msg.sender.username}, you can't run the \`${command.command}\` command without being in a guild.`);
        else if (reason === 'owner')
            return msg.reply(`${msg.sender.username}, you can't run the \`${command.command}\` command without being the owner of this bot.`);
        else if (reason === 'nsfw')
            return msg.reply(`${msg.sender.username}, you can't run the \`${command.command}\` command without being in an NSFW channel.`);
    }
};