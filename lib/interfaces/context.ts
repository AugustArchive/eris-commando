import { ArgumentParser } from './argument/parser';
import { Message, Guild, TextChannel, EmbedOptions } from 'eris';

export class CommandContext {
    public client: any;
    public message: Message;
    public args: ArgumentParser;

    constructor(client: any, message: Message, args: string[]) {
        Object.assign(this, message);
        this.client = client;
        this.message = message;
        this.args = new ArgumentParser(args);
    }

    get channel(): TextChannel {
        return this.message.channel as TextChannel;
    }

    get guild(): Guild {
        return this.channel.guild;
    }

    send(content: string) {
        return this.channel.createMessage(content);
    }

    embed(content: EmbedOptions) {
        return this.channel.createMessage({ embed: content });
    }

    raw(content: string, embed: EmbedOptions) {
        return this.channel.createMessage({
            content,
            embed
        });
    }
}