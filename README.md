# eris-commando
`eris-commando` is a command router (framework) for the [Eris](https://abal.moe/Eris) library.

## Installation
> Master Branch:

```sh
$ npm i eris-commando
# or
$ yarn add eris-commando
```

> Indev Branch:

```sh
$ npm i github:auguwu/eris-commando#dev
# or
$ yarn add github:auguwu/eris-commando#dev
```

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
    options: {
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
