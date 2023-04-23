import express from "express";
import postRouter from "./routers/post.route.js";
import userRouter from "./routers/user.route.js";
import commentRouter from "./routers/comment.route.js";

const server = express();

server.use(express.json());

server.use("/posts", postRouter);
server.use("/users", userRouter);
server.use("/comments", commentRouter);

export { server };
