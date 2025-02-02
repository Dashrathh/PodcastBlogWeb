import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify"; // For toast notifications
import { BACKEND_API } from "../util/api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleSuccess = async(response) => {
    const token = response.credential;

    try {
        const res = await BACKEND_API.post("/api/user/auth/google" , {token});
          toast.success("Google Login Successfull")

          navigate("/dashboard");

    } catch (error) {
      toast.err("Google Login Failed")
    }
    console.log("Google Login Success:", token);
  };

  const handleError = (error) => {
    console.log("Google Login Failed:", error);
    toast.error("Google Login Failed");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !fullname) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await BACKEND_API.post("api/user/register", {
        username,
        email,
        password,
        fullname,
      });
      toast.success("Signup successful!");
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Google Signup */}
      <div className="mb-4">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
        />
        <p className="text-gray-600 text-sm text-center mt-2">
          Or continue with Google
        </p>
      </div>

      {/* Signup Form */}
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Full Name:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
        >
          Signup
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
