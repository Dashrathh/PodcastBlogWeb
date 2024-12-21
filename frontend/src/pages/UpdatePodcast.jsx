import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdatePodcast = () => {
    const [formData, setFormData] = useState({

        title: "",
        description: "",
        audioFile: null,
        thumbnail: null,
        author: "",
    });

    const [podcast, setPodcast] = useState(null)

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

        setLoading(true);
        setMessage("");

        try {
            const formDataToSend = new FormData(e.target);

            const response = await fetch(`http://localhost:4000/api/podcasts/${podcastId}`, {
                method: "PUT",
                body: formDataToSend,
                credentials: "include",
            });
            const result = await response.json();

            if (result.success) {
                setMessage("Podcast Updated successfully!");
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
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        async function fetchPodcast() {
            setLoading(true);
            try {

                const response = await axios.get(`http://localhost:4000/api/podcasts/${podcastId}`, {
                    withCredentials: true,
                })

                setPodcast(response.data.data)


                setLoading(false)
            } catch (error) {
                console.log(error);
                setMessage(error?.message)
                setLoading(false)
            }
        }

        fetchPodcast();

    }, [podcastId])

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-5">Update Podcast</h1>

            {loading ? <h1>Loading...</h1> :

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={podcast?.title}
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
                            defaultValue={podcast?.description}
                            onChange={handleInputChange}
                            className="border w-full p-2"
                            placeholder="Enter podcast description"
                        ></textarea>
                    </div>

                    {/* Audio File */}
                    <div>
                        <label className="block text-gray-700">Audio File</label>
                        {podcast ? <audio controls>
                            <source src={podcast.audioFile} />
                        </audio> : undefined}
                        or
                        <input
                            type="file"
                            name="audioFile"
                            onChange={handleFileChange}
                            accept="audio/*"
                            className="w-full p-2"
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
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-gray-700">Author</label>
                        <input
                            type="text"
                            name="author"
                            defaultValue={podcast?.author}
                            onChange={handleInputChange}
                            className="border w-full p-2"
                            placeholder="Enter author name"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-50" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Podcast"}
                    </button>
                </form>
            }
            {/* Success/Error Message */}
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
};

export default UpdatePodcast;