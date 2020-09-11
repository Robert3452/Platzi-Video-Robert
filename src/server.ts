import express from 'express';
import cookieParser from 'cookie-parser';
import config from './config';
import routes from './routes'
import { logErrors, wrapErrors, errorHandler } from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';

const app = express();
//Settings
app.set('port', config.port);

//body parsers
app.use(express.json());
app.use(cookieParser());

// middlewares

//routes
app.use('/api', routes);

//404 error handler
app.use(notFoundHandler);

//errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

export default app;