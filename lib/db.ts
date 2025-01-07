import mongoose from 'mongoose';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

const DBconnect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log('MongoDB is already connected');
        return;
    }

    if (connectionState === 2) {
        console.log('MongoDB connection is currently establishing');
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI!, {
            dbName: 'NextJSAPI',
            bufferCommands: true,
        });
        console.log('MongoDB connection established successfully');
    } catch (error: any) {
        console.error('MongoDB connection error:', error.message);
        throw new Error(`MongoDB connection error: ${error.message}`);
    }
};

export default DBconnect;
