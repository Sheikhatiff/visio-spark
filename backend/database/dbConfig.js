import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // await mongoose.connect(
    //   process.env.DB_URI.replace("<DB_PASS>", process.env.DB_PASS)
    // );
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected!");
  } catch (error) {
    throw error;
  }
};
