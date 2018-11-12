module.exports = class Event {
    /**
     * The event listener.
     * 
     * Properties:
     *  - `bot: CommandoClient` - The bot client
     *  - `meta: (type) EventMeta` - The event meta
     * 
     * @param {import('../client')} bot The bot client
     * @param {EventMeta} meta The event meta
     */
    constructor(bot, meta) {
        this.bot = bot;
        this.meta = meta;
    }
};

/**
 * @typedef {Object} EventMeta
 * @prop {string} event The event
 * @prop {CommandoEventEmitter} [emitter="on"] The emitter
 */

/** @typedef {"on" | "once"} CommandoEventEmitter */