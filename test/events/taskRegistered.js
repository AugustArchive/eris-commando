const { Event } = require('../../src');

module.exports = class TaskRegisteredEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'taskRegistered',
            emitter: 'on'
        });
    }

    run(task) {
        console.log(`[TASK:${task.name}] Task has been registered.`);
    }
};