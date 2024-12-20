import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import RTE from "../components/RTE";

const UpdateBlog = () => {
    const [blog, setBlog] = useState(null); // Blog data
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); // Blog content
    const [author, setAuthor] = useState("");
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [message, setMessage] = useState("");

    const { blogId } = useParams();
    const { handleSubmit, control, register } = useForm();

    // Fetch blog data by ID
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/blogs/${blogId}`, {
                    withCredentials: true,
                }

                );
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

    // Handle form submit
    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", author);

        // Add new images
        for (let i = 0; i < newImages.length; i++) {
            formData.append("images", newImages[i]);
        }

        try {
            const response = await axios.put(
                `http://localhost:4000/api/blogs/${blogId}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setMessage("Blog updated successfully!");
        } catch (error) {
            console.error("Error updating blog", error);
            setMessage("Error updating blog");
        }
    };

    return (
        <div>
            <h1>Update Blog</h1>
            {blog ? (
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Blog Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <Controller
                            defaultValue={title}
                            name="title"   //This is the name of the field
                            control={control} //Linking React Hook Form with Controller
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="border p-2 w-full"
                                    placeholder="Enter blog title"
                                    required
                                />
                            )}
                        />
                    </div>

                    {/* Author */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Author</label>
                        <input
                            value={author}
                            {...register("author", { required: true })}
                            className="border p-2 w-full"
                            placeholder="Enter author name"
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="mb-4">
                        <RTE name="content" defaultValue={content} control={control} label="Content" />
                    </div>
                    <div>
                        <label>Current Images:</label>
                        <div>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt="Blog"
                                    style={{ width: "100px", margin: "10px" }}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label>Upload New Images:</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setNewImages(e.target.files)}
                        />
                    </div>
                    <button type="submit">Update Blog</button>
                </form>
            ) : (
                <p>Loading blog data...</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateBlog;