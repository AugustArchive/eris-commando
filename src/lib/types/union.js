const IArgumentType = require('../interfaces/type');

module.exports = class ArgumentUnionType extends IArgumentType {
    constructor(client, id) {
        super(client, id);

        let ids = id.split('/'); // Argument Type IDs must contain: "user/member" to provide 2 or more types
        this.types = [];
        for (let i of ids) {
            const type = client.registry.types.get(i);
            if (!type)
                throw new RangeError(`Type "${i}" wasn't added to the registry! Did you add your type path?`);
            this.types.push(i);
        }
    }

    async validate(msg, val, arg) {
        let results = this.types.map(t => !t.isEmpty(msg, val, arg) && t.validate(msg, val, arg));
        results = await Promise.all(results);
        if (results.some(v => v && typeof v !== 'string'))
            return true;
        const errors = results.filter(s => typeof s === 'string');
        if (errors.length > 0)
            return errors.join('\n');
        return false;
    }

    async parse(msg, val, arg) {
        let results = this.types.map(t => !t.isEmpty(msg, val, arg) && t.validate(msg, val, arg));
        results = await Promise.all(results);
        for (let i = 0; i < results.length; i++)
            if (results[i] && typeof results[i] !== 'string')
                return this.types[i].parse(msg, val, arg);
        throw new Error(`Unable to parse value "${val}". (Union Type: ${this.id})`);
    }

    isEmpty(msg, val, arg) { return !this.types.some(t => !t.isEmpty(msg, val, arg)); }
};