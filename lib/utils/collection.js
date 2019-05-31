module.exports = class Collection extends Map
{
    /**
     * Filters anything to return something
     * @param {Function} fn The function
     * @returns {any[]} An array of packets
     */
    filter(fn)
    {
        const results = [];
        for (const item of this.values())
        {
            if (fn(item)) results.push(item);
        }

        return results;
    }

    /**
     * Maps anything to return something
     * @param {Function} fn The function
     * @returns {any[]} An array of packets
     */
    map(fn)
    {
        const results = [];
        for (const item of this.values()) results.push(fn(item));

        return results;
    }

    /**
     * Randomizes anything and returns the thing
     * @returns {any} The packet that was resolved
     */
    random()
    {
        const iter = Array.from(this.values());
        return iter[Math.floor(Math.random() * iter.length)];
    }

    /**
     * Gets all values
     */
    getValues()
    {
        return [...this.values()];
    }

    /**
     * Gets all keys
     */
    getKeys()
    {
        return [...this.keys()];
    }
}