export class DiscordUtil {
    /**
     * Checks if `x` is an function (Useful for `help` command bundled)
     * @param x The thing
     * @returns A boolean if it is or not
     */
    public static isFunction(x: any): boolean {
        return typeof x === 'boolean';
    }
}