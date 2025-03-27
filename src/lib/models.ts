import mongoose, { Document, Schema, Types} from 'mongoose';

export interface IUser extends Document {
    name: string;
    password: string;
    img: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPost extends Document {
   title: string;
   desc: string;
   img: string;
   userId: string;
   slug: string;
   createdAt: Date;
   updatedAt: Date;
}

const userSchema = new Schema({
    username:{
        type: String, 
        required: true,
        unique: true,
        min: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    img: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},  {timestamps: true})

const postSchema = new Schema({
    title:{
        type: String, 
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ''
    },
    userId: {
        type: Types.ObjectId,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
},  {timestamps: true})


export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);