import express from "express";
import postRouter from "./routers/post.route.js";
import userRouter from "./routers/user.route.js";
import commentRouter from "./routers/comment.route.js";
import authRouter from "./routers/auth.route.js";
import cors from "cors";
const server = express();

server.use(express.json());
server.use(cors());
server.use("/posts", postRouter);
server.use("/users", userRouter);
server.use("/comments", commentRouter);
server.use("/auth", authRouter);

export { server };
