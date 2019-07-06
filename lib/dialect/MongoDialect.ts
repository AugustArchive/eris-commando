import Dialect from '../entities/Dialect';
import m from 'mongoose';

export default class MongoDialect extends Dialect {
    public url: string;

    constructor(url: string) {
        super('MongoDB');

        this.url = url;
    } 

    async connect() {
        const { connection } = await m.connect(this.url);
        connection.on('error', e => e);
    }

    disconnect(onCallback: (success: boolean, error: Error | null) => void) {
        try {
            m.disconnect(() => onCallback(true, null));
        } catch(ex) {
            onCallback(false, ex);
        }
    }
}