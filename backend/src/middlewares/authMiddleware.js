import { UnAuthorizedError } from "../errors/UnAuthorizedError.js";
import jwt from "jsonwebtoken";
import ENV from "../config/serverConfig.js";
import { User } from "../models/userModel.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("token is ", token);
    if (!token) {
      throw new UnAuthorizedError("Unauthorized ", `No token provided`);
    }
    const decoded = await jwt.verify(token, ENV.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new UnAuthorizedError("Unauthorized", `Expire or invalid token`);
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(err.statusCode || 401).json({
      data: {},
      success: false,
      message: err.message || "Unauthorized",
      error: err.error || "Authentication fail",
    });
  }
};
