import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI is not defined");
    throw new Error("MONGODB_URI is not defined");
  }

  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      retryWrites: true,
      retryReads: true,
    });

    isConnected = true;
    console.log("New database connection established");
    console.log("Database connection state:", mongoose.connection.readyState);

    return db;
  } catch (error) {
    if (error instanceof Error) {
      console.error("MongoDB connection error:", {
        name: error.name,
        message: error.message,
        uri: process.env.MONGODB_URI?.replace(/\/\/[^:]+:[^@]+@/, "//***:***@"), // Log URI with hidden credentials
      });
    } else {
      console.error("MongoDB connection error:", error);
    }
    throw error;
  }
};
