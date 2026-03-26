import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config/axiosConfig";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/task/${id}`);
        const data = res.data.data || res.data.task;
        setTask(data);
        setEditData({ title: data.title, description: data.description });
      } catch (err) {
        console.error("Task fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.patch(`/task/${id}`, editData);
      setTask(res.data.data || res.data.task);
      setIsEditing(false);
    } catch (err) {
      alert(err.response.data.message | "Error while updating task");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        Loading Task Details...
      </div>
    );
  if (!task)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-500">
        Task not found!
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto mt-10">
        <button
          onClick={() => navigate(-1)}
          className="text-zinc-500 hover:text-white mb-8 flex items-center gap-2 transition-colors"
        >
          ← Back to Pipeline
        </button>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {!isEditing ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold mb-2 inline-block ${
                      task.status === "completed"
                        ? "bg-green-500/10 text-green-500 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                    }`}
                  >
                    {task.status}
                  </span>
                  <h1 className="text-4xl font-bold tracking-tight text-white">
                    {task.title}
                  </h1>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-all"
                >
                  Edit Task
                </button>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-400 text-lg leading-relaxed whitespace-pre-wrap">
                  {task.description || "No description provided for this task."}
                </p>
              </div>

              <div className="mt-12 pt-6 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-600">
                <p>
                  Created on: {new Date(task.createdAt).toLocaleDateString()}
                </p>
                <p>ID: {id}</p>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              <h2 className="text-xl font-bold text-blue-400">
                Edit Task Mode
              </h2>
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">
                  Task Title
                </label>
                <input
                  className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all h-40"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-500 transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-zinc-800 text-zinc-400 px-6 py-2.5 rounded-xl font-bold hover:bg-zinc-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
