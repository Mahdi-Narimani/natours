import mongoose from 'mongoose';

const connectionToDatabase = async () => {
    const DB = process.env.DATABASE_CONNECTION_STRING?.replace(
        '<PASSWORD>',
        process.env.DATABASE_KEY!,
    );

    try {
        await mongoose
            .connect(DB!, {
                dbName: 'natours',
            })
            .then(() => {
                console.log(
                    '\x1b[32m',
                    'You have successfully connected to the MongoDB database',
                );
            });
    } catch (error) {
        console.error('\x1b[31m', error);
    }
};

export default connectionToDatabase;
