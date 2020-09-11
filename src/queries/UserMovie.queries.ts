import AtributesQueries from './queries';
import UserMovie, { IUserMovie } from '../models/UserMovie';

class UserMovieQueries implements AtributesQueries<IUserMovie>{
    async store(json: object): Promise<IUserMovie> {
        try {
            const newUserMovie = new UserMovie({ ...json });
            await newUserMovie.save();
            return newUserMovie
        } catch (error) {
            throw error
        }
    }
    async update(id: string, json: object): Promise<IUserMovie | null> {
        try {
            const updated = UserMovie.updateOne({ _id: id }, json, { new: true });
            if (!updated) return null
            return updated
        } catch (error) {
            throw error
        }
    }
    async delete(id: string): Promise<Object | IUserMovie | null> {
        try {
            const deleted = UserMovie.deleteOne({ _id: id });
            return deleted
        } catch (error) {
            throw error
        }
    }
    async getAll(userId?: any): Promise<IUserMovie[]> {
        try {
            const query = userId && { userId };

            const userMovies = UserMovie.find(query)

            return userMovies
        } catch (error) {
            throw error
        }
    }
    async findOneById(id: string): Promise<IUserMovie | null> {
        try {
            const userMovie = UserMovie.findOne({ _id: id })
            return userMovie
        } catch (error) {
            throw error
        }
    }

}

export default UserMovieQueries;