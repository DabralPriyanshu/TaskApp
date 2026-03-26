import express from "express";
import ENV from "./config/serverConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/dbConfig.js";
import apiRouter from "./routes/apiRoutes.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use("/api", apiRouter);
app.use(globalErrorHandler);
app.listen(ENV.PORT, async () => {
  await connectDB();
  console.log(`Server started at  http://localhost:${ENV.PORT}`);
});
