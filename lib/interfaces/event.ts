import { Emittable } from '../types';

export class Event {
    public client: any;
    public event: Emittable;

    constructor(client: any, event: Emittable) {
        this.client = client;
        this.event = event;
    }

    async run(...args: any[]) {
        throw new SyntaxError(`${this.constructor.name} is missing a run(...args: any[]) function`);
    }
}