import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema({
    title:
    {
        type:String,
        required:true
    },
    
    description:{
        type:String
    },

    audioFile:{
        type:String,
        required:true
    },
    thumbnail: {
        type: String, // Thumbnail image URL for podcast
        required: true
    },
    author: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
   

});

export const Podcast = mongoose.model('Podcast',podcastSchema)