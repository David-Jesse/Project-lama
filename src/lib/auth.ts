import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {Session} from "next-auth"
import { connectToMongoDB } from "./db"
import { User } from "./models"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

interface CredentialsProps {
    username: string
    password: string
}

const login = async (credentials: CredentialsProps) => {
    try {
        connectToMongoDB()
        const user = await User.findOne({username: credentials.username})

        if (!user) {
            throw new Error("Wrong credentials!")
        }

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password, 
            user.password
        )

        if (!isPasswordCorrect) {
            throw new Error ('Wrong credentials!')
        }

        return user;
    } catch (err) {
        console.log(err)
        throw new Error("failed to login")
    }
   
}
 
export const { 
    auth, 
    handlers:{GET, POST}, 
    signIn, 
    signOut } = NextAuth({
    ...authConfig,
  providers: [
    GitHub({
        clientId: process.env.GITHUB_ID, 
        clientSecret: process.env.GITHUB_SECRET,
    }), 
    CredentialsProvider({
        name: 'credentials',
        credentials: {
            username: {label: "Username", type: 'text'},
            password: {label: "Password", type: "password"}
        },
        async authorize(credentials) {
            try {
                // Type assertion to tell TS the shape of the credentials
                const {username, password} = credentials as CredentialsProps;

                if (!username || !password) {
                    throw new Error ('Missing credentials')
                }

                const user = await login({username, password})

                if(!user) return null

                return user;
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                return null;
            }
        }
    }),
    Google
    ],
    callbacks: {
    async signIn({user, account, profile}) {
        console.log('Github OAuth triggered!', {user, profile})
        
        if (account?.provider !== "github") return true;

        try {
            await connectToMongoDB()
            console.log("Connected to DB!")
            
            if (!profile?.email || !profile?.login) {
                console.error("Missing required profile fields")
                return false;
            }
            // Check for existing user by email
            let existingUser = await User.findOne({email: profile.email})

            if(existingUser) {
                console.log('Existing user found:', existingUser.email)
                // Update user profile if needed

                if (existingUser.provider === 'github') {
                    await User.updateOne(
                        {_id: existingUser._id},
                        {
                            $set: {
                                img: profile.avatar_url || existingUser.img,
                                username: profile.login
                            }
                        }
                    ).catch(err => {
                        console.log("Username update failed, keeping existing username", err)
                    })
                }
                return true;
            }

            existingUser = await User.findOne({user: profile.login});
            if (existingUser) {
                console.log('Existing user found by username: existingUser.username')
                return true;
            }

        
            // Create new user if user doesn't exist
            console.log("Creating new user with username:", profile.login)
            const newUser = new User ({
                username: profile.login,
                email: profile.email,
                img: profile.avatar_url,
                password: profile.id,
                provider: 'github'
            })

            await newUser.save()
            console.log('New user created successfully')
            return true;
        } catch(err) {
            console.error('Authentication error:', err)

            if  ((err as { code?: number })?.code === 11000) {
                console.log('Duplicate key detected, proceeding with login')

                const conflictUser = await User.findOne({
                    $or: [
                        {email: profile?.email},
                        {username: profile?.login}
                    ]
                })

                if (conflictUser)  return true;
            }

            return false
        }
      },
      ...authConfig.callbacks,
    }
});

declare module "next-auth" {
    interface Session {
        user: {
            isAdmin: boolean;
            id: string;
        } 
    }

    interface User {
        id?: string;
        isAdmin: boolean
    }

    interface JWT {
        id: string;
        isAdmin: boolean
    }
}

export type SessionType = Session; 