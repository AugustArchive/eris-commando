const EventService = require('../services/event-service');
const { readdir }  = require('fs');
const { sep }      = require('path');

module.exports = class EventManager
{
    /**
     * Constructs a new instance of the event manager instance
     * @param {import('../client')} client The client instance
     * @param {import('../index').PieceOptions} options The options
     */
    constructor(client, options)
    {
        /**
         * The client
         */
        this.client = client;

        /**
         * The path
         */
        this.path = options.path;

        /**
         * The event service
         */
        this.service = new EventService(client);
    }

    /**
     * Starts the event manager
     */
    start()
    {
        readdir(this.path, (error, files) => {
            if (error) this.client.emit('core.error', error);
            this.client.emit('core.debug', `Building all ${files.length} event${files.length > 1? 's': ''}`);
            files.forEach(file => {
                const event = require(`${this.path}${sep}${file}`);
                /**
                 * The event
                 * @type {import('../entities/event')}
                 */
                let ev;

                if (typeof ev === 'function')         ev = new event(this.client);
                if (typeof ev.default === 'function') ev = new event.default(this.client);
                this.service.run(ev);
            });
        });
    }
};