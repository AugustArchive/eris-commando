const ArgumentType = require('../interfaces/type');

module.exports = class BoolType extends ArgumentType {
    constructor(client) { 
        super(client, 'bool');

        this.truth = new Set(['true', 'truth', 'enable', 'enabled', '+']);
        this.false = new Set(['false', 'disable', 'disabled', '-']);
    }

    validate(_, val) {
        let value = val.toLowerCase();
        return this.truth.has(value) || this.false.includes(value);
    }

    parse(_, val) {
        let value = val.toLowerCase();
        if (this.truth.has(value))
            return true;
        if (this.false.has(value))
            return false;
        throw new Error(`Unknown bool type: ${value}`);
    }
};