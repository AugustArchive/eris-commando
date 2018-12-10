module.exports = {
    // lib/
    CommandoClient: require('./lib/client'),

    // lib/interfaces
    MessageCollector: require('./lib/interfaces/collector'),
    Command: require('./lib/interfaces/command'),
    Event: require('./lib/interfaces/event'),
    Inhibitor: require('./lib/interfaces/inhibitor'),
    Scheduler: require('./lib/interfaces/scheduler'),

    // lib/processors
    CommandProcessor: require('./lib/processors/command'),
    EventProcessor: require('./lib/processors/events'),
    InhibitorProcessor: require('./lib/processors/inhibitors'),
    RatelimitProcessor: require('./lib/processors/ratelimit'),
    SchedulerProcessor: require('./lib/processors/scheduler'),

    // lib/registry
    CommandRegistry: require('./lib/registry/commands'),
    EventRegistry: require('./lib/registry/events'),
    InhibitorRegistry: require('./lib/registry/inhibitors'),
    SchedulerRegistry: require('./lib/registry/schedulers'),

    // lib/util
    Collection: require('./lib/util/collection'),
    RESTClient: require('./lib/util/rest')
};