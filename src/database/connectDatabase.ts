import debug from "debug";
import mongoose from "mongoose";

const createDebug = debug("users:database");
mongoose.set("strictQuery", false);

const connectDatabase = async (url: string) => {
  await mongoose.connect(url);
  createDebug("Database conected");
};

export default connectDatabase;
