import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBlog = ({ blogId }) => {
    const [blog, setBlog] = useState(null); // Blog data
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); // Blog content
    const [author, setAuthor] = useState("");
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [message, setMessage] = useState("");

    // Fetch blog data by ID
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.put(
                    `http://localhost:4000/api/blogs/${blogId}`
                );
                const data = response.data;
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
    const handleSubmit = async (e) => {
        e.preventDefault();
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
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Author:</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Content:</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="10"
                            cols="50"
                        />
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
