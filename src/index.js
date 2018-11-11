module.exports = {
    version: require('../package.json').version,
    CommandoClient: require('./lib/client'),
    Command: require('./lib/interfaces/command'),
    Event: require('./lib/interfaces/event'),
    Collection: require('./lib/util/collection'),
    CommandManager: require('./lib/managers/commands'),
    EventManager: require('./lib/managers/events'),
    CommandMessage: require('./lib/interfaces/message')
};