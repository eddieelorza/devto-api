import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../useCases/user.useCase.js";
import { isAdmin, isAuth } from '../middlewares/auth.middleware.js'


const router = express.Router();

router.get("/",isAuth, async (request, response) => {
  try {
    const { name, age, gender } = request.query;

    let filters = {};

    if (name) filters = { ...filters, name };

    if (age) filters = { ...filters, age };

    if (gender) filters = { ...filters, gender };

    const usersFound = await getUsers(filters);

    response.json({
      success: true,
      data: {
        users: usersFound,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Error at get All userss",
    });
  }
});

router.get("/:id", isAuth, async (request, response) => {
  try {
    const id = request.params.id;

    const usersFound = await getUserById(id);
    response.json({
      success: true,
      data: {
        userss: usersFound,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Error at get users",
    });
  }
});

router.patch("/:id", isAdmin, async (request, response) => {
  try {
    const id = request.params.id;

    let updateData = request.body;

    const userUpdated = await updateUser(id, updateData);
    response.json({
      success: true,
      data: {
        users: userUpdated,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Error at update user",
    });
  }
});

router.delete("/:id", isAdmin, async (request, response) => {
  try {
    const id = request.params.id;

    const deletedUser = await deleteUser(id);
    response.json({
      success: true,
      data: {
        Users: deletedUser,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Error at delete user",
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const newData = request.body;

    const newUser = await createUser(newData);
    response.json({
      success: true,
      data: {
        Users: newUser,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message:error.message,
    });
  }
});

export default router;
