import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import podcastRoutes from "./routes/podcast.routes.js"
import blogRoutes from "./routes/Blog.routes.js"
import { ApiError } from "./utils/ApiError.js"
import { ApiResponse } from "./utils/ApiResponse.js"
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())

/**
 * Helper function to fast create route url
 * @param route 
 * @param version 
 * @returns string
 */
const createVersionRoute = (route, version = "v1") => '/api/' + version + '/' + route;

/**
 * Routes
 */
app.get('/', (req, res) => {
    return res.json(new ApiResponse(200, "Welcome to PodCast API"))
});

app.get('/ping', (req, res) => {
    return res.send('pong 🏓')
})
//  API Routes

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/podcasts", podcastRoutes)

/**
 * Error Handing
 */
app.use((err, req, res,  next) => { 
    if (err?.statusCode) {
        return res.status(err.statusCode || 500).json(err);
    }

    return res.status(err?.statusCode || 500).json(new ApiError(err.statusCode || 500, "An error occurred", err.message))
})

/**
 * 404 errors
 */
app.use("*", (req, res) => {
    return res.status(404).json(new ApiError(404, "Page not found"))
})

export { app }