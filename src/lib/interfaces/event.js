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
        this.event = meta.event;
        this.emitter = meta.emitter;
    }
};

/**
 * @typedef {Object} EventMeta
 * @prop {Emittable} event The event
 * @prop {CommandoEventEmitter} [emitter="on"] The emitter
 */

/** @typedef {"on" | "once"} CommandoEventEmitter */
/** @typedef {"ready" | "disconnect" | "callCreate" | "callRing" | "callDelete" | "callUpdate" | "channelCreate" | "channelDelete" | "channelPinUpdate" | "channelRecipientAdd" | "channelRecepientRemove" | "channelUpdate" | "friendSuggestionCreate" | "friendSuggestionDelete" | "guildAvaliable" | "guildBanAdd" | "guildBanRemove" | "guildDelete" | "guildUnavaliable" | "guildCreate" | "guildEmojisUpdate" | "guildMemberAdd" | "guildMemberChunk" | "guildMemberRemove" | "guildMemberUpdate" | "guildRoleCreate" | "guildRoleDelete" | "guildRoleUpdate" | "guildUpdate" | "hello" | "messageCreate" | "messageDeleteBulk" | "messageReactionRemoveAll" | "messageDeleteBulk" | "messageReactionAdd" | "messageReactionRemove" | "messageUpdate" | "presenceUpdate" | "rawWS" | "unknown" | "relationshipAdd" | "relationshipRemove" | "relationshipUpdate" | "typingStart" | "unavaliableGuildCreate" | "userUpdate" | "voiceChannelJoin" | "voiceChannelLeave" | "voiceChannelSwitch" | "voiceStateUpdate" | "warn" | "debug" | "shardDisconnect" | "error" | "shardPreReady" | "connect" | "shardReady" | "shardResume" | "commandRegistered" | "commandCooldown" | "commandRun" | "commandError" | "commandAlreadyRegistered" | "commandException"} Emittable*/