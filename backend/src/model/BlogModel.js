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
   
    images:[
        {
            type:String
        }
    ],
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }, 
    


},{timestamps:true})

export const Blog = mongoose.model('Blog',blogSchema)