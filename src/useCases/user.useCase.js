import { User } from "../models/user.module.js";
import bcrypt from '../libs/bcrypt.js'


const createUser = async (userData) => {
  const { email, password } = userData;
  const userFound = await User.findOne({ email });

  console.log(userFound);
  console.log(userData);


  if (userFound) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password);

 return User.create({ ...userData, password: hashedPassword });

};

const getUsers = async (filters = {}) => {
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
