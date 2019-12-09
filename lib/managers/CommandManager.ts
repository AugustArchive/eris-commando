import { readdir, readdirSync } from 'fs';
import { Collection } from '@augu/immutable';
import CommandoClient from '../CommandoClient';
import Command from '../entities/Command';
import { sep } from 'path';

export default class CommandManager {
    public client: CommandoClient;
    private commands: Collection<Command> = new Collection({ name: 'commands' });
    public path: string;

    constructor(client: CommandoClient, path: string) {
        this.client = client;
        this.path   = path;
    }

    async start() {
        const groups = await readdirSync(this.path);
        if (groups.length < 1) throw new Error(`No groups were provided in the "${this.path}" directory`);
        for (let i = 0; i < groups.length; i++) {
            const module = groups[i];
            readdir(`${this.path}${sep}${module}`, (error, files) => {
                if (error) this.client.emit('core.error', `Unable to build the command manager:\n${error.stack}`);
                this.client.emit('core.debug', `Now building ${files.length} command${files.length > 1? 's': ''}`);
                for (let j = 0; j < files.length; j++) {
                    const file  = require(`${this.path}${sep}${module}${files[j]}`);
                    const valid = typeof file === 'function' || typeof file.default === 'function' || file instanceof Command || file.default instanceof Command;
                    if (!valid) {
                        this.client.emit('core.debug', `File ${files[j]} is not a valid command! Skipping...`);
                        continue;
                    }

                    let cmd: Command | null = null;
                    if (typeof file === 'function') cmd = new file(this.client);
                    if (typeof file.default === 'function') cmd = new file.default(this.client);

                    if (cmd!.disabled) return;
                    this.commands.set(cmd!.name, cmd!);
                    this.client.emit('registry.command.registered', cmd!);
                }
            });
        }
    }

    find(cmd: string) {
        return this.commands.filter(c => c.name === cmd || c.aliases.includes(cmd)).length > 0;
    }

    get(cmd: string) {
        return this.commands.filter(c => c.name === cmd || c.aliases.includes(cmd))[0];
    }
}