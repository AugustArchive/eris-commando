import NoFunctionalityException from '../errors/NoFunctionalityException';
import CommandoClient from '../CommandoClient';

export type Emittable = "ready" | "disconnect" | "callCreate" | "callRing" | "callDelete" |
    "callUpdate" | "channelCreate" | "channelDelete" | "channelPinUpdate" | "channelRecipientAdd" |
    "channelRecepientRemove" | "channelUpdate" | "friendSuggestionCreate" | "friendSuggestionDelete" |
    "guildAvaliable" | "guildBanAdd" | "guildBanRemove" | "guildDelete" | "guildUnavaliable" | "guildCreate" |
    "guildEmojisUpdate" | "guildMemberAdd" | "guildMemberChunk" | "guildMemberRemove" | "guildMemberUpdate" |
    "guildRoleCreate" | "guildRoleDelete" | "guildRoleUpdate" | "guildUpdate" | "hello" | "messageCreate" | 
    "messageDeleteBulk" | "messageReactionRemoveAll" | "messageDeleteBulk" | "messageReactionAdd" | 
    "messageReactionRemove" | "messageUpdate" | "presenceUpdate" | "rawWS" | "unknown" | "relationshipAdd" | 
    "relationshipRemove" | "relationshipUpdate" | "typingStart" | "unavaliableGuildCreate" | "userUpdate" |
    "voiceChannelJoin" | "voiceChannelLeave" | "voiceChannelSwitch" | "voiceStateUpdate" | "warn" | "debug" |
    "shardDisconnect" | "error" | "shardPreReady" | "connect" | "shardReady" | "shardResume" | "core.debug" |
    "core.error" | "core.reconnecting" | "registry.command.register" | "service.exception" | "command.run";

export default class Event {
    public client: CommandoClient;
    public event: Emittable;

    constructor(client: CommandoClient, event: Emittable) {
        this.client = client;
        this.event  = event;
    }

    async emit(...values: any[]) {
        throw new NoFunctionalityException(`Event "${this.event}" doesn't provide a emit function!`);
    }
}