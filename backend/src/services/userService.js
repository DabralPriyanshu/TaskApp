import { UserRepository } from "../repositories/userRepository.js";
import { generateToken } from "../utils/jwt.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { UnAuthorizedError } from "../errors/UnAuthorizedError.js";
import { BadRequestError } from "../errors/BadRequestError.js";

export class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  async createUser(userData) {
    try {
      const newUser = await this.repository.create(userData);
      const token = await generateToken(newUser._id);
      return {
        user: { _id: newUser._id, name: newUser.name, email: newUser.email },
        token,
      };
    } catch (error) {
      console.log("Service error", error);
      if (error.code === 11000) {
        throw new BadRequestError(
          "Bad Request",
          `User with ${userData.email} already exist`,
        );
      } else if (error.name === "ValidationError") {
        let err = [];
        Object.keys(error.errors).forEach((key) => {
          err.push(error.errors[key].message);
        });
        console.log(err);
        throw new BadRequestError("Bad Request", err);
      } else {
        throw error;
      }
    }
  }
  async loginUser(userData) {
    try {
      const existUser = await this.repository.getByEmail(userData.email);
      if (!existUser) {
        throw new NotFoundError(
          "Not found ",
          `User with ${userData.email} not found`,
        );
      }
      const isPasswordCorrect = await existUser.comparePassword(
        userData.password,
      );
      if (!isPasswordCorrect) {
        throw new UnAuthorizedError(
          "UnAuthorized",
          `Invalid email or password`,
        );
      }
      const token = await generateToken(existUser._id);
      return {
        user: {
          _id: existUser._id,
          name: existUser.name,
          email: existUser.email,
        },
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
