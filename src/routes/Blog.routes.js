import express from "express"
import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog

} from "../controllers/Blog.controller.js"

import {upload} from "../middlewares/multer.middleware.js"

const router  = express.Router();

// create blog

router.post(
    "/",
    upload.fields([
        {name:"image",
            maxCount:5
        }
    ]),
    createBlog
);

// getAllBlogs

router.get("/",getAllBlogs)

// get single 
// Get Single Blog by ID
router.get("/:id", getBlogById);

// Update Blog
router.put(
    "/:id",
    upload.fields([
        { name: "Image", maxCount:5}  // Limit to 5 images for the blog update
    ]),
    updateBlog
);

// Delete Blog
router.delete("/:id", deleteBlog);

export default router 