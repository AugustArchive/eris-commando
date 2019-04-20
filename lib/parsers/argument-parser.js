module.exports = class ArgumentParser
{
    /**
     * The argument parser instance
     * @param {string[]} args Arguments from the `messageCreate` emittion
     */
    constructor(args)
    {
        this.raw = args;
    }

    /**
     * Gets the argument from the `index` provided
     * @param {number} index The index
     * @returns {string} The argument
     */
    get(index)
    {
        return this.raw[index];
    }

    /**
     * Checks if the argument's `index` is empty
     * @param {string} index The index to check
     */
    isEmpty(index)
    {
        return !this.raw[index];
    }

    /**
     * Gathers all arguments. Equlivient to `Array<string>#join()`
     * @param {string} [sep=' '] The seperation
     */
    gather(sep)
    {
        return this.raw.join(sep || ' ');
    }
};