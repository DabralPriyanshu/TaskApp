import { useEffect, useState, useContext } from "react";
import { API } from "../config/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await API.get("/task");
      setTasks(response.data.tasks || response.data.data || []);
    } catch (err) {
      console.error("Fetch tasks error:", err);
      setError(err.response.data.message | "Error loading task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Logout Logic
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed", err);
      setUser(null);
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome,{" "}
            <span className="text-blue-400">{user?.name || "Developer"}</span>{" "}
            👋
          </h1>
          <p className="text-zinc-500 text-sm italic">Build. Code. Repeat.</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-zinc-900 hover:bg-red-500/10 hover:text-red-500 text-zinc-400 px-5 py-2 rounded-xl border border-zinc-800 hover:border-red-500/50 transition-all text-sm font-semibold"
        >
          Logout
        </button>
      </header>

      <main className="max-w-4xl mx-auto">
        <AddTask fetchTasks={fetchTasks} />

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-zinc-200">Your Pipeline</h2>
          <div className="h-[1px] flex-1 bg-zinc-800 mx-4"></div>
          <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
            {tasks.length} {tasks.length === 1 ? "TASK" : "TASKS"}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            <div className="h-44 bg-zinc-900 rounded-2xl border border-zinc-800"></div>
            <div className="h-44 bg-zinc-900 rounded-2xl border border-zinc-800"></div>
            <div className="h-44 bg-zinc-900 rounded-2xl border border-zinc-800"></div>
            <div className="h-44 bg-zinc-900 rounded-2xl border border-zinc-800"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-500/5 border border-red-500/20 rounded-2xl">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchTasks}
              className="text-sm underline text-zinc-400"
            >
              Retry
            </button>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
            <div className="text-4xl mb-4 text-zinc-700">📋</div>
            <p className="text-zinc-500 font-medium">Your pipeline is empty.</p>
            <p className="text-zinc-600 text-sm mt-1">
              Add a task to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                fetchTasks={fetchTasks}
                navigate={navigate}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
