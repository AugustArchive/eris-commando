/// <reference path='index.d.ts' />
import {
    CommandoClient,
    CommandMessage,
    Command,
    Event,
    Task,
    Inhibitor,
    RethinkDBProvider
} from 'eris-commando';
import { Role, Message } from 'eris';

const client: CommandoClient = new CommandoClient({
    token: '',
    prefix: '!',
    commands: './commands',
    events: './events',
    tasks: './schedulers',
    owner: [''],
    invite: '',
    options: {
        maxShards: 'auto',
        disableEvents: {
            typingStart: false
        },
        disableEveryone: true,
        autoreconnect: true
    },
    defaultHelpCommand: false,
    provider: new RethinkDBProvider({ db: 'test', host: '127.0.0.1', port: 28015 })
});

class MuteTask extends Task {
    constructor(bot) {
        super(bot, {
            name: 'mute',
            interval: 60 * 1000
        });
    }

    async run(msg: CommandMessage) {
        if (!msg.guild)
            return;

        const role: Role[] = msg.guild.roles.filter((r: Role) => r.id === '');
        if (!role)
            return;

        msg.member.removeRole('');
    }
}

class ConsoleCommand extends Command {
    constructor(bot) {
        super(bot, {
            command: 'console',
            description: 'Consoles anything!',
            usage: '<...args>',
            aliases: ['c0nsole', 'log'],
            category: 'Yes?'
        });
    }

    async run(msg: CommandMessage): Promise<void> {
        let say: string = '';

        if (!msg.args[0]) {
            msg.reply(":x: | You didn't provide arguments!\nType out what you wanna say!\nYou have 30 seconds to type out what you wanna say to the console!\nYou can cancel by calling the `cancel` message.");
            const message = await msg.collector.awaitMessage((mes: Message) => mes.author.id === msg.sender.id, {
                channelID: msg.channel.id,
                userID: msg.sender.id,
                timeout: 30 * 1000
            });

            if (!message)
                msg.reply("Timeout.");
            else if (['cancel'].includes(message.content))
                msg.reply("Cancelled.");
            else
                say = message.content;
        }

        console.log(say);
        msg.reply("Said `" + say + '` to the console!');
    }
};

class TaskAlreadyRegisteredEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'taskAlreadyRegistered',
            emitter: 'on'
        });
    }

    async run(task: Task) {
        console.log(`[Task:${task.name}] Task was already registered!`);
    }
};

client.setup();
