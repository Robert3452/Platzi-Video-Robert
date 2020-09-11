import { Router } from 'express';
import * as moviesServices from '../services/movies.services';
import scopesValidationHandler from '../middlewares/scopesValidationHandler';
import passport from 'passport';
const router = Router();

const jwtMiddleware = passport.authenticate('jwt', { session: false });

router.get('/', jwtMiddleware, scopesValidationHandler(['read:movies']), moviesServices.getMovies);
router.get('/:movieId', jwtMiddleware, scopesValidationHandler(['read:movies']), moviesServices.getMovie);
router.post('/', jwtMiddleware, scopesValidationHandler(['create:movies']), moviesServices.createMovie);
router.put('/:movieId', jwtMiddleware, scopesValidationHandler(['update:movies']), moviesServices.updateMovie);
router.delete('/:movieId', jwtMiddleware, scopesValidationHandler(['delete:movies']), moviesServices.deleteMovie);


export default router;