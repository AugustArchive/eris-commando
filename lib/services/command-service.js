const CommandContext = require('../entities/context');
const Collection     = require('../utils/collection');

module.exports = class CommandService {
    /**
     * Create a new instance of the Command Service
     * @param {import('../client')} client The client
     */
    constructor(client)
    {
        this.client     = client;
        this.ratelimits = new Collection();
    }

    /**
     * Runs the service
     * @param {import('eris').Message} m The message
     */
    async run(m)
    {
        if (m.author.bot || !this.client.ready) return;

        let prefix     = null;
        const prefixes = this.client.getPrefixes(m.content);

        for (const p of prefixes) if (m.content.startsWith(p)) prefix = p;

        if (!prefix) return;

        const args        = m.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command     = this.client.manager.commands.filter();
    }
}