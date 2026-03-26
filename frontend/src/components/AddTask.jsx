import { useState } from "react";
import { API } from "../config/axiosConfig.js";

const AddTask = ({ fetchTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/task/create", data);
      setData({ title: "", description: "" });
      setIsOpen(false);
      fetchTasks();
    } catch (err) {
      alert(err.response.data.message || "Error adding task");
    }
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-all mb-8"
      >
        + Add New Task
      </button>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl mb-8 space-y-4"
    >
      <input
        className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 outline-none focus:border-blue-500"
        placeholder="Task Title"
        required
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <textarea
        className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 outline-none focus:border-blue-500 h-20"
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm"
        >
          Save Task
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-zinc-400 text-sm underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTask;
