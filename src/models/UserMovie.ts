import { Schema, model, Document, SchemaTypes } from 'mongoose';
import { IMovie } from './Movie';
import { IUser } from './User';


export interface IUserMovie extends Document {
    userId: IMovie['_id'],
    movieId: IUser['_id'],
}

const userMovieSchema = new Schema({
    userId: { type: SchemaTypes.ObjectId, ref: 'user' },
    movieId: { type: SchemaTypes.ObjectId, ref: 'movie' },
})

export default model<IUserMovie>('user-movie', userMovieSchema);