"use server"

import { revalidatePath } from 'next/cache'
import {signIn, signOut} from '@/lib/auth'
import {connectToMongoDB} from './db'
import {ObjectId} from 'mongodb'
import {Post, User} from './models'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

type FormState = {
    err?: string;
    success: boolean;
}


// Function that adds Post
export const addPost = async (prevState: unknown, formData: FormData) => {

    const {title, desc, slug, userId} = Object.fromEntries(formData);

    try {
        connectToMongoDB()
        const newPost =  new Post ({
            title,
            desc,
            slug,
            userId: new ObjectId(userId as string)
        })

        await newPost.save()
        console.log("Saved to DB!")
        revalidatePath('/blog')
        revalidatePath('/admin')

        return {success: true, message: "Post created successfully!"}
    } catch (err) {
        console.error("error saving post!", err)
        return { success: false, error: 'Failed to create post'}
    } 
}

//  Function that delete's a post
export const deletePost = async (formData: FormData): Promise<void> => {
    const {id} = Object.fromEntries(formData)

    try {
        connectToMongoDB()
        
        await Post.findByIdAndDelete(id);
        console.log('Deleted from DB!')
        revalidatePath('/blog')
        revalidatePath('/admin')
    } catch (err) {
        console.error("error deleting post!", err)
    }
}

// Function that deletes user
export const deleteUser = async (formData: FormData): Promise<void> => {
    const {id} = Object.fromEntries(formData);

    try {
        connectToMongoDB();

        await Post.deleteMany({userId: id})
        await User.findByIdAndDelete(id);
        console.log('Deleted from DB');
        revalidatePath('/admin')
    } catch (err) {
        console.log(err)
        console.error("Something went wrong!")
    }
}

// Function that adds a new user
export const addUser = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const {username, email, password, isAdmin} = Object.fromEntries(formData);

    try {
        connectToMongoDB()
        const newUser = new User({
            username,
            email,
            password,
            isAdmin
        })

        await newUser.save();
        console.log('saved to db')
        revalidatePath('/admin')  
        return {success: true}
    } catch (err) {
        console.log(err)
        return {err: "Something went wrong", success: false}
    }
}

// function that handles login with Github OAuth
export const handleGithubLogin = async () => {
    await signIn('github')
}

// Function that handles Logout
export const handleLogout = async () => {
    await signOut()
}

// export const registerUserCore = async (formData: FormData) => {
// const {username, email, password, passwordRepeat, img} = Object.fromEntries(formData) as {
//     username: string;
//     email: string;
//     password: string;
//     passwordRepeat: string;
//     img: string
//     error?: string
// }

// if (password !== passwordRepeat) {
//     return  {error: "Password does not match"}
// }

//     try {
//         const db = await connectToMongoDB()

//         const exisitingUser = await User.findOne({username})
//         if (exisitingUser) {
//             return {error: "Username already exists"}
//         }

//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password as string, salt);

//         const newUser = new User ({
//             username,
//             email,
//             password: hashedPassword,
//             img
//         })

//         console.log('New user is:', newUser)
//         await newUser.save()
//         return "Here's the user"

//     } catch(err) {
//         console.error("Registration error:", err)
//         return{error: "Failed to create account. Please try again."}
//     }
// }


// Function that registers new users
export const registerUser = async (previousState: unknown, formData: FormData)  => {
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

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

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

// Function that handles logging in
export const login = async (prevState: string | undefined, formData: FormData) => {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirectTo: "/"
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Username or Password';
                default:
                    return 'Something went wrong'
            }
        }
        throw error;
    }
}