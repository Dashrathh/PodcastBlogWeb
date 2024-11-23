import { Blog } from "../model/BlogModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const handleImageUploads = async (files) => {
    const uploadedImages = [];

    for (const file of files) {
        const uploaded = await uploadOnCloudinary(file.path);
        if (uploaded) {
            uploadedImages.push(uploaded.secure_url);
        }
    }
    return uploadedImages;
};

// Create Blog
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        throw new ApiError(400, "Title, content, and author are required");
    }

    const uploadedImages = req.files?.length ? await handleImageUploads(req.files) : [];

    const newBlog = await Blog.create({
        title,
        content,
        author,
        Image: uploadedImages
    });

    res.status(201).json(new ApiResponse(201, newBlog, "Blog created successfully"));
});

// Get All Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
});

// Get Single Blog

const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new ApiError(404, "Blog not found");
    
    res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});

// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new ApiError(404, "Blog not found");

    const uploadedImages = req.files?.length
        ? await handleImageUploads(req.files)
        : blog.Image;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.Image = uploadedImages;

    await blog.save();
    res.status(200).json(new ApiResponse(200, blog, "Blog updated successfully"));
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new ApiError(404, "Blog not found");

    await blog.remove();
    res.status(200).json(new ApiResponse(200, null, "Blog deleted successfully"));
});

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
