import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null); // State for the blog details

  useEffect(() => {
    // Fetch the specific blog details using the ID
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/blogs/${id}`);
        const result = await response.json();
        if (result.success) {
          setBlog(result.data);
        } else {
          console.error("Failed to fetch blog details.");
        }
      } catch (error) {
        console.error("Error fetching blog details:", error.message);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (!blog) {
    return <div>Loading blog details...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
        <img
          src={
            blog.images?.[0] || "https://via.placeholder.com/600"
          }
          alt={blog.title}
          className="w-full h-60 object-cover rounded"
        />

        </div>
        <div></div>
        <div>
          
        <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
        <p className="text-gray-600 mt-2">Author: {blog.author}</p>
        <div
          className="text-gray-700 mt-4"
          dangerouslySetInnerHTML={{ __html: blog.content }} // render content in html
        ></div>
      </div>
    </div>
  );
};

export default BlogDetails;
