import { Collection } from '@augu/immutable';
import Repository from './Repository';

export default class Dialect {
    public name: string;
    public repositories: Collection<Repository<any>>;

    constructor(name: string) {
        this.repositories = new Collection({ name: `dialect:${name}:repositories` });
        this.name = name;
    }

    getGuildRepo() {
        if (!this.repositories.has('guilds')) throw new Error('Missing guild repository.');
        return this.repositories.get('guilds') as Repository<any>;
    }

    toString() {
        return `Dialect<${this.name}>`;
    }
}