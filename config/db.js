import mongoose from "mongoose";
import config from "config";
const db = config.get("mongoURI");

export default async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error(err.message);
    process.exit(1);
  }
};
