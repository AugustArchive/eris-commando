const { stripIndents } = require('common-tags');
const MessageCollector = require('./collector');

class Argument {
    constructor(client, info) {
        this.client = client;
        this.collector = new MessageCollector(client);
        this.key = info.key;
        this.label = info.label || info.key;
        this.prompt = info.prompt;
        this.type = this.obtainType(this.type);
        this.default = (typeof info.default !== 'undefined' ? info.default : null);
        this.timer = (info.timer || 30);
        this.max = (typeof info.max !== 'undefined' ? info.max : null);
        this.min = (typeof info.max !== 'undefined' ? info.min : null);
        this.validator = (typeof info.validator !== 'undefined' ? info.validator : null);
        this.infinite = Boolean(info.infinite);
    }

    async obtain(msg, value, promptLimit = Infinity) {
        let empty = this.isEmpty(msg, value);
        if (empty && this.default !== null)
            return {
                value: (typeof this.default === 'function' ? await this.default(msg, this) : this.default),
                cancelled: null,
                prompts: [],
                answers: []
            };
        if (this.infinite)
            return this.obtainInfinite(msg, value, promptLimit);

        const wait = this.timer > 0 && this.timer !== Infinity ? (this.timer) * 1000 : undefined;
        const prompts = [];
        const answers = [];
        let valid = !empty ? await this.validate(msg, val) : false;

        while (!valid || typeof valid === 'string') {
            if(prompts.length >= promptLimit)
                return {
                    value: null,
                    cancelled: 'Prompt limit exceeded.',
                    prompts,
                    answers
                };

            prompts.push(await msg.reply(stripIndents`
                ${empty ? this.prompt.start : valid ? valid : this.prompt.retry}
                Respond with \`cancel\` to cancel the command.
                ${wait ? `This prompt will automatically be cancelled in ${this.wait} seconds.` : ''}
            `));

            const collected = await this.collector.awaitMessages((result) => result.author.id === msg.sender.id, {
                channelID: msg.channel.id,
                userID: msg.sender.id,
                timeout: wait
            });

            if (collected) {
                answers.push(collected);
                value = answers[answers.length - 1].content;
            } else return {
                value: null,
                cancelled: 'Sender didn\'t respond in time.',
                prompts,
                answers
            };

            let v = value.toLowerCase();
            if (v === 'finish')
                return {
                    value: results.length > 0 ? results : null,
                    cancelled: this.default ? null : results.length > 0 ? null : 'User finished the entry.',
                    prompts,
                    answers
                };
            if (v === 'cancel')
                return {
                    value: null,
                    cancelled: 'User cancelled prompt.',
                    prompts,
                    answers
                };

            empty = this.isEmpty(msg, value);
            valid = await this.validate(msg, value);
        }

        return {
            value: await this.parse(msg, val),
            cancelled: null,
            prompts,
            answers
        };
    };

    async obtainInfinite(msg, values, promptLimit = Infinity) {
        let results = [];
        let prompts = [];
        let answers = [];
        let current = 0;
        let wait = this.timer > 0 && this.timer !== Infinity ? (this.timer) * 1000 : undefined;

        while(true) {
            let value = values && values[current] ? values[current] : null;
            let valid = value ? await this.validate(msg, val) : false;
            let attempts = 0;
            while (!valid || typeof valid === 'string') {
                attempts++;
                if (attempts > promptLimit)
                    return {
                        value: null,
                        cancelled: 'Prompt limit exceeded.',
                        prompts,
                        answers
                    };

                if (value) {
                    prompts.push(await msg.reply(stripIndents`
                        ${valid ? valid : this.prompt.retry}
                        Respond with \`cancel\` to automatically cancel the command or respond with \`finish\` to finish the entry.
                        ${wait ? `This will automatically cancel in ${this.wait} seconds!` : ''}
                    `));
                } else if (results.length === 0) {
                    prompts.push(await msg.reply(stripIndents`
                        ${this.prompt.start}
                        Respond with \`cancel\` to automatically cancel the command or respond with \`finish\` to finish the entry.
                        ${wait ? `This will automatically cancel in ${this.wait} seconds!` : ''}
                    `));
                }

                const collected = await this.collector.awaitMessages((result) => result.author.id === msg.sender.id, {
                    channelID: msg.channel.id,
                    userID: msg.sender.id,
                    timeout: wait
                });

                if (collected) {
                    answers.push(collected);
                    value = answers[answers.length - 1].content;
                } else return {
                    value: null,
                    cancelled: 'Sender didn\'t respond in time.',
                    prompts,
                    answers
                };

                let v = value.toLowerCase();
                if (v === 'finish')
                    return {
                        value: results.length > 0 ? results : null,
                        cancelled: this.default ? null : results.length > 0 ? null : 'User finished the entry.',
                        prompts,
                        answers
                    };
                if (v === 'cancel')
                    return {
                        value: null,
                        cancelled: 'User cancelled prompt.',
                        prompts,
                        answers
                    };

                valid = await this.validate(msg, value);
            }

            results.push(await this.parse(msg, value));
            if (values) {
                current++;
                if (current === values.length)
                    return {
                        value: results,
                        cancelled: null,
                        prompts,
                        answers
                    };
            }
        }
    }

    isEmpty(msg, val) {
        return (this.type ? this.type.isEmpty(msg, val) : !val);
    }

    parse(msg, val) {
        return this.type.parse(msg, val);
    }

    validate(msg, val) {
        const valid = (this.validator ? this.validator(msg, val, this) : this.type.validate(msg, val, this));
        if (!valid || typeof valid === 'string')
            return this.prompt.retry || valid;
        if (valid instanceof Promise)
            return valid.then(v => !v || typeof v === 'string' ? this.prompt.retry || v : v);
        return valid;
    }

    obtainType(type) {}
};

module.exports = Argument;