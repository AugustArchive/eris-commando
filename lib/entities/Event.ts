import { DiscordEvent } from '../utility/Constants';

export default class Event {
    public client: any;
    public event: string;

    constructor(client: any, event: DiscordEvent) {
        this.client = client;
        this.event  = event;
    }

    async emit(...args: any[]) {}
}