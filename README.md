<h1 align="center">eris-commando</h1>

---------------
`eris-commando` is a command router (framework) for the [Eris](https://abal.moe/Eris) library.

## Features

- Inhibitors
  - Ablilty to execute stuff after command execution
- Schedulers
  - Ability to be alert anything by a task running at an interval
- Languages
  - Ability to make locales for all languages with JavaScript Object Notation (JSON)
- Flags
  - Parsable flags
- Default Commands
  - Comes with default commands like `help`, `ping`, `reload`, `unload`, `load`, `disable`, `enable`, and `groups`!
- Subcommands
  - Want to add subcommands like `<prefix>commandName <subcommandName>`? Now you can!
- Presets
  - Ability to append stuff to `this.client`

and more to come~

### Presets to NPM

> You can append presets into NPM if you're a contributor. All preset names are belonged to `@eris-commando/<name>`!

```js
const { Preset } = require('eris-commando');

module.exports = class MyPreset extends Preset
{
    constructor(client) {
        super(client, {
            name: 'logger',
            description: 'Logger preset to log stuff!'
        });
    }
    
    run(...args) {
        process.stdout.write(`yes\n`);
        return this.client;
    }
}

this.client.logger.info(); // => Commando.Client
```

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

## Example Bot

```js
const { Client } = require('eris-commando');
const { join } = require('path');

const client = new Client({
    token: 'TOKEN',
    prefix: '!',
    events: join(__dirname, 'events'),
    schedulers: {
        enabled: false
    },
    localization: {
        enabled: false
    },
    inhibitors: {
        enabled: true,
        path: join(__dirname, 'inhibitors')
    }
});

client
    .manager
    .registerCommandsIn(join(__dirname, 'commands'))
    .registerDefaults();

client.start();
```

## Bots that use eris-commando:

- This can be your bot **~** Created by you!

> If you use `eris-commando`, submit a pull request
