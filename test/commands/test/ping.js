const { Command } = require('../../../src');

module.exports = class PingCommand extends Command {
    constructor(bot) {
        super(bot, {
            command: 'ping',
            description: 'Pong!',
            aliases: ['pung'],
            category: 'Test',
            cooldown: 2
        });
    }

    /**
     * Execute the 'ping' command
     * 
     * @param {import('../../../src/lib/interfaces/message')} msg The command message
     */
    async run(msg) {
        let start = Date.now();
        const message = await msg.reply("pung?");
        await message.edit(`pong! \`${Date.now() - start}ms\``);
    }
};