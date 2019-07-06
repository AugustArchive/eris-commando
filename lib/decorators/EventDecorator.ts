export function setEvent(a: string) {
    return event('event', a);
}

function event<T extends Function>(key: string, value: any) {
    return (target: T) => {
        Object.defineProperty(target.prototype, key, {
            value,
            configurable: true,
            enumerable: true,
            writable: true
        });
        return target;
    }
}