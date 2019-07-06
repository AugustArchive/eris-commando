export interface Collector {
    filter: () => boolean;
    accept: () => void;
}

export default class MessageCollector {}