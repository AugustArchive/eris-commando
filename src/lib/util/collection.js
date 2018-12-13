module.exports = class Collection extends Map {
    constructor() { super(); }
    get(key) { return super.get(key); }
    set(k, v) {
        super.set(k, v);
        return this;
    }
    delete(k) { return super.delete(k); }
    clone() { return new this.constructor[Symbol.species](this); }
    concat(...col) {
        const newColl = this.clone();
        for (const coll of col)
            for (const [k, v] in coll)
                newColl.set(k, v);
        return newColl;
    }
    filter(val) {
        const arr = [];
        for (const item of this.values())
            if (val(item))
                arr.push(item);
        return arr;
    }
    map(val) {
        const arr = [];
        for (const item of this.values())
            arr.push(val(item));
        return arr;
    }
};