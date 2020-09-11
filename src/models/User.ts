import { Schema, Document, model } from 'mongoose'
import bcrypt from 'bcrypt';
export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    comparePasswords: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
    name: { type: String, maxlength: 100 },
    email: { type: String },
    password: { type: String, minlength: 8, },
    isAdmin: { type: Boolean },

})

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
});

userSchema.methods.comparePasswords = async function (password: string): Promise<boolean> {

    const signedIn =  await bcrypt.compare(password, this.password);
    return signedIn
}

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

export default model<IUser>('user', userSchema);
