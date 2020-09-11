import { Router } from 'express';
import movies from './movies.routes';
const router = Router();

router.use('/movies', movies);


export default router;