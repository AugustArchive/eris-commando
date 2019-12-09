import Preset from '../entities/Preset';

export default class LoggerPreset extends Preset {
    constructor() {
        super('Logger');
    }

    info(m: string) {
        process.stdout.write(`${m}\n`);
        return this;
    }

    error(m: string) {
        process.stdout.write(`${m}\n`);
        return this;
    }
}