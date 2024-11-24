import express from "express"

import { registerUser,
    loginUser,
    logoutUser

 } from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js"


const router = express.Router();

router.post("/register",asyncHandler(registerUser))

router.post("/login",asyncHandler(loginUser))

router.post("/logout",asyncHandler(logoutUser))

export default router