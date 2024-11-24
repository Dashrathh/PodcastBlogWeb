import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import podcastRoutes from "./routes/podcast.routes.js"
import blogRoutes from "./routes/Blog.routes.js"
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())



//  API Routes

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/podcasts", podcastRoutes)

export { app }