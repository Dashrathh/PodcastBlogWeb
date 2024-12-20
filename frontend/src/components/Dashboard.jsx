import React, { useEffect, useState } from "react";
import { FaBlog, FaPodcast, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useParams } from "react-router-dom";
import { BACKEND_API } from "../util/api.js";
const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingPodcasts, setLoadingPodcasts] = useState(true);

  const navigate = useNavigate();

  // Fetch Blogs

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Unauthorized access! Please log in.");
        navigate("/login");
        return;
      }

      try {
        setLoadingBlogs(true);
        const response = await BACKEND_API.get("http://localhost:4000/api/blogs/user")


        if (!response.data.data) {
          const response = await BACKEND_API.get("http://localhost:4000/api/blogs/")


          setBlogs(response.data.data)
        } else {
          setBlogs(response.data.data)
        }

      } catch (error) {
        console.error("Error fetching blog: ", error)

      } finally {
        setLoadingBlogs(false)
      }



    }

    fetchBlogs();
  }, [navigate]);
  // Fetch Podcasts // 
  useEffect(() => {
    const fetchPodcast = async () => {
      const token = localStorage.getItem("accessToken")
      if (!token) {
        alert("unAuthorize token please login")
        navigate('/login')
        return;
      }

      try {


        setLoadingBlogs(true);
        const response = await BACKEND_API.get("http://localhost:4000/api/podcasts/user")


        console.log(response);

        if (!response.data.data) {
          const response = await BACKEND_API.get("http://localhost:4000/api/podcasts")


          setPodcasts(response.data.data)
        } else {
          setPodcasts(response.data.data)
        }

      } catch (error) {
        console.error("Error fetching podcast", error)

      } finally {
        setLoadingPodcasts(false)

      }
    }

    fetchPodcast()


  }, [navigate])




  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      <main className="container mx-auto p-6">
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

        <div className="flex flex-wrap justify-between mb-6">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2"
            onClick={() => navigate("/createBlog")}
            aria-label="Create a new blog"
          >
            <FaPlus /> <span>Create New Blog</span>
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
            onClick={() => navigate("/createPodcast")}
            aria-label="Create a new podcast"
          >
            <FaPlus /> <span>Upload New Podcast</span>
          </button>
        </div>

        {/*  list of blog those uploaded u */}



        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">My Blogs</h2>
          {loadingBlogs ? (
            <p>Loading Blogs...</p>
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="bg-white p-4 rounded shadow">
                <p>
                  <strong>{blog.title}</strong> -{" "}
                  <span className="text-sm text-gray-500">
                    Posted on {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <div className="flex space-x-4 mt-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => navigate(`/updateBlog/${blog._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/deleteBlog/${blog._id}`)}
                    className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </section>



        <section>
          <h2 className="text-xl font-bold mb-4">My Podcasts</h2>
          {loadingPodcasts ? (
            <p>Loading Podcasts...</p>
          ) : podcasts.length > 0 ? (
            podcasts.map((podcast) => (
              <div key={podcast._id} className="bg-white p-4 rounded shadow">
                <p>
                  <strong>{podcast.title}</strong> -{" "}
                  <span className="text-sm text-gray-500">
                    Uploaded on {new Date(podcast.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <div className="flex space-x-4 mt-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => navigate(`/edit/podcast/${podcast._id}`)}
                  >
                    Edit
                  </button>

                  <button className="text-red-500 hover:underline"
                    onClick={() => navigate(`/deletepodcast/${podcast._id}`)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No podcasts available.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
