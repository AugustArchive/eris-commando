const LocalizationManager = require('./managers/localization-manager');
const SchedulerManager    = require('./managers/scheduler-manager');
const InhibitorManager    = require('./managers/inhibitor-manager');
const CommandManager      = require('./managers/command-manager');
const EventManager        = require('./mangers/event-manager');
const { Client }          = require('eris');

module.exports = class CommandoClient extends Client
{
    /**
     * Create a new instance of the client
     * @param {DefaultOptions} options The options to addon
     */
    constructor(options)
    {
        super(options.token, options);

        this.prefixes = options.prefixes;
        this.manager  = new CommandManager(this);
        this.events   = new EventManager(this, { path: options.events });
        this.owners   = (options.owners instanceof Array)? options.owners.map(s => this.users.get(s).id): [options.owners];
        
        if (options.schedulers.enabled) this.schedulers = new SchedulerManager(this, { path: options.path });
        if (options.localization.enabled) this.localization = new LocalizationManager(this, { path: options.path });
        if (options.inhibitors.enabled) this.inhibitors = new InhibitorManager(this, { path: options.path });
        if (options.dialect.enabled) this.database = options.dialect;

        this.on('messageCreate', (m) => this.manager.service.run(m));
    }

    async start()
    {
        this.manager.start();
        this.events.start();
        if (this.schedulers) this.schedulers.start();
        if (this.localization) this.localization.start();
        if (this.inhibitors) this.inhibitors.start();
        if (this.database) this.database.connect();
        await super
            .connect()
            .then(() => this.emit('connecting'));
    }
};

/**
 * @typedef {Object} CommandoClientOptions
 * @prop {string} token The bot's token
 * @prop {string[]} prefixes An array of prefixes, the first prefix is the default prefix
 * @prop {SchedulerOptions} [schedulers] The schedulers options
 * @prop {InhibitorOptions} [inhibitors] The inhibitor's options
 * @prop {string} events The event path
 * @prop {LocalizationOptions} [localization] The localization options
 * @prop {DialectOptions} [dialect] Dialect options
 * @prop {string|string[]} [owners] The owners
 * 
 * @typedef {Object} PieceOptions
 * @prop {boolean} enabled If the piece should be enabled
 * @prop {string} [path] The path if the piece is enabled
 * 
 * @typedef {Object} DialectOptions
 * @prop {boolean} enabled If the dialect is enabled
 * @prop {import('./interfaces/dialect')} [dialect] The dialect to add
 * 
 * @typedef {PieceOptions} SchedulerOptions
 * @typedef {PieceOptions} InhibitorOptions
 * @typedef {PieceOptions} LocalizationOptions
 * @typedef {import('eris').ClientOptions & CommandoClientOptions} DefaultOptions
 */