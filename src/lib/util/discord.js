module.exports = class DiscordUtil {
    /**
     * Check if something is a function
     * 
     * @param {any} thing The thing
     * @returns {boolean}
     */
    static isFunction(thing) {
        return (typeof thing === 'function');
    }
}