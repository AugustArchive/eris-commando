<h1 align="center">Examples - Custom Help Command</h1>

----------------

Welcome to the Custom Help Command tutorial of how you can implement your own help command!

> :warning: This is for noobs who use examples and don't know how to propertly code. Viewer descriction advised.

## Initializing
First, we need to build out bot, to do so; we need to add the `CommandoClient` instance into out bot's main process:

```js
const { CommandoClient } = require('eris-commando'); // Grab the client's constructor
const { join } = require('path'); // Grab the 'join' option for getting the path of the commands and events

new CommandoClient({
    token: '',
    prefix: ';;',
    commands: join(__dirname, 'commands'),
    events: join(__dirname, 'events')
}).start(); // Start our bot!
```

## Creating our Help command
Now it's time to code our help command! Since eris-commando uses the `generic` category for miscellaneous commands, let's create the file into `commands/generic` path named `help.js`!

Let's initialize the command:

```js
const { Command, DiscordUtil: { isFunction } } = require('eris-commando');

module.exports = new Command();
```

Now let's add the information so we can see it in our help command!

```js
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
```





















































hi owo