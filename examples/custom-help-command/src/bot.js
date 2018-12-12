const { CommandoClient } = require('eris-commando'); // Grab the client's constructor
const { join } = require('path'); // Grab the 'join' option for getting the path of the commands and events

new CommandoClient({
    token: '',
    prefix: ';;',
    commands: join(__dirname, 'commands'),
    events: join(__dirname, 'events')
}).start(); // Start our bot!