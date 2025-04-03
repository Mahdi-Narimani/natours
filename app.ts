import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import tourRouter from './routes/tour.routes';
import userRouter from './routes/user.routes';

import AppError from './utils/appError';
import { errorController as globalErrorHandler } from './controllers/error/error.controller';
const app: Express = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
