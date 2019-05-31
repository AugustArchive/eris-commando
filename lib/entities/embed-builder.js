const { resolveString, resolveColor, clone } = require('../util/util');

module.exports = class EmbedBuilder
{
    /**
     * Construct a new instance of the EmbedBuilder utility
     * @param {Embed} [data={}] The data
     */
    constructor(data = {})
    {
        this.title       = data.title;
        this.description = data.description;
        this.author      = data.author;
        this.thumbnail   = data.thumbnail;
        this.image       = data.image;
        this.footer      = data.footer;
        this.color       = data.color;
        this.fields      = data.fields? data.fields.map(clone): [];
        this.timestamp   = data.timestamp;
        this.url         = data.url;
    }

    /**
     * Sets the color of the embed
     * @param {import('../util/util').ColorResolvable} color The color to assign to
     */
    setColor(color)
    {
        this.color = resolveColor(color);
        return this;
    }

    /**
     * Sets the title of the embed
     * @param {string} title The title
     */
    setTitle(title)
    {
        this.title = title;
        return this;
    }
    
    /**
     * Sets an description
     * @param {string} text 
     */
    setDescription(text)
    {
        this.description = resolveString(text);
        return this;
    }

    /**
     * Sets the author of the embed
     * @param {string} name The name of the author
     * @param {string} [url] The url, when hovered; it will send you to that link (optional)
     * @param {string} [iconURL] An icon avatar url
     */
    setAuthor(name, url, iconURL)
    {
        this.author = { name, url, icon_url: iconURL };
        return this;
    }

    /**
     * Sets the thumbnail of the embed
     * @param {string} url The url
     */
    setThumbnail(url)
    {
        this.thumbnail = { url };
        return this;
    }

    /**
     * Adds an field to the embed
     * @param {string} name The name
     * @param {string} value The value
     * @param {boolean} [inline=false] Adds an inline
     */
    addField(name, value, inline = false)
    {
        if (!name) throw new Error("Admiral, you didn't set an name to the field!");
        if (!value) throw new Error("Admiral, you didn't set a value to the field!");
        if (this.fields.length > 25) throw new Error("Unable to add anymore fields since it hit the field threshold (25)");

        this.fields.push({ name: resolveString(name), value: resolveString(value), inline });
        return this;
    }

    /**
     * Sets an image to the embed
     * @param {string} url The url
     */
    setImage(url)
    {
        this.image = { url };
        return this;
    }

    /**
     * Sets a timestamp
     * @param {Date} [t=new Date()] The timestamp
     */
    setTimestamp(t = new Date())
    {
        this.timestamp = t.toISOString();
        return this;
    }

    /**
     * Sets a footer
     * @param {string} txt The text
     * @param {string} [iconURL] The icon url
     */
    setFooter(txt, iconURL)
    {
        this.footer = { text: txt, icon_url: iconURL };
        return this;
    }

    /**
     * Sets the url
     * @param {string} url The URL
     */
    setURL(url)
    {
        this.url = url;
        return this;
    }

    /**
     * Builds the embed
     * @returns {import('eris').EmbedOptions} The embed object
     */
    build()
    {
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

/**
 * @typedef {Object} Embed
 * @prop {string} [title] The title
 * @prop {string} [description] The description
 * @prop {EmbedAuthor} [author] The author
 * @prop {EmbedThumbail} [thumbnail] The thumbnail
 * @prop {EmbedField[]} [fields] The fields
 * @prop {EmbedImage} [image] The image
 * @prop {string} [timestamp] The timestamp
 * @prop {EmbedFooter} [footer] The footer
 * @prop {number} [color] The color
 * @prop {'rich'} [type] The type
 * @param {string} [url] The url
 * 
 * @typedef {Object} EmbedAuthor
 * @prop {string} name The name
 * @prop {string} [url] The URL
 * @prop {string} [icon_url] The icon URL
 * 
 * @typedef {Object} EmbedThumbnail
 * @prop {string} [url] The url
 * 
 * @typedef {Object} EmbedImage
 * @prop {string} [url] The URL
 * 
 * @typedef {Object} EmbedField
 * @prop {string} name The name
 * @prop {string} value The value
 * @prop {string} [inline] The inline boolean
 * 
 * @typedef {Object} EmbedFooter
 * @prop {string} text The text
 * @prop {string} [icon_url] The icon URL
 */