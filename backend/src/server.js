import express from "express";
import ENV from "./config/serverConfig.js";
import path from "node:path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/dbConfig.js";
import apiRouter from "./routes/apiRoutes.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";

const app = express();

// process.cwd() use kar raha hoon taaki TaskAPP folder se rasta sahi pakde
const __dirname = process.cwd();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

app.use("/api", apiRouter);
app.use(globalErrorHandler);

// Static path fix
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Tera original route (No changes here)
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(ENV.PORT, async () => {
  await connectDB();
  console.log(`Server started at http://localhost:${ENV.PORT}`);
});
