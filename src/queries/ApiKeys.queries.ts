import Scope, { IScope } from '../models/Scope';
import CrudAttributes from './queries';

export default class ApiKeyQueries implements CrudAttributes<IScope>{
    async store(json: object): Promise<IScope> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, json: object): Promise<IScope | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<Object | IScope | null> {
        throw new Error("Method not implemented.");
    }
    async getAll(token?: string): Promise<IScope[]> {
        throw new Error("Method not implemented.");

    }
    async findOneById(id: string): Promise<IScope | null> {
        throw new Error("Method not implemented.");
    }
    async findByToken(token: string): Promise<IScope | null> {
        try {
            const apiKey = await Scope.findOne({ token });
            return apiKey;
        } catch (error) {
            throw error
        }
    }
}
