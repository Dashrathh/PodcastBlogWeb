import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (existingUser) {
        throw new ApiError(400, "Email or username already taken");
    }

    // Create new user
    const newUser = await User.create({
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({
        $or: [{ email }, { username: email }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.comparePassword(password);

    console.log(isPasswordValid);
    
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    




    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true
    };

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.user._id, {
        $unset: {
            refreshToken: 1
        }
    }, { new: true });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json(
        new ApiResponse(200, null, "User logged out successfully")
    );
});

export { registerUser, loginUser, logoutUser };
