import express from "express";
import postRouter from "./routers/post.route.js";
import userRouter from "./routers/user.route.js";

const server = express();

server.use(express.json());

server.use("/post", postRouter);
server.use("/user", userRouter);

export { server };
