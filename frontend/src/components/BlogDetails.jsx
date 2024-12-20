import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
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
    return <div className="flex items-center justify-center h-screen text-xl">Loading blog details...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-md overflow-hidden">
        {/* Blog Image */}
        <div className="relative w-full">
          <img
            src={blog.images?.[0] || "https://via.placeholder.com/600"}
            alt={blog.title}
            className="w-30 h-30 sm:h-96 justify-center object-cover ml-auto mr-auto rounded-md mt-2" 
          />
        </div>

        {/* Blog Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-2">Author: <span className="font-semibold">{blog.author}</span></p>
          <p className="text-gray-500 text-sm">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
          <img
            src={blog.images?.[1] || "https://via.placeholder.com/600"}
            alt={blog.title}
            className="w-30 h-30 sm:h-96 justify-center object-cover ml-auto mr-auto rounded-md mt-2" 
          />

          <div
            className="text-gray-700 mt-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>

        {/* Additional Images */}
        <img
            src={blog.images?.[1] || "https://via.placeholder.com/600"}
            alt={blog.title}
            className="w-30 h-30 sm:h-96 justify-center object-cover ml-auto mr-auto rounded-md mt-2" 
          />
      </div>
    </div>
  );
};

export default BlogDetails;
