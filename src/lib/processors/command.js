const { isFunction } = require('../util/discord');

module.exports = class CommandProcessor {
    constructor(client) {
        this.client = client;
    }

    async process(msg) {
        if (msg.author.bot || !this.client.ready)
            return;

        let prefix;
        let prefixes = this.getPrefixes(msg);

        for (const aaaa of prefixes)
            if (msg.content.startsWith(aaaa))
                prefix = aaaa;

        if (!prefix)
            return;
            
        const inhibited = this.inhibit(msg);
        if (!inhibited) {
            
        }
    }

    inhibit(msg) {
        for (const owo of this.client.inhibitors) {
            const inhibited = owo(msg);
            if (!inhibited)
                return false;
            else {
                this.client.emit('commandBlocked', msg);
            }
        }
        return null;
    }

    getPrefixes(message) {
        const regex = new RegExp(`^<@${this.client.user.id}> `).exec(message.content);
        
        return [
            `${regex}`,
            (isFunction(this.client.prefix) ? this.client.prefix(message) : this.client.prefix[0])
        ];
    }
};