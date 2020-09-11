import { Router } from 'express';
import * as moviesServices from '../services/movies.services';

const router = Router();


router.get('/', moviesServices.getMovies);
router.get('/:movieId', moviesServices.getMovie);
router.post('/', moviesServices.createMovie);
router.put('/:movieId', moviesServices.updateMovie);
router.delete('/:movieId', moviesServices.deleteMovie);


export default router;