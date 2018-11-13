module.exports = class MessageCollector {
    /**
     * The message collector
     * 
     * Properties:
     *  - `bot: CommandoClient` - The commando client
     *  - `collectors: Object | {}`: The collectors
     * 
     * @param {import('../client')} bot The bot client
     */
    constructor(bot) {
        this.collectors = {};
        bot.on('messageCreate', this.verify.bind(this));
    }

    /**
     * Verify if the message is from the collector
     * 
     * @param {import('eris').Message} msg The message
     * @returns {void}
     */
    verify(msg) {
        if (!msg.author)
            return;

        const collector = this.collectors[msg.channel.id + msg.author.id];
        if (collector && collector.filter(msg))
            collector.accept(msg);
    }

    /**
     * Await an message
     * 
     * @param {(msg: import('eris').Message) => boolean} filter The filter to filter out the correct response
     * @param {MessageCollectorOptions} options The options
     * @returns {Promise<import('eris').Message>}
     */
    awaitMessage(filter, options) {
        const { channelID, userID, timeout } = options;

        return new Promise((accept) => {
            if (this.collectors[channelID + userID])
                delete this.collectors[channelID + userID];

            this.collectors[channelID + userID] = { filter, accept };

            setTimeout(() => accept.bind(null, false), timeout);
        });
    }
};
/**
 * @typedef {Object} MessageCollectorOptions
 * @prop {string} channelID The channel ID
 * @prop {string} userID The user ID
 * @prop {number} [timeout=30e3] The time to see?
 */