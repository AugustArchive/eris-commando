declare module 'eris-commando' {
    import {
        Message, Guild,
        Client as DiscordClient, ClientOptions,
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
        User, MemberPartial,
        EmbedOptions, TextChannel,
        CategoryChannel
    } from 'eris';

    export const version: string;
    
    export class CommandoClient extends DiscordClient {
        constructor(options: CommandoClientOptions);

        public registry: CommandRegistry;
        public events: EventRegistry;
        public schedulers?: SchedulerRegistry;
        public inhibitors: Set<Function>;
        public tag: string;
        public owners: string[];
        public prefix: string | string[] | PrefixSupplier;
        public start(): Promise<void>;
        public destroy(reconnect?: boolean): void;
        public owner(userID: string): boolean;
        /** Return false if the inihibitor should execute */
        public addInhibitor(listener: (msg: Message) => void): boolean;
        public on(event: Emittable, listener: Function): this;
        public on(event: "ready" | "disconnect", listener: () => void): this;
        public on(event: "callCreate" | "callRing" | "callDelete", listener: (call: Call) => void): this;
        public on(event: "callUpdate", listener: (call: Call, oldCall: OldCall) => void): this;
        public on(event: "channelCreate" | "channelDelete", listener: (channel: AnyChannel) => void): this;
        public on(event: "channelPinUpdate", listener: (channel: TextableChannel, timestamp: number, oldTimestamp: number) => void): this;
        public on(event: "channelRecipientAdd" | "channelRecipientRemove", listener: (channel: GroupChannel, user: User) => void): this;
        public on(event: "channelUpdate", listener: (channel: AnyChannel, oldChannel: OldChannel) => void): this;
        public on(event: "friendSuggestionCreate",listener: (user: User, reasons: FriendSuggestionReasons) => void): this;
        public on(event: "friendSuggestionDelete", listener: (user: User) => void): this;
        public on(event: "guildAvailable" | "guildBanAdd" | "guildBanRemove", listener: (guild: Guild, user: User) => void): this;
        public on(event: "guildDelete" | "guildUnavailable" | "guildCreate", listener: (guild: Guild) => void): this;
        public on(event: "guildEmojisUpdate", listener: (guild: Guild, emojis: Emoji[], oldEmojis: Emoji[]) => void): this;
        public on(event: "guildMemberAdd", listener: (guild: Guild, member: Member) => void): this;
        public on(event: "guildMemberChunk", listener: (guild: Guild, members: Member[]) => void): this;
        public on(event: "guildMemberRemove", listener: (guild: Guild, member: Member | MemberPartial) => void): this;
        public on(event: "guildMemberUpdate", listener: (guild: Guild, member: Member, oldMember: { roles: string[], nick?: string }) => void): this;
        public on(event: "guildRoleCreate" | "guildRoleDelete", listener: (guild: Guild, role: Role) => void): this;
        public on(event: "guildRoleUpdate", listener: (guild: Guild, role: Role, oldRole: RoleOptions) => void): this;
        public on(event: "guildUpdate", listener: (guild: Guild, oldGuild: GuildOptions) => void): this;
        public on(event: "hello", listener: (trace: string[], id: number) => void): this;
        public on(event: "messageCreate", listener: (message: Message) => void): this;
        public on(event: "messageDelete" | "messageReactionRemoveAll", listener: (message: PossiblyUncachedMessage) => void): this;
        public on(event: "messageDeleteBulk", listener: (messages: PossiblyUncachedMessage[]) => void): this;
        public on(event: "messageReactionAdd" | "messageReactionRemove", listener: (message: PossiblyUncachedMessage, emoji: Emoji, userID: string) => void): this;
        public on(event: "messageUpdate", listener: (message: Message, oldMessage?: { attachments: Attachment[], embeds: Embed[], content: string, editedTimestamp?: number, mentionedBy?: any, tts: boolean, mentions: string[], roleMentions: string[], channelMentions: string[] }) => void): this;
        public on(event: "presenceUpdate", listener: (other: Member | Relationship, oldPresence?: OldPresence) => void): this;
        public on(event: "rawWS" | "unknown", listener: (packet: RawPacket, id: number) => void): this;
        public on(event: "relationshipAdd" | "relationshipRemove", listener: (relationship: Relationship) => void): this;
        public on(event: "relationshipUpdate", listener: (relationship: Relationship, oldRelationship: { type: number }) => void): this;
        public on(event: "typingStart", listener: (channel: TextableChannel, user: User) => void): this;
        public on(event: "unavailableGuildCreate", listener: (guild: UnavailableGuild) => void): this;
        public on(event: "userUpdate", listener: (user: User, oldUser: { username: string, discriminator: string, avatar?: string }) => void): this;
        public on(event: "voiceChannelJoin", listener: (member: Member, newChannel: VoiceChannel) => void): this;
        public on(event: "voiceChannelLeave", listener: (member: Member, oldChannel: VoiceChannel) => void): this;
        public on(event: "voiceChannelSwitch", listener: (member: Member, newChannel: VoiceChannel, oldChannel: VoiceChannel) => void): this;
        public on(event: "voiceStateUpdate", listener: (member: Member, oldState: OldVoiceState) => void): this;
        public on(event: "warn" | "debug", listener: (message: string, id: number) => void): this;
        public on(event: "shardDisconnect" | "error" | "shardPreReady" | "connect", listener: (err: Error, id: number) => void): this;
        public on(event: "shardReady" | "shardResume", listener: (id: number) => void): this;
    }

    export { CommandoClient as Client };

    export class CommandRegistry {
        constructor(client: CommandoClient);

        public commands: Collection<Command>;
        public readonly client: CommandoClient;
        private processor: CommandProcessor;
        protected start(): void;
    }

    export class EventRegistry {
        constructor(client: CommandoClient);

        public readonly client: CommandoClient;
        private processor: EventProcessor;
        protected start(): void;
    }

    export class SchedulerRegistry {
        constructor(client: CommandoClient);

        public tasks: Collection<Scheduler>;
        public readonly client: CommandoClient;
        private processor: SchedulerProcessor;
        protected start(): void;
    }

    export class MessageCollector {
        constructor(client: CommandoClient);

        public collectors: {};
        public readonly client: CommandoClient;
        public verify(msg: Message): void;
        public awaitMessages(filter: MessageFilter, options: { channelID: string; userID: string; timeout?: number; }): Promise<Message>;
    }

    export class Command {
        constructor(info: CommandInfo);

        public command: string;
        public description: string | DescriptionProvider;
        public usage?: string;
        public category?: string;
        public aliases?: string[];
        public checks?: {
            hidden?: boolean;
            owner?: boolean;
            guild?: boolean;
            nsfw?: boolean;
            enabled?: boolean;
        };
        public node: string;
        public execute(client: CommandoClient, msg: CommandMessage): Promise<void>;
    }

    export class Event {
        constructor(info: EventInfo);

        public event: Emittable;
        public emitter: "on" | "once";
    }

    export class Scheduler {
        constructor(info: SchedulerInfo);

        public name: string;
        public interval: number;
    }

    export class CommandProcessor {
        constructor(client: CommandoClient);

        public readonly client: CommandoClient;
        protected process(msg: Message): void;
    }

    export class EventProcessor {
        constructor(client: CommandoClient);

        public readonly client: CommandoClient;
        protected process(event: Event): void;
    }

    export class InhibitorProcessor {
        constructor(client: CommandoClient);

        public readonly client: CommandoClient;
        protected process(): void;
    }

    export class SchedulerProcessor {
        constructor(client: CommandoClient);

        public readonly client: CommandoClient;
        protected process(task: Scheduler): void;
    }

    export class CommandMessage {
        constructor(client: CommandoClient, msg: Message, args: string[]);

        public readonly client: CommandoClient;
        public message: Message;
        public args: string[];
        public guild: Guild;
        public member?: Member;
        public sender: User;
        public channel: TextableChannel;
        public reply(content: string): Promise<Message>;
        public embed(content: EmbedOptions): Promise<Message>;
        public codeblock(lang: string, content: string): Promise<Message>;
    }

    export class Collection<T> extends Map<number | string, T> {
        public get(key: number | string): T;
        public set(key: number | string, value: T): this;
        public delete(key: number | string): boolean;
        public clone(): Collection<T>;
        public concat(...col: Collection<T>[]): T;
        public filter(fn: (val: T) => boolean): T;
    }

    export class RESTClient {
        constructor(client: CommandoClient);

        public getChannel(query: string, guild: Guild): Promise<TextChannel | VoiceChannel | CategoryChannel>;
        public getGuild(query: string): Promise<Guild>;
        public getGuildEmoji(guild: Guild, length?: number): Promise<string>;
        public getUser(query: string): Promise<User>;
        public getRole(query: string): Promise<Role>;
        public getMember(query: string, guild: Guild, noGuessing?: boolean): Promise<Member>;
    }

    export class DiscordUtil {
        public static isFunction(thing: any): boolean;
    }

    export type CommandoClientOptions = {
        token: string;
        prefix: string | PrefixSupplier | string[];
        commands: string;
        events: string;
        schedulers?: {
            enabled?: boolean;
            path?: string;
        };
        useDefaultCommands?: {
            help?: boolean;
            ping?: boolean;
        };
        clientOptions: ClientOptions;
    }

    export type CommandInfo = {
        command: string;
        description: string | DescriptionProvider;
        usage?: string;
        aliases?: string[];
        category?: CommandCategory;
        checks?: {
            hidden?: boolean;
            owner?: boolean;
            guild?: boolean;
            nsfw?: boolean;
            enabled?: boolean;
        };
        ratelimit?: number;
        run: (client: CommandoClient, message: CommandMessage) => Promise<void>;
    }

    export type EventInfo = {
        event: Emittable;
        emitter: "on" | "once";
        run: (client: CommandoClient, ...args: any[]) => Promise<void>;
    }

    export type SchedulerInfo = {
        name: string;
        interval: number;
        run: (client: CommandoClient) => Promise<void>;
    }

    export type MessageFilter = (msg: Message) => boolean;

    export type DescriptionProvider = (client: CommandoClient) => string;

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
        "shardDisconnect" | "error" | "shardPreReady" | "connect" | "shardReady" | "shardResume";

    export type CommandCategory = {
        name: string;
        emoji: string;
    };

    export type PrefixSupplier = (message: Message) => string;
}