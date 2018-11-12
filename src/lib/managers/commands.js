const Collection = require('../util/collection');
const CommandMessage = require('../interfaces/message');
const { readdir, readdirSync } = require('fs');
const HelpCommand = require('../commands/help');

module.exports = class CommandManager {
    /**
     * The command manager is where the commands are handled in there respected places.
     * 
     * Properties:
     *  - `commands: Collection<string, Command>`: The command collection
     *  - `bot: CommandoClient`: The bot client
     *  - `cooldowns: Collection<string, Collection>`: The cooldown collection
     * 
     * @param {import('../client')} bot The bot client
     */
    constructor(bot) {
        this.bot = bot;
        this.commands = new Collection();
        this.cooldowns = new Collection();
    }

    /**
     * Registers the 'help' command.
     * 
     * @private
     * @returns {void}
     */
    registerHelp() {
        const help = new HelpCommand(this.bot);
        this.commands.set(help.meta.command, help);
    }

    /**
     * Setups all of the commands
     * 
     * @private
     */
    async setup() {
        const modules = await readdirSync(this.bot.commandPath);
        for (let i = 0; i < modules.length; i++)
            readdir(`${this.bot.commandPath}/${modules[i]}`, (error, files) => {
                if (error)
                    this.bot.emit('error', error, 0);

                files.forEach((f) => {
                    try {
                        const Command = require(`${this.bot.commandPath}/${modules[i]}/${f}`);
                        const cmd = new Command(this.bot);

                        if (cmd.meta.disabled)
                            return;

                        if (this.commands.has(cmd.meta.command))
                            this.bot.emit('commandAlreadyRegistered', cmd.meta);

                        this.commands.set(cmd.meta.command, cmd);
                        this.bot.emit('commandRegistered', cmd);
                    } catch (ex) {
                        this.bot.emit('error', ex, 0);
                    }
                });
            });
    }

    /**
     * Handle all of the commands
     * 
     * @private
     * @param {import('eris').Message} msg The message
     * @returns {void}
     */
    async handle(msg) {
        if (msg.author.bot || !this.bot.ready)
            return;

        let prefix;
        const mention = new RegExp(`^<@!?${this.bot.user.id}> `)
            .exec(msg.content);
        const prefixes = [this.bot.prefix, `${mention}`];

        for (const i of prefixes)
            if (msg.content.startsWith(i))
                prefix = i;

        if (!prefix)
            return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const ctx = new CommandMessage(this.bot, msg, args, prefix);
        const command = args.shift();
        const cmd = this.commands.get(command);

        if (!command)
            return;

        if (cmd.meta.guild && msg.channel.type === 1)
            this.bot.emit('commandException', cmd, 'guild');
        if (cmd.meta.owner && !this.bot.isOwner(msg.author.id))
            this.bot.emit('commandException', cmd, 'owner');
        if (cmd.meta.nsfw && !msg.channel.nsfw)
            this.bot.emit('commandException', cmd, 'nsfw');

        if (!this.cooldowns.has(cmd.meta.command))
            this.cooldowns.set(cmd.meta.command, new Collection());

        let now = Date.now();
        let timestamps = this.cooldowns.get(cmd.meta.command);
        const amount = (cmd.meta.cooldown) * 1000;

        if (timestamps.has(msg.author.id)) {
            const time = timestamps.get(msg.author.id) + amount;
            if (now < time)
                this.bot.emit('commandCooldown', ctx, cmd, (time - now) / 1000);
        }

        timestamps.set(msg.author.id);
        setTimeout(() => timestamps.delete(msg.author.id), amount);

        try {
            await cmd.run(ctx);
            this.bot.emit('commandRun', cmd);
        } catch(ex) {
            this.bot.emit('commandError', cmd, ex);
        }
    }
};