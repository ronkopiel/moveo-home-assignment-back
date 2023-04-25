import { connect } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const uri = process.env.MONGODB_URI

export const connectToDB = async () => {
  try {
    await connect(`${uri}`);
    console.log("db connected");
  } catch (err) {
    console.log("error connecting to DB", err);
  }
};
