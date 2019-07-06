import { Subcommand } from '../entities/Command';

export function name(a: string) {
    return command('name', a);
}

export function description(a: string) {
    return command('description', a);
}

export function usage(a: string) {
    return command('usage', a);
}

export function category(a: string) {
    return command('category', a);
}

export function aliases(a: string[]) {
    return command('aliases', a);
}

export function guildOnly(a: boolean) {
    return command('guildOnly', a);
}

export function ownerOnly(a: boolean) {
    return command('ownerOnly', a);
}

export function nsfw(a: boolean) {
    return command('nsfw', a);
}

export function hidden(a: boolean) {
    return command('hidden', a);
}

export function disabled(a: boolean) {
    return command('disabled', a);
}

export function throttle(a: number) {
    return command('throttle', a);
}

export function subcommands(a: Subcommand[]) {
    return command('subcommands', a);
}

function command<T extends Function>(key: string, value: any) {
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