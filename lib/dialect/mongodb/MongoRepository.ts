import { Model, Document, Schema, model as __model__ } from 'mongoose';

export interface MongoUpdateOne {
    column: string;
    id: string;
    doc: { [x: string]: string }
    onCallback: (error?: any) => void;
}
export default class MongoRepository<T extends Document> {
    public model: Model<T, {}>;

    constructor(name: string, schema: Schema) {
        this.model = __model__(name, schema);
    }

    async get(column: string, id: string): Promise<T | null> {
        const model = await this.model.findOne({ [column]: id }).exec();
        if (!model || model === null) return null;
        else return model;
    }

    async create(column: string, id: string): Promise<T> {
        const query = new this.model({ [column]: id });
        query.save();
        return query;
    }

    remove(column: string, id: string) {
        return this.model.findOne({ [column]: id }).remove().exec();
    }

    updateOne(info: MongoUpdateOne) {
        return this.model.updateOne({ [info.column]: info.id }, info.doc, (error: any) => {
            if (error) info.onCallback(error);
            info.onCallback(null);
        });
    }
}