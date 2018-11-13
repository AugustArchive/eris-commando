const { Command } = require('../../../src');

module.exports = class CollectorTest extends Command {
    constructor(bot) {
        super(bot, {
            command: 'collector',
            description: 'A test for the message collector',
            usage: '<...args>',
            aliases: ['collector-test'],
            category: 'Test'
        });
    }

    /**
     * Run the collector test command
     * 
     * @param {import('../../../src/lib/interfaces/message')} msg The command message
     */
    async run(msg) {
        if (!msg.args[0]) {
            msg.reply("Say something! (Timeout: 30 seconds | Cancel: `finish` or `cancel`)");
            const message = await msg.collector.awaitMessage((mes) => {
                return mes.author.id === msg.sender.id
            }, {
                channelID: msg.channel.id,
                userID: msg.sender.id,
                timeout: 30e3
            });

            if (!message)
                return msg.reply("Timeout");

            if (['cancel', 'finish'].includes(message.content.toLowerCase()))
                return msg.reply("Cancelled. :(")
            else
                return msg.reply(`Content: **${message.content}**`);
        } else {
            return msg.reply("You're such a party pooper! Try this without arguments.. :wink:");
        }
    }
};