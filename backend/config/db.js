// Import mongoose to interact with MongoDB
import mongoose from 'mongoose';

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using URI from environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Log success message with host info
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error message and exit process with failure code
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Export the connectDB function for external use
export default connectDB;

