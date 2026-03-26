import { Task } from "../models/taskModel.js";
export class TaskRepository {
  constructor() {
    this.model = Task;
  }
  async create(data) {
    return await this.model.create(data);
  }
  async getById(taskId) {
    return await this.model.findById(taskId);
  }
  async destroy(taskId) {
    return await this.model.findByIdAndDelete(taskId);
  }
  async getAll(userId) {
    return await this.model.find({ userId });
  }
  async update(taskId, data) {
    const task = await this.getById(taskId);
    if (data.status) {
      task.isCompleted = !task.isCompleted;
    }
    if (data.title) {
      task.title = data.title;
    }
    if (data.description) {
      task.description = data.description;
    }
    await task.save();
    return task;
  }
}
