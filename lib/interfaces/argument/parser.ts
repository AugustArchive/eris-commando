export class ArgumentParser {
    public args: string[];
    
    constructor(args: string[]) {
        this.args = args;
    }

    isEmpty(index: number) {
        return !this.args[index];
    }

    gather(seperator?: string) {
        const sep = seperator? seperator: ' ';
        return this.args.join(sep);
    }

    get(index: number) {
        return this.args[index];
    }
}