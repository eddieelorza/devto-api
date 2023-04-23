import { Post } from "../models/post.module.js";

const createPost = async (postData) => {
  return Post.create(postData);
};

const getPosts = async (filters) => {
  return Post.find(filters);
};

const getPostByUserId = async (userId) => {
  return Post.find({ user: userId });
};


const updatePost = async (id, dataUpdate, options = {}) => {
  return Post.findByIdAndUpdate(id, dataUpdate, { new: true }, ...options);
};

const delePost = async (id) => {
  return Post.findByIdAndDelete(id);
};

export { createPost, getPosts, getPostByUserId, updatePost, delePost };
