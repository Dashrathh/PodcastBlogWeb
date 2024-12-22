import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteBlog = () => {
  const { blogId } = useParams(); // Get blogId from URL
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
          await axios.delete(`http://localhost:4000/api/blogs/${blogId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              
            },
            withCredentials: true,
          });
          setMessage("Blog deleted successfully!");
          toast.success("Blog deleted successfully!");
          setError("");
          // Redirect after successful deletion (e.g., to blog list page)
          navigate("/dashboard");
        } catch (err) {
          console.error("Error deleting blog:", err.response?.data || err.message);
          setError("Failed to delete the blog. Please try again.");
          setMessage("");
        }
      } else {
        navigate("/blogs"); // Redirect if deletion is canceled
      }
    };

    if (blogId) {
      deleteBlog();
    }
  }, [blogId, token, navigate]);

  return (
    <div>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteBlog;
