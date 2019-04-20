module.exports = class Util {
    /**
     * Checks if `func` is a function
     * @param {Function} func The function
     * @returns {boolean} If it is or not
     */
    static isFunction(func) {
        return typeof func === 'function';
    }
}