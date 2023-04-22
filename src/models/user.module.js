import mongoose, { Schema, mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 100,
    trim: true,
  },
  age: {
    type: number,
    min: 1,
    max: 100,
    required: true,
  },
  gender: {
    type: String,
    enum: ["m", "h", "o"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.*@.*\..*/,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("user", userSchema);

export { User };
