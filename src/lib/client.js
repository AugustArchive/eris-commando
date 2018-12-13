const { Client }        = require('eris');
const CommandRegistry   = require('./registry/commands');
const EventRegistry     = require('./registry/events');
const SchedulerRegistry = require('./registry/schedulers');
const RESTClient        = require('./util/rest');

module.exports = class CommandoClient extends Client {
    /**
     * Construct the CommandoClient
     * 
     * @param {CommandoClientOptions} options The commando client options
     */
    constructor(options) {
        super(options.token, options.clientOptions || {});

        this.registry = new CommandRegistry(this);
        this.events = new EventRegistry(this);

        if (options.schedulers.enabled)
            this.schedulers = new SchedulerRegistry(this);

        this.prefix = options.prefix || "!";
        this.owners = options.owners;
        this.clientOptions = options;
        this.inhibitors = new Set();
        this.rest = new RESTClient(this);
    }

    async start() {
        this.registry.start();
        this.events.start();

        if (options.schedulers.enabled)
            this.schedulers.start();

        super.connect();
    }

    addInhibitor(fn) {
        if (typeof fn !== 'function')
            throw new TypeError("CommandoClient.addInhibitor(fn: (msg: Eris.Message) => void): boolean -> \"fn\" was not a function.");

        if (this.inhibitors.has(fn))
            return false;

        this.inhibitors.add(fn);
        return true;
    }

    destroy(reconnect) { return this.disconnect({ reconnect }); }

    get tag() {
        return `${this.user.username}#${this.user.discriminator}`;
    }
};