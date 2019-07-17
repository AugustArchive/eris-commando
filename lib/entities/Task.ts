import NoFunctionalityException from '../errors/NoFunctionalityException';
import CommandoClient from '../CommandoClient';

export interface TaskMeta {
    name: string;
    interval: number;
}
export default class Task {
    public client: CommandoClient;
    public name: string;
    public interval: number;

    constructor(client: CommandoClient, meta: TaskMeta) {
        this.client   = client;
        this.name     = meta.name;
        this.interval = meta.interval;
    }

    async run() {
        throw new NoFunctionalityException(`Task "${this.name}" doesn't provide a run function!`);
    }
}