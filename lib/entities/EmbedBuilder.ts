import Util from '../utility';

export interface Embed {
    title?: string;
    description?: string;
    author?: EmbedAuthor;
    thumbnail?: EmbedThumbnail;
    fields?: EmbedField[];
    image?: EmbedImage;
    footer?: EmbedFooter;
    timestamp?: string;
    color?: number;
    type?: 'rich';
    url?: string;
}

export interface EmbedAuthor {
    name: string;
    url?: string;
    icon_url?: string;
}

export interface EmbedThumbnail {
    url?: string;
}

export interface EmbedImage {
    url?: string;
}

export interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

export interface EmbedFooter {
    text: string;
    icon_url?: string;
}

export default class EmbedBuilder {
    public title: string | undefined;
    public description: string | undefined;
    public author: EmbedAuthor | undefined;
    public thumbnail: EmbedThumbnail | undefined;
    public image: EmbedImage | undefined;
    public footer: EmbedFooter | undefined;
    public color: number | undefined;
    public fields: EmbedField[];
    public timestamp: string | undefined;
    public url: string | undefined;

    constructor(data: Embed = {}) {
        this.title       = data.title;
        this.description = data.description;
        this.author      = data.author;
        this.thumbnail   = data.thumbnail;
        this.image       = data.image;
        this.footer      = data.footer;
        this.color       = data.color;
        this.fields      = data.fields? data.fields.map<EmbedField>(Util.clone): [];
        this.timestamp   = data.timestamp;
        this.url         = data.url;
    }

    setColor(color: number | number[]) {
        this.color = Util.resolveColor(color);
        return this;
    }

    setTitle(title: string) {
        this.title = title;
        return this;
    }
    
    setDescription(text: string) {
        this.description = Util.resolveString(text);
        return this;
    }

    setAuthor(name: string, url?: string, iconURL?: string) {
        this.author = { name, url, icon_url: iconURL };
        return this;
    }

    setThumbnail(url: string) {
        this.thumbnail = { url };
        return this;
    }

    addField(name: string, value: string, inline: boolean = false) {
        if (!name) throw new Error("Admiral, you didn't set an name to the field!");
        if (!value) throw new Error("Admiral, you didn't set a value to the field!");
        if (this.fields.length > 25) throw new Error("Unable to add anymore fields since it hit the field threshold (25)");

        this.fields.push({ name: Util.resolveString(name), value: Util.resolveString(value), inline });
        return this;
    }

    setImage(url: string) {
        this.image = { url };
        return this;
    }

    setTimestamp(t: Date = new Date()) {
        this.timestamp = t.toISOString();
        return this;
    }

    setFooter(txt: string, iconURL: string) {
        this.footer = { text: txt, icon_url: iconURL };
        return this;
    }

    setURL(url: string) {
        this.url = url;
        return this;
    }

    build() {
        return {
            title: this.title,
            description: this.description,
            type: 'rich',
            fields: this.fields,
            author: this.author? this.author: undefined,
            image: this.image? this.image: undefined,
            footer: this.footer? this.footer: undefined,
            color: this.color,
            url: this.url? this.url: undefined,
            timestamp: this.timestamp? this.timestamp: undefined
        };
    }
}