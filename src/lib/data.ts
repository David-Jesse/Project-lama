import { connectToMongoDB } from './db';
import {Post, User} from './models'


export const getPosts = async () => {
    try {
        await connectToMongoDB();
        const posts = await Post.find()
        return posts;
    } catch (error) {
        console.log(error)
        throw new Error("failed to fetch posts")
    }
}

export const getPost = async (slug: string)  => {
    try {
        await connectToMongoDB();
        console.log('Connected to mongodb')

        const post = await Post.findOne({slug})
        console.log('Query result:', post)
        
        return post;
    } catch (error) {
        console.log(error)
        throw new Error("failed to fetch Post")
    }
}

export const getUser = async (id: string) => {
    
    try {
        await connectToMongoDB();
        const user = await User.findById(id)
        return user
    } catch (error) {
        console.log(error)
        throw new Error("failed to fetch user")
    }
}

export const getUsers = async () => {
    try {
        connectToMongoDB();
        const users = await User.find()
        return users;
    } catch (error) {
        console.log(error)
        throw new Error("failed to fetch users!")
    }
}