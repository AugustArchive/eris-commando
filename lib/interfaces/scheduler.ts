import { SchedulerInfo } from '../types';

export class Scheduler {
    public client: any;
    public info: SchedulerInfo;

    constructor(client: any, info: SchedulerInfo) {
        this.client = client;
        this.info = info;
    }

    async run() {}
}