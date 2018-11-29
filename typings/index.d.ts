// TYPESCRIPT DECLARIONS FOR ERIS COMMANDO
// Created by August#5820 (on Discord) or auguwu (on GitHub)
// If you see anything wrong, make sure to make a Pull Request in this repository.

declare module 'eris-commando' {
    import { 
        Message, Guild, 
        Client as DiscordClient, ClientOptions, 
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
        UnavailableGuild, RawPacket, 
        Textable, Collection
    } from 'eris';

    export const version: string;
    export class CommandoClient extends DiscordClient {
        constructor(options: CommandoClientOptions);

        public registry: CommandRegistry;
        public schedulers: SchedulerRegistry;
        public inhibitors: InhibitorRegistry;
        public provider?: Provider;
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
        public on(event: "databaseConnected", listener: () => void): this;
        public on(event: "databaseException", listener: (error: DatabaseException) => void): this;
        public on(event: "inhibitorRegistered", listener: (inbititor: Inhibitor) => void): this;
        public on(event: "inhibitorAlreadyRegistered", listener: (inbititor: Inhibitor) => void): this;
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
        public emitter: CommandoEventEmitter;
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
        public commands: Collection<Command>;

        private setup(): void;
        private handle(msg: Message): void;
        private registerHelpCommand(): void;
    }
    export class SchedulerManager {
      constructor(bot: CommandoClient);

      public bot: CommandoClient;
      public tasks: Collection<Scheduler>;

      private setup(): void;
    }
    export class InihibitorManager {
        constructor(bot: CommandoClient);
        
        public bot: CommandoClient;
        public inhibitors: Collection<Inhibitor>;
                                
        private setup(): void;
    }
    export class LanguageManager {
        constructor(bot: CommandoClient);
        
        public bot: CommandoClient;
        public locales: Collection<Language>;
        
        private setup(): void;
    }
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

      public run(...args: any[]): Promise<void>;
    }
    export class Inhibitor {}
    export class Language {}
    export class Provider {
        constructor(bot: CommandoClient);
    }
    export class RethinkDBProvider {}
    export class MongoDBProvider {}
    export class PostgresProvider {}
    export class SQLiteProvider {}
    export class Provider {
        constructor(bot: CommandoClient);
    }
    export class CommandoException extends Error {
        constructor(message: string);
        public name: string;
    }
    export type CommandoClientOptions = {
        token: string;
        commands: string;
        prefix: string;
        owner: string[];
        defaultHelpCommand?: boolean;
        invite?: string;
        options?: ClientOptions;
        tasks?: string;
        inhibitors?: string;
        languages?: {
            path?: string;
            locales?: string[];
            options?: CommandoI18nOptions;
        };
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
        emitter: CommandoEventEmitter;
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
      "taskAlreadyRegistered" | "taskRegistered" | "databaseException" | "databaseConnected" | "inhibitorRegistered" |
      "inhibitorAlreadyRegistered";
    export type MessageCollectorOptions = {
      channelID: string;
      userID: string;
      timeout?: number;
    };
    export type SchedulerMeta = {
      name: string;
      interval: number;
    };
    export type MessageFilter = (msg: Message) => boolean;
    export type CommandoI18nOptions = {};
}
