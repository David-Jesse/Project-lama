import { connectToMongoDB } from './db';
import {Post, User} from './models'
//import { dbConnect } from './utils'


export const getPosts = async () => {
    try {
        connectToMongoDB();
        const posts = await Post.find()
        return posts;
    } catch (error) {
        console.log(error)
        throw new Error("failed to fetch posts")
    }
}

export const getPost = async (slug: string)  => {
    try {
        connectToMongoDB();
        console.log('Querying for slug:', slug);
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
        connectToMongoDB();
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