import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {

    // Check token in cookies or Authorization header (Bearer token)
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
        throw new ApiError(401, "Unauthorized request: No token provided");
    }
    // console.log(token);


    // Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log(decodedToken);

    try {
        // Check token in cookies or Authorization header (Bearer token)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }
        // console.log(token);


        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // console.log(decodedToken);
        let user;

        if (decodedToken.socialUser) {
            user = await User.find({ email: decodedToken.email }).select("-password -refreshToken");
        } else {
            // Check if the user exists in the database using the decoded token's user ID
            user = await User.findById(decodedToken._id).select("-password -refreshToken");
        }

        if (!user) {
            throw new ApiError(401, "Invalid or expired token");
        }

        // Attach the user object to the request for further use in other routes
        req.userId = user;
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        // Handle errors: Unauthorized if there's an issue with the token
        throw new ApiError(401, error.message || "Invalid access token or token expired");
    }
});
