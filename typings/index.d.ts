// TYPESCRIPT DECLARIONS FOR ERIS COMMANDO
// Created by August#5820 (on Discord) or auguwu (on GitHub)
// If you see anything wrong, make sure to make a Pull Request in this repository.

declare module 'eris-commando' {
    import { 
        Message, Guild, 
        Client, ClientOptions, 
        EmbedOptions, User, 
        Member, Relationship,
        Call, OldCall,
        OldPresence, TextableChannel,
        MemberPartial, GroupChannel,
        AnyChannel, OldChannel,
        FriendSuggestionReasons, Emoji,
        Role, RoleOptions,
        GuildOptions, Embed,
        Attachment, OldVoiceState,
        VoiceChannel, PossiblyUncachedMessage,
        UnavailableGuild, RawPacket, Textable
    } from 'eris';

    export const version: string;
    export class Collection<K, V> extends Map<K, V> { // Credit: https://github.com/discordjs/discord.js/blob/master/typings/index.d.ts#L277
        private _array: V[];
        private _keyArray: K[];
    
        public array(): V[];
        public clone(): Collection<K, V>;
        public concat(...collections: Collection<K, V>[]): Collection<K, V>;
        public each(fn: (value: V, key: K, collection: Collection<K, V>) => void, thisArg?: any): Collection<K, V>;
        public equals(collection: Collection<any, any>): boolean;
        public every(fn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): boolean;
        public filter(fn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): Collection<K, V>;
        public find(fn: (value: V, key: K, collection: Collection<K, V>) => boolean): V;
        public findKey(fn: (value: V, key: K, collection: Collection<K, V>) => boolean): K;
        public first(): V | undefined;
        public first(count: number): V[];
        public firstKey(): K | undefined;
        public firstKey(count: number): K[];
        public keyArray(): K[];
        public last(): V | undefined;
        public last(count: number): V[];
        public lastKey(): K | undefined;
        public lastKey(count: number): K[];
        public map<T>(fn: (value: V, key: K, collection: Collection<K, V>) => T, thisArg?: any): T[];
        public partition(fn: (value: V, key: K, collection: Collection<K, V>) => boolean): [Collection<K, V>, Collection<K, V>];
        public random(): V | undefined;
        public random(count: number): V[];
        public randomKey(): K | undefined;
        public randomKey(count: number): K[];
        public reduce<T>(fn: (accumulator: any, value: V, key: K, collection: Collection<K, V>) => T, initialValue?: any): T;
        public some(fn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): boolean;
        public sort(compareFunction?: (a: V, b: V, c?: K, d?: K) => number): Collection<K, V>;
        public sweep(fn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): number;
        public tap(fn: (collection: Collection<K, V>) => void, thisArg?: any): Collection<K, V>;
    }
    export class CommandoClient extends Client {
        constructor(options: CommandoClientOptions);

        public manager: CommandManager;
        public events: EventManager;
        public tasks: TaskManager;
        public prefix: string;
        public owners: string[];
        public tag: string;
        
        public setup(): Promise<void>;
        public isOwner(userID: string): boolean;
        public getUptime(): number;
        // #region Eris
        public on(event: string, listener: Function): this;
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
        //#endregion
        //#region Commando
        public on(event: "commandRegistered", listener: (command: Command) => void): this;
        public on(event: "commandCooldown", listener: (msg: CommandMessage, command: Command, left: number) => void): this;
        public on(event: "commandRun", listener: (command: Command) => void): this;
        public on(event: "commandError", listener: (command: Command, error: NodeJS.ErrnoException) => void): this;
        public on(event: "commandAlreadyRegistered", listener: (command: Command) => void): this;
        public on(event: "commandException", listener: (msg: CommandMessage, command: Command, reason: ExceptionReason) => void): this;
        public on(event: "taskAlreadyRegistered", listener: (task: Task) => void): this;
        public on(event: "taskRegistered", listener: (task: Task) => void): this;
        //#endregion
    }
    export { CommandoClient as Client }; // Make it you can use { Client } in the import for TypeScript or JSDoc for JavaScript
    export class Command {
        constructor(bot: CommandoClient, meta: CommandMeta);

        public bot: CommandoClient;
        public command: string;
        public description: string;
        public usage?: string;
        public category?: string;
        public aliases?: string[];
        public cooldown?: number;
        public hidden?: boolean;
        public disabled?: boolean;
        public owner?: boolean;
        public guild?: boolean;
        public nsfw?: boolean;

        public run(msg: CommandMessage): Promise<void>;
    }
    export class Event {
        constructor(bot: CommandoClient, meta: EventMeta);

        public bot: CommandoClient;
        public event: Emittable;
        public emitter?: CommandoEventEmitter;
    }
    export class CommandMessage {
        constructor(bot: CommandoClient, msg: Message, args: string[], prefix: string);

        public bot: CommandoClient;
        public msg: Message;
        public args: string[];
        public prefix: string;
        public guild: Guild;
        public sender: User;
        public collector: MessageCollector;
        public member?: Member;
        public channel: TextableChannel;

        public reply(content: string): Promise<Message>;
        public embed(content: EmbedOptions): Promise<Message>;
        public code(lang: string | null, content: string): Promise<Message>;
    }
    export class CommandManager {
        constructor(bot: CommandoClient);

        public bot: CommandoClient;
        public commands: Collection<string, Command>;

        private setup(): void;
        private handle(msg: Message): void;
        private registerHelp(): void;
    }
    export class EventManager {
        constructor(bot: CommandoClient);

        public bot: CommandoClient;

        public handle(event: Event): void;
        private setup(): void;
    }
    export class TaskManager {
      constructor(bot: CommandoClient);

      public bot: CommandoClient;
      public tasks: Collection<string, Task>;

      private setup(): void;
    }
    export class InihibitorManager {}
    export class MessageCollector {
      constructor(bot: CommandoClient);

      public collectors: {};

      public verify(msg: Message): void;
      public awaitMessage(filter: MessageFilter, options: MessageCollectorOptions): Promise<Message>;
    }
    export class Task {
      constructor(bot: CommandoClient, meta: TaskMeta);

      public bot: CommandoClient;
      public name: string;
      public interval: number;

      public run(msg?: CommandMessage): Promise<void>;
    }
    export class Inhibitor {}
    export type CommandoClientOptions = {
        token: string;
        commands: string,
        events: string,
        prefix: string;
        owner: string[];
        defaultHelpCommand?: boolean;
        invite: string;
        options: ClientOptions;
        tasks: string;
    };
    export type CommandoEventEmitter = "on" | "once";
    export type CommandMeta = {
        command: string;
        description: string;
        usage?: string;
        category?: string;
        aliases?: string[];
        cooldown?: number;
        hidden?: boolean;
        owner?: boolean;
        guild?: boolean;
        nsfw?: boolean;
        disabled?: boolean;
    };
    export type EventMeta = {
        event: Emittable;
        emitter?: CommandoEventEmitter;
    };
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
      "taskAlreadyRegistered" | "taskRegistered";
    export type MessageCollectorOptions = {
      channelID: string;
      userID: string;
      timeout?: number;
    };
    export type TaskMeta = {
      name: string;
      interval: number;
    };
    export type MessageFilter = (msg: Message) => boolean;
}
