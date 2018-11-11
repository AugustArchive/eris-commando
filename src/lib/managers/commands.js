const Collection = require('../util/collection');
const CommandMessage = require('../interfaces/message');
const { readdir, readdirSync } = require('fs');

module.exports = class CommandManager {
    /**
     * The command manager is where the commands are handled in there respected places.
     * 
     * Properties:
     *  - `commands: Collection<string, Command>`: The command collection
     *  - `bot: CommandoClient`: The bot client
     *  - `cooldowns: Collection<string, Collection>`: The cooldown collection
     * 
     * @param {import('../client')} bot The bot client
     * @param {string} path The command path to register the commands
     */
    constructor(bot, path) {
        this.bot = bot;
        this.commands = new Collection();
        this.cooldowns = new Collection();
    }
};