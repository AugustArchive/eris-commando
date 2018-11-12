const { CommandoClient } = require('../src');
const { token, prefix } = require('./config.json');
const path = require('path');

new CommandoClient({
    token: token,
    prefix: prefix,
    commands: path.join(__dirname, 'commands'),
    events: path.join(__dirname, 'events'),
    owner: ['280158289667555328'],
    invite: 'https://discord.gg/7TtMP2n',
    defaultHelpCommand: true,
    groupedCommands: true,
    client: {
        maxShards: 'auto',
        autoreconnect: true,
        disableEvents: ['typingStart'],
        disableEveryone: true
    }
}).setup();