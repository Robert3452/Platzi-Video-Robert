import { Request, Response, NextFunction, query } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import boom from '@hapi/boom'
import ApiQueries from '../utils/queries/ApiKeys.queries';
import UserQueries from '../utils/queries/User.queries';

const { adminApiKeysToken, publicApiKeysToken } = config;
const userQueries = new UserQueries();


export const signIn = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('basic', (error, user) => {

        if (error || !user)
            next(boom.unauthorized());

        req.login(user, { session: false }, async (error) => {

            if (error)
                next(error)

            const apiQueries = new ApiQueries();
            const publicToken: any = user.isAdmin
                ? adminApiKeysToken :
                publicApiKeysToken;

            const apiKey = await apiQueries.findByToken(publicToken);

            if (!apiKey) return next(boom.unauthorized());

            const { _id: id, name, email } = user;

            const payload = {
                sub: id,
                name,
                email,
                scopes: apiKey.scopes
            };
            const token = jwt.sign(payload, config.authJwtSecret, {
                expiresIn: '15m'
            });
            return res.status(200).json({ token, user: { id, name, email }, });
        })

    })(req, res, next)
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body: user } = req;
        const createdUser = await userQueries.store(user);

        res.status(201).json({
            data: createdUser._id,
            message: "User created"
        })

    } catch (error) {

        next(error)
    }
}

const getOrCreateUser = async (user: any) => {


    const queriedUser = await userQueries.getUserByEmail(user.email);

    if (queriedUser) {
        return queriedUser;
    }

    await userQueries.store(user);

    return await userQueries.getUserByEmail(user.email);

}

export const signProvider = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const apiQueries = new ApiQueries();
    const { apiKeyToken, ...user } = body;

    if (!apiKeyToken)
        next(boom.unauthorized('apiKeyToken is required'));

    try {
        const queriedUser = await getOrCreateUser(user);

        const apiKey = await apiQueries.findByToken(apiKeyToken);

        if (!apiKey)
            return next(boom.unauthorized())


        const { _id: id, name, email } = queriedUser;

        const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes

        }

        const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m'



        })

        return res.status(200).json({ token, user: { id, name, email } })

    } catch (error) {
        next(error)
    }


}