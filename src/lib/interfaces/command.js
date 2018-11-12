module.exports = class Command {
    /**
     * The command interface. Start. Here.
     * 
     * Properties:
     *  - `bot: CommandoClient` - The bot client
     *  - `meta: (type) CommandMeta` - The command meta (object)
     * 
     * @param {import('../client')} bot The bot client
     * @param {CommandMeta} meta The command meta
     */
    constructor(bot, meta) {
        this.bot = bot;
        this.meta = meta;
    }

    /**
     * Run the command
     * 
     * @param {import('./message')} msg The command message
     * @returns {Promise<void>}
     */
    async run(msg) {}

    /**
     * Create the 'usage' string
     * 
     * @private
     * @returns {string}
     */
    usage() {
        return `${this.bot.prefix}${this.meta.command} ${this.meta.usage}`;
    }
};

/**
 * @typedef {Object} CommandMeta
 * @prop {string} command The command name
 * @prop {string} description The command description
 * @prop {string} usage The command usage
 * @prop {string} category The category name 
 * @prop {string[]} [aliases=[]] The command alias(es)
 * @prop {number} [cooldown=3] The command cooldown
 * @prop {object} [checks] The command checks (disabled, hidden, owner, guild, nsfw)
 * @prop {boolean} [checks.hidden=false] Whenther or not the command should be hidden from the help command
 * @prop {boolean} [checks.disabled=false] Whenther or not the command shouldn't be in the Command collection
 * @prop {boolean} [checks.owner=false] Whenther or not the command should be executed by the owners
 * @prop {boolean} [checks.nsfw=false] Whenther or not the command should be executed in nsfw channels
 * @prop {boolean} [checks.guild=false] Whenther or not the command should be handled in DM's or not.
 */