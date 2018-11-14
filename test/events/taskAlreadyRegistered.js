const { Event } = require('../../src');

module.exports = class TaskAlreadyRegisteredEvent extends Event {
    constructor(bot) {
        super(bot, {
            event: 'taskAlreadyRegistered',
            emitter: 'on'
        });
    }

    run(task) {
        console.log(`[TASK:${task.name}] Task is already registered!`);
    }
};