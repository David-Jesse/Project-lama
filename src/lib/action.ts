"use server"

import { revalidatePath } from 'next/cache'
import {signIn, signOut} from '@/lib/auth'
import {connectToMongoDB} from './db'
import {ObjectId} from 'mongodb'
import {Post, User} from './models'
import bcrypt from 'bcryptjs'

export const addPost: (formData: FormData) => Promise<void> = async (formData: FormData) => {

    const {title, desc, slug, userId} = Object.fromEntries(formData);

    try {
        connectToMongoDB()
        const newPost =  new Post ({
            title,
            desc,
            slug,
            userId: new ObjectId()
        })

        await newPost.save()
        console.log("Saved to DB!")
        revalidatePath('/blog')
    } catch (err) {
        console.error("error saving post!", err)
    } 

    console.log(title, desc, slug, userId)
}

export const deletePost = async (formData: FormData): Promise<void> => {
    const {id} = Object.fromEntries(formData);

    try {
        connectToMongoDB()
        
        await Post.findByIdAndDelete(id);
        console.log('Deleted from DB!')
        revalidatePath('/blog')
    } catch (err) {
        console.error("error deleting post!", err)
    }
}

export const handleGithubLogin = async () => {
    "use server"
    await signIn('github')
}

export const handleLogout = async () => {
    "use server"
    await signOut()
}

  export const registerUserCore = async (formData: FormData) => {
    const {username, email, password, passwordRepeat, img} = Object.fromEntries(formData) as {
        username: string;
        email: string;
        password: string;
        passwordRepeat: string;
        img: string
        error?: string
    }

    if (password !== passwordRepeat) {
        return  {error: "Password does not match"}
    }

    try {
        const db = await connectToMongoDB()
        console.log('Connecting to db:', db)

        const exisitingUser = await User.findOne({username})
        if (exisitingUser) {
            return {error: "Username already exists"}
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password as string, salt);

        const newUser = new User ({
            username,
            email,
            password: hashedPassword,
            img
        })

        console.log('New user is:', newUser)
        await newUser.save()
        return "Here's the user"

    } catch(err) {
        console.error("Registration error:", err)
        return{error: "Failed to create account. Please try again."}
    }
  }

//   interface UserReturn  {
//     username: string
//     email: string;
//     img: string
//     error?: string
//     success?: string
//   } 

  export const registerUser = async (formData: FormData)  => {
    const {username, email, img, password, passwordRepeat} = Object.fromEntries(formData) as {
        username: string;
        email: string;
        img: string
        password: string;
        passwordRepeat: string;
    }

    if (password !== passwordRepeat) {
        return {error: "Password does not match"}
    }

    try {
        connectToMongoDB();

        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return {error: "Username already exists"}
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save()
        return {
            username: newUser.username,
            email: newUser.email,
            img: newUser.img,
            success: "User registered successfully!"
        }
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"}
    }
  }

  export const login = async (formData: FormData) => {
    const {username, password} = Object.fromEntries(formData) as {
        username: string;
        password: string;
    }

    try {
      await signIn('credentials', {username, password})
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"}
    }
  }    