module.exports = {
    // lib/
    CommandoClient: require('./lib/client'),

    // lib/interfaces
    MessageCollector: require('./lib/interfaces/collector'),
    Command: require('./lib/interfaces/command'),
    Event: require('./lib/interfaces/event'),
    Scheduler: require('./lib/interfaces/scheduler'),

    // lib/processors
    CommandProcessor: require('./lib/processors/command'),
    EventProcessor: require('./lib/processors/events'),
    SchedulerProcessor: require('./lib/processors/scheduler'),

    // lib/registry
    CommandRegistry: require('./lib/registry/commands'),
    EventRegistry: require('./lib/registry/events'),
    SchedulerRegistry: require('./lib/registry/schedulers'),

    // lib/util
    Collection: require('./lib/util/collection'),
    RESTClient: require('./lib/util/rest'),
    DiscordUtil: require('./lib/util/discord')
};