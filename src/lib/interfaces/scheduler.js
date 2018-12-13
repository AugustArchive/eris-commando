module.exports = class Scheduler {
    constructor(info) {
        this.name = info.name;
        this.interval = info.interval;
        this.fn = info.run;
    }
};