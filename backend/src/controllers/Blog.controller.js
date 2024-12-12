import { Blog } from "../model/BlogModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create Blog
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        throw new ApiError(400, "Title, content, and author are required");
    }

    const uploadedImages = Array.isArray(req.files?.images)
        ? await uploadOnCloudinary(req.files.images)
        : req.files?.images
        ? [await uploadOnCloudinary([req.files.images])]
        : [];

    const newBlog = await Blog.create({
        title,
        content,
        author,
        images: uploadedImages,
        owner: req.userId,
    });

    console.log(newBlog);
    
    res.status(201).json(new ApiResponse(201, newBlog, "Blog created successfully"));
});

console.log(createBlog);


// Get All Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
});

// Get Single Blog by ID
const getBlogById = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    if (!blogId ) {
        throw new ApiError(400, "Invalid Blog ID");
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});

// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { title, content, author } = req.body;

    if (!blogId ) {
        throw new ApiError(400, "Invalid Blog ID");
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    const uploadedImages = req.files?.images
        ? await uploadOnCloudinary(req.files.images)
        : blog.images;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.images = uploadedImages;

    await blog.save();
    res.status(200).json(new ApiResponse(200, blog, "Blog updated successfully"));
});

// Get Blogs by Specific User
const getUserBlogs = asyncHandler(async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        throw new ApiError(401, "Unauthorized access");
    }

    const blogs = await Blog.find({ owner: userId });
    res.status(200).json(new ApiResponse(200, blogs, "User blogs fetched successfully"));
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    if (!blogId) {
        throw new ApiError(400, "Invalid Blog ID");
    }

    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Blog deleted successfully"));
});

export {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    getUserBlogs,
    deleteBlog,
};
