import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import TaskDetail from "./pages/Task";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {


  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/task/:id"
        element={
          <ProtectedRoutes>
            <TaskDetail />
          </ProtectedRoutes>
        }
      />
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
