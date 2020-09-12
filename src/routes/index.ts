import { Router } from 'express';
import movies from './movies.routes';
import profile from './profile.routes';
import userMovies from './userMovies.routes'
const router = Router();

router.use('/movies', movies);
router.use('/auth', profile);
router.use('/user-movies', userMovies)

export default router;