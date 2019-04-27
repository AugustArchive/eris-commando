const { Collection } = require('eris');
const { readdir }    = require('fs');
const { sep }        = require('path');

module.exports = class TaskManager
{
    /**
     * Constructs a new instance of the task manager instance
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
         * The tasks collection
         * @type {Collection<import('../entities/task')>}
         */
        this.tasks = new Collection();

        /**
         * The tasks path
         */
        this.path = options.path;
    }

    /**
     * Starts the task manager
     */
    start()
    {
        readdir(this.path, (error, files) => {
            if (error) this.client.emit('core.error', error);
            this.client.emit('core.debug', `Now building ${files.length} task${files.length > 1? 's': ''}`);
            files.forEach(file => {
                const task = require(`${this.path}${sep}${file}`);
                /**
                 * The task
                 * @type {import('../entities/task')}
                 */
                let tsk;

                if (typeof tsk === 'function')         tsk = new task(this.client);
                if (typeof tsk.default === 'function') tsk = new task.default(this.client);

                this.tasks.set(tsk.name, tsk);
                this.client.emit('tasks.registered', `Registered the "${tsk.name}" task!`);
            });
        });
    }
};