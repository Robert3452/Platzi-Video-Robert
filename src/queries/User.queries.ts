import AtributesCrud from './queries';
import User, { IUser } from '../models/User';


class UserQueries implements AtributesCrud<IUser>{

    async signinVerify(password: string, email: string): Promise<IUser | null> {
        try {
            const user = await User.findOne({ email });
            if (!user) return null;
            const signedIn = await user.comparePasswords(password);
            if (!signedIn) return null

            return user

        } catch (error) {
            throw error
        }
    }
    async store(json: object): Promise<IUser> {
        try {
            const newUser = new User({ ...json });
            await newUser.save()
            return newUser;
        } catch (error) {
            throw error
        }
    }
    async update(id: string, json: object): Promise<IUser | null> {
        try {
            const updated = await User.updateOne({ _id: id }, json, { new: true });
            if (!updated) return null;
            return updated;
        } catch (error) {
            throw error
        }
    }
    async delete(id: string): Promise<Object | IUser | null> {
        try {
            const deleted = await User.deleteOne({ _id: id });
            if (!deleted) return null
            return deleted
        } catch (error) {
            throw error

        }
    }
    async getAll(): Promise<IUser[]> {
        try {
            const users = await User.find();
            return users
        } catch (error) {
            throw error
        }
    }
    async findOneById(id: string): Promise<IUser | null> {
        try {
            const user = await User.findById(id);
            return user
        } catch (error) {
            throw error

        }
    }
    async getUserByEmail(email: string, comparePwd: boolean = false): Promise<IUser> {
        try {
            const user = await User.findOne({ email });
            if (!user) throw 'user not found'
            return user
        } catch (error) {
            throw error
        }
    }
}

export default UserQueries;