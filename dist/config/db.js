import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/family');
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
