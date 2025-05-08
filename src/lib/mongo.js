import mongoose from "mongoose";

export const connectToMongo = async () => {
  const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@learning.ouci4bw.mongodb.net/?retryWrites=true&w=majority&appName=Learning`
    );
  } catch (error) {
    console.error("Unable to connect to the Mongo database:", error);
    process.exit(1);
  }

  console.log("Connection with MongoDB has been established successfully.");
};
