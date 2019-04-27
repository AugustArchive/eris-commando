const ArgumentParser = require('../parsers/argument-parser');
const FlagParser = require('../parsers/flag-parser');

module.exports = class CommandContext
{
    /**
     * Creates a new instance of the command context
     * @param {import('../client')} client The client
     * @param {import('eris').Message} message The message from the messageCreate emittion
     * @param {string[]} args The command arguments
     */
    constructor(client, message, args)
    {
        Object.assign(this, message);

        this.client = client;
        this.message = message;
        this.args = new ArgumentParser(args);
    }

    /**
     * Gets the guild
     * @returns {import('eris').Guild} The guild
     */
    get guild()
    {
        return this.message.channel.guild;
    }

    /**
     * Gets the sender
     */
    get sender()
    {
        return this.message.author;
    }

    /**
     * Gets the flag parser
     * @param {import('./command')} cmd The command
     * @example
     * 
     * module.exports = class MyCommand extends Command
     * {
     *    async run(ctx)
     *    {
     *       const flags = ctx.getFlags(this);
     *    }
     * }
     */
    getFlags(cmd)
    {
        return new FlagParser(cmd.flags, this.args.raw);
    }

    /**
     * Sends a message to a text channel
     * @param {string} content The content
     * @param {MessageOptions} [options] The message options
     */
    send(content, options)
    {
        const payload = { embed: null, file: options.file || null };
        if (options instanceof require('./embed-builder')) payload['embed'] = options.embed.build();
        else payload['embed'] = options.embed;

        return this.message.channel.createMessage(content, payload);
    }

    /**
     * Sends a codeblock to a text channel
     * @param {string} language The language
     * @param {string} content The content
     * @param {boolean} [raw] If the codeblock should be sent as a message or not
     */
    code(language, content, raw = false)
    {
        const c = '```';
        const b = `${c}${language}\n${content}${c}`;

        if (raw) return b;
        return this.send(b);
    }

    /**
     * Shoots a DM at a user
     * @param {string} content The content
     * @param {DMMessageOptions} options The options
     */
    async dm(content, options)
    {
        const payload = { user: null, embed: null, file: options.file || null };
        if (!options.user || options.user === null) payload['user'] = this.sender;
        else payload['user'] = options.user;

        if (options instanceof require('./embed-builder')) payload['embed'] = options.embed.build();
        else payload['embed'] = options.embed;

        const ip = { embed: payload.embed, file: payload.file };
        const dm = await payload.user.getDMChannel();
        return dm.createMessage(content, ip);
    }
};

/**
 * @typedef {Object} MessageOptions
 * @param {import('./embed-builder') | import('eris').EmbedOptions} [embed] The embed
 * @param {import('eris').Attachement} [file] The file
 * 
 * @typedef {Object} DMessageOptions
 * @param {import('eris').User} user The user
 * 
 * @typedef {MessageOptions & DMessageOptions} DMMessageOptions
 */