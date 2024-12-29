import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/blogs");
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
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
          <div
  role="status"
  className="fixed inset-0 flex items-center justify-center bg-white z-50"
>
  <div className="text-center">
    <svg
      className="w-16 h-16 mb-4 animate-spin text-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <p className="text-xl font-semibold text-gray-700">Loading Blog...</p>
  </div>
</div>

        
        )}
      </div>
    </div>
  );
};

export default BlogList;
