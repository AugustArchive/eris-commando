/// <reference path="index.d.ts">
import { CommandoClient, Command, Event, Task } from 'eris-commando';

const client: CommandoClient = new CommandoClient();

class MuteTask extends Task {};
class ReadyEvent extends Event {};
class PingCommand extends Command {};

client.setup();
