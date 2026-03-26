import { TaskService } from "../services/taskService.js";
import { StatusCodes } from "http-status-codes";
const taskService = new TaskService();

const createTask = async (req, res, next) => {
  try {
    const taskData = {
      title: req.body?.title,
      description: req.body?.description,
      userId: req.user._id,
    };
    const response = await taskService.createTask(taskData);
    return res.status(StatusCodes.CREATED).json({
      data: response,
      success: true,
      message: "Task created successfully",
      error: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getAllTask = async (req, res, next) => {
  try {
    const response = await taskService.getAllTask(req.user._id);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Task fetched successfully",
      error: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const taskId = req.params?.id;
    const response = await taskService.getTask(taskId);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Task fetched successfully",
      error: {},
    });
  } catch (error) {
    console.log("Controller error", error);
    next(error);
  }
};
const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params?.id;
    const response = await taskService.deleteTask(taskId);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Task deleted successfully",
      error: {},
    });
  } catch (error) {
    console.log("Controller error", error);
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    console.log("req body ", req.body);
    const taskId = req.params?.id;
    const response = await taskService.updateTask(taskId, req.body);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Task updated successfully",
      error: {},
    });
  } catch (error) {
    console.log("Controller error", error);
    next(error);
  }
};

export default { createTask, getAllTask, getTask, deleteTask, updateTask };
