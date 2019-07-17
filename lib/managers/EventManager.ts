import CommandoClient from '../CommandoClient';
import { readdir } from 'fs';
import { sep } from 'path';
import Event from '../entities/Event';

export default class EventManager {
    public client: CommandoClient;
    public path: string;

    constructor(client: CommandoClient, path: string) {
        this.client = client;
        this.path   = path;
    }

    emit(ev: Event) {
        const wrapper = async(...values: any[]) => {
            try {
                await ev.emit(...values);
            } catch(ex) {
                this.client.emit('core.debug', `Unable to run event ${ev.event}:\n${ex}`);
            }
        }

        this.client.on(ev.event, wrapper);
    }

    start() {
        readdir(this.path, (error, files) => {
            if (error) this.client.emit('core.error', `Unable to build events:\n${error.stack}`);
            this.client.emit('core.debug', `Now building ${files.length} event${files.length > 1? 's': ''}`);
            for (let i = 0; i < files.length; i++) {
                const file  = require(`${this.path}${sep}${files[i]}`);
                const valid = (typeof file === 'function' || typeof file.default === 'function' || file instanceof Event || file.default instanceof Event);
                if (!valid) {
                    this.client.emit('core.error', `File ${files[i]} is not a valid event! Skipping..`);
                    continue;
                }

                let ev: Event | null = null;
                if (typeof file === 'function') ev = new file(this.client);
                if (typeof file.default === 'function') ev = new file.default(this.client);

                this.emit(ev!);
            }
        });
    }
}