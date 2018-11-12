module.exports = class CommandMessage {
    /**
     * The command message class
     * 
     * Properties:
     *  - `bot: CommandoClient` - The bot client
     *  - `msg: Message` - The eris message
     *  - `args: string[]` - The command arguments
     *  - `prefix: string` - The command prefix
     * 
     * @param {import('../client')} bot The bot client
     * @param {import('eris').Message} msg The eris message
     * @param {string[]} args The command arguments
     * @param {string} prefix The command prefix
     */
    constructor(bot, msg, args, prefix) {
        this.bot = bot;
        this.msg = msg;
        this.args = args;
        this.prefix = prefix;
    }

    /** @returns {import('eris').Guild} */
    get guild() {
        return this.msg.channel.guild;
    }

    /** @returns {import('eris').User} */
    get sender() {
        return this.msg.author;
    }

    /**
     * Sends a message to a text channel
     * 
     * @param {string} content The content to send
     * @returns {Promise<import('eris').Message>}
     */
    async reply(content) {
        return this.msg.channel.createMessage(content);
    }

    /**
     * Sends a embed to a text channel
     * 
     * @param {import('eris').EmbedOptions} content The content to send
     * @returns {Promise<import('eris').Message>}
     */
    async embed(content) {
        return this.msg.channel.createMessage({ embed: content });
    }

    /**
     * Sends a dm to the sender
     * 
     * @param {string} content The content to send
     * @returns {Promise<import('eris').Message>}
     */
    async dm(content) {
        const dm = await this.sender.getDMChannel();
        return dm.createMessage(content);
    }

    /**
     * Sends a codeblock in a text channel
     * 
     * @param {string} [lang=null] The language that the codeblock is in
     * @param {string} content The content that is in the code block
     * @returns {Promise<import('eris').Message>}
     */
    async code(lang, content) {
        return this.reply(`\`\`\`${lang || ''}\n${content}\`\`\``);
    }
};