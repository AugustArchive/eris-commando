const { Command, DiscordUtil: { isFunction } } = require('eris-commando');

module.exports = new Command({
    command: 'help',
    description: (client) => `Gives documentation on a command or grabs the list of commands ${client.user.username} has!`,
    usage: '[command]',
    aliases: ['halp'],
    run: (client, msg) => {
        const categories = {};
        let helpString = '';

        if (!msg.args[0]) {
            client
                .registry
                .commands
                .filter(c => !c.checks.hidden)
                .forEach(command => {
                    if (!(command.category in categories))
                        categories[command.category] = [];

                    categories[command.category].push(command.command);
                });

            for (const cat of categories)
                helpString += `> **${cat}** [${categories[cat].length} Commands]: ${categories[cat].map(s => `\`${s}\``).join(', ')}\n`;

            return msg.embed({
                title: `${client.user.username}#${client.user.discriminator}'s Commands`,
                description: helpString,
                color: 0xFFFFFF,
                footer: { text: `${client.registry.commands.size} Commands` }
            });
        }

        const command = client.registry.commands.filter(
            (c) => c.command === msg.args[0] && !c.checks.hidden
        );

        if (command) {
            let cmd = command[0];
            return msg.reply(`**Command ${cmd.command}:** **\`${isFunction(cmd.description) ? cmd.description(client) : cmd.description}**\``);
        } else
            return msg.reply(`No command **${msg.args[0]}** was found!`);
    }
});