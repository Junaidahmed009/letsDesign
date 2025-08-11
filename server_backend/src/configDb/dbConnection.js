import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.error("Some Error", error);
    process.exit(1);
  }
};
export default connectDb;
