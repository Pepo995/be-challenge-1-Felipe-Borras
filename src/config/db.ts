import mongoose from "mongoose";
import createInitialData from "../helpers/initialData";

const connectionString = process.env.CONNECTION_STRING || "";

console.log("connectionString", connectionString);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(connectionString);
    console.log(`MongoDB connected: ${connection.connection.host}`);

    await createInitialData();
  } catch (error) {
    console.log(`Error connecting MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
