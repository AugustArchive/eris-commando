declare module 'eris-commando' {
    import { Sequelize } from 'sequelize';
    import { Connection, Schema } from 'mongoose';
    import {
        Message, Guild,
        Client as DiscordClient, ClientOptions as ErisClientOptions,
        Member, Relationship,
        Call, OldCall,
        OldPresence, TextableChannel,
        AnyChannel, OldChannel,
        FriendSuggestionReasons, Emoji,
        Role, RoleOptions,
        GuildOptions, Embed,
        Attachment, OldVoiceState,
        VoiceChannel, PossiblyUncachedMessage,
        UnavailableGuild, RawPacket,
        Textable, GroupChannel, 
        User, MemberPartial
    } from 'eris';

    export const version: string;
    export class CommandoClient extends DiscordClient {
        constructor(options: CommandoClientOptions);

        public registry: CommandRegistry;
        public events?: EventRegistry;
        public schedulers?: SchedulerRegistry;
        public inhibitors?: InhibitorRegistry;
        public tag: string;
        public owners: string[];
        public prefix: string;
        public uptime: number;
        public start(): Promise<void>;
        public destroy(reconnect?: boolean): void;
        public owner(userID: string): boolean;
        public on(event: Emittable, listener: Function): this;
        public on(event: "ready" | "disconnect", listener: () => void): this;
        public on(event: "callCreate" | "callRing" | "callDelete", listener: (call: Call) => void): this;
        public on(
            event: "callUpdate",
            listener: (
                call: Call,
                oldCall: OldCall,
            ) => void,
        ): this;
        public on(event: "channelCreate" | "channelDelete", listener: (channel: AnyChannel) => void): this;
        public on(
            event: "channelPinUpdate",
            listener: (channel: TextableChannel, timestamp: number, oldTimestamp: number) => void,
        ): this;
        public on(
            event: "channelRecipientAdd" | "channelRecipientRemove",
            listener: (channel: GroupChannel, user: User) => void,
        ): this;
        public on(
            event: "channelUpdate",
            listener: (
                channel: AnyChannel,
                oldChannel: OldChannel,
            ) => void,
        ): this;
        public on(
            event: "friendSuggestionCreate",
            listener: (user: User, reasons: FriendSuggestionReasons) => void,
        ): this;
        public on(event: "friendSuggestionDelete", listener: (user: User) => void): this;
        public on(
            event: "guildAvailable" | "guildBanAdd" | "guildBanRemove",
            listener: (guild: Guild, user: User) => void,
        ): this;
        public on(event: "guildDelete" | "guildUnavailable" | "guildCreate", listener: (guild: Guild) => void): this;
        public on(event: "guildEmojisUpdate", listener: (guild: Guild, emojis: Emoji[], oldEmojis: Emoji[]) => void): this;
        public on(event: "guildMemberAdd", listener: (guild: Guild, member: Member) => void): this;
        public on(event: "guildMemberChunk", listener: (guild: Guild, members: Member[]) => void): this;
        public on(
            event: "guildMemberRemove",
            listener: (guild: Guild, member: Member | MemberPartial) => void,
        ): this;
        public on(
            event: "guildMemberUpdate",
            listener: (guild: Guild, member: Member, oldMember: { roles: string[], nick?: string }) => void,
        ): this;
        public on(event: "guildRoleCreate" | "guildRoleDelete", listener: (guild: Guild, role: Role) => void): this;
        public on(event: "guildRoleUpdate", listener: (guild: Guild, role: Role, oldRole: RoleOptions) => void): this;
        public on(event: "guildUpdate", listener: (guild: Guild, oldGuild: GuildOptions) => void): this;
        public on(event: "hello", listener: (trace: string[], id: number) => void): this;
        public on(event: "messageCreate", listener: (message: Message) => void): this;
        public on(
            event: "messageDelete" | "messageReactionRemoveAll",
            listener: (message: PossiblyUncachedMessage) => void,
        ): this;
        public on(event: "messageDeleteBulk", listener: (messages: PossiblyUncachedMessage[]) => void): this;
        public on(
            event: "messageReactionAdd" | "messageReactionRemove",
            listener: (message: PossiblyUncachedMessage, emoji: Emoji, userID: string) => void,
        ): this;
        public on(event: "messageUpdate", listener: (message: Message, oldMessage?: {
            attachments: Attachment[],
            embeds: Embed[],
            content: string,
            editedTimestamp?: number,
            mentionedBy?: any,
            tts: boolean,
            mentions: string[],
            roleMentions: string[],
            channelMentions: string[],
        }) => void): this;
        public on(
            event: "presenceUpdate",
            listener: (
                other: Member | Relationship,
                oldPresence?: OldPresence,
            ) => void,
        ): this;
        public on(event: "rawWS" | "unknown", listener: (packet: RawPacket, id: number) => void): this;
        public on(event: "relationshipAdd" | "relationshipRemove", listener: (relationship: Relationship) => void): this;
        public on(
            event: "relationshipUpdate",
            listener: (relationship: Relationship, oldRelationship: { type: number }) => void,
        ): this;
        public on(event: "typingStart", listener: (channel: TextableChannel, user: User) => void): this;
        public on(event: "unavailableGuildCreate", listener: (guild: UnavailableGuild) => void): this;
        public on(
            event: "userUpdate",
            listener: (user: User, oldUser: { username: string, discriminator: string, avatar?: string }) => void,
        ): this;
        public on(event: "voiceChannelJoin", listener: (member: Member, newChannel: VoiceChannel) => void): this;
        public on(event: "voiceChannelLeave", listener: (member: Member, oldChannel: VoiceChannel) => void): this;
        public on(
            event: "voiceChannelSwitch",
            listener: (member: Member, newChannel: VoiceChannel, oldChannel: VoiceChannel) => void,
        ): this;
        public on(
            event: "voiceStateUpdate",
            listener: (
                member: Member,
                oldState: OldVoiceState,
            ) => void,
        ): this;
        public on(event: "warn" | "debug", listener: (message: string, id: number) => void): this;
        public on(
            event: "shardDisconnect" | "error" | "shardPreReady" | "connect",
            listener: (err: Error, id: number) => void,
        ): this;
        public on(event: "shardReady" | "shardResume", listener: (id: number) => void): this;
    }
    export class CommandRegistry {
        constructor(bot: CommandoClient);

        public commands: Collection<Command>;
        public bot: CommandoClient;
        protected start(): void;
        public reload(command: Command): boolean;
        public unload(command: Command): boolean;
        public load(command: Command): boolean;
    }
    export class EventRegistry {
        constructor(bot: CommandoClient);

        public bot: CommandoClient;
        protected start(): void;
    }
    export class InhibitorRegistry {
        constructor(bot: CommandoClient);

        public inhibitors: Collection<Inhibitor>;
        public bot: CommandoClient;
        protected start(): void;
    }
    export class SchedulerRegistry {
        constructor(bot: CommandoClient);

        public tasks: Collection<Scheduler>;
        public bot: CommandoClient;
        protected start(): void;
    }
    export class Driver {
        constructor(options: DriverOptions);
    }
    export class PostgreSQLDriver extends Driver {
        constructor(options: PostgreSQLDriverOptions);

        public uri: string;
        public db: Sequelize;
        protected connect(): void;
    }
    export class MongoDBDriver extends Driver {
        constructor(options: MongoDBDriverOptions);

        public uri: string;
        public db: Connection;
        protected connect(): Connection;
    }
    export class MessageCollector {}
    export class Command {}
    export class Event {}
    export class Inhibitor {}
    export class Scheduler {}
    export class Language {}
    export class CommandProcessor {}
    export class EventProcessor {}
    export class InhibitorProcessor {}
    export class PermissionProcessor {}
    export class SchedulerProcessor {}
    export class Collection<T> extends Map<number | string, T> {
        public get(key: number | string): T;
        public set(key: number | string, value: T): this;
        public delete(key: number | string): boolean;
        public clone(): Collection<T>;
        public concat(...col: Collection<T>[]): Collection<T>;
        public each(fn: (val: T) => boolean): T;
        public getValues(): T[];
        public filter(fn: (val: T) => boolean): T;
        public toJSON(): { [k: string]: any; }
    }
    export type DriverOptions = {
        dialect: "postgres" | "mongodb";
    }
    export type PostgreSQLDriverOptions = { uri: string; }
    export type MongoDBDriverOptions = { uri: string; }
    export type CommandoClientOptions = {}
    export type CommandInfo = {}
    export type EventInfo = {}
    export type InhibitorInfo = {}
    export type SchedulerInfo = {}
    export type ExceptionReason = "owner" | "guild" | "nsfw";
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
        "shardDisconnect" | "error" | "shardPreReady" | "connect" | "shardReady" | "shardResume" | "commandRegistered" |
        "commandCooldown" | "commandRun" | "commandError" | "commandAlreadyRegistered" | "commandException" |
        "taskAlreadyRegistered" | "taskRegistered" | "databaseException" | "databaseConnected" | "inhibitorRegistered" |
        "inhibitorAlreadyRegistered";
}