const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/CPI';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log('✅ MongoDB Connected to CPI database');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('⚠️  Make sure MongoDB is running on localhost:27017');
    console.error('⚠️  Server will continue but database operations will fail');
    return false;
  }
};

module.exports = connectDB;

