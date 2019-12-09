# eris-commando
> :gear: **| Lightweight command framework for the [Eris](https://abal.moe/Eris) library**
>
> [Documentation](https://docs.augu.dev/eris-commando) **|** [NPM](https://npmjs.com/package/eris-commando)

## Example Bot
> More examples can be located [here](https://github.com/eris-commando/example-bot).

```ts
import { CommandoClient, MongoDialect, LoggerPreset } from 'eris-commando';
import { sep } from 'path';

const bot = new CommandoClient({
    token: '',
    prefix: '!',
    commands: `${process.cwd()}${sep}commands`,
    events: `${process.cwd()}${sep}events`,
    tasks: `${process.cwd()}${sep}tasks`,
    monitors: `${process.cwd()}${sep}monitors`,
    inhibitors: `${process.cwd()}${sep}inhibitors`
});

bot.use(new LoggerPreset());
bot.start();
```

## Features
- Tasks - Run any tasks in the background
- Monitors - Any monitors when a command is executed
- Inhibitors - Any boolean checks before a command is executed
- Presets - Plugin API to create any presets

## Bots that use eris-commando
> If you are using the library, submit a Pull Request!

- `Bot#0000` **~** This can be you!

## Installation
### Normal
```sh
$ npm i eris-commando
# OR
$ yarn add eris-commando
```

### Cutting Edge Branch
> :warning: You might want not to use it, it can break at anytime!

```sh
$ npm i github:eris-commando/eris-commando#edge
# OR
$ yarn add github:eris-commando/eris-commando#edge
```