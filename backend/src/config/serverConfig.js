import env from "dotenv";
env.config({ quiet: true });

export default {
  PORT: process.env.PORT || 3001,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  DB_URL: process.env.DB_URL,
  SALT_ROUND: Number(process.env.SALT_ROUND) || 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  NODE_ENV: process.env.NODE_ENV || "development",
};
