import NoFunctionalityException from '../errors/NoFunctionalityException';
import CommandoClient from '../CommandoClient';
import CommandContext from './Context';

export interface CommandInfo {
    name: string;
    description: string | ((client: CommandoClient) => string);
    usage?: string;
    category: string;
    aliases?: string[];
    guildOnly?: boolean;
    ownerOnly?: boolean;
    nsfw?: boolean;
    hidden?: boolean;
    disabled?: boolean;
    throttle?: number;
}

export default class Command {
    public client: CommandoClient;
    public name: string;
    public description: string;
    public usage: string;
    public category: string;
    public aliases: string[];
    public guildOnly: boolean;
    public ownerOnly: boolean;
    public nsfw: boolean;
    public hidden: boolean;
    public disabled: boolean;
    public throttle: number;

    constructor(client: CommandoClient, info: CommandInfo) {
        this.client      = client;
        this.name        = info.name;
        this.description = (typeof info.description === 'function')? info.description(client): info.description;
        this.usage       = info.usage || '';
        this.category    = info.category;
        this.aliases     = info.aliases || [];
        this.guildOnly   = info.guildOnly || false;
        this.ownerOnly   = info.ownerOnly || false;
        this.nsfw        = info.nsfw || false;
        this.hidden      = info.hidden || false;
        this.disabled    = info.disabled || false;
        this.throttle    = info.throttle || 5;
    }

    async run(ctx: CommandContext) {
        throw new NoFunctionalityException(`Command "${this.name}" has no functionality`);
    }

    format() {
        return `${this.client.commandPrefix}${this.name}${this.usage? ` ${this.usage}`: ''}`;
    }
}