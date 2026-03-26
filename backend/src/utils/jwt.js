import jwt from "jsonwebtoken";
import ENV from "../config/serverConfig.js";
export const generateToken = async (userId) => {
  return await jwt.sign({ id: userId }, ENV.JWT_SECRET_KEY, {
    expiresIn: ENV.JWT_EXPIRY,
  });
};
