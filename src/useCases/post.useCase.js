import { Post } from "../models/post.module.js";

const createPost = async (postData) => {
  return Post.create(postData);
};

const getPosts = async (filters) => {
  return Post.find(filters);
};

const getPostById = async (id) => {
  return Post.findById(id);
};

const updatePost = async (id, dataUpdate, options = {}) => {
  return Post.findByIdAndUpdate(id, dataUpdate, { new: true }, ...options);
};

const delePost = async (id) => {
  return Post.findByIdAndDelete(id);
};

export { createPost, getPosts, getPostById, updatePost, delePost };
