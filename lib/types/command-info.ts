export type CommandInfo = {
    command: string;
    description: string | ((client: any) => string);
    usage?: string;
    aliases?: string[];
    category?: string;
    hidden?: boolean;
    owner?: boolean;
    guild?: boolean;
    nsfw?: boolean;
};