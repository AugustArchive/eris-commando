export default class CommandoUtil {
    static rgbToInt(a: number, b: number, c: number) {
        // Credit: https://stackoverflow.com/a/8468879
        return (a & 0xff) << 16 + (b & 0xff) << 8 + (c & 0xff);
    }

    static resolveString(str: string | string[]) {
        if (str instanceof Array) return str.join('\n');
        if (typeof str === 'string') return str;
        return String(str);
    }

    static resolveColor(color: number | number[]) {
        if (color instanceof Array) color = CommandoUtil.rgbToInt(color[0], color[1], color[2]);
        if (color < 0 || color > 0xFFFFFF) throw new RangeError('Color cannot be less then 0 and over #FFFFFF (White)');
        if (color && isNaN(color)) throw new TypeError('Color wasn\'t a number.');
        return Number(color);
    }

    static clone<T>(obj: any): T {
        const cloned = Object.create(obj);
        return Object.assign<any, T>(obj, cloned);
    }
}