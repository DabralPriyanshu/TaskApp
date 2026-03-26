import { StatusCodes } from "http-status-codes";
import ENV from "../config/serverConfig.js";
import { UserService } from "../services/userService.js";
const userService = new UserService();
const registerUser = async (req, res, next) => {
  try {
    const userdata = {
      email: req.body?.email,
      name: req.body?.name,
      password: req.body?.password,
    };
    const response = await userService.createUser(userdata);
    const cookieOptions = {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    };
    res.cookie("token", response.token, cookieOptions);
    return res.status(StatusCodes.CREATED).json({
      data: response.user,
      success: true,
      message: "User created successfully",
      error: {},
    });
  } catch (error) {
    console.log("Controller Error", error);
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const userdata = {
      email: req.body?.email,
      password: req.body?.password,
    };
    const response = await userService.loginUser(userdata);
    const cookieOptions = {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    };
    res.cookie("token", response.token, cookieOptions);
    return res.status(StatusCodes.OK).json({
      data: response.user,
      success: true,
      message: "User logged in  successfully",
      error: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({
      data: req.user,
      success: true,
      message: "User fetched  successfully",
      error: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "Lax",
    });
    return res.status(StatusCodes.OK).json({
      data: {},
      success: true,
      message: "Logged out  successfully",
      error: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export default { registerUser, loginUser, getUser, logout };
