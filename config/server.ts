import dotenv from 'dotenv';
import connectionToDatabase from './mongoose';

process.on('uncaughtException', (err: Error) => {
    console.log('Uncaught Exception! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

import app from '../app';

dotenv.config({ path: './config.env' });
console.log(
    '\x1b[36m',
    'Type of development environment:',
    '\x1b[32m',
    process.env.NODE_ENV,
);

connectionToDatabase();

const port: number = Number(process.env.PORT);

const server = app.listen(port, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});

process.on('unhandledRejection', (err: Error) => {
    console.log('Unhandled Rejection! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
