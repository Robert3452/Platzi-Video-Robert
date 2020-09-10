import express from 'express';
import cookieParser from 'cookie-parser';
import config from './config';

const app = express();
//Settings
app.set('port', config.port);

//body parsers
app.use(express.json());
app.use(cookieParser());

// middlewares


//routes


export default app;