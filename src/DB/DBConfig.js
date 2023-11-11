import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const response = await mongoose.connect(process.env.MONGO_URL);
    if (response) {
      console.log("Database is connected");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (error) {
    console.log(error);
  }
}
