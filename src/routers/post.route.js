import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  delePost,
} from "../useCases/post.useCase.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const { name, date, relevant,user } = request.query;
    

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

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;

    const postFound = await getPostById(id);
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

router.patch("/:id", async (request, response) => {
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

router.delete("/:id", async (request, response) => {
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

router.post("/:id", async (request, response) => {
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
      message: "Error at create Post",
    });
  }
});

export default router;
