import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import RTE from "../components/RTE";
import { toast } from "react-toastify";
import { BACKEND_API } from "../util/api";

const UpdateBlog = () => {
    const [blog, setBlog] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const { blogId } = useParams();
    const { handleSubmit, control, register } = useForm();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await BACKEND_API.get(`/blogs/${blogId}`);
                const data = response.data.data;
                setBlog(data);
                setTitle(data.title);
                setContent(data.content);
                setAuthor(data.author);
                setImages(data.images || []);
            } catch (error) {
                console.error("Error fetching blog data", error);
            }
        };
        fetchBlog();
    }, [blogId]);

    const onSubmit = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", author);

        for (let i = 0; i < newImages.length; i++) {
            formData.append("images", newImages[i]);
        }

        try {
            await BACKEND_API.put(`/blogs/${blogId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Blog updated successfully!");
        } catch (error) {
            console.error("Error updating blog", error);
            toast.error("Error updating blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Blog</h1>
            {blog ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
                        <Controller
                            defaultValue={title}
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter blog title"
                                    required
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Author</label>
                        <input
                            value={author}
                            {...register("author", { required: true })}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter author name"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Content</label>
                        <RTE name="content" defaultValue={content} control={control} />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Current Images</label>
                        <div className="flex flex-wrap gap-4">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt="Blog"
                                    className="w-24 h-24 object-cover rounded-md shadow-sm"
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Upload New Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setNewImages(e.target.files)}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                                Updating...
                            </div>
                        ) : (
                            "Update Blog"
                        )}
                    </button>
                </form>
            ) : (
                <div className="flex justify-center items-center h-48">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-500"
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
            )}
        </div>
    );
};

export default UpdateBlog;
