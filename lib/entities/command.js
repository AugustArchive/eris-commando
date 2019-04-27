const ArgumentParser = require('../parsers/argument-parser');

module.exports = class Command
{
    /**
     * Create a new instance of the Command interface
     * @param {import('../client')} client The client
     * @param {CommandInfo} info The command information
     */
    constructor(client, info)
    {
        this.client = client;
        this.command = info.command;
        this.description = info.description;
        this.usage = info.usage || '';
        this.category = info.category || 'Default';
        this.aliases = info.aliases || [];
        this.disabled = info.disabled || false;
        this.nsfw = info.nsfw || false;
        this.ownerOnly = info.ownerOnly || false;
        this.guildOnly = info.guildOnly || false;
        this.flags = info.flags || [];
        this.file = null;
    }

    /**
     * Sets the file
     * @param {ParentOptions} parent The parent
     */
    setFile(parent)
    {
        this.file = `${parent.category}:${parent.command}`;
        return this;
    }

    /**
     * Runs the command
     * @param {import('./context')} ctx The command context
     */
    async run(ctx)
    {
        const NotImplementedException = require('../exceptions/not-implemented');
        const error = new NotImplementedException(this.constructor, `Command#run`);
        this.client.emit('core.error', error);
    }

    /**
     * Prettifys the command usage
     */
    format()
    {
        const commandPrefix = this.client.prefixes[0];
        return `${commandPrefix}${this.command}${this.usage? ` ${this.usage}`: ''}`;
    }
};

/**
 * @typedef {Object} CommandInfo
 * @prop {string} command The command name
 * @prop {string|((client: import('../client')) => string)} description The description of the command
 * @prop {string} [usage] The command usage
 * @prop {string} [category] The category name must be the first argument from the parent (example: `Generic`)
 * @prop {string[]} [aliases] The command aliases, it'll return an empty array if no aliases weren't added
 * @prop {boolean} [disabled] If the command shouldn't be added to the commands collection
 * @prop {boolean} [nsfw] If the command is NSFW
 * @prop {boolean} [ownerOnly] If the command is included to the owners
 * @prop {boolean} [guildOnly] If the command is ran in Discord guilds
 * @prop {string[]} [flags] The command flags array, if there is no flags it'll return an empty array
 * 
 * @typedef {Object} ParentOptions
 * @prop {string} category The category
 * @prop {string} command The command file
 */