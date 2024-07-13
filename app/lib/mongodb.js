// lib/mongodb.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected; // Track the connection status

const connectMongo = async () => {
  if (isConnected) {
    return; // Already connected
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectMongo;
