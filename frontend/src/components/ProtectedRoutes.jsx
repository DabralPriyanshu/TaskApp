import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { API } from "../config/axiosConfig";

const ProtectedRoutes = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        setIsInitialLoading(false);
        return;
      }

      try {
        const response = await API.get("/auth/profile");
        setUser(response.data?.data);
      } catch (err) {
        console.error("Auth check failed:", err.response?.data?.message);
        setUser(null);
      } finally {
        setIsInitialLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isInitialLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoutes;
