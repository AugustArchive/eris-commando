const { Client }        = require('eris');
const CommandRegistry   = require('./registry/commands');
const EventRegistry     = require('./registry/events');
const InhibitorRegistry = require('./registry/inhibitors');
const SchedulerRegistry = require('./registry/schedulers');
const RESTClient        = require('./util/rest');

module.exports = class CommandoClient extends Client {
    /**
     * Construct the CommandoClient
     * 
     * @param {CommandoClientOptions} options The commando client options
     */
    constructor(options) {
        super(options.token, options.clientOptions);

        this.registry = new CommandRegistry(this);
        this.events = new EventRegistry(this);

        if (options.inhibitors.enabled)
            this.inhibitors = new InhibitorRegistry(this);

        if (options.schedulers.enabled)
            this.schedulers = new SchedulerRegistry(this);

        this.prefix = options.prefix || "!";
        this.owners = options.owners;
        this.clientOptions = options;
    }

    get tag() {
        return `${this.user.username}#${this.user.discriminator}`;
    }
};