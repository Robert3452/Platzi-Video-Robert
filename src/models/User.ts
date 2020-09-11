import { Schema, Document, model } from 'mongoose'

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
}

const userSchema = new Schema({
    name: { type: String, maxlength: 100 },
    email: { type: String },
    password: { type: String, minlength: 8, },
    isAdmin: { type: Boolean },

})

export default model<IUser>('user', userSchema);
