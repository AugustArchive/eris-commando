const { readdirSync, readdir } = require('fs');
const CommandService           = require('../services/command-service');
const Collection               = require('../utils/collection');
const { sep }                  = require('path');

module.exports = class CommandManager
{
    /**
     * Creates a new instance of the command manager instance
     * @param {import('../client')} client The client instance
     * @param {import('../index').PieceOptions} options The options
     */
    constructor(client, options)
    {
        /**
         * The client
         */
        this.client = client;

        /**
         * The commands collection
         * @type {Collection}
         */
        this.commands = new Collection();

        /**
         * The command service
         */
        this.service = new CommandService(client);

        /**
         * The commands path
         */
        this.path = options.path;
    }

    /**
     * Starts the command manager
     */
    async start()
    {
        const modules = await readdirSync(this.path);
        this.registerModules(modules);
        for (let i = 0; i < modules.length; i++) 
        {
            const category = modules[i];
            readdir(`${this.path}${sep}${category}`, (error, files) => 
            {
                if (error) this.client.emit('core.error', error);
                this.client.emit('core.debug', `Building ${files.length} in ${category} category`);
                files.forEach(file => {
                    try {
                        this.registerCommand(`${category}:${file}`);
                    } catch(ex) {
                        this.client.emit('core.error', ex);
                    }
                });
            });
        }
    }

    /**
     * Registers a command
     * @param {string} parent The parent
     */
    registerCommand(parent)
    {
        const child   = parent.split(':');
        const command = require(`${this.path}${sep}${child[0]}${sep}${child[1]}`);
        /**
         * The command
         * @type {import('../entities/command')}
         */
        let cmd;

        if (typeof command === 'function')         cmd = new command(this.client);
        if (typeof command.default === 'function') cmd = new command.default(this.client);
        if (cmd.disabled) return;

        cmd.setFile({
            category: child[0],
            command: child[1]
        });
        this.commands.set(cmd.command, cmd);
        this.client.emit('commands.registered', `Registered the "${cmd.command}" command successfully!`);
        return this;
    }

    /**
     * Registers ALL the default commands
     */
    registerDefaultCommands()
    {
        this
            .registerCommand('generic:help.js')
            .registerCommand('generic:ping.js')
            .registerCommand('generic:groups.js');
        return this;
    }
};