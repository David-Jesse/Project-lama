import mongoose, { Document, Schema} from 'mongoose';

export interface IUser extends Document {
    username: string;
    img: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string
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
    img: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        required: true, 
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: false
    },
    provider: {
        type: String, 
        enum: ['credentials', 'github'], 
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},  {timestamps: true})

if (mongoose.models.User) {
    delete mongoose.models.User;
}


export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);