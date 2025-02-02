// import { verify } from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {OAuth2Client } from 'google-auth-library';



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

  const logoutUser =   await User.findByIdAndUpdate(req.userId, {
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

const googleLogin = asyncHandler(async(req,res) => {

    const {credential } = req.body; // token from react

    console.log(credential);
    

    if(!credential){
        throw new ApiError("credetial not found")
    }

    // google id token verifyid

    const ticket = await client.verifyIdToken({
        idToken:credetial,
        audience:process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload() // verifyed user data takes

   const {email,name,picture} = payload;
      
      // check if user exist

      const user = await User.findOne({email,name})
      if(!user){
        user = await User.create({
            email,
            name,
            googleId:sub,
            profilePic:picture
        })
      }
      
      const accessToken = jwt.sign(
        {id:user._id,email,name},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    );
    res.status(200).json({
        success:true,
        message:"User loged successfully",
        user: {
            id:user_id,
            name:user.name,
            email:user.email,
            profilePic: user.profilePic,

        },
        accessToken


    })

})

export { registerUser, loginUser, logoutUser ,googleLogin};
