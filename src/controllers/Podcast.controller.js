import { Podcast } from "../model/Podcast.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create Podcast
const createPodcast = asyncHandler(async (req, res) => {
    const { title, description, author } = req.body;

    const audioLocalPath = req.file?.audioFile?.[0]?.path;
    const thumbnailLocalPath = req.file?.thumbnail?.[0]?.path;

    if (!title) {
        throw new ApiError(400, "Title is required");
    }

    if (!audioLocalPath) {
        throw new ApiError(400, "Audio file is missing");
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is missing");
    }

    // Upload audio and thumbnail to Cloudinary
    const Audio = await uploadOnCloudinary(audioLocalPath);
    const PUBThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!Audio || !PUBThumbnail) {
        throw new ApiError(500, "Error uploading files to Cloudinary");
    }

    const newPodcast = await Podcast.create({
        title,
        description,
        author,
        audioFile: Audio.secure_url,
        thumbnail: PUBThumbnail.secure_url
    });

    res.status(201).json(new ApiResponse(201, newPodcast, "Podcast created successfully"));
});

// Get All Podcasts
const getAllPodcasts = asyncHandler(async (req, res) => {
    const podcasts = await Podcast.find();

    if (!podcasts || podcasts.length === 0) {
        throw new ApiError(404, "No podcasts found");
    }

    res.status(200).json(new ApiResponse(200, podcasts, "Podcasts fetched successfully"));
});

// Get Single Podcast by ID
const getPodcastById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const podcast = await Podcast.findById(id);
    if (!podcast) {
        throw new ApiError(404, "Podcast not found");
    }

    res.status(200).json(new ApiResponse(200, podcast, "Podcast fetched successfully"));
});

// Update Podcast
const updatePodcast = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, author } = req.body;

    const podcast = await Podcast.findById(id);
    if (!podcast) {
        throw new ApiError(404, "Podcast not found");
    }

    const audioLocalPath = req.file?.audioFile?.[0]?.path;
    const thumbnailLocalPath = req.file?.thumbnail?.[0]?.path;

    if (audioLocalPath) {
        const Audio = await uploadOnCloudinary(audioLocalPath);
        podcast.audioFile = Audio.secure_url;
    }

    if (thumbnailLocalPath) {
        const PUBThumbnail = await uploadOnCloudinary(thumbnailLocalPath);
        podcast.thumbnail = PUBThumbnail.secure_url;
    }

    podcast.title = title || podcast.title;
    podcast.description = description || podcast.description;
    podcast.author = author || podcast.author;

    await podcast.save();

    res.status(200).json(new ApiResponse(200, podcast, "Podcast updated successfully"));
});

// Delete Podcast
const deletePodcast = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const podcast = await Podcast.findById(id);
    if (!podcast) {
        throw new ApiError(404, "Podcast not found");
    }

    await podcast.remove();

    res.status(200).json(new ApiResponse(200, null, "Podcast deleted successfully"));
});

export { createPodcast, getAllPodcasts, getPodcastById, updatePodcast, deletePodcast };
