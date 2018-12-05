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
>
> :warning: **Don't try this build since it may cause errors.** :warning:

```sh
$ npm i github:auguwu/eris-commando#dev
# or
$ yarn add github:auguwu/eris-commando#dev
```

## Drivers
> The avaliable drivers are `postgres` and `mongodb`.
>
> To add an driver:

```js
const { CommandoClient, PostgreSQLDriver } = require('eris-commando'); // Were gonna use Postgres for this

const client = new CommandoClient({
    token,
    prefix: '!',
    commands: './commands',
    events: './events',
    drivers: {
        dialect: new PostgreSQLDriver({ uri: '<uri>' })
    }
});

client.start();
```

> Adding a table to Postgres (Command style)

```js
const { Command } = require('eris-commando');

module.exports = new Command({
    name: 'db',
    description: 'Database driver example',
    usage: '<subcommand:string>',
    checks: {
        guild: false,
        owner: true,
        hidden: true,
        disabled: false
    },
    run: (bot, msg) => {
        if (!msg.args[0])
            return msg.reply('Invalid subcommand. (`set` | `get`)');

        if (msg.args[0].toLowerCase() === 'set') {
            bot
                .driver // Postgres
                .db // Sequelize
                .create() 
        }
    }
});
```

## Bots that use eris-commando:
* [Noel](https://github.com/auguwu/Noel): made by August#5820 (Verified for new users)
* [Yokitsu](https://github.com/voided-x/Yokitsu): made by August#5820 and void#0001

Submit a PR to add your bot if you use the library!