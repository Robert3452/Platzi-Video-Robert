import { Request, Response, NextFunction } from 'express';
import MovieQueries from '../utils/queries/Movie.queries'
import boom from '@hapi/boom';

const movieQueries = new MovieQueries();

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
    const { tags } = req.query;
    try {
        const movies = await movieQueries.getAll(tags);
        res.status(200).json({
            data: movies,
            message: 'movies listed'
        })
    } catch (error) {
        next(error)
    }
}

export const getMovie = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { movieId } = req.params;

        const movie = await movieQueries.findOneById(movieId);
        if (!movie) throw boom.notFound();

        return res.status(200).json({
            data: movie._id,
            message: "Movie retrieved",
        })
    } catch (error) {
        return next(error)
    }
}

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body: movie } = req;
        const createdMovie = await movieQueries.store(movie);
        return res.status(201).json({
            data: createdMovie._id,
            message: 'movie created'
        })
    } catch (error) {
        next(error);
    }
}

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { movieId } = req.params;
        const { body: movie } = req;

        const updated = await movieQueries.update(movieId, movie);
        return res.status(200).json({
            data: updated,
            message: 'movie updated'
        })

    } catch (error) {
        next(error)
    }
}
export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { movieId } = req.params;
        const deletedMovie = await movieQueries.delete(movieId);
        return res.status(200).json({
            data: deletedMovie,
            message: "movie deleted"
        });
    } catch (error) {
        // res.json(error)
        next(error)
    }
}