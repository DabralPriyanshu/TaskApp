import express from "express";
import authRouter from "./authRouter.js";
import taskRouter from "./taskRouter.js";
const v1Router = express.Router();

v1Router.use("/auth", authRouter);
v1Router.use("/task", taskRouter);

export default v1Router;
