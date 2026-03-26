import { API } from "../config/axiosConfig";

const TaskCard = ({ task, fetchTasks, navigate }) => {
  console.log("Rendering task:", task._id);

  const handleStatusUpdate = async (e) => {
    e.stopPropagation();

    try {
      await API.patch(`/task/${task._id}`, { status: true });
      fetchTasks();
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response.data.message || "Error updating task");
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!window.confirm("do you want to delete task?")) return;

    try {
      await API.delete(`/task/${task._id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div
      onClick={() => navigate(`/task/${task._id}`)}
      className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all cursor-pointer group shadow-sm"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors line-clamp-1">
          {task.title}
        </h3>
       
        <span
          className={`text-[10px] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider border ${
            task.isCompleted
              ? "bg-green-500/10 text-green-500 border-green-500/20"
              : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          }`}
        >
          {task.isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="text-zinc-500 text-sm line-clamp-2 mb-6 min-h-[40px]">
        {task.description || "No description provided."}
      </p>

      <div className="flex gap-3 pt-4 border-t border-zinc-800/50">
        
        <button
          onClick={handleStatusUpdate}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            task.isCompleted
              ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              : "bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white"
          }`}
        >
          {task.isCompleted ? "Mark Pending" : "Mark Complete"}
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white py-2 rounded-lg text-xs font-bold transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
