import { Schema, Document, model } from 'mongoose'
export interface IScope extends Document {
    scopes: string[],
    token: string
}

const scopeSchema = new Schema({
    scopes: { type: [String] },
    token: { type: String }
});

export default model<IScope>('api-keys', scopeSchema);