const { Client } = require('eris');
const CommandManager = require('./managers/commands');
const EventManager = require('./managers/events');

module.exports = class CommandoClient extends Client {
    /**
     * The `CommandoClient` is the start of your discord bot client.
     * 
     *  - All options must be in a [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) or in curly brackets (`{}`)
     *  - All options are in the types: `Commando.CommandoClientOptions & Eris.ClientOptions`
     * 
     * @param {CommandoClientOptions & import('eris').ClientOptions} options The options to setup your bot
     */
    constructor(options) {
        super(options.token, options);

        this.manager = new CommandManager(this, options.commands);
        this.events = new EventManager(this, options.events);
        this.owners = options.owner;
        this.prefix = options.prefix;
        this.invite = options.invite;
        this.options = options;

        if (options.defaultHelpCommand)
            this.manager.registerHelp();
    }

    /**
     * Setups the bot
     */
    async setup() {
        this.manager.setup();
        this.events.setup();
        await super.connect();
    }

    /**
     * If the bot owner executed an naughty command or not!
     * 
     * @param {string} userID The user ID
     * @returns {boolean} If the owners executed it or not
     */
    isOwner(userID) {
        return this.owners.includes(userID);
    }
};

/**
 * @typedef {Object} CommandoClientOptions
 * @prop {string} commands The command path
 * @prop {string} events The event path
 * @prop {boolean} [groupedCommands=true] If you want to group the commands. Default is `true`
 * @prop {boolean} [defaultHelpCommand=false] If you want to use the default help command that Eris Commando provides. Default is `false`.
 * @prop {string} prefix The command prefix
 * @prop {string} invite The discord.gg invite if an error occured
 * @prop {string[]} owner The owner array or string
 * @prop {string} token The discord bot token
 */