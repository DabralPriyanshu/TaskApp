import axios from "axios";
export const API = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_URL ||
    "https://taskapp-1-004p.onrender.com/api/v1",
  withCredentials: true,
});
