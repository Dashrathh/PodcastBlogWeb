import express from "express"

import {
    createPodcast,
    getAllPodcasts,
    getPodcastById,
    updatePodcast,
    deletePodcast,
    getUserpodcast
} from "../controllers/Podcast.controller.js"

import { asyncHandler } from "../utils/asyncHandler.js"

import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


// Create Podcast

router.post(
    "/audio",
    verifyJWT,
    upload.fields([
        {
            name: "audioFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    asyncHandler(createPodcast)
);
// user's  podcast

router.get("/user", verifyJWT, getUserpodcast)
// Get All Podcasts
router.get("/", (getAllPodcasts));

// Get Podcast by ID
router.get("/:podcastId", (getPodcastById)); // Specific naming for ID

// Update Podcast
router.put(
    "/:podcastId",
    verifyJWT,
    upload.fields([
        {
            name: "audioFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    asyncHandler(updatePodcast)
);

// Delete Podcast
router.delete("/:podcastId", asyncHandler(deletePodcast)); // Specific naming for ID

export default router;