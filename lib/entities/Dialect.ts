export default class Dialect {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    get() {}
    create() {}
    remove() {}
    update() {}
}