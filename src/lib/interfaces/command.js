module.exports = class Command {
    /**
     * The command constructor
     * 
     * @param {CommandInfo} info The command info
     */
    constructor(info) {
        this.command = info.command;
        this.description = info.description;
        this.usage = info.usage || '';
        this.category = info.category || {
            name: 'Generic',
            emoji: ':infomational_source:'
        };
        this.aliases = info.aliases || [];
        this.checks = info.checks || {
            guild: false,
            owner: false,
            nsfw: false,
            hidden: false,
            enabled: false
        };
        this.fn = info.run;
    }

    get node() {
        return `${this.category.name.toLowerCase()}.${this.command}`;
    }

    toString() {
        return `Command<${this.command}>`;
    }
};