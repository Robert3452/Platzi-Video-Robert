import { Router } from 'express';
import * as profile from '../services/profile.services';
const router = Router();

router.post('/sign-in', profile.signIn);
router.post('/sign-up', profile.signUp);
router.post('/sign-provider',profile.signProvider)

export default router;