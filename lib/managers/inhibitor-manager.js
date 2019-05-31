const InhibitorService = require('../services/inhibitor-service');
const Collection       = require('../utils/collection');
const { readdir }      = require('fs');
const { sep }          = require('path');

module.exports = class InhibitorManager
{
    /**
     * Construct a new instance of the inhibitor manager instance
     * @param {import('../client')} client The client
     * @param {import('../index').PieceOptions} options The options
     */
    constructor(client, options)
    {
        /**
         * The client
         */
        this.client = client;

        /**
         * The inhibitor collection
         * @type {Collection}
         */
        this.inhibitors = new Collection();

        /**
         * The inhibitor path
         */
        this.path = options.path;

        /**
         * The inhibitor service
         */
        this.service = new InhibitorService(client);
    }

    /**
     * Starts the inhibitor manager
     */
    start()
    {
        readdir(this.path, (error, files) => {
            if (error) this.client.emit('core.error', error);
            this.client.emit('core.debug', `Building ${files.length} inhibitor${files.length > 1? 's': ''}`);
            files.forEach(file => {
                const inhibitor = require(`${this.path}${sep}${file}`);
                /**
                 * The inhibitor
                 * @type {import('../entities/inhibitor')}
                 */
                let inh;

                if (typeof inh === 'function')         inh = new inhibitor(this.client);
                if (typeof inh.default === 'function') inh = new inhibitor.default(this.client);

                this.inhibitors.set(inh.name, inh);
                this.client.emit('inhibitors.registered', `Registered the "${inh.name}" inhibitor!`);
            });
        });
    }
};