import { TaskRepository } from "../repositories/taskRepository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
export class TaskService {
  constructor() {
    this.repository = new TaskRepository();
  }
  async createTask(taskData) {
    try {
      const newTask = await this.repository.create(taskData);
      return newTask;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllTask(userId) {
    try {
      const task = await this.repository.getAll(userId);
      return task;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getTask(id) {
    try {
      const task = await this.repository.getById(id);
      if (!task) {
        throw new NotFoundError("Not found", `Task with ID: ${id} not found`);
      }
      return task;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteTask(id) {
    try {
      const task = await this.repository.destroy(id);
      if (!task) {
        throw new NotFoundError("Not found", `Task with ID: ${id} not found`);
      }
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateTask(id, data) {
    try {
      const task = await this.repository.update(id, data);
      if (!task) {
        throw new NotFoundError("Not found", `Task with ID: ${id} not found`);
      }
      return task;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
