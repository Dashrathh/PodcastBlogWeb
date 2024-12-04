import React from "react";
import { FaBlog, FaPodcast, FaPlus, FaCog, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <nav className="flex space-x-4">
            <a href="/home" className="hover:underline">Home</a>
            <a href="/mypodcasts" className="hover:underline">My Podcasts</a>
            <a href="/myblogs" className="hover:underline">My Blogs</a>
            <a href="/settings" className="hover:underline">Settings</a>
            <a href="/logout" className="hover:underline flex items-center space-x-1">
              <FaSignOutAlt /> <span>Logout</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow flex items-center space-x-4">
            <FaBlog className="text-blue-500 text-4xl" />
            <div>
              <h2 className="text-lg font-bold">Total Blogs</h2>
              <p className="text-3xl">5</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow flex items-center space-x-4">
            <FaPodcast className="text-green-500 text-4xl" />
            <div>
              <h2 className="text-lg font-bold">Total Podcasts</h2>
              <p className="text-3xl">3</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-between mb-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2">
            <FaPlus /> <span>Create New Blog</span>
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2">
            <FaPlus /> <span>Upload New Podcast</span>
          </button>
        </div>

        {/* Blog Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">My Blogs</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <p>
                <strong>Blog Title 1</strong> -{" "}
                <span className="text-sm text-gray-500">Posted on 2024-12-01</span>
              </p>
              <div className="flex space-x-4 mt-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p>
                <strong>Blog Title 2</strong> -{" "}
                <span className="text-sm text-gray-500">Posted on 2024-11-30</span>
              </p>
              <div className="flex space-x-4 mt-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        </section>

        {/* Podcast Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">My Podcasts</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <p>
                <strong>Podcast Episode 1</strong> -{" "}
                <span className="text-sm text-gray-500">Uploaded on 2024-12-01</span>
              </p>
              <div className="flex space-x-4 mt-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p>
                <strong>Podcast Episode 2</strong> -{" "}
                <span className="text-sm text-gray-500">Uploaded on 2024-11-30</span>
              </p>
              <div className="flex space-x-4 mt-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
