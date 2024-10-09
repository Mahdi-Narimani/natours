import express, { Express } from 'express';
import morgan from 'morgan';

import tourRouter from './routes/tourRouter';
import userRouter from './routes/userRouter';

const app: Express = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// TODO: Add Production mode for project in package.json script

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
