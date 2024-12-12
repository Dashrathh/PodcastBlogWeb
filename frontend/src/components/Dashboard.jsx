import React, { useEffect, useState } from "react";
import { FaBlog, FaPodcast, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]); // Store blogs
  const [podcasts, setPodcasts] = useState([]); // Store podcasts
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch user data (blogs and podcasts)
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("Unauthorized access! Please log in.");
        navigate("/login"); // Redirect to login page if token is missing
        return;
      }

      
      try {
        setLoading(true);

        // Fetch blogs
        const blogResponse = await fetch("/api/user/blogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach accessToken
          },
        });
        if (!blogResponse.ok) throw new Error("Failed to fetch blogs");

        const blogData = await blogResponse.json();
        setBlogs(blogData);

        // Fetch podcasts
        const podcastResponse = await fetch("/api/user/podcasts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach accessToken
          },
        });
        if (!podcastResponse.ok) throw new Error("Failed to fetch podcasts");

        const podcastData = await podcastResponse.json();
        setPodcasts(podcastData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {loading ? (
          <p>Loading...</p> // Show loading indicator
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded shadow flex items-center space-x-4">
                <FaBlog className="text-blue-500 text-4xl" />
                <div>
                  <h2 className="text-lg font-bold">Total Blogs</h2>
                  <p className="text-3xl">{blogs.length}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded shadow flex items-center space-x-4">
                <FaPodcast className="text-green-500 text-4xl" />
                <div>
                  <h2 className="text-lg font-bold">Total Podcasts</h2>
                  <p className="text-3xl">{podcasts.length}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-between mb-6">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2"
                onClick={() => navigate("/CreateBlog")}
              >
                <FaPlus /> <span>Create New Blog</span>
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
                onClick={() => navigate("/CreatePodcast")}
              >
                <FaPlus /> <span>Upload New Podcast</span>
              </button>
            </div>

            {/* Blog Section */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">My Blogs</h2>
              {blogs.length > 0 ? (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white p-4 rounded shadow">
                      <p>
                        <strong>{blog.title}</strong> -{" "}
                        <span className="text-sm text-gray-500">
                          Posted on {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                      <div className="flex space-x-4 mt-2">
                        <button className="text-blue-500 hover:underline">Edit</button>
                        <button className="text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No blogs available.</p>
              )}
            </section>

            {/* Podcast Section */}
            <section>
              <h2 className="text-xl font-bold mb-4">My Podcasts</h2>
              {podcasts.length > 0 ? (
                <div className="space-y-4">
                  {podcasts.map((podcast) => (
                    <div key={podcast.id} className="bg-white p-4 rounded shadow">
                      <p>
                        <strong>{podcast.title}</strong> -{" "}
                        <span className="text-sm text-gray-500">
                          Uploaded on {new Date(podcast.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                      <div className="flex space-x-4 mt-2">
                        <button className="text-blue-500 hover:underline">Edit</button>
                        <button className="text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No podcasts available.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
