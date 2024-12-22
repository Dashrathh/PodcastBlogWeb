import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePodcast = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        audioFile: null,
        thumbnail: null,
        author: "",
    });

    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { podcastId } = useParams();

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
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });

            const response = await fetch(
                `http://localhost:4000/api/podcasts/${podcastId}`,
                {
                    method: "PUT",
                    body: formDataToSend,
                    credentials: "include",
                }
            );
            const result = await response.json();

            if (result.success) {
                setMessage("Podcast Updated successfully!");
                toast.success("Podcast Updated successfully!");
                setFormData({
                    title: "",
                    description: "",
                    audioFile: null,
                    thumbnail: null,
                    author: "",
                });
            } else {
                setMessage("Failed to update the podcast. Try again.");
            }
        } catch (error) {
            console.error("Error Updating podcast:", error.message);
            setMessage("An error occurred. Please try again.");
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function fetchPodcast() {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/podcasts/${podcastId}`,
                    { withCredentials: true }
                );
                setPodcast(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setMessage("Error fetching podcast data.");
                setLoading(false);
            }
        }

        fetchPodcast();
    }, [podcastId]);

    return (
        <div className="container mx-auto p-6 sm:p-8 bg-gray-50 rounded shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Update Podcast
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <svg
                        className="animate-spin h-12 w-12 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4z"
                        ></path>
                    </svg>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={podcast?.title}
                            onChange={handleInputChange}
                            className="border w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter podcast title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea
                            name="description"
                            defaultValue={podcast?.description}
                            onChange={handleInputChange}
                            className="border w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter podcast description"
                            rows="4"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Audio File</label>
                        {podcast?.audioFile && (
                            <audio controls className="mb-2 w-full">
                                <source src={podcast.audioFile} />
                            </audio>
                        )}
                        <input
                            type="file"
                            name="audioFile"
                            onChange={handleFileChange}
                            accept="audio/*"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Thumbnail</label>
                        <input
                            type="file"
                            name="thumbnail"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Author</label>
                        <input
                            type="text"
                            name="author"
                            defaultValue={podcast?.author}
                            onChange={handleInputChange}
                            className="border w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter author name"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                            loading && "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Podcast"}
                    </button>
                </form>
            )}

            {message && (
                <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
            )}
        </div>
    );
};

export default UpdatePodcast;
