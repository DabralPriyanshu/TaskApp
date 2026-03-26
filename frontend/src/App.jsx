import React, { useEffect, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { API } from "./config/axiosConfig";
import { AuthContext } from "./context/AuthContext";
import TaskDetail from "./pages/Task";

const App = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await API.get("/auth/profile");
        setUser(response.data?.data);
      } catch (err) {
        console.error("Auth check failed:", err.response?.data.message);
        setUser(null);
        setError("Session expired or not logged in");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setLoading]);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/task/:id" element={<TaskDetail />} />
      <Route
        path="*"
        element={
          <div className="text-white text-center mt-20">404 - Not Found</div>
        }
      />
    </Routes>
  );
};

export default App;
