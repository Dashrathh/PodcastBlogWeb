import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    images:[
        {
            type:String
        }
    ]
})

export const Blog = mongoose.model('Blog',blogSchema)