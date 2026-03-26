import { User } from "../models/userModel.js";
export class UserRepository {
  constructor() {
    this.model = User;
  }
  async create(data) {
    return await this.model.create(data);
  }
  async getById(userId) {
    return await this.model.findById(userId);
  }
  async getByEmail(email) {
    return await this.model.findOne({email});
  }
  async getAllUsers() {
    return await this.model.find({});
  }
}
