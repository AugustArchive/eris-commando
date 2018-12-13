module.exports = class ArgumentType {
    constructor(client, id) {
        this.client = client;
        this.id = id;
    }

    parse(msg, val, args) { throw new SyntaxError('The "parse" method wasn\'t implemented.'); }
    validate(msg, val, args) { throw new SyntaxError('The "validate" method wasn\'t implemented'); }
    isEmpty(msg, val, args) {
        if (Array.isArray(val))
            return val.length === 0;
        return !val;
    }
};