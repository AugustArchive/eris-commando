import NoFunctionalityException from '../errors/NoFunctionalityException';

export interface UpdateOne {
    column: string;
    id: string;
    doc: string;
    onCallback: (error: any) => void;
}
export default interface Repository<T> {
    get(column: string, id: string): Promise<T | null>;
    create(column: string, id: string, ...values): T;
    remove(column: string, id: string): Promise<void>;
    update(meta: UpdateOne): any;
}