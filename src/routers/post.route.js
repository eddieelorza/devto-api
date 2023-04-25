import express from "express";
import {
  getPosts,
  getPostByUserId,
  createPost,
  updatePost,
  delePost,
} from "../useCases/post.useCase.js";
import { isAuth } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const { name, date, relevant, user } = request.query;

    let filters = {};

    if (name) filters = { ...filters, name };

    if (date) filters = { ...filters, date };

    if (relevant) filters = { ...filters, relevant };

    if (user) filters = { ...filters, user };

    const postFound = await getPosts(filters);
    const objec = Object.values(postFound).map((post) => {
      return post.user;
    });
    console.log(objec);

    response.json({
      success: true,
      data: {
        post: postFound,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Error at get All posts",
    });
  }
});

router.get("/:userId", isAuth, async (request, response) => {
  try {
    const { userId } = request.params;

    const postFound = await getPostByUserId(userId);
    response.json({
      success: true,
      data: {
        posts: postFound,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Error at get post",
    });
  }
});

router.patch("/:id", isAuth, async (request, response) => {
  try {
    const id = request.params.id;

    let updateData = request.body;

    const postUpdated = await updatePost(id, updateData);
    response.json({
      success: true,
      data: {
        posts: postUpdated,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Error at update post",
    });
  }
});

router.delete("/:id", isAuth, async (request, response) => {
  try {
    const id = request.params.id;

    const deletedPost = await delePost(id);
    response.json({
      success: true,
      data: {
        posts: deletedPost,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Error at delete post",
    });
  }
});

router.post("/", isAuth, async (request, response) => {
  try {
    const newData = request.body;
    console.log(newData);

    const newPost = await createPost(newData);
    response.json({
      success: true,
      data: {
        posts: newPost,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
