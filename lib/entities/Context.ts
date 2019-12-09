import { Message, TextChannel, Guild, User, EmbedOptions } from 'eris';
import CommandoClient from '../CommandoClient';

export interface SendOptions {
    embed?: EmbedOptions;
}

export interface DMOptions {
    user: User;
    content: string;
    embed?: EmbedOptions;
}

export default class CommandContext {
    public client: CommandoClient;
    public message: Message;
    public args: any;
    public guild: Guild;
    
    constructor(client: CommandoClient, m: Message, args: string[]) {
        this.client  = client;
        this.message = m;
        this.args    = [];
        this.guild   = (m.channel as TextChannel).guild;
    }

    send(content: string, options?: SendOptions) {
        return this.message.channel.createMessage({
            content,
            embed: options!.embed
        });
    }

    embed(content: EmbedOptions) {
        return this.message.channel.createMessage({ embed: content });
    }

    code(lang: string, content: string) {
        const cb = '```';
        return this.send(`${cb}${lang}\n${content}${cb}`);
    }

    async dm(options: DMOptions) {
        const channel = await options.user.getDMChannel();
        return channel.createMessage({ content: options.content, embed: options.embed });
    }
}