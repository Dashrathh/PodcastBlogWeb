import { Blog } from "../model/BlogModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// Create Blog
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, author,  } = req.body;
    // console.log("User ID from token:", req.userId);

    if (!title || !content || !author) {
        throw new ApiError(400, "Title, content, and author are required");
    }

    const uploadedImages = Array.isArray(req.files?.images)
        ? await uploadOnCloudinary(req.files.images)
        : req.files?.images
            ? [await uploadOnCloudinary([req.files.images])]
            : [];

    // console.log("Uploaded Images to Cloudinary: ", uploadedImages); // Debugging: Ensure Cloudinary uploads work
    // console.log("Uploaded Files: ", req.files);

    const newBlog = await Blog.create({
        title,
        content,
        author,
        images: uploadedImages,
        owner: req.userId
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
    if (!blog)
        throw new ApiError(404, "Blog not found");

    res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});

// Get Blogs by Specific User
const getUserBlogs = asyncHandler(async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        throw new ApiError(401, "Unauthorized access");
    }
    // const UserId = new mongoose.Types.ObjectId(userId)

    const blogs = await Blog.find({owner:userId });
    console.log("This is a user specific blog",blogs);  
    
    res.status(200).json(new ApiResponse(200, blogs, "User blogs fetched successfully"));
});
// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new ApiError(404, "Blog not found");

    const uploadedImages = req.files?.length
    ? await handleImageUploads(req.files)
        : blog.images;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.images = uploadedImages;

    await blog.save();
    res.status(200).json(new ApiResponse(200, blog, "Blog updated successfully"));
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) throw new ApiError(404, "Blog not found");

    res.status(200).json(new ApiResponse(201, null, "Blog deleted successfully"));
});

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getUserBlogs };
