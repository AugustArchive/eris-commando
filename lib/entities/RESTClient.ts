import { TextChannel, VoiceChannel, CategoryChannel, Guild, Role, User } from 'eris';
import CommandoClient from '../CommandoClient';

export type AnyRESTChannel = TextChannel | VoiceChannel | CategoryChannel;

export default class RESTClient {
    public client: CommandoClient;

    constructor(client: CommandoClient) {
        this.client = client;
    }

    getRole(query: string, guild: Guild) {
        return new Promise<Role>((resolve, reject) => {
            if (/^\d+$/.test(query)) {
                const role = guild.roles.get(query)!;
                if (role) return resolve(role);
            } else if (/<@%(\d+)>$/.test(query)) {
                const match = query.match(/^<@&(\d+)>$/)!;
                const role  = guild.roles.get(match[1]);
                if (role) return resolve(role);
            } else {
                const roles = guild.roles.filter((role) => role.name.toLowerCase().includes(query.toLowerCase()));
                if (roles.length > 0) return resolve(roles[0]);
            }
            reject();
        });
    }

    getUser(query: string) {
        return new Promise<User>((resolve, reject) => {
            if (/^\d+$/.test(query)) {
                const user = this.client.users.get(query);
                if (user) return resolve(user);
            } else if (/^<@!?(\d+)>$/.test(query)) {
                const match = query.match(/^<@!?(\d+)>$/)!;
                const user = this.client.users.get(match[1]);
                if (user) return resolve(user);
            } else if (/^(.+)#(\d{4})$/.test(query)) {
                const match = query.match(/^(.+)#(\d{4})$/)!;
                const users = this.client.users.filter((user) => user.username === match[1] && Number(user.discriminator) === Number(match[2]));
                if (users.length > 0) return resolve(users[0]);
            } else {
                const users = this.client.users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()));
                if (users.length > 0) return resolve(users[0]);
            }
            reject();
        });
    }

    getGuild(query: string) {
        return new Promise<Guild>((resolve, reject) => {
            if (/^\d+$/.test(query)) {
                const guild = this.client.guilds.get(query);
                if (guild) return resolve(guild);
            } else {
                const guilds = this.client.guilds.filter((guild) => guild.name.toLowerCase().includes(query.toLowerCase()));
                if (guilds.length > 0) return resolve(guilds[0]);
            }

            reject();
        });
    }

    getChannel(query: string, guild: Guild) {
        return new Promise<AnyRESTChannel>((resolve, reject) => {
            if (/^\d+$/.test(query)) {
                if (guild) {
                    if (!guild.channels.has(query)) reject();
                    resolve(guild.channels.get(query));
                } else {
                    const channel = query in this.client.channelGuildMap && this.client.guilds.get(this.client.channelGuildMap[query])!.channels.get(query);
                    if (channel) return resolve(channel);
                }
            } else if (/^<#(\d+)>$/.test(query)) {
                const match = query.match(/^<#(\d+)>$/)!;
                if (guild) {
                    if (!guild.channels.has(match[1])) reject();
                    resolve(guild.channels.get(match[1]));
                } else {
                    const channel = match[1] in this.client.channelGuildMap && this.client.guilds.get(this.client.channelGuildMap[match[1]])!.channels.get(query);
                    if (channel) return resolve(channel);
                }
            } else if (guild) {
                const channel = guild.channels.filter((channel) => channel.name.toLowerCase().includes(query.toLowerCase()));
                if (channel.length > 0) return resolve(channel[0]);
            } 
      
            reject();
        });
    }
