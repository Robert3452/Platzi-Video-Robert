import { Router } from 'express';
import movies from './movies.routes';
import profile from './profile.routes';
const router = Router();

router.use('/movies', movies);
router.use('/auth', profile);

export default router;