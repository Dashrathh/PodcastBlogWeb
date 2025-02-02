import express from "express";
import { registerUser, loginUser, logoutUser,googleLogin } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", verifyJWT, logoutUser);

router.post("/auth/google",googleLogin)

router.get("/profile", verifyJWT, (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user, 
        message: "User profile fetched successfully",
    });
});

export default router;
