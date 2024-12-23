import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteBlog = () => {
  const { podcastId } = useParams(); // Get blogId from URL
  // console.log(blogId);
  
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For redirecting after delete

  // Simulated Token (Replace with your token fetching logic)
  const token = localStorage.getItem("accessToken");
  // console.log(token);

  useEffect(() => {
    const deleteBlog = async () => {
      if (window.confirm("Are you sure you want to delete this blog?")) {
        try {
          await axios.delete(`http://localhost:4000/api/podcasts/${podcastId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              
            },
            withCredentials: true,
          });
          setMessage("podcast deleted successfully!");
          toast.success("podcast deleted successfully!");
          setError("");
          // Redirect after successful deletion (e.g., to blog list page)
          navigate("/dashboard");
        } catch (err) {
          console.error("Error deleting podcast:", err.response?.data || err.message);
          setError("Failed to delete the podcast. Please try again.");
            // toast.error("Failed to delete the podcast. Please try again.");
          setMessage("");
        }
      } else {
        navigate("/dashboard"); // Redirect if deletion is canceled
      }
    };


    if (podcastId) {
      deleteBlog();
    }
  }, [podcastId, token, navigate]);

  return (
    <div>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteBlog;
