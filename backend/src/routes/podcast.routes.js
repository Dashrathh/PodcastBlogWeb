import express from "express"

import { createPodcast,
    getAllPodcasts,
    getPodcastById,
    updatePodcast,
    deletePodcast
 } from "../controllers/Podcast.controller.js"

 import { asyncHandler } from "../utils/asyncHandler.js"

 import {upload} from "../middlewares/multer.middleware.js"

 const router = express.Router();


// Create Podcast

router.post(
    "/audio",
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

// Get All Podcasts
router.get("/", asyncHandler(getAllPodcasts));

// Get Podcast by ID
router.get("/:podcastId", asyncHandler(getPodcastById)); // Specific naming for ID

// Update Podcast
router.put(
    "/:podcastId",
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