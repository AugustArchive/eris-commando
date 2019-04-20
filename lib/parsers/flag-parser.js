module.exports = class FlagParser
{
    /**
     * Creates a new instance of the flag parser
     * @param {string[]} flags The command flags
     * @param {string[]} args The command args
     */
    constructor(flags, args)
    {
        this.flags = flags;
        this.raw  = args;
    }

    /**
     * Parses all flags
     * @returns {Object<string, string | true>} An object of `{ key: 'val' or true }`
     */
    parse()
    {
        const parsed = {};
        for (let i = 0; i < this.raw.length; i++)
        {
            const arg = this.raw[i];
            this.flags.forEach(_ => {
                if (!arg.includes('--')) return;
                parsed[arg.split('--')[1].split('=')[0].toLowerCase()] = arg.includes('=')? arg.split('=')[1]: true;
            });
        }

        return parsed;
    }
}