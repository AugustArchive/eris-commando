module.exports = class Task {
    /**
     * The task interface
     * 
     * @param {import('../client')} bot The bot client
     * @param {TaskMeta} meta The task meta
     */
    constructor(bot, meta) {
        this.bot = bot;
        this.name = meta.name;
        this.interval = meta.interval;
    }

    /**
     * Run the task
     * 
     * @returns {void}
     */
    run() {}
};

/**
 * @typedef {Object} TaskMeta
 * @prop {string} name The task name
 * @prop {number} interval The interval
 */