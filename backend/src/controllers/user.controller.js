// import { verify } from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { OAuth2Client } from 'google-auth-library';
import { decodeJwtResponse } from "../utils/helper.js";
import jwt from "jsonwebtoken"

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
    // console.log("Middleware req.user:", req.userId);      

    const logoutUser = await User.findByIdAndUpdate(req.userId, {
        $unset: {
            refreshToken: 1
        }
    }, { new: true });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json(
        new ApiResponse(200, logoutUser, "User logged out successfully")
    );
});



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const googleLogin = asyncHandler(async (req, res) => {

    const { credential } = req.body; // token from react

    if (!credential) {
        throw new ApiError("credential not found")
    }

    const decodedToken = decodeJwtResponse(credential);

    const socialUser = {
        sub: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        username: decodedToken.name.toLowerCase().replace(/ /g, '_'),
        picture: decodedToken.picture,
    }

    const { email, name, username, picture, sub } = socialUser;

    // check if user exist

    let user = await User.findOne({ email })
    if (!user) {
        user = User.create({
            email: socialUser.email,
            username: socialUser.username,
            name: socialUser.name,
            googleId: socialUser.sub,
            profilePic: socialUser.picture,
            password: " ",
        })
    }

    const accessToken = jwt.sign(
        { id: user._id, email, name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
    res.status(200).json({
        success: true,
        message: "User loged successfully",
        user: {
            id: user._id,
            name: user.name,
            email: socialUser.email,
            profilePic: socialUser.picture,

        },
        accessToken
    })

})

export { registerUser, loginUser, logoutUser, googleLogin };
