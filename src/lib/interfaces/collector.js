module.exports = class MessageCollector {
    /**
     * Construct the MessageCollector class
     * 
     * @param {CommandoClient} client The bot client
     */
    constructor(client) {
        this.collectors = {};
        client.on('messageCreate', this.verify.bind(this));
    }

    /**
     * Verifies the message if it was the author who made it
     * 
     * @param {Message} msg The eris message
     */
    verify(msg) {
        if (!msg.author)
            return;

        const collector = this.collectors[msg.channel.id + msg.author.id];
        if (collector && collector.filter(msg))
            collector.accept(msg);
    }
}