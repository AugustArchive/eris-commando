const { CommandoClient } = require('../src');
const { token, prefix } = require('./config');
const path = require('path');

const discord = new CommandoClient({
    token,
    prefix,
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
});
discord.setup();