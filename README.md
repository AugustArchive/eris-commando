<h1 align="center">eris-commando</h1>

---------------
> eris-commando is a command router (framework) for the [Eris](https://abal.moe/Eris) library.

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
const { CommandoClient, MongoDialect, LoggerPreset } = require('eris-commando');
const { resolve } = require('path');

const client = new CommandoClient({
    token: 'TOKEN',
    prefix: '!',
    commands: resolve(__dirname, 'commands'),
    events: resolve(__dirname, 'events'),
    dialect: new MongoDialect('mongodb://localhost:27017'),
    tasks: {
        enabled: false
    },
    inhibitors: {
        enabled: true,
        path: resolve(__dirname, 'inhibitors')
    }
});

client.use(new LoggerPreset());
client.start();
```

## Bots that use eris-commando:

- This can be your bot **~** Created by you!

> If you use `eris-commando`, submit a pull request