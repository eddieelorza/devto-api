import mongoose, { Schema, mongo } from "mongoose";

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 100,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      minLength: 3,
      maxLenght: 20,
      trim: true,
    },
  ],
  relevant: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.model("post", postSchema);

export { Post };
