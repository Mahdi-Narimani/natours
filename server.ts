import app from './app';
import dotenv from 'dotenv';
import connectionToDatabase from './connection/mongoose';

dotenv.config({ path: './config.env' });
console.log(
    '\x1b[36m',
    'Type of development environment:',
    '\x1b[32m',
    process.env.NODE_ENV,
);

connectionToDatabase();

const port: number = Number(process.env.PORT);

app.listen(port, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});
