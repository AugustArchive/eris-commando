import CommandoClient from '../CommandoClient';
import { Collection } from '@augu/immutable';
import { readdir } from 'fs';
import { sep } from 'path';
import Task from '../entities/Task';

export default class TaskManager extends Collection<Task> {
    public client: CommandoClient;
    public path: string;

    constructor(client: CommandoClient, path: string) {
        super({ name: 'tasks' });

        this.client = client;
        this.path = path;
    }

    start() {
        readdir(this.path, (error, files) => {
            if (error) this.client.emit('core.error', `Unable to build tasks:\n${error.stack}`);
            this.client.emit('core.debug', `Building ${files.length} task${files.length > 1? 's': ''}`);
            for (let i = 0; i < files.length; i++) {
                const file  = require(`${this.path}${sep}${files[i]}`);
                const valid = (typeof file === 'function' || typeof file.default === 'function' || file instanceof Task || file.default instanceof Task);
                if (!valid) {
                    this.client.emit('core.error', `File ${files[i]} is not a valid task! Skipping..`);
                    continue;
                }

                let task: Task | null = null;
                if (typeof file === 'function') task = new file(this.client);
                if (typeof file.default === 'function') task = new file.default(this.client);

                this.set(task!.name, task!);
                this.client.emit('core.debug', `Built ${task!.name} task!`);
            }
        });
    }
}