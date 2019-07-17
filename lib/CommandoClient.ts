import { Client, ClientOptions } from 'eris';
import CommandManager from './managers/CommandManager';
import CommandService from './services/CommandService';
import { Collection } from '@augu/immutable';
import EventManager from './managers/EventManager';
import TaskManager from './managers/TaskManager';
import TaskService from './services/TaskService';
import Dialect from './entities/Dialect';
import Preset from './entities/Preset';

export type DefaultOptions = ClientOptions & CommandoOptions;
export interface CommandoOptions {
    commandPrefix: string;
    token: string;
    commands: string;
    events: string;
    owners: string | string[];
    dialect?: {
        instance: Dialect;
        column?: string;
    }
    tasks?: {
        enabled: boolean;
        path?: string;
    }
}
export default class CommandoClient extends Client {
    public commandPrefix: string;
    public dialectColumn?: string;
    public owners: string[];
    public dialect?: Dialect;
    public manager: CommandManager;
    public presets: Collection<Preset>;
    public events: EventManager;
    public tasks: TaskManager;

    constructor(options: DefaultOptions) {
        super(options.token, options);

        this.commandPrefix = options.commandPrefix;
        this.manager = new CommandManager(this, options.commands);
        this.events  = new EventManager(this, options.events);
        this.presets = new Collection({ name: 'presets' });
        this.tasks   = new TaskManager(this, options.tasks!.path!);
        this.owners  = options.owners instanceof Array? options.owners: [options.owners];
        this.options = Object.assign<ClientOptions, CommandoOptions>(options, options);

        if (options.dialect!.instance) this.dialect = options.dialect!.instance;
        if (options.dialect!.column) this.dialectColumn = options.dialect!.column;

        this.on('messageCreate', (m) => {
            const service = new CommandService(this);
            service.handle(m);
        });

        this.once('ready', async() => {
            const service = new TaskService(this);
            service.handle();
            this.emit('ready');
        });
    }

    async start() {
        this.manager.start();
        this.events.start();
        this.tasks.start();
        await super.connect()
            .then(() => this.emit('core.connecting'));
    }

    use(preset: Preset) {
        this.presets.set(preset.name, preset);
        return this;
    }
}