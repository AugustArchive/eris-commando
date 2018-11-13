const Command = require('../interfaces/command');

module.exports = class HelpCommand extends Command {
    constructor(bot) {
        super(bot, {
            command: 'help',
            description: 'Grabs the bot\'s command list or gives documentation on a command.',
            usage: '[command]',
            aliases: ['halp', 'h', '?'],
            category: 'Core',
            cooldown: 5
        });
    }

    /**
     * Execute the 'help' command
     * 
     * @param {import('./interfaces/message')} msg The command message
     */
    async run(msg) {
        const categories = {};
        let help = '';

        if (!msg.args[0]) {
            this.bot
                .manager
                .commands
                .filter(c => !c.hidden)
                .forEach((command) => {
                    if (!(command.category in categories)) categories[command.category] = [];
                    categories[command.category].push(command.command);
                });

            for (const category in categories)
                help += `**${category}**:  ${categories[category].map(c => `\`${c}\``).join(', ')}\n`;

            return msg.embed({
                title: `${this.bot.user.username}#${this.bot.user.discriminator}'s Commands`,
                description: help
            });
        }

        const command = this.bot.manager.commands.get(msg.args[0]);
        if (command) 
            return msg.embed({
                title: `Command ${command.command}`,
                description: command.description,
                fields: [{
                    name: 'Usage', value: command.usage(), inline: true
                },
                {
                    name: 'Category', value: command.category, inline: true
                },
                {
                    name: 'Aliases', value: command.aliases > 0 ? command.aliases.join(', ') : 'None', inline: true
                },
                {
                    name: 'Cooldown', value: command.cooldown, inline: true
                }]
            });
        else
            return msg.reply(`No command called \`${msg.args[0]}\` was found.`);
    }
};