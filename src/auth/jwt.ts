import passport from 'passport';

import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt'
import config from '../config';
import boom from '@hapi/boom';
import UserQueries from '../queries/User.queries';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authJwtSecret,
};

const jwtStrategy = new Strategy(opts, async (tokenPayload, cb) => {
    const userQueries = new UserQueries();
    try {
        const user = await userQueries.getUserByEmail(tokenPayload.email);
        
        if (!user) return cb(boom.unauthorized(), false);

        return cb(null, { ...user, scopes: tokenPayload.scopes });

    } catch (error) {
        return cb(error)
    }
})

passport.use(jwtStrategy);