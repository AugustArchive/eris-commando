const { readdir } = require('fs');

module.exports = class EventManager {
    /**
     * The event manager that handles all of the events
     * 
     * - Properties:
     *  - `bot: CommandoClient` - The commando client
     * 
     * @param {import('../client')} bot The client
     */
    constructor(bot) {
        this.bot = bot;
    }

    /**
     * Handles all of the events
     * 
     * @private
     * @param {import('../interfaces/event')} event The event abstract class
     * @returns {void}
     */
    handle(event) {
        const _ = async(...args) => {
            try {
                await event.run(...args);
            } catch(ex) {
                this.bot.emit('error', ex, 0);
            }
        };

        if (event.emitter === 'on')
            this.bot.on(event.event, _);
        else if (event.emitter === 'once')
            this.bot.once(event.event, _);
    }

    /**
     * Setups all of the events
     * 
     * @private
     */
    setup() {
        readdir(this.bot.eventPath, (error, files) => {
            if (error)
                this.bot.emit('error', error, 0);

            files.forEach(f => {
                const Event = require(`${this.bot.eventPath}/${f}`);
                const event = new Event(this.bot);

                this.handle(event);
            });
        });
    }
};