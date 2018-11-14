const { readdir } = require('fs');
const Collection  = require('../util/collection');

module.exports = class TaskManager {
    /**
     * The task manager to handle tasks
     * 
     * @param {import('../client')} bot The bot client
     */
    constructor(bot) {
        this.bot = bot;
        this.tasks = new Collection();
    }

    /**
     * Setups all of the tasks and sets the timer
     * 
     * @private
     */
    setup() {
        readdir(this.bot.tasksPath, (error, files) => {
            if (error)
                this.bot.emit('error', error, 0);
            files.forEach((f) => {
                const Task = require(`${this.bot.tasksPath}/${f}`);
                const task = new Task(this.bot);

                if (this.tasks.has(task.name))
                    this.bot.emit('taskAlreadyRegistered', task);
                
                this.tasks.set(task.name, task);
                task.run();
                setInterval(() => task.run(), task.interval);
                this.bot.emit('taskRegistered', task);
            });
        });
    }
};