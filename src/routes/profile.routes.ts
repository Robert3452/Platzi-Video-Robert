import { Router } from 'express';
import * as profile from '../services/profile.services';
const router = Router();
import passport from 'passport';
import scopesValidationHandler from '../middlewares/scopesValidationHandler';


const jwtMiddleware = passport.authenticate('jwt', { session: false });
router.post('/sign-in', profile.signIn);
router.post('/sign-up', profile.signUp);
// router.get('/', jwtMiddleware, scopesValidationHandler(["read:movies", "create:movis",]), profile.signed);

export default router;