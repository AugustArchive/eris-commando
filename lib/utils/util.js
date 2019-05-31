module.exports = class Util {
    /**
     * Checks if `func` is a function
     * @param {Function} func The function
     * @returns {boolean} If it is or not
     */
    static isFunction(func) {
        return typeof func === 'function';
    }

    /**
     * Resolves a string
     * @param {StringResolvable} str The string
     */
    static resolveString(str)
    {
        if (str instanceof Array) return str.join('\n');
        if (typeof str === 'string') return str;
        return String(str);
    }

    /**
     * Resolves a colour
     * @param {ColorResolvable} color The color
     */
    static resolveColor(color)
    {
        if (color instanceof Array) color = YamashiroUtil.rgbToInt(color[0], color[1], color[2]);
        if (color < 0 || color > 0xFFFFFF) throw new RangeError('Color cannot be less then 0 and over #FFFFFF (White)');
        if (color && isNaN(color)) throw new TypeError('Color wasn\'t a number.');
        return color;
    }

    /**
     * Clones an object
     * @param {object} obj The object
     */
    static clone(obj)
    {
        const cloned = Object.create(obj);
        return Object.assign(obj, cloned);
    }
}

/**
 * @typedef {number | number[]} ColorResolvable
 * @typedef {string | string[]} StringResolvable
 */