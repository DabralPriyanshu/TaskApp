import mongoose from "mongoose";
import ENV from "./serverConfig.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.DB_URL);
    console.log("Database connected successfully!!!");
  } catch (error) {
    console.log("Error connecting Database!!!", error);
    process.exit(1);
  }
};
