import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_API } from "../util/api";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await BACKEND_API("/blogs");
        const result = await response.data;

        if (result.data && Array.isArray(result.data)) {
          setBlogs(result.data);
        } else {
          setBlogs([]); // Fallback if the API response is invalid
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:px-16">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={
                  blog.images?.[0] ||
                  "https://via.placeholder.com/150" // Default image if no image is provided
                }
                alt={blog.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-2">{blog.title}</h3>
              {/* <p className="text-gray-600 mt-1">{blog.content.slice(0, 50)}...</p> */}
              <p className="text-sm text-gray-500 mt-1">Author: {blog.author}</p>
              <button
                className="mt-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => navigate(`/blog/${blog._id}`)} // Navigate to individual blog page
              >
                Read More
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No blogs available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
