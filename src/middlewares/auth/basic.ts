import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import boom from '@hapi/boom';
import UserQueries from '../../utils/queries/User.queries'

const basicStrategy = new BasicStrategy(async function (email, password, cb) {
    const userQueries = new UserQueries();
    try {
        const user = await userQueries.signinVerify(password, email);

        if (!user)
            cb(boom.unauthorized('Email o contraseña incorrecto'), false);

        return cb(null, user);

    } catch (error) {


    }
})

passport.use('basic',basicStrategy);