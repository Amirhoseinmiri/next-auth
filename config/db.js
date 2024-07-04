import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to mongoDB");
  } catch (error) {
    console.error(`Error is: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
