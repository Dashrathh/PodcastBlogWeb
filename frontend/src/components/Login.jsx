import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import { toast } from "react-toastify";
import { BACKEND_API } from "../util/api.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, SetFormError] = useState(null);
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // loading start
    try {
      const response = await BACKEND_API.post("/user/Login", {
        email,
        password,
      });

      const res = response.data.data;
      setUser(res.user);

      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("Login successful");
      navigate("/dashboard");

    } catch (error) {
      SetFormError(error?.message);
      console.error("Error during login:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {formError && (
          <div className="alert bg-red-500 text-white px-4 py-2 rounded-md my-4">
            {formError}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 relative"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>

          ) : (
            "Login"
          )}
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
