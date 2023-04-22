import { User } from "../models/user.module.js";

const createUser = async (userData) => {
  return User.create(userData);
};

const getUsers = async (filters) => {
  return User.find(filters);
};

const getUserById = async (id) => {
  return User.findById(id);
};

const updateUser = async (id, dataUpdate, options = {}) => {
  return User.findByIdAndUpdate(id, dataUpdate, { new: true }, ...options);
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };
