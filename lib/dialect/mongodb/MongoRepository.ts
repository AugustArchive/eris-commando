import { Model, Document, Schema, model as __model__ } from 'mongoose';
import Repository, { UpdateOne } from '../../entities/Repository';

export default class MongoRepository<T extends Document> implements Repository<T> {
    public model: Model<T, {}>;

    constructor(name: string, schema: Schema) {
        this.model = __model__(name, schema, name);
    }

    async get(column: string, id: string): Promise<T | null> {
        const model = await this.model.findOne({ [column]: id }).exec();
        if (!model || model === null) return null;
        else return model;
    }

    create(column: string, id: string, ...values: any[]): T {
        const query = new this.model({ [column]: id, ...values });
        query.save();
        return query;
    }

    remove(column: string, id: string) {
        return this.model.findOne({ [column]: id }).remove().exec();
    }

    update(info: UpdateOne) {
        return this.model.updateOne({ [info.column]: info.id }, info.doc, (error: any) => {
            if (error) info.onCallback(error);
            info.onCallback(null);
        });
    }
}