import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI


const DBconnect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log('MongoDB is already connected');
        return;
    }

    if ( connectionState === 2)














}