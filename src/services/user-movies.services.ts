import { Request, Response, NextFunction } from 'express'
import UserMoviesQueries from '../utils/queries/UserMovie.queries';

const userMoviesQueries = new UserMoviesQueries();
/** 
 * GET USER-MOVIES
 *  */
export const getUserMovies = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    try {
        const userMovies = await userMoviesQueries.getAll(userId);
        res.status(200).json({
            data: userMovies,
            message: "User movies listed"
        });
    } catch (error) {
        next(error)
    }
}
/**
 * POST ADD USER-MOVIE
 * 
 */
export const addUserMovie = async (req: Request, res: Response, next: NextFunction) => {
    const { body: userMovie } = req;
    try {
        const createdUserMovieId = await userMoviesQueries.store( userMovie )
        res.status(201).json({
            data: createdUserMovieId,
            message: 'user movie created',
        })
    } catch (error) {
        next(error)
    }
}
/**
 * DELETE USER MOVIE
 * 
 */
export const deleteUserMovie = async (req: Request, res: Response, next: NextFunction) => {
    const { userMovieId } = req.params;
    try {
        const deletedUserMovieId = await userMoviesQueries.delete(userMovieId);
        res.status(200).json({
            data: deletedUserMovieId,
            message: "User movie deleted"
        })
    } catch (error) {
        next(error)
    }
}
