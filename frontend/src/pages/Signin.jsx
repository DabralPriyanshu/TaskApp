import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../config/axiosConfig";
import { AuthContext } from "../context/AuthContext";

const Signin = () => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/login", formData);
      console.log(response.data);
      setUser(response.data.data);
      alert(response.data.message);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.error || "Error while login user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">
          Welcome Back
        </h2>
        <p className="text-zinc-500 text-center mb-8 text-sm">
          Please enter your details
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-800 text-white px-4 py-2.5 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-600"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-800 text-white px-4 py-2.5 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-500 text-sm">
          New here?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
