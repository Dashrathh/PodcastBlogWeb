import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads single or multiple files to Cloudinary.
 * @param {string | string[]} localFilePaths - Single file path or array of file paths.
 * @returns {Promise<string | string[]>} - Secure URL(s) of the uploaded file(s).
 */
const uploadOnCloudinary = async (localFilePaths) => {
    if (!localFilePaths || localFilePaths.length === 0) return null;

    // Ensure localFilePaths is always an array (single file -> array)
    const filePaths = Array.isArray(localFilePaths) ? localFilePaths : [localFilePaths];

    try {
        const uploadPromises = filePaths.map(async (filePath) => {
            // Normalize path to handle Windows-style backslashes
            const normalizedPath = filePath.replace(/\\/g, "/");

            const response = await cloudinary.uploader.upload(normalizedPath, {
                resource_type: "auto", // This will automatically detect image/video type
            });

            // Delete the local file after uploading
            fs.unlinkSync(normalizedPath);

            return response.secure_url; // Return Cloudinary URL
        });

        const uploadedUrls = await Promise.all(uploadPromises);

        // Return single URL if only one file was uploaded, else return an array
        return uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        // Ensure cleanup even if error occurs
        if (Array.isArray(filePaths)) {
            filePaths.forEach((path) => fs.unlinkSync(path));
        } else {
            fs.unlinkSync(filePaths[0]);
        }
        return null;
    }
};

export { uploadOnCloudinary };
