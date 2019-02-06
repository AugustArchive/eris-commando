import { CommandInfo } from '../types';

export class Command {
    public client: any;
    public info: CommandInfo;

    constructor(client: any, info: CommandInfo) {
        this.client = client;
        this.info = info;
    }

    async run(ctx: any) {
        throw new SyntaxError(`${this.constructor.name} doesn't bind a run(ctx: Commando.Context) function.`);
    }

    get format() {
        const usage = this.info.usage? ` ${this.info.usage}`: '';
        return `${this.client.prefix}${this.info.command}${usage}`;
    }
}