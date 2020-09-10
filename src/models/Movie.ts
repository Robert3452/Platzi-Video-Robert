import { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
    title: string,
    year: number,
    cover: string,//uri
    description: string,
    duration: number,
    contentRating: number,
    source: string,
    tags: string[]

}

const movieSchema = new Schema({
    title: { type: String, maxlength: 30 },
    year: { type: Number, min: 1888, max: 3000 },
    cover: { type: String },//uri
    description: { type: String, maxlength: 300 },
    duration: { type: Number, min: 1, max: 300 },
    contentRating: { type: Number, max: 5 },
    source: { type: String },//uri
    tags: { type: [String] }

})

export default model<IMovie>('movie', movieSchema);