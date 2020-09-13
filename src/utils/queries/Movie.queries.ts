import AtributesCrud from './queries';
import Movie, { IMovie } from '../../models/Movie';

class MovieQueries implements AtributesCrud<IMovie>{
    async store(json: object): Promise<IMovie> {
        try {
            const createdMovie = new Movie({ ...json });
            await createdMovie.save();
            return createdMovie;
        } catch (error) {
            throw error;
        }

    }
    async update(id: string, json: object): Promise<IMovie | null> {
        try {
            const updated = await Movie.updateOne({ _id: id }, json, { new: true });
            if (!updated) return null

            return updated;
        } catch (error) {
            throw error
        }
    }
    async delete(id: string): Promise<IMovie | Object | null> {
        try {
            const deletedItem = await Movie.deleteOne({ _id: id });
            if (!deletedItem) return null
            return deletedItem;
        } catch (error) {
            throw error
        }
    }
    async getAll(tags?: any): Promise<IMovie[]> {
        try {
            const query = tags && {tags: { $in: tags } };
            const movies = await Movie.find( query );
            return movies
        } catch (error) {
            throw error
        }
    }
    async findOneById(id: string): Promise<IMovie | null> {
        try {
            const movie = await Movie.findById(id);
            return movie
        } catch (error) {
            throw error
        }
    }
}
export default MovieQueries;