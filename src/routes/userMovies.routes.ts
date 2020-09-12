import { Router } from 'express';
import passport from 'passport';
import scopesValidationHandler from '../middlewares/scopesValidationHandler';
import * as  userMoviesServices from '../services/user-movies.services'

const router = Router();
const jwtMiddleware = passport.authenticate('jwt', { session: false });
/** 
 * GET USER-MOVIES
 *  */
router.get('/',
    jwtMiddleware,
    scopesValidationHandler(['read:user-movies']),
    userMoviesServices.getUserMovies);
/**
 * POST ADD USER-MOVIE
 * 
 */
router.post('/',
    jwtMiddleware,
    scopesValidationHandler(['create:user-movies']),
    userMoviesServices.addUserMovie);
/**
 * DELETE USER MOVIE
 * 
 */
router.delete('/:userMovieId',
    jwtMiddleware,
    scopesValidationHandler(['delete:user-movies']),
    userMoviesServices.deleteUserMovie);


export default router;