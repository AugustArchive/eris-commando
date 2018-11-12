# eris-commando
`eris-commando` is a command router (framework) for the [Eris](https://abal.moe/Eris) library.

## Documentation
|Class|Description|Constructor?|Properties?|Credits?|
|-----|-----------|------------|-----------|--------|
|`CommandoClient`|The base client|`new CommandoClient(options: CommandoClientOptions)`|`manager`, `events`, `owners`, `prefix`, `invite`|Nope...|
|`Collection<K, V>`|The collection class for all of the commands and cooldowns|`new Collection(iterable?: any)`|`...`|[discord.js](https://github.com/discordjs/discord.js/blob/master/src/util/Collection.js)|
|`CommandManager`|The command management for `eris-commando`|`new CommandManager(bot: CommandoClient, path: string)`|`commands`, `cooldowns`, `bot`|None|
|`EventManager`|The event management for `eris-commando`|`new EventManager(bot: CommandoClient, path: string)`|`bot`|None|
|`Command`|The command class. (EXTENDABLE)|Don't...|`bot`, `meta`|None|
|`Event`|The event class. (EXTENDABLE)|Don't...|`bot`, `event`, `emitter?`|None|
|`CommandMessage`|The command message that is an extenable version of `Eris.Message`.|`new CommandMessage(bot: CommandoClient, msg: Message, args: string[], prefix: string)`|`bot`, `msg`, `args`, `prefix`|None|

## Examples
> If you're just starting bot development, I advise you to set the `defaultHelpCommand` option enabled.
>
> Creating a command

```js
const { Command } = require('eris-commando');

module.exports = class MyCommand extends Command {
    constructor(bot) {
        super(bot, {
            command: 'test',
            description: 'A debug testing command, what did you expect?',
            usage: 'test [...args]',
            category: 'Test',
            aliases: ['debug'],
            hidden: false,
            owner: false,
            guild: true,
            disabled: false
        });
    }

    async run(msg) {
        if (!msg.args[0])
            return msg.reply("No content to respond?");
        else
            return msg.codeblock(null, msg.args.slice(0).join(' '));
    }
};
```

> Using an event

```js
const { Event } = require('eris-commando');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, { event: 'ready', emitter: 'on' });
    }

    run() {
        console.log('I\'m online!');
    }
};
```

> Creating the CommandoClient and setting up!

```js
const { CommandoClient } = require('eris-commando');
const path = require('path');

const discord = new CommandoClient({
    token: '',
    commands: path.join(__dirname, 'commands'),
    events: path.join(__dirname, 'events'),
    groupCommands: true,
    prefix: '!',
    owner: ['280158289667555328'],
    defaultHelpCommand: true,
    invite: 'https://discord.gg/some_invite',
    client: {
        maxShards: 'auto',
        disableEveryone: true,
        autoreconnect: true
    }
});
discord.setup();
```

## Bots that use eris-commando:
* Noel: Made by August#5820
* [Yokitsu](https://github.com/voided-x/Yokitsu): made by August#5820 and void#0001

Submit a PR to add your bot if you use the library!
