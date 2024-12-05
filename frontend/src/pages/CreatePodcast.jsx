import React, { useState } from "react";

const CreatePodcast = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audioFile: null,
    thumbnail: null,
    author: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("audioFile", formData.audioFile);
      formDataToSend.append("thumbnail", formData.thumbnail);
      formDataToSend.append("author", formData.author);

      const response = await fetch("http://localhost:4000/api/podcasts", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Podcast created successfully!");
        setFormData({
          title: "",
          description: "",
          audioFile: null,
          thumbnail: null,
          author: "",
        });
      } else {
        setMessage("Failed to create the podcast. Try again.");
      }
    } catch (error) {
      console.error("Error creating podcast:", error.message);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Create Podcast</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border w-full p-2"
            placeholder="Enter podcast title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border w-full p-2"
            placeholder="Enter podcast description"
          ></textarea>
        </div>

        {/* Audio File */}
        <div>
          <label className="block text-gray-700">Audio File</label>
          <input
            type="file"
            name="audioFile"
            onChange={handleFileChange}
            accept="audio/*"
            className="w-full p-2"
            required
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-gray-700">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="border w-full p-2"
            placeholder="Enter author name"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Podcast"}
        </button>
      </form>

      {/* Success/Error Message */}
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default CreatePodcast;
