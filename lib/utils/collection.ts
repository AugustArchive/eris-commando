export class Collection<T> extends Map<string | number, T> {
    /**
     * Filters out anything and returns a boolean
     * @param fn The function to filter out
     * @returns The results as an array
     */
    public filter(fn: (i: T) => boolean): T[] {
        const results: T[] = [];
        for (const item of this.values()) 
            if (fn(item)) 
                results.push(item);

        return results;
    }

    /**
     * Maps everything and returns anything
     * @param fn The function to map out
     * @returns The results as an array
     */
    public map(fn: (i: T) => any): T[] {
        const results: T[] = [];
        for (const item of this.values())
            results.push(fn(item));
        
        return results;
    }
}