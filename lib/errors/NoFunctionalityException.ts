export default class NoFunctionalityException extends Error {
    constructor(m: string) {
        super(m);
        
        this.name = 'NoFunctionalityException';
    }
}