import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const { USER_NAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

const URL = `mongodb+srv://${USER_NAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const connect = () => {
  return mongoose.connect(URL);
};

export default connect;
