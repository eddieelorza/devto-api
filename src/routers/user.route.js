import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../useCases/user.useCase.js";

const router = express.Router();

router.get("/", async (request, response) => {
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

router.get("/:id", async (request, response) => {
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

router.patch("/:id", async (request, response) => {
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

router.delete("/:id", async (request, response) => {
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

router.post("/:id", async (request, response) => {
  try {
    const newData = request.body;

    const newPost = await createUser(newData);
    response.json({
      success: true,
      data: {
        Users: newUser,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Error at create User",
    });
  }
});

export default router;
