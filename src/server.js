import express from "express";
import postRouter from "./routers/post.route.js";

const server = express();

server.use(express.json());

server.use("/post", postRouter);

export { server };
