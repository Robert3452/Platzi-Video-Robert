import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import config from '../config';

// Esta función se encarga de validar si se entregarán las especificaciones del error originado
function withErrorStack(error: ErrorRequestHandler | any, stack: any) {
    if (config.dev)
        return { ...error, stack };
    return error
}
// Imprime los errores si se esta en el ambiente de desarrollo
export function logErrors(err: ErrorRequestHandler | any, req: Request, res: Response, next: NextFunction) {
    if (config.dev)
        console.log(err);
    return next(err);
}
// verifica que los errores lanzados sean de la estructura boom
export function wrapErrors(err: ErrorRequestHandler | any, req: Request, res: Response, next: NextFunction) {
    if (err.hasOwnProperty('_message') || err.hasOwnProperty('path') || err.hasOwnProperty('kind'))
        return next(boom.badRequest(err))

    if (!err.isBoom) {
        return next(boom.badImplementation(err));
    }
    return next(err)
}
// Se encarga de devolver el error expuesto.
export function errorHandler(err: ErrorRequestHandler | any, req: Request, res: Response, next: NextFunction) {
    const {
        output: { statusCode, payload }
    } = err;

    return res.status(statusCode).json(withErrorStack(payload, err.stack));
}


