import boom from '@hapi/boom';
import { Response, Request, NextFunction } from 'express';

const scopesValidationHandler = (allowedScopes: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const tokenData: any = req.user;
        
        if (!tokenData || (!tokenData.scopes && !tokenData))
            next(boom.unauthorized('Missing scopes'));


        const hasAccess = allowedScopes
            .map(allowedScope => tokenData.scopes.includes(allowedScope))
            .find(allowed => Boolean(allowed));/*Si no es undefined o null sale true*/

        if (hasAccess)
            next();
        else
            next(boom.unauthorized('Insufficient scopes'));


    }
}

export default scopesValidationHandler;