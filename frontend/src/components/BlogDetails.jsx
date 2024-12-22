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
      if(!response.ok){
        console.error("Failed to fetch blog details.");
      }
    };

    fetchBlogDetails();
  }, [id]);

  // if (!blog) {
  //   return (
  //     <div className="flex items-center justify-center h-screen text-xl">
  //       Loading blog details...
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-md overflow-hidden">
        {/* Blog Header */}
        <div className="relative w-full">
          <img
            src={blog.images?.[0] || "https://via.placeholder.com/600"}
            alt={blog.title}
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <div className="flex justify-between text-sm text-gray-500 mb-6">
            <p>
              Author: <span className="font-semibold">{blog.author}</span>
            </p>
            <p>
              Published on:{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div
            className="text-gray-700 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>

          {/* Image Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blog.images?.slice(1).map((image, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transform transition duration-300"
              >
                <img
                  src={image || "https://via.placeholder.com/300"}
                  alt={`Additional ${blog.title}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
