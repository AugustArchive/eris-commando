module.exports = class Event {
    /**
     * Construct the Event constructor
     * 
     * @param {EventInfo} info The event info
     */
    constructor(info) {
        this.event = info.event;
        this.emitter = info.emitter;
        this.fn = info.run;
    }
};