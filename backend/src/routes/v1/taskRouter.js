import express from "express";
import taskController from "../../controllers/taskController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const taskRouter = express.Router();

taskRouter.post("/create", isAuthenticated, taskController.createTask);
taskRouter.get("/", isAuthenticated, taskController.getAllTask);
taskRouter.get("/:id", isAuthenticated, taskController.getTask);
taskRouter.delete("/:id", isAuthenticated, taskController.deleteTask);
taskRouter.patch("/:id", isAuthenticated, taskController.updateTask);

export default taskRouter;
