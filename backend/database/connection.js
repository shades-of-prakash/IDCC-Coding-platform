import mongoose from "mongoose"
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    console.log(`Connected to:${connection.connection.host},Database:${connection.connection.name}`)
    return connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB
