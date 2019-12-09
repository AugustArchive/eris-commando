import CommandoClient from '../CommandoClient';

export default class TaskService {
    public client: CommandoClient;
    constructor(client: CommandoClient) {
        this.client = client;
    }

    handle() {
        this.client.tasks.forEach(async(task) => {
            await task.run();
            setInterval(async() => {
                await task.run();
            }, task.interval);
        });    
    }
}