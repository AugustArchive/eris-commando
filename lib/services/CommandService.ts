import { Message, TextChannel } from 'eris';
import CommandoClient from '../CommandoClient';
import CommandContext from '../entities/Context';
import { Collection } from '@augu/immutable';
import Dialect from '../entities/Dialect';

export default class CommandService {
    public client: CommandoClient;
    public ratelimits: Collection<Collection<number>> = new Collection({ name: 'ratelimits' });

    constructor(client: CommandoClient) {
        this.client = client;
    }

    async handle(m: Message) {
        if (m.author.bot) return;
        if (!this.client.dialect) await this.handleMessageWithoutDialect(m);
        else await this.handleMessageWithDialect(m, this.client.dialect);
    }

    async handleEditedMessage(o: Message, m: Message) {
        if (o.content === m.content) return;
        if (!this.client.dialect) await this.handleMessageWithoutDialect(m);
        else await this.handleMessageWithDialect(m, this.client.dialect);
    }

    async handleMessageWithDialect(m: Message, dialect: Dialect) {
        const guild = (m.channel as TextChannel);
        const settings = await dialect.getGuildRepo().get(this.client.dialectColumn!, guild.id);

        if (!settings.prefix) throw new Error("Missing 'prefix' directive.");

        let prefix: string | null = null;
        const mention = new RegExp(`^<@!?${this.client.user.id}> `).exec(m.content);
        const prefixes = [this.client.commandPrefix, `${mention}`, settings.prefix];

        for (const pre of prefixes)
            if (m.content.startsWith(pre))
                prefix = pre;

        if (!prefix) return;
        const args = m.content.slice(prefix.length).trim().split(/ +/g);
        const name = args.shift()!;
        const ctx = new CommandContext(this.client, m, args);

        const found = this.client.manager.find(name);
        if (!found) return;

        const command = this.client.manager.get(name);
        if (command.guildOnly && m.channel.type === 1) {
            this.client.emit('service.exception', 'guild');
            return;
        }

        if (command.ownerOnly && !this.client.owners.includes(m.author.id)) {
            this.client.emit('service.exception', 'owner');
            return;
        }

        if (command.nsfw && !(m.channel as TextChannel).nsfw) {
            this.client.emit('service.exception', 'nsfw');
            return;
        }

        try {
            await command.run(ctx);
            this.client.emit('command.run', command);
        } catch(ex) {
            this.client.emit('command.error', ex);
        }
    }

    async handleMessageWithoutDialect(m: Message) {
        let prefix: string | null = null;
        const mention = new RegExp(`^<@!?${this.client.user.id}> `).exec(m.content);
        const prefixes = [this.client.commandPrefix, `${mention}`];

        for (const pre of prefixes)
            if (m.content.startsWith(pre))
                prefix = pre;

        if (!prefix) return;
        const args = m.content.slice(prefix.length).trim().split(/ +/g);
        const name = args.shift()!;
        const ctx = new CommandContext(this.client, m, args);

        const found = this.client.manager.find(name);
        if (!found) return;

        const command = this.client.manager.get(name);
        if (command.guildOnly && m.channel.type === 1) {
            this.client.emit('service.exception', 'guild');
            return;
        }

        if (command.ownerOnly && !this.client.owners.includes(m.author.id)) {
            this.client.emit('service.exception', 'owner');
            return;
        }

        if (command.nsfw && !(m.channel as TextChannel).nsfw) {
            this.client.emit('service.exception', 'nsfw');
            return;
        }

        try {
            await command.run(ctx);
            this.client.emit('command.run', command);
        } catch(ex) {
            this.client.emit('command.error', ex);
        }
    }
}