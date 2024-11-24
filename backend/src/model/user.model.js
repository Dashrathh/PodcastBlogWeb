import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const userSchema  = new mongoose.Schema({

    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true

    },

    password: {
        type:String,
        required:true,
        minlength:6,

    },
    username: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    }

});

//  pre save hash passoword

userSchema.pre('save',async function (next) {

    if(!this.isModified('password')) return next()
        const salt = await bcrypt.genSalt(10);  // salt generate
      this.password  = await bcrypt.hash(this.password, salt)
      next()

    })
    //    compare entered password and hashed password

       userSchema.methods.comparePassword = async function (enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
       };
       userSchema.set('toJSON', {
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.refreshToken;
            delete ret.__v;
            return ret;
        },
    })

    export const User = mongoose.model('User',userSchema)
 