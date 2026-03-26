import express from "express";
import userController from "../../controllers/userController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/login", userController.loginUser);
authRouter.post("/register", userController.registerUser);
authRouter.get("/profile", isAuthenticated, userController.getUser);
authRouter.post("/logout", isAuthenticated, userController.logout);

export default authRouter;
