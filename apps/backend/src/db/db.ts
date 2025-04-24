import mongoose from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27018/neochat";

export const connectDB = () => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(MONGO_URL);
};