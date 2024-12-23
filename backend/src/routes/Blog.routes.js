import express from "express";
import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getUserBlogs, 
} from "../controllers/Blog.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Create Blog
router.post(
    "/",
    verifyJWT,
    
    upload.fields([
        {
            name: "images",
            maxCount: 5,
        },
    ]),
    createBlog
);
// user's blog
router.get("/user", verifyJWT, getUserBlogs); 
// Get All Blogs
router.get("/", getAllBlogs);

// Get Single Blog by ID
router.get("/:id", getBlogById);
// console.error);

// Get Blogs by Specific User
// Update Blog
router.put(
    "/:id",
    verifyJWT,
    upload.fields([
        {
            name: "images",
            maxCount: 5,
        },
    ]),
    updateBlog
);

// Delete Blog
router.delete("/:id", verifyJWT,deleteBlog);

export default router;
